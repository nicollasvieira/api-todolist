import { z } from 'zod';

export const createSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Name must be 3 or more characters long' })
    .max(60, { message: 'Name must be 60 or fewer characters long' }),

  description: z
    .string({ required_error: 'Description is required' })
    .min(5, { message: 'Name must be 5 or more characters long' })
    .max(255, { message: 'Name must be 255 or fewer characters long' })
    .optional(),
});

export const findItemSchema = z.object({
  id: z.string({ required_error: 'ID is required' }).nonempty(),
});

export const idSchema = z.object({
  id: z.string({ required_error: 'ID is required' }).nonempty(),
});
export const updateSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be 3 or more characters long' })
    .max(60, { message: 'Name must be 60 or fewer characters long' })
    .optional(),

  description: z
    .string()
    .min(5, { message: 'Name must be 5 or more characters long' })
    .max(255, { message: 'Name must be 255 or fewer characters long' })
    .optional(),
});
