import React from "react";
import "./HomeUser.scss";
import { Row, Col } from "antd";

import { Collapse } from "antd";

import IconPart from "./../../../../../../src/assets/images/svg/icon-park_table-report.svg";
import IconParkRed from "./../../../../../../src/assets/images/svg/iconamoon_file-close-fill.svg";
export default function HomeUser() {
  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;
  const items = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];

  return (
    <div className="home-user">
      <h1>Trang chủ </h1>

      <div className="home-user-top">
        <Row>
          <Col flex={1} style={{ backgroundColor: "#DAEBF7" }}>
            <img src={IconPart} alt="icon" />
            <p>Bài kiểm tra vừa được giao</p>;
          </Col>

          <Col flex={1}>
            <img src={IconParkRed} alt="icon" />
            <p>Bài kiểm tra sắp hết hạn</p>
          </Col>
        </Row>
      </div>
      <div className="home-user-bottom"></div>
    </div>
  );
}
