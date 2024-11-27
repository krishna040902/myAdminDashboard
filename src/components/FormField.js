import React from "react";

const FormField = ({ label, type, value, onChange, options }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      {type === "select" ? (
        <select value={value} onChange={onChange}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default FormField;
