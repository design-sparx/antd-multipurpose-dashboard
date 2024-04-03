import { Employee } from '../../types';
import { Card as AntdCard, CardProps, Flex, Typography } from 'antd';

const { Meta } = AntdCard;

type Props = {
  data: Employee;
  showInfo?: boolean;
} & CardProps;

export const EmployeeCard = ({ data, showInfo, ...others }: Props) => {
  const {
    avatar,
    first_name,
    middle_name,
    last_name,
    role,
    age,
    country,
    title,
    email,
    hire_date,
  } = data;

  return (
    <AntdCard
      hoverable
      cover={
        <img
          alt={`${first_name} image`}
          src={avatar}
          height={240}
          style={{ objectFit: 'cover' }}
        />
      }
      {...others}
    >
      <Meta title={`${title}. ${first_name} ${middle_name} ${last_name}`} />
      <Flex vertical gap="small" style={{ marginTop: '8px' }}>
        <Typography.Text>{role}</Typography.Text>
        {showInfo && (
          <>
            <Typography.Text>Email: {email}</Typography.Text>
            <Typography.Text>Country: {country}</Typography.Text>
            <Typography.Text>Age: {age}</Typography.Text>
            <Typography.Text>Join date: {hire_date}</Typography.Text>
          </>
        )}
      </Flex>
    </AntdCard>
  );
};
