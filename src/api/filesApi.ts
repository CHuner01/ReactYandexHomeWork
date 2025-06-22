import type { AnalyzedFile, FileInfo } from '../config/types.ts';
import { API_ENDPOINTS } from '../config/endpoints.ts';
import { saveBlobAsFile } from '../utils/SaveFile.ts';

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
    analyzeFile: async (formData: FormData): Promise<FileInfo> => {
        try {
            const response = await fetch(
                `${API_ENDPOINTS.ANALYSE_FILE}?rows=${rows}`,
                {
                    method: 'POST',
                    body: formData,
                },
            );

            const reader = response.body?.getReader();
            if (!reader) {
                console.error('Нет тела ответа для чтения');
                return Promise.reject(new Error('Нет тела ответа'));
            }

            const decoder = new TextDecoder('utf-8');
            let { value: chunk, done: readerDone } = await reader.read();
            let buffer = '';

            while (!readerDone) {
                buffer += decoder.decode(chunk, { stream: true });
                const linesArr = buffer.split('\n');
                buffer = linesArr.pop() || '';

                for (const line of linesArr) {
                    if (line.trim()) {
                        try {
                            const json = JSON.parse(line);
                            return Promise.resolve(json);
                        } catch (e) {
                            console.error('Ошибка парсинга JSON:', e, line);
                        }
                    }
                }

                ({ value: chunk, done: readerDone } = await reader.read());
            }

            if (buffer.trim()) {
                try {
                    return Promise.resolve(JSON.parse(buffer));
                } catch (e) {
                    console.error('Ошибка парсинга JSON в конце:', e, buffer);
                }
            }
            return Promise.reject(
                new Error('Не удалось получить результат анализа'),
            );
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
                saveBlobAsFile(blob, 'file_1');
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
