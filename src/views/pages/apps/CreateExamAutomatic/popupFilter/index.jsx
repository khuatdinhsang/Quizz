import { InputField } from "@components/input-field";
import SelectFieldCustom from "@components/selectFieldCustom";
import { PlusOutlined } from "@material-ui/icons";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import { convertDataOptions } from "@src/utility/Utils";
import { Button, InputNumber, Typography } from "antd";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

const PopUpFilter = (props) => {
  const {
    isOpenPopupFilter,
    setIsOpenPopupFilter,
    setListIdFilterCondition,
    handleChangeQuantityCate,
    item,
    index,
  } = props;
  const [listIdFilter, setListIdFilter] = useState([]);
  const handleClose = () => {
    setIsOpenPopupFilter(false);
  };
  let filterCondition = [
    {
      id: 1,
      background: "#ccc", //#092C4C
      label: "Mức độ",
      color: "#092C4C", //white
    },
    {
      id: 2,
      background: "#ccc",
      label: "Chủ đề",
      color: "#092C4C",
    },
  ];
  const handleCheckFilter = (item) => {
    const hasItem = listIdFilter.findIndex((i) => i === item);
    if (hasItem === -1) {
      setListIdFilter([...listIdFilter, item]);
    } else {
      const newList = listIdFilter.filter((i) => i !== item);
      setListIdFilter(newList);
    }
  };
  filterCondition = filterCondition.map((item) => {
    return listIdFilter.includes(item.id)
      ? { ...item, background: "#092C4C", color: "white" }
      : item;
  });
  const handleAddFilterCondition = () => {
    setListIdFilterCondition(listIdFilter);
    handleClose();
  };
  return (
    <div>
      <Dialog open={isOpenPopupFilter} onClose={handleClose} maxWidth="sm">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              sx={{
                margin: "auto",
                textAlign: "center",
              }}
            >
              <Typography
                style={{
                  color: "#161E54",
                  fontWeight: 600,
                  fontSize: "24px",
                }}
              >
                Thêm điều kiện lọc
              </Typography>
              <Typography style={{ fontSize: "16px", color: "#161E54" }}>
                Ngoài 3 lựa chọn bắt buộc cần cho Điều kiện. Dưới đây là các
                điều kiện lọc bạn có thể thêm vào để sử dụng cho Điều kiện của
                mình.
              </Typography>
              <Box style={{ marginTop: "20px" }}>
                {filterCondition.map((item, index) => {
                  return (
                    <Box
                      onClick={() => {
                        handleCheckFilter(item.id);
                      }}
                      key={item.id}
                      style={{
                        padding: "10px 30px",
                        marginRight: "20px",
                        borderRadius: "20px",
                        background: `${item.background}`,
                        display: "inline-block",
                        cursor: "pointer",
                        color: `${item.color}`,
                      }}
                    >
                      {item.label}
                    </Box>
                  );
                })}
              </Box>
              <Box
                onClick={handleAddFilterCondition}
                style={{
                  padding: "10px 50px",
                  borderRadius: "20px",
                  background: "#092C4C",
                  display: "inline-block",
                  color: "white",
                  cursor: "pointer",
                  marginTop: "30px",
                }}
              >
                Thêm
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PopUpFilter;
