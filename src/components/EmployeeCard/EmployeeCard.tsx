import {Employee} from "../../types";
import {Card as AntdCard, CardProps} from "antd";
import {Card} from "../index.ts";

const {Meta} = AntdCard

type Props = {
    data: Employee
} & CardProps

const EmployeeCard = ({data, ...others}: Props) => {
    const {avatar, first_name, middle_name, last_name,  role} = data
    return (
        <Card
            hoverable
            cover={<img alt={`${first_name} image`} src={avatar} height={200} style={{objectFit: "cover"}}/>}
            {...others}
        >
            <Meta title={`${first_name} ${middle_name} ${last_name}`} description={role}/>
        </Card>
    );
};

export default EmployeeCard;