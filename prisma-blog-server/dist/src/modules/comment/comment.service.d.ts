import { CommentStatus } from "../../../generated/prisma/enums";
export declare const CommentService: {
    createComment: (payload: {
        content: string;
        authorId: string;
        postId: string;
        parentId?: string;
    }) => Promise<{
        id: string;
        content: string;
        status: CommentStatus;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
        postId: string;
        parentId: string | null;
    }>;
    getCommentById: (id: string) => Promise<({
        post: {
            id: string;
            title: string;
            views: number;
        };
    } & {
        id: string;
        content: string;
        status: CommentStatus;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
        postId: string;
        parentId: string | null;
    }) | null>;
    getCommentsByAuthor: (authorId: string) => Promise<({
        post: {
            id: string;
            title: string;
        };
    } & {
        id: string;
        content: string;
        status: CommentStatus;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
        postId: string;
        parentId: string | null;
    })[]>;
    deleteComment: (commentId: string, authorId: string) => Promise<{
        id: string;
        content: string;
        status: CommentStatus;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
        postId: string;
        parentId: string | null;
    }>;
    updateComment: (commentId: string, data: {
        content?: string;
        status?: CommentStatus;
    }, authorId: string) => Promise<{
        id: string;
        content: string;
        status: CommentStatus;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
        postId: string;
        parentId: string | null;
    }>;
    moderateComment: (id: string, data: {
        status: CommentStatus;
    }) => Promise<{
        id: string;
        content: string;
        status: CommentStatus;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
        postId: string;
        parentId: string | null;
    }>;
};
//# sourceMappingURL=comment.service.d.ts.map