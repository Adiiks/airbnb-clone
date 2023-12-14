import React, { useContext, useMemo, useState } from 'react';
import styles from './modals.module.css';
import { FiltersContext } from '../../store/filters-context';
import { getNames } from 'country-list';
import Calendar from 'react-calendar';
import CounterInput from '../listing-creation/steps-selection/CounterInput';
import Filters from '../../models/Filters';
import { formatISO } from 'date-fns';
import { CounterAction } from '../listing-creation/steps-selection/BasicInformationSelection';

type Props = {
    onClose: () => void
}

const FiltersModalBody: React.FC<Props> = ({ onClose }) => {
    const filtersContext = useContext(FiltersContext);

    const [filters, setFilters] = useState<Filters | null>(filtersContext.filters);

    const countriesOptions = useMemo(() => {
        const options = getNames().map(country =>
            <option key={country} value={country}>
                {country}
            </option>);
        const defaultOption = <option key={'default'}></option>

        return [defaultOption, options];
    }, []);

    function handleCountrySelected(country: string) {
        setFilters({
            ...filters,
            country: country
        });
    }

    function handleDatesSelected(value: any) {
        const checkIn = formatISO(value[0], { representation: 'date' });
        const checkout = formatISO(value[1], { representation: 'date' });
        
        setFilters({
            ...filters,
            checkInDate: checkIn,
            checkoutDate: checkout
        });
    }

    function handleGuestsChange(action: CounterAction) {
        setFilters(prevFilters => {
            let totalGuest = prevFilters?.totalGuests ? prevFilters.totalGuests : 1;

            switch(action) {
                case CounterAction.DECREASE: {
                    totalGuest--;
                    break;
                }
                case CounterAction.INCREASE: {
                    totalGuest++;
                    break;
                }
            }

            return {
                 ...prevFilters,
                 totalGuests: totalGuest   
            }
        });
    }

    function handleSearchClick() {
        filtersContext.setFilters({ ...filters });
        onClose();
    }

    return (
        <>
            <h2>Country</h2>
            <select
                id={'country-input'}
                className={styles['countries-selection']}
                value={filters?.country ? filters.country : ''}
                onChange={(event) => handleCountrySelected(event.target.value)}
            >
                {countriesOptions}
            </select>
            <hr />
            <h2>Check-In / Checkout</h2>
            <div className={styles['calendar-container']}>
                <Calendar
                    className={styles.calendar}
                    value={filters?.checkInDate ? [new Date(filters.checkInDate), new Date(filters.checkoutDate!)] : null}
                    minDate={new Date()}
                    selectRange={true}
                    onChange={(value) => handleDatesSelected(value)}
                />
            </div>
            <hr />
            <h2>Total guests</h2>
            <CounterInput
                title={'Guests'}
                defaultValue={filters?.totalGuests ? filters.totalGuests : 1}
                minValue={1}
                onCounterChange={handleGuestsChange}
            />
            <hr />
            <div className={styles['filters-footer']}>
                <button className={styles['clear-btn']} onClick={() => setFilters(null)}>Clear all</button>
                <button className={styles['search-btn']} onClick={handleSearchClick}>Search</button>
            </div>
        </>
    );
}

export default FiltersModalBody;