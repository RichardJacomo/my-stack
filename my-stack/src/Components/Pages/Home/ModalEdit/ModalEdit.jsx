import { useContext } from "react";
import { TechContext } from "../../../../Contexts/TechProvider";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api } from "../../../../Services/Api";
import { toast, ToastContainer } from "react-toastify";
import { ModalEdit } from "../../../../Styles/ModalEdit";

export const FormModalEdit = () => {
  const {
    setModalEdit,
    modalPlaceholder,
    user,
    setUser,
    deleteItem,
    refresh,
    setRefresh,
    setLoading,
  } = useContext(TechContext);

  const formSchema = yup.object().shape({
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
      const { data } = await api.put(
        `/users/techs/${modalPlaceholder.id}`,
        body,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!refresh) {
        setRefresh(true);
      } else {
        setRefresh(false);
      }
      toast.success("Status is updated");
      setLoading(true);
      setUser(user);
    } catch (error) {}
  }

  return (
    <>
      <ToastContainer />
      <ModalEdit>
        <div className="div-global">
          <div className="div-title">
            <h1 className="title">Tech Details</h1>
            <button
              onClick={() => setModalEdit(false)}
              className="button-close"
            >
              X
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="form-content">
            <label htmlFor="name">Tech name</label>
            <input
              type="text"
              className="input-modal"
              placeholder={modalPlaceholder.title}
              disabled
            />
            <label htmlFor="status">Status</label>
            <select className="select-level" {...register("status")}>
              <option value={modalPlaceholder.status}>
                {modalPlaceholder.status}
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {errors.status?.message && (
              <p className="error-msg">{errors.status.message}</p>
            )}
            <div className="buttons-footer">
              <button className="button-send">Save changes</button>
              <button
                className="button-del"
                onClick={() => deleteItem(modalPlaceholder.id)}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </ModalEdit>
    </>
  );
};
