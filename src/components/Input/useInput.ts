import { type ChangeEvent, useRef } from 'react';
import { useStore } from '../../store/store.ts';

interface useInputProps {
    setIsDragOver: (value: boolean) => void;
}

const useInput = ({ setIsDragOver }: useInputProps) => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const {
        selectedFile,
        setSelectedFile,
        removeSelectedFile,
        removefileAnalysisInfo,
    } = useStore();

    const handleClick = () => {
        fileRef.current?.click();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const clearFile = () => {
        removeSelectedFile();
        removefileAnalysisInfo();
        if (fileRef.current) {
            fileRef.current.value = '';
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.name.endsWith('.csv')) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    return {
        selectedFile,
        handleClick,
        handleChange,
        clearFile,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        fileRef,
    };
};

export default useInput;
