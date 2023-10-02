import {Employee} from "../../types";
import {Card as AntdCard, CardProps, Typography} from "antd";
import {Card} from "../index.ts";

const {Meta} = AntdCard

type Props = {
    data: Employee,
    showInfo?: boolean
} & CardProps

const EmployeeCard = ({data, showInfo, ...others}: Props) => {
    const {avatar, first_name, middle_name, last_name, role, age, country, title, email, hire_date} = data

    return (
        <Card
            hoverable
            cover={
                <img
                    alt={`${first_name} image`}
                    src={avatar}
                    height={240}
                    style={{objectFit: "cover"}}
                />
            }
            {...others}
        >
            <Meta title={`${title}. ${first_name} ${middle_name} ${last_name}`}/>
            <div style={{display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px"}}>
                <Typography.Text>Role: {role}</Typography.Text>
                {showInfo && (
                    <>
                        <Typography.Text>Email: {email}</Typography.Text>
                        <Typography.Text>Country: {country}</Typography.Text>
                        <Typography.Text>Age: {age}</Typography.Text>
                        <Typography.Text>Join date: {hire_date}</Typography.Text>
                    </>
                )}
            </div>
        </Card>
    );
};

export default EmployeeCard;