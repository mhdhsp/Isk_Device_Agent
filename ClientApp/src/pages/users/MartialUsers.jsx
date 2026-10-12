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

function MartialUsers() {

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

            const martialUsers = (response.Data || []).filter(
                user => user.RegisteredInMartialArtsDevice
            );

            setUsers(martialUsers);

        }
        catch (error) {

            console.error(error);
            message.error("Unable to load martial arts users.");

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

    const blockMartialUser = async (userId) => {

        try {

            const response =
                await userService.blockUser(userId, 2);

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
    const unblockMartialUser = async (userId, startDate, endDate) => {

        try {

            const response =
                await userService.unblockUser(userId, startDate, endDate, 2);

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
            title: "Martial Access",

            render: (_, record) =>

                record.MartialArtsAccess
                    ? <Tag color="green">YES</Tag>
                    : <Tag color="red">NO</Tag>

        },

        {
            title: "Martial Status",

            dataIndex: "MartialStatus",

            render: value =>

                value
                    ? <Tag color="blue">{value}</Tag>
                    : "-"

        },

        {
            title: "Device",

            render: (_, record) =>

                record.RegisteredInMartialArtsDevice
                    ? <Tag color="green">Registered</Tag>
                    : <Tag color="red">Not Registered</Tag>

        },

        {
            title: "Device User ID",
            dataIndex: "MartialArtsDeviceUserId",

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
                    Martial Arts Members
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

                // Martial actions
                onBlockMartial={blockMartialUser}
                onUnblockMartial={unblockMartialUser}

                // Gym actions not used on this page
                onBlockGym={() => {}}
                onUnblockGym={() => {}}
                onDeleteGymUser={() => {}}
                onDeleteMartialUser={() => {}}

                showGymActions={false}
                showMartialActions={true}
            />

        </>

    );

}

export default MartialUsers;
