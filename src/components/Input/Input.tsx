import styles from './Input.module.css';
import { useStore } from '../../store/store.ts';
import { type ChangeEvent, useRef } from 'react';
import CrossIcon from '../../../public/CrossIcon.svg';

interface InputProps {
    placeholder: string;
    isLoading?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
}

const Input = ({
    placeholder,
    isLoading = false,
    isError = false,
    isSuccess = false,
}: InputProps) => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const {
        selectedFile,
        setSelectedFile,
        removeSelectedFile,
        removefileAnalysisInfo,
    } = useStore();

    const handleClick = () => {
        fileRef.current?.click();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const clearFile = () => {
        removeSelectedFile();
        removefileAnalysisInfo();
        if (fileRef.current) {
            fileRef.current.value = '';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <input
                    ref={fileRef}
                    type="file"
                    className={styles.input}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
                <button
                    className={`${styles.inputButton} ${
                        isError
                            ? styles.error
                            : isSuccess
                              ? styles.success
                              : selectedFile || isLoading
                                ? styles.file
                                : ''
                    }`}
                    onClick={handleClick}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className={styles.loader}></div>
                    ) : selectedFile ? (
                        selectedFile.name
                    ) : (
                        'Загрузить файл'
                    )}
                </button>
                {selectedFile && !isLoading && (
                    <button onClick={clearFile} className={styles.deleteButton}>
                        <img
                            className={styles.crossIcon}
                            src={CrossIcon}
                            alt="icon"
                        />
                    </button>
                )}
            </div>
            <p className={styles.label}>
                {isError
                    ? 'упс, не то...'
                    : isSuccess
                      ? 'готово!'
                      : isLoading
                        ? 'идёт парсинг файла'
                        : selectedFile
                          ? 'файл загружен!'
                          : 'или перетащите сюда'}
            </p>
        </div>
    );
};

export default Input;
