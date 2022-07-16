import { Popconfirm, Table, Button } from "antd";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import {
  layThongTinCumRapTheoHeThongManagerAction,
  xoaCumRapAction,
} from "../../../redux/actions/QuanLyRapActions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function CinemaChild() {
  const { thongTinCumRap } = useSelector((state) => state.QuanLyRapReducer);
  console.log(thongTinCumRap, "thongTinCumRap");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinCumRapTheoHeThongManagerAction());
  }, []);

  const columns = [
    {
      title: "Mã cụm rạp",
      dataIndex: "cinemaChildID",
      key: "cinemaChildID",
      sorter: (a, b) => a.cinemaChildID - b.cinemaChildID,
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Tên cụm rạp",
      dataIndex: "cinemaChildName",
      key: "cinemaChildName",
      sorter: (a, b) => {
        let cinemaChildNameA = a.cinemaChildName.toLowerCase().trim();
        let cinemaChildNameB = b.cinemaChildName.toLowerCase().trim();
        if (cinemaChildNameA > cinemaChildNameB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text, cinemaChild) => {
        return <Fragment>{cinemaChild.address}</Fragment>;
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Hành động",
      dataIndex: "cinemaChildID",
      key: "abc",
      render: (text, cinemaChild) => {
        const confirm = (e) => {
          console.log(e);
          dispatch(xoaCumRapAction(cinemaChild.cinemaChildID));
        };
        return (
          <div className="parent-action">
            <NavLink
              key={1}
              className="action"
              to={`/manager/cinemachild/edit/${cinemaChild.cinemaChildID}`}
            >
              <EditOutlined style={{ color: "blue" }} />
              <p>Sửa</p>
            </NavLink>
            <Popconfirm
              className="action"
              title="Bạn có chắc chắn xoá không?"
              onConfirm={confirm}
              okText="Xóa"
              cancelText="Hủy"
            >
              <DeleteOutlined style={{ color: "red" }} />
              <p>Xóa</p>
            </Popconfirm>
          </div>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
  ];

  console.log(thongTinCumRap);
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h3 className="text-4xl">Quản lý cụm rạp</h3>
      <Button
        className="mb-5 btn-add-film"
        onClick={() => {
          history.push("/manager/cinemachild/add");
        }}
      >
        Thêm rạp
      </Button>
      <Table
        columns={columns}
        dataSource={thongTinCumRap}
        onChange={onChange}
        rowkey={(record) => record.roomID}
      />
    </div>
  );
}
