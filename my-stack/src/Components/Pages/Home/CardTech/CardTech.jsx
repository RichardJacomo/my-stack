import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { TechContext } from "../../../../Contexts/TechProvider";
import del from "../../../../Assets/del.png";
import { FormModalEdit } from "../ModalEdit/ModalEdit";
import { Li } from "../../../../Styles/CardTech";

export const CardTech = () => {
  const { user, deleteItem, modalEdit, setModalEdit, setModalPlaceholder } =
    useContext(TechContext);

  const userTechs = user.techs;

  const openModalEdit = (value) => {
    setModalPlaceholder(value);
    modalEdit ? setModalEdit(false) : setModalEdit(true);
  };

  return (
    <>
      <ToastContainer />
      {modalEdit ? <FormModalEdit /> : ""}
      {userTechs?.map((data) => (
        <Li key={data.id} className="li-tech">
          <h2 className="tech" onClick={() => openModalEdit(data)}>
            {data.title}
          </h2>
          <div className="div-level-and-delete">
            <p className="text-level">{data.status}</p>
            <button
              onClick={() => deleteItem(data.id)}
              className="button-delete"
            >
              <img src={del} alt="" />
            </button>
          </div>
        </Li>
      ))}
    </>
  );
};
