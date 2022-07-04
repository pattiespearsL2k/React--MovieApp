import {
  DatePicker, Form,
  Input, InputNumber,
  Switch
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../redux/actions/QuanLyPhimActions';

const Edit = (props) => {

  const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhimAction(id));


  }, [])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      movieId: thongTinPhim.movieId,
      nowShowing: thongTinPhim.nowShowing,
      comingSoon: thongTinPhim.comingSoon,
      rating: thongTinPhim.rating,
      title: thongTinPhim.title,
      trailer: thongTinPhim.trailer,
      description: thongTinPhim.description,
      releaseDate: thongTinPhim.releaseDate,
      image: null,
      duration: thongTinPhim.duration,
      languague: thongTinPhim.languague,
      country: thongTinPhim.country,
      genre: thongTinPhim.genre
    },

    onSubmit: (values) => {
      console.log('values', values);
      values.releaseDate = moment(values.releaseDate).format('DD/MM/YYYY');
      // values.maNhom = GROUPID;
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'image') {
          formData.append(key, values[key]);
        } else {
          if (values.image !== null) {
            formData.append('File', values.image, values.image.name);
          }
        }
      }
      //Cập nhật phim upload hình
      dispatch(capNhatPhimUploadAction(formData));

    }
  })
  // const [value, setValue] = useState(1);

  // const onChange = (e) => {
  //   console.log('radio checked', e.target.value);
  //   setValue(e.target.value);
  // };

 
  const handleChangeDatePicker = (value) => {
    let releaseDate = value;
    formik.setFieldValue('releaseDate', releaseDate);
    console.log(releaseDate)

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

  const handleChangeFile = async (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
      //Đem dữ liệu file lưu vào formik
      await formik.setFieldValue('image', file);
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);//Hình base 64
      }

    }
  }


  return (
    <>
      <Form className='addnew'
        onSubmitCapture={formik.handleSubmit}
        layout="horizontal"
      >
        <h3>Cập nhật phim </h3>
        <div className="form-flex-display">
          <Form.Item label="Tên phim">
            <Input name="title" onChange={formik.handleChange} value={formik.values.title} />
          </Form.Item>
          <Form.Item label="Trailer">
            <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
          </Form.Item>
        </div>
        <div className='form-flex-display'>
          <Form.Item label="Thời gian">
            <Input name="duration" onChange={formik.handleChange} value={formik.values.duration} />
          </Form.Item>
          <Form.Item label="Quốc gia">
            <Input name="country" onChange={formik.handleChange} value={formik.values.country} />
          </Form.Item>
        </div>
        <div className='form-flex-display'>
          <Form.Item label="Ngôn ngữ">
            <Input name="languague" onChange={formik.handleChange} value={formik.values.languague} />
          </Form.Item>
          <Form.Item label="Thể loại">
            <Input name="genre" onChange={formik.handleChange} value={formik.values.genre} />
          </Form.Item>
        </div>
        <div className='form-flex-display'>
          <Form.Item label="Mô tả">
            <Input name="description" onChange={formik.handleChange} value={formik.values.description} />
          </Form.Item>
        </div>
        <div className='form-flex-display'>
          <Form.Item label="Ngày khởi chiếu">
            <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} value={moment(formik.values.releaseDate)} />
          </Form.Item>
          <Form.Item label="Đang chiếu" >
            <Switch onChange={handleChangeSwitch('nowShowing')} checked={formik.values.nowShowing} />
          </Form.Item>
        </div>
        <div className='form-flex-display'>
          <Form.Item label="Sắp chiếu">
            <Switch onChange={handleChangeSwitch('comingSoon')} checked={formik.values.comingSoon} disabled={formik.values.nowShowing}/>
          </Form.Item>
          <Form.Item label="Số sao">
            <InputNumber onChange={handleChangeInputNumber('rating')} min={1} max={10} value={formik.values.rating} />
          </Form.Item>
        </div>
        <Form.Item label="Hình ảnh">
          <input name="image" type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
          <br />
          <img width={50} height={50} src={imgSrc === '' ? thongTinPhim.image : imgSrc} />
        </Form.Item>
        <Form.Item>
          <button type="submit" className="btn-active-add-after">Cập nhật</button>
        </Form.Item>
      </Form>

    </>
  );
};



export default Edit;



