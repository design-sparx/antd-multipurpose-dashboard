import {Card as AntdCard, CardProps} from "antd";

import "./styles.css";
import {ReactNode} from "react";

type Props = { children: ReactNode } & CardProps

const Card = ({children, ...others}: Props) => {
    return (
        <AntdCard className="card" {...others}>{children}</AntdCard>
    );
};

export default Card;