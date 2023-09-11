import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Icon,
  MenuItem,
  Modal,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SelectFieldCustom from "@components/selectFieldCustom";
import { convertDataOptions, listDifficulty } from "@src/utility/Utils";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Editor } from "@components/editor";
import ReactHtmlParser from "react-html-parser";
const CreateQuestion = (props) => {
  const {
    showCreateQuestion,
    toggleCreateQuestion,
    categories,
    quesTypes,
    isTopic,
    postCreateQuestion,
    setCountWordEdit,
  } = props;
  const dataCategoryOptions = convertDataOptions(categories);
  const dataQuestionTypeOptions = convertDataOptions(quesTypes);
  const [questionSubmit, setQuestionSubmit] = useState({
    topicId: isTopic ? topicId : 52, //52 cua ky 1 cua huy
    categoryId: dataCategoryOptions[0]?.value,
    isPublic: true,
    isActive: true,
    content: "",
    questionTypeId: dataQuestionTypeOptions[0]?.value,
    level: listDifficulty[0].value,
    questionChoices: [],
  });
  const [choiceA, setChoiceA] = useState({ name: "", isTrue: true });
  const [choiceB, setChoiceB] = useState({ name: "", isTrue: false });
  const [choiceC, setChoiceC] = useState({ name: "", isTrue: false });
  const [choiceD, setChoiceD] = useState({ name: "", isTrue: false });
  const [choiceYes, setChoiceYes] = useState({ name: "Đúng", isTrue: true });
  const [choiceNo, setChoiceNo] = useState({ name: "Sai", isTrue: false });
  const [typeChoice, setTypeChoice] = useState(1);
  const [disableCreate, setDisableCreate] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1200px",
    height: "700px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 7,
    borderRadius: "5px",
    overflow: "auto",
  };

  const handleChangeUpdateQuestion = (key, value) => {
    switch (key) {
      case "category":
        setQuestionSubmit({
          ...questionSubmit,
          categoryId: value?.value,
        });
        break;
      case "questionType":
        setQuestionSubmit({
          ...questionSubmit,
          questionTypeId: value?.value,
        });
        break;
      case "level":
        setQuestionSubmit({
          ...questionSubmit,
          level: value?.value,
        });
        break;
      case "content":
        setQuestionSubmit({
          ...questionSubmit,
          content: value,
        });
        break;
      case "choice_A":
        setChoiceA({ ...choiceA, name: value });
        break;
      case "choice_B":
        setChoiceB({ ...choiceB, name: value });
        break;
      case "choice_C":
        setChoiceC({ ...choiceC, name: value });
        break;
      case "choice_D":
        setChoiceD({ ...choiceD, name: value });
        break;
      case "choice_A_check":
        setChoiceA({ ...choiceA, isTrue: value });
        break;
      case "choice_B_check":
        setChoiceB({ ...choiceB, isTrue: value });
        break;
      case "choice_C_check":
        setChoiceC({ ...choiceC, isTrue: value });
        break;
      case "choice_D_check":
        setChoiceD({ ...choiceD, isTrue: value });
        break;
      case "choice_Yes_check":
        setChoiceYes({ name: "Đúng", isTrue: value });
        break;
      case "choice_No_check":
        setChoiceNo({ name: "Sai", isTrue: value });
        break;
      default:
        break;
    }
  };
  const checkDuplicateQuestion = () => {
    for (let i = 0; i < questionSubmit.questionChoices.length - 1; i++) {
      for (let j = i + 1; j < questionSubmit.questionChoices.length; j++) {
        if (
          questionSubmit.questionChoices[i].name.trim() !== "" &&
          questionSubmit.questionChoices[j].name.trim() !== ""
        ) {
          if (
            questionSubmit.questionChoices[i].name.replace(/<[^>]+>/g, "") ===
            questionSubmit.questionChoices[j].name.replace(/<[^>]+>/g, "")
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };
  const handleClickCreateQuestion = () => {
    postCreateQuestion(questionSubmit);
    resetAddQuestion();
    setDisableCreate(true);
  };

  useEffect(() => {
    if (typeChoice == 1) {
      if (choiceA.isTrue === true) {
        setChoiceB({ ...choiceB, isTrue: false });
        setChoiceC({ ...choiceC, isTrue: false });
        setChoiceD({ ...choiceD, isTrue: false });
      }
    }
  }, [typeChoice, choiceA]);

  useEffect(() => {
    if (typeChoice == 1) {
      if (choiceB.isTrue === true) {
        setChoiceA({ ...choiceA, isTrue: false });
        setChoiceC({ ...choiceC, isTrue: false });
        setChoiceD({ ...choiceD, isTrue: false });
      }
    }
  }, [typeChoice, choiceB]);

  useEffect(() => {
    if (typeChoice == 1) {
      if (choiceC.isTrue === true) {
        setChoiceA({ ...choiceA, isTrue: false });
        setChoiceB({ ...choiceB, isTrue: false });
        setChoiceD({ ...choiceD, isTrue: false });
      }
    }
  }, [typeChoice, choiceC]);

  useEffect(() => {
    if (typeChoice == 1) {
      if (choiceD.isTrue === true) {
        setChoiceA({ ...choiceA, isTrue: false });
        setChoiceC({ ...choiceC, isTrue: false });
        setChoiceB({ ...choiceB, isTrue: false });
      }
    }
  }, [typeChoice, choiceD]);
  useEffect(() => {
    if (typeChoice == 5) {
      if (choiceYes.isTrue === true) {
        setChoiceNo({ name: "Sai", isTrue: false });
      }
    }
  }, [typeChoice, choiceYes]);
  useEffect(() => {
    if (typeChoice == 5) {
      if (choiceNo.isTrue === true) {
        setChoiceYes({ name: "Đúng", isTrue: false });
      }
    }
  }, [typeChoice, choiceNo]);
  useEffect(() => {
    setQuestionSubmit({
      ...questionSubmit,
      questionChoices: [choiceA, choiceB, choiceC, choiceD],
    });
  }, [choiceA, choiceB, choiceC, choiceD]);
  useEffect(() => {
    setQuestionSubmit({
      ...questionSubmit,
      questionChoices: [choiceYes, choiceNo],
    });
  }, [choiceYes, choiceNo]);
  useEffect(() => {
    setTypeChoice(questionSubmit.questionTypeId);
  }, [questionSubmit]);

  const checkCountChoice = () => {
    if (typeChoice === 2) {
      const numberCorrect = questionSubmit.questionChoices?.filter(
        (q) => q.isTrue === true
      );
      if (numberCorrect?.length < 2) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (typeChoice == 1 || typeChoice == 2) {
      if (questionSubmit) {
        if (
          questionSubmit?.content.replace(/<[^>]+>/g, "") === "" ||
          checkCountChoice() ||
          checkDuplicateQuestion() ||
          questionSubmit?.categoryId === "" ||
          questionSubmit?.questionTypeId === "" ||
          questionSubmit?.level === "" ||
          choiceA?.name?.replace(/<[^>]+>/g, "") === "" ||
          choiceB?.name?.replace(/<[^>]+>/g, "") === "" ||
          choiceC?.name?.replace(/<[^>]+>/g, "") === "" ||
          choiceD?.name?.replace(/<[^>]+>/g, "") === ""
        ) {
          setDisableCreate(true);
        } else {
          setDisableCreate(false);
        }
      }
    } else if (typeChoice == 3) {
      if (questionSubmit) {
        if (
          questionSubmit?.content.replace(/<[^>]+>/g, "") === "" ||
          questionSubmit?.categoryId === "" ||
          questionSubmit?.level === "" ||
          questionSubmit?.questionTypeId === ""
        ) {
          setDisableCreate(true);
        } else {
          setDisableCreate(false);
        }
      }
    } else if (typeChoice == 5) {
      if (questionSubmit) {
        if (
          questionSubmit?.content.replace(/<[^>]+>/g, "") === "" ||
          questionSubmit?.categoryId === "" ||
          questionSubmit?.level === "" ||
          questionSubmit?.questionTypeId === ""
        ) {
          setDisableCreate(true);
        } else {
          setDisableCreate(false);
        }
      }
    }
  }, [questionSubmit]);
  // const handleChangeQuantityCate = (type) => {
  //   if (type === "add") {
  //     console.log("abc");
  //   }
  //   if (type === "remove") {
  //     console.log("hbg");
  //   }
  // };
  const resetAddQuestion = () => {
    setQuestionSubmit({
      topicId: isTopic ? topicId : 52, //52 la cua ky, 1 la cua huy
      categoryId: dataCategoryOptions[0]?.value,
      isPublic: true,
      isActive: true,
      content: "",
      questionTypeId: dataQuestionTypeOptions[0]?.value,
      level: listDifficulty[0].value,
      questionChoices: [],
    });
    setChoiceA({ name: "", isTrue: true });
    setChoiceB({ name: "", isTrue: false });
    setChoiceC({ name: "", isTrue: false });
    setChoiceD({ name: "", isTrue: false });
  };

  return (
    <Modal open={showCreateQuestion} aria-labelledby="modal-modal-title">
      <Box sx={style}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 20,
            marginBottom: "20px",
            color: "#525252",
          }}
        >
          Tạo câu hỏi mới
        </Typography>
        <CloseIcon
          sx={{
            display: "block",
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
            "&:hover": {
              border: "1px solid #ccc",
            },
          }}
          onClick={() => {
            setDisableCreate(true);
            toggleCreateQuestion();
            resetAddQuestion();
          }}
        />
        <Grid sx={{ marginBottom: "20px" }} container spacing={3}>
          <Grid item xs={4}>
            <SelectFieldCustom
              title="Chủ đề"
              data={dataCategoryOptions}
              handleOnChange={handleChangeUpdateQuestion}
              defaultValue={questionSubmit?.categoryId}
              name="category"
              hiddenClear
              width="100%"
              isDisable={isTopic ? true : false}
            />
          </Grid>
          <Grid item xs={4}>
            <SelectFieldCustom
              title="Loại câu hỏi"
              data={dataQuestionTypeOptions}
              handleOnChange={handleChangeUpdateQuestion}
              defaultValue={questionSubmit?.questionTypeId}
              name="questionType"
              hiddenClear
              width="100%"
            />
          </Grid>
          <Grid item xs={4}>
            <SelectFieldCustom
              title="Độ khó"
              data={listDifficulty}
              handleOnChange={handleChangeUpdateQuestion}
              defaultValue={questionSubmit?.level}
              name="level"
              hiddenClear
              width="100%"
            />
          </Grid>
        </Grid>
        <Typography
          sx={{
            color: "#484848",
            fontWeight: "600",
            position: "relative",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        >
          Nội dung câu hỏi:
          <StarIcon
            sx={{ color: "red", fontSize: "10px", position: "absolute" }}
          />
        </Typography>
        <Editor
          name="content"
          handleChangeText={handleChangeUpdateQuestion}
          isView={true}
          content={questionSubmit?.content ?? ""}
        />
        {checkCountChoice() === true ? (
          <div
            style={{
              fontSize: "13px",
              color: "red",
              textAlign: "center",
              paddingTop: "10px",
            }}
          >
            Loại câu hỏi này yêu cầu phải có ít nhất 2 đáp án đúng
          </div>
        ) : null}
        {(typeChoice == 1 || typeChoice == 2) && (
          <>
            <Typography
              sx={{
                color: "#484848",
                fontWeight: "600",
                position: "relative",
                marginBottom: "10px",
                fontSize: "16px",
                paddingTop: "15px",
              }}
            >
              Đáp án
            </Typography>
            <Grid sx={{ marginTop: "35px", marginBottom: "50px" }} container>
              <Grid item xs={1}>
                <Box>
                  {typeChoice == 1 ? (
                    <Radio
                      color="success"
                      checked={choiceA.isTrue}
                      onChange={(e) =>
                        handleChangeUpdateQuestion(
                          "choice_A_check",
                          e.target.checked
                        )
                      }
                    />
                  ) : (
                    <Checkbox
                      color="success"
                      checked={choiceA.isTrue}
                      onChange={(e) =>
                        handleChangeUpdateQuestion(
                          "choice_A_check",
                          e.target.checked
                        )
                      }
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={11}>
                <Editor
                  name="choice_A"
                  handleChangeText={handleChangeUpdateQuestion}
                  content={choiceA?.name ?? ""}
                  isView={true}
                />
              </Grid>
            </Grid>
            <Grid sx={{ marginBottom: "50px" }} container>
              <Grid item xs={1}>
                <Box>
                  {typeChoice == 1 ? (
                    <Radio
                      color="success"
                      checked={choiceB.isTrue}
                      onChange={(e) =>
                        handleChangeUpdateQuestion(
                          "choice_B_check",
                          e.target.checked
                        )
                      }
                    />
                  ) : (
                    <Checkbox
                      color="success"
                      checked={choiceB.isTrue}
                      onChange={(e) =>
                        handleChangeUpdateQuestion(
                          "choice_B_check",
                          e.target.checked
                        )
                      }
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={11}>
                <Editor
                  name="choice_B"
                  handleChangeText={handleChangeUpdateQuestion}
                  content={choiceB?.name ?? ""}
                  isView={true}
                />
              </Grid>
            </Grid>
            <Grid sx={{ marginBottom: "50px" }} container>
              <Grid item xs={1}>
                <Box>
                  {typeChoice == 1 ? (
                    <Radio
                      color="success"
                      checked={choiceC.isTrue}
                      onChange={(e) =>
                        handleChangeUpdateQuestion(
                          "choice_C_check",
                          e.target.checked
                        )
                      }
                    />
                  ) : (
                    <Checkbox
                      color="success"
                      checked={choiceC.isTrue}
                      onChange={(e) =>
                        handleChangeUpdateQuestion(
                          "choice_C_check",
                          e.target.checked
                        )
                      }
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={11}>
                <Editor
                  name="choice_C"
                  handleChangeText={handleChangeUpdateQuestion}
                  content={choiceC?.name ?? ""}
                  isView={true}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1}>
                <Box>
                  {typeChoice == 1 ? (
                    <Radio
                      color="success"
                      checked={choiceD.isTrue}
                      onChange={(e) =>
                        handleChangeUpdateQuestion(
                          "choice_D_check",
                          e.target.checked
                        )
                      }
                    />
                  ) : (
                    <Checkbox
                      color="success"
                      checked={choiceD.isTrue}
                      onChange={(e) =>
                        handleChangeUpdateQuestion(
                          "choice_D_check",
                          e.target.checked
                        )
                      }
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={11}>
                <Editor
                  name="choice_D"
                  handleChangeText={handleChangeUpdateQuestion}
                  content={choiceD?.name ?? ""}
                  isView={true}
                />
              </Grid>
            </Grid>
          </>
        )}
        {/* {(typeChoice == 2 || typeChoice == 1) && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <IconButton
              style={{ borderRadius: "50%", marginRight: "10px" }}
              onClick={() => handleChangeQuantityCate("add")}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              style={{ borderRadius: "50%", marginLeft: "10px" }}
              onClick={() => handleChangeQuantityCate("remove")}
            >
              <RemoveIcon />
            </IconButton>
          </div>
        )} */}
        {typeChoice == 5 && (
          <>
            <Grid sx={{ marginBottom: "10px", marginTop: "35px" }} container>
              <Grid item xs={1}>
                <Radio
                  color="success"
                  checked={choiceYes.isTrue}
                  onChange={(e) =>
                    handleChangeUpdateQuestion(
                      "choice_Yes_check",
                      e.target.checked
                    )
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <Typography
                  sx={{
                    color: "#484848",
                    fontWeight: "600",
                    fontSize: "16px",
                    paddingTop: "7px",
                  }}
                >
                  Đúng
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1}>
                <Radio
                  color="success"
                  checked={choiceNo.isTrue}
                  onChange={(e) =>
                    handleChangeUpdateQuestion(
                      "choice_No_check",
                      e.target.checked
                    )
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <Typography
                  sx={{
                    color: "#484848",
                    fontWeight: "600",
                    fontSize: "16px",
                    paddingTop: "7px",
                  }}
                >
                  Sai
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
        {typeChoice == 3 && null}
        {checkDuplicateQuestion() && (
          <Typography
            style={{ color: "red", textAlign: "center", marginTop: "10px" }}
          >
            Đáp án đã bị trùng lặp
          </Typography>
        )}
        <Box mt={5} align="right">
          <Button
            sx={{
              width: 120,
              bgcolor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "red",
                opacity: 0.8,
              },
            }}
            variant="contained"
            onClick={() => {
              toggleCreateQuestion();
              resetAddQuestion();
            }}
          >
            Hủy
          </Button>
          <Button
            sx={{
              width: 120,
              bgcolor: "blue",
              color: "white",
              marginLeft: "20px!important",
              "&:hover": {
                backgroundColor: "blue",
                opacity: 0.8,
              },
            }}
            disabled={disableCreate}
            variant="contained"
            onClick={handleClickCreateQuestion}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateQuestion;
