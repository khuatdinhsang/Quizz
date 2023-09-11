import { Box, Checkbox, Radio } from "@mui/material";
import { Grid, Modal, Typography } from "antd";
import React from "react";
import ReactHtmlParser from "react-html-parser";

const ExamDetail = (props) => {
  const { detailExam, popUpDetailExam, setPopUpDetailExam } = props;
  console.log("popUpDetailExam", popUpDetailExam);
  console.log("detailExam", detailExam);
  const getTotalExam = () => {
    let totalPoint = 0;
    for (let i = 0; i < detailExam?.questions?.length; i++) {
      totalPoint += detailExam.questions[i].point;
    }
    return totalPoint;
  };
  return (
    <Modal
      open={popUpDetailExam}
      footer={null}
      onCancel={() => setPopUpDetailExam(false)}
      width={1000}
    >
      <Typography
        style={{
          fontWeight: 600,
          fontSize: 24,
          textAlign: "center",
          color: "#5A5A5A",
        }}
      >
        {detailExam.description}
      </Typography>
      <hr />
      <Box>
        <Box>
          <Typography
            style={{
              color: "#161E54",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "right",
              marginRight: "30px",
              marginBottom: "20px",
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
              {getTotalExam()}
            </span>
          </Typography>
        </Box>
        <Box>
          {detailExam.questions?.map((item, index) => {
            if (item.questionType.id === 1) {
              return (
                <div>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#525252",
                    }}
                  >
                    {index + 1} <span>.</span>
                  </span>
                  <Typography
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#525252",
                      display: "inline-block",
                      marginLeft: "10px",
                      marginBottom: "0px",
                    }}
                  >
                    {ReactHtmlParser(item.content)}
                  </Typography>
                  {item.questionChoices.map((item, index) => {
                    return (
                      <div>
                        <Radio color="success" checked={item.isTrue} />
                        <Typography style={{ display: "inline-block" }}>
                          {ReactHtmlParser(item.name)}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              );
            }
            if (item.questionType.id === 2) {
              return (
                <div>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#525252",
                    }}
                  >
                    {index + 1} <span>.</span>
                  </span>
                  <Typography
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#525252",
                      display: "inline-block",
                      marginLeft: "10px",
                      marginBottom: "0px",
                    }}
                  >
                    {ReactHtmlParser(item.content)}
                  </Typography>
                  {item.questionChoices.map((item, index) => {
                    return (
                      <div>
                        <Checkbox color="success" checked={item.isTrue} />
                        <Typography style={{ display: "inline-block" }}>
                          {ReactHtmlParser(item.name)}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              );
            }
            if (item.questionType.id === 3) {
              return (
                <div>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#525252",
                    }}
                  >
                    {index + 1} <span>.</span>
                  </span>
                  <Typography
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#525252",
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                  >
                    {ReactHtmlParser(item.content)}
                  </Typography>{" "}
                  <span>(câu hỏi tự luận)</span>
                </div>
              );
            }
            if (item.questionType.id === 5) {
              return (
                <div>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#525252",
                    }}
                  >
                    {index + 1} <span>.</span>
                  </span>
                  <Typography
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#525252",
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                  >
                    {ReactHtmlParser(item.content)}
                  </Typography>
                  {item.questionChoices.map((item, index) => {
                    return (
                      <div>
                        <Radio color="success" checked={item.isTrue} />
                        <Typography style={{ display: "inline-block" }}>
                          {ReactHtmlParser(item.name)}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </Box>
      </Box>
    </Modal>
  );
};

export default ExamDetail;
