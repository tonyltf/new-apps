export interface News {
  source: {
    id: number | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsState {
  loading: boolean;
  news: News[];
  message: string;
}
