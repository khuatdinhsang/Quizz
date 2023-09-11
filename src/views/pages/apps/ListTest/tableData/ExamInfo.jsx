import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import "./ExamInfo.scss";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
// import { convertDuplicateCategory } from "@src/utility/Utils";
import { startQuiz } from "@src/@core/api/user";
import toast from "react-hot-toast";
export default function ExamInfo() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log("state", state);
  const doTest = () => {
    startQuiz(state.id)
      .then((res) => {
        navigate("/list-test-user/do-exam", { state: { data: res.data } });
      })
      .catch((err) => toast.error("Đã có lỗi xảy ra!"));
  };
  const doTestContinue = () => {};
  const renderButton = () => {
    if (state.status === "Đã làm" || state.status === "Đã hủy") {
      return (
        <div align="center" style={{ marginTop: 25 }}>
          <Button
            style={{
              backgroundColor: "#24A9E1",
              width: 120,
              color: "#fff",
              marginRight: 20,
            }}
            onClick={() => viewResult(state)}
          >
            Xem kết quả
          </Button>
          <Button
            onClick={() => doTest()}
            style={{
              backgroundColor: "#36CA68",
              width: 100,
              color: "#fff",
            }}
          >
            Làm lại
          </Button>
        </div>
      );
    }

    return (
      <div align="center" style={{ marginTop: 25 }}>
        {state.status === "Đang làm" ? (
          <Button
            onClick={() => doTestContinue()}
            style={{
              backgroundColor: "#36CA68",
              width: 100,
              color: "#fff",
            }}
          >
            Làm tiếp
          </Button>
        ) : (
          <Button
            onClick={() => doTest()}
            style={{
              backgroundColor: "#36CA68",
              width: 100,
              color: "#fff",
            }}
          >
            Làm bài
          </Button>
        )}
      </div>
    );
  };

  const renderStatus = () => {
    let color = "";
    if (state.status == "done") {
      color = "rgba(78, 203, 113, 1)";
      state.status = "Đã làm";
    } else if (state.status == "doing") {
      color = "rgba(36, 169, 225, 1)";
      state.status = "Đang làm";
    } else if (state.status == "not_start") {
      color = "rgba(255, 170, 1, 1)";
      state.status = "Chưa làm";
    } else if (state.status == "expired") {
      color = "rgba(185, 185, 185, 1)";
      state.status = "Hết hạn";
    } else if (state.status == "quitted") {
      color = "rgba(255, 0, 0, 1)";
      state.status = "Đã hủy";
    }

    return (
      <Tag
        color={color}
        style={{ width: 70, borderRadius: 20, textAlign: "center" }}
      >
        {state.status}
      </Tag>
    );
  };

  const viewResult = (state) => {
    navigate("/list-test-user/exam-result", { state });
  };
  return (
    <div className="exam-info">
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => navigate(-1)}
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
      <div className="exam-info-body">
        <h2>
          {state?.index + 1}. {state?.description}
        </h2>
        <div className="exam-info-sub-body">
          <div className="exam-info-sub-body-left">
            <p>Chủ đề</p>
            <p>Số câu hỏi</p>
            <p>Thời gian làm bài</p>
            <p>Thời gian mở</p>
            <p>Thời gian đóng</p>
            <p>Trạng thái</p>
            <p>Hướng dẫn làm bài</p>
          </div>
          <div className="exam-info-sub-body-right">
            <p>{state?.topic?.category.name}</p>
            <p>{state.numberQuestions}</p>
            <p>{state.quizTime}</p>
            <p>
              {state.startTime != null
                ? dayjs(state.startTime).format("DD/MM/YYYY")
                : "-"}
            </p>
            <p>
              {state.expiredTime != null
                ? dayjs(state.expiredTime).format("DD/MM/YYYY")
                : "-"}
            </p>
            <p>{renderStatus()}</p>
            <p>{state.note}</p>
          </div>
        </div>
        {renderButton()}
      </div>
    </div>
  );
}
