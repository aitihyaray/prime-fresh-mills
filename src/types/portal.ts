export interface Product {
  id: string;
  title: string;
  productName: string;
  badge: string;
  description: string;
  image: string;
  alt: string;
  category: 'edible-oil' | 'seed-doc';
}

export interface SpecDetail {
  label: string;
  value: string;
}

export interface KnowledgeItem {
  title: string;
  productName: string;
  specs: SpecDetail[];
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  knowledgeItem?: KnowledgeItem;
  htmlContent?: string;
  timestamp: Date;
}
