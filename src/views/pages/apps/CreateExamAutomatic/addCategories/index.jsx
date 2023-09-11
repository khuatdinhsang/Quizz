import React from "react";
import { InputField } from "@components/input-field";
import SelectFieldCustom from "@components/selectFieldCustom";
import { PlusOutlined } from "@material-ui/icons";
import { Box, Grid, Stack } from "@mui/material";
import { Button, InputNumber, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { listDifficulty } from "@src/utility/Utils";
import PopUpFilter from "../popupFilter";
import SelectAntdComponent from "@components/select-option";
const AddCategories = (props) => {
  const {
    item,
    indexState,
    dataCategoryOptions,
    dataQuestionType,
    handleChangeExam,
    createExamForm,
    handleChangeQuantityCate,
    conditionQuestion,
    index,
  } = props;
  console.log("indexState", indexState);
  const [listIdFilter, setListIdFilter] = useState([]);
  const [isOpenPopupFilter, setIsOpenPopupFilter] = useState(false);
  return (
    <div>
      <Box style={{ marginTop: "20px" }}>
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              style={{
                color: "#161E54",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              Điều kiện {item.index} {item.index == 1 ? "(mặc định)" : ""}
            </Typography>
            {item.index !== 1 ? (
              <Button
                onClick={() => handleChangeQuantityCate("remove", item.index)}
                danger
                icon={<ClearIcon />}
              >
                Xóa điều kiện
              </Button>
            ) : null}
          </Stack>
          <Grid container spacing={2}>
            <Grid xs={4} item>
              <SelectAntdComponent
                index={index}
                title={"Loại câu hỏi"}
                data={dataQuestionType}
                width="80%"
                defaultValue={createExamForm?.quizCategories[0]?.questionType}
                handleChange={handleChangeExam}
                name="dataQuestion"
                placeholder="Chọn loại câu hỏi"
                height={35}
              />
            </Grid>
            <Grid xs={4} item>
              <Typography
                style={{
                  paddingBottom: "5px",
                  paddingRight: "15px",
                  fontWeight: 600,
                }}
              >
                Số lượng câu hỏi
              </Typography>
              <InputNumber
                min={1}
                defaultValue={1}
                style={{ height: "35px", width: "80%" }}
                onChange={(value) => {
                  handleChangeExam("numberQuestion", value, index);
                }}
              />
            </Grid>
            <Grid xs={4} item>
              <Typography
                style={{
                  paddingBottom: "5px",
                  paddingRight: "15px",
                  fontWeight: 600,
                }}
              >
                Điểm cho mỗi câu
              </Typography>
              <InputNumber
                min={0}
                defaultValue={1}
                style={{ height: "35px", width: "80%" }}
                onChange={(value) => {
                  handleChangeExam("pointQuestion", value, index);
                }}
              />
            </Grid>
          </Grid>
        </Box>
        {listIdFilter.length > 0 && (
          <Typography
            style={{
              color: "#161E54",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Các điều kiện lọc
          </Typography>
        )}
        <Grid container spacing={2}>
          {listIdFilter.includes(1) && (
            <Grid xs={4} item>
              <SelectAntdComponent
                index={index}
                title={"Mức độ"}
                data={listDifficulty}
                width="80%"
                defaultValue={createExamForm?.quizCategories[0]?.level}
                handleChange={handleChangeExam}
                name="level"
                height={35}
                placeholder="Chọn mức độ"
              />
            </Grid>
          )}
          {listIdFilter.includes(2) && (
            <Grid xs={4} item>
              <SelectAntdComponent
                index={index}
                title={"Chủ đề"}
                data={dataCategoryOptions}
                width="80%"
                defaultValue={createExamForm?.quizCategories[0]?.categoryId}
                handleChange={handleChangeExam}
                name="questionType"
                placeholder="Chọn chủ đề"
                height={35}
              />
            </Grid>
          )}
        </Grid>
        <Box style={{ textAlign: "center", marginTop: "30px" }}>
          <Button
            onClick={() => {
              setIsOpenPopupFilter(!isOpenPopupFilter);
            }}
            icon={<AddIcon />}
          >
            {listIdFilter.length > 0
              ? "Sửa điều kiện lọc"
              : "Thêm điều kiện lọc"}
          </Button>
        </Box>
        <hr />
      </Box>
      <PopUpFilter
        isOpenPopupFilter={isOpenPopupFilter}
        indexState={indexState}
        setIsOpenPopupFilter={setIsOpenPopupFilter}
        listIdFilterCondition={listIdFilter}
        setListIdFilterCondition={setListIdFilter}
        handleChangeQuantityCate={handleChangeQuantityCate}
        item={item}
        index={index}
      />
    </div>
  );
};

export default AddCategories;
