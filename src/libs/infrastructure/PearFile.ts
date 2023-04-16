export class PearFile {
    media: {
        src: string,
        type: MediaType,
    };
    name: string;
    receipient: string;
    sender: string;
    description: string;
    icon: string;
    selected: boolean;

    constructor(media: { src: string, type: MediaType }, name: string, receipient: string, sender: string, description: string, icon: string, selcted: boolean = false) {
        this.media = media;
        this.name = name;
        this.receipient = receipient;
        this.sender = sender;
        this.description = description;
        this.icon = icon;
        this.selected = selcted;
    }

    rename(name: string): void {
        this.name = name;
        //do file rename logic
    }

    delete(): void {
    
    }
    
}

export enum MediaType {
    Image,
    Video
}