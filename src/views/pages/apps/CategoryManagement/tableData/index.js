import { putEditCategory } from "@src/@core/api/question";
import { Checkbox, Input, Modal, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import "./style.css"
import ConfirmActive from "../confirmActive";
import { activeCategory, inActiveCategory } from "@src/@core/api/category";
import { useNavigate } from "react-router-dom";
export const TableData = (props) => {
  const { dataTable,
    openConfirm,
    loading,
    totalCategory,
    setListAllCategoryRefresh,
    setOpenConfirm,
    listCategoryActive,
    setListCategoryActive,
    active
  } = props;
  const navigate = useNavigate();
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10);
  const [singleCategoryDel, setSingleCategoryDel] = useState("");
  const [isEditing, setIsEditing] = useState(false)
  const [editingCategory, setEditingCategory] = useState("")
  const [idCategory, setIdCategory] = useState("")
  const [isErr, setErr] = useState(false);
  const [errMes, setErrMes] = useState('')
  const handleChecked = (item) => {
    const itemChecked = listCategoryActive.includes(item);
    return itemChecked;
  };
  const handleCheckAll = () => {
    if (
      listCategoryActive.length >= 0 &&
      listCategoryActive.length < dataTable.length
    ) {
      const allItems = dataTable.map((i) => i.id);
      setListCategoryActive(allItems);
    } else if (listCategoryActive.length === dataTable.length) {
      setListCategoryActive([]);
    }
  };
  const columns = [
    {
      title: (
        <Checkbox
          checked={listCategoryActive.length === dataTable?.length}
          indeterminate={
            listCategoryActive.length > 0 &&
            listCategoryActive.length < dataTable.length
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
      title: "Chủ đề ",
      key: "topic",
      dataIndex: "topic",
      width: "800px",
      align: "center",
      render: (topic, currentCategory) => <div onClick={() => { handleEditCategory(topic, currentCategory) }}>{topic}</div>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "200px",
      render: (status, currentCategory) =>
        status ? (
          <div
            onClick={() => {
              handleEditCategory(currentCategory.topic, currentCategory)
            }}
            style={{ color: "green" }}
          >
            Hiệu lực
          </div>
        ) : (
          <div
            onClick={() => {
              handleEditCategory(currentCategory.topic, currentCategory)
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
      title: "Hành động ",
      key: "topic",
      dataIndex: "topic",
      width: "150px",
      align: "center",
      render: (topic, currentCategory) => <div onClick={() => { handleEditCategory(topic, currentCategory) }}><BorderColorIcon sx={{ marginRight: "5px", color: "blue" }} />
        <span>Chỉnh sửa</span></div>,
    },
  ];
  const handleEditCategory = (topic, currentCategory) => {
    setIdCategory(currentCategory.index)
    setIsEditing(true)
    setEditingCategory(topic)

  }

  const handleChangeCheckItem = (item) => {
    const hasItem = listCategoryActive.findIndex((i) => i === item);
    if (hasItem === -1) {
      setListCategoryActive([...listCategoryActive, item]);
    } else {
      const newList = listCategoryActive.filter((i) => i !== item);
      setListCategoryActive(newList);
    }
  };
  const convertDataTable = dataTable
    ? dataTable?.map((item, index) => ({
      key: index,
      checkbox: (
        <Checkbox
          checked={handleChecked(item?.id)}
          onChange={() => handleChangeCheckItem(item.id)}
        />
      ),
      index: index + 1,
      topic: item?.name,
      status: item?.isActive
    }))
    : [];
  const handleClickInActiveMulti = () => {
    const payload = {
      categoryIds: listCategoryActive,
      active: false,
    };
    inActiveCategory(payload)
      .then((res) => {
        toast.success("Đóng hiệu lực câu hỏi thành công");
        setOpenConfirm({
          ...openConfirm,
          open: false,
        });
        setListCategoryActive([]);
      })
      .catch((err) => {
        toast.error("Đã xảy ra lỗi từ server !");
      })
      .finally(() => {
        navigate("/topic-management");
      });
  };
  const handleClickActiveMulti = () => {
    const payload = {
      categoryIds: listCategoryActive,
      active: true,
    };
    activeCategory(payload)
      .then((res) => {
        toast.success("Mở hiệu lực câu hỏi thành công");
        setOpenConfirm({
          ...openConfirm,
          open: false,
        });
        setListCategoryActive([]);
      })
      .catch((err) => {
        toast.error("Đã xảy ra lỗi từ server !");
      })
      .finally(() => {
        navigate("/topic-management");
      });
  };
  return (
    <>
      <Table
        rowClassName={(record) =>
          (record.status === false) ? "table-row-dark" : ""
        }

        style={{ cursor: 'pointer' }}
        columns={columns} pagination={{
          current: page, pageSize: pageSize, total: totalCategory, onChange: (page, pageSize) => {
            setPage(page),
              setPageSize(pageSize)
          }
        }} dataSource={convertDataTable} loading={loading} />
      <Modal
        okButtonProps={{ style: { backgroundColor: 'blue' }, disabled: isErr }}
        cancelButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }}
        title="Chỉnh sửa chủ đề"
        centered={true}
        cancelText="Hủy"
        okText="Lưu"
        visible={isEditing}
        className="modalStyle"
        onCancel={() => {
          setIsEditing(false)
        }}
        onOk={() => {
          if (editingCategory === '') {
            setErr(true)
            setErrMes("Bạn không được để trống");
            return;
          }
          let editCategory = {};
          const listCategoryEdit = dataTable.map((item, index) => {
            return index + 1 == idCategory ? editCategory = { ...item, name: editingCategory } : item
          })
          setListAllCategoryRefresh(listCategoryEdit)
          putEditCategory(editCategory).then(() => {
            toast.success("Cập nhật chủ đề thành công")
          }).catch(err => toast.error("Đã có lỗi xảy ra"))
          setIsEditing(false)
        }}
      >
        <Input value={editingCategory} onChange={(e) => {
          const duplicate = dataTable.some((item, index) => {
            return item.name.trim() === e.target.value.trim()
          })
          duplicate ? setErrMes("Chủ đề đã tại") : setErrMes('')
          setErr(duplicate)
          setEditingCategory(e.target.value)
        }} />
        {isErr && <div style={{ textAlign: "left", color: "red" }}>{errMes}</div>}
      </Modal >
      <ConfirmActive
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        listCategoryActive={listCategoryActive}
        handleClickInActiveMulti={handleClickInActiveMulti}
        handleClickActiveMulti={handleClickActiveMulti}
        active={active}
      />
    </>
  );
};
