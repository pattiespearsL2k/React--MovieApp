import React, { Fragment, useEffect } from 'react'
import { Button, Table } from 'antd';

import { Input, Space } from 'antd';
import { AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { message, Popconfirm } from 'antd';
const { Search } = Input;




export default function Films() {

    const { arf } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();

    console.log('arf', arf);

    useEffect(() => {
        dispatch(layDanhSachPhimAction());

    }, [])

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'movieId',
            sorter: (a, b) => a.movieId - b.movieId,
            sortDirections: ['descend', 'ascend'],
            width: '10%'

        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            render: (text, film, index) => {
                return <Fragment>
                    <img src={film.image} alt={film.title} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
                </Fragment>
            },
            width: '15%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'title',
            sorter: (a, b) => {
                let titleA = a.title.toLowerCase().trim();
                let titleB = b.title.toLowerCase().trim();
                if (titleA > titleB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            render: (text, film) => {
                return <Fragment>
                    {film.description.length > 50 ? film.description.substr(0, 50) + ' ...' : film.description}
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
        {
            title: 'Hành động',
            dataIndex: 'movieId',
            render: (text, film) => {
                const confirm = (e) => {
                    console.log(e);
                    dispatch(xoaPhimAction(film.movieId));
                };
                return <div className="parent-action">
                    <NavLink key={1} className="action" to={`/admin/films/edit/${film.movieId}`}>
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

                    <NavLink key={1} className="action" to={`/admin/films/showtime/${film.movieId}/${film.title}`} onClick={() => {
                        localStorage.setItem('filmParams', JSON.stringify(film));
                    }}>
                        <CalendarOutlined style={{ color: 'green' }} />
                        <p>Tạo lịch chiếu</p>
                    </NavLink>
                    <NavLink key={1} className="action" to={`/admin/films/showtime/${film.movieId}`}>
                        <CalendarOutlined style={{ color: 'green' }} />
                        <p>Xem lịch chiếu</p>
                    </NavLink>
                </div>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
    ];
    const data = arf;



    const onSearch = value => {
        console.log(value);
        //Gọi api layDanhSachPhim
        dispatch(layDanhSachPhimAction(value));

    };

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <h3 className="text-4xl">Quản lý Phim</h3>
            <Button className="mb-5 btn-add-film" onClick={() => {
                history.push('/admin/films/addnew');
            }}>Thêm phim</Button>
            <Search
                className="mb-5"
                placeholder="Tìm phim"
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={onSearch}
            />

            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"movieId"} />
        </div>
    )
}
