// Input only English
const english = (e, setValue) => {
  console.log(setValue);
  let inputValue = e.target.value;
  inputValue = inputValue.replace(/[^A-Za-z0-9.@!@#$%^&*+=_-]/g, ""); // Allow English
  setValue(inputValue);
};
export default english;
//  How to invoke
// onChange((e) => {english(e, setUserName);})
