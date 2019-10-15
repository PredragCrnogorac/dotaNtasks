import { Comment1 } from './comment1';
export class CreateTaskModel {
    title: string;
    explanation: string;
    asignedId: string;
    done: boolean;
    date: Date;
    comment?: Comment1[];
}
