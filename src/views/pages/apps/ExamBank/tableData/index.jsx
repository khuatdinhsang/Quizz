import { Checkbox, Input, Table } from "antd";
import { useState } from "react";
import ConfirmDelete from "../confirmDelete";
import {
  getDetailExam,
  putActiveSampleExam,
  putDeleteExam,
} from "@src/@core/api/exam";
import toast from "react-hot-toast";
import { convertDuplicateCategory, listDifficulty } from "@src/utility/Utils";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "@components/pagination";
import "./style.css";
export default function TableDataExam(props) {
  const {
    dataTable,
    openConfirm,
    setOpenConfirm,
    listExamDelete,
    setListExamDelete,
    handleChangePagination,
    loading,
    dataCategory,
    active,
    totalExams,
    pagination,
    detailExam,
    setDetailExam,
    popUpDetailExam,
    setPopUpDetailExam,
  } = props;
  const navigate = useNavigate();
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
  const convertDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()} `;
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
      title: "Tên đề",
      dataIndex: "cate",
      key: "cate",
      width: "500px",
      render: (cate) => <div>{cate}</div>,
      align: "left",
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
      width: "300px",
      align: "center",
      render: (createDate) => <div>{convertDate(createDate)}</div>,
      // sorter: (record1, record2) => {
      //   return new Date(record1.createDate) >= new Date(record2.createDate);
      // },
    },
    {
      title: "Chủ đề ",
      key: "topic",
      dataIndex: "topic",
      width: "200px",
      align: "center",
      render: (topic) => <div>{topic}</div>,
      filters: dataCategory?.map((record, index) => {
        console.log("recordNae", record.name);
        return { ...record, text: `${record.name}`, value: `${record.name}` };
      }),
      onFilter: (value, record) => {
        return record.topic === value;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "200px",
      align: "center",
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
  const handleChangeCheckItem = (item) => {
    const hasItem = listExamDelete.findIndex((i) => i === item);
    if (hasItem === -1) {
      setListExamDelete([...listExamDelete, item]);
    } else {
      const newList = listExamDelete.filter((i) => i !== item);
      setListExamDelete(newList);
    }
  };
  const handleClickInActiveMulti = () => {
    const payload = {
      quizSampleIds: listExamDelete,
      active: false,
    };
    putActiveSampleExam(payload)
      .then((res) => {
        toast.success("Đóng hiệu lực đề thi thành công");
        setOpenConfirm({
          ...openConfirm,
          open: false,
        });
        setListExamDelete([]);
      })
      .catch((err) => {
        toast.error("Đã xảy ra lỗi từ server !");
      })
      .finally(() => {
        navigate("/exam-bank");
      });
  };
  const handleClickActiveMulti = () => {
    const payload = {
      quizSampleIds: listExamDelete,
      active: true,
    };
    putActiveSampleExam(payload)
      .then((res) => {
        toast.success("Mở hiệu lực đề thi thành công");
        setOpenConfirm({
          ...openConfirm,
          open: false,
        });
        setListExamDelete([]);
      })
      .catch((err) => {
        toast.error("Đã xảy ra lỗi từ server !");
      })
      .finally(() => {
        navigate("/exam-bank");
      });
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
        cate: item?.description,
        creator: item?.creator,
        createDate: item?.createDate,
        topic: convertDuplicateCategory(item?.cate),
        status: item?.isActive,
      }))
    : [];
  console.log("convertDatable", convertDataTable);
  const getIdExam = (idx) => {
    return dataTable.find((item, index) => idx == index);
  };
  const getApiDetailExam = (id) => {
    setPopUpDetailExam(true);
    getDetailExam(id)
      .then((res) => {
        setDetailExam(res.data);
      })
      .catch((err) => {
        toast.error("Đã có lỗi xảy ra");
      });
  };
  return (
    <>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              getApiDetailExam(getIdExam(record.key).id);
            },
          };
        }}
        rowClassName={(record, index) =>
          record.status === false ? "table-row-dark" : ""
        }
        style={{ cursor: "pointer" }}
        columns={columns}
        dataSource={convertDataTable}
        loading={loading}
        pagination={false}
      />
      <PaginationComponent
        total={totalExams}
        pagination={pagination}
        handleChangePagination={handleChangePagination}
        showSizeChanger={false}
      />
      <ConfirmDelete
        listExamDelete={listExamDelete}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        handleClickInActiveMulti={handleClickInActiveMulti}
        handleClickActiveMulti={handleClickActiveMulti}
        active={active}
      />
    </>
  );
}
