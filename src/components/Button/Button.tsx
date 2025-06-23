import type { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children?: ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    color?: 'primary' | 'secondary';
}

const Button = ({
    children,
    isActive = true,
    onClick,
    color = 'primary',
}: ButtonProps) => {
    return (
        <>
            <button
                onClick={onClick}
                className={`${styles.button} ${isActive ? '' : styles.isDisabled} ${color === 'secondary' ? styles.black : ''}`}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
