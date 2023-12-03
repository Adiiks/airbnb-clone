import { Link } from 'react-router-dom';
import styles from './listing-creation.module.css';
import { FaAirbnb } from "react-icons/fa";

const ListingCreationNavbar = () => {
    return (
        <header id={styles['listing-creation-header']}>
            <Link to={'/'}>
                <FaAirbnb size={35} id={styles["logo"]} />
            </Link>
        </header>
    );
}

export default ListingCreationNavbar;