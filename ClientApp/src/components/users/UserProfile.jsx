import {
    Drawer,
    Descriptions,
    Avatar,
    Tag,
    Space,
    Button,
    Spin,
    Divider,
    Popconfirm,
    Modal,
    Form,
    DatePicker,
    Radio,
    Row,
    Col,
} from "antd";

import { UserOutlined } from "@ant-design/icons";

import { useState } from "react";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function formatDate(date) {

    if (!date)
        return "-";

    return new Date(date).toLocaleDateString();

}

function YesNo(value) {

    return value
        ? <Tag color="green">YES</Tag>
        : <Tag color="red">NO</Tag>;

}

function UserProfileDrawer({

    user,
    open,
    onClose,
    loading,
    onBlockGym,
    onBlockMartial,
    onUnblockGym,
    onUnblockMartial,
    onDeleteGymUser,
    onDeleteMartialUser

}) {
    const navigate = useNavigate();
    const [enableModalOpen, setEnableModalOpen] =
        useState(false);

    const [enableDevice, setEnableDevice] =
        useState(1);

    const [duration, setDuration] =
        useState(1);

    const [enableForm] = Form.useForm();

    const updateEndDate = (months) => {

        const start =
            enableForm.getFieldValue("StartDate");

        if (!start)
            return;

        enableForm.setFieldsValue({

            EndDate:
                dayjs(start).add(months, "month")

        });

    };

    const openEnableDialog = (device) => {
        console.log("openEnableDialog called with device:", device);
        setEnableDevice(device);
        console.log("Device set to:", device);
        setDuration(1);
        console.log("Duration set to 1 month");
        enableForm.setFieldsValue({

            StartDate: dayjs(),

            EndDate: dayjs().add(1, "month")

        });
        console.log("Form values set: StartDate =", dayjs(), ", EndDate =", dayjs().add(1, "month"));
        setEnableModalOpen(true);

    };



    return (
        <>

            <Drawer

                title="Member Profile"

                width={700}

                open={open}

                onClose={onClose}

            >

                {

                    loading

                        ?

                        <Spin size="large" />

                        :

                        user &&

                        <>

                            <Space
                                direction="vertical"
                                size="large"
                                style={{ width: "100%" }}
                            >

                                <Avatar
                                    size={90}
                                    icon={<UserOutlined />}
                                />

                                <Divider orientation="left">
                                    Personal Information
                                </Divider>

                                <Descriptions bordered column={1}>

                                    <Descriptions.Item label="Full Name">
                                        {user.FullName}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Date of Birth">
                                        {formatDate(user.DateOfBirth)}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Gender">
                                        {user.Gender || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Blood Group">
                                        {user.BloodGroup || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Weight">
                                        {user.Weight || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Height">
                                        {user.Height || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Occupation">
                                        {user.Occupation || "-"}
                                    </Descriptions.Item>

                                </Descriptions>

                                <Divider orientation="left">
                                    Contact Information
                                </Divider>

                                <Descriptions bordered column={1}>

                                    <Descriptions.Item label="Mobile">
                                        {user.MobileNumber}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="WhatsApp">
                                        {user.WhatsAppNumber}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Email">
                                        {user.Email || "-"}
                                    </Descriptions.Item>

                                </Descriptions>

                                <Divider orientation="left">
                                    Address
                                </Divider>

                                <Descriptions bordered column={1}>

                                    <Descriptions.Item label="House">
                                        {user.HouseName || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Place">
                                        {user.Place || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="District">
                                        {user.District || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="State">
                                        {user.State || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Country">
                                        {user.Country || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Pin Code">
                                        {user.PinCode || "-"}
                                    </Descriptions.Item>

                                </Descriptions>

                                <Divider orientation="left">
                                    Emergency Contact
                                </Divider>

                                <Descriptions bordered column={1}>

                                    <Descriptions.Item label="Contact Name">
                                        {user.EmergencyContactName || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Contact Number">
                                        {user.EmergencyContactNumber || "-"}
                                    </Descriptions.Item>

                                </Descriptions>

                                <Divider orientation="left">
                                    Membership
                                </Divider>

                                <Descriptions bordered column={1}>

                                    <Descriptions.Item label="Membership">
                                        {user.MembershipName || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Gym Access">
                                        {YesNo(user.GymAccess)}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Martial Access">
                                        {YesNo(user.MartialArtsAccess)}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Gym Status">
                                        {user.GymStatus || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Martial Status">
                                        {user.MartialStatus || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Gym Start">
                                        {formatDate(user.GymStartDate)}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Gym End">
                                        {formatDate(user.GymEndDate)}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Martial Start">
                                        {formatDate(user.MartialStartDate)}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Martial End">
                                        {formatDate(user.MartialEndDate)}
                                    </Descriptions.Item>

                                </Descriptions>

                                <Divider orientation="left">
                                    Device Information
                                </Divider>

                                <Descriptions bordered column={1}>

                                    <Descriptions.Item label="Registered In Gym Device">
                                        {YesNo(user.RegisteredInGymDevice)}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Gym Device User Id">
                                        {user.GymDeviceUserId || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Registered In Martial Device">
                                        {YesNo(user.RegisteredInMartialArtsDevice)}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Martial Device User Id">
                                        {user.MartialArtsDeviceUserId || "-"}
                                    </Descriptions.Item>

                                </Descriptions>

                                <Divider orientation="left">
                                    Payment
                                </Divider>

                                <Descriptions bordered column={1}>

                                    <Descriptions.Item label="Joining Fee">
                                        ₹{user.JoiningFee}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Membership Fee">
                                        ₹{user.MembershipFee}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Discount">
                                        ₹{user.Discount}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Tax">
                                        ₹{user.Tax}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Total">
                                        ₹{user.TotalAmount}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Paid">
                                        ₹{user.AmountPaid}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Balance">
                                        ₹{user.BalanceAmount}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Payment Mode">
                                        {user.PaymentMode || "-"}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Payment Date">
                                        {formatDate(user.PaymentDate)}
                                    </Descriptions.Item>

                                </Descriptions>

                                <Space wrap>

                                    <Button
                                        type="primary"
                                        onClick={() => {

                                            onClose();

                                            navigate(
                                                `/users/${user.Id}/edit`
                                            );

                                        }}
                                    >
                                        Edit Member
                                    </Button>

                                    <Button>
                                        Send Reminder
                                    </Button>

                                    {/* Gym Enable / Restrict */}

                                    {
                                        

                                            user.GymAccess == false

                                                ?

                                                <Button
                                                    type="primary"
                                                    onClick={() => openEnableDialog(1)}
                                                >
                                                    Enable Gym Access
                                                </Button>

                                                :

                                                <Popconfirm
                                                    title="Restrict Gym access?"
                                                    okText="Yes"
                                                    cancelText="No"
                                                    onConfirm={() => onBlockGym(user.Id)}
                                                >
                                                    <Button danger>
                                                        Restrict Gym Access
                                                    </Button>
                                                </Popconfirm>

                                        
                                    }

                                    {/* Martial Enable / Restrict */}

                                    {
                                         

                                            user.MartialArtsAccess == false

                                                ?

                                                <Button
                                                    type="primary"
                                                    onClick={() => openEnableDialog(2)}
                                                >
                                                    Enable Martial Access
                                                </Button>

                                                :

                                                <Popconfirm
                                                    title="Restrict Martial access?"
                                                    okText="Yes"
                                                    cancelText="No"
                                                    onConfirm={() => onBlockMartial(user.Id)}
                                                >
                                                    <Button danger>
                                                        Restrict Martial Access
                                                    </Button>
                                                </Popconfirm>

                                        
                                    }

                                    {/* Delete Gym */}

                                    {
                                        user.RegisteredInGymDevice && (

                                            <Popconfirm
                                                title="Delete this user from the Gym Device?"
                                                description="The user will be removed from the biometric device."
                                                okText="Delete"
                                                cancelText="Cancel"
                                                okButtonProps={{ danger: true }}
                                                onConfirm={() => onDeleteGymUser(user.Id)}
                                            >
                                                <Button danger type="primary">
                                                    Delete From Gym Device
                                                </Button>
                                            </Popconfirm>

                                        )
                                    }

                                    {/* Delete Martial */}

                                    {
                                        user.RegisteredInMartialArtsDevice && (

                                            <Popconfirm
                                                title="Delete this user from the Martial Device?"
                                                description="The user will be removed from the biometric device."
                                                okText="Delete"
                                                cancelText="Cancel"
                                                okButtonProps={{ danger: true }}
                                                onConfirm={() => onDeleteMartialUser(user.Id)}
                                            >
                                                <Button danger type="primary">
                                                    Delete From Martial Device
                                                </Button>
                                            </Popconfirm>

                                        )
                                    }

                                </Space>

                            </Space>

                        </>

                }

            </Drawer>

            <Modal
                title={
                    enableDevice === 1
                        ? "Enable Gym Membership"
                        : "Enable Martial Membership"
                }
                open={enableModalOpen}
                onCancel={() => {

                    enableForm.resetFields();

                    setDuration(1);

                    setEnableModalOpen(false);

                }}
                destroyOnClose
                onOk={async () => {

                    const values = await enableForm.validateFields();

                    if (enableDevice === 1) {
                        console.log("Enabling Gym Membership for user:", user.Id, "with start date:", values.StartDate, "and end date:", values.EndDate);
                        onUnblockGym(
                            user.Id,
                            values.StartDate,
                            values.EndDate,
                            1
                        );
                        console.log("UserProfileDrawer - unblockGym called with id:", user.Id, "startDate:", values.StartDate, "endDate:", values.EndDate, "device:", 1);
                    }
                    else {

                        onUnblockMartial(
                            user.Id,
                            values.StartDate,
                            values.EndDate,
                            2
                        );
                        console.log("UserProfileDrawer - unblockMartial called with id:", user.Id, "startDate:", values.StartDate, "endDate:", values.EndDate, "device:", 2);
                    }

                    setEnableModalOpen(false);

                }}
            >

                <Form
                    form={enableForm}
                    layout="vertical"
                >

                    <Row gutter={16}>

                        <Col span={12}>

                            <Form.Item
                                label="Membership Start"
                                name="StartDate"
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >

                                <DatePicker
                                    style={{
                                        width: "100%"
                                    }}
                                    disabledDate={(current) =>
                                        current &&
                                        current < dayjs().startOf("day")
                                    }
                                    onChange={() => {

                                        if (duration !== "custom") {

                                            updateEndDate(duration);

                                        }

                                    }}
                                />

                            </Form.Item>

                        </Col>

                        <Col span={12}>

                            <Form.Item label="Duration">

                                <Radio.Group
                                    value={duration}
                                    onChange={(e) => {

                                        const value = e.target.value;

                                        setDuration(value);

                                        if (value !== "custom") {

                                            updateEndDate(value);

                                        }

                                    }}
                                >

                                    <Radio value={1}>
                                        1 Month
                                    </Radio>

                                    <Radio value={2}>
                                        2 Months
                                    </Radio>

                                    <Radio value={3}>
                                        3 Months
                                    </Radio>

                                    <Radio value="custom">
                                        Custom
                                    </Radio>

                                </Radio.Group>

                            </Form.Item>

                        </Col>

                    </Row>

                    <Form.Item
                        label="Membership End"
                        name="EndDate"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >

                        <DatePicker
                            style={{
                                width: "100%"
                            }}
                            disabled={duration !== "custom"}
                            disabledDate={(current) => {

                                const start =
                                    enableForm.getFieldValue("StartDate");

                                if (!start)
                                    return false;

                                return current &&
                                    current.isBefore(start, "day");

                            }}
                        />

                    </Form.Item>

                </Form>

            </Modal>



        </>);
}

export default UserProfileDrawer;