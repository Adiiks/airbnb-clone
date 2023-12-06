import { useState } from 'react';
import { ListingCreationAction, ListingCreationActionType } from '../ListingCreation';
import styles from '../listing-creation.module.css';
import CurrencyInput from 'react-currency-input-field';

type Props = {
    dispatch: React.Dispatch<ListingCreationAction>,
    price: number
}

const errorMessage = 'Please enter a price between  40 zł and  39,989 zł.';

const PriceSelection: React.FC<Props> = ({ dispatch, price }) => {
    const [error, setError] = useState<string>('');

    function handlePriceChange(newPrice: string | undefined) {
        if (!newPrice || +newPrice < 40 || +newPrice > 39989) {
            setError(errorMessage);
            dispatch({ type: ListingCreationActionType.BLOCK_NEXT_BTN });
            return;
        }

        dispatch({
            type: ListingCreationActionType.UPDATE_PRICE,
            payload: newPrice
        });
    }

    return (
        <>
            <h1>Now, set your price</h1>
            <CurrencyInput 
                allowDecimals={false}
                allowNegativeValue={false}
                defaultValue={price}
                onValueChange={(newPrice) => handlePriceChange(newPrice)}
                prefix='zł'
                groupSeparator=','
                decimalSeparator='.'
                maxLength={5}
                className={styles['currency-input']}
            />
            {error && <p>{errorMessage}</p>}
        </>
    );
}

export default PriceSelection;