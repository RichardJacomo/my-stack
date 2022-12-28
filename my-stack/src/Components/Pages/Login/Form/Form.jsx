import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.min.css";
import { Form } from "../../../../Styles/Form";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { UserContext } from "../../../../Contexts/UserProvider";
import { api } from "../../../../Services/Api";

export const Signup = () => {
  const { setUser, setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().required("Email required").email("Invalid email"),
    password: yup
      .string()
      .required("Password required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain at least 8 characters, one letter, one number and one special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const requestResult = (request) => {
    if (request.statusText === "OK") {
      toast.success("You're welcome");
      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 2000);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/sessions", data);
      window.localStorage.clear();
      window.localStorage.setItem("@TOKEN", response.data.token);
      window.localStorage.setItem("@USERID", response.data.user.id);
      requestResult(response);
      setUser(response.data.user);
    } catch (error) {
      toast.error("User not found");
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="title">MY STACK</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="login">Login</h2>
        <div className="div-email">
          <label htmlFor="email">Email</label>
          <Input register={register} />
          {errors.email?.message && (
            <p className="error-msg">{errors.email.message}</p>
          )}
        </div>
        <div className="div-pass">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="error-msg">{errors.password.message}</p>
          )}
        </div>
        <Button></Button>
        <p className="advice">Don't have an account?</p>
        <Link className="button-register" to="/register">
          Register
        </Link>
      </Form>
    </>
  );
};
