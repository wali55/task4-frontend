import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FieldSet from "../components/FieldSet";
import Field from "../components/Field";
import LogoBlack from "../assets/logo-black.png";
import { baseUrl } from "../../baseUrl";
import { toast } from 'react-toastify';
import { useState } from "react";

const RegistrationForm = () => {
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
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast("You have registered successfully.");
        navigate("/login");
      } else {
        toast(data?.error);
      }
    } catch (error) {
      toast(data?.error);
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
        <FieldSet label="Register to the app">
          <Field label="Full Name" error={errors.name}>
            <input
              {...register("name", { required: "Full name is required!" })}
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="border border-neutral-300 rounded-md p-2 mb-2 text-sm"
            />
          </Field>
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
              {loading ? 'Registering...' : 'Register'}
            </button>
          </Field>

          <div>
            <p className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </FieldSet>
      </form>
    </div>
  );
};

export default RegistrationForm;
