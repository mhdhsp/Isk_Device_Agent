import { Card, Statistic } from "antd";

function DashboardCard({
    title,
    value,
    icon,
    color = "#1677ff",
    suffix,
}) {
    return (
        <Card hoverable>
            <Statistic
                title={title}
                value={value}
                suffix={suffix}
                valueStyle={{
                    color,
                    fontWeight: "bold",
                }}
                prefix={icon}
            />
        </Card>
    );
}

export default DashboardCard;