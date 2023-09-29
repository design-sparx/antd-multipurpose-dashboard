import {Image, Typography} from "antd";

type LogoProps = { color: "black" | "white" } & React.HTMLAttributes<HTMLDivElement>

const Logo = ({color, ...others}: LogoProps) => {
    return (
        <div {...others}>
            <Image src="/logo-no-background.png" alt="design sparx logo" height={48} preview={false}/>
            <Typography.Title level={4} type="secondary" style={{color, margin: 0}}>DesignSparx</Typography.Title>
        </div>
    );
};

export default Logo;