import { FormControl, Typography } from "@mui/material";
import React from "react";
import Select from "react-select";
const SelectFieldCustom = (props) => {
  const {
    name,
    data,
    placeholder,
    title,
    handleOnChange,
    defaultValue,
    isDisable,
    className,
    width,
    index,
  } = props;

  const valueOptions = data.filter(
    (option) =>
      option.value === defaultValue || option.value === defaultValue?.value
  );
  return (
    <>
      <FormControl style={{ width: width }}>
        <Typography>{title}</Typography>
        <Select
          className={className}
          isDisabled={isDisable}
          defaultValue={defaultValue || undefined}
          value={defaultValue?.value ? defaultValue : valueOptions}
          onChange={
            handleOnChange ? (val) => handleOnChange(name, val, index) : null
          }
          options={data}
          placeholder={<p style={{ color: "black" }}>{placeholder}</p>}
          name={name}
        />
      </FormControl>
    </>
  );
};

export default SelectFieldCustom;
