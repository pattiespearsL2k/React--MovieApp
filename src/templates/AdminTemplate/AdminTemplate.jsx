import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logoM.png";
import "../../assets/style/admin.css";
import LogoutAdmin from "../../pages/logoutadmin/logoutAdmin";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = (props) => {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout className="admin" style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo">
                  <img
                    style={{ width: "40%", height: "80px" }}
                    src={logo}
                    alt="..."
                  />
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <Menu.SubMenu
                    key="1"
                    icon={<UserOutlined />}
                    title="Quản lý người dùng"
                  >
                    <Menu.Item key="21" icon={<UserOutlined />}>
                      <NavLink to="/admin">Người dùng</NavLink>
                    </Menu.Item>
                    <Menu.Item key="20" icon={<FileOutlined />}>
                      <NavLink to="/admin/adduser">Thêm người dùng</NavLink>
                    </Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu
                    key="sub1"
                    icon={<FileOutlined />}
                    title="Quản lý phim"
                  >
                    <Menu.Item key="10" icon={<FileOutlined />}>
                      <NavLink to="/admin/films">Phim</NavLink>
                    </Menu.Item>
                    <Menu.Item key="11" icon={<FileOutlined />}>
                      <NavLink to="/admin/films/addnew">Thêm phim</NavLink>
                    </Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu
                    key="sub1"
                    icon={<FileOutlined />}
                    title="Quản lý rạp"
                  >
                    <Menu.Item key="10" icon={<FileOutlined />}>
                      <NavLink to="/admin/cinema">Rạp</NavLink>
                    </Menu.Item>
                    <Menu.Item key="11" icon={<FileOutlined />}>
                      <NavLink to="/admin/cinema/addcinema">Thêm rạp</NavLink>
                    </Menu.Item>
                  </Menu.SubMenu>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  <div className="name-admin account navright">
                    <div className="name">
                      {!!userLogin.name ? <LogoutAdmin /> : <></>}
                    </div>
                  </div>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
                  <div>
                    <props.component {...propsRoute} />
                  </div>
                </Content>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};

export default AdminTemplate;
