import type { PearFile } from "./PearFile";

export class PearFolder {
    name : string;
    files : Array<PearFile | PearFolder>;
    constructor(name : string, files : Array<PearFile | PearFolder>){
        this.name = name;
        this.files = files;
    }
}