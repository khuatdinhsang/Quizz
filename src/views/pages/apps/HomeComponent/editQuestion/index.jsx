import {
  Box,
  Button,
  Checkbox,
  Grid,
  Modal,
  Radio,
  Typography,
} from "@mui/material";
import { convertDataOptions, listDifficulty } from "@src/utility/Utils";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import SelectFieldCustom from "@components/selectFieldCustom";
import { Editor } from "@components/editor";
import toast from "react-hot-toast";
import ReactHtmlParser from "react-html-parser";
import {
  getListCategoryApi,
  getListQuestionApi,
  putUpdateQuestion,
} from "@src/@core/api/question";
import { useNavigate } from "react-router-dom";
import { handleGetListQuestion } from "@redux/question";

export default function EditQuestion(props) {
  const {
    showEditQues,
    toggleEditQues,
    question,
    categories,
    countWord,
    quesTypes,
    isTopic,
    topicId,
    filterListQuestion,
    isView,
    setCountWordEdit,
    setView,
  } = props;
  const styleEditQuestion = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1200px",
    height: "700px ",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 7,
    borderRadius: "5px",
    overflow: "auto",
  };
  const styleViewQuestion = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    // height: "400px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 7,
    borderRadius: "5px",
    overflow: "auto",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataCategoryOptions = convertDataOptions(categories);
  const dataQuestionTypeOptions = convertDataOptions(quesTypes);
  const [questionSubmit, setQuestionSubmit] = useState({
    topicId: isTopic ? topicId : 52,
    id: isTopic ? question?.id : question?.id,
    categoryId: question?.category?.id ?? "",
    content: question?.content ?? "",
    level: question?.level ?? "",
    questionTypeId: question?.questionType?.id ?? "",
    questionChoices: [],
    isActive: true,
    isPublic: true,
  });

  const [typeChoice, setTypeChoice] = useState("");
  const [choiceA, setChoiceA] = useState({ name: "", isTrue: false });
  const [choiceB, setChoiceB] = useState({ name: "", isTrue: false });
  const [choiceC, setChoiceC] = useState({ name: "", isTrue: false });
  const [choiceD, setChoiceD] = useState({ name: "", isTrue: false });
  const [choiceYes, setChoiceYes] = useState({ name: "Đúng", isTrue: false });
  const [choiceNo, setChoiceNo] = useState({ name: "Sai", isTrue: false });
  const [disableUpdate, setDisableUpdate] = useState(false);
  const [checkCountChoice, setCheckCountChoice] = useState(true);

  useEffect(() => {
    setTypeChoice(questionSubmit.questionTypeId);
  }, [questionSubmit]);

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
        setChoiceNo({ ...choiceNo, isTrue: false });
      }
    }
  }, [typeChoice, choiceYes]);
  useEffect(() => {
    if (typeChoice == 5) {
      if (choiceNo.isTrue === true) {
        setChoiceYes({ ...choiceYes, isTrue: false });
      }
    }
  }, [typeChoice, choiceNo]);
  useEffect(() => {
    if (question && question?.questionChoices) {
      setQuestionSubmit({
        topicId: isTopic ? topicId : 52,
        id: question?.id,
        categoryId: question?.category?.id,
        content: question?.content,
        level: question?.level,
        questionTypeId: question?.questionType?.id,
        isActive: true,
        isPublic: true,
      });
      setChoiceA({
        id: question?.questionChoices[0]?.id,
        name: question?.questionChoices[0]?.name,
        isTrue: question?.questionChoices[0]?.isTrue,
      });
      setChoiceB({
        id: question?.questionChoices[1]?.id,
        name: question?.questionChoices[1]?.name,
        isTrue: question?.questionChoices[1]?.isTrue,
      });
      setChoiceC({
        id: question?.questionChoices[2]?.id,
        name: question?.questionChoices[2]?.name,
        isTrue: question?.questionChoices[2]?.isTrue,
      });
      setChoiceD({
        id: question?.questionChoices[3]?.id,
        name: question?.questionChoices[3]?.name,
        isTrue: question?.questionChoices[3]?.isTrue,
      });
      setChoiceYes({
        id: question?.questionChoices[0]?.id,
        name: question?.questionChoices[0]?.name,
        isTrue: question?.questionChoices[0]?.isTrue,
      });
      setChoiceNo({
        id: question?.questionChoices[1]?.id,
        name: question?.questionChoices[1]?.name,
        isTrue: question?.questionChoices[1]?.isTrue,
      });
    }
  }, [question]);
  const checkQuestionIsHtml = (question) => {
    if (question?.includes("<")) {
      return question.replace(/<[^>]+>/g, "");
    } else {
      return question;
    }
  };
  const handleChangeUpdateQuestion = (key, value) => {
    switch (key) {
      case "category":
        setQuestionSubmit({ ...questionSubmit, categoryId: value?.value });
        break;
      case "questionType":
        setQuestionSubmit({ ...questionSubmit, questionTypeId: value?.value });
        break;
      case "level":
        setQuestionSubmit({ ...questionSubmit, level: value?.value });
        break;
      case "content":
        setQuestionSubmit({ ...questionSubmit, content: value });
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
        setChoiceYes({ ...choiceYes, isTrue: value });
        break;
      case "choice_No_check":
        setChoiceNo({ ...choiceNo, isTrue: value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (typeChoice === 3) {
      setQuestionSubmit({ ...questionSubmit, questionChoices: [] });
    } else return;
  }, [typeChoice]);

  const checkDuplicateQuestion = () => {
    for (let i = 0; i < questionSubmit.questionChoices?.length - 1; i++) {
      for (let j = i + 1; j < questionSubmit.questionChoices?.length; j++) {
        if (
          questionSubmit.questionChoices[i].name !== "" &&
          questionSubmit.questionChoices[j].name !== ""
        ) {
          if (
            checkQuestionIsHtml(questionSubmit.questionChoices[i].name) ===
            checkQuestionIsHtml(questionSubmit.questionChoices[j].name)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };
  const handleClickUpdateQuestion = () => {
    putUpdateQuestion(questionSubmit)
      .then((res) => {
        toast.success("Cập nhật câu hỏi thành công !");
        toggleEditQues();
        getListQuestionApi(filterListQuestion)
          .then((res) => {
            setPagination({ page: res.data.page, limit: res.data.limit });
            dispatch(handleGetListQuestion({ data: res.data.questions }));
          })
          .catch((err) => dispatch(handleGetListQuestion({ data: [] })));
      })
      .catch((err) => {
        if (err.request?.status === 403)
          toast.error("Bạn không có quyền thực hiện hành động này");
        else toast.error("Đã có lỗi xảy ra !");
      })
      .finally(() => {
        navigate("/home");
      });
  };
  useEffect(() => {
    if (typeChoice === 2) {
      const numberCorrect = questionSubmit.questionChoices?.filter(
        (q) => q.isTrue === true
      );
      if (numberCorrect?.length < 2) {
        setCheckCountChoice(true);
        setDisableUpdate(true);
      } else {
        setCheckCountChoice(false);
        setDisableUpdate(false);
      }
    } else {
      setCheckCountChoice(false);
    }
  }, [typeChoice, questionSubmit, checkCountChoice]);

  useEffect(() => {
    if (typeChoice == 1 || typeChoice == 2) {
      if (questionSubmit) {
        if (
          checkQuestionIsHtml(questionSubmit?.content) === "" ||
          checkCountChoice ||
          checkDuplicateQuestion() ||
          questionSubmit?.categoryId === "" ||
          questionSubmit?.questionTypeId === "" ||
          questionSubmit?.level === "" ||
          checkQuestionIsHtml(choiceA?.name) === "" ||
          checkQuestionIsHtml(choiceB?.name) === "" ||
          checkQuestionIsHtml(choiceC?.name) === "" ||
          checkQuestionIsHtml(choiceD?.name) === ""
        ) {
          setDisableUpdate(true);
        } else {
          setDisableUpdate(false);
        }
      }
    } else if (typeChoice == 3) {
      if (questionSubmit) {
        if (
          checkQuestionIsHtml(questionSubmit?.content) === "" ||
          questionSubmit?.categoryId === "" ||
          questionSubmit?.level === "" ||
          questionSubmit?.questionTypeId === ""
        ) {
          setDisableUpdate(true);
        } else {
          setDisableUpdate(false);
        }
      }
    } else if (typeChoice == 5) {
      if (questionSubmit) {
        if (
          checkQuestionIsHtml(questionSubmit?.content) === "" ||
          questionSubmit?.categoryId === "" ||
          questionSubmit?.level === "" ||
          questionSubmit?.questionTypeId === ""
        ) {
          setDisableUpdate(true);
        } else {
          setDisableUpdate(false);
        }
      }
    }
  }, [questionSubmit]);
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
  return (
    <Modal
      open={showEditQues}
      onClose={() => {
        setView(false);
        toggleEditQues();
      }}
      aria-labelledby="modal-modal-title"
    >
      {isView ? (
        <Box sx={styleEditQuestion}>
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
              setView(false);
              toggleEditQues();
            }}
          />
          <Grid sx={{ marginBottom: "20px" }} container spacing={3}>
            <Grid item xs={4}>
              <SelectFieldCustom
                title="Chủ đề"
                width="100%"
                data={dataCategoryOptions}
                handleOnChange={handleChangeUpdateQuestion}
                defaultValue={questionSubmit?.categoryId}
                name="category"
                hiddenClear
                isDisable={isView ? false : true}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectFieldCustom
                title="Loại câu hỏi"
                width="100%"
                data={dataQuestionTypeOptions}
                handleOnChange={handleChangeUpdateQuestion}
                defaultValue={questionSubmit?.questionTypeId}
                name="questionType"
                hiddenClear
                isDisable={isView ? false : true}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectFieldCustom
                title="Độ khó"
                width="100%"
                data={listDifficulty}
                handleOnChange={handleChangeUpdateQuestion}
                defaultValue={questionSubmit?.level}
                name="level"
                hiddenClear
                isDisable={isView ? false : true}
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
            // value={questionSubmit?.content ?? ""}
            handleChangeText={handleChangeUpdateQuestion}
            setLengthCountWord={setCountWordEdit}
            content={questionSubmit?.content ?? ""}
            isView={isView}
          />
          {checkCountChoice === true ? (
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
                    setLengthCountWord={setCountWordEdit}
                    content={choiceA?.name ?? ""}
                    isView={isView}
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
                    setLengthCountWord={setCountWordEdit}
                    content={choiceB?.name ?? ""}
                    isView={isView}
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
                    setLengthCountWord={setCountWordEdit}
                    content={choiceC?.name ?? ""}
                    isView={isView}
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
                    setLengthCountWord={setCountWordEdit}
                    content={choiceD?.name ?? ""}
                    isView={isView}
                  />
                </Grid>
              </Grid>
            </>
          )}
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
          {isView && (
            <Box mt={5} align="right">
              <Button
                sx={{
                  width: 120,
                  bgcolor: "blue",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "blue",
                    opacity: 0.8,
                  },
                }}
                variant="contained"
                onClick={() => {
                  toggleEditQues();
                }}
              >
                Hủy
              </Button>
              <Button
                sx={{
                  width: 120,
                  bgcolor: "red",
                  color: "white",
                  marginLeft: "20px!important",
                  "&:hover": {
                    backgroundColor: "red",
                    opacity: 0.8,
                  },
                }}
                disabled={disableUpdate}
                variant="contained"
                onClick={handleClickUpdateQuestion}
              >
                Cập nhật
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={styleViewQuestion}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 20,
              marginBottom: "20px",
              color: "black",
            }}
          >
            Chi tiết câu hỏi
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
              setView(false);
              toggleEditQues();
            }}
          />
          <Box>
            <span
              style={{
                fontWeight: 500,
                fontSize: 16,
                color: "#525252",
              }}
            >
              {ReactHtmlParser(question.content)}
            </span>

            {(typeChoice == 1 || typeChoice == 2) && (
              <Box>
                <Grid container>
                  <Grid item xs={1}>
                    <Box>
                      {typeChoice == 1 ? (
                        <Radio
                          color="success"
                          checked={choiceA.isTrue}
                          disabled={isView ? false : true}
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
                          disabled={isView ? false : true}
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
                    <Typography style={{ marginTop: "9px" }}>
                      {ReactHtmlParser(choiceA?.name)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={1}>
                    <Box>
                      {typeChoice == 1 ? (
                        <Radio
                          color="success"
                          checked={choiceB.isTrue}
                          disabled={isView ? false : true}
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
                          disabled={isView ? false : true}
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
                    <Typography style={{ marginTop: "9px" }}>
                      {ReactHtmlParser(choiceB?.name)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={1}>
                    <Box>
                      {typeChoice == 1 ? (
                        <Radio
                          color="success"
                          checked={choiceC.isTrue}
                          disabled={isView ? false : true}
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
                          disabled={isView ? false : true}
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
                    <Typography style={{ marginTop: "9px" }}>
                      {ReactHtmlParser(choiceC?.name)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={1}>
                    <Box>
                      {typeChoice == 1 ? (
                        <Radio
                          color="success"
                          checked={choiceD.isTrue}
                          disabled={isView ? false : true}
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
                          disabled={isView ? false : true}
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
                    <Typography style={{ marginTop: "9px" }}>
                      {ReactHtmlParser(choiceD?.name)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
            {typeChoice == 5 && (
              <>
                <Grid sx={{ marginBottom: "10px" }} container>
                  <Grid item xs={1}>
                    <Radio
                      color="success"
                      checked={choiceYes.isTrue}
                      disabled={isView ? false : true}
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
                      disabled={isView ? false : true}
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
          </Box>
        </Box>
      )}
    </Modal>
  );
}
