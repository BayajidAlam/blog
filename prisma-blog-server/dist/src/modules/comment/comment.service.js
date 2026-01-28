import { prisma } from "../../lib/prisma";
const createComment = async (payload) => {
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    });
    if (payload.parentId) {
        await prisma.comment.findUniqueOrThrow({
            where: {
                id: payload.parentId
            }
        });
    }
    return await prisma.comment.create({
        data: payload
    });
};
const getCommentById = async (id) => {
    return await prisma.comment.findUnique({
        where: {
            id
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    views: true
                }
            }
        }
    });
};
const getCommentsByAuthor = async (authorId) => {
    return await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: { createdAt: "desc" },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    });
};
// 1. nijar comment delete korta parbe
// login thakte hobe
// tar nijar comment kina ata check korta hobe
const deleteComment = async (commentId, authorId) => {
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    });
    if (!commentData) {
        throw new Error("Your provided input is invalid!");
    }
    return await prisma.comment.delete({
        where: {
            id: commentData.id
        }
    });
};
// authorId, commentId, updatedData
const updateComment = async (commentId, data, authorId) => {
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    });
    if (!commentData) {
        throw new Error("Your provided input is invalid!");
    }
    return await prisma.comment.update({
        where: {
            id: commentId,
            authorId
        },
        data
    });
};
const moderateComment = async (id, data) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true,
            status: true
        }
    });
    if (commentData.status === data.status) {
        throw new Error(`Your provided status (${data.status}) is already up to date.`);
    }
    return await prisma.comment.update({
        where: {
            id
        },
        data
    });
};
export const CommentService = {
    createComment,
    getCommentById,
    getCommentsByAuthor,
    deleteComment,
    updateComment,
    moderateComment
};
//# sourceMappingURL=comment.service.js.map