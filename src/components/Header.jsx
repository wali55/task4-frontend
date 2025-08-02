import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import LogoutIcon from "../assets/logout.png";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Header = () => {
  const [userName, setUserName] = useState("Person");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userObj = JSON.parse(user);
    setUserName(userObj?.name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast("Successfully logged out.");
    navigate("/login");
  };

  return (
    <div className="h-[80px] bg-neutral-800 mb-4 flex items-center">
      <div className="w-full mx-4 flex justify-between">
        <div className="flex gap-2 items-center">
          <div>
            <img src={Logo} alt="logo" className="size-8" />
          </div>
          <h1 className="text-white font-semibold text-lg">Task4 App</h1>
        </div>
        <div className="flex gap-1 items-center cursor-pointer">
          <h1 className="text-white">{userName}</h1>
          <button title="Logout" onClick={handleLogout} className="cursor-pointer">
            <img src={LogoutIcon} alt="logout-icon" className="size-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
