import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../Components/Pages/Home/Loading/Loading";
import { api } from "../Services/Api";

export const TechContext = createContext({});

export const TechProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalPlaceholder, setModalPlaceholder] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("@TOKEN");

      if (!token) {
        navigate("/");
      } else {
        try {
          const { data } = await api.get("/profile", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          setLoading(false);
          setUser(data);
          navigate("/home");
        } catch (error) {
          navigate("/");
        }
      }
    }
    loadUser();
  }, [refresh]);

  async function deleteItem(id) {
    setLoading(false);
    const token = localStorage.getItem("@TOKEN");
    try {
      await api.delete(`/users/techs/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (refresh === false) {
        setRefresh(true);
      } else {
        setRefresh(false);
      }
      toast.success("Tech has been removed");
      setLoading(true);
      setUser(user);
    } catch (error) {}
  }

  return (
    <>
      {loading ? <Loading /> : ""}
      <TechContext.Provider
        value={{
          user,
          deleteItem,
          modal,
          setModal,
          modalEdit,
          setModalEdit,
          modalPlaceholder,
          setModalPlaceholder,
          setUser,
          refresh,
          setRefresh,
          setLoading,
          loading,
        }}
      >
        {children}
      </TechContext.Provider>
    </>
  );
};
