import { fileService } from '../../service/fileService.ts';
import type { StateCreator } from 'zustand/vanilla';
import type { AnalysisSlice } from '../types.ts';

export const createAnalysisSlice: StateCreator<AnalysisSlice> = (set) => ({
    fileAnalysisInfo: null,
    isAnalysisLoading: false,
    isAnalysisError: false,
    removefileAnalysisInfo() {
        set({ fileAnalysisInfo: null, isAnalysisError: false });
    },
    async analyzeFile(file) {
        if (!file) {
            return;
        }
        set({ isAnalysisLoading: true });
        const response = await fileService.analyzeFile(file);

        const reader = response.body?.getReader();
        if (!reader) {
            return Promise.reject(new Error());
        }

        const decoder = new TextDecoder('utf-8');
        let { value: chunk, done: readerDone } = await reader.read();
        let buffer = '';

        while (!readerDone) {
            buffer += decoder.decode(chunk, { stream: true });
            const linesArr = buffer.split('\n');
            buffer = linesArr.pop() || '';

            for (const line of linesArr) {
                if (line.trim()) {
                    try {
                        const json = JSON.parse(line);
                        set({ fileAnalysisInfo: json });
                    } catch (error) {
                        console.error(error);
                    }
                }
            }

            ({ value: chunk, done: readerDone } = await reader.read());
        }
        set({ isAnalysisLoading: false });

        if (buffer.trim()) {
            try {
                set({
                    fileAnalysisInfo: JSON.parse(buffer),
                    isAnalysisLoading: false,
                });
            } catch (error) {
                console.error(error);
                set({ isAnalysisError: true });
            }
        }
    },
});
