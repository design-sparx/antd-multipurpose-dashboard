import {Button, Card as AntdCard, CardProps, Carousel, CarouselProps, Space, Tag, Typography} from "antd";
import {RecommendedCourses} from "../../../../types";
import {useEffect, useRef, useState} from "react";
import {BookOutlined, ClockCircleOutlined, LockOutlined, TagFilled} from "@ant-design/icons";
import {Card} from "../../../index.ts";

type CardItemProps = {
    data: RecommendedCourses
} & CardProps

const CardItem = ({data}: CardItemProps) => {
    const [levelColor, setLevelColor] = useState<string>()
    const {duration, category, name, lessons, level} = data;

    useEffect(() => {
        switch (level) {
            case 'beginner':
                setLevelColor('geekblue');
                break;
            case 'intermediate':
                setLevelColor('magenta');
                break;
            case 'advanced':
                setLevelColor('volcano');
                break;
            case 'expert':
                setLevelColor('red');
                break;
            default:
                setLevelColor('warning');
                break;
        }
    }, [level]);

    return (
        <AntdCard
            style={{
                margin: `0 4px`
            }}
        >
            <Space direction="vertical" size="large" style={{width: '100%'}}>
                <Typography.Title
                    level={4}
                    style={{
                        margin: 0,
                        textTransform: 'capitalize'
                    }}
                >
                    {name.slice(0, 30)}...
                </Typography.Title>
                <Space size="small">
                    <Space size={4}>
                        <BookOutlined/>
                        <Typography.Text>{lessons} Lessons</Typography.Text>
                    </Space>
                    <Typography.Text>-</Typography.Text>
                    <Space size={4}>
                        <ClockCircleOutlined/>
                        <Typography.Text>{duration} Hours</Typography.Text>
                    </Space>
                </Space>
                <Space size="small">
                    <Tag icon={<TagFilled/>}>{category}</Tag>
                    <Tag bordered={true} color={levelColor} style={{textTransform: 'capitalize'}}>{level}</Tag>
                </Space>
                <Button icon={<LockOutlined/>}>Enroll Now</Button>
            </Space>
        </AntdCard>
    )
}

type Props = {
    data: RecommendedCourses[]
} & CardProps

const CoursesCarousel = ({data, ...others}: Props) => {
    const sliderRef = useRef<any>()

    const settings: CarouselProps = {
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handlePrevious = (): void => {
        sliderRef?.current?.prev()
    }

    const handleNext = (): void => {
        sliderRef?.current?.next()
    }

    return (
        <Card
            title="Recommended for you"
            extra={
                <Space>
                    <Button onClick={handlePrevious}>Previous</Button>
                    <Button onClick={handleNext}>Next</Button>
                </Space>
            }
            {...others}
        >
            <Carousel
                ref={sliderRef}
                {...settings}
            >
                {data.map(d => <CardItem key={d.id} data={d}/>)}
            </Carousel>
        </Card>
    );
};

export default CoursesCarousel;