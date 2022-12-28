import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { TechContext } from "../../../../Contexts/TechProvider";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { api } from "../../../../Services/Api";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "../../../../Styles/Modal";

export const FormModal = () => {
  const { setModal, user, setUser, refresh, setRefresh, setLoading } =
    useContext(TechContext);

  const formSchema = yup.object().shape({
    title: yup.string().required("Tech required"),
    status: yup.string().required("Status required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  async function onSubmit(body) {
    setLoading(false);
    const token = localStorage.getItem("@TOKEN");
    try {
      await api.post("users/techs", body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!refresh) {
        setRefresh(true);
      } else {
        setRefresh(false);
      }
      toast.success("Tech created");
      setLoading(true);
      setUser(user);
    } catch (error) {
      toast.error("This tech already has been created");
    }
  }

  return (
    <Modal>
      <ToastContainer />
      <div className="div-global">
        <div className="div-title">
          <h1 className="title">Create Tech</h1>
          <button className="button-close" onClick={() => setModal(false)}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form-content">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="input-modal"
            placeholder="Enter tech"
            {...register("title")}
          />
          {errors.title?.message && (
            <p className="error-msg">{errors.title.message}</p>
          )}
          <label htmlFor="status">Select status</label>
          <select className="select-level" {...register("status")}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {errors.status?.message && (
            <p className="error-msg">{errors.status.message}</p>
          )}
          <button className="button-send">Create Tech</button>
        </form>
      </div>
    </Modal>
  );
};
