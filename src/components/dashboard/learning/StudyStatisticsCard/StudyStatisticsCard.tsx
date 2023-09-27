import {CardProps} from "antd";
import {Heatmap} from "@ant-design/plots";
import {useEffect, useState} from "react";
import * as _ from "lodash";
import {Card} from "../../../index.ts";

type StudyStatistics = {
    id: string
    value: number
    category: string
    month: string
    total?: number
}

type ColumnChartProps = { data: StudyStatistics[] }

const ColumnChart = ({data}: ColumnChartProps) => {
    const [refinedData, setRefinedData] = useState<StudyStatistics[]>([])

    useEffect(() => {
        const formattedData = _.sortBy(data, (item) => {
            // Map the month names to their corresponding numerical values for sorting
            const monthMap: { [key: string]: number } = {
                Jan: 1,
                Feb: 2,
                Mar: 3,
                Apr: 4,
                May: 5,
                Jun: 6,
                Jul: 7,
                Aug: 8,
                Sept: 9,
                Oct: 10,
                Nov: 11,
                Dec: 12,
            };
            // Use the numerical value for sorting
            return monthMap[item.month];
        })
        setRefinedData(formattedData)
    }, [data]);

    const config = {
        width: 650,
        height: 500,
        autoFit: false,
        data: refinedData,
        xField: 'month',
        yField: 'category',
        colorField: 'value',
        // color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
        meta: {
            'Month of Year': {
                type: 'cat',
            },
        },
    };

    // @ts-ignore
    return <Heatmap {...config} />;
};

type Props = {
    data: StudyStatistics[]
} & CardProps

const StudyStatisticsCard = ({data, ...others}: Props) => {
    return (
        <Card
            title="Study statistics"
            {...others}
        >
            <ColumnChart data={data}/>
        </Card>
    );
};

export default StudyStatisticsCard;