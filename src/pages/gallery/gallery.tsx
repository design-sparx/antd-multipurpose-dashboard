import { Typography } from 'antd';
import Masonry from 'antd/es/masonry';
import { Helmet } from 'react-helmet-async';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1510001618818-4b4e3d86bf0f',
  'https://images.unsplash.com/photo-1507513319174-e556268bb244',
  'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2',
  'https://images.unsplash.com/photo-1492778297155-7be4c83960c7',
  'https://images.unsplash.com/photo-1508062878650-88b52897f298',
  'https://images.unsplash.com/photo-1506158278516-d720e72406fc',
  'https://images.unsplash.com/photo-1552203274-e3c7bd771d26',
  'https://images.unsplash.com/photo-1528163186890-de9b86b54b51',
  'https://images.unsplash.com/photo-1727423304224-6d2fd99b864c',
  'https://images.unsplash.com/photo-1675090391405-432434e23595',
  'https://images.unsplash.com/photo-1554196967-97a8602084d9',
  'https://images.unsplash.com/photo-1491961865842-98f7befd1a60',
  'https://images.unsplash.com/photo-1721728613411-d56d2ddda959',
  'https://images.unsplash.com/photo-1731901245099-20ac7f85dbaa',
  'https://images.unsplash.com/photo-1617694455303-59af55af7e58',
  'https://images.unsplash.com/photo-1709198165282-1dab551df890',
];

const GalleryPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Gallery | Antd Dashboard</title>
      </Helmet>
      <div style={{ padding: '0 24px 24px', minHeight: 'calc(100vh - 200px)' }}>
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Title level={2} style={{ margin: 0 }}>
              Masonry Gallery
            </Title>
            <Link to="/">
              <Text type="secondary">
                <HomeOutlined /> Back to Home
              </Text>
            </Link>
          </div>
          <Text type="secondary">
            Demonstrating Ant Design v6 Masonry component with Unsplash images
          </Text>
        </div>

        <Masonry
          columns={4}
          gutter={16}
          items={UNSPLASH_IMAGES.map((img, index) => ({
            key: `item-${index}`,
            data: img,
          }))}
          itemRender={(itemInfo) => (
            <img
              src={`${itemInfo.data}?w=523&auto=format`}
              alt="sample"
              style={{ width: '100%' }}
            />
          )}
        />
      </div>
    </>
  );
};

export default GalleryPage;
