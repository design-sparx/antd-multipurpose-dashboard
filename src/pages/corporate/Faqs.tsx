import { Alert, Col, Row, Space, Typography } from 'antd';
import { Card, FaqCollapse, Loader } from '../../components';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { Faq } from '../../types';
import { useStylesContext } from '../../context';
import { useFetchData } from '../../hooks';

export const CorporateFaqPage = () => {
  const {
    data: faqsData,
    loading: faqsDataLoading,
    error: faqsDataError,
  } = useFetchData('../mocks/Faqs.json');
  const [faqs, setFaqs] = useState<{ category: string; items: Faq[] }[]>([]);
  const stylesContext = useStylesContext();

  useEffect(() => {
    const data = _.chain(faqsData)
      .groupBy('category')
      .map((items, category) => {
        return {
          category,
          items: items.slice(0, 4).map((i) => ({
            ...i,
            label: i.question.slice(0, 50) + '...?',
            children: i.answer,
          })),
        };
      })
      .orderBy('category')
      .value();

    setFaqs(data);
  }, [faqsData]);

  return (
    <div>
      <Row {...stylesContext?.rowProps}>
        <Col span={24}>
          <Card title="Frequently askes questions (FAQs)">
            {faqsDataError ? (
              <Alert
                message="Error"
                description={faqsDataError.toString()}
                type="error"
                showIcon
              />
            ) : faqsDataLoading ? (
              <Loader />
            ) : (
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                {faqs.map((f) => (
                  <>
                    <Typography.Text strong>{f.category}</Typography.Text>
                    <FaqCollapse items={f.items} accordion />
                  </>
                ))}
              </Space>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
