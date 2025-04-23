import api from "../api";
import Toastify from "./Toastify";
const Delete = async (userId) => {
  if (!userId) {
    alert("Invalid ID");
    return;
  }
  try {
    const token = localStorage.getItem("access");
    await api.delete(`/api/users/drop?id=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    Toastify("success", "បានលុបដោយជោគជ័យ!");
    setTimeout(() => {
      window.location.href = "http://localhost:8012/admin/user-list";
    }, 3000);
  } catch (err) {
    console.error("Error deleting item", err);
    Toastify("error", "ការលុបបានបរាជ័យ!");
    // setTimeout(() => {
    //   window.location.href = "http://localhost:8012/admin/user-list";
    // }, 3000);
  }
};
export default Delete;
