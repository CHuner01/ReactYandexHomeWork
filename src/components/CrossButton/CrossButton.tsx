import CrossIcon from '../../../public/CrossIcon.svg';
import styles from './CrossButton.module.css';

interface CrossButtonProps {
    onClick?: () => void;
}

const CrossButton = ({ onClick }: CrossButtonProps) => {
    return (
        <button onClick={onClick} className={styles.crossButton}>
            <img className={styles.crossIcon} src={CrossIcon} alt="icon" />
        </button>
    );
};

export default CrossButton;
