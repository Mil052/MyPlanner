import { DataModel } from "./data.model";

export class Task implements DataModel {
    public title: string;
    public description: string | null;
    public from_hour: string;
    public to_hour: string;
    public images: string[] | null;

    constructor(title: string, description: string, from_hour: string, to_hour: string, images: string[]) {
        this.title = title;
        this.description = description;
        this.from_hour = from_hour;
        this.to_hour = to_hour;
        this.images = images;
    }
}

export function convertTaskIntoObjectLiteral(task: Task): Task {
    return {
        title: task.title,
        description: task.description,
        from_hour: task.from_hour,
        to_hour: task.to_hour,
        images: task.images
    };
}