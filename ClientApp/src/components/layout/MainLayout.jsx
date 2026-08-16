import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import AppSidebar from "./SideBar";
import AppHeader from "./Header";

const { Content } = Layout;

function MainLayout() {
    return (
        <Layout style={{ minHeight: "100vh" }}>

            {/* Left Sidebar */}
            <AppSidebar />

            <Layout>

                {/* Top Header */}
                <AppHeader />

                {/* Main Content */}
                <Content
                    style={{
                        margin: 24,
                        padding: 24,
                        background: "#ffffff",
                        borderRadius: 10,
                        overflow: "auto"
                    }}
                >
                    <Outlet />
                </Content>

            </Layout>

        </Layout>
    );
}

export default MainLayout;