import {Button, CardProps, Flex, Typography} from "antd";
import {Card} from "../index.ts";

import "./styles.css"

type Props = {
    data: {
        title: string,
        links: { title: string, path: string }[]
    }
} & CardProps

const SitemapCard = ({data, ...others}: Props) => {
    return (
        <Card {...others}>
            <Flex vertical gap="middle">
                <Typography.Title level={5} style={{margin: 0, textTransform: "capitalize"}}>
                    {data.title}
                </Typography.Title>
                <Flex gap="small" wrap="wrap">
                    {data.links.map(d =>
                        <Button
                            key={d.title}
                            type="link"
                            href={d.path}
                            style={{textTransform: "capitalize"}}
                        >
                            {d.title}
                        </Button>)}
                </Flex>
            </Flex>
        </Card>
    );
};

export default SitemapCard;