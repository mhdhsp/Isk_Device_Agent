import { Layout, Menu } from "antd";
import {
    DashboardOutlined,
    TeamOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    CreditCardOutlined,
    CalendarOutlined,
    DollarOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: "/dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
        },
         {
        key: "/users",
        icon: <UserOutlined />,
        label: "All Members",
          },
        {
            key: "/gym",
            icon: <TeamOutlined />,
            label: "Gym Members",
        },
        {
            key: "/martial",
            icon: <SafetyCertificateOutlined />,
            label: "Martial Arts Members",
        },
        {
            key: "/memberships",
            icon: <CreditCardOutlined />,
            label: "Memberships",
        },
        {
            key: "/attendance",
            icon: <CalendarOutlined />,
            label: "Attendance",
        },
        {
            key: "/payments",
            icon: <DollarOutlined />,
            label: "Payments",
        },
        {
            key: "/settings",
            icon: <SettingOutlined />,
            label: "Settings",
        },
    ];

    return (
        <Sider
            collapsible
            width={240}
            theme="dark"
        >
            <div
                style={{
                    height: 64,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                }}
            >
                ISK Manager
            </div>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
            />
        </Sider>
    );
}

export default Sidebar;