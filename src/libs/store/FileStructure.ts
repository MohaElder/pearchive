import { writable } from 'svelte/store';
import type { PearFile } from '../infrastructure/PearFile';

function CopyFile () {
    const { subscribe, set } = writable<PearFile | null>(null);

    return {
        subscribe,
        copy: (newFile: PearFile | null) => { set(newFile) },
        reset: () => set(null)
    }
}

export const copyFile = CopyFile();