import type { AnalyzedFile } from '../config/types.ts';

export interface FilesSlice {
    files: AnalyzedFile[];
    getFile: (index: number) => AnalyzedFile | undefined;
    addFile: (file: AnalyzedFile) => void;
    deleteFile: (deleteIndex: number) => void;
    deleteAllFiles: () => void;
    analyzeFile: (file: File) => void;
    generateFile: () => void;
}

export interface CurrentFileSlice {
    selectedFile: File | null;
    setSelectedFile: (newFile: File) => void;
    removeSelectedFile: () => void;
}

export type Store = FilesSlice & CurrentFileSlice;
