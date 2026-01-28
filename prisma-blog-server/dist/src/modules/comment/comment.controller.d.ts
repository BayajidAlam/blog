import { Request, Response } from "express";
export declare const CommentController: {
    createComment: (req: Request, res: Response) => Promise<void>;
    getCommentById: (req: Request, res: Response) => Promise<void>;
    getCommentsByAuthor: (req: Request, res: Response) => Promise<void>;
    deleteComment: (req: Request, res: Response) => Promise<void>;
    updateComment: (req: Request, res: Response) => Promise<void>;
    moderateComment: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=comment.controller.d.ts.map