import type { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children?: ReactNode;
    isActive?: boolean;
}

const Button = ({ children, isActive = true }: ButtonProps) => {
    return (
        <>
            <button
                className={`${styles.button} ${isActive ? '' : styles.isDisabled}`}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
