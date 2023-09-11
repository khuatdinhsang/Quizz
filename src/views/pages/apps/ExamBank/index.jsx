import { Box, Stack, Typography } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FutureQuizzButton from "@components/future-quizz-button";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import TableData from "./tableData/index";
import { useState, useEffect } from "react";
import { handleGetListCategory, handleGetListExam } from "@redux/exam";
import {
  createExamApi,
  getListCategoryApi,
  getListExamApi,
  getListExamTypeApi,
} from "@src/@core/api/exam";
import CreateExam from "./createExamBank";
import toast from "react-hot-toast";
import { Button } from "antd";
import ExamDetail from "./ExamDetail";
const ExamBank = () => {
  const dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState({
    type: "single",
    open: false,
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
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const [totalExams, setTotalExams] = useState(0);
  const [active, setActive] = useState(true);
  const [dataExam, setDataExam] = useState(
    useSelector((state) => state.exams.listExam)
  );
  const [dataCategory, setDataCategory] = useState(
    useSelector((state) => state.exams.listCategory)
  );
  const [detailExam, setDetailExam] = useState({});
  const [popUpDetailExam, setPopUpDetailExam] = useState(false);
  const [listExamDelete, setListExamDelete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [cateMethodExam, setCateMethodExam] = useState({
    name: "",
    method: "",
  });
  const buttonHandle = [
    {
      id: 1,
      title: "Tạo đề thi",
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
  const handleSearch = () => {
    setLoading(true);
    getListExamApi({ ...filterListExam, keywords: textSearch })
      .then((res) => {
        setPagination({ page: res.data.page, limit: res.data.limit });
        setDataExam(res.data.quizList);
        setTotalExams(res.data.total);
      })
      .catch((err) => dispatch(handleGetListExam({ data: [] })))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (textSearch.length == 0) {
      setLoading(true);
      getListExamApi({ ...filterListExam, keywords: textSearch })
        .then((res) => {
          setPagination({ page: res.data.page, limit: res.data.limit });
          dispatch(handleGetListExam({ data: res.data.quizList }));
          setDataExam(res.data.quizList);
          setTotalExams(res.data.total);
        })
        .catch((err) => dispatch(handleGetListExam({ data: [] })))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [textSearch]);

  const getExamApi = () => {
    setLoading(true);
    getListExamApi(filterListExam)
      .then((res) => {
        setPagination({ page: res.data.page, limit: res.data.limit });
        dispatch(handleGetListExam({ data: res.data.quizList }));
        setDataExam(res.data.quizList);
        setTotalExams(res.data.total);
      })
      .catch((err) => dispatch(handleGetListExam({ data: [] })))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getExamApi();
  }, []);

  useEffect(() => {
    getListCategoryApi()
      .then((res) => {
        dispatch(handleGetListCategory({ data: res.data }));
        setDataCategory(res.data);
      })
      .catch((err) => dispatch(handleGetListCategory({ data: [] })));
  }, []);
  const handleChangePagination = (page, limit) => {
    setLoading(true);
    getListExamApi({
      ...filterListExam,
      page: page,
      limit: limit,
    })
      .then((res) => {
        setPagination({ page: res.data.page, limit: res.data.limit });
        dispatch(handleGetListExam({ data: res.data.quizList }));
        setDataExam(res.data.quizList);
        setTotalExams(res.data.total);
      })
      .catch((err) => dispatch(handleGetListExam({ data: [] })))
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleCreateExam = () => {
    setShowCreateExam(!showCreateExam);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCheckMultiInActive = () => {
    if (listExamDelete.length > 0) {
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
        handleOpenModal();
        break;
      case 2:
        console.log("import excel");
        break;
      case 3:
        handleCheckMultiInActive();
        setActive(false);
        break;
      case 4:
        handleCheckMultiInActive();
        setActive(true);
        break;
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
        Ngân hàng đề thi
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
        dataTable={dataExam}
        openConfirm={openConfirm}
        dataCategory={dataCategory}
        dataExam={dataExam}
        setOpenConfirm={setOpenConfirm}
        setListExamDelete={setListExamDelete}
        listExamDelete={listExamDelete}
        loading={loading}
        totalExams={totalExams}
        active={active}
        pagination={pagination}
        handleChangePagination={handleChangePagination}
        detailExam={detailExam}
        setDetailExam={setDetailExam}
        popUpDetailExam={popUpDetailExam}
        setPopUpDetailExam={setPopUpDetailExam}
      />
      <CreateExam
        categories={dataCategory}
        visible={showModal}
        onClose={handleCloseModal}
        dataExam={dataExam}
      />
      <ExamDetail
        detailExam={detailExam}
        popUpDetailExam={popUpDetailExam}
        setPopUpDetailExam={setPopUpDetailExam}
      />
    </Box>
  );
};

export default ExamBank;
