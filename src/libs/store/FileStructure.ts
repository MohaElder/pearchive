import { writable } from 'svelte/store';
import type { PearFile } from '../infrastructure/PearFile';
import type { PearFolder } from '../infrastructure/PearFolder';

function CopyFile () {
    const { subscribe, set } = writable<PearFile | PearFolder| null>(null);

    return {
        subscribe,
        copy: (newFile: PearFile | PearFolder | null) => { set(newFile) },
        reset: () => set(null)
    }
}

export const copyFile = CopyFile();