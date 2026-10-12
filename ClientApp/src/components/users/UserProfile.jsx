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
    Input,
} from "antd";

import { UserOutlined } from "@ant-design/icons";

import { useState } from "react";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function formatDate(date) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
}

function YesNo(value) {
    return value
        ? <Tag color="green">YES</Tag>
        : <Tag color="red">NO</Tag>;
}

/**
 * Returns the 5th of the month that follows the given start date's month.
 * Examples:  Jan 3 → Feb 5,  Jan 20 → Feb 5,  Dec 10 → Jan 5 (next year)
 */
function nextFifth(startDate) {
    return dayjs(startDate).add(1, "month").date(5).startOf("day");
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
    onDeleteMartialUser,
}) {
    const navigate = useNavigate();

    const [enableModalOpen, setEnableModalOpen] = useState(false);
    const [enableDevice, setEnableDevice] = useState(1);
    const [gymDuration, setGymDuration] = useState(1);

    const [enableForm] = Form.useForm();

    // ── Gym: move end date forward by N months from start ───────────────────
    const updateGymEndDate = (months) => {
        const start = enableForm.getFieldValue("StartDate");
        if (!start) return;
        enableForm.setFieldsValue({
            EndDate: dayjs(start).add(months, "month"),
        });
    };

    // ── Martial: snap end date to the next 5th from start ───────────────────
    const updateMartialEndDate = (startDate) => {
        if (!startDate) return;
        enableForm.setFieldsValue({
            EndDate: nextFifth(startDate),
        });
    };

    const openEnableDialog = (device) => {
        setEnableDevice(device);
        setGymDuration(1);

        const defaultStart = dayjs();
        const defaultEnd = device === 1
            ? dayjs().add(1, "month")   // gym: 1 month forward
            : nextFifth(dayjs());       // martial: next 5th

        enableForm.setFieldsValue({
            StartDate: defaultStart,
            EndDate: defaultEnd,
        });

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
                {loading ? (

                    <Spin size="large" />

                ) : user && (

                    <Space direction="vertical" size="large" style={{ width: "100%" }}>

                        <Avatar size={90} icon={<UserOutlined />} />

                        <Divider orientation="left">Personal Information</Divider>

                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Full Name">{user.FullName}</Descriptions.Item>
                            <Descriptions.Item label="Date of Birth">{formatDate(user.DateOfBirth)}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{user.Gender || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Blood Group">{user.BloodGroup || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Weight">{user.Weight || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Height">{user.Height || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Occupation">{user.Occupation || "-"}</Descriptions.Item>
                        </Descriptions>

                        <Divider orientation="left">Contact Information</Divider>

                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Mobile">{user.MobileNumber}</Descriptions.Item>
                            <Descriptions.Item label="WhatsApp">{user.WhatsAppNumber}</Descriptions.Item>
                            <Descriptions.Item label="Email">{user.Email || "-"}</Descriptions.Item>
                        </Descriptions>

                        <Divider orientation="left">Address</Divider>

                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="House">{user.HouseName || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Place">{user.Place || "-"}</Descriptions.Item>
                            <Descriptions.Item label="District">{user.District || "-"}</Descriptions.Item>
                            <Descriptions.Item label="State">{user.State || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Country">{user.Country || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Pin Code">{user.PinCode || "-"}</Descriptions.Item>
                        </Descriptions>

                        <Divider orientation="left">Emergency Contact</Divider>

                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Contact Name">{user.EmergencyContactName || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Contact Number">{user.EmergencyContactNumber || "-"}</Descriptions.Item>
                        </Descriptions>

                        <Divider orientation="left">Membership</Divider>

                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Membership">{user.MembershipName || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Gym Access">{YesNo(user.GymAccess)}</Descriptions.Item>
                            <Descriptions.Item label="Martial Access">{YesNo(user.MartialArtsAccess)}</Descriptions.Item>
                            <Descriptions.Item label="Gym Status">{user.GymStatus || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Martial Status">{user.MartialStatus || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Gym Start">{formatDate(user.GymStartDate)}</Descriptions.Item>
                            <Descriptions.Item label="Gym End">{formatDate(user.GymEndDate)}</Descriptions.Item>
                            <Descriptions.Item label="Martial Start">{formatDate(user.MartialStartDate)}</Descriptions.Item>
                            <Descriptions.Item label="Martial End">{formatDate(user.MartialEndDate)}</Descriptions.Item>
                        </Descriptions>

                        <Divider orientation="left">Device Information</Divider>

                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Registered In Gym Device">{YesNo(user.RegisteredInGymDevice)}</Descriptions.Item>
                            <Descriptions.Item label="Gym Device User Id">{user.GymDeviceUserId || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Registered In Martial Device">{YesNo(user.RegisteredInMartialArtsDevice)}</Descriptions.Item>
                            <Descriptions.Item label="Martial Device User Id">{user.MartialArtsDeviceUserId || "-"}</Descriptions.Item>
                        </Descriptions>

                        <Divider orientation="left">Payment</Divider>

                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Joining Fee">₹{user.JoiningFee}</Descriptions.Item>
                            <Descriptions.Item label="Membership Fee">₹{user.MembershipFee}</Descriptions.Item>
                            <Descriptions.Item label="Discount">₹{user.Discount}</Descriptions.Item>
                            <Descriptions.Item label="Tax">₹{user.Tax}</Descriptions.Item>
                            <Descriptions.Item label="Total">₹{user.TotalAmount}</Descriptions.Item>
                            <Descriptions.Item label="Paid">₹{user.AmountPaid}</Descriptions.Item>
                            <Descriptions.Item label="Balance">₹{user.BalanceAmount}</Descriptions.Item>
                            <Descriptions.Item label="Payment Mode">{user.PaymentMode || "-"}</Descriptions.Item>
                            <Descriptions.Item label="Payment Date">{formatDate(user.PaymentDate)}</Descriptions.Item>
                        </Descriptions>

                        <Space wrap>

                            <Button
                                type="primary"
                                onClick={() => {
                                    onClose();
                                    navigate(`/users/${user.Id}/edit`);
                                }}
                            >
                                Edit Member
                            </Button>

                            <Button>Send Reminder</Button>

                            {/* ── Gym Enable / Restrict ── */}
                            {user.GymAccess === false ? (
                                <Button type="primary" onClick={() => openEnableDialog(1)}>
                                    Enable Gym Access
                                </Button>
                            ) : (
                                <Popconfirm
                                    title="Restrict Gym access?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => onBlockGym(user.Id)}
                                >
                                    <Button danger>Restrict Gym Access</Button>
                                </Popconfirm>
                            )}

                            {/* ── Martial Enable / Restrict ── */}
                            {user.MartialArtsAccess === false ? (
                                <Button type="primary" onClick={() => openEnableDialog(2)}>
                                    Enable Martial Access
                                </Button>
                            ) : (
                                <Popconfirm
                                    title="Restrict Martial access?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => onBlockMartial(user.Id)}
                                >
                                    <Button danger>Restrict Martial Access</Button>
                                </Popconfirm>
                            )}

                            {/* ── Delete from Gym Device ── */}
                            {user.RegisteredInGymDevice && (
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
                            )}

                            {/* ── Delete from Martial Device ── */}
                            {user.RegisteredInMartialArtsDevice && (
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
                            )}

                        </Space>

                    </Space>

                )}
            </Drawer>

            {/* ── Enable / Unblock modal ───────────────────────────────────── */}
            <Modal
                title={
                    enableDevice === 1
                        ? "Enable Gym Membership"
                        : "Enable Martial Membership"
                }
                open={enableModalOpen}
                destroyOnClose
                onCancel={() => {
                    enableForm.resetFields();
                    setGymDuration(1);
                    setEnableModalOpen(false);
                }}
                onOk={async () => {
                    const values = await enableForm.validateFields();

                    if (enableDevice === 1) {
                        onUnblockGym(user.Id, values.StartDate, values.EndDate);
                    } else {
                        onUnblockMartial(user.Id, values.StartDate, values.EndDate);
                    }

                    setEnableModalOpen(false);
                }}
            >
                <Form form={enableForm} layout="vertical">

                    <Row gutter={16}>

                        <Col span={12}>
                            <Form.Item
                                label="Membership Start"
                                name="StartDate"
                                rules={[{ required: true }]}
                            >
                                {/* Past dates are allowed — no disabledDate restriction */}
                                <DatePicker
                                    style={{ width: "100%" }}
                                    onChange={(date) => {
                                        if (enableDevice === 1) {
                                            // Gym: recalculate months-forward end date
                                            if (gymDuration !== "custom") {
                                                updateGymEndDate(gymDuration);
                                            }
                                        } else {
                                            // Martial: snap to next 5th
                                            updateMartialEndDate(date);
                                        }
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        {/* Gym: show duration radio buttons */}
                        {enableDevice === 1 && (
                            <Col span={12}>
                                <Form.Item label="Duration">
                                    <Radio.Group
                                        value={gymDuration}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setGymDuration(value);
                                            if (value !== "custom") {
                                                updateGymEndDate(value);
                                            }
                                        }}
                                    >
                                        <Radio value={1}>1 Month</Radio>
                                        <Radio value={2}>2 Months</Radio>
                                        <Radio value={3}>3 Months</Radio>
                                        <Radio value="custom">Custom</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        )}

                        {/* Martial: show informational label instead */}
                        {enableDevice === 2 && (
                            <Col span={12}>
                                <Form.Item label="End Date Rule">
                                    <Input
                                        disabled
                                        value="Expires on the 5th of next month"
                                        style={{ color: "#595959" }}
                                    />
                                </Form.Item>
                            </Col>
                        )}

                    </Row>

                    <Form.Item
                        label="Membership End"
                        name="EndDate"
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            // Gym custom: editable. Gym preset or martial: read-only.
                            disabled={enableDevice === 2 || gymDuration !== "custom"}
                            disabledDate={(current) => {
                                // Only apply a lower bound when gym is in custom mode
                                if (enableDevice === 1 && gymDuration === "custom") {
                                    const start = enableForm.getFieldValue("StartDate");
                                    if (start) {
                                        return current && current.isBefore(start, "day");
                                    }
                                }
                                return false;
                            }}
                        />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
}

export default UserProfileDrawer;
