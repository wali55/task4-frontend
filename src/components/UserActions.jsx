import LockIcon from "../assets/lock.png";
import UnlockIcon from "../assets/unlock.png";
import TrashIcon from "../assets/trash.png";
import { useState } from "react";
import { baseUrl } from "../../baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserActions = ({ selected, setSelected, fetchUsers }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const performActions = async (action, ids) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const currentUser = JSON.parse(localStorage.getItem("user"));

      let url, method, body;

      switch (action) {
        case "block":
          url = `${baseUrl}/api/users/block`;
          method = "PATCH";
          body = { userIds: ids };
          break;
        case "unblock":
          url = `${baseUrl}/api/users/unblock`;
          method = "PATCH";
          body = { userIds: ids };
          break;
        case "delete":
          url = `${baseUrl}/api/users`;
          method = "DELETE";
          body = { userIds: ids };
          break;
        default:
          return;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      await response.json();

      if (response.ok) {
        toast(`${action}ed successfully`);
        setSelected([]);

        if (selected.includes(currentUser.id)) {
          if (action === "block" || action === "delete") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
            return;
          }
        }

        fetchUsers();
      } else {
        toast(`Failed to ${action} users`);
      }
    } catch (error) {
      toast(`Network error while ${action}ing users`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 max-w-7xl ml-4 mr-4 md:mx-auto">
      <button
        title="Block"
        onClick={() => performActions("block", selected)}
        className="h-8 w-auto pr-1 border border-orange-500 hover:border-orange-600 rounded-md flex items-center justify-center cursor-pointer"
      >
        {loading ? (
          <span>...</span>
        ) : (
          <div className="flex items-center">
            <img src={LockIcon} alt="lock" className="size-7" />
            <span className="text-sm font-semibold text-orange-500">Block</span>
          </div>
        )}
      </button>
      <button
        title="Unblock"
        onClick={() => performActions("unblock", selected)}
        className="size-8 border border-green-500 rounded-md flex items-center justify-center cursor-pointer"
      >
        {loading ? (
          <span>...</span>
        ) : (
          <img src={UnlockIcon} alt="unlock" className="size-7" />
        )}
      </button>
      <button
        title="Delete"
        onClick={() => performActions("delete", selected)}
        className="size-8 border border-red-500 rounded-md flex items-center justify-center cursor-pointer"
      >
        {loading ? (
          <span>...</span>
        ) : (
          <img src={TrashIcon} alt="trash" className="size-6" />
        )}
      </button>
    </div>
  );
};

export default UserActions;
