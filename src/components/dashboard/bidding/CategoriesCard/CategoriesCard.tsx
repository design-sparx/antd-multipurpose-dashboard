import { CardProps, Table } from 'antd';
import { Card } from '../../../index.ts';

import './styles.css';

const CATEGORIES_MOCKS = [
  {
    id: '4f3d4a10-9650-4351-8583-deebc6aba264',
    quantity: 619,
    popular_categories: 'Clothing',
  },
  {
    id: 'd7c83fcf-e1ef-41c0-a2b1-a647cb2fd595',
    quantity: 122,
    popular_categories: 'Automotive',
  },
  {
    id: 'ec3eaf43-ae68-4527-95f1-d0047a21c6cd',
    quantity: 72,
    popular_categories: 'Music',
  },
  {
    id: '51a35167-8039-42f7-a9fd-dab30dbf95f3',
    quantity: 589,
    popular_categories: 'Jewelry',
  },
  {
    id: '546dff0a-7924-40e4-88ee-89f7b60f5467',
    quantity: 839,
    popular_categories: 'Movies',
  },
  {
    id: '1ae852f1-ed30-42d0-8777-af9202d84672',
    quantity: 458,
    popular_categories: 'Automotive',
  },
  {
    id: 'addd564f-8374-4acc-92bb-b0c94a92daf2',
    quantity: 948,
    popular_categories: 'Electronics',
  },
  {
    id: '70636710-5993-44d7-9a3b-e55f8d2c5876',
    quantity: 965,
    popular_categories: 'Jewelry',
  },
  {
    id: '91e983de-6f07-4d79-83ea-a5ffcb33ae8e',
    quantity: 797,
    popular_categories: 'Food',
  },
  {
    id: '796a05c6-c8da-4e1d-a015-5758deeff3ed',
    quantity: 662,
    popular_categories: 'Electronics',
  },
  {
    id: 'b19df40e-aa7b-4ca2-955a-9cd8e2611a42',
    quantity: 650,
    popular_categories: 'Books',
  },
  {
    id: '1fa890ed-3cb5-4d26-828c-9922c968c979',
    quantity: 536,
    popular_categories: 'Toys',
  },
  {
    id: '7e2b5762-b21f-4e33-be1d-e1bdc63a9afa',
    quantity: 898,
    popular_categories: 'Sports',
  },
  {
    id: 'ed96e148-21e1-4cdc-93fa-233722220524',
    quantity: 680,
    popular_categories: 'Electronics',
  },
  {
    id: '15f722c0-3f56-4249-9249-26776d56b7bd',
    quantity: 490,
    popular_categories: 'Toys',
  },
  {
    id: '02adf93d-be3f-49b0-889d-88d6976e67eb',
    quantity: 712,
    popular_categories: 'Home Decor',
  },
  {
    id: '3d23dd98-adb8-4d4b-add6-3c17ce041fe3',
    quantity: 919,
    popular_categories: 'Clothing',
  },
  {
    id: 'e0c6a330-595c-4ec9-af39-f66928e39e62',
    quantity: 726,
    popular_categories: 'Gaming',
  },
  {
    id: 'c371dcde-cc84-4947-807d-68551aba9c97',
    quantity: 155,
    popular_categories: 'Automotive',
  },
  {
    id: '58274205-ee48-483d-b6b8-901fda940bda',
    quantity: 197,
    popular_categories: 'Automotive',
  },
  {
    id: 'b2e08639-c11d-4a2f-8904-9d114b4aa497',
    quantity: 853,
    popular_categories: 'Jewelry',
  },
  {
    id: '27b313ac-e75c-46e0-8a83-0ca8673f3bf3',
    quantity: 168,
    popular_categories: 'Music',
  },
  {
    id: '5f0fc9b8-8274-45cb-a9dd-615838ee20b0',
    quantity: 804,
    popular_categories: 'Food',
  },
  {
    id: '1f68c92e-81dd-44f2-a5f3-d438faef07ab',
    quantity: 110,
    popular_categories: 'Gaming',
  },
  {
    id: '3500c27b-3ad9-4ac8-9ce9-725ad0045787',
    quantity: 14,
    popular_categories: 'Health',
  },
  {
    id: 'b0263765-8663-40aa-b76f-d01d50d78fc1',
    quantity: 780,
    popular_categories: 'Clothing',
  },
  {
    id: '0009f9c6-c112-408d-8b15-16ec1611b2ba',
    quantity: 407,
    popular_categories: 'Beauty',
  },
  {
    id: '579bfb91-5d1c-4b51-ade4-d3d05a5f1008',
    quantity: 665,
    popular_categories: 'Food',
  },
  {
    id: '0f15c852-680c-4c1a-8e3f-536108d4c5e7',
    quantity: 807,
    popular_categories: 'Pets',
  },
  {
    id: '6d502647-79c4-4a5b-8939-6b494b8850f6',
    quantity: 215,
    popular_categories: 'Movies',
  },
];

const CATEGORIES_COLUMNS = [
  {
    title: 'Category',
    dataIndex: 'popular_categories',
    key: 'popular_categories',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
];

type Props = CardProps;

const CategoriesCard = ({ ...others }: Props) => {
  return (
    <Card title="categories" className="card" {...others}>
      <Table
        dataSource={CATEGORIES_MOCKS}
        columns={CATEGORIES_COLUMNS}
        size="middle"
        className="overflow-scroll"
      />
    </Card>
  );
};

export default CategoriesCard;
