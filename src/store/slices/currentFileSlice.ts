import type { StateCreator } from 'zustand/vanilla';
import type { CurrentFileSlice } from '../types.ts';

export const createCurrentFileSlice: StateCreator<CurrentFileSlice> = (
    set,
) => ({
    selectedFile: null,
    setSelectedFile: (newFile: File) => {
        set({ selectedFile: newFile });
    },
    removeSelectedFile: () => {
        set({ selectedFile: null });
    },
});
