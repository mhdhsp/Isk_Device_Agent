import {
    Table,
    Tag,
    Typography,
    Button,
    Space,
    message,
    Input,
    Select,
} from "antd";
import {
    EyeOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import {
    useEffect,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import userService from "../../services/userService";
import UserProfileDrawer from "../../components/users/UserProfile";

const { Title } = Typography;
function Users() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState([]);

    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [membershipFilter, setMembershipFilter] = useState("");
    const [deviceFilter, setDeviceFilter] = useState("");

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

            const data = response.Data || [];

            setUsers(data);
            setFilteredUsers(data);

        }
        catch (error) {

            console.error(error);
            message.error("Unable to load users.");

        }
        finally {

            setLoading(false);

        }

    };

    const applyFilters = (
        search = searchText,
        status = statusFilter,
        membership = membershipFilter,
        device = deviceFilter
    ) => {

        let data = [...users];

        if (search) {

            const value = search.toLowerCase();

            data = data.filter(user =>

                (user.FullName || "")
                    .toLowerCase()
                    .includes(value)

                ||

                (user.MobileNumber || "")
                    .includes(value)

                ||

                (user.GymDeviceUserId || "")
                    .toLowerCase()
                    .includes(value)

                ||

                (user.MartialArtsDeviceUserId || "")
                    .toLowerCase()
                    .includes(value)

            );

        }

        if (status) {

            data = data.filter(
                x => x.GymStatus === status
            );

        }

        if (membership) {

            data = data.filter(
                x => x.MembershipName === membership
            );

        }

        if (device === "REGISTERED") {

            data = data.filter(
                x => x.RegisteredInGymDevice || x.RegisteredInMartialArtsDevice
            );

        }

        if (device === "NOT_REGISTERED") {

            data = data.filter(
                x => !x.RegisteredInGymDevice && !x.RegisteredInMartialArtsDevice
            );

        }

        setFilteredUsers(data);

    };

    const resetFilters = () => {

        setSearchText("");
        setStatusFilter("");
        setMembershipFilter("");
        setDeviceFilter("");

        setFilteredUsers(users);

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

                loadUsers();

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

    const blockMartialUser = async (userId) => {

        try {

            const response =
                await userService.blockUser(userId, 2);

            if (response.Success) {

                message.success(response.Message);

                setDrawerOpen(false);
                setSelectedUser(null);

                loadUsers();

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

    const unblockGymUser = async (userId, startDate, endDate) => {

        try {
            console.log("unblockGymUser from users called with userId:", userId, "startDate:", startDate, "endDate:", endDate);
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

    const unblockMartialUser = async (userId, startDate, endDate) => {

        try {
            console.log("unblockMartialUser from users called with userId:", userId, "startDate:", startDate, "endDate:", endDate);
            const response =
                await userService.unblockUser(userId,startDate, endDate, 2);

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

    const deleteGymUser = async (userId) => {

        try {

            const response = await userService.deleteUserFromDevice(userId, 1);

            if (response.Success) {

                message.success(response.Message);

                setDrawerOpen(false);
                setSelectedUser(null);

                await loadUsers();

            } else {

                message.error(response.Message);

            }

        } catch (error) {

            console.error(error);
            message.error("Unable to communicate with server.");

        }

    };

    const deleteMartialUser = async (userId) => {

        try {

            const response = await userService.deleteUserFromDevice(userId, 2);

            if (response.Success) {

                message.success(response.Message);

                setDrawerOpen(false);
                setSelectedUser(null);

                await loadUsers();

            } else {

                message.error(response.Message);

            }

        } catch (error) {

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
            title: "Gym",

            render: (_, record) =>

                record.GymAccess
                    ? <Tag color="green">YES</Tag>
                    : <Tag color="red">NO</Tag>

        },

        {
            title: "Martial",

            render: (_, record) =>

                record.MartialArtsAccess
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
    const membershipOptions = [

        ...new Set(
            users
                .map(x => x.MembershipName)
                .filter(Boolean)
        )

    ];
    return (

        <>

            <Space
                direction="vertical"
                style={{
                    width: "100%",
                    marginBottom: 20,
                }}
            >

                <Space
                    style={{
                        width: "100%",
                        justifyContent: "space-between",
                    }}
                >

                    <Title
                        level={3}
                        style={{ margin: 0 }}
                    >
                        Members
                    </Title>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate("/users/new")}
                    >
                        New Member
                    </Button>

                </Space>

                <Space wrap>

                    <Input.Search
                        placeholder="Search Name / Mobile / Device ID"
                        allowClear
                        style={{ width: 280 }}
                        value={searchText}
                        onChange={(e) => {

                            setSearchText(e.target.value);

                            applyFilters(
                                e.target.value,
                                statusFilter,
                                membershipFilter,
                                deviceFilter
                            );

                        }}
                    />

                    <Select
                        placeholder="Gym Status"
                        allowClear
                        style={{ width: 170 }}
                        value={statusFilter || undefined}
                        onChange={(value) => {

                            setStatusFilter(value || "");

                            applyFilters(
                                searchText,
                                value || "",
                                membershipFilter,
                                deviceFilter
                            );

                        }}
                        options={[
                            {
                                label: "ACTIVE",
                                value: "ACTIVE"
                            },
                            {
                                label: "BLOCKED",
                                value: "BLOCKED"
                            }
                        ]}
                    />

                    <Select
                        placeholder="Membership"
                        allowClear
                        style={{ width: 180 }}
                        value={membershipFilter || undefined}
                        onChange={(value) => {

                            setMembershipFilter(value || "");

                            applyFilters(
                                searchText,
                                statusFilter,
                                value || "",
                                deviceFilter
                            );

                        }}
                        options={
                            membershipOptions.map(x => ({
                                label: x,
                                value: x
                            }))
                        }
                    />

                    <Select
                        placeholder="Device"
                        allowClear
                        style={{ width: 180 }}
                        value={deviceFilter || undefined}
                        onChange={(value) => {

                            setDeviceFilter(value || "");

                            applyFilters(
                                searchText,
                                statusFilter,
                                membershipFilter,
                                value || ""
                            );

                        }}
                        options={[
                            {
                                label: "Registered",
                                value: "REGISTERED"
                            },
                            {
                                label: "Not Registered",
                                value: "NOT_REGISTERED"
                            }
                        ]}
                    />

                    <Button onClick={resetFilters}>
                        Reset
                    </Button>

                </Space>

            </Space>

            <Table
                rowKey="Id"
                loading={loading}
                columns={columns}
                dataSource={filteredUsers}
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
                onBlockMartial={blockMartialUser}
                onUnblockGym={unblockGymUser}
                onUnblockMartial={unblockMartialUser}
                onDeleteGymUser={deleteGymUser}
                onDeleteMartialUser={deleteMartialUser}
            />

        </>

    );

}

export default Users;