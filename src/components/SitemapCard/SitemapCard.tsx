import {Button, CardProps, List} from "antd";
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
        <Card title={data.title} className="sitemap-card card" {...others}>
            <List
                dataSource={data.links}
                bordered={false}
                renderItem={(item) => (
                    <List.Item key={`sitemap-${item.title}`}>
                        <Button
                            type="link"
                            href={item.path}
                            style={{textTransform: "capitalize", marginLeft: ".5rem"}}
                        >
                            {item.title}
                        </Button>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default SitemapCard;