import React from "react";

const Input = ({ type, placeholder, name, id, inputClassname }) => {
  return <input type={type} className={`text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:text-slate-400${inputClassname}`} placeholder={placeholder} name={name} id={id} />;
};

export default Input;
