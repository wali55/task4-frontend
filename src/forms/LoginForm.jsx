import { useForm } from "react-hook-form";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";
import { useNavigate } from "react-router-dom";
import LogoBlack from "../assets/logo-black.png";
import { useState } from "react";
import { baseUrl } from "../../baseUrl";
import { toast } from "react-toastify";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formSubmit = async (formData) => {
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast("Login successful.");
        localStorage.setItem("token", data?.token);
        localStorage.setItem("user", JSON.stringify(data?.user));
        navigate("/");
      } else {
        toast("Login failed.");
      }
    } catch (error) {
      toast("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex mb-2 gap-2">
        <div>
          <img src={LogoBlack} alt="logo" className="size-8" />
        </div>
        <h1 className="font-semibold text-lg">Task4 App</h1>
      </div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <FieldSet label="Login to the app">
          <Field label="Email" error={errors.email}>
            <input
              {...register("email", { required: "Email is required!" })}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="border border-neutral-300 rounded-md p-2 mb-2 text-sm"
            />
          </Field>
          <Field label="Password" error={errors.password}>
            <input
              {...register("password", {
                required: "Password is required!",
              })}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="border border-neutral-300 rounded-md p-2 mb-2 text-sm"
            />
          </Field>

          <Field>
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 text-sm font-semibold mt-2 rounded-md cursor-pointer">
              {loading ? "Login..." : "Loading"}
            </button>
          </Field>

          <div>
            <p className="text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/registration")}
                className="text-blue-500 cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </FieldSet>
      </form>
    </div>
  );
};

export default LoginForm;
