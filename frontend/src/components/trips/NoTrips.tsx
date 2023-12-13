import { Link } from 'react-router-dom';
import styles from './trips.module.css';

const NoTrips = () => {
    return (
        <div className={styles['no-trips-container']}>
            <h2>No trips booked...yet!</h2>
            <p>Time to dust off your bags and start planning your next adventure</p>
            <button>
                <Link to={'/'}>Start searching</Link>
            </button>
        </div>
    );
}

export default NoTrips;