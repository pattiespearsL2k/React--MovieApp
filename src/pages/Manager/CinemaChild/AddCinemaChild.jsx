import { Form, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { themCumRapAction } from "../../../redux/actions/QuanLyRapActions";
import Room from "./Room";

for (let i = 1; i <= 10; i++) {}

const AddCinemaChild = () => {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values);
    const action = themCumRapAction(values);
    dispatch(action);
  };

  return (
    <>
      <Form className="AddCinemaChild" layout="horizontal" onFinish={onFinish}>
        <h3>Thêm cụm rạp</h3>
        <div className="form-flex-display">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Tên cụm rạp không được để trống",
              },
            ]}
            hasFeedback
            name="cinemaChildName"
            label="Tên cụm rạp"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              { required: true, message: "Hệ thống rạp không được để trống" },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          style={{
            width: "30%",
          }}
          label="Rạp con"
          name={["listRoom", "roomName"]}
          rules={[{ required: true, message: "Rạp không được để trống" }]}
        >
          <Room />
        </Form.Item>
        <Form.Item>
          <button type="submit" className="btn-active-add-after">
            Thêm cụm rạp
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCinemaChild;
