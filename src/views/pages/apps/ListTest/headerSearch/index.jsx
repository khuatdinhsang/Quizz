import { Box } from "@mui/material";
import { DatePicker, Space, Select, Typography } from "antd";
import dayjs from "dayjs";
// import './index.scss';

export default function HeaderSearch(props) {
  const {
    createDate,
    startDate,
    expiredDate,
    setCreateDate,
    setStartDate,
    setExpiredDate,
  } = props;
  const dateFormatList = ["YYYY-MM-DD"];
  const onChangeCreateDate = (date, dateString) => {
    setCreateDate(dateString);
  };
  const onChangeStartDate = (date, dateString) => {
    setStartDate(dateString);
  };
  const onChangeExpiredDate = (date, dateString) => {
    setExpiredDate(dateString);
  };
  return (
    <>
      <Space style={{ marginBottom: "20px" }}>
        <Box>
          Thời gian tạo
          <DatePicker
            placeholder="dd/mm/yyyy"
            format={dateFormatList}
            onChange={onChangeCreateDate}
            style={{
              height: 35,
              width: 200,
              display: "block",
              marginTop: "5px",
            }}
          />
        </Box>
        <Box>
          Thời gian mở
          <DatePicker
            placeholder="dd/mm/yyyy"
            onChange={onChangeStartDate}
            format={dateFormatList}
            style={{
              height: 35,
              width: 200,
              display: "block",
              marginTop: "5px",
            }}
          />
        </Box>
        <Box>
          Thời gian đóng
          <DatePicker
            placeholder="dd/mm/yyyy"
            onChange={onChangeExpiredDate}
            format={dateFormatList}
            style={{
              height: 35,
              width: 200,
              display: "block",
              marginTop: "5px",
            }}
          />
        </Box>
      </Space>
    </>
  );
}
