import { Message } from '../messages/Message';

export interface ChatWithMessages {
    id: number;
    guid: string;
    name: string;
    messages: Message[];
}