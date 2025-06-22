import { API_ENDPOINTS } from '../../config/endpoints.ts';
import { type ChangeEvent, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.tsx';
import styles from './FileAnalysisPage.module.css';
import InfoCard from '../../components/InfoCard/InfoCard.tsx';
import HistoryFileCard from '../../components/HistoryFileCard/HistoryFileCard.tsx';
import Button from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';

const rows: number = 100;

const FileAnalysisPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [latestLine, setLatestLine] = useState<any | null>(null);

    const sendFile = async () => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(
                `${API_ENDPOINTS.ANALYSE_FILE}?rows=${rows}`,
                {
                    method: 'POST',
                    body: formData,
                },
            );
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const reader = response.body?.getReader();
            if (!reader) {
                console.error('Нет тела ответа для чтения');
                return;
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
                            console.log(json);
                            setLatestLine(json);
                        } catch (e) {
                            console.error('Ошибка парсинга JSON:', e, line);
                        }
                    }
                }

                ({ value: chunk, done: readerDone } = await reader.read());
            }

            if (buffer.trim()) {
                try {
                    const json = JSON.parse(buffer);
                    const rounded = {
                        ...json,
                        total_spend_galactic: Math.round(
                            json.total_spend_galactic,
                        ),
                        average_spend_galactic: Math.round(
                            json.average_spend_galactic,
                        ),
                    };

                    setLatestLine(rounded);
                } catch (e) {
                    console.error('Ошибка парсинга JSON в конце:', e, buffer);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <p>
                Загрузите <strong>csv</strong> файл и получите{' '}
                <strong>полную информацию</strong> о нём за сверхнизкое время
            </p>

            <Button>Отправить</Button>
            <Button isActive={false}>Отправить</Button>
            <Input placeholder={'Загрузить'} label={'или перетащите сюда'} />
            <Input
                placeholder={'Загрузить'}
                label={'или перетащите сюда'}
                isLoading={true}
            />
            <Input
                placeholder={'Загрузить'}
                label={'или перетащите сюда'}
                isSuccess={true}
            />
            <Input
                placeholder={'Загрузить'}
                label={'или перетащите сюда'}
                isError={true}
            />

            {/*<HistoryFileCard*/}
            {/*    file={}*/}
            {/*    isSuccess={true}*/}
            {/*/>*/}

            {/*<InfoCard title={'1000'} description={'общие расходы в кредитах'} />*/}

            {/*<input type="file" onChange={handleChange} />*/}
            {/*{file && <p>{file.type}</p>}*/}
            {/*<button onClick={sendFile}>Отправить</button>*/}
            {/*<div>*/}
            {/*    {latestLine ? (*/}
            {/*        <>*/}
            {/*            <p>Total spend: {latestLine.total_spend_galactic}</p>*/}
            {/*            <p>Rows affected: {latestLine.rows_affected}</p>*/}
            {/*            <p>*/}
            {/*                Average spend: {latestLine.average_spend_galactic}*/}
            {/*            </p>*/}
            {/*        </>*/}
            {/*    ) : (*/}
            {/*        <p>Данных нет</p>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default FileAnalysisPage;
