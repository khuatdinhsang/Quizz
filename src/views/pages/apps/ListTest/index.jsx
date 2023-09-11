import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import FutureQuizzButton from "@components/future-quizz-button";
import { useDispatch, useSelector } from "react-redux";
import TableData from "./tableData";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HeaderSearch from "./headerSearch";
import { useState } from "react";
import {
  handleGetListCategory,
  handleGetListExamType,
  handleGetListTest,
} from "@redux/exam";
import {
  createExamApi,
  getListCategoryApi,
  getListExamTypeApi,
  getListTestApi,
} from "@src/@core/api/exam";
import toast from "react-hot-toast";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const ListTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState({
    type: "single",
    open: false,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
  });
  const [filterListExam, setFilterListExam] = useState({
    page: 1,
    limit: 10,
    cate: "",
    keywords: "",
    createDate: "",
    startTime: "",
    expiredTime: "",
  });
  const [totalExams, setTotalExams] = useState(0);
  const [dataExam, setDataExam] = useState(
    useSelector((state) => state.exams.listExam)
  );
  console.log("dataExam", dataExam);

  const [dataCategory, setDataCategory] = useState(
    useSelector((state) => state.exams.listCategory)
  );
  const [listExamDelete, setListExamDelete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const data = [
    {
      id: 1,
      title: "Tạo bài kiểm tra ",
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
  const getNumberQuestionOfExam = (id) => {
    return;
  };
  const getTestApi = () => {
    setLoading(true);
    getListTestApi(filterListExam)
      .then((res) => {
        setPagination({ page: res.data.page, limit: res.data.limit });
        dispatch(handleGetListTest({ data: res.data.groupQuizList }));
        setDataExam(res.data.groupQuizList);
        setTotalExams(res.data.total);
      })
      .catch((err) => dispatch(handleGetListTest({ data: [] })))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getTestApi();
  }, []);
  const handleChangePagination = (page, limit) => {
    setLoading(true);
    getListTestApi({
      ...filterListExam,
      page: page,
      limit: limit,
    })
      .then((res) => {
        setPagination({ page: res.data.page, limit: res.data.limit });
        dispatch(handleGetListTest({ data: res.data.groupQuizList }));
        setDataExam(res.data.groupQuizList);
        setTotalExams(res.data.total);
      })
      .catch((err) => dispatch(handleGetListTest({ data: [] })))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getListCategoryApi()
      .then((res) => {
        dispatch(handleGetListCategory({ data: res.data }));
        setDataCategory(res.data);
      })
      .catch((err) => dispatch(handleGetListCategory({ data: [] })));
  }, []);
  const handleClick = (id) => {
    switch (id) {
      case 1:
        navigate("/list-test/create-test");
        break;
      case 2:
        console.log("import excel");
        break;
      case 3:
        console.log("dong hieu luc");
        break;
      case 4:
        console.log("mo hieu luc");
        break;
      case 5:
        handleCheckMulti();
        break;
    }
  };
  const handleSearch = () => {
    setLoading(true);
    getListTestApi({ ...filterListExam, keywords: textSearch })
      .then((res) => {
        setPagination({ page: res.data.page, limit: res.data.limit });
        setDataExam(res.data.groupQuizList);
        setTotalExams(res.data.total);
      })
      .catch((err) => dispatch(handleGetListTest({ data: [] })))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (textSearch.length == 0) {
      setLoading(true);
      getListTestApi({ ...filterListExam, keywords: textSearch })
        .then((res) => {
          setPagination({ page: res.data.page, limit: res.data.limit });
          dispatch(handleGetListTest({ data: res.data.groupQuizList }));
          setDataExam(res.data.groupQuizList);
          setTotalExams(res.data.total);
        })
        .catch((err) => dispatch(handleGetListTest({ data: [] })))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [textSearch]);

  useEffect(() => {
    if (createDate === "" && startDate === "" && expiredDate === "") {
      getTestApi();
    }
  }, [createDate, startDate, expiredDate]);
  useEffect(() => {
    const newDataExam = dataExam.filter((item) => {
      let itemCreateDate = item.createDate?.split(" ")[0];
      return itemCreateDate === createDate;
    });
    setDataExam(newDataExam);
  }, [createDate]);

  useEffect(() => {
    const newDataExam = dataExam.filter((item) => {
      let itemStartDate = item.startTime?.split(" ")[0];
      return itemStartDate === startDate;
    });
    setDataExam(newDataExam);
  }, [startDate]);
  useEffect(() => {
    const newDataExam = dataExam.filter((item) => {
      let itemExpiredDate = item.expiredTime?.split(" ")[0];
      return itemExpiredDate === expiredDate;
    });
    setDataExam(newDataExam);
  }, [expiredDate]);
  return (
    <Box sx={{ color: "#161E54" }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 24,
          textAlign: "center",
          color: "#161E54",
        }}
      >
        Quản lý bài kiểm tra
      </Typography>
      <HeaderSearch
        createDate={createDate}
        setCreateDate={setCreateDate}
        startDate={startDate}
        setStartDate={setStartDate}
        expiredDate={expiredDate}
        setExpiredDate={setExpiredDate}
      />
      <Stack mb={2} direction="row" justifyContent="space-between">
        <Box>
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
      </Stack>
      <TableData
        dataTable={dataExam}
        openConfirm={openConfirm}
        dataCategory={dataCategory}
        setOpenConfirm={setOpenConfirm}
        setListExamDelete={setListExamDelete}
        listExamDelete={listExamDelete}
        loading={loading}
        totalExams={totalExams}
        pagination={pagination}
      />
    </Box>
  );
};

export default ListTest;
