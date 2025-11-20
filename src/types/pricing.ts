export type Pricing = {
  plan: string;
  monthly: number;
  annually: number;
  savings_caption: string;
  features: string[];
  color: string;
  preferred?: boolean;
};

export type License = {
  title: string;
  description: string;
};
