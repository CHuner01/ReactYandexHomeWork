import { useStore } from '../../store/store.ts';
import Navbar from '../../components/Navbar/Navbar.tsx';

const FileGenerationPage = () => {
    const generateFile = useStore((store) => store.generateFile);

    return (
        <div>
            <Navbar />
            <button onClick={generateFile}>Сгенерировать</button>
        </div>
    );
};

export default FileGenerationPage;
