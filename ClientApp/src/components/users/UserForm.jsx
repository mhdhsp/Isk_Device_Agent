import {
    Form,
    Input,
    DatePicker,
    Select,
    Switch,
    Row,
    Col,
    Button,
} from "antd";

const { Option } = Select;

function UserForm({
    form,
    loading,
    onFinish,
    submitText = "Save",
}) {

    return (

        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >

            <Row gutter={16}>

                <Col span={12}>
                    <Form.Item
                        label="Full Name"
                        name="FullName"
                        rules={[
                            {
                                required: true,
                                message: "Please enter full name",
                            },
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
                        label="Date Of Birth"
                        name="DateOfBirth"
                    >
                        <DatePicker
                            style={{
                                width: "100%",
                            }}
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

                            <Option value="Other">
                                Other
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
                        label="Mobile Number"
                        name="MobileNumber"
                        rules={[
                            {
                                required: true,
                                message: "Mobile Number is required",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="WhatsApp Number"
                        name="WhatsAppNumber"
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Email"
                        name="Email"
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Emergency Contact Name"
                        name="EmergencyContactName"
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Emergency Contact Number"
                        name="EmergencyContactNumber"
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Gym Membership Start"
                        name="GymMembershipStartDate"
                    >
                        <DatePicker
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Gym Membership End"
                        name="GymMembershipEndDate"
                    >
                        <DatePicker
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Martial Membership Start"
                        name="MartialMembershipStartDate"
                    >
                        <DatePicker
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Martial Membership End"
                        name="MartialMembershipEndDate"
                    >
                        <DatePicker
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Gym Device User ID"
                        name="GymDeviceUserId"
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Martial Device User ID"
                        name="MartialArtsDeviceUserId"
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

                <Col span={6}>
                    <Form.Item
                        label="Gym Device"
                        name="RegisteredInGymDevice"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Martial Device"
                        name="RegisteredInMartialArtsDevice"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Col>

            </Row>

            <Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                >
                    {submitText}
                </Button>

            </Form.Item>

        </Form>

    );

}

export default UserForm;