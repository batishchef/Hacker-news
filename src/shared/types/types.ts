export type newsIdList = Array<number>;

export type error = {
  isError: boolean;
  message?: string;
};

export type newsPrevCellProps = {
  newsId: number;
};

export interface NewsData {
  by?: string;
  descendants?: number;
  id: number;
  kids?: Array<number>;
  score?: number;
  time?: number;
  title?: string;
  type?: string;
  url?: string;
}

export type commentProps = {
  commentId: number;
};

export type comment = {
  by?: string;
  id: number;
  kids?: Array<number>;
  parent?: number;
  text?: string;
  time?: number;
  type?: string;
}