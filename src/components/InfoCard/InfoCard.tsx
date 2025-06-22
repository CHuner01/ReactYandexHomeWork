import styles from './InfoCard.module.css';

interface InfoCardProps {
    title: string;
    description: string;
    isDialog?: boolean;
}

const InfoCard = ({ title, description, isDialog = false }: InfoCardProps) => {
    return (
        <div
            className={`${styles.container} ${isDialog ? styles.containerPurple : styles.containerWhite}`}
        >
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default InfoCard;
