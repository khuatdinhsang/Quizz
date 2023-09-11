import { Checkbox, Input, Table } from "antd";
import "./style.css";
import { useState } from "react";
import ConfirmDelete from "../confirmDelete";
import { putActiveQuestion } from "@src/@core/api/question";
import toast from "react-hot-toast";
import { listDifficulty } from "@src/utility/Utils";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PaginationComponent from "@components/pagination";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
export default function TableData(props) {
  const {
    dataTable,
    openConfirm,
    setOpenConfirm,
    setQuestion,
    listQuestionDelete,
    setListQuestionDelete,
    loading,
    totalQuestions,
    dataQuestionType,
    toggleEditQues,
    dataCategory,
    pagination,
    handleChangePagination,
    setView,
    active,
  } = props;
  const navigate = useNavigate();
  const handleChecked = (item) => {
    const itemChecked = listQuestionDelete.includes(item);
    return itemChecked;
  };
  const handleCheckAll = () => {
    if (
      listQuestionDelete.length >= 0 &&
      listQuestionDelete.length < dataTable.length
    ) {
      const allItems = dataTable.map((i) => i.id);
      setListQuestionDelete(allItems);
    } else if (listQuestionDelete.length === dataTable.length) {
      setListQuestionDelete([]);
    }
  };
  const columns = [
    {
      title: (
        <Checkbox
          checked={listQuestionDelete.length === dataTable?.length}
          indeterminate={
            listQuestionDelete.length > 0 &&
            listQuestionDelete.length < dataTable.length
          }
          onChange={handleCheckAll}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width: "50px",
      align: "center",
    },
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "50px",
      align: "center",
      render: (index, currentQuestion) => (
        <div
          onClick={() => {
            handleEditClick(getQuestionByIndex(currentQuestion.key), {
              type: "view",
            });
          }}
        >
          {index}
        </div>
      ),
    },
    {
      title: "Câu hỏi",
      dataIndex: "question",
      key: "question",
      width: "700px",
      render: (question, currentQuestion) => (
        <div
          onClick={() => {
            handleEditClick(getQuestionByIndex(currentQuestion.key), {
              type: "view",
            });
          }}
        >
          {question}
        </div>
      ),
      // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
      //   return (
      //     <Input
      //       autoFocus
      //       placeholder="Type text here"
      //       value={selectedKeys[0]}
      //       onChange={(e) => {
      //         setSelectedKeys(e.target.value ? [e.target.value] : []);
      //       }}
      //       onPressEnter={() => {
      //         confirm();
      //       }}
      //       onBlur={() => {
      //         confirm();
      //       }}
      //     />
      //   );
      // },
      // filterIcon: () => {
      //   return <SearchOutlinedIcon />;
      // },
      // onFilter: (value, record) => {
      //   return record.question.toLowerCase().includes(value.toLowerCase());
      // },
    },
    {
      title: "Chủ đề ",
      key: "topic",
      dataIndex: "topic",
      width: "200px",
      align: "center",
      render: (topic, currentQuestion) => (
        <div
          onClick={() => {
            handleEditClick(getQuestionByIndex(currentQuestion.key), {
              type: "view",
            });
          }}
        >
          {topic}
        </div>
      ),
      filters: dataCategory?.map((record, index) => {
        return { ...record, text: `${record.name}`, value: `${record.name}` };
      }),
      onFilter: (value, record) => {
        return record.topic === value;
      },
    },
    {
      title: "Mức độ",
      dataIndex: "level",
      key: "level",
      width: "200px",
      align: "center",
      render: (level, currentQuestion) => (
        <div
          onClick={() => {
            handleEditClick(getQuestionByIndex(currentQuestion.key), {
              type: "view",
            });
          }}
        >
          {level}
        </div>
      ),
      filters: listDifficulty.map((record, index) => {
        return { ...record, text: `${record.label}`, value: `${record.value}` };
      }),
      onFilter: (value, record) => {
        return record.level === value;
      },
    },
    {
      title: "Loại câu hỏi",
      dataIndex: "questionType",
      key: "questionType",
      align: "center",
      width: "200px",
      render: (questionType, currentQuestion) => (
        <div
          onClick={() => {
            handleEditClick(getQuestionByIndex(currentQuestion.key), {
              type: "view",
            });
          }}
        >
          {questionType}
        </div>
      ),
      filters: dataQuestionType?.map((record, index) => {
        return { ...record, text: `${record.name}`, value: `${record.name}` };
      }),
      onFilter: (value, record) => {
        return record.questionType === value;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "200px",
      render: (status, currentQuestion) =>
        status ? (
          <div
            onClick={() => {
              handleEditClick(getQuestionByIndex(currentQuestion.key), {
                type: "view",
              });
            }}
            style={{ color: "green" }}
          >
            Hiệu lực
          </div>
        ) : (
          <div
            onClick={() => {
              handleEditClick(getQuestionByIndex(currentQuestion.key), {
                type: "view",
              });
            }}
            style={{ color: "red" }}
          >
            Hết hiệu lực
          </div>
        ),
      filters: [
        { text: "Hiệu lực", value: true },
        { text: "Hết hiệu lực", value: false },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      width: "200px",
    },
  ];
  const getQuestionByIndex = (index) => {
    return dataTable.find((item, idx) => idx === index);
  };
  const handleChangeCheckItem = (item) => {
    const hasItem = listQuestionDelete.findIndex((i) => i === item);
    if (hasItem === -1) {
      setListQuestionDelete([...listQuestionDelete, item]);
    } else {
      const newList = listQuestionDelete.filter((i) => i !== item);
      setListQuestionDelete(newList);
    }
  };
  const handleClickInActiveMulti = () => {
    const payload = {
      questionIds: listQuestionDelete,
      active: false,
    };
    putActiveQuestion(payload)
      .then((res) => {
        toast.success("Đóng hiệu lực câu hỏi thành công");
        setOpenConfirm({
          ...openConfirm,
          open: false,
        });
        setListQuestionDelete([]);
      })
      .catch((err) => {
        toast.error("Đã xảy ra lỗi từ server !");
      })
      .finally(() => {
        navigate("/home");
      });
  };
  const handleClickActiveMulti = () => {
    const payload = {
      questionIds: listQuestionDelete,
      active: true,
    };
    putActiveQuestion(payload)
      .then((res) => {
        toast.success("Mở hiệu lực câu hỏi thành công");
        setOpenConfirm({
          ...openConfirm,
          open: false,
        });
        setListQuestionDelete([]);
      })
      .catch((err) => {
        toast.error("Đã xảy ra lỗi từ server !");
      })
      .finally(() => {
        navigate("/home");
      });
  };

  const handleEditClick = (ques, type) => {
    setQuestion(ques);
    if (type.type === "view") {
      setView(false);
    } else {
      setView(true);
    }
    toggleEditQues();
  };
  const convertLevel = (data) => {
    switch (data) {
      case "EASY":
        return "Dễ";
      case "MEDIUM":
        return "Trung Bình";
      case "HARD":
        return "Khó";
    }
  };
  const convertDataTable = dataTable
    ? dataTable.map((item, index) => ({
        key: index,
        checkbox: (
          <Checkbox
            checked={handleChecked(item.id)}
            onChange={() => handleChangeCheckItem(item.id)}
          />
        ),
        index: index + 1,
        question: ReactHtmlParser(item?.content),
        topic: item?.category?.name,
        level: convertLevel(item?.level),
        questionType: item?.questionType?.name,
        status: item?.isActive,
        actions: (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{ cursor: "pointer", marginTop: "10px" }}
              onClick={() => handleEditClick(item, { type: "edit" })}
            >
              <BorderColorIcon sx={{ marginRight: "5px", color: "blue" }} />
              <span>Chỉnh sửa</span>
            </div>
          </div>
        ),
      }))
    : [];

  return (
    <>
      <Table
        rowClassName={(record, index) =>
          record.status === false ? "table-row-dark" : ""
        }
        style={{ cursor: "pointer" }}
        columns={columns}
        dataSource={convertDataTable}
        pagination={false}
        loading={loading}
      />
      <PaginationComponent
        total={totalQuestions}
        pagination={pagination}
        handleChangePagination={handleChangePagination}
        showSizeChanger={false}
      />
      <ConfirmDelete
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        listQuestionDelete={listQuestionDelete}
        handleClickInActiveMulti={handleClickInActiveMulti}
        handleClickActiveMulti={handleClickActiveMulti}
        active={active}
      />
    </>
  );
}
