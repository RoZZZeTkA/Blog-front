import { Tag } from "./tag";

export interface Post {
    id: number;
    userId: number;
    title: string;
    value: string;
    postTags: Set<Tag>;
}