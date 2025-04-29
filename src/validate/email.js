import validator from "validator";
import api from "../api";
// Email validate
const email = async (e, valueOne, valueTwo, errorOne, errorTwo, errorThree) => {
  let lower = /^(?=.*[a-z]).+$/;
  let upper = /^(?=.*[A-Z]).+$/;

  e.preventDefault();

  // User name validation
  if (valueOne == "") {
    errorOne("ត្រូវការឈ្មោះអ្នកប្រើប្រាស់");
  } else if (validator.isEmail(valueOne)) {
    errorOne("");
    try {
      api
        .post(
          "/api/users/login/",
          {
            login_input: valueOne,
            password: valueTwo,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            withCredentials: true, // only if cookies or auth
          }
        )
        .then((res) => {
          localStorage.setItem("access", res.data.data.access);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          if (res.data.data.user.role == "USER") {
            window.location.href = "http://localhost:8012/word-list";
          } else if (res.data.data.user.role == "ADMIN") {
            window.location.href = "http://localhost:8012/admin/user-list";
          } else {
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            errorThree("ឈ្មោះអ្នកប្រើប្រាស់ ​ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ");
          } else {
            errorThree("");
          }
        });
    } catch (err) {
      // ❌ If failed
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  } else {
    errorOne("Invalid User Name");
  }
  //  Strong password
  switch (true) {
    case valueTwo == "":
      errorTwo("ត្រូវការពាក្យសម្ងាត់");
      break;
    case valueTwo.length < 8:
      errorTwo("ពាក្យសម្ងាត់ត្រូវមាន៨ខ្ទង់យ៉ាងតិច");
      break;
    case !/[0-9]/.test(valueTwo):
      errorTwo("ពាក្យសម្ងាត់ត្រូវមានលេខយ៉ាងតិចមួយ");
      break;
    case lower.test(valueTwo) != true:
      errorTwo("ពាក្យសម្ងាត់ត្រូវមានអក្សរតូចយ៉ាងតិចមួយ");
      break;
    case upper.test(valueTwo) != true:
      errorTwo("ពាក្យសម្ងាត់ត្រូវមានអក្សរធំយ៉ាងតិចមួយ");
      break;
    case !/[!@#$%^&*\]]/.test(valueTwo):
      errorTwo("ពាក្យសម្ងាត់ត្រូវមានសញ្ញាយ៉ាងតិចមួយ");
      break;
    default:
      errorTwo("");
  }
};
export default email;
