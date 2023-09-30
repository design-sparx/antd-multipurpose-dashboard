import {Typography} from "antd";

type LogoProps = {
    color: "black" | "white",
    imgSize?: {
        h?: number | string,
        w?: number | string
    }
} & React.HTMLAttributes<HTMLDivElement>

const Logo = ({color, imgSize, ...others}: LogoProps) => {
    return (
        <div {...others}>
            <img src="/logo-no-background.png" alt="design sparx logo" height={imgSize?.h || 48}/>
            <Typography.Title level={4} type="secondary" style={{color, margin: 0}}>Design Sparx</Typography.Title>
        </div>
    );
};

export default Logo;