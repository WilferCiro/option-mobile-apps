// Created by Wilfer Ciro - Dec, 2023: wilcirom@gmail.com

export interface ChatMessageSchema {
    _id: number;
    text: string;
    createdAt: Date;
    user: {
        name: string;
        _id: number;
    },
}