// ** Vertical Menu Components
// import VerticalNavMenuLink from './VerticalNavMenuLink'
// import VerticalNavMenuGroup from './VerticalNavMenuGroup'
// import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'
import { Grid, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useLocation, useNavigate } from "react-router-dom";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
// ** Utils
// import {
//   canViewMenuItem,
//   canViewMenuGroup,
//   resolveVerticalNavMenuItemComponent as resolveNavItemComponent
// } from '@layouts/utils'

const VerticalMenuNavItems = () => {
  const navigate = useNavigate();
  const roles = JSON.parse(localStorage.getItem("userData"));

  const metadata = [
    {
      id: 1,
      title: "Trang chủ",
      icon: <HelpCenterOutlinedIcon />,
      path: roles.roles[0].id == 1 ? "/home" : "/home-user",
      isAdmin: true,
    },
    {
      id: 2,
      title: "Ngân hàng đề thi",
      icon: <AttachFileOutlinedIcon />,
      path: "/exam-bank",
      isAdmin: roles.roles[0].id == 1 ? true : false,
    },
    {
      id: 3,
      title: "Ngân hàng câu hỏi ",
      icon: <TextSnippetOutlinedIcon />,
      path: "/question-bank",
      isAdmin: roles.roles[0].id == 1 ? true : false,
    },
    {
      id: 4,
      title: "Danh sách bài kiểm tra",
      icon: <AccountBalanceIcon />,
      path: roles.roles[0].id == 1 ? "/list-test" : "/list-test-user",

      isAdmin: true,
    },
    {
      id: 5,
      title: "Quản lý chủ đề",
      icon: <StickyNote2Icon />,
      path: "/topic-management",
      isAdmin: roles.roles[0].id == 1 ? true : false,
    },
  ];
  const params = useLocation();
  const handleChooseItem = (path) => {
    navigate(path);
  };
  return (
    <div style={{ background: "#F6F6F6", height: "calc(100vh - 75px)" }}>
      {metadata
        .filter((item) => item.isAdmin)
        .map((item) => {
          return (
            <ListItem
              className={
                params.pathname === item.path
                  ? "activeQuestionBank activeQuestionBankClick"
                  : "activeQuestionBank"
              }
              sx={{ height: "60px", cursor: "pointer", fontSize: "20px" }}
              key={item.id}
              onClick={() => handleChooseItem(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          );
        })}
    </div>
  );
};

export default VerticalMenuNavItems;
