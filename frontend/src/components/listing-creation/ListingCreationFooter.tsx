import { ListingCreationAction, ListingCreationActionType } from './ListingCreation';
import styles from './listing-creation.module.css';
import React from 'react';

type Props = {
    currentStep: number,
    nextBtnEnable: boolean,
    onBack: () => void,
    dispatch: React.Dispatch<ListingCreationAction>,
}

const ListingCreationFooter: React.FC<Props> = ({ currentStep, nextBtnEnable, onBack, dispatch }) => {
    return (
        <footer id={styles['listing-creation-footer']}>
            <button id={styles['back-btn']} className={styles['listing-creation-btn']} onClick={onBack}>Back</button>
            <p id={styles['steps']}>{`Steps ${currentStep}/3`}</p>
            <button
                id={styles['next-btn']}
                className={styles['listing-creation-btn']}
                onClick={() => dispatch({ type: ListingCreationActionType.GO_NEXT_STEP })}
                disabled={!nextBtnEnable}
            >
                Next
            </button>
        </footer>
    );
}

export default ListingCreationFooter;