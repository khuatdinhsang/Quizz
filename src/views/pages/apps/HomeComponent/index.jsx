import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FutureQuizzButton from "@components/future-quizz-button";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import TableData from "./tableData/index";
import { useState } from "react";
import { Button } from "antd";
import question, {
  handleGetListCategory,
  handleGetListQuestion,
  handleGetListQuestionType,
} from "@redux/question";
import {
  createQuestionApi,
  getListCategoryApi,
  getListQuestionApi,
  getListQuestionTypeApi,
} from "@src/@core/api/question";
import CreateQuestion from "./createQuestion";
import toast from "react-hot-toast";
import EditQuestion from "./editQuestion";
import { getListExamApi } from "@src/@core/api/exam";
import { handleGetListExam } from "@redux/exam";
const HomeComponent = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
  });

  const [openConfirm, setOpenConfirm] = useState({
    type: "single",
    open: false,
  });
  const [filterListQuestion, setFilterListQuestion] = useState({
    page: 1,
    limit: 20,
    cateId: null,
    search: "",
    typeId: null,
    level: "",
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
  const [showEditQues, setShowEditQues] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalExams, setTotalExams] = useState(0);
  const [dataQuestion, setDataQuestion] = useState(
    useSelector((state) => state.questions.listQuestion)
  );
  const [dataCategory, setDataCategory] = useState(
    useSelector((state) => state.questions.listCategory)
  );
  const [dataQuestionType, setDataQuestionType] = useState(
    useSelector((state) => state.questions.listQuestionType)
  );
  const [listQuestionDelete, setListQuestionDelete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isView, setView] = useState(true);
  const [question, setQuestion] = useState(dataQuestion[0]);
  const [textSearch, setTextSearch] = useState("");
  const buttonHandle = [
    {
      id: 1,
      title: "Tạo câu hỏi",
      icon: <AddCircleOutlinedIcon />,
      color: "blue",
      path: "/",
    },
    {
      id: 2,
      title: "Import Excel",
      icon: <LockOpenOutlinedIcon />,
      color: "green",
      path: "/",
    },

    {
      id: 3,
      title: "Đóng hiệu lực",
      icon: <LockOutlinedIcon />,
      color: "red",
      path: "/",
    },
    {
      id: 4,
      title: "Mở hiệu lực",
      icon: <LockOpenIcon />,
      color: "green",
      path: "/",
    },
  ];
  const getExamApi = () => {
    getListExamApi(filterListExam)
      .then((res) => {
        dispatch(handleGetListExam({ data: res.data.quizList }));
      })
      .catch((err) => dispatch(handleGetListExam({ data: [] })));
  };
  useEffect(() => {
    getExamApi();
  }, []);

  const getQuestionApi = () => {
    setLoading(true);
    getListQuestionApi(filterListQuestion)
      .then((res) => {
        setPagination({ page: res.data.page, limit: res.data.limit });
        dispatch(handleGetListQuestion({ data: res.data.questions }));
        setDataQuestion(res.data.questions);
        setTotalQuestions(res.data.total);
      })
      .catch((err) => dispatch(handleGetListQuestion({ data: [] })))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getQuestionApi();
  }, []);
  useEffect(() => {
    getListCategoryApi()
      .then((res) => {
        dispatch(handleGetListCategory({ data: res.data }));
        setDataCategory(res.data);
      })
      .catch((err) => dispatch(handleGetListCategory({ data: [] })));
  }, []);
  useEffect(() => {
    getListQuestionTypeApi()
      .then((res) => {
        dispatch(handleGetListQuestionType({ data: res.data }));
        setDataQuestionType(res.data);
      })
      .catch((err) => dispatch(handleGetListCategory({ data: [] })));
  }, []);

  const postCreateQuestion = (value) => {
    createQuestionApi(value)
      .then((res) => {
        toggleCreateQuestion();
        toast.success("Tạo câu hỏi thành công");
        getQuestionApi();
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra");
      });
  };
  const toggleCreateQuestion = () => {
    setShowCreateQuestion(!showCreateQuestion);
  };
  const handleCheckMultiInActive = () => {
    if (listQuestionDelete.length > 0) {
      setOpenConfirm({
        type: "multi",
        open: true,
      });
    } else {
      toast.error("Chọn ít nhất 1 câu hỏi");
    }
  };
  const handleCheckMultiActive = () => {
    if (listQuestionDelete.length > 0) {
      setOpenConfirm({
        type: "multi",
        open: true,
      });
    } else {
      toast.error("Chọn ít nhất 1 câu hỏi");
    }
  };
  const handleClick = (id) => {
    switch (id) {
      case 1:
        toggleCreateQuestion();
        break;
      case 2:
        console.log("import excel");
        break;
      case 3:
        handleCheckMultiInActive();
        setActive(false);
        break;
      case 4:
        handleCheckMultiActive();
        setActive(true);
        break;
    }
  };
  const toggleEditQues = () => {
    setShowEditQues(!showEditQues);
  };
  const handleChangePagination = (page, limit) => {
    setLoading(true);
    getListQuestionApi({
      ...filterListQuestion,
      page: page,
      limit: limit,
    })
      .then((res) => {
        setPagination({ page: res.data.page, limit: res.data.limit });
        dispatch(handleGetListQuestion({ data: res.data.questions }));
        setDataQuestion(res.data.questions);
        setTotalQuestions(res.data.total);
      })
      .catch((err) => dispatch(handleGetListQuestion({ data: [] })))
      .finally(() => {
        setLoading(false);
      });
  };
  const setViewClick = (type) => {
    setView(type);
  };
  const handleSearch = () => {
    setLoading(true);
    getListQuestionApi({ ...filterListQuestion, search: textSearch })
      .then((res) => {
        setPagination({ page: res.data.page, limit: res.data.limit });
        setDataQuestion(res.data.questions);
        setTotalQuestions(res.data.total);
      })
      .catch((err) => dispatch(handleGetListQuestion({ data: [] })))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (textSearch.length == 0) {
      setLoading(true);
      getListQuestionApi({ ...filterListQuestion, search: "" })
        .then((res) => {
          setPagination({ page: res.data.page, limit: res.data.limit });
          dispatch(handleGetListQuestion({ data: res.data.questions }));
          setDataQuestion(res.data.questions);
          setTotalQuestions(res.data.total);
        })
        .catch((err) => dispatch(handleGetListQuestion({ data: [] })))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [textSearch]);
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
        Ngân hàng câu hỏi
      </Typography>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", marginBottom: "20px" }}
      >
        <Box>
          {buttonHandle.map((item) => {
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
        dataTable={dataQuestion}
        openConfirm={openConfirm}
        dataCategory={dataCategory}
        dataQuestionType={dataQuestionType}
        setView={setViewClick}
        setOpenConfirm={setOpenConfirm}
        setQuestion={setQuestion}
        setListQuestionDelete={setListQuestionDelete}
        listQuestionDelete={listQuestionDelete}
        toggleEditQues={toggleEditQues}
        loading={loading}
        totalQuestions={totalQuestions}
        handleChangePagination={handleChangePagination}
        pagination={pagination}
        active={active}
      />
      <CreateQuestion
        showCreateQuestion={showCreateQuestion}
        toggleCreateQuestion={toggleCreateQuestion}
        categories={dataCategory}
        quesTypes={dataQuestionType}
        postCreateQuestion={postCreateQuestion}
      />
      <EditQuestion
        showEditQues={showEditQues}
        isView={isView}
        setView={setView}
        toggleEditQues={toggleEditQues}
        question={question}
        categories={dataCategory}
        quesTypes={dataQuestionType}
        dataQuestion={dataQuestion}
        setDataQuestion={setDataQuestion}
        filterListQuestion={filterListQuestion}
      />
    </Box>
  );
};
export default HomeComponent;
