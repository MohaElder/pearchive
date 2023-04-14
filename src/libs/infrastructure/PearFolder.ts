import type { PearFile } from "./PearFile";

export class PearFolder {
    name : string;
    files : PearFile[];
    constructor(name : string, files : PearFile[]){
        this.name = name;
        this.files = files;
    }
}