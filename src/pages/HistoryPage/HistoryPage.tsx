import Navbar from '../../components/Navbar/Navbar.tsx';
import styles from './HistoryPage.module.css';
import { useStore } from '../../store/store.ts';
import HistoryFileCard from '../../components/HistoryFileCard/HistoryFileCard.tsx';
import Button from '../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';

const HistoryPage = () => {
    const { files, deleteAllFiles } = useStore();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Navbar />
            {files.length > 0 ? (
                <div className={styles.list}>
                    {files &&
                        files.map((file, index) => (
                            <HistoryFileCard
                                key={file.fileName}
                                file={file}
                                index={index}
                            />
                        ))}
                    <div className={styles.row}>
                        <Button onClick={() => navigate(ROUTES.GENERATION)}>
                            Сгенерировать больше
                        </Button>
                        <Button color="secondary" onClick={deleteAllFiles}>
                            Очистить всё
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={styles.content}>
                    <p className={styles.text}>Сохранённых файлов нет</p>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
