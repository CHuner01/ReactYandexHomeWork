import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes.ts';

const Navbar = () => {
    return (
        <div>
            <p>Аналитика</p>
            <Link to={ROUTES.ANALYSIS}>CSV Аналитик</Link>
            <Link to={ROUTES.GENERATION}>CSV Генератор</Link>
            <Link to={ROUTES.HISTORY}>История</Link>
        </div>
    );
};

export default Navbar;
