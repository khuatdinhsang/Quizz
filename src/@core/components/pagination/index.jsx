import React from "react";
import { Col, Pagination, Row, Select, Typography } from "antd";
import "./style.scss";

const { Option } = Select;
function PaginationComponent(props) {
  const {
    pagination,
    total,
    defaultPage,
    handleChangePagination,
    showSizeChanger,
  } = props;
  const fromRecord = Math.floor(1 + (pagination.page - 1) * pagination.limit);
  const toRecord =
    total > pagination.page * pagination.limit
      ? Math.floor(pagination.page * pagination.limit)
      : total;

  const SelectRecordShow = () => {
    return (
      <Select
        defaultValue={pagination.limit}
        style={{ width: 60 }}
        onChange={(value) => handleChangePagination(pagination.page, value)}
      >
        <Option value={20}>20</Option>
        <Option value={30}>30</Option>
        <Option value={50}>50</Option>
        <Option value={100}>100</Option>
      </Select>
    );
  };
  return (
    <div className="pagination-component">
      <Row>
        <Col xs={6} className="pagination-component-range">
          <Typography>
            Hiển thị từ {fromRecord} đến {toRecord} trên {total}
          </Typography>
        </Col>
        <Col xs={8}></Col>
        <Col xs={10} className="pagination-component-page-group">
          <div>
            <SelectRecordShow />
          </div>
          <Pagination
            pageSize={pagination.limit ?? 0}
            current={pagination.page ?? 0}
            defaultCurrent={defaultPage ?? 0}
            total={total ?? 0}
            onChange={handleChangePagination}
            showSizeChanger={showSizeChanger}
          />
        </Col>
      </Row>
    </div>
  );
}

export default PaginationComponent;
