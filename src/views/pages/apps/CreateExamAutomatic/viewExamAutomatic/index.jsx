import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";

const ViewExamAutomatic = () => {
  return (
    <div>
      <Typography
        style={{
          fontWeight: 600,
          fontSize: 22,
          textAlign: "center",
          color: "#161E54",
        }}
      >
        Tên đề thi
      </Typography>
      <hr />
      <Box style={{ textAlign: "right", color: "#2666BE", fontWeight: 500 }}>
        <span style={{ fontSize: "18px", marginRight: "20px" }}>
          Tổng điểm:
        </span>
        <span
          style={{
            display: "inline-block",
            padding: "7px 30px",
            border: "1px solid #2666BE",
          }}
        >
          10
        </span>
      </Box>
    </div>
  );
};

export default ViewExamAutomatic;
