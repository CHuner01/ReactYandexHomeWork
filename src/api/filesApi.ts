import type { AnalyzedFileInfo } from '../config/types.ts';

const STORAGE_KEY = 'files';

export const fileApi = {
    getFiles() {
        const files = localStorage.getItem(STORAGE_KEY);

        return files ?? [];
    },
    setFiles(files: AnalyzedFileInfo[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(files));

        return files;
    },
    analyzeFile() {},
    generateFile() {},
};
