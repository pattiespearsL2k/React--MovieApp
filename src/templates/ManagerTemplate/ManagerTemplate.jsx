import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
import logo from "../../assets/images/logoM.png"
import '../../assets/style/admin.css';
import LogoutAdmin from "../../pages/logoutadmin/logoutAdmin"
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const ManagerTemplate = (props) => { //path, exact, Component

    // const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };


    // if (!localStorage.getItem(USER_LOGIN)) {
    //     alert('Bạn không có quyền truy cập vào trang này !')
    //     return <Redirect to='/' />
    // }

    // if (userLogin.role !== 'admin') {
    //     alert('Bạn không có quyền truy cập vào trang này !')
    //     return <Redirect to='/' />

    // }

    // const operations = <Fragment>
    //     {!_.isEmpty(userLogin) ? <Fragment> <button onClick={() => {
    //         history.push('/profile')
    //     }}> <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-2xl ml-5 rounded-full bg-red-200">{userLogin.taiKhoan.substr(0, 1)}</div>Hello ! {userLogin.taiKhoan}</button> <button onClick={() => {
    //         localStorage.removeItem(USER_LOGIN);
    //         localStorage.removeItem(TOKEN);
    //         history.push('/home');
    //         window.location.reload();
    //     }} className="text-blue-800">Đăng xuất</button> </Fragment> : ''}
    // </Fragment>


    return (
        <Route
            exact path={props.path}
            render={(propsRoute) => { //props.location,props.history,props.match

                return (
                    <Fragment>
                        <Layout className="admin" style={{ minHeight: '100vh' }}>
                            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                                <div className="logo">
                                    <img style={{ width: '40%', height: '80px' }} src={logo} alt="..." />
                                </div>
                                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                    <Menu.SubMenu key='sub1' icon={<FileOutlined />} title='Films'>
                                        <Menu.Item key="10" icon={<FileOutlined />}>
                                            <NavLink to='/admin/films'>Films</NavLink>
                                        </Menu.Item>
                                    </Menu.SubMenu>

                                </Menu>
                            </Sider>
                            <Layout className="site-layout">
                                <Header className="site-layout-background" style={{ padding: 0 }} >
                                    <div className="name-admin account navright">
                                        <div class="name">
                                            {!!userLogin.name ?
                                                <LogoutAdmin /> :
                                                <></>
                                            }
                                        </div>
                                    </div>
                                </Header>
                                <Content style={{ margin: '0 16px' }}>
                                    <Breadcrumb style={{ margin: '16px 0' }}>
                                    </Breadcrumb>
                                    <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                                        <props.component {...propsRoute} />
                                    </div>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                            </Layout>
                        </Layout>
                    </Fragment>
                );
            }}
        />
    );
}


export default ManagerTemplate;