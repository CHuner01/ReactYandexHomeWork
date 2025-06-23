import type { AnalyzedFile, FileInfo } from '../config/types.ts';

export interface FilesSlice {
    files: AnalyzedFile[];
    getFile: (index: number) => AnalyzedFile | undefined;
    addFile: (file: AnalyzedFile) => void;
    deleteFile: (deleteIndex: number) => void;
    deleteAllFiles: () => void;
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

export interface GenerationSlice {
    isGenerationLoading: boolean;
    isGenerationError: boolean;
    generateFile: () => void;
}

export type Store = FilesSlice &
    CurrentFileSlice &
    AnalysisSlice &
    GenerationSlice;
