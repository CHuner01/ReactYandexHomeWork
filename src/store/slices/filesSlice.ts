import { fileService } from '../../service/fileService.ts';
import type { AnalyzedFile } from '../../config/types.ts';
import type { StateCreator } from 'zustand/vanilla';
import type { FilesSlice } from '../types.ts';

export const createFilesSlice: StateCreator<FilesSlice> = (set, get) => ({
    files: fileService.getFiles(),
    getFile: (index: number) => {
        return get().files[index];
    },
    addFile: (file: AnalyzedFile) => {
        const newFiles: AnalyzedFile[] = [...get().files, file];
        set({ files: newFiles });
    },
    deleteFile: (deleteIndex: number) => {
        const newFiles = get().files.filter(
            (_: AnalyzedFile, index: number) => index !== deleteIndex,
        );
        set({ files: newFiles });
    },
    deleteAllFiles: () => {
        set({ files: [] });
        fileService.setFiles([]);
    },
    analyzeFile(file: File) {
        return fileService.analyzeFile(file);
    },
    generateFile() {
        return fileService.generateFile();
    },
});
