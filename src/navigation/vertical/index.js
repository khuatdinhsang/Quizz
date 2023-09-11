import { Circle, Home, Menu } from "react-feather";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";



// ** Merge & Export

export default [

  {

    id: "1",

    title: "Trang chủ",

    icon: <HelpCenterOutlinedIcon />,

    navLink: "/home",

  },

  {

    id: "2",

    title: "Ngân hàng đề thi",

    icon: <AttachFileOutlinedIcon />,

    badge: "light-warning",

    badgeText: "2",

  },

  {

    id: "3",

    title: "Ngân hàng câu hỏi",

    icon: <TextSnippetOutlinedIcon />,

    badge: "light-warning",

    badgeText: "2",

  },

  {

    id: "4",

    title: "Danh sách bài kiếm tra",

    icon: <AccountBalanceIcon />,

    badge: "light-warning",

    badgeText: "2",

  },




];