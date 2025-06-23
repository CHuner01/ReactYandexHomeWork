import { useStore } from '../../store/store.ts';
import Navbar from '../../components/Navbar/Navbar.tsx';
import styles from './FileGenerationPage.module.css';
import Button from '../../components/Button/Button.tsx';
import { useState } from 'react';
import GenerationButton from '../../components/GenerationButton/GenerationButton.tsx';

const FileGenerationPage = () => {
    const { generateFile, isGenerationLoading, isGenerationError } = useStore();
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = () => {
        generateFile();
        setIsDisabled(true);
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.content}>
                <p className={styles.label}>
                    Сгенерируйте готовый csv-файл нажатием одной кнопки
                </p>
                {isDisabled ? (
                    <GenerationButton
                        isLoading={isGenerationLoading}
                        isError={isGenerationError}
                        onClick={() => setIsDisabled(false)}
                    />
                ) : (
                    <Button onClick={handleClick}>Сгенерировать</Button>
                )}
            </div>
        </div>
    );
};

export default FileGenerationPage;
