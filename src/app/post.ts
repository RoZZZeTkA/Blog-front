import { Mark } from "./mark";
import { Tag } from "./tag";

export interface Post {
    id: number;
    userId: number;
    title: string;
    value: string;
    date: Date;
    postTags: Set<Tag>;
    postMarks: Array<Mark>;
}