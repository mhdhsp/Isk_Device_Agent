import React, { useEffect, useState } from "react";

import {
    Row,
    Col,
    Card,
    Statistic,
    Typography,
    Progress,
    Space,
} from "antd";

import {
    TeamOutlined,
    SafetyCertificateOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";

import userService from "../../services/userService";

const { Title } = Typography;

function Dashboard() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const data = await userService.getUsers();
            console.log("Dashboard - loadUsers data:", data);

            setUsers(data.Data || []);

        }
        catch (error) {

            console.error(
                "Failed to load dashboard users",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };

    const totalMembers = users.length;

    const gymMembers = users.filter(
        user => user.GymAccess
    ).length;

    const martialMembers = users.filter(
        user => user.MartialArtsAccess
    ).length;

    const expiredMembers = users.filter(
        user => user.GymStatus === "EXPIRED"
    ).length;

    if (loading) {

        return (
            <div>
                Loading dashboard...
            </div>
        );

    }

    return (

        <Space
            direction="vertical"
            size="large"
            style={{
                width: "100%"
            }}
        >

            <Title level={3}>
                Dashboard
            </Title>

            {/* SUMMARY CARDS */}

            <Row gutter={[16, 16]}>

                <Col xs={24} md={12} lg={6}>

                    <Card>

                        <Statistic
                            title="Total Members"
                            value={totalMembers}
                            prefix={<TeamOutlined />}
                        />

                    </Card>

                </Col>

                <Col xs={24} md={12} lg={6}>

                    <Card>

                        <Statistic
                            title="Gym Members"
                            value={gymMembers}
                            prefix={<TeamOutlined />}
                        />

                    </Card>

                </Col>

                <Col xs={24} md={12} lg={6}>

                    <Card>

                        <Statistic
                            title="Martial Members"
                            value={martialMembers}
                            prefix={<SafetyCertificateOutlined />}
                        />

                    </Card>

                </Col>

                <Col xs={24} md={12} lg={6}>

                    <Card>

                        <Statistic
                            title="Expired Memberships"
                            value={expiredMembers}
                            valueStyle={{
                                color: "#cf1322"
                            }}
                            prefix={<CloseCircleOutlined />}
                        />

                    </Card>

                </Col>

            </Row>

            {/* DEVICE + ACCESS */}

            <Row gutter={[16, 16]}>

                <Col xs={24} lg={12}>

                    <Card title="Device Status">

                        <Space
                            direction="vertical"
                            style={{
                                width: "100%"
                            }}
                        >

                            <div>

                                Gym Device

                                <Progress
                                    percent={100}
                                    status="success"
                                />

                            </div>

                            <div>

                                Martial Arts Device

                                <Progress
                                    percent={100}
                                    status="success"
                                />

                            </div>

                        </Space>

                    </Card>

                </Col>

                <Col xs={24} lg={12}>

                    <Card title="Today's Access">

                        <Row gutter={16}>

                            <Col span={12}>

                                <Statistic
                                    title="Allowed"
                                    value={users.filter(u => u.GymAccess || u.MartialArtsAccess).length}
                                    prefix={<CheckCircleOutlined />}
                                    valueStyle={{
                                        color: "#3f8600"
                                    }}
                                />

                            </Col>

                            <Col span={12}>

                                <Statistic
                                    title="Denied"
                                    value={0}
                                    prefix={<CloseCircleOutlined />}
                                    valueStyle={{
                                        color: "#cf1322"
                                    }}
                                />

                            </Col>

                        </Row>

                    </Card>

                </Col>

            </Row>

        </Space>

    );

}

export default Dashboard;