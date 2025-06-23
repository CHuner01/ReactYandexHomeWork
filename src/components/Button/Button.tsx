import type { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children?: ReactNode;
    isActive?: boolean;
    onClick?: () => void;
}

const Button = ({ children, isActive = true, onClick }: ButtonProps) => {
    return (
        <>
            <button
                onClick={onClick}
                className={`${styles.button} ${isActive ? '' : styles.isDisabled}`}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
