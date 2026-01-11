import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
});

export const blogSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    category: z.string().min(1, 'Category is required'),
    content: z.string().min(1, 'Content is required'),
    image: z.string().url('Invalid URL').optional().or(z.literal(''))
});

export const updateBlogSchema = blogSchema.partial();

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
