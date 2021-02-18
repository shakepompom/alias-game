import { WordStatus } from '@common/types';

export interface User {
  id: string;
  name: string;
  isAdmin?: boolean;
  score?: WordStatus[][];
}

export interface ObjectedUser {
  [key: string]: User;
}
