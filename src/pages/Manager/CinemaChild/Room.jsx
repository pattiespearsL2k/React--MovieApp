import React from "react";
import "antd/dist/antd.css";
import { Select } from "antd";

const children = [];

for (let i = 1; i <= 10; i++) {
  children.push({
    value: `Rạp ${i}`,
    label: `Rạp ${i}`,
  });
}

const Room = ({ ...rest }) => (
  <Select
    mode="multiple"
    allowClear
    style={{
      width: "50%",
    }}
    placeholder=""
    options={children}
    {...rest}
  />
);

export default Room;
