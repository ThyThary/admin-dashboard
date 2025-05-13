import api from "../api";
import Toastify from "./Toastify";
import WEB_BASE_URL from "../config/web";
const Delete = async (routeWeb, routeAPIType, routeAPI, id, text) => {
  if (!id) {
    alert("Invalid ID");
    return;
  }
  try {
    const token = localStorage.getItem("access");

    if (routeAPIType == "post") {
      console.log("Token", token);
      await api.post(
        `${routeAPI}${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (routeAPIType == "put") {
      await api.put(`${routeAPI}${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await api.delete(`${routeAPI}${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    Toastify("success", `បាន${text}ដោយជោគជ័យ!`);
    setTimeout(() => {
      window.location.href = `${WEB_BASE_URL}${routeWeb}`;
    }, 2000);
  } catch (err) {
    console.error("Error deleting item", err);
    Toastify("error", `ការ${text}បានបរាជ័យ!`);
  }
};
export default Delete;
