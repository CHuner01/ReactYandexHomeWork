import type { FileInfo } from '../../config/types.ts';
import InfoCard from '../InfoCard/InfoCard.tsx';
import { FileAnalysisText } from '../../config/constants.ts';
import styles from './Dialog.module.css';
import { createPortal } from 'react-dom';

interface DialogProps {
    fileInfo: FileInfo;
    onClose: () => void;
}

const Dialog = ({ fileInfo, onClose }: DialogProps) => {
    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content}>
                <InfoCard
                    title={String(fileInfo.total_spend_galactic)}
                    description={FileAnalysisText.total_spend_galactic}
                    isDialog={true}
                />
                <InfoCard
                    title={String(fileInfo.rows_affected)}
                    description={FileAnalysisText.rows_affected}
                    isDialog={true}
                />
                <InfoCard
                    title={String(fileInfo.less_spent_at)}
                    description={FileAnalysisText.less_spent_at}
                    isDialog={true}
                />
                <InfoCard
                    title={String(fileInfo.big_spent_at)}
                    description={FileAnalysisText.big_spent_at}
                    isDialog={true}
                />
                <InfoCard
                    title={String(fileInfo.big_spent_civ)}
                    description={FileAnalysisText.big_spent_civ}
                    isDialog={true}
                />
                <InfoCard
                    title={fileInfo.less_spent_civ}
                    description={FileAnalysisText.less_spent_civ}
                    isDialog={true}
                />
                <InfoCard
                    title={String(fileInfo.big_spent_value)}
                    description={FileAnalysisText.big_spent_value}
                    isDialog={true}
                />
                <InfoCard
                    title={String(fileInfo.less_spent_value)}
                    description={FileAnalysisText.less_spent_value}
                    isDialog={true}
                />
                <InfoCard
                    title={String(fileInfo.average_spend_galactic)}
                    description={FileAnalysisText.average_spend_galactic}
                    isDialog={true}
                />
            </div>
        </div>,
        document.body,
    );
};

export default Dialog;
