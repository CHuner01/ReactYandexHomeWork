import type { AnalyzedFile } from '../config/types.ts';
import { API_ENDPOINTS } from '../config/endpoints.ts';
import { saveFile } from '../utils/saveFile.ts';

const apiParams = {
    size: 0.0001,
    withErrors: 'off',
    maxSpend: 100,
};

const STORAGE_KEY = 'files';
const rows: number = 100;

export const filesApi = {
    getFiles(): AnalyzedFile[] {
        const files = localStorage.getItem(STORAGE_KEY);
        if (files) {
            return JSON.parse(files);
        }
        return [];
    },
    setFiles(files: AnalyzedFile[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
        return files;
    },
    analyzeFile: async (formData: FormData) => {
        try {
            const response = await fetch(
                `${API_ENDPOINTS.ANALYSE_FILE}?rows=${rows}`,
                {
                    method: 'POST',
                    body: formData,
                },
            );

            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            return response;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    generateFile: async () => {
        try {
            const response = await fetch(
                `${API_ENDPOINTS.GENERATE_FILE}?size=${apiParams.size}&withErrors=${apiParams.withErrors}&maxSpend=${apiParams.maxSpend}`,
            );
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            const contentType = response.headers.get('Content-Type');

            if (contentType?.includes('text/csv')) {
                const blob = await response.blob();
                saveFile(blob, 'file_1');
            }

            if (contentType?.includes('application/json')) {
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (error) {
            console.error('GET error:', error);
        }
    },
};
