import type { AnalyzedFile } from '../config/types.ts';
import { filesApi } from '../api/filesApi.ts';

export const fileService = {
    getFiles() {
        const files = filesApi.getFiles();

        return files ?? [];
    },
    setFiles(files: AnalyzedFile[]) {
        filesApi.setFiles(files);

        return files;
    },
    async analyzeFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        const fileInfo = await filesApi.analyzeFile(formData);

        return fileInfo;
    },
    generateFile() {
        return filesApi.generateFile();
    },
};
