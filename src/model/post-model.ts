export type PostRequest = {
    user_id: number;
    media_url: string;
    content: string;

}

export type PostRequestUpdate = {
    id: number;
    user_id: number;
    media_url: string;
    content: string;

}

export type PostRequestDelete = {
    id: number;

}



