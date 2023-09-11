import { convertDataOptions } from "@src/utility/Utils.js";
import AddCategories from "./addCategories/index.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button, Typography } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Stack, breadcrumbsClasses } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import toast from "react-hot-toast";
import { createSampleExam } from "@src/@core/api/exam.js";
const CreateExamAutomatic = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const match = search.match(/name=(.*)/);
  const name = match?.[1];
  console.log("name", name);
  const [dataCategoryOptions, setDataCategoryOptions] = useState(
    convertDataOptions(useSelector((state) => state.questions.listCategory))
  );
  const [dataQuestionType, setDataQuestionType] = useState(
    convertDataOptions(useSelector((state) => state.questions.listQuestionType))
  );

  const [conditionQuestion, setConditionQuestion] = useState({
    // index: 1,
    questionType: 1,
    quantity: 1,
    questionPoint: 1,
    level: "EASY",
    categoryId: 52,
  });
  const [createExamForm, setCreateExamForm] = useState({
    topicId: null,
    quiz: {
      description: name.replace(/%/g, " ").trim(),
      quizTime: "50",
      startTime: null,
      expiredTime: null,
    },
    quizCategories: [conditionQuestion],
  });
  const [indexState, setIndexState] = useState([{ index: 1 }]);
  const handleChangeExam = (key, value, index) => {
    switch (key) {
      case "dataQuestion": {
        const newListCondition = createExamForm.quizCategories.map(
          (item, idx) => {
            return idx + 1 === index ? { ...item, questionType: value } : item;
          }
        );
        console.log("newListCondition", newListCondition);
        setCreateExamForm({
          ...createExamForm,
          quizCategories: newListCondition,
        });
        break;
      }
      case "numberQuestion": {
        const newListCondition = createExamForm.quizCategories.map(
          (item, idx) => {
            return idx + 1 === index ? { ...item, quantity: value } : item;
          }
        );
        setCreateExamForm({
          ...createExamForm,
          quizCategories: newListCondition,
        });
        break;
      }
      case "pointQuestion": {
        const newListCondition = createExamForm.quizCategories.map(
          (item, idx) => {
            return idx + 1 === index ? { ...item, questionPoint: value } : item;
          }
        );
        setCreateExamForm({
          ...createExamForm,
          quizCategories: newListCondition,
        });
        break;
      }
      case "level": {
        console.log("indexId", index);
        console.log("value", value);
        const newListCondition = createExamForm.quizCategories.map(
          (item, idx) => {
            return idx + 1 === index ? { ...item, level: value } : item;
          }
        );
        setCreateExamForm({
          ...createExamForm,
          quizCategories: newListCondition,
        });
        break;
      }
      case "questionType": {
        console.log("indexId", index);
        console.log("value", value);
        const newListCondition = createExamForm.quizCategories.map(
          (item, idx) => {
            return idx + 1 === index ? { ...item, categoryId: value } : item;
          }
        );
        setCreateExamForm({
          ...createExamForm,
          quizCategories: newListCondition,
        });
        break;
      }
      default: {
        setCreateExamForm(createExamForm);
      }
    }
  };
  const handleChangeQuantityCate = (type, id) => {
    if (type === "add") {
      const newIndex = indexState[indexState.length - 1].index + 1;
      setIndexState([...indexState, { index: newIndex }]);
      setCreateExamForm({
        ...createExamForm,
        quizCategories: [
          ...createExamForm.quizCategories,
          {
            questionType: 1,
            quantity: 1,
            questionPoint: 1,
            level: "EASY",
            categoryId: 52,
          },
        ],
      });
    }
    if (type === "remove") {
      const newIndexArr = indexState.filter(
        (i) => i.index !== indexState.length || i.index === 1
      );
      setIndexState(newIndexArr);
      createExamForm.quizCategories.length === 1
        ? setCreateExamForm(createExamForm)
        : setCreateExamForm({
            ...createExamForm,
            quizCategories: createExamForm.quizCategories.splice(
              0,
              createExamForm.quizCategories.length - 1
            ),
          });
    }
  };

  const createExam = () => {
    createSampleExam(createExamForm)
      .then((res) => {
        toast.success("Tạo câu hỏi thành công");
        navigate("/exam-bank");
      })
      .catch((err) => {
        if (err?.data?.code == 103135) {
          toast.error("Chủ đề không đủ câu hỏi");
        } else {
          toast.error("Đã có lỗi xảy ra");
        }
      });
  };
  const backPage = () => {
    navigate(-1);
  };
  var tongDiem = 0;
  for (var i = 0; i < createExamForm.quizCategories.length; i++) {
    tongDiem +=
      createExamForm.quizCategories[i].questionPoint *
      createExamForm.quizCategories[i].quantity;
  }

  return (
    <div style={{ marginBottom: "100px" }}>
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
          fontSize: 24,
          textAlign: "center",
          color: "#161E54",
        }}
      >
        Tạo đề thi tự động
      </Typography>
      <Typography
        style={{
          color: "#161E54",
          fontSize: "18px",
          fontWeight: "600",
          textAlign: "right",
          marginRight: "30px",
        }}
      >
        Tổng điểm{" "}
        <span
          style={{
            padding: "8px 20px",
            borderRadius: "5px",
            background: "#161E54",
            color: "white",
          }}
        >
          {tongDiem}
        </span>
      </Typography>
      {Array.isArray(indexState) && indexState.length > 0
        ? indexState.map((item, index) => (
            <AddCategories
              item={item}
              index={index + 1}
              dataCategoryOptions={dataCategoryOptions}
              dataQuestionType={dataQuestionType}
              conditionQuestion={conditionQuestion}
              setConditionQuestion={setConditionQuestion}
              handleChangeExam={handleChangeExam}
              createExamForm={createExamForm}
              indexState={indexState}
              handleChangeQuantityCate={handleChangeQuantityCate}
            />
          ))
        : null}
      <Stack direction="row" justifyContent="space-between">
        <Box style={{ margin: "auto", paddingLeft: "140px" }}>
          <Button
            onClick={() => handleChangeQuantityCate("add")}
            type="primary"
            icon={<AddIcon />}
          >
            Thêm điều kiện
          </Button>
        </Box>
        <Box
          onClick={() => createExam()}
          style={{ color: "blue", cursor: "pointer", fontSize: "16px" }}
        >
          <span>
            Tạo đề thi <NavigateNextIcon />
          </span>
        </Box>
      </Stack>
    </div>
  );
};
export default CreateExamAutomatic;
