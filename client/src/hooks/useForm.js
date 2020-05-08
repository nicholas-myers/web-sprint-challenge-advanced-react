// write your custom hook here to control your checkout form
import React, { useState } from "react";

export const useForm = initialValue => {
  // email value ✅
  // handlechanges should handle all inputs
  const [values, setValues] = useState(initialValue);

  const handleChanges = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [values, handleChanges];
};
