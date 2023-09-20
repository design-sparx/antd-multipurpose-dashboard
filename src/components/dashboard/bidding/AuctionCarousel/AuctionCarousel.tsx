import {Badge, Button, Card, CardProps, Carousel, CarouselProps, Space, Tag, Typography} from "antd";
import {ClockCircleOutlined, EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import {Auction} from "../../../../types";

import "./styles.css";

type CardItemProps = {
    item: Auction
} & CardProps

const CardItem = ({item}: CardItemProps) => {
    const {
        auction_id,
        nft_name,
        nft_image,
        is_highest_bid_mine,
        winning_bid,
        status,
        time_left
    } = item;

    return (
        <Card
            cover={
                <div
                    className='auction-card-header'
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(75, 75, 75, .8) 0%, rgba(72, 85, 99, 0) 50%), url(${nft_image})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    <Badge
                        dot
                        status={status === "active" ? "success" : "error"}
                        text={status}
                        style={{color: 'white', fontWeight: 600, textTransform: 'capitalize', fontSize: 16}}
                    />
                    <Tag
                        icon={<ClockCircleOutlined/>}
                        color="#585858"
                    >
                        {time_left.split(' ')[0]} left
                    </Tag>
                </div>
            }
            actions={[
                <SettingOutlined key="setting"/>,
                <EditOutlined key="edit"/>,
                <EllipsisOutlined key="ellipsis"/>,
            ]}
            className="auction-card"
        >
            <Space direction="vertical">
                <Typography.Title
                    level={5}
                    style={{margin: 0}}
                >
                    {nft_name.split(' ')[0]} {nft_name.split(' ')[1]} #{auction_id.slice(0, 4)}
                </Typography.Title>
                <Space>
                    <Typography.Text>{is_highest_bid_mine ? 'Your Bid' : 'Highest Bid'}</Typography.Text>
                    <Typography.Text>${winning_bid}</Typography.Text>
                </Space>
                <Space>
                    <Button>Place Bid</Button>
                </Space>
            </Space>
        </Card>
    )
}

type Props = {
    data: Auction[]
}

const AuctionCarousel = ({data}: Props) => {
    const settings: CarouselProps = {
        autoplay: false,
        dots: true,
        dotPosition: 'bottom',
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        appendDots: dots => (
            <div
                style={{
                    backgroundColor: "black",
                    borderRadius: "10px",
                    padding: "10px"
                }}
            >
                <ul style={{margin: "0px"}}> {dots} </ul>
            </div>
        ),
    };

    return (
        <Carousel {...settings}>
            {data.map(_ => <CardItem key={_.auction_id} item={_}/>)}
        </Carousel>
    );
};

export default AuctionCarousel;