import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = (type, text) => {
  switch (type) {
    case "success":
      toast.success(text);
      break;
    case "error":
      toast.error(text);
      break;
    case "info":
      toast.info(text);
      break;
    case "warning":
      toast.warn(text);
      break;
    default:
      toast("Are you sure?");
  }
};

export default Toastify;
