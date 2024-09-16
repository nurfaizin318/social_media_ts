export type CommentRequest = {
    post_id: number;
    user_id: number;
    content: string;

}

export type CommentRequestUpdate = {
    id: number;
    post_id: number;
    user_id: number;
    content: string;

}
