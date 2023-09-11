import { Input, Typography } from "antd";
import React from "react";

export const InputField = (props) => {
  const {
    type,
    width,
    required,
    disabled,
    defaultValue,
    value,
    placeholder,
    onChange,
    maxLength,
  } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <div>
        <Input
          type={type}
          style={{ width: width, borderRadius: "5px" }}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};
