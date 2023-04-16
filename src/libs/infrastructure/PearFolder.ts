import { v4 as uuidv4 } from 'uuid';
import { PriorityQueue } from "typescript-collections";

import type { PearFile } from "./PearFile";

export class PearFolder {
    id: string;
    name : string;
    /**Use priority to support custom ordering or filtering features in the future*/
    files : PriorityQueue<PearFile | PearFolder>;
    description: string;
    icon: string;
    selected: boolean;
    
    constructor(name : string, description:string, icon: string, files : Array<PearFile | PearFolder>, priorityFunction: (x: PearFile | PearFolder, y: PearFile | PearFolder) => number){
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.selected = false;
        this.files = new PriorityQueue(priorityFunction);
        files.forEach(file => this.files.add(file));
    }
}