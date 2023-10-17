import {Flex, FlexProps, Typography} from "antd";
import {Link} from "react-router-dom";

type LogoProps = {
    color: "black" | "white",
    imgSize?: {
        h?: number | string,
        w?: number | string
    }
    asLink?: boolean
    href?: string
} & Omit<FlexProps, "children">

const Logo = ({asLink, color, href, imgSize, ...others}: LogoProps) => {
    return (
        asLink ?
            <Link to={href || "#"}>
                <Flex gap={others.gap || "middle"} align="center" {...others}>
                    <img src="/logo-no-background.png" alt="design sparx logo" height={imgSize?.h || 48}/>
                    <Typography.Title level={5} type="secondary" style={{color, margin: 0}}>Design
                        Sparx</Typography.Title>
                </Flex>
            </Link> : <Flex gap={others.gap || "middle"} align="center" {...others}>
                <img src="/logo-no-background.png" alt="design sparx logo" height={imgSize?.h || 48}/>
                <Typography.Title level={5} type="secondary" style={{color, margin: 0}}>Design
                    Sparx</Typography.Title>
            </Flex>
    );
};

export default Logo;