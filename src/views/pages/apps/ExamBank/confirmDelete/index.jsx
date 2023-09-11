import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  SvgIcon,
} from "@mui/material";
import React from "react";
import HelpIcon from "@mui/icons-material/Help";

export default function ConfirmDelete(props) {
  const {
    openConfirm,
    setOpenConfirm,
    listExamDelete,
    handleClickActiveMulti,
    handleClickInActiveMulti,
    active,
  } = props;
  listExamDelete, console.log("listExamDelete", listExamDelete);
  const handleClose = () => {
    setOpenConfirm({ ...openConfirm, open: false });
  };

  return (
    <div>
      <Dialog
        open={openConfirm.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              sx={{
                margin: "auto",
                textAlign: "center",
                width: 70,
                height: 70,
              }}
            >
              <SvgIcon sx={{ width: "70%", height: "100%" }} color="error">
                <HelpIcon />
              </SvgIcon>
            </Box>
            {active ? (
              <span>
                Bạn có muốn mở hiệu lực{" "}
                {listExamDelete?.length > 0 ? listExamDelete?.length : null} câu
                nỏi này ?
              </span>
            ) : (
              <span>
                Bạn có muốn đóng hiệu lực{" "}
                {listExamDelete?.length > 0 ? listExamDelete?.length : null} câu
                nỏi này ?
              </span>
            )}
          </DialogContentText>
          <Box sx={{ textAlign: "center" }}>
            <Button
              className="button-save-update"
              style={{
                marginRight: "10px",
                background: "blue",
                color: "white",
                borderRadius: "2px",
              }}
              onClick={
                !active ? handleClickInActiveMulti : handleClickActiveMulti
              }
            >
              Xác nhận
            </Button>
            <Button
              className="button-update-user"
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "2px",
              }}
              onClick={handleClose}
            >
              Hủy
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
