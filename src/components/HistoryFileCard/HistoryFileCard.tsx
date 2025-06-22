import styles from './HistoryFileCard.module.css';
import { useState } from 'react';
import Dialog from '../Dialog/Dialog.tsx';
import type { AnalyzedFile } from '../../config/types.ts';

interface HistoryFileCardProps {
    file: AnalyzedFile;
    isSuccess: boolean;
}

const HistoryFileCard = ({ file, isSuccess }: HistoryFileCardProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <div className={styles.container}>
                <div
                    className={styles.infoContainer}
                    onClick={() => setIsDialogOpen(true)}
                >
                    <p className={styles.item}>{file.fileName}</p>
                    <p className={styles.item}>{file.fileDate}</p>
                    <p className={isSuccess ? styles.item : styles.darkItem}>
                        Обработан успешно
                    </p>
                    <p className={!isSuccess ? styles.item : styles.darkItem}>
                        Не удалось обработать
                    </p>
                </div>
                <button className={styles.button}>Удалить</button>
            </div>
            {isDialogOpen && (
                <Dialog
                    fileInfo={file.fileInfo}
                    onClose={() => setIsDialogOpen(false)}
                />
            )}
        </>
    );
};

export default HistoryFileCard;
