import PaginationComponent from "@components/pagination";
import { Box, Stack } from "@mui/material";
import { handleGetListExam } from "@redux/exam";
import { getListExamApi } from "@src/@core/api/exam";
import TableData from "@views/pages/apps/ListTest/tableData";
import { Button, DatePicker, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalChooseExam = (props) => {
  const { openModal, setOpenModal, createQuizForm, setCreateQuizForm } = props;
  console.log("createQuizForm", createQuizForm);
  const [filterListExam, setFilterListExam] = useState({
    page: 1,
    limit: 10,
    cate: "",
    keywords: "",
    createDate: "",
    startTime: "",
    expiredTime: "",
  });
  const [dataExam, setDataExam] = useState(
    useSelector((state) => state.exams.listExam)
  );
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const dispatch = useDispatch();
  const convertDataTable = dataExam
    ? dataExam.map((item, index) => ({
        key: index,
        index: index + 1,
        description: item?.description,
        createDate: item?.createDate,
        category: item?.cate,
        choose: (
          <Button
            onClick={() => {
              setCreateQuizForm({ ...createQuizForm, quizSampleId: item.id });
              setOpenModal(false);
            }}
            style={{
              borderRadius: "20px",
              backgroundColor:
                createQuizForm?.quizSampleId === item.id ? "blue" : "",
              color: createQuizForm?.quizSampleId === item.id ? "white" : "",
            }}
          >
            Chọn
          </Button>
        ),
      }))
    : [];
  const convertDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()} `;
  };
  const [dataCategory, setDataCategory] = useState(
    useSelector((state) => state.exams.listCategory)
  );
  const [loading, setLoading] = useState(false);
  const [totalExams, setTotalExams] = useState(0);
  const [textSearch, setTextSearch] = useState("");
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "50px",
      align: "center",
    },
    {
      title: "Tên bài kiểm tra",
      dataIndex: "description",
      key: "description",
      width: "500px",
      render: (description) => <div>{description}</div>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "createDate",
      width: "200px",
      align: "center",
      render: (createDay) => <div>{convertDate(createDay)}</div>,
    },
    {
      title: "Chủ đề ",
      key: "topic",
      dataIndex: "topic",
      width: "200px",
      align: "center",
      render: (category) => <div>{category}</div>,
      filters: dataCategory.map((record, index) => {
        return { ...record, text: `${record.name}`, value: `${record.name}` };
      }),
      onFilter: (value, record) => {
        console.log("red", record);
        return record.topic === value;
      },
    },
    {
      key: "choose",
      dataIndex: "choose",
      width: "150px",
      align: "center",
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
  const dateFormatList = ["YYYY-MM-DD"];
  const onChangeCreateDate = (date, dateString) => {
    if (!dateString || dateString == null) {
      handleSearch();
    } else {
      const newDataExam = dataExam.filter((item) => {
        let itemStartDate = item.createDate?.split("T")[0];
        return itemStartDate === dateString;
      });
      setDataExam(newDataExam);
    }
    //   setLoading(true);
    //   getListExamApi({ ...filterListExam, createDate: dateString })
    //     .then((res) => {
    //       setPagination({ page: res.data.page, limit: res.data.limit });
    //       setDataExam(res.data.quizList);
    //       setTotalExams(res.data.total);
    //     })
    //     .catch((err) => dispatch(handleGetListExam({ data: [] })))
    //     .finally(() => {
    //       setLoading(false);
    //     });
  };
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
  return (
    <>
      <Modal
        title={
          <div style={{ fontSize: "22px", textAlign: "center" }}>
            Chọn đề thi
          </div>
        }
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={1000}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "20px",
            marginTop: "50px",
          }}
        >
          <Box>
            Thời gian tạo
            <DatePicker
              placeholder="dd/mm/yyyy"
              format={dateFormatList}
              onChange={onChangeCreateDate}
              style={{
                height: 35,
                width: 300,
                display: "block",
                marginTop: "5px",
              }}
            />
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
                  height: "35px",
                  outline: "none",
                  border: "1px solid #ccc",
                  padding: "0 10px",
                  width: "300px",
                  borderRadius: "5px",
                }}
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
                type="text"
                placeholder="Tìm kiếm"
              />
              <Button
                style={{
                  height: "35px",
                  width: "100px",
                  marginLeft: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  borderRadius: "5px",
                }}
                onClick={handleSearch}
              >
                Tìm kiếm
              </Button>
            </form>
          </Box>
        </Stack>
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                console.log("record", record);
              },
            };
          }}
          columns={columns}
          pagination={false}
          dataSource={convertDataTable}
          loading={loading}
          style={{ cursor: "pointer" }}
        />
        <PaginationComponent
          total={totalExams}
          pagination={pagination}
          handleChangePagination={handleChangePagination}
          showSizeChanger={false}
        />
      </Modal>
    </>
  );
};

export default ModalChooseExam;
