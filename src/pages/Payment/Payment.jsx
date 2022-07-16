import React, { useState, useEffect } from "react";
import { DatePicker, Form, Input, Checkbox, Button, Modal } from "antd";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";
import { datVeAction } from "../../redux/actions/QuanLyDatVeActions";
import { SHOW_ID, LIST_CHAIR, TOTAL_PRICE } from "../../util/settings/config";
import dayjs from "dayjs";

const Payment = ({ visiable, handleVisiable, setVisiable }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const showID = JSON.parse(localStorage.getItem(SHOW_ID));
  const listChair = JSON.parse(localStorage.getItem(LIST_CHAIR));
  const totalPrice = JSON.parse(localStorage.getItem(TOTAL_PRICE));
  console.log("showid", showID, listChair, totalPrice);
  // const onFinish = (values) => {
  //   console.log("Success:", values);
  //   const action = datVeAction(values);
  //   dispatch(action);
  // };
  const datVeHoanTat = useSelector((state) => state.QuanLyDatVeReducer);
  const payMoney = (values) => {
    console.log(values);
    const newData = {
      showID,
      listChair,
      cardCredit: values.cardCredit,
      totalPrice,
      cvc: values.cvc,
      cardName: values.cardName,
      cardIssueDate: dayjs(values.cardIssueDate).format("DD/MM/YYYY"),
    };
    const action = datVeAction(newData);
    console.log("action",action);
    setVisiable(false);
    dispatch(action);

    console.log("datve", datVeHoanTat);
  };

  // const children = ({ remainingTime }) => {
  //   const minutes = Math.floor(remainingTime / 60);
  //   const seconds = remainingTime % 60;

  //   return `${minutes}:${seconds}`;
  // };
  // const renderTime = ({ remainingTime }) => {
  //   if (remainingTime > 0) {
  //     return (
  //       <div className="timer">
  //         <div className="text">Hạn thanh toán</div>
  //         <div className="value">{remainingTime}</div>
  //         <div className="text">seconds</div>
  //       </div>
  //     );
  //   } else return alert("no");
  //   <div className="timeup">Hết thời gian thanh toán</div>);
  // };

  return (
    <Modal
      title="THANH TOÁN"
      visible={visiable}
      okText="Thanh toán "
      cancelText="Hủy "
      onCancel={() => {
        handleVisiable();
        form.resetFields();
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          payMoney(values);
        });
      }}
    >
      <Form
        form={form}
        className="payment"
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 40,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        autoComplete="off"
      >
        <div className="payment-top">
          <Form.Item
            rules={[
              {
                required: true,
                message: "Số thẻ không được để trống",
              },
            ]}
            hasFeedback
            name="cardCredit"
            label="Số thẻ"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CVC/CVV"
            name="cvc"
            rules={[{ required: true, message: "CVC không được để trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="cardName"
            rules={[{ required: true, message: "Họ tên không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày tạo thẻ"
            name="cardIssueDate"
            rules={[
              { required: true, message: "Ngày tạo thẻ không được để trống" },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </div>
        {/* <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={30000}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: false, delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div> */}
      </Form>
    </Modal>
  );
};

export default Payment;
