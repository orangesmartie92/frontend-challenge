import type {Resolver} from 'react-hook-form';
import {zodResolver as zResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

export const zodResolver = <T>(schema: z.ZodTypeAny): Resolver<T> => {
  return zResolver(schema);
};
