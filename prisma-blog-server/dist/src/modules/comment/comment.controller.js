import { CommentService } from "./comment.service";
const createComment = async (req, res) => {
    try {
        const user = req.user;
        req.body.authorId = user?.id;
        const result = await CommentService.createComment(req.body);
        res.status(201).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: "Comment creation failed",
            details: e
        });
    }
};
const getCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const result = await CommentService.getCommentById(commentId);
        res.status(200).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: "Comment fetched failed",
            details: e
        });
    }
};
const getCommentsByAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;
        const result = await CommentService.getCommentsByAuthor(authorId);
        res.status(200).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: "Comment fetched failed",
            details: e
        });
    }
};
const deleteComment = async (req, res) => {
    try {
        const user = req.user;
        const { commentId } = req.params;
        const result = await CommentService.deleteComment(commentId, user?.id);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            error: "Comment delete failed!",
            details: e
        });
    }
};
const updateComment = async (req, res) => {
    try {
        const user = req.user;
        const { commentId } = req.params;
        const result = await CommentService.updateComment(commentId, req.body, user?.id);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            error: "Comment update failed!",
            details: e
        });
    }
};
const moderateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const result = await CommentService.moderateComment(commentId, req.body);
        res.status(200).json(result);
    }
    catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Comment update failed!";
        res.status(400).json({
            error: errorMessage,
            details: e
        });
    }
};
export const CommentController = {
    createComment,
    getCommentById,
    getCommentsByAuthor,
    deleteComment,
    updateComment,
    moderateComment
};
//# sourceMappingURL=comment.controller.js.map