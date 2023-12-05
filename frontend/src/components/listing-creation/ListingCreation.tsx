import { useReducer } from 'react';
import ListingCreationState, { STEPS } from '../../models/ListingCreationState';
import ListingCreationFooter from './ListingCreationFooter';
import ListingCreationNavbar from './ListingCreationNavbar';
import styles from './listing-creation.module.css';
import { useNavigate } from 'react-router-dom';
import CategorySelection from './CategorySelection';
import LocationSelection from './LocationSelection';
import BasicInformationSelection from './BasicInformationSelection';
import ImageSelection from './ImageSelection';

export type ListingCreationAction = {
    type: ListingCreationActionType,
    payload?: any
}

const initialListingCreationState: ListingCreationState = {
    currentStep: STEPS.CATEGORY,
    nextStepEnable: false,
    basicInfo: {
        maxGuests: 4,
        totalBedrooms: 1,
        totalBeds: 1,
        totalBathrooms: 1
    }
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
        case ListingCreationActionType.UPDATE_ADDRESS: {
            return {
                ...state,
                nextStepEnable: true,
                address: payload
            }
        }
        case ListingCreationActionType.UPDATE_BASIC_INFO: {
            return {
                ...state,
                basicInfo: {
                    ...state.basicInfo,
                    ...payload
                }
            }
        }
        case ListingCreationActionType.ADD_IMAGE: {
            return {
                ...state,
                nextStepEnable: true,
                image: payload
            }
        }
        case ListingCreationActionType.DELETE_IMAGE: {
            const updatedState = {
                ...state,
                nextStepEnable: false
            }

            delete updatedState.image;

            return updatedState;
        }
        case ListingCreationActionType.GO_PREV_STEP: {
            const nextStepEnable = (state.currentStep - 1 === STEPS.LOCATION) ? false : true;

            return {
                ...state,
                currentStep: state.currentStep - 1,
                nextStepEnable: nextStepEnable
            }
        }
        case ListingCreationActionType.GO_NEXT_STEP: {
            const nextStepEnable = isNextStepEnable(state);

            return {
                ...state,
                currentStep: state.currentStep + 1,
                nextStepEnable: nextStepEnable
            }
        }
        case ListingCreationActionType.BLOCK_NEXT_BTN: {
            return {
                ...state,
                nextStepEnable: false
            }
        }
    }
}

function isNextStepEnable(state: ListingCreationState) {
    if (state.currentStep + 1 === STEPS.BASIC_INFO) return true;
    
    if (state.currentStep + 1 === STEPS.IMAGE && state.image) return true;

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
            <div id={styles['selection-container']} className={(listingCreationState.currentStep !== STEPS.CATEGORY) ? styles['center-content-vertical'] : ''}>
                {
                    listingCreationState.currentStep === STEPS.CATEGORY &&
                    <CategorySelection dispatch={dispatch} selectedCategoryId={listingCreationState.categoryId} />
                }
                {
                    listingCreationState.currentStep === STEPS.LOCATION &&
                    <LocationSelection dispatch={dispatch} />
                }
                {
                    listingCreationState.currentStep === STEPS.BASIC_INFO &&
                    <BasicInformationSelection defaultVaulues={listingCreationState.basicInfo} dispatch={dispatch} />
                }
                {
                    listingCreationState.currentStep === STEPS.IMAGE &&
                    <ImageSelection dispatch={dispatch} image={listingCreationState.image} />
                }
            </div>
            <ListingCreationFooter
                currentStep={listingCreationState.currentStep}
                nextBtnEnable={listingCreationState.nextStepEnable}
                onBack={handleBackClick}
                dispatch={dispatch}
            />
        </div>
    );
}

export default ListingCreation;

export enum ListingCreationActionType {
    GO_PREV_STEP,
    GO_NEXT_STEP,
    BLOCK_NEXT_BTN,
    UPDATE_CATEGORY_ID,
    UPDATE_ADDRESS,
    UPDATE_BASIC_INFO,
    ADD_IMAGE,
    DELETE_IMAGE
}
