import { useContext, useEffect, useState } from 'react';
import NoTrips from './NoTrips';
import styles from './trips.module.css';
import Reservation from '../../models/Reservation';
import axios from 'axios';
import { backendUrl } from '../../global-proporties';
import { AuthContext } from '../../store/auth-context';
import toast from 'react-hot-toast';
import TripItem from './TripItem';

const MyTrips = () => {
    const [trips, setTrips] = useState<Reservation[]>([]);

    const authContext = useContext(AuthContext);

    useEffect(() => {
        const url = `${backendUrl}/reservations`;

        axios.get(url, {
            headers: {
                Authorization: `Bearer ${authContext.auth?.token}`
            }
        })
        .then(({ data }) => {
            setTrips(data);
        })
        .catch(() => {
            toast.error('Something went wrong!');
        })
    }, []);

    function handleCancel(id: number) {
        const url = `${backendUrl}/reservations/${id}`;

        axios.delete(url, {
            headers: {
                Authorization: `Bearer ${authContext.auth?.token}`
            }
        })
        .then(() => {
            setTrips(prevTrips => {
                const updatedTrips = [...prevTrips];

                const indexToRemove = updatedTrips.findIndex(trip => trip.id === id);

                updatedTrips.splice(indexToRemove, 1);

                return updatedTrips;
            });
        })
        .catch(() => {
            toast.error('Something went wrong!');
        });
    }

    return (
        <section id={styles['my-trips-section']}>
            <h1>Trips</h1>
            <hr />
            {trips.length === 0 && <NoTrips />}
            {trips.length > 0 && 
                <div className={styles['trips-list']}>
                    {trips.map(reservation =>
                        <TripItem key={reservation.id} trip={reservation} onCancel={handleCancel} />)}
                </div>
            }
        </section>
    );
}

export default MyTrips;