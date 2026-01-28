import { CommentStatus, Post, PostStatus } from "../../../generated/prisma/client";
export declare const postService: {
    createPost: (data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">, userId: string) => Promise<{
        id: string;
        title: string;
        content: string;
        thumbnail: string | null;
        isFeatured: boolean;
        status: PostStatus;
        tags: string[];
        views: number;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllPost: ({ search, tags, isFeatured, status, authorId, page, limit, skip, sortBy, sortOrder }: {
        search: string | undefined;
        tags: string[] | [];
        isFeatured: boolean | undefined;
        status: PostStatus | undefined;
        authorId: string | undefined;
        page: number;
        limit: number;
        skip: number;
        sortBy: string;
        sortOrder: string;
    }) => Promise<{
        data: ({
            _count: {
                comments: number;
            };
        } & {
            id: string;
            title: string;
            content: string;
            thumbnail: string | null;
            isFeatured: boolean;
            status: PostStatus;
            tags: string[];
            views: number;
            authorId: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getPostById: (postId: string) => Promise<({
        comments: ({
            replies: ({
                replies: {
                    id: string;
                    content: string;
                    status: CommentStatus;
                    authorId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    postId: string;
                    parentId: string | null;
                }[];
            } & {
                id: string;
                content: string;
                status: CommentStatus;
                authorId: string;
                createdAt: Date;
                updatedAt: Date;
                postId: string;
                parentId: string | null;
            })[];
        } & {
            id: string;
            content: string;
            status: CommentStatus;
            authorId: string;
            createdAt: Date;
            updatedAt: Date;
            postId: string;
            parentId: string | null;
        })[];
        _count: {
            comments: number;
        };
    } & {
        id: string;
        title: string;
        content: string;
        thumbnail: string | null;
        isFeatured: boolean;
        status: PostStatus;
        tags: string[];
        views: number;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    getMyPosts: (authorId: string) => Promise<({
        _count: {
            comments: number;
        };
    } & {
        id: string;
        title: string;
        content: string;
        thumbnail: string | null;
        isFeatured: boolean;
        status: PostStatus;
        tags: string[];
        views: number;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updatePost: (postId: string, data: Partial<Post>, authorId: string, isAdmin: boolean) => Promise<{
        id: string;
        title: string;
        content: string;
        thumbnail: string | null;
        isFeatured: boolean;
        status: PostStatus;
        tags: string[];
        views: number;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deletePost: (postId: string, authorId: string, isAdmin: boolean) => Promise<{
        id: string;
        title: string;
        content: string;
        thumbnail: string | null;
        isFeatured: boolean;
        status: PostStatus;
        tags: string[];
        views: number;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getStats: () => Promise<{
        totalPosts: number;
        publlishedPosts: number;
        draftPosts: number;
        archivedPosts: number;
        totalComments: number;
        approvedComment: number;
        totalUsers: number;
        adminCount: number;
        userCount: number;
        totalViews: number | null;
    }>;
};
//# sourceMappingURL=post.service.d.ts.map