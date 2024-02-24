import type { Meta, StoryObj } from '@storybook/react';

import EmployeeCard from './EmployeeCard.tsx';

const DATA = {
  employee_id: '24e4e64c-bf09-459f-8cea-f9d2de99d15b',
  title: 'Mrs',
  first_name: 'Eugen',
  middle_name: 'Pål',
  last_name: 'Tiltman',
  avatar:
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
  role: 'Operator',
  age: 28,
  email: 'etiltman0@dailymail.co.uk',
  country: 'Indonesia',
  favorite_color: 'gray',
  hire_date: '4/9/2017',
  salary: 92877.67,
};

const meta = {
  title: 'Components/Employee',
  component: EmployeeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmployeeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: DATA,
    style: { width: 400 },
  },
};

export const Expanded: Story = {
  args: {
    data: DATA,
    showInfo: true,
    style: { width: 400 },
  },
};
