import { postService } from "./post.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { UserRole } from "../../middlewares/auth";
const createPost = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized!",
            });
        }
        const result = await postService.createPost(req.body, user.id);
        res.status(201).json(result);
    }
    catch (e) {
        next(e);
    }
};
const getAllPost = async (req, res) => {
    try {
        const { search } = req.query;
        const searchString = typeof search === 'string' ? search : undefined;
        const tags = req.query.tags ? req.query.tags.split(",") : [];
        // true or false
        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === 'true'
                ? true
                : req.query.isFeatured === 'false'
                    ? false
                    : undefined
            : undefined;
        const status = req.query.status;
        const authorId = req.query.authorId;
        const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(req.query);
        const result = await postService.getAllPost({ search: searchString, tags, isFeatured, status, authorId, page, limit, skip, sortBy, sortOrder });
        res.status(200).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: "Post creation failed",
            details: e
        });
    }
};
const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            throw new Error("Post Id is required!");
        }
        const result = await postService.getPostById(postId);
        res.status(200).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: "Post creation failed",
            details: e
        });
    }
};
const getMyPosts = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!");
        }
        console.log("User data: ", user);
        const result = await postService.getMyPosts(user.id);
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            error: "Post fetched failed",
            details: e
        });
    }
};
const updatePost = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!");
        }
        const { postId } = req.params;
        const isAdmin = user.role === UserRole.ADMIN;
        const result = await postService.updatePost(postId, req.body, user.id, isAdmin);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
};
const deletePost = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!");
        }
        const { postId } = req.params;
        const isAdmin = user.role === UserRole.ADMIN;
        const result = await postService.deletePost(postId, user.id, isAdmin);
        res.status(200).json(result);
    }
    catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Post delete failed!";
        res.status(400).json({
            error: errorMessage,
            details: e
        });
    }
};
const getStats = async (req, res) => {
    try {
        const result = await postService.getStats();
        res.status(200).json(result);
    }
    catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Stats fetched failed!";
        res.status(400).json({
            error: errorMessage,
            details: e
        });
    }
};
export const PostController = {
    createPost,
    getAllPost,
    getPostById,
    getMyPosts,
    updatePost,
    deletePost,
    getStats
};
//# sourceMappingURL=post.controller.js.map