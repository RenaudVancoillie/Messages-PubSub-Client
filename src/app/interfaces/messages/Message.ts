export interface Message {
    id: number;
    chatId: number;
    sender: string;
    text: string;
    createdAt: string;
    updatedAt?: string;
    deletedAt?: string;
}