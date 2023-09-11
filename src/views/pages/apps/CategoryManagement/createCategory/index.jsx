import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button } from "@mui/material";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

export default function CreateCategory(props) {
  const {
    categories,
    id,
    setListAllCategory,
    setListAllCategoryRefresh,
    createCateModal,
    toggleCreateCateModal,
    postCreateCategory,
  } = props;
  const [cateName, setCateName] = useState("");
  const [errorCate, setErrorCate] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const handleCheckCateName = () => {
    let hasCate = -1;
    if (categories != null)
      hasCate = categories.findIndex((i) => i.name === cateName);
    if (hasCate !== -1) {
      setErrorCate(true);
      setErrMsg("Chủ đề đã tồn tại");
    } else {
      setErrorCate(false);
      setErrMsg("");
    }
    if (cateName === "" || !cateName) {
      setErrorCate(true);
      setErrMsg("Không được để trống");
    }
  };
  const handleClickCreateCate = () => {
    toggleCreateCateModal(false);
    postCreateCategory({ name: cateName });
    setListAllCategory((data) => [...data, { id, name: cateName }]);
    setListAllCategoryRefresh((data) => [...data, { id, name: cateName }]);
    setCateName("");
  };
  useEffect(() => {
    handleCheckCateName();
  }, [handleClickCreateCate]);
  return (
    // <Modal centered show={props.createCateModal}>
    <>
      <Modal
        title={
          <div style={{ fontFamily: "Quicksand", fontSize: "16px" }}>
            Tạo chủ đề mới
          </div>
        }
        centered={true}
        open={createCateModal}
        onCancel={toggleCreateCateModal}
        footer={null}
      >
        <Box sx={{ textAlign: "right", padding: "25px 13px 0 0" }}>
          <input
            style={{
              width: "100%",
              height: "40px",
              padding: "0 10px",
              outline: "none",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
            type="text"
            value={setErrorCate && cateName}
            onChange={(e) => setCateName(e.target.value)}
          />
          <div style={{ textAlign: "left", color: "red" }}>{errMsg}</div>
          <Button
            onClick={handleClickCreateCate}
            variant="contained"
            disabled={errorCate}
          >
            Tạo
          </Button>
        </Box>
      </Modal>
    </>
  );
}
