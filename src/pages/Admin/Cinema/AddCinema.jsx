import {
    DatePicker, Form,
    Input, InputNumber, Switch
  } from 'antd';
  import { useFormik } from 'formik';
  import moment from 'moment';
  import { useState } from 'react';
  import { useDispatch } from 'react-redux';
  import { themPhimUploadHinhAction } from '../../../redux/actions/QuanLyPhimActions';
  
  const AddNew = () => {
  
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();
    const formik = useFormik({
      initialValues: {
  
        title: '',
        trailer: '',
        duration: '',
        description: '',
        languague: '',
        releaseDate: '',
        rating: 0,
        country: '',
        genre: '',
        nowShowing: false,
        comingSoon: true,
        image: {},
  
      },
      onSubmit: (values) => {
        console.log('values', values);
        //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
        let formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
          console.log(formData)
  
        }
        //Gọi api gửi các giá trị formdata về backend xử lý
        dispatch(themPhimUploadHinhAction(formData));
  
      }
    })
  
    const handleChangeDatePicker = (value) => {
      let releaseDate = moment(value).format('DD/MM/YYYY');
      formik.setFieldValue('releaseDate', releaseDate);
  
    }
  
    const handleChangeSwitch = (name) => {
  
      return (value) => {
        formik.setFieldValue(name, value)
      }
    }
  
    const handleChangeInputNumber = (name) => {
      return (value) => {
        formik.setFieldValue(name, value);
      }
    }
  
    const handleChangeFile = (e) => {
      //Lấy file ra từ e
      let file = e.target.files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
        //Tạo đối tượng để đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setImgSrc(e.target.result);
        }
        formik.setFieldValue('image', file);
      }
    }
  
  
    return (
      <>
        <Form className='addnew'
          onSubmitCapture={formik.handleSubmit}
          layout="horizontal"
        >
          <h3>Thêm mới phim </h3>
          <div className="form-flex-display">
            <Form.Item label="Tên phim">
              <Input name="title" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
              <Input name="trailer" onChange={formik.handleChange} />
            </Form.Item>
          </div>
          <div className='form-flex-display'>
            <Form.Item label="Thời gian">
              <Input name="duration" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Quốc gia">
              <Input name="country" onChange={formik.handleChange} />
            </Form.Item>
          </div>
          <div className='form-flex-display'>
            <Form.Item label="Ngôn ngữ">
              <Input name="languague" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Thể loại">
              <Input name="genre" onChange={formik.handleChange} />
            </Form.Item>
          </div>
          <div className='form-flex-display'>
            <Form.Item label="Mô tả">
              <Input name="description" onChange={formik.handleChange} />
            </Form.Item>
          </div>
          <div className='form-flex-display'>
            <Form.Item label="Ngày khởi chiếu">
              <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
            </Form.Item>
            <Form.Item label="Đang chiếu" >
              <Switch onChange={handleChangeSwitch('nowShowing')} />
            </Form.Item>
          </div>
          <div className='form-flex-display'>
            <Form.Item label="Sắp chiếu">
              <Switch onChange={handleChangeSwitch('comingSoon')} />
            </Form.Item>
            <Form.Item label="Số sao">
              <InputNumber onChange={handleChangeInputNumber('rating')} min={1} max={10} />
            </Form.Item>
          </div>
          <Form.Item label="Hình ảnh">
            <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
  
          </Form.Item>
          <Form.Item >
            <button type="submit" className="btn-active-add-after">Thêm phim</button>
          </Form.Item>
        </Form>
      </>
    );
  };
  
  
  
  export default AddNew;