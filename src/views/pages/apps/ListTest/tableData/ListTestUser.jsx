import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Input, Button, Table, DatePicker, Col, Row, Tag } from "antd";
import "./ListTestUser.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { getListCategoryApi } from "@src/@core/api/exam";
import { getListExamByUser } from "@src/@core/api/exam";
import dayjs from "dayjs";
import { South } from "@mui/icons-material";
import { start } from "@popperjs/core";

export default function ListTestUser() {
  //render table
  const [initFormatDate, setInitFormatDate] = useState("");
  const [pageSize, setPageSize] = useState("");

  const columns = [
    {
      title: "STT",
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
      align: "center",
    },
    {
      title: "Tên bài kiểm tra",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Số câu hỏi",
      dataIndex: "numberQuestions",
      key: "numberQuestions",
      align: "center",
    },
    {
      title: "Thời gian làm bài",
      key: "quizTime",
      dataIndex: "quizTime",
      align: "center",
    },
    {
      title: "Thời gian mở",
      key: "startTime",
      dataIndex: "startTime",
      align: "center",
      render: (text) => {
        return <span>{text ? dayjs(text).format("DD/MM/YYYY") : "-"}</span>;
      },
    },
    {
      title: "Thời gian đóng",
      key: "expiredTime",
      dataIndex: "expiredTime",
      align: "center",
      render: (text) => {
        return <span>{text ? dayjs(text).format("DD/MM/YYYY") : "-"}</span>;
      },
    },
    {
      title: "Chủ đề",
      key: "topic",
      dataIndex: "topic",
      align: "center",
      render: (text, record, index) => {
        return <span>{text?.category.name}</span>;
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "";
        if (status == "done") {
          color = "rgba(78, 203, 113, 1)";
          status = "Đã làm";
        } else if (status == "doing") {
          color = "rgba(36, 169, 225, 1)";
          status = "Đang làm";
        } else if (status == "not_start") {
          color = "rgba(255, 170, 1, 1)";
          status = "Chưa làm";
        } else if (status == "expired") {
          color = "rgba(185, 185, 185, 1)";
          status = "Hết hạn";
        } else if (status == "quitted") {
          color = "rgba(255, 0, 0, 1)";
          status = "Đã hủy";
        }
        return (
          <Tag
            color={color}
            style={{ width: 70, borderRadius: 20, textAlign: "center" }}
          >
            {status}
          </Tag>
        );
      },
      align: "center",
    },
    {
      title: "Kết quả",
      key: "score",
      dataIndex: "score",
      render: (score, { numberQuestions, status }) => {
        if (status === "expired" || status === "done") {
          return (
            <span key={numberQuestions}>
              {score.substring(0, score.indexOf("/"))} / {numberQuestions}
            </span>
          );
        }
        return <span>-</span>;
      },
      align: "center",
    },
  ];

  //router
  const navigate = useNavigate();
  const handleViewExam = (event) => {
    navigate("/list-test-user/exam-info", {
      state: event,
    });
  };

  //state
  const user = JSON.parse(localStorage.getItem("userData"));

  const [cate, setCate] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [expiredTime, setExpiredTime] = useState(null);
  const [keywords, setKey] = useState("");
  const [status, setStatus] = useState("");
  const [optionCate, setoptionCate] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangeStartTime = (date, dateStr) => {
    setStartTime(date);

    // localStorage.setItem("listTestUserStartTime", JSON.stringify(dateStr));
  };
  const onChangeExpiredTime = (date, dateStr) => {
    setExpiredTime(date);
  };
  const onChangeTopic = (value) => {
    setCate(value.value);
  };
  const onChangeStatus = (value) => {
    setStatus(value);
  };
  const onChangeKey = (value) => {
    setKey(value.target.value);
  };

  //Call api
  const [examList, setExamList] = useState([]);

  const getExamList = async () => {
    setLoading(true);
    let data = {
      limit: 100000,
      page: 0,
      cate: "",
      startTime: null,
      expiredTime: null,
      status: "",
      search: "",
      userId: user.id,
    };
    await getListExamByUser(data)
      .then((res) => {
        setExamList(res.data.groupQuizList);
      })
      .finally(() => setLoading(false));
  };
  const handleSearch = async () => {
    let data = {
      limit: 20,
      page: 0,
      cate: cate,
      startTime: startTime ? dayjs(startTime).format("YYYY-MM-DD") : null,
      expiredTime: expiredTime ? dayjs(expiredTime).format("YYYY-MM-DD") : null,
      status: status,
      search: keywords,
      userId: user.id,
    };

    setLoading(true);
    await getListExamByUser(data)
      .then((res) => {
        setExamList(res.data.groupQuizList);
      })
      .finally(() => setLoading(false));
  };

  const getCateList = async () => {
    await getListCategoryApi()
      .then((res) => {
        let newOptionCate = [
          ...res.data
            ?.filter((cate) => cate.isActive)
            .map((cate) => ({ label: cate.name, value: cate.name })),
        ];
        setoptionCate([...newOptionCate, { label: "Tất cả", value: "" }]);
      })

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // if (localStorage.getItem("listTestUserStartTime")) {
    //   setStartTime(JSON.parse(localStorage.getItem("listTestUserStartTime")));
    //   console.log(JSON.parse(localStorage.getItem("listTestUserStartTime")));
    //   console.log(startTime);
    // }
    setInitFormatDate("DD/MM/YYYY");
    getExamList();
    getCateList();
  }, []);

  dayjs;

  //Main Return

  return (
    <div className="list-test-user container-fluid">
      <h1 className="list-test-user-title">Danh sách bài kiểm tra</h1>
      <div className="list-test-user-autocompleted">
        <Row>
          <Col flex={1} style={{ display: "block" }}>
            <label style={{ display: "block", marginBottom: 5 }}>
              Thời gian mở
            </label>
            <DatePicker
              onChange={onChangeStartTime}
              placeholder="dd/mm/yyyy"
              format={initFormatDate}
            />
          </Col>
          <Col flex={1} style={{ display: "block" }}>
            <label style={{ display: "block", marginBottom: 5 }}>
              Thời gian đóng
            </label>
            <DatePicker
              onChange={onChangeExpiredTime}
              placeholder="dd/mm/yyyy"
              format={initFormatDate}
            />
          </Col>

          <Col flex={1}>
            <Select
              showSearch
              placeholder="Chủ đề"
              optionFilterProp="children"
              style={{ marginTop: 25, width: 180 }}
              onChange={(e, v) => onChangeTopic(v)}
              options={optionCate}
            />
          </Col>
          <Col flex={1}>
            <Select
              showSearch
              placeholder="Trạng thái"
              optionFilterProp="children"
              style={{ marginTop: 25, width: 180 }}
              onChange={onChangeStatus}
              options={[
                { label: "Đã làm", value: "done" },
                { label: "Đang làm", value: "doing" },
                { label: "Chưa làm", value: "not_start" },
                { label: "Đã hủy", value: "quitted" },
                { label: "Hết hạn", value: "expired" },
                { label: "Tất cả", value: "" },
              ]}
            />
          </Col>
          <Col flex={1}>
            <Input
              style={{ marginTop: 25, width: 180 }}
              placeholder="Nhập tên bài kiểm tra..."
              onChange={onChangeKey}
              value={keywords}
            />
          </Col>
          <Col flex={1}>
            <Button
              style={{
                backgroundColor: "rgba(9, 44, 76, 1)",
                color: "#fff",
                marginTop: 25,
                borderRadius: 5,
                width: 150,
              }}
              onClick={() => handleSearch()}
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </div>
      <div className="list-test-user-table" style={{ marginTop: 50 }}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={examList}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
          }}
          onRow={(event, index) => {
            return {
              onClick: () => {
                handleViewExam({ ...event, index: index });
              },
            };
          }}
        />
      </div>
    </div>
  );
}
