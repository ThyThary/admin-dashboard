import api from "../config/api";
import CryptoJS from "crypto-js"; // You'll need to install this package
import WEB_BASE_URL from "../config/web";
// Function to encrypt data using OpenSSL-compatible AES-256 encryption
const encryptData = (data) => {
  try {
    // Get current year and month for dynamic key generation
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0");

    // Use the same key template as in the backend
    const keyTemplate =
      "Ajv!ndfjkhg0${current_year}g0sno%eu$rtg@nejog${current_month}";
    const dynamicKey = keyTemplate
      .replace("${current_year}", currentYear)
      .replace("${current_month}", currentMonth);

    // Generate random 8-byte salt
    const salt = CryptoJS.lib.WordArray.random(8);
    // Create key and IV using OpenSSL EVP_BytesToKey derivation
    const keyAndIv = deriveKeyAndIv(dynamicKey, salt);
    const key = keyAndIv.key;
    const iv = keyAndIv.iv;

    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    // Format as "Salted__" + salt + ciphertext
    const saltedPrefix = CryptoJS.enc.Latin1.parse("Salted__");
    const encryptedBytes = encrypted.ciphertext;

    // Combine all parts
    const combined = CryptoJS.lib.WordArray.create()
      .concat(saltedPrefix)
      .concat(salt)
      .concat(encryptedBytes);

    // Return as base64
    return combined.toString(CryptoJS.enc.Base64);
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

// OpenSSL KDF implementation (EVP_BytesToKey with MD5, one iteration)
const deriveKeyAndIv = (password, salt) => {
  let key = CryptoJS.lib.WordArray.create();
  let iv = CryptoJS.lib.WordArray.create();

  // Convert password to WordArray if it's a string
  const passwordWords =
    typeof password === "string" ? CryptoJS.enc.Utf8.parse(password) : password;

  // First iteration
  let md5Hash = CryptoJS.MD5(
    CryptoJS.lib.WordArray.create().concat(passwordWords).concat(salt)
  );

  // Use first 16 bytes for key
  key = key.concat(md5Hash);

  // Second iteration for more key material
  md5Hash = CryptoJS.MD5(
    CryptoJS.lib.WordArray.create()
      .concat(md5Hash)
      .concat(passwordWords)
      .concat(salt)
  );

  // Use next 16 bytes for key
  key = key.concat(md5Hash);

  // Third iteration for IV
  md5Hash = CryptoJS.MD5(
    CryptoJS.lib.WordArray.create()
      .concat(md5Hash)
      .concat(passwordWords)
      .concat(salt)
  );

  // Use first 16 bytes of third hash for IV
  iv = md5Hash;

  return {
    key: CryptoJS.lib.WordArray.create(key.words.slice(0, 8)), // 32 bytes for key
    iv: CryptoJS.lib.WordArray.create(iv.words.slice(0, 4)), // 16 bytes for IV
  };
};

// Email validate
const email = async (
  e,
  valueOne,
  valueTwo,
  errorOne,
  errorTwo,
  errorThree,
  setIsLoading,
  resolveCallback,
  rejectCallback
) => {
  e.preventDefault();
  errorOne("");
  errorTwo("");

  // User name validation
  if (valueOne == "" && valueTwo == "") {
    errorOne("ត្រូវការឈ្មោះអ្នកប្រើប្រាស់");
    errorTwo("ត្រូវការពាក្យសម្ងាត់");
    if (rejectCallback) rejectCallback("Missing username");
    return;
  } else if (valueOne == "") {
    errorOne("ត្រូវការឈ្មោះអ្នកប្រើប្រាស់");
  } else if (valueTwo == "") {
    errorTwo("ត្រូវការពាក្យសម្ងាត់");
  } else {
    setIsLoading(true);
    try {
      // Encrypt both login_input and password
      const encryptedLoginInput = encryptData(valueOne);
      const encryptedPassword = encryptData(valueTwo);

      api
        .post(
          "/api/users/login/",
          {
            login_input: encryptedLoginInput,
            password: encryptedPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          // localStorage.removeItem("access");
          localStorage.setItem("access", res.data.data.access);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          console.log(res.data.data.use);
          // Call resolve callback with the response if provided
          if (resolveCallback) {
            resolveCallback(res);
          } else {
            // Original redirect logic if no callback provided
            if (res.data.data.user.role == "USER") {
              window.location.href = `${WEB_BASE_URL}/user/word-list`;
            } else if (
              res.data.data.user.role == "ADMIN" ||
              res.data.data.user.role == "SUPERUSER"
            ) {
              window.location.href = `${WEB_BASE_URL}/admin/controller-list`;
            } else {
              /* empty */
            }
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            errorThree("ឈ្មោះអ្នកប្រើប្រាស់ ​ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ");
            setIsLoading(false);
          } else {
            errorThree("");
          }

          // Call reject callback if provided
          if (rejectCallback) {
            rejectCallback(err);
          }
        });
    } catch (err) {
      // ❌ If failed
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", err);

      // Call reject callback if provided
      if (rejectCallback) {
        rejectCallback(err);
      }
    } finally {
      // setIsLoading(false); // Done loading: button enabled
    }
  }
};

export default email;
