import { Box, Divider, Grid, Stack } from "@mui/material";
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import SelectAntdComponent from "@components/select-option";
import { InputField } from "@components/input-field";
import { convertDataOptions } from "@src/utility/Utils";
import { getStaffByDepartmentId } from "@src/@core/api/account";
import RangeDateTimePicker from "@components/dateTimePicker";
import { getAllAccount, getAllDepartment } from "@src/@core/api/account";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalChooseExam from "./ModalChooseExam";
import { createTestSample } from "@src/@core/api/exam";
import { useEffect } from "react";
import toast from "react-hot-toast";
const CreateQuizzPage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(`${localStorage.getItem("userData")}`);
  const companyId = userInfo ? userInfo.company.id : null;
  // GET ALL STAFFS
  const [departments, setDepartments] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataListExam, setDataListExam] = useState(
    useSelector((state) => state.exams.listExam)
  );
  console.log("dataListExam", dataListExam);
  const getAllDepartments = () => {
    getAllDepartment(companyId)
      .then((res) => {
        setDepartments(res?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  React.useEffect(() => {
    getAllDepartment();
  }, []);
  React.useEffect(() => {
    getAllDepartments();
  }, []);
  const [createQuizForm, setCreateQuizForm] = React.useState({
    quizSampleId: 0,
    quiz: {
      showPoint: true,
      shuffle: true,
      description: "",
      quizTime: "",
      startTime: "",
      expiredTime: "",
      userIds: [],
    },
  });
  const [staff, setStaff] = useState([]);
  const [checkCandidates, setCheckCandidates] = useState("staff");
  const objectOptions = [
    { value: "staff", label: "Nhân viên trong công ty" },
    { value: "client", label: "Ứng viên" },
  ];
  const objectRoomOptions = departments.map((item) => {
    return { id: item.id, value: item.id, label: item.name };
  });
  const objectStaffOptions = staff.map((item) => {
    return { id: item.id, value: item.id, label: item.fullName };
  });
  const getStaffByRoomId = (roomId) => {
    getStaffByDepartmentId(roomId)
      .then((res) => {
        setStaff(res?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleChangeStaff = (key, value) => {
    switch (key) {
      case "room":
        getStaffByRoomId(value);
      default:
        break;
    }
  };
  const handleChangeCandidates = (value) => {
    setCheckCandidates(value);
  };
  const backPage = () => {
    navigate(-1);
  };
  const getExamFromId = (id) => {
    return dataListExam?.find((item, index) => {
      return item.id === id;
    });
  };
  const handleChangeExam = (id) => {
    setOpenModal(true);
  };
  const handleChangeCreateQuiz = (key, value) => {
    switch (key) {
      case "name": {
        const newCreateQuizForm = {
          ...createQuizForm,
          quiz: {
            ...createQuizForm.quiz,
            description: value,
          },
        };
        setCreateQuizForm(newCreateQuizForm);
        break;
      }
      case "quizTime": {
        const newCreateQuizForm = {
          ...createQuizForm,
          quiz: {
            ...createQuizForm.quiz,
            quizTime: value,
          },
        };
        setCreateQuizForm(newCreateQuizForm);
        break;
      }
      case "numberDoExams": {
        break;
      }
      case "startTime": {
        const newCreateQuizForm = {
          ...createQuizForm,
          quiz: {
            ...createQuizForm.quiz,
            startTime: value.dateString,
          },
        };
        setCreateQuizForm(newCreateQuizForm);
        break;
      }
      case "expiredTime": {
        const newCreateQuizForm = {
          ...createQuizForm,
          quiz: {
            ...createQuizForm.quiz,
            expiredTime: value,
          },
        };
        setCreateQuizForm(newCreateQuizForm);
        break;
      }
      case "userId": {
        console.log("userId", value);
        const newCreateQuizForm = {
          ...createQuizForm,
          quiz: {
            ...createQuizForm.quiz,
            userIds: value,
          },
        };
        setCreateQuizForm(newCreateQuizForm);
        break;
      }
    }
  };
  const validateData = () => {
    if (createQuizForm.quiz.description === "") {
      toast.error("Vui lòng nhập tên bài kiểm tra");
      return false;
    } else if (createQuizForm.quiz.startTime === "") {
      toast.error("Vui lòng chọn thời gian mở bài kiểm tra");
      return false;
    } else if (createQuizForm.quiz.expiredTime === "") {
      toast.error("Vui lòng chọn thời gian đóng bài kiểm tra");
      return false;
    } else if (
      createQuizForm.quiz.startTime > createQuizForm.quiz.expiredTime
    ) {
      toast.error("Thời gian mở phải sau thời gian đóng");
      return false;
    } else if (createQuizForm.quiz.userIds.length === 0) {
      toast.error("Bạn chưa chọn ứng viên làm bài");
      return false;
    } else if (!createQuizForm.quizSampleId) {
      toast.error("Bạn chưa chọn đề thi");
      return false;
    }
    return true;
  };

  const handleCreateTest = () => {
    if (validateData()) {
      createTestSample(createQuizForm)
        .then((res) => {
          console.log("res", res);
          toast.success("Tạo bài kiểm tra thành công");
          navigate("/list-test");
        })
        .catch((err) => {
          toast.error("Đã có lỗi xảy ra khi tạo bài");
        });
    }
  };
  return (
    <div>
      <Box
        onClick={() => backPage()}
        style={{
          textAlign: "left",
          color: "blue",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        <span>
          <ChevronLeftIcon /> Quay lại
        </span>
      </Box>
      <Typography
        style={{
          fontWeight: 600,
          fontSize: 20,
          textAlign: "center",
          color: "#161E54",
        }}
      >
        Thiếp lập bài kiểm tra
      </Typography>
      <Box sx={{ width: "70%", margin: " 40px auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              style={{ color: "#161E54", fontWeight: 500, fontSize: "16px" }}
            >
              Tên bài kiểm tra
              <StarIcon
                sx={{ color: "red", fontSize: "10px", marginBottom: "10px" }}
              />
            </Typography>
            <InputField
              placeholder="Nhập tên bài kiểm tra"
              value={createQuizForm.quiz.description}
              onChange={(e) => handleChangeCreateQuiz("name", e.target.value)}
              maxLength={400}
              width={440}
            />
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "space-between" }}
            item
            xs={6}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                style={{ color: "#161E54", fontWeight: 500, fontSize: "16px" }}
              >
                Thời gian làm bài
                <StarIcon
                  sx={{ color: "red", fontSize: "10px", marginBottom: "10px" }}
                />
              </Typography>
              <InputNumber
                min={1}
                defaultValue={1}
                style={{ height: "32px", width: "200px" }}
                onChange={(value) => {
                  handleChangeCreateQuiz("quizTime", value);
                }}
                value={createQuizForm.quiz.quizTime}
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                style={{ color: "#161E54", fontWeight: 500, fontSize: "16px" }}
              >
                Lượt thi tối đa
                <StarIcon
                  sx={{ color: "red", fontSize: "10px", marginBottom: "10px" }}
                />
              </Typography>
              <InputNumber
                min={1}
                defaultValue={1}
                style={{ height: "32px", width: "200px" }}
                onChange={(value) => {
                  handleChangeCreateQuiz("numberDoExams", value);
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid mt={2} container spacing={2}>
          <Grid item xs={6}>
            <Typography
              style={{ color: "#161E54", fontWeight: 500, fontSize: "16px" }}
            >
              Thời gian mở
              <StarIcon
                sx={{ color: "red", fontSize: "10px", marginBottom: "10px" }}
              />
            </Typography>
            <DatePicker
              style={{ width: 440 }}
              showTime
              onChange={(date, dateString) => {
                handleChangeCreateQuiz("startTime", {
                  date: date,
                  dateString: dateString,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{ color: "#161E54", fontWeight: 500, fontSize: "16px" }}
            >
              Thời gian đóng
              <StarIcon
                sx={{ color: "red", fontSize: "10px", marginBottom: "10px" }}
              />
              <DatePicker
                style={{ width: 440 }}
                showTime
                onChange={(date, dateString) => {
                  handleChangeCreateQuiz("expiredTime", dateString);
                }}
              />
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider style={{ marginTop: "40px" }} />
      <Box sx={{ width: "80%", margin: "20px auto" }}>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Box>
              <Typography
                style={{
                  color: "#161E54",
                  fontWeight: 500,
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                Lựa chọn đối tượng
                <StarIcon
                  sx={{ color: "red", fontSize: "10px", marginBottom: "10px" }}
                />
              </Typography>
              <Box mb={2}>
                <Select
                  placeholder="Chọn đối tượng"
                  onChange={(value) => {
                    handleChangeCandidates(value);
                  }}
                  style={{ width: 510 }}
                  options={objectOptions}
                  name="styleQuestion"
                />
              </Box>
              {checkCandidates === "staff" ? (
                <Box>
                  <Select
                    style={{ width: 234, marginRight: 40 }}
                    placeholder="Lựa chọn phòng ban"
                    options={objectRoomOptions}
                    onChange={(value) => handleChangeStaff("room", value)}
                  />
                  <Select
                    style={{ width: 235 }}
                    placeholder="Lựa chọn nhân viên"
                    options={objectStaffOptions}
                    maxTagCount="responsive"
                    mode="multiple"
                    onChange={(value) => {
                      handleChangeCreateQuiz("userId", value);
                    }}
                  />
                </Box>
              ) : (
                <Box
                  style={{
                    padding: "20px",
                    width: "510px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                  }}
                >
                  <Box>
                    <Typography style={{ marginBottom: "5px" }}>
                      Đến:
                    </Typography>
                    <InputField type="text" width={400} />
                  </Box>
                  <Box>
                    <Typography style={{ marginBottom: "5px" }}>
                      Tiêu đề:
                    </Typography>
                    <InputField type="text" width={400} />
                  </Box>
                  <Box>
                    <Typography style={{ marginBottom: "5px" }}>
                      Tin nhắn:
                    </Typography>
                    <Input.TextArea sx={{ height: "40px", width: "400px" }} />
                  </Box>
                </Box>
              )}
            </Box>
            <Box style={{ marginTop: "50px" }}>
              <Typography
                style={{
                  color: "#161E54",
                  fontWeight: 500,
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                Lựa chọn đề thi
                <StarIcon
                  sx={{ color: "red", fontSize: "10px", marginBottom: "10px" }}
                />
                <Button
                  onClick={() => setOpenModal(true)}
                  style={{
                    marginLeft: "20px",
                    height: "30px",
                    borderRadius: "5px",
                    marginRight: "30px",
                  }}
                >
                  Tìm đề thi
                </Button>
                <span
                  onClick={handleChangeExam}
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "blue",
                    fontStyle: "italic",
                  }}
                >
                  {getExamFromId(createQuizForm?.quizSampleId)?.description ||
                    "Đề thi"}
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ marginLeft: "-25px" }}>
            <Typography
              style={{
                color: "#161E54",
                fontWeight: 500,
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              Cài đặt nâng cao
              <StarIcon
                sx={{ color: "red", fontSize: "10px", marginBottom: "10px" }}
              />
            </Typography>
            <Stack direction="row">
              <Box>
                <Box>
                  <input
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "10px",
                    }}
                    type="checkbox"
                  />
                  <Typography
                    style={{ fontSize: "16px", display: "inline-block" }}
                  >
                    Đảo câu hỏi
                  </Typography>
                </Box>
                <Box>
                  <input
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "10px",
                    }}
                    type="checkbox"
                  />
                  <Typography
                    style={{ fontSize: "16px", display: "inline-block" }}
                  >
                    Hiển thị điểm sau khi làm bài
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ marginLeft: "20px" }}>
                <Box>
                  <input
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "10px",
                    }}
                    type="checkbox"
                  />
                  <Typography
                    style={{ fontSize: "16px", display: "inline-block" }}
                  >
                    Cho phép làm lại bài thi
                  </Typography>
                </Box>
                <Box>
                  <input
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "10px",
                    }}
                    type="checkbox"
                  />
                  <Typography
                    style={{ fontSize: "16px", display: "inline-block" }}
                  >
                    Hiển thị đáp án sau khi làm bài
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <Box sx={{ marginTop: "40px" }}>
              <Typography
                style={{
                  color: "#161E54",
                  fontWeight: 500,
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                Hướng dẫn làm bài kiểm tra
                <StarIcon
                  sx={{ color: "red", fontSize: "10px", marginBottom: "10px" }}
                />
              </Typography>
              <Input.TextArea sx={{ height: "40px" }} />
            </Box>
            <Box style={{ textAlign: "right" }}>
              <Button
                onClick={() => {
                  handleCreateTest();
                }}
                style={{
                  color: "white",
                  background: "#092C4C",
                  borderRadius: "5px",
                  marginTop: "20px",
                }}
              >
                Xác nhận tạo
              </Button>
            </Box>
          </Grid>
        </Grid>
        <ModalChooseExam
          openModal={openModal}
          setOpenModal={setOpenModal}
          createQuizForm={createQuizForm}
          setCreateQuizForm={setCreateQuizForm}
        />
      </Box>
    </div>
  );
};

export default CreateQuizzPage;
