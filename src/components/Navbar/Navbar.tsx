import {Link, useLocation} from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';
import SchoolLogo from "../../../public/SchoolLogo.svg"
import Title from "../../../public/TitleLogo.svg"
import styles from "./Navbar.module.css"


const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <img src={SchoolLogo} alt="logo" width={250} />
                <img src={Title} alt="logo" width={350} />
            </div>
            <div className={styles.row}>
                <Link className={`${styles.text} ${currentPath === ROUTES.ANALYSIS ? styles.underline : ""}`}
                      to={ROUTES.ANALYSIS}>CSV Аналитик</Link>
                <Link className={`${styles.text} ${currentPath === ROUTES.GENERATION ? styles.underline : ""}`}
                      to={ROUTES.GENERATION}>CSV Генератор</Link>
                <Link className={`${styles.text} ${currentPath === ROUTES.HISTORY ? styles.underline : ""}`}
                      to={ROUTES.HISTORY}>История</Link>
            </div>
        </div>
    );
};

export default Navbar;
