import styles from './HistoryFileCard.module.css';
import { useState } from 'react';
import Dialog from '../Dialog/Dialog.tsx';
import type { AnalyzedFile } from '../../config/types.ts';
import TrashIcon from '../../../public/TrashIcon.svg';
import { useStore } from '../../store/store.ts';

interface HistoryFileCardProps {
    file: AnalyzedFile;
    index: number;
}

const HistoryFileCard = ({ file, index }: HistoryFileCardProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { deleteFile } = useStore();

    return (
        <>
            <div className={styles.container}>
                <div
                    className={styles.infoContainer}
                    onClick={() => setIsDialogOpen(true)}
                >
                    <p className={styles.item}>{file.fileName}</p>
                    <p className={styles.item}>{file.fileDate}</p>
                    <p
                        className={
                            file.isSuccessful ? styles.item : styles.darkItem
                        }
                    >
                        Обработан успешно
                    </p>
                    <p
                        className={
                            !file.isSuccessful ? styles.item : styles.darkItem
                        }
                    >
                        Не удалось обработать
                    </p>
                </div>
                <button
                    className={styles.button}
                    onClick={() => deleteFile(index)}
                >
                    <img
                        className={styles.trashIcon}
                        src={TrashIcon}
                        alt="Trash"
                    />
                </button>
            </div>
            {isDialogOpen && file.fileInfo && (
                <Dialog
                    fileInfo={file.fileInfo}
                    onClose={() => setIsDialogOpen(false)}
                />
            )}
        </>
    );
};

export default HistoryFileCard;
