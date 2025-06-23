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
        fileService.setFiles(newFiles);
        set({ files: newFiles });
    },
    deleteFile: (deleteIndex: number) => {
        const newFiles = get().files.filter(
            (_: AnalyzedFile, index: number) => index !== deleteIndex,
        );
        fileService.setFiles(newFiles);
        set({ files: newFiles });
    },
    deleteAllFiles: () => {
        set({ files: [] });
        fileService.setFiles([]);
    },
});
