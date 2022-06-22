
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { NavLink, Redirect } from 'react-router-dom'
import { history } from '../../../App';
import { layDanhSachNDAction, xoaNDAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import styled from 'styled-components';
import { message, Popconfirm } from 'antd';



const { Search } = Input;

export default function Dashboard(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { mangND } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layDanhSachNDAction());
    }, [])

    // if (userLogin.userId === 'KhachHang' && userLogin.maNhom !== 'GP03' || !(userLogin.userId)) {
    //     alert("Bạn không có quyền truy cập vào trang admin! Hãy đăng nhập băng tài khoản Admin thuộc nhóm GP03")
    //     history.push('/')
    // }

    //   if(!localStorage.getItem("LOGIN_USER")){
    //     alert('Bạn không có quyền  truy cập vào trang này!')
    //     return <Redirect to='/'/>
    //   };

    //   if(userLogin.role!== 'admin'){
    //     alert('Bạn không có quyền truy cập vào trang này!')
    //     return <Redirect to='/'/>
    //   }




    const columns = [
        {
            title: 'Tài Khoản',
            dataIndex: 'username',
            sorter: (a, b) => {
                let usernameA = a.username.toLowerCase().trim();
                let usernameB = b.username.toLowerCase().trim();
                if (usernameA > usernameB) {
                    return 1;
                }
                return -1
            },
            width: "15%"
        },
        {
            title: 'Họ Tên',
            dataIndex: 'name',
            sorter: (a, b) => {
                let nameA = a.name.toLowerCase().trim();
                let nameB = b.name.toLowerCase().trim();
                if (nameA > nameB) {
                    return 1;
                }
                return -1
            },
            width: "15%"
        },

        {
            title: 'Email',
            dataIndex: 'email',
            width: "15%"
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNumber',
            width: "15%"
        },
        // {
        //     title: 'Loại Người Dùng',
        //     dataIndex: 'roleId',
        //     width: "10%",
        //     sorter: (a, b) => {
        //         let loaiA = a.userId
        //         let loaiB = b.userId
        //         if (loaiA > loaiB) {
        //             return 1;
        //         }
        //         return -1
        //     },
        // },

        {
            title: 'Hành Động',
            dataIndex: 'username',

            render: (text, ND) => {
                const confirm = (e) => {
                    console.log(e);
                    dispatch(xoaNDAction(ND.username));
                };
                return (
                    <div className='parent-action' >
                        <NavLink className="action" to={`/admin/edituser/${ND.username}`} >
                            <EditOutlined />
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
                    </div>)
            },
            width: "15%"
        },

    ];

    const data = mangND
    console.log(data)

    const onSearch = (value) => {
        dispatch(layDanhSachNDAction(value))
    };

    return (
        <div>
            <h2>Quản Lý Người Dùng</h2>
            <button className='my-3 btn btn-primary' onClick={() => {
                history.push('/admin/adduser')
            }} >Thêm Người Dùng</button>
            <SearchStyled
                className='mb-4'
                placeholder="Search name..."
                size="large"
                enterButton={<SearchOutlined />}
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} rowKey={"userId"} />
        </div>
    )
}
// ant-input-group-addon
const SearchStyled = styled(Search)`
    .ant-input-group-addon{
    background-color: #007bff;
    }
`