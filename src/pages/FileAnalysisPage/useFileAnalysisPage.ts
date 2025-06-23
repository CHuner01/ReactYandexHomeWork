import { useStore } from '../../store/store.ts';
import { useState } from 'react';

const useFileAnalysisPage = () => {
    const {
        selectedFile,
        analyzeFile,
        fileAnalysisInfo,
        isAnalysisLoading,
        isAnalysisError,
        addFile,
    } = useStore();

    const [isDragOver, setIsDragOver] = useState(false);

    const isInputSuccess =
        !isAnalysisLoading && !isAnalysisError && !!fileAnalysisInfo;

    const isButtonVisible =
        !isAnalysisLoading && !isAnalysisError && !fileAnalysisInfo;

    const onClickButton = async () => {
        await analyzeFile(selectedFile);

        const latestInfo = useStore.getState().fileAnalysisInfo;
        if (!selectedFile) {
            return;
        }
        const localizedDate = new Date().toLocaleDateString();
        if (latestInfo) {
            addFile({
                fileName: selectedFile.name,
                fileDate: localizedDate,
                fileInfo: latestInfo,
                isSuccessful: true,
            });
        } else {
            addFile({
                fileName: selectedFile.name,
                fileDate: localizedDate,
                fileInfo: null,
                isSuccessful: false,
            });
        }
    };

    return {
        selectedFile,
        fileAnalysisInfo,
        isAnalysisLoading,
        isAnalysisError,
        isDragOver,
        setIsDragOver,
        isInputSuccess,
        isButtonVisible,
        onClickButton,
    };
};

export default useFileAnalysisPage;
