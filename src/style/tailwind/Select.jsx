const Select = ({
  label,
  options,
  id,
  name,
  value,
  classNname = "w-full",
  star,
  onChange,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {label && (
          <label
            className="text-sm font-medium text-gray-700"
            style={{ fontFamily: "Hanuman, sans-serif", fontSize: "16px" }}
          >
            {label}
            {star == "true" ? <span className="text-red-500"> *</span> : ""}
          </label>
        )}
        <select
          onChange={onChange}
          id={id}
          name={name}
          style={{ fontFamily: "Hanuman, sans-serif", fontSize: "12px" }}
          className={`px-2 py-2 border border-[#2f7447] rounded-lg focus:outline-none hover:border-1 hover:border-blue-500  ${classNname}`}
        >
          <option value="">-- ជ្រើសរើស --</option>

          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              selected={option.value == value ? true : false}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
