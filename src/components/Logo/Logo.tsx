import {Typography} from "antd";
import {LayoutOutlined} from "@ant-design/icons";

type LogoProps = { color: "black" | "white" } & React.HTMLAttributes<HTMLDivElement>

const Logo = ({color, ...others}: LogoProps) => {
    return (
        <div {...others}>
            <LayoutOutlined style={{color}}/>
            <Typography.Title level={4} type="secondary" style={{color, margin: 0}}>DesignSparx</Typography.Title>
        </div>
    );
};

export default Logo;