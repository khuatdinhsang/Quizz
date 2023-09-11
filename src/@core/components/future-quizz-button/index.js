import { Box, Icon } from "@mui/material";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const FutureQuizzButton = (props) => {
  const { id, color, icon, title, handleClick, ...rest } = props;
  const handleClickButton = () => {
    handleClick(id);
  };
  return (
    <Button
      key={id}
      type="text"
      onClick={handleClickButton}
      style={{
        marginRight: "20px",
        padding: "6px 8px",
        height: "40px",
        fontWeight: 600,
        position: "relative",
      }}
    >
      <Icon
        sx={{
          color: color,
          height: "100%",
          position: "absolute",
          top: 0,
          left: 5,
        }}
      >
        {icon}
      </Icon>
      <span style={{ paddingLeft: "20px", color: "#000000" }}>{title}</span>
    </Button>
  );
};

export default FutureQuizzButton;
