import Header from "../components/Header";
import UsersTable from "../components/UsersTable";
import { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserActions from "../components/UserActions";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        setUsers(data);
      } else if (response.status === 401 || response.status === 403) {
        handleBlockedUser();
      } else {
        toast("Something went wrong while fetching users");
      }
    } catch (error) {
      toast("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockedUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast("Access denied. Please log in again.");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl ml-4 mr-4 md:mx-auto">
        <h1 className="text-lg font-semibold mb-4">All Users List</h1>
      </div>
      <UserActions selected={selected} setSelected={setSelected} fetchUsers={fetchUsers} />
      <UsersTable users={users} selected={selected} setSelected={setSelected} />
    </div>
  );
};

export default HomePage;
