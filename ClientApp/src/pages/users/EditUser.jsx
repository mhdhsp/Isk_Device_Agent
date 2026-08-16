import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    message,
    Row,
    Select,
    Spin,
    Switch,
    Typography,
} from "antd";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import dayjs from "dayjs";

import userService from "../../services/userService";

const { Title } = Typography;

function EditUser() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);


    const gymRegistered =
        Form.useWatch(
            "RegisteredInGymDevice",
            form
        );


    const martialRegistered =
        Form.useWatch(
            "RegisteredInMartialArtsDevice",
            form
        );


    useEffect(() => {

        loadUser();

    }, [id]);


    const loadUser = async () => {

        try {

            setLoading(true);

            const user =
                await userService.getUserById(id);


            form.setFieldsValue({

                FullName:
                    user.FullName,

                HouseName:
                    user.HouseName,

                Place:
                    user.Place,

                District:
                    user.District,

                State:
                    user.State,

                Country:
                    user.Country,

                PinCode:
                    user.PinCode,

                Occupation:
                    user.Occupation,

                DateOfBirth:
                    user.DateOfBirth
                        ? dayjs(user.DateOfBirth)
                        : null,

                Gender:
                    user.Gender,

                BloodGroup:
                    user.BloodGroup,

                Weight:
                    user.Weight,

                Height:
                    user.Height,

                MobileNumber:
                    user.MobileNumber,

                WhatsAppNumber:
                    user.WhatsAppNumber,

                Email:
                    user.Email,

                EmergencyContactName:
                    user.EmergencyContactName,

                EmergencyContactNumber:
                    user.EmergencyContactNumber,

                Remarks:
                    user.Remarks,


                // ========================
                // DEVICE CONFIGURATION
                // ========================

                RegisteredInGymDevice:
                    user.RegisteredInGymDevice ?? false,

                GymDeviceUserId:
                    user.GymDeviceUserId,

                RegisteredInMartialArtsDevice:
                    user.RegisteredInMartialArtsDevice ?? false,

                MartialArtsDeviceUserId:
                    user.MartialArtsDeviceUserId,

            });

        }
        catch (error) {

            console.error(
                "Load user error:",
                error
            );

            message.error(
                "Unable to load member."
            );

        }
        finally {

            setLoading(false);

        }

    };


    const onFinish = async (values) => {

        try {

            setSaving(true);


            // ========================
            // VALIDATION
            // ========================

            if (
                values.RegisteredInGymDevice &&
                !values.GymDeviceUserId?.trim()
            ) {

                message.error(
                    "Gym Device User ID is required."
                );

                return;

            }


            if (
                values.RegisteredInMartialArtsDevice &&
                !values.MartialArtsDeviceUserId?.trim()
            ) {

                message.error(
                    "Martial Arts Device User ID is required."
                );

                return;

            }


            // ========================
            // REQUEST PAYLOAD
            // ========================

            const payload = {

                ...values,


                DateOfBirth:
                    values.DateOfBirth
                        ? values.DateOfBirth.format(
                            "YYYY-MM-DD"
                        )
                        : null,


                // If device switch is OFF,
                // remove old device id.

                GymDeviceUserId:
                    values.RegisteredInGymDevice
                        ? values.GymDeviceUserId?.trim()
                        : null,


                MartialArtsDeviceUserId:
                    values.RegisteredInMartialArtsDevice
                        ? values.MartialArtsDeviceUserId?.trim()
                        : null,

            };


            console.log(
                "Update Member Payload:",
                payload
            );


            const response =
                await userService.updateUser(
                    id,
                    payload
                );


            console.log(
                "Update Member Response:",
                response
            );


            if (!response?.Success) {

                message.error(
                    response?.Message ||
                    "Unable to update member."
                );

                return;

            }


            message.success(
                response.Message ||
                "Member updated successfully."
            );


            navigate("/users");

        }
        catch (error) {

            console.error(
                "Update member error:",
                error
            );

            message.error(
                "Unable to update member."
            );

        }
        finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 50,
                }}
            >
                <Spin size="large" />
            </div>
        );

    }


    return (

        <Card>

            <Title level={3}>
                Edit Member
            </Title>


            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >

                {/* ========================= */}
                {/* PERSONAL INFORMATION */}
                {/* ========================= */}

                <Row gutter={16}>

                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Full Name"
                            name="FullName"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Full name is required",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Mobile Number"
                            name="MobileNumber"
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="WhatsApp Number"
                            name="WhatsAppNumber"
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Email"
                            name="Email"
                            rules={[
                                {
                                    type: "email",
                                    message:
                                        "Enter a valid email address",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Date Of Birth"
                            name="DateOfBirth"
                        >
                            <DatePicker
                                style={{
                                    width: "100%"
                                }}
                            />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Gender"
                            name="Gender"
                        >
                            <Select
                                allowClear
                                options={[
                                    {
                                        label:
                                            "Male",
                                        value:
                                            "Male",
                                    },
                                    {
                                        label:
                                            "Female",
                                        value:
                                            "Female",
                                    },
                                    {
                                        label:
                                            "Other",
                                        value:
                                            "Other",
                                    },
                                ]}
                            />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Occupation"
                            name="Occupation"
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Blood Group"
                            name="BloodGroup"
                        >
                            <Select
                                allowClear
                                options={[
                                    {
                                        label: "A+",
                                        value: "A+",
                                    },
                                    {
                                        label: "A-",
                                        value: "A-",
                                    },
                                    {
                                        label: "B+",
                                        value: "B+",
                                    },
                                    {
                                        label: "B-",
                                        value: "B-",
                                    },
                                    {
                                        label: "AB+",
                                        value: "AB+",
                                    },
                                    {
                                        label: "AB-",
                                        value: "AB-",
                                    },
                                    {
                                        label: "O+",
                                        value: "O+",
                                    },
                                    {
                                        label: "O-",
                                        value: "O-",
                                    },
                                ]}
                            />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Weight"
                            name="Weight"
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Height"
                            name="Height"
                        >
                            <Input />
                        </Form.Item>

                    </Col>

                </Row>


                {/* ========================= */}
                {/* ADDRESS INFORMATION */}
                {/* ========================= */}

                <Title
                    level={5}
                    style={{
                        marginTop: 16
                    }}
                >
                    Address Information
                </Title>


                <Row gutter={16}>

                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="House Name"
                            name="HouseName"
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Place"
                            name="Place"
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="District"
                            name="District"
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="State"
                            name="State"
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Country"
                            name="Country"
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Pin Code"
                            name="PinCode"
                        >
                            <Input />
                        </Form.Item>

                    </Col>

                </Row>


                {/* ========================= */}
                {/* EMERGENCY CONTACT */}
                {/* ========================= */}

                <Title
                    level={5}
                    style={{
                        marginTop: 16
                    }}
                >
                    Emergency Contact
                </Title>


                <Row gutter={16}>

                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Emergency Contact Name"
                            name="EmergencyContactName"
                        >
                            <Input />
                        </Form.Item>

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Form.Item
                            label="Emergency Contact Number"
                            name="EmergencyContactNumber"
                        >
                            <Input />
                        </Form.Item>

                    </Col>

                </Row>


                {/* ========================= */}
                {/* REMARKS */}
                {/* ========================= */}

                <Form.Item
                    label="Remarks"
                    name="Remarks"
                >
                    <Input.TextArea
                        rows={3}
                    />
                </Form.Item>


                {/* ========================= */}
                {/* DEVICE CONFIGURATION */}
                {/* ========================= */}

                <Title
                    level={5}
                    style={{
                        marginTop: 24
                    }}
                >
                    Device Configuration
                </Title>


                {/* ========================= */}
                {/* GYM DEVICE */}
                {/* ========================= */}

                <Card
                    size="small"
                    title="Gym Device"
                    style={{
                        marginBottom: 16
                    }}
                >

                    <Form.Item
                        label="Registered in Gym Device"
                        name="RegisteredInGymDevice"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>


                    {gymRegistered && (

                        <Form.Item
                            label="Gym Device User ID"
                            name="GymDeviceUserId"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Gym Device User ID is required",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter Gym Device User ID"
                            />
                        </Form.Item>

                    )}

                </Card>


                {/* ========================= */}
                {/* MARTIAL DEVICE */}
                {/* ========================= */}

                <Card
                    size="small"
                    title="Martial Arts Device"
                    style={{
                        marginBottom: 24
                    }}
                >

                    <Form.Item
                        label="Registered in Martial Arts Device"
                        name="RegisteredInMartialArtsDevice"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>


                    {martialRegistered && (

                        <Form.Item
                            label="Martial Arts Device User ID"
                            name="MartialArtsDeviceUserId"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Martial Arts Device User ID is required",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter Martial Arts Device User ID"
                            />
                        </Form.Item>

                    )}

                </Card>


                {/* ========================= */}
                {/* ACTION BUTTONS */}
                {/* ========================= */}

                <div
                    style={{
                        display: "flex",
                        gap: 8,
                    }}
                >

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={saving}
                    >
                        Save Changes
                    </Button>


                    <Button
                        disabled={saving}
                        onClick={() =>
                            navigate("/users")
                        }
                    >
                        Cancel
                    </Button>

                </div>

            </Form>

        </Card>

    );

}

export default EditUser;