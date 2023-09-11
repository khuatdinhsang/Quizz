import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Grid, IconButton } from "@mui/material";
// import './style.css'
import { Modal, Input } from "antd";
import SelectFieldCustom from "@components/selectFieldCustom";
import { useNavigate } from "react-router-dom";
export default function CreateExam(props) {
  const { categories, visible, togglevisible, onClose, dataExam } = props;
  const navigate = useNavigate();
  const [cateName, setCateName] = useState({ name: "" });
  console.log("dataExam", dataExam);
  const dataMethodExamOption = [
    { value: "1", label: "Tạo tự động" },
    { value: "2", label: "Tạo thủ công" },
  ];
  const [styleExam, setStyleExam] = useState({
    id: dataMethodExamOption[0].value,
    name: dataMethodExamOption[0].label,
  });
  const [errorCate, setErrorCate] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleCancel = () => {
    onClose();
  };

  const handleCheckCateName = () => {
    let hasCate = -1;
    if (categories != null)
      hasCate = dataExam.findIndex((i) => i.description === cateName.name);
    if (hasCate !== -1) {
      setErrorCate(true);
      setErrMsg("Đề thi đã tồn tại");
    } else {
      setErrorCate(false);
      setErrMsg("");
    }
  };

  const handleCreateExam = () => {
    if (cateName.name === "") {
      setErrorCate(true);
      setErrMsg("Không được để trống");
    } else if (errorCate) {
      setErrorCate(true);
    } else {
      if (styleExam.id == 1) {
        navigate(`/exam-bank/tao-bai-tu-dong?name=${cateName.name}`);
      } else {
        navigate("/exam-bank/tao-bai-thu-cong");
      }
      setErrorCate(false);
      setCateName({ ...cateName, name: "" });
      onClose();
    }
  };
  useEffect(() => {
    handleCheckCateName();
  }, [cateName]);
  const handleChangeStyleExam = (name, value) => {
    setStyleExam({
      id: value.value,
      name: value.label,
    });
  };
  console.log("errCate", errorCate);
  return (
    // <Modal centered show={props.visible}>
    <Modal
      title={
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            color: "#161E54",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Tạo đề thi
        </div>
      }
      centered
      open={visible}
      onCancel={handleCancel}
      disabled={true}
      width="30%"
      footer={null}
    >
      <Input
        style={{ height: "37px", marginBottom: "20px" }}
        title="Tên đề thi"
        placeholder={"Nhập tên đề thi"}
        required
        onChange={(e) => {
          setCateName({ name: e.target.value });
        }}
        value={cateName.name}
      />
      {errorCate && <p style={{ color: "red" }}>{errMsg}</p>}
      <div>
        <SelectFieldCustom
          title="Phương thức tạo câu hỏi"
          handleOnChange={handleChangeStyleExam}
          flexRow
          maxLength={200}
          data={dataMethodExamOption}
          allowClear={false}
          defaultValue={styleExam.id}
          name={"category"}
          width="100%"
        />
      </div>
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          onClick={handleCreateExam}
          //   disabled={!errorCate}
          className="button-save-update"
          color="primary"
          style={{ backgroundColor: "blue", color: "white", width: "80px" }}
        >
          Tạo đề
        </Button>
      </Box>
    </Modal>
  );
}
const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: 'flex-end',
    // justifyContent: 'flex-end',
  },
};
