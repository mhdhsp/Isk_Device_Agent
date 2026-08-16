import {
    Form,
    Input,
    Button,
    Row,
    Col,
    DatePicker,
    Select,
    Switch,
    Card,
    Typography,
    message,
    Radio
} from "antd";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";

import userService from "../../services/userService";

const { Title } = Typography;
const { Option } = Select;

function NewUser() {


    const [gymDuration, setGymDuration] = useState(1);
    const [martialDuration, setMartialDuration] = useState(1);
    const [form] = Form.useForm();
    const gymDeviceEnabled =
        Form.useWatch("RegisteredInGymDevice", form);

    const martialDeviceEnabled =
        Form.useWatch("RegisteredInMartialArtsDevice", form);
    const navigate = useNavigate();


    const updateGymEndDate = (months) => {

        const start =
            form.getFieldValue("GymMembershipStartDate");

        if (!start) return;

        form.setFieldValue(
            "GymMembershipEndDate",
            dayjs(start).add(months, "month")
        );

    };


    const updateMartialEndDate = (months) => {

        const start =
            form.getFieldValue("MartialMembershipStartDate");

        if (!start) return;

        form.setFieldValue(
            "MartialMembershipEndDate",
            dayjs(start).add(months, "month")
        );

    };
    const onFinish = async (values) => {


        try {

            const payload = {

                // Personal Information
                FullName: values.FullName,
                HouseName: values.HouseName,
                Place: values.Place,
                District: values.District,
                State: values.State,
                Country: values.Country,
                PinCode: values.PinCode,
                Occupation: values.Occupation,

                DateOfBirth: values.DateOfBirth
                    ? values.DateOfBirth.toISOString()
                    : null,

                Gender: values.Gender,
                BloodGroup: values.BloodGroup,
                Weight: values.Weight,
                Height: values.Height,

                // Contact Information
                MobileNumber: values.MobileNumber,
                WhatsAppNumber: values.WhatsAppNumber,
                Email: values.Email,
                EmergencyContactName: values.EmergencyContactName,
                EmergencyContactNumber: values.EmergencyContactNumber,

                // Device
                IsEnabled: values.IsEnabled ?? false,
                HasFaceTemplate: values.HasFaceTemplate ?? false,

                RegisteredInGymDevice:
                    values.RegisteredInGymDevice ?? false,

                RegisteredInMartialArtsDevice:
                    values.RegisteredInMartialArtsDevice ?? false,

                GymDeviceUserId: values.GymDeviceUserId,
                MartialArtsDeviceUserId: values.MartialArtsDeviceUserId,

                // Notes
                Remarks: values.Remarks,

                // Membership
                Membership: {

                    MembershipName: "hard coded",

                    // Gym Membership
                    GymMembershipStartDate:
                        values.GymMembershipStartDate
                            ? values.GymMembershipStartDate.toISOString()
                            : null,

                    GymMembershipEndDate:
                        values.GymMembershipEndDate
                            ? values.GymMembershipEndDate.toISOString()
                            : null,

                    GymStatus: values.GymStatus || "ACTIVE",
                    GymAccess: values.GymAccess ?? false,

                    // Martial Membership
                    MartialMembershipStartDate:
                        values.MartialMembershipStartDate
                            ? values.MartialMembershipStartDate.toISOString()
                            : null,

                    MartialMembershipEndDate:
                        values.MartialMembershipEndDate
                            ? values.MartialMembershipEndDate.toISOString()
                            : null,

                    MartialStatus: values.MartialStatus || "ACTIVE",
                    MartialArtsAccess:
                        values.MartialArtsAccess ?? false,

                    // Pricing
                    JoiningFee: Number(values.JoiningFee || 0),
                    MembershipFee: Number(values.MembershipFee || 0),
                    Discount: Number(values.Discount || 0),
                    Tax: Number(values.Tax || 0),

                    TotalAmount: Number(values.TotalAmount || 0),
                    AmountPaid: Number(values.AmountPaid || 0),
                    BalanceAmount: Number(values.BalanceAmount || 0),

                    // Payment
                    PaymentMode: values.PaymentMode,
                    TransactionReference: values.TransactionReference,

                    PaymentDate:
                        values.PaymentDate
                            ? values.PaymentDate.toISOString()
                            : null,

                    // Reminder Settings
                    WhatsAppReminder:
                        values.WhatsAppReminder ?? true,

                    EmailReminder:
                        values.EmailReminder ?? false,

                    ReminderDaysBefore:
                        Number(values.ReminderDaysBefore || 7),

                    // Remarks
                    Remarks: values.Remarks
                }
            };

            console.log("Payload", payload);

            await userService.createUser(payload);

            message.success("User created successfully");

            navigate("/users");

        }
        catch (error) {

            console.error(error);

            message.error("Failed to create user.");

        }
    };

    return (

        <Card>

            <Title level={3}>
                New Member
            </Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    Country: "India",
                    State: "Kerala",
                    IsEnabled: true,
                    HasFaceTemplate: false,
                    RegisteredInGymDevice: false,
                    RegisteredInMartialArtsDevice: false,
                    GymMembershipStartDate: dayjs(),
                    MartialMembershipStartDate: dayjs(),
                }}
            >

                <Row gutter={16}>

                    <Col span={12}>
                        <Form.Item
                            label="Full Name"
                            name="FullName"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter Full Name"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Occupation"
                            name="Occupation"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="House Name"
                            name="HouseName"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Place"
                            name="Place"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="District"
                            name="District"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="State"
                            name="State"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Country"
                            name="Country"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Pin Code"
                            name="PinCode"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Date of Birth"
                            name="DateOfBirth"
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Gender"
                            name="Gender"
                        >
                            <Select>

                                <Option value="Male">
                                    Male
                                </Option>

                                <Option value="Female">
                                    Female
                                </Option>

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Blood Group"
                            name="BloodGroup"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Height"
                            name="Height"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Weight"
                            name="Weight"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Mobile"
                            name="MobileNumber"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="WhatsApp"
                            name="WhatsAppNumber"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item
                            label="Email"
                            name="Email"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Emergency Contact"
                            name="EmergencyContactName"
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Emergency Number"
                            name="EmergencyContactNumber"
                        >
                            <Input />
                        </Form.Item>
                    </Col>



                    <Col span={24}>
                        <Form.Item
                            label="Remarks"
                            name="Remarks"
                        >
                            <Input.TextArea
                                rows={4}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Enabled"
                            name="IsEnabled"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Face Template"
                            name="HasFaceTemplate"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Card
                            title="Gym Device Registration"
                            size="small"
                            style={{ marginBottom: 24 }}
                        >

                            <Form.Item
                                label="Register In Gym Device"
                                name="RegisteredInGymDevice"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>

                            {gymDeviceEnabled && (
                                <>

                                    <Row gutter={16}>

                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Gym Device User ID"
                                                name="GymDeviceUserId"
                                            >
                                                <Input placeholder="Enter Device User ID" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Membership Start"
                                                name="GymMembershipStartDate"
                                            >
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    onChange={() => {

                                                        if (gymDuration !== "custom") {
                                                            updateGymEndDate(gymDuration);
                                                        }

                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={16}>

                                        <Col xs={24} md={12}>
                                            <Form.Item label="Duration">

                                                <Radio.Group
                                                    value={gymDuration}
                                                    buttonStyle="solid"
                                                    onChange={(e) => {

                                                        const value = e.target.value;

                                                        setGymDuration(value);

                                                        if (value !== "custom") {
                                                            updateGymEndDate(value);
                                                        }

                                                    }}
                                                >

                                                    <Radio.Button value={1}>
                                                        1 Month
                                                    </Radio.Button>

                                                    <Radio.Button value={2}>
                                                        2 Months
                                                    </Radio.Button>

                                                    <Radio.Button value={3}>
                                                        3 Months
                                                    </Radio.Button>

                                                    <Radio.Button value="custom">
                                                        Custom
                                                    </Radio.Button>

                                                </Radio.Group>

                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Membership End"
                                                name="GymMembershipEndDate"
                                            >
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    disabled={gymDuration !== "custom"}
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                </>
                            )}

                        </Card>
                    </Col>


                    <Col span={24}>
                        <Card
                            title="Martial Arts Device Registration"
                            size="small"
                        >

                            <Form.Item
                                label="Register In Martial Device"
                                name="RegisteredInMartialArtsDevice"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>

                            {martialDeviceEnabled && (
                                <>

                                    <Row gutter={16}>

                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Martial Device User ID"
                                                name="MartialArtsDeviceUserId"
                                            >
                                                <Input placeholder="Enter Device User ID" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Membership Start"
                                                name="MartialMembershipStartDate"
                                            >
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    onChange={() => {

                                                        if (martialDuration !== "custom") {
                                                            updateMartialEndDate(martialDuration);
                                                        }

                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={16}>

                                        <Col xs={24} md={12}>
                                            <Form.Item label="Duration">

                                                <Radio.Group
                                                    value={martialDuration}
                                                    buttonStyle="solid"
                                                    onChange={(e) => {

                                                        const value = e.target.value;

                                                        setMartialDuration(value);

                                                        if (value !== "custom") {
                                                            updateMartialEndDate(value);
                                                        }

                                                    }}
                                                >

                                                    <Radio.Button value={1}>
                                                        1 Month
                                                    </Radio.Button>

                                                    <Radio.Button value={2}>
                                                        2 Months
                                                    </Radio.Button>

                                                    <Radio.Button value={3}>
                                                        3 Months
                                                    </Radio.Button>

                                                    <Radio.Button value="custom">
                                                        Custom
                                                    </Radio.Button>

                                                </Radio.Group>

                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Membership End"
                                                name="MartialMembershipEndDate"
                                            >
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    disabled={martialDuration !== "custom"}
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                </>
                            )}

                        </Card>
                    </Col>

                </Row>

                <Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Create Member
                    </Button>

                </Form.Item>

            </Form>

        </Card>

    );

}

export default NewUser;