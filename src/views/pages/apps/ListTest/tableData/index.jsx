import { Checkbox, Input, Table } from "antd";
import { useState } from "react";
import { putDeleteQuestion } from "@src/@core/api/question";
import toast from "react-hot-toast";
import { convertDuplicateCategory, listDifficulty } from "@src/utility/Utils";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./style.css";
import PaginationComponent from "@components/pagination";
export default function TableDataListTest(props) {
  const {
    dataTable,
    openConfirm,
    setOpenConfirm,
    listExamDelete,
    setListExamDelete,
    loading,
    dataCategory,
    pagination,
    totalExams,
    handleChangePagination,
  } = props;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const handleChecked = (item) => {
    const itemChecked = listExamDelete.includes(item);
    return itemChecked;
  };
  const handleCheckAll = () => {
    if (
      listExamDelete.length >= 0 &&
      listExamDelete.length < dataTable.length
    ) {
      const allItems = dataTable.map((i) => i.id);
      setListExamDelete(allItems);
    } else if (listExamDelete.length === dataTable.length) {
      setListExamDelete([]);
    }
  };
  const handleChangeCheckItem = (item) => {
    const hasItem = listExamDelete.findIndex((i) => i === item);
    if (hasItem === -1) {
      setListExamDelete([...listExamDelete, item]);
    } else {
      const newList = listExamDelete.filter((i) => i !== item);
      setListExamDelete(newList);
    }
  };
  const columns = [
    {
      title: (
        <Checkbox
          checked={listExamDelete.length === dataTable?.length}
          indeterminate={
            listExamDelete.length > 0 &&
            listExamDelete.length < dataTable.length
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
    },
    {
      title: "Tên bài kiểm tra",
      dataIndex: "description",
      key: "description",
      width: "200px",
      align: "center",
      render: (description) => <div>{description}</div>,
    },
    {
      title: "Người tạo",
      dataIndex: "creator",
      key: "creator",
      width: "200px",
      align: "center",
      render: (creator) => <div>{creator}</div>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "createDate",
      width: "200px",
      align: "center",
      render: (createDay) => <div>{createDay}</div>,
    },
    {
      title: "Thời gian mở",
      dataIndex: "startTime",
      key: "startTime",
      width: "200px",
      align: "center",
      render: (startTime) => <div>{startTime}</div>,
    },
    {
      title: "Thời gian đóng",
      dataIndex: "expiredTime",
      key: "expiredTime",
      width: "200px",
      align: "center",
      render: (expiredTime) => <div>{expiredTime}</div>,
    },
    {
      title: "Chủ đề ",
      key: "category",
      dataIndex: "category",
      width: "150px",
      align: "center",
      render: (category) => <div>{category}</div>,
      filters: dataCategory.map((record, index) => {
        return { ...record, text: `${record.name}`, value: `${record.name}` };
      }),
      onFilter: (value, record) => {
        return [record.category].includes(value.toUpperCase());
      },
    },
    {
      title: "Số câu hỏi",
      dataIndex: "numberQuestions",
      key: "numberQuestions",
      width: "150px",
      align: "center",
      render: (numberQuestions) => <div>{numberQuestions}</div>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "200px",
      render: (status) =>
        status ? (
          <div style={{ color: "green" }}>Hiệu lực</div>
        ) : (
          <div style={{ color: "red" }}>Hết hiệu lực</div>
        ),
      filters: [
        { text: "Hiệu lực", value: true },
        { text: "Hết hiệu lực", value: false },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
  ];
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
        description: item?.description,
        creator: item?.creator?.fullName || item?.creator?.username,
        createDate: item?.createDate,
        startTime: item?.startTime,
        expiredTime: item?.expiredTime,
        category: convertDuplicateCategory(item?.cate),
        numberQuestions: item?.numberQuestions || "BE chua tra ra",
        status: item?.status,
      }))
    : [];

  return (
    <>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              console.log("record", record);
            },
          };
        }}
        columns={columns}
        dataSource={convertDataTable}
        pagination={false}
        loading={loading}
        style={{ cursor: "pointer" }}
      />
      <PaginationComponent
        total={totalExams}
        pagination={pagination}
        handleChangePagination={handleChangePagination}
        showSizeChanger={false}
      />
    </>
  );
}
