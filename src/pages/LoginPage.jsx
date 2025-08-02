import LoginForm from "../forms/LoginForm";
import LoginBgImg from "../assets/login-bg-img.jpg";

const LoginPage = () => {
  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex justify-center items-center min-h-screen px-3 md:px-0">
        <LoginForm />
      </div>
      <div className="hidden md:block md:w-1/2">
        <img className="w-full h-screen" src={LoginBgImg} alt="login-background-image" />
      </div>
    </div>
  );
};

export default LoginPage;
