import React from "react";
import { Select, Typography } from "antd";

function SelectAntdComponent(props) {
  const {
    title,
    data,
    width,
    defaultValue,
    handleChange,
    name,
    placeholder,
    flexRow,
    value,
    allowClear,
    index,
  } = props;
  return (
    <div
      style={
        flexRow
          ? {
              display: "flex",
              flexDirection: "row",
              margin: " 10px 0 20px 0",
              justifyContent: "flex-start",
            }
          : { marginBottom: "20px" }
      }
    >
      {title ? (
        <Typography
          style={{
            paddingBottom: "5px",
            paddingRight: "15px",
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      ) : null}
      <Select
        options={data}
        defaultValue={defaultValue}
        style={{ width: width }}
        allowClear={allowClear}
        onChange={(value) => handleChange(name, value, index)}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

export default SelectAntdComponent;
