import { v4 as uuidv4 } from 'uuid';
import { PriorityQueue } from "typescript-collections";

import type { PearFile } from "./PearFile";

export class PearFolder {
    id: string;
    name: string;
    /**Use priority to support custom ordering or filtering features in the future*/
    files: Array<PearFile | PearFolder>;
    description: string;
    icon: string;
    selected: boolean;
    pqFunction: (x: PearFile | PearFolder, y: PearFile | PearFolder) => number;

    constructor(name: string, description: string, icon: string, files: Array<PearFile | PearFolder>, priorityFunction: (x: PearFile | PearFolder, y: PearFile | PearFolder) => number, id: string | null = null) {
        this.id = id == null ? uuidv4() : id;
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.selected = false;
        this.files = files;
        this.pqFunction = priorityFunction;
    }

    listFiles(): Array<PearFile | PearFolder> {
        let operatingQueue = new PriorityQueue(this.pqFunction);
        this.files.forEach(file => operatingQueue.add(file));

        let returnArray = [];
        while (!operatingQueue.isEmpty()) {
            let file = operatingQueue.dequeue();
            if (file !== undefined) {
                returnArray.push(file);
            }
        }

        return returnArray;
    }

    rename(name: string): void {
        this.name = name;
        //do file rename logic
    }

    delete(): void {

    }
}