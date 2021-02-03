import { WordStatus } from '@common/types';

export type Room = {
  id: string;
  name: string;
  isAdmin?: boolean;
  score?: WordStatus[][];
};
