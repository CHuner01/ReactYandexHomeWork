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

        const response = await filesApi.analyzeFile(formData);

        return response;
    },
    async generateFile() {
        return await filesApi.generateFile();
    },
};
