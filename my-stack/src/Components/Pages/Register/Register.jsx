import React, { useContext } from "react";
import { UserContext } from "../../../Contexts/UserProvider";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { api } from "../../../Services/Api";
import { Div } from "../../../Styles/Register";

export const RegisterPage = () => {
  const { setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    name: yup.string().required("Name required"),
    email: yup.string().required("Email required").email("Invalid email"),
    password: yup
      .string()
      .required("Password required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain at least 8 characters, one letter, one number and one special character"
      ),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords need to be equal")
      .required("Confirmation required"),
    bio: yup.string().required("Bio required"),
    contact: yup.string().required("Contact required"),
    course_module: yup.string().required("Module required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const requestResult = (request) => {
    if (request.statusText === "Created") {
      toast.success("User created");
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2000);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/users", data);
      requestResult(response);
    } catch (error) {
      toast.error("An error ocurred on register");
      setLoading(false);
    }
  };

  return (
    <>
      <Div>
        <ToastContainer />
        <div className="div-title-and-button">
          <h1 className="title-register">MY STACK</h1>
          <Link className="button-back" to="/">
            Back to login
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="register">Create your account</h2>
          <div className="div-name-register">
            <label htmlFor="name">Name</label>
            <input placeholder="Enter your name" {...register("name")} />
            {errors.name?.message && (
              <p className="error-msg">{errors.name.message}</p>
            )}
          </div>
          <div className="div-email-register">
            <label htmlFor="email">Email</label>
            <input placeholder="Enter your email" {...register("email")} />
            {errors.email?.message && (
              <p className="error-msg">{errors.email.message}</p>
            )}
          </div>
          <div className="div-pass-register">
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="error-msg">{errors.password.message}</p>
            )}
          </div>
          <div className="div-pass-register-confirm">
            <label htmlFor="password-confirm">Confirm password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              {...register("confirm_password")}
            />
            {errors.confirm_password?.message && (
              <p className="error-msg">{errors.confirm_password.message}</p>
            )}
          </div>
          <div className="div-bio">
            <label htmlFor="bio">Bio</label>
            <input placeholder="Write about you" {...register("bio")} />
            {errors.bio?.message && (
              <p className="error-msg">{errors.bio.message}</p>
            )}
          </div>
          <div className="div-contact">
            <label htmlFor="contact">Contact</label>
            <input placeholder="Enter your contact" {...register("contact")} />
            {errors.contact?.message && (
              <p className="error-msg">{errors.contact.message}</p>
            )}
          </div>
          <div className="div-select">
            <p className="p-select">Select module</p>
            <select
              name="course_module"
              id="module"
              {...register("course_module")}
            >
              <option value="">Select module</option>
              <option value="First module">First module</option>
              <option value="Secound module">Secound module</option>
              <option value="Third module">Third module</option>
              <option value="Fourth module">Fourth module</option>
              <option value="Fifth module">Fifth module</option>
              <option value="Sixth module">Sixth module</option>
            </select>
            {errors.course_module?.message && (
              <p className="error-msg">{errors.course_module.message}</p>
            )}
          </div>
          <button className="button-register">Register</button>
        </form>
      </Div>
    </>
  );
};
