import { useMemo, useRef } from 'react';
import styles from './listing-creation.module.css';
import { getNames } from 'country-list';
import { ListingCreationAction, ListingCreationActionType } from './ListingCreation';
import Address from '../../models/Address';

type Props = {
    dispatch: React.Dispatch<ListingCreationAction>,
}

const LocationSelection: React.FC<Props> = ({ dispatch }) => {
    const countryRef = useRef<HTMLSelectElement>(null);
    const streetAddressRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    
    const countriesOptions = useMemo(() =>
        getNames().map(country =>
            <option key={country} value={country}>
                {country}
            </option>)
        ,[]);

    function handleInputsChange() {
        const streetAddress = streetAddressRef.current?.value.trim();
        const postalCode = postalCodeRef.current?.value.trim();
        const city = cityRef.current?.value.trim();

        if (!streetAddress || !postalCode || !city) {
            dispatch({ type: ListingCreationActionType.BLOCK_NEXT_BTN });
            return;
        }

        const address: Address = {
            country: countryRef.current?.value!,
            streetAddress: streetAddress,
            postalCode: postalCode,
            city: city
        }

        dispatch({
            type: ListingCreationActionType.UPDATE_ADDRESS,
            payload: address
        });
    }

    return (
        <>
            <h1>Where's your place located?</h1>
            <div id={styles['location-selection-form']} onChange={handleInputsChange}>
                <div className={styles['input-wrapper']}>
                    <select
                        id='country'
                        placeholder=''
                        defaultValue={'Poland'}
                        ref={countryRef}
                    >
                        {countriesOptions}
                    </select>
                    <label htmlFor="country">Country</label>
                </div>
                <div className={styles['input-wrapper']}>
                    <input
                        id='street-address'
                        type="text"
                        placeholder=''
                        ref={streetAddressRef}
                    />
                    <label htmlFor="street-address">Street address</label>
                </div>
                <div className={styles['input-wrapper']}>
                    <input
                        id='postal-code'
                        type="text"
                        placeholder=''
                        ref={postalCodeRef}
                    />
                    <label htmlFor="postal-code">Postal code</label>
                </div>
                <div className={styles['input-wrapper']}>
                    <input
                        id='city'
                        type="text"
                        placeholder=''
                        ref={cityRef}
                    />
                    <label htmlFor="city">City</label>
                </div>
            </div>
        </>
    );
}

export default LocationSelection;