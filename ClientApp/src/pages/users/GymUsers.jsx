import {
    Table,
    Tag,
    Typography,
    Button,
    Space,
    message,
} from "antd";

import {
    EyeOutlined,
} from "@ant-design/icons";

import {
    useEffect,
    useState,
} from "react";

import userService from "../../services/userService";
import UserProfileDrawer from "../../components/users/UserProfile";

const { Title } = Typography;

function GymUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            setLoading(true);

            const response = await userService.getUsers();

            const gymUsers = (response.Data || []).filter(
                user => user.RegisteredInGymDevice
            );

            setUsers(gymUsers);

        }
        catch (error) {

            console.error(error);
            message.error("Unable to load gym users.");

        }
        finally {

            setLoading(false);

        }

    };

    const viewUser = async (id) => {

        try {

            setDrawerOpen(true);
            setProfileLoading(true);

            const response =
                await userService.getUserById(id);

            setSelectedUser(response);

        }
        catch (error) {

            console.error(error);
            message.error("Unable to load user profile.");

        }
        finally {

            setProfileLoading(false);

        }

    };

    const blockGymUser = async (userId) => {

        try {

            const response =
                await userService.blockUser(userId, 1);

            if (response.Success) {

                message.success(response.Message);

                setDrawerOpen(false);
                setSelectedUser(null);

                await loadUsers();

            }
            else {

                message.error(response.Message);

            }

        }
        catch (error) {

            console.error(error);
            message.error("Unable to communicate with server.");

        }

    };

    // startDate and endDate come from the enable-modal inside UserProfileDrawer
    const unblockGymUser = async (userId, startDate, endDate) => {

        try {

            const response =
                await userService.unblockUser(userId, startDate, endDate, 1);

            if (response.Success) {

                message.success(response.Message);

                setDrawerOpen(false);
                setSelectedUser(null);

                await loadUsers();

            }
            else {

                message.error(response.Message);

            }

        }
        catch (error) {

            console.error(error);
            message.error("Unable to communicate with server.");

        }

    };

    const columns = [

        {
            title: "Name",
            dataIndex: "FullName",
        },

        {
            title: "Mobile",
            dataIndex: "MobileNumber",
        },

        {
            title: "Membership",
            dataIndex: "MembershipName",
            render: value => value || "-",
        },

        {
            title: "Gym Access",

            render: (_, record) =>

                record.GymAccess
                    ? <Tag color="green">YES</Tag>
                    : <Tag color="red">NO</Tag>

        },

        {
            title: "Gym Status",

            dataIndex: "GymStatus",

            render: value =>

                value
                    ? <Tag color="blue">{value}</Tag>
                    : "-"

        },

        {
            title: "Device",

            render: (_, record) =>

                record.RegisteredInGymDevice
                    ? <Tag color="green">Registered</Tag>
                    : <Tag color="red">Not Registered</Tag>

        },

        {
            title: "Device User ID",
            dataIndex: "GymDeviceUserId",

            render: value => value || "-",

        },

        {
            title: "Action",

            render: (_, record) => (

                <Space>

                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => viewUser(record.Id)}
                    >
                        View
                    </Button>

                </Space>

            )

        }

    ];

    return (

        <>

            <Space
                style={{
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}
            >

                <Title
                    level={3}
                    style={{
                        margin: 0,
                    }}
                >
                    Gym Members
                </Title>

            </Space>

            <Table
                rowKey="Id"
                loading={loading}
                columns={columns}
                dataSource={users}
            />

            <UserProfileDrawer
                user={selectedUser}
                open={drawerOpen}
                loading={profileLoading}
                onClose={() => {

                    setDrawerOpen(false);
                    setSelectedUser(null);

                }}
                onBlockGym={blockGymUser}
                onUnblockGym={unblockGymUser}

                // Martial actions not used on this page
                onBlockMartial={() => {}}
                onUnblockMartial={() => {}}
                onDeleteGymUser={() => {}}
                onDeleteMartialUser={() => {}}

                showGymActions={true}
                showMartialActions={false}
            />

        </>

    );

}

export default GymUsers;
