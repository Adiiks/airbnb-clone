import ListingBasicInfo from '../../models/ListingBasicInfo';
import CounterInput from './CounterInput';
import { ListingCreationAction, ListingCreationActionType } from './ListingCreation';
import styles from './listing-creation.module.css';

type Props = {
    defaultVaulues: ListingBasicInfo,
    dispatch: React.Dispatch<ListingCreationAction>
}

const BasicInformationSelection: React.FC<Props> = ({ defaultVaulues, dispatch }) => {
    
    function handleCounterChange(action: CounterAction, counterTitle: string) {
        switch(counterTitle) {
            case 'Guests': {
                dispatch({
                    type: ListingCreationActionType.UPDATE_BASIC_INFO,
                    payload: {
                        maxGuests: (action === CounterAction.INCREASE) ? defaultVaulues.maxGuests + 1 : defaultVaulues.maxGuests - 1
                    }
                });
                break;
            }
            case 'Bedrooms': {
                dispatch({
                    type: ListingCreationActionType.UPDATE_BASIC_INFO,
                    payload: {
                        totalBedrooms: (action === CounterAction.INCREASE) ? defaultVaulues.totalBedrooms + 1 : defaultVaulues.totalBedrooms - 1
                    }
                });
                break;
            }
            case 'Beds': {
                dispatch({
                    type: ListingCreationActionType.UPDATE_BASIC_INFO,
                    payload: {
                        totalBeds: (action === CounterAction.INCREASE) ? defaultVaulues.totalBeds + 1 : defaultVaulues.totalBeds - 1
                    }
                });
                break;
            }
            case 'Bathrooms': {
                dispatch({
                    type: ListingCreationActionType.UPDATE_BASIC_INFO,
                    payload: {
                        totalBathrooms: (action === CounterAction.INCREASE) ? defaultVaulues.totalBathrooms + 1 : defaultVaulues.totalBathrooms - 1
                    }
                });
                break;
            }
        }
    }

    return (
        <>
            <h1>Share some basics about your place</h1>
            <div id={styles['basic-info-selection-container']}>
                <CounterInput title='Guests' defaultValue={defaultVaulues.maxGuests} minValue={1} onCounterChange={handleCounterChange} />
                <hr />
                <CounterInput title='Bedrooms' defaultValue={defaultVaulues.totalBedrooms} minValue={0} onCounterChange={handleCounterChange} />
                <hr />
                <CounterInput title='Beds' defaultValue={defaultVaulues.totalBeds} minValue={1} onCounterChange={handleCounterChange} />
                <hr />
                <CounterInput title='Bathrooms' defaultValue={defaultVaulues.totalBathrooms} minValue={1} onCounterChange={handleCounterChange} />
            </div>
        </>
    );
}

export default BasicInformationSelection;

export enum CounterAction {
    INCREASE,
    DECREASE
}