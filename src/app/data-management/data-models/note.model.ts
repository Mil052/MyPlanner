import { DataModel } from "./data.model";
export class Note implements DataModel {
    public title: string;
    public description: string | null;
    public images: string[] | null;

    constructor(title: string, description: string, images: string[]) {
        this.title = title;
        this.description = description;
        this.images = images;
    }
}