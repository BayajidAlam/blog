import { NextFunction, Request, Response } from "express";
export declare const PostController: {
    createPost: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllPost: (req: Request, res: Response) => Promise<void>;
    getPostById: (req: Request, res: Response) => Promise<void>;
    getMyPosts: (req: Request, res: Response) => Promise<void>;
    updatePost: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deletePost: (req: Request, res: Response) => Promise<void>;
    getStats: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=post.controller.d.ts.map