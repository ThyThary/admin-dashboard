import validator from "validator";
import api from "../api";
// Email validate
const email = async (e, valueOne, valueTwo, errorOne, errorTwo, errorThree) => {
  let lower = /^(?=.*[a-z]).+$/;
  let upper = /^(?=.*[A-Z]).+$/;

  e.preventDefault();

  // User name validation
  if (valueOne == "") {
    errorOne("Field is required");
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
          console.log(res);

          if (res.data.data.user.role == "USER") {
            window.location.href = "http://localhost:8012/word-list";
          } else {
            window.location.href = "http://localhost:8012/admin/user-list";
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            errorThree("Invalid Username or Password");
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

  //   Password validation
  switch (true) {
    case valueTwo == "":
      errorTwo("Field is required");
      break;
    case valueTwo.length < 8:
      errorTwo("Password at least 8 characters");
      break;
    case !/[0-9]/.test(valueTwo):
      errorTwo("Password at least one contain number");
      break;
    case lower.test(valueTwo) != true:
      errorTwo("Password at least one lower character");
      break;
    case upper.test(valueTwo) != true:
      errorTwo("Password at least one UPPER character ");
      break;
    case !/[!@#$%^&*\]]/.test(valueTwo):
      errorTwo("Password at least one special character");
      break;
    default:
      errorTwo("");
  }
};
export default email;
