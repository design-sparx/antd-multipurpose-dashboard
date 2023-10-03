import {Col, Row, RowProps, Space, Typography} from "antd";
import {Card, FaqCollapse} from "../../components";
import FaqsData from "../../mocks/Faqs.json";
import * as _ from "lodash";
import {useEffect, useState} from "react";
import {Faq} from "../../types";

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const CorporateFaqPage = () => {
    const [faqs, setFaqs] = useState<{ category: string, items: Faq[] }[]>([])

    useEffect(() => {
        const data = _.chain(FaqsData)
            .groupBy("category")
            .map((items, category) => {
                return {
                    category,
                    items: items
                        .slice(0, 4)
                        .map(i => ({
                            ...i,
                            label: i.question.slice(0, 50) + "...?",
                            children: i.answer
                        }))
                }
            })
            .orderBy("category")
            .value()

        setFaqs(data)
    }, [FaqsData]);

    return (
        <div>
            <Row {...ROW_PROPS}>
                <Col span={24}>
                    <Card title="Frequently askes questions (FAQs)">
                        <Space direction="vertical" size="middle" style={{width: "100%"}}>
                            {faqs.map(f => (
                                <>
                                    <Typography.Text
                                        strong
                                    >
                                        {f.category}
                                    </Typography.Text>
                                    <FaqCollapse
                                        items={f.items}
                                        accordion
                                    />
                                </>
                            ))}
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CorporateFaqPage;