export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  date_created: string;
  is_featured: boolean;
  views: number;
  related_faqs: Array<unknown>;
  tags: string;
  rating: number;
  author: string;
};
