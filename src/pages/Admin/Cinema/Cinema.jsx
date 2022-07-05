import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Table } from 'antd';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { layDanhSachHeThongRapAction } from '../../../redux/actions/QuanLyRapActions';
const { Search } = Input;


export default function Cinema() {

    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();

    console.log('hethongrap', heThongRapChieu);

    useEffect(() => {
        dispatch(layDanhSachHeThongRapAction());

    }, [])

    const columns = [
        {
            title: 'Tên rạp',
            dataIndex: 'cinemaID',
            sorter: (a, b) => a.cinemaID - b.cinemaID,
            sortDirections: ['descend', 'ascend'],
            width: '30%'

        },
        {
            title: 'Hình ảnh',
            dataIndex: 'logo',
            render: (text, cinema, index) => {
                return <Fragment>
                    <img src={cinema.logo} alt={cinema.cinemaID} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
                </Fragment>
            },
            width: '30%'
        },

        {
            title: 'Hành động',
            dataIndex: 'cinemaID',
            render: (text, cinema) => {
                const confirm = (e) => {
                    console.log(e);
                    // dispatch(xoaPhimAction(cinema.cinemaID));
                };
                return <div className="parent-action">
                    <NavLink key={1} className="action" to={`/admin/cinema/edit/${cinema.cinemaID}`}>
                        <EditOutlined style={{ color: 'blue' }} />
                        <p>Sửa</p>
                    </NavLink>
                    <Popconfirm
                        className='action'
                        title="Bạn có chắc chắn xoá không?"
                        onConfirm={confirm}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <DeleteOutlined style={{ color: 'red' }} />
                        <p>Xóa</p>
                    </Popconfirm>

                </div>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
    ];
const data = heThongRapChieu;
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <h3 className="text-4xl">Quản lý Rạp</h3>
            <Button className="mb-5 btn-add-cinema" onClick={() => {
                history.push('/admin/cinema/addnew');
            }}>Thêm rạp</Button>


            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"cinemaID"} />
        </div>
    )
}
