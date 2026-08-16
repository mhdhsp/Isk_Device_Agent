import {
    Card,
    Row,
    Col,
    Typography,
    Tag,
    Statistic,
    Button,
    Space,
} from "antd";

import {
    CheckCircleFilled,
    CloseCircleFilled,
    TeamOutlined,
    UserSwitchOutlined,
    WifiOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

function DeviceSummaryCard({
    title,
    ipAddress,
    connected,
    totalUsers,
    activeUsers,
    restrictedUsers,
    attendanceLogs,
    onOpen,
    onSettings,
}) {
    return (
        <Card
            hoverable
            title={title}
            extra={
                connected ? (
                    <Tag
                        color="success"
                        icon={<CheckCircleFilled />}
                    >
                        ONLINE
                    </Tag>
                ) : (
                    <Tag
                        color="error"
                        icon={<CloseCircleFilled />}
                    >
                        OFFLINE
                    </Tag>
                )
            }
        >
            <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
            >
                <Row justify="space-between">
                    <Text strong>IP Address</Text>

                    <Text>{ipAddress}</Text>
                </Row>

                <Row justify="space-between">
                    <Text strong>Connection</Text>

                    <Text>
                        <WifiOutlined />{" "}
                        {connected
                            ? "Connected"
                            : "Disconnected"}
                    </Text>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic
                            title="Users"
                            value={totalUsers}
                            prefix={<TeamOutlined />}
                        />
                    </Col>

                    <Col span={12}>
                        <Statistic
                            title="Attendance"
                            value={attendanceLogs}
                        />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic
                            title="Active"
                            value={activeUsers}
                            valueStyle={{
                                color: "#52c41a",
                            }}
                        />
                    </Col>

                    <Col span={12}>
                        <Statistic
                            title="Restricted"
                            value={restrictedUsers}
                            valueStyle={{
                                color: "#ff4d4f",
                            }}
                        />
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col span={12}>
                        <Button
                            type="primary"
                            block
                            icon={<UserSwitchOutlined />}
                            onClick={onOpen}
                        >
                            Open Users
                        </Button>
                    </Col>

                    <Col span={12}>
                        <Button
                            block
                            icon={<SettingOutlined />}
                            onClick={onSettings}
                        >
                            Device Info
                        </Button>
                    </Col>
                </Row>
            </Space>
        </Card>
    );
}

export default DeviceSummaryCard;