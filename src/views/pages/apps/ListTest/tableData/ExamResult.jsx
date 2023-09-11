import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { Row, Col, Button, Progress, Tooltip, Space, Radio } from "antd";
import "./ExamResult.scss";
import BookSvg from "./../../../../../../src/assets/images/svg/Book.svg";
import FlieSvg from "./../../../../../../src/assets/images/svg/ic_outline-topic.svg";
import TimeSvg from "./../../../../../../src/assets/images/svg/bx_time-five.svg";
import DateSvg from "./../../../../../../src/assets/images/svg/eos-icons_modified-date-outlined.svg";
import BookNumSVG from "./../../../../../../src/assets/images/svg/fluent_book-number-24-regular.svg";
import XquareGreen from "./../../../../../../src/assets/images/svg/x-square.svg";
import XquareRed from "./../../../../../../src/assets/images/svg/x-square-red.svg";
import XquareNone from "./../../../../../../src/assets/images/svg/x-square-none.svg";
import WrongGreen from "./../../../../../../src/assets/images/svg/wrong-green.svg";
import WrongRed from "./../../../../../../src/assets/images/svg/wrong-red.svg";
import { getExamResultByUser } from "@src/@core/api/exam";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function ExamResult() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const { state } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [correctQuesNum, setCorrectQuesNum] = useState(0);
  const [inCorrectQuesNum, setInCorrectQuesNum] = useState(0);
  const [notCheckQuesNum, setNotCheckQuesNum] = useState(0);

  console.log(state);
  const getExamResults = () => {
    setLoading(true);
    getExamResultByUser(state?.id)
      .then((res) => {
        console.log("resABC", res.data);
        setResults(res.data);
        setQuestions(res.data.questions);
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  };
  useEffect(() => {
    getExamResults();
  }, []);

  //render list question

  const checkAnswer = (ques, choices) => {
    let flag = true;
    choices.forEach((choice) => {
      if (ques.userAnswer == choice.name) {
        if (choice.isTrue) {
          flag = true;
        } else {
          flag = false;
        }
      } else if (ques.userAnswer === null) {
        flag = false;
      }
    });

    return flag;
  };
  const countNoneAnswer = () => {
    let count = questions.reduce((count, choice) => {
      if (choice.userAnswer === null) {
        count += 1;
      }
      return count;
    }, 0);

    return count;
  };
  const renderQuestions = () => {
    return questions.map((ques, index) => {
      return (
        <div
          className="exam-result-question"
          style={
            checkAnswer(ques, ques.questionChoices)
              ? { borderColor: "#46E44D" }
              : { borderColor: "#FF4C4C" }
          }
        >
          <img
            className="exam-result-question-checked"
            src={
              checkAnswer(ques, ques.questionChoices) ? WrongGreen : WrongRed
            }
            alt={
              checkAnswer(ques, ques.questionChoices) ? WrongGreen : WrongRed
            }
          />
          <h5>Câu hỏi {index + 1}:</h5>
          {parse(ques.content)}
          <div className="exam-result-question-choose">
            <Radio.Group value={ques.userAnswer}>
              {ques.questionChoices.map((choice, index) => {
                return (
                  <p
                    className=" "
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Radio value={choice.name}>
                      <span>{parse(choice.name)}</span>
                    </Radio>
                  </p>
                );
              })}
            </Radio.Group>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="exam-result" loading={loading}>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => history.back()}
      >
        <LeftOutlined />
        <span
          style={{
            color: "#161E54",
            fontSize: "18px",
            fontWeight: 600,
            marginLeft: 5,
          }}
        >
          Làm bài
        </span>
      </div>

      <div className="exam-result-body">
        <h2>{results.description}</h2>
        <div className="exam-result-body-general">
          <Row>
            <Col flex={1}>
              <span>
                <img src={FlieSvg} alt={FlieSvg} />
              </span>
              <h4>Chủ đề</h4>
              <p>{results?.topic?.category.name}</p>
            </Col>
            <Col flex={1}>
              <span>
                <img src={BookNumSVG} alt={BookNumSVG} />
              </span>
              <h4>Số câu hỏi</h4>
              <p>{results.numberQuestions}</p>
            </Col>
            <Col flex={1}>
              <span>
                <img src={TimeSvg} alt={TimeSvg} />
              </span>
              <h4>Thời gian làm bài</h4>
              <p>{results.quizTime}</p>
            </Col>
            <Col flex={1}>
              <span>
                <img src={DateSvg} alt={DateSvg} />
              </span>
              <h4>Ngày tạo đề</h4>
              <p>{dayjs(results.startTime).format("DD/MM/YYYY")}</p>
            </Col>
            <Col flex={1}>
              <span>
                <img src={BookSvg} alt={BookSvg} />
              </span>
              <h4>Ngày đóng đề</h4>
              <p>{dayjs(results.expiredTime).format("DD/MM/YYYY")}</p>
            </Col>
          </Row>
          <hr />
        </div>

        <div className="exam-result-body-rating">
          <div className="exam-result-body-rating-left">
            <p>Thời gian làm bài</p>
            <Progress
              percent={(results.executionTime * 100) / results.quizTime}
            />
            <p>
              Ngày làm bài:{" "}
              <span style={{ color: "#333", fontSize: 12, fontWeight: "400" }}>
                {dayjs(results.userStartQuiz).format("DD/MM/YYYY")}
              </span>
            </p>
            <span style={{ color: "#333", fontSize: 12, fontWeight: "bold" }}>
              Thời gian bắt đầu làm bài:{" "}
              <span style={{ color: "#333", fontSize: 12, fontWeight: "400" }}>
                {dayjs(results.userStartQuiz).format("HH:mm:ss")}
              </span>
            </span>
            <span
              style={{
                color: "#333",
                fontSize: 12,
                fontWeight: "bold",
                marginLeft: 100,
              }}
            >
              Thời gian hoàn thành bài:{" "}
              <span style={{ color: "#333", fontSize: 12, fontWeight: "400" }}>
                {results.executionTime}
              </span>
            </span>
          </div>
          <div className="exam-result-body-rating-right">
            <p>Đánh giá mức độ chính xác</p>

            <div className="exam-result-body-rating-dashboard">
              <div className="exam-result-body-rating-dashboard-left">
                <p>
                  Trắc nghiệm:{" "}
                  <span>
                    {state.score.substring(0, state.score.indexOf("/"))} /{" "}
                    {results.numberQuestions}
                  </span>
                </p>
                <p>
                  Tự luận:{" "}
                  <span>
                    {state.score.substring(0, state.score.indexOf("/"))}
                  </span>
                </p>
              </div>
              <Space wrap>
                <Tooltip title="correct / incorrect / not answered">
                  <Progress
                    percent={
                      (Number(
                        state.score.substring(0, state.score.indexOf("/"))
                      ) *
                        100) /
                      state.numberQuestions
                    }
                    format={(percent) => {
                      return (
                        <div>
                          <p>{percent}%</p>
                          <p>{results.score}</p>
                        </div>
                      );
                    }}
                    strokeColor="#4cd964"
                    success={{
                      percent:
                        (Number(
                          state.score.substring(
                            state.score.indexOf("/") + 1,
                            state.score.indexOf(
                              "/",
                              state.score.indexOf("/") + 1
                            )
                          )
                        ) *
                          100) /
                        state.numberQuestions,
                      strokeColor: "red",
                    }}
                    type="circle"
                  />
                </Tooltip>
              </Space>
              <div className="exam-result-body-rating-dashboard-right">
                <p>
                  <img src={XquareGreen} alt={XquareGreen} /> Trả lời đúng:
                  <span style={{ marginLeft: 5 }}>
                    {state.score.substring(0, state.score.indexOf("/"))}
                  </span>
                </p>
                <p>
                  <img src={XquareRed} alt={XquareRed} /> Trả lời sai:
                  <span style={{ marginLeft: 5 }}>
                    {state.score.substring(
                      state.score.indexOf("/") + 1,
                      state.score.indexOf("/", state.score.indexOf("/") + 1)
                    )}
                  </span>
                </p>
                <p>
                  <img src={XquareNone} alt={XquareNone} /> Chưa trả lời:
                  <span style={{ marginLeft: 5 }}> {countNoneAnswer()}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="exam-result-body-details">
          <Row>
            <Col flex={1}>
              <span>Chi tiết đáp án</span>
            </Col>
          </Row>
          {renderQuestions()}
        </div>
      </div>
    </div>
  );
}
