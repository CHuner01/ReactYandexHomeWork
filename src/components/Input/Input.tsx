import styles from './Input.module.css';
import CrossButton from '../CrossButton/CrossButton.tsx';
import useInput from './useInput.ts';

interface InputProps {
    placeholder: string;
    isLoading?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
    setIsDragOver: (value: boolean) => void;
}

const Input = ({
    placeholder,
    isLoading = false,
    isError = false,
    isSuccess = false,
    setIsDragOver,
}: InputProps) => {
    const {
        selectedFile,
        clearFile,
        handleDrop,
        handleClick,
        handleDragOver,
        handleDragLeave,
        handleChange,
        fileRef,
    } = useInput({ setIsDragOver });

    return (
        <div
            className={styles.container}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className={styles.row}>
                <input
                    ref={fileRef}
                    type="file"
                    accept=".csv"
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
                    <CrossButton onClick={clearFile} />
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
