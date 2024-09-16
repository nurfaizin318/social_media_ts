export type MessageRequest = {
    from_id: number;
    to_Id: number;
    content: string;
}

export type MessageRequestUpdate = {
    id: number;
    content : string;
}

export type MessageRequestDetail = {
    from_id: number;
    to_Id: number;
}