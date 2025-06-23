import { fileService } from '../../service/fileService.ts';
import type { StateCreator } from 'zustand/vanilla';
import type { GenerationSlice } from '../types.ts';

export const createGenerationSlice: StateCreator<GenerationSlice> = (set) => ({
    isGenerationLoading: false,
    isGenerationError: false,
    async generateFile() {
        set({ isGenerationLoading: true });
        await fileService.generateFile();
        set({ isGenerationLoading: false });
    },
});
