import React from 'react';
import Reservation from '../../models/Reservation';
import styles from './trips.module.css';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';

type Props = {
    trip: Reservation,
    onCancel: (reservationId: number) => void
}

const TripItem: React.FC<Props> = ({ trip, onCancel }) => {
    const navigate = useNavigate();

    function formatDate(date: Date) {
        const dateFormatted = new Date(date);
        return format(dateFormatted, 'PP');
    }

    return (
        <div className={styles['trip-item']}>
            <img src={trip.imageUrl} alt="listing" onClick={() => navigate(`/listing/${trip.listingId}`)} />
            <p><strong>{`${trip.address?.city}, ${trip.address?.country}`}</strong></p>
            <p>{`${formatDate(trip.checkInDate!)} - ${formatDate(trip.checkoutDate!)}`}</p>
            <button onClick={() => onCancel(trip.id!)}>Cancel</button>
        </div>
    );
}

export default TripItem;