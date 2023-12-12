import React, { useContext, useMemo, useState } from 'react';
import styles from './listing.module.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Reservation from '../../models/Reservation';
import { eachDayOfInterval, formatISO, isEqual, isValid } from 'date-fns';
import CounterInput from '../listing-creation/steps-selection/CounterInput';
import { CounterAction } from '../listing-creation/steps-selection/BasicInformationSelection';
import { AuthContext } from '../../store/auth-context';
import axios from 'axios';
import { backendUrl } from '../../global-proporties';
import toast from 'react-hot-toast';

type Props = {
    price: number,
    reservations: Reservation[],
    maxGuests: number,
    listingId: number
}

const initialReservation: Reservation = {
    totalGuests: 1,
    totalPrice: 0
}

const Reserve: React.FC<Props> = ({ price, reservations = [], maxGuests, listingId }) => {
    const [reservation, setReservation] = useState<Reservation>(initialReservation);

    const authContext = useContext(AuthContext);

    const unavailableDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach(reservation => {
            const datesRange = eachDayOfInterval({
                start: new Date(reservation.checkInDate!),
                end: new Date(reservation.checkoutDate!)
            });

            dates = [...dates, ...datesRange]
        });

        return dates;
    }, [reservations]);

    function isDateUnavailable(date: Date) {
        const foundDate = unavailableDates.find(dateItem => isEqual(date, dateItem) === true);

        return foundDate ? true : false;
    }

    function formatDate(date: Date) {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    function handleDateSelection(value: any) {
        const checkIn: Date = value[0];
        const checkout: Date = value[1];

        const datesDiffrence = checkout.getTime() - checkIn.getTime();
        const days = Math.round(datesDiffrence / (1000 * 3600 * 24));
        const totalPrice = price * days;

        setReservation({
            ...reservation,
            checkInDate: checkIn,
            checkoutDate: checkout,
            totalPrice: totalPrice
        });
    }

    function handleGuestsChange(action: CounterAction) {
        setReservation(reservation => {
            let totalGuests = reservation.totalGuests!;
            switch (action) {
                case CounterAction.INCREASE: {
                    totalGuests++;
                    break;
                }
                case CounterAction.DECREASE: {
                    totalGuests--;
                    break;
                }
            }

            return {
                ...reservation,
                totalGuests: totalGuests
            }
        })
    }

    function handleReserveClick() {
        const url = `${backendUrl}/reservations`;

        const data = {
            checkInDate: formatISO(reservation.checkInDate!, { representation: 'date' }),
            checkoutDate: formatISO(reservation.checkoutDate!, { representation: 'date' }),
            totalGuests: reservation.totalGuests,
            listingId: listingId
        }

        axios.post(url, data, {
            'headers': {
                'Authorization': `Bearer ${authContext.auth?.token}`
            }
        })
        .then(() => {
            //REDIRECT TO RESERVATIONS
        })
        .catch(() => {
            toast.error('Selected dates are unavailable!');
        });
    }

    return (
        <div className={styles["reserve-card"]}>
            <p>
                <span className={styles.price}>
                    {`${price?.toLocaleString(navigator.language)} zł `}
                </span>
                night
            </p>
            <Calendar
                className={styles.calendar}
                minDate={new Date()}
                selectRange={true}
                tileDisabled={({ date }) => isDateUnavailable(date)}
                onChange={(value) => handleDateSelection(value)}
            />
            {reservation.checkInDate !== undefined &&
                <>
                    <div className={styles['reservation-dates-container']}>
                        <div className={styles['date-wrapper']}>
                            <span className={styles['date-label']}>CHECK-IN</span>
                            <p>{formatDate(reservation.checkInDate!)}</p>
                        </div>
                        <div className={styles['date-wrapper']}>
                            <span className={styles['date-label']}>CHECKOUT</span>
                            <p>{formatDate(reservation.checkoutDate!)}</p>
                        </div>
                    </div>
                    <CounterInput
                        title={'Guests'}
                        defaultValue={reservation.totalGuests!}
                        minValue={1}
                        maxValue={maxGuests}
                        onCounterChange={handleGuestsChange}
                    />
                    <button
                        className={styles["reserve-btn"]}
                        disabled={authContext.auth === null}
                        onClick={handleReserveClick}
                    >
                        Reserve
                    </button>
                    <hr />
                    <div className={styles['total-price-container']}>
                        <p>Total</p>
                        <p>{`${reservation.totalPrice?.toLocaleString(navigator.language)} zł `}</p>
                    </div>
                </>
            }
        </div>
    );
}

export default Reserve;