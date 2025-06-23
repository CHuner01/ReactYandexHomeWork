import type { AnalyzedFile, FileInfo } from '../config/types.ts';

export interface FilesSlice {
    files: AnalyzedFile[];
    getFile: (index: number) => AnalyzedFile | undefined;
    addFile: (file: AnalyzedFile) => void;
    deleteFile: (deleteIndex: number) => void;
    deleteAllFiles: () => void;
    generateFile: () => void;
}

export interface CurrentFileSlice {
    selectedFile: File | null;
    setSelectedFile: (newFile: File) => void;
    removeSelectedFile: () => void;
}

export interface AnalysisSlice {
    fileAnalysisInfo: FileInfo | null;
    isAnalysisLoading: boolean;
    isAnalysisError: boolean;
    removefileAnalysisInfo: () => void;
    analyzeFile: (file: File | null) => void;
}

export type Store = FilesSlice & CurrentFileSlice & AnalysisSlice;
