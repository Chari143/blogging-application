export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Blog {
    id: string;
    title: string;
    category: string;
    author: string;
    content: string;
    image?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user?: User;
}

export interface BlogInput {
    title: string;
    category: string;
    content: string;
    image?: string;
}
