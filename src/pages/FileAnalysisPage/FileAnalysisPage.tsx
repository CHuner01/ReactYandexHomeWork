import Navbar from '../../components/Navbar/Navbar.tsx';
import styles from './FileAnalysisPage.module.css';
import Button from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import { useStore } from '../../store/store.ts';
import InfoCard from '../../components/InfoCard/InfoCard.tsx';
import { FileAnalysisText } from '../../config/constants.ts';

const FileAnalysisPage = () => {
    const {
        selectedFile,
        analyzeFile,
        fileAnalysisInfo,
        isAnalysisLoading,
        isAnalysisError,
    } = useStore();

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.content}>
                <p className={styles.label}>
                    Загрузите <strong>csv</strong> файл и получите{' '}
                    <strong>полную информацию</strong> о нём за сверхнизкое
                    время
                </p>
                <div
                    className={`${styles.inputContainer} ${selectedFile ? styles.blank : ''}`}
                >
                    <Input
                        placeholder={'Загрузить файл'}
                        isLoading={isAnalysisLoading}
                        isError={isAnalysisError}
                        isSuccess={
                            !isAnalysisLoading &&
                            !isAnalysisError &&
                            !!fileAnalysisInfo
                        }
                    />
                </div>

                {!isAnalysisLoading &&
                    !isAnalysisError &&
                    !fileAnalysisInfo && (
                        <Button
                            onClick={() => analyzeFile(selectedFile)}
                            isActive={!!selectedFile && !isAnalysisLoading}
                        >
                            Отправить
                        </Button>
                    )}
            </div>
            <div className={styles.infoContainer}>
                {fileAnalysisInfo ? (
                    <>
                        <div className={styles.column}>
                            <InfoCard
                                title={String(
                                    fileAnalysisInfo.total_spend_galactic,
                                )}
                                description={
                                    FileAnalysisText.total_spend_galactic
                                }
                            />
                            <InfoCard
                                title={String(fileAnalysisInfo.rows_affected)}
                                description={FileAnalysisText.rows_affected}
                            />
                            <InfoCard
                                title={String(fileAnalysisInfo.less_spent_at)}
                                description={FileAnalysisText.less_spent_at}
                            />
                            <InfoCard
                                title={String(fileAnalysisInfo.big_spent_at)}
                                description={FileAnalysisText.big_spent_at}
                            />
                        </div>
                        <div className={styles.column}>
                            <InfoCard
                                title={String(fileAnalysisInfo.big_spent_civ)}
                                description={FileAnalysisText.big_spent_civ}
                            />
                            <InfoCard
                                title={fileAnalysisInfo.less_spent_civ}
                                description={FileAnalysisText.less_spent_civ}
                            />
                            <InfoCard
                                title={String(fileAnalysisInfo.big_spent_value)}
                                description={FileAnalysisText.big_spent_value}
                            />
                            <InfoCard
                                title={String(
                                    fileAnalysisInfo.less_spent_value,
                                )}
                                description={FileAnalysisText.less_spent_value}
                            />
                        </div>
                    </>
                ) : (
                    <p className={styles.text}>Здесь появятся хайлайты</p>
                )}
            </div>
        </div>
    );
};

export default FileAnalysisPage;
