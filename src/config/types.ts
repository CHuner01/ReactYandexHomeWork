type Civilization = 'humans' | 'blobs' | 'monsters';

export interface FileInfo {
    average_spend_galactic: number;
    big_spent_at: number;
    big_spent_civ: Civilization;
    big_spent_value: number;
    less_spent_at: number;
    less_spent_civ: Civilization;
    less_spent_value: number;
    rows_affected: number;
    total_spend_galactic: number;
}

export interface AnalyzedFile {
    fileName: string;
    fileDate: string;
    fileInfo: FileInfo | null;
    isSuccessful: boolean;
}
