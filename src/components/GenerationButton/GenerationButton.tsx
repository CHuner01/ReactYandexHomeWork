import styles from './GenerationButton.module.css';
import CrossButton from '../CrossButton/CrossButton.tsx';

interface GenerationButtonProps {
    isLoading: boolean;
    isError?: boolean;
    onClick?: () => void;
}

const GenerationButton = ({
    isLoading,
    isError,
    onClick,
}: GenerationButtonProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <button
                    className={`${styles.button} ${isError ? styles.error : isLoading ? styles.loading : ''}`}
                >
                    {isError ? (
                        'Ошибка'
                    ) : isLoading ? (
                        <div className={styles.loader}></div>
                    ) : (
                        'Done!'
                    )}
                </button>
                <CrossButton onClick={onClick} />
            </div>
            <p className={styles.text}>
                {isError
                    ? 'упс, не то...'
                    : isLoading
                      ? 'идет процесс генерации'
                      : 'файл сгенерирован!'}
            </p>
        </div>
    );
};

export default GenerationButton;
