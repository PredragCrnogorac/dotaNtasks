import { Comment1 } from './comment1';
export class Task1 {
    date: Date;
    uid: string;
    title: string;
    explanation: string;
    done: boolean;
    asignedId: string;
    comment?: Comment1[];
}
