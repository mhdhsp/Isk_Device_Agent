import { Layout, Typography, Space, Avatar, Badge } from "antd";
import {
    BellOutlined,
    UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title, Text } = Typography;

function AppHeader() {
    return (
        <Header
            style={{
                background: "#fff",
                padding: "0 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
        >
            <Title
                level={4}
                style={{
                    margin: 0,
                }}
            >
                ISK Device Manager
            </Title>

            <Space size="large">
                <Badge count={3}>
                    <BellOutlined
                        style={{
                            fontSize: 20,
                            cursor: "pointer",
                        }}
                    />
                </Badge>

                <Space>
                    <Avatar
                        icon={<UserOutlined />}
                    />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            lineHeight: 1.2,
                        }}
                    >
                        <Text strong>Administrator</Text>
                        <Text type="secondary">
                            Super Admin
                        </Text>
                    </div>
                </Space>
            </Space>
        </Header>
    );
}

export default AppHeader;