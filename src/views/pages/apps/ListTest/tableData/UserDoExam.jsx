import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Checkbox, Radio, Input } from "antd";
import { useLocation, useNavigate } from "react-router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "antd";
import moment from "moment";
import { TimeOut } from "./TimeOut";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import toast from "react-hot-toast";
import { submitQuiz } from "@src/@core/api/user";

const UserDoExam = () => {
  const location = useLocation();
  const dataExam = location.state?.data;
  console.log("dataExam", dataExam);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  let time = moment();
  const dt = new Date(time);
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1; // Tháng được đánh số từ 0 đến 11, nên cần cộng thêm 1
  const day = dt.getDate();
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  const seconds = dt.getSeconds();
  const [listAnswer, setListAnswer] = React.useState([]);

  const [dataSubmit, setDataSubmit] = useState({
    quizId: dataExam.id,
    questions: [],
  });
  const newFormat = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")} ${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const [timeCount, setTimeCount] = useState(
    !dataExam?.userStartQuiz
      ? dataExam?.quizTime * 60
      : Math.ceil(
          dataExam?.quizTime * 60 -
            (new Date(newFormat) - new Date(dataExam?.userStartQuiz)) / 1000
        )
  );
  const backPage = () => {
    navigate(-1);
  };
  useEffect(() => {
    setDataSubmit({
      ...dataSubmit,
      questions: listAnswer,
    });
  }, [listAnswer]);
  const handleSubmit = () => {
    submitQuiz(dataSubmit)
      .then((res) => {
        console.log("res", res.data);
        toast.success("Nộp bài thành công !");
        navigate("/list-test-user");
      })
      .catch((err) => {
        toast.error("Đã xảy ra lỗi");
      });
  };
  const handleChangeAnswer = (id, value) => {
    const newValue =
      typeof value === "object" ? value.join(";") : value.toString();
    setListAnswer([
      ...listAnswer,
      {
        questionId: id,
        userAnswer: newValue,
      },
    ]);
    const existAnswer = listAnswer?.findIndex(
      (answer) => answer.questionId === id
    );
    if (existAnswer === -1) {
      setListAnswer([
        ...listAnswer,
        {
          questionId: id,
          userAnswer: newValue,
        },
      ]);
    } else {
      let newList = [...listAnswer];
      newList[existAnswer] = {
        questionId: id,
        userAnswer: newValue,
      };
      setListAnswer(newList);
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
          fontSize: 24,
          textAlign: "center",
          color: "#161E54",
        }}
      >
        {dataExam?.description}
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Box
          style={{
            textAlign: "left",
            display: "inline-block",
            padding: "10px",
            border: "1px solid #ccc",
            fontWeight: "700x",
            height: "40px",
          }}
        >
          Thời gian còn lại:
          <span
            style={{
              color: "#161E54",
              fontWeight: "700px",
              marginLeft: "10px",
              display: "inline-block",
            }}
          >
            <TimeOut
              status={status}
              setStatus={setStatus}
              timeCount={timeCount}
              setTimeCount={setTimeCount}
              handleSubmit={handleSubmit}
            />
          </span>
        </Box>
        <Box>
          <Button
            onClick={() => handleSubmit()}
            style={{
              background: "#092C4C",
              color: "white",
              height: "40px",
              width: "200px",
              borderRadius: "10px",
            }}
          >
            Nộp bài
          </Button>
        </Box>
      </Stack>
      <Box style={{ marginTop: "20px" }}>
        {dataExam?.questions?.map((item, index) => {
          return (
            <Box>
              <span
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#525252",
                  fontWeight: "600",
                }}
              >
                {`${index + 1} .`} {ReactHtmlParser(item.content)}
              </span>
              <Box style={{ marginBottom: "10px" }}>
                {item?.questionType?.id === 1 && (
                  <Box>
                    <Radio.Group
                      onChange={(e) =>
                        handleChangeAnswer(item.id, e.target.value)
                      }
                    >
                      {item?.questionChoices.map((choice, idx) => (
                        <Box>
                          <span>
                            {idx == 0 && "A"}
                            {idx == 1 && "B"}
                            {idx == 2 && "C"}
                            {idx == 3 && "D"} <span>.</span>
                          </span>
                          <Radio value={choice.name}>
                            {ReactHtmlParser(choice.name)}
                          </Radio>
                        </Box>
                      ))}
                    </Radio.Group>
                  </Box>
                )}
                {item?.questionType?.id === 2 && (
                  <Box>
                    <Checkbox.Group
                      onChange={(value) => handleChangeAnswer(item.id, value)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "15px",
                      }}
                    >
                      {item?.questionChoices.map((choice, idx) => (
                        <Box>
                          <span>
                            {idx == 0 && "A"}
                            {idx == 1 && "B"}
                            {idx == 2 && "C"}
                            {idx == 3 && "D"} <span>.</span>
                          </span>
                          <Checkbox value={choice.name}>
                            {ReactHtmlParser(choice.name)}
                          </Checkbox>
                        </Box>
                      ))}
                    </Checkbox.Group>
                  </Box>
                )}
                {item?.questionType?.id === 3 && (
                  <Box>
                    <Input.TextArea
                      // showCount={true}
                      // maxLength={maxLength}
                      // value={value ?? ''}
                      onChange={(e) =>
                        handleChangeAnswer(item.id, e.target.value)
                      }
                      placeholder={"Nhập câu trả lời"}
                      autoSize={{
                        minRows: 4,
                        maxRows: 5,
                      }}
                      style={{ width: "100%" }}
                    />
                  </Box>
                )}
                {item?.questionType?.id === 5 && (
                  <Box>
                    <Radio.Group
                      onChange={(e) =>
                        handleChangeAnswer(item.id, e.target.value)
                      }
                    >
                      {item?.questionChoices.map((choice, idx) => (
                        <Box>
                          <Radio value={choice.name}>
                            {ReactHtmlParser(choice.name)}
                          </Radio>
                          <span>
                            {idx == 0 && "Đúng"}
                            {idx == 1 && "Sai"}
                          </span>
                        </Box>
                      ))}
                    </Radio.Group>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default UserDoExam;
