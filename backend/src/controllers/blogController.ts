import { Response } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth';
import { blogSchema, updateBlogSchema } from '../schemas/validation';

export const getAllBlogs = async (req: AuthRequest, res: Response) => {
    try {
        const { category, author } = req.query;

        const where: any = {};

        if (category) {
            where.category = category as string;
        }

        if (author) {
            where.author = author as string;
        }

        const blogs = await prisma.blog.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({ blogs });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const createBlog = async (req: AuthRequest, res: Response) => {
    try {
        const validatedData = blogSchema.parse(req.body);

        const user = await prisma.user.findUnique({
            where: { id: req.userId }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const blog = await prisma.blog.create({
            data: {
                title: validatedData.title,
                category: validatedData.category,
                author: user.name,
                content: validatedData.content,
                image: validatedData.image || '',
                userId: req.userId!
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            const errors = error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }));
            return res.status(400).json({ message: 'Validation error', errors });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = updateBlogSchema.parse(req.body);

        const existingBlog = await prisma.blog.findUnique({
            where: { id: id as string }
        });

        if (!existingBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (existingBlog.userId !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to update this blog' });
        }

        const blog = await prisma.blog.update({
            where: { id: id as string },
            data: validatedData,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.status(200).json({ message: 'Blog updated successfully', blog });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            const errors = error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }));
            return res.status(400).json({ message: 'Validation error', errors });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const existingBlog = await prisma.blog.findUnique({
            where: { id: id as string }
        });

        if (!existingBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (existingBlog.userId !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this blog' });
        }

        await prisma.blog.delete({
            where: { id: id as string }
        });

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
