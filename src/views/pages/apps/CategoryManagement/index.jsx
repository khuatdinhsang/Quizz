import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useDispatch, useSelector } from "react-redux";
import FutureQuizzButton from "@components/future-quizz-button";
import { Button } from "antd";
import { useState } from "react";
import { createCategoryApi, getListCategoryApi } from "@src/@core/api/question";
import CreateCategory from "./createCategory";
import { handleGetListCategory } from "@redux/question";
import { TableData } from "./tableData";
import toast from "react-hot-toast";
import ConfirmActive from "./confirmActive";
const CategoryManagement = () => {
  const dispatch = useDispatch();
  const [textSearch, setTextSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalCategory, setTotalCategory] = useState(0);
  const [listAllCategory, setListAllCategory] = useState([]);
  const [listAllCategoryRefresh, setListAllCategoryRefresh] = useState([]);
  const [createCateModal, setCreateCateModal] = useState(false);
  const dataCategory = useSelector((state) => {
    return state.questions.listCategory;
  });
  const [active, setActive] = useState(true);
  const [openConfirm, setOpenConfirm] = useState({
    type: "single",
    open: false,
  });
  const [id, setId] = useState("");
  const [listCategoryActive, setListCategoryActive] = useState([]);
  const data = [
    {
      id: 1,
      title: "Tạo chủ đề ",
      icon: <AddCircleOutlinedIcon />,
      color: "blue",
      path: "/",
    },
    {
      id: 2,
      title: "Đóng hiệu lực",
      icon: <LockOutlinedIcon />,
      color: "red",
      path: "/",
    },
    {
      id: 3,
      title: "Mở hiệu lực",
      icon: <LockOpenIcon />,
      color: "green",
      path: "/",
    },
  ];
  const toggleCreateCateModal = () => {
    setCreateCateModal(!createCateModal);
  };
  const postCreateCategory = (value) => {
    createCategoryApi(value)
      .then((res) => {
        setId(parseInt(res.data.data));
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra !");
      })
      .finally(() => {
        toast.success("Tạo mới chủ đề thành công");
      });
  };
  const matchUTF8 = (str, target) => {
    const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedTarget = target
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return normalizedStr.includes(normalizedTarget);
  };
  useEffect(() => {
    setLoading(true);
    getListCategoryApi()
      .then((res) => {
        setTotalCategory(res.data.length + 1);
        const arrSorted = res.data.sort((a, b) => {
          return a.id - b.id;
        });
        dispatch(handleGetListCategory({ data: arrSorted }));
        setListAllCategoryRefresh(arrSorted);
        setListAllCategory(arrSorted);
      })
      .catch((err) => console.log("err", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    const listQuestionSearch = listAllCategory.filter((item) =>
      matchUTF8(item?.name, textSearch)
    );
    setListAllCategoryRefresh(listQuestionSearch);
  };
  const handleClick = (id) => {
    switch (id) {
      case 1:
        toggleCreateCateModal();
        break;
      case 2:
        handleCheckMultiInActive();
        setActive(false);
        break;
      case 3:
        handleCheckMultiActive();
        setActive(true);
        break;
    }
  };
  useEffect(() => {
    if (textSearch.length == 0) {
      setLoading(true);
      const listQuestionSearch = listAllCategory.filter((item) =>
        matchUTF8(item?.name, textSearch)
      );
      setListAllCategoryRefresh(listQuestionSearch);
      setLoading(false);
    }
  }, [textSearch]);
  const handleCheckMultiInActive = () => {
    if (listCategoryActive.length > 0) {
      setOpenConfirm({
        type: "multi",
        open: true,
      });
    } else {
      toast.error("Chọn ít nhất 1 câu hỏi");
    }
  };
  const handleCheckMultiActive = () => {
    if (listCategoryActive.length > 0) {
      setOpenConfirm({
        type: "multi",
        open: true,
      });
    } else {
      toast.error("Chọn ít nhất 1 câu hỏi");
    }
  };
  return (
    <Box sx={{ color: "#161E54" }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 26,
          textAlign: "center",
          color: "#161E54",
        }}
      >
        Quản lý chủ đề
      </Typography>
      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            style={{
              height: "40px",
              outline: "none",
              border: "1px solid #ccc",
              padding: "0 10px",
              width: "300px",
            }}
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            type="text"
            placeholder="Tìm kiếm"
          />
          <Button
            style={{
              height: "40px",
              width: "100px",
              marginLeft: "10px",
              backgroundColor: "blue",
              color: "white",
            }}
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </form>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        {data.map((item) => {
          return (
            <FutureQuizzButton
              id={item.id}
              color={item.color}
              icon={item.icon}
              title={item.title}
              handleClick={handleClick}
            />
          );
        })}
      </Box>
      <TableData
        dataTable={listAllCategoryRefresh}
        totalCategory={totalCategory}
        loading={loading}
        setListAllCategoryRefresh={setListAllCategoryRefresh}
        listCategoryActive={listCategoryActive}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setListCategoryActive={setListCategoryActive}
        active={active}
      />
      <CreateCategory
        categories={listAllCategory}
        id={id}
        setListAllCategory={setListAllCategory}
        setListAllCategoryRefresh={setListAllCategoryRefresh}
        createCateModal={createCateModal}
        toggleCreateCateModal={toggleCreateCateModal}
        postCreateCategory={postCreateCategory}
      />
    </Box>
  );
};

export default CategoryManagement;
