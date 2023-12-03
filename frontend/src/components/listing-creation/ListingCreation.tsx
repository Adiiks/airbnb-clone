import { useReducer } from 'react';
import ListingCreationState, { STEPS } from '../../models/ListingCreationState';
import ListingCreationFooter from './ListingCreationFooter';
import ListingCreationNavbar from './ListingCreationNavbar';
import styles from './listing-creation.module.css';
import { useNavigate } from 'react-router-dom';
import CategorySelection from './CategorySelection';

export type ListingCreationAction = {
    type: ListingCreationActionType,
    payload?: any
}

const initialListingCreationState: ListingCreationState = {
    currentStep: STEPS.CATEGORY,
    nextStepEnable: false
}

function reducer(state: ListingCreationState, action: ListingCreationAction) {
    const { type, payload } = action;

    switch (type) {
        case ListingCreationActionType.UPDATE_CATEGORY_ID: {
            return {
                ...state,
                nextStepEnable: true,
                categoryId: payload
            }
        }
        case ListingCreationActionType.GO_PREV_STEP: {
            return {
                ...state,
                currentStep: state.currentStep - 1
            }
        }
        case ListingCreationActionType.GO_NEXT_STEP: {
            const enableNextBtn = isNextStepVisited(state);

            return {
                ...state,
                currentStep: state.currentStep + 1,
                nextStepEnable: enableNextBtn
            }
        }
    }
}

function isNextStepVisited(state: ListingCreationState) {
    //TODO

    return false;
}

const ListingCreation = () => {
    const [listingCreationState, dispatch] = useReducer(reducer, initialListingCreationState);

    const navigate = useNavigate();

    function handleBackClick() {
        if (listingCreationState.currentStep === STEPS.CATEGORY) {
            return navigate('/');
        }

        dispatch({ type: ListingCreationActionType.GO_PREV_STEP });
    }

    return (
        <div id={styles['listing-creation-container']}>
            <ListingCreationNavbar />
            {
                listingCreationState.currentStep === STEPS.CATEGORY && 
                <CategorySelection dispatch={dispatch} selectedCategoryId={listingCreationState.categoryId} />
            }
            <ListingCreationFooter currentStep={listingCreationState.currentStep} nextBtnEnable={listingCreationState.nextStepEnable} onBack={handleBackClick} />
        </div>
    );
}

export default ListingCreation;

export enum ListingCreationActionType {
    GO_PREV_STEP,
    GO_NEXT_STEP,
    UPDATE_CATEGORY_ID
}
