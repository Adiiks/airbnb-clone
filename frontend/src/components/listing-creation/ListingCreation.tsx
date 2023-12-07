import { useContext, useReducer, useState } from 'react';
import ListingCreationState, { STEPS } from '../../models/ListingCreationState';
import ListingCreationFooter from './ListingCreationFooter';
import ListingCreationNavbar from './ListingCreationNavbar';
import styles from './listing-creation.module.css';
import { useNavigate } from 'react-router-dom';
import CategorySelection from './steps-selection/CategorySelection';
import LocationSelection from './steps-selection/LocationSelection';
import BasicInformationSelection from './steps-selection/BasicInformationSelection';
import ImageSelection from './steps-selection/ImageSelection';
import DescriptionSelection from './steps-selection/DescriptionSelection';
import TitleSelection from './steps-selection/TitleSelection';
import PriceSelection from './steps-selection/PriceSelection';
import axios from 'axios';
import { AuthContext } from '../../store/auth-context';
import Listing from '../../models/Listing';
import { backendUrl } from '../../global-proporties';
import toast from 'react-hot-toast';

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
    },
    description: 'You will have a great time at this comfortable place to stay.',
    price: 120
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
        case ListingCreationActionType.UPDATE_TITLE: {
            const nextStepEnable = payload ? true : false;

            return {
                ...state,
                title: payload,
                nextStepEnable: nextStepEnable
            }
        }
        case ListingCreationActionType.UPDATE_DESCRIPTION: {
            const nextStepEnable = payload ? true : false;

            return {
                ...state,
                description: payload,
                nextStepEnable: nextStepEnable
            }
        }
        case ListingCreationActionType.UPDATE_PRICE: {
            return {
                ...state,
                price: payload,
                nextStepEnable: true
            }
        }
        case ListingCreationActionType.GO_PREV_STEP: {
            const nextStepEnable = isNextStepEnable(state, true);

            return {
                ...state,
                currentStep: state.currentStep - 1,
                nextStepEnable: nextStepEnable
            }
        }
        case ListingCreationActionType.GO_NEXT_STEP: {
            const nextStepEnable = isNextStepEnable(state, false);

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

function isNextStepEnable(state: ListingCreationState, isGoToPevStep: boolean) {
    // GOING FORWARD
    if (!isGoToPevStep && state.currentStep + 1 === STEPS.BASIC_INFO) return true;
    
    if (!isGoToPevStep && state.currentStep + 1 === STEPS.IMAGE && state.image) return true;

    if (!isGoToPevStep && state.currentStep + 1 === STEPS.TITLE && state.title) return true;

    if (!isGoToPevStep && state.currentStep + 1 === STEPS.DESCRIPTION && state.description) return true;

    if (!isGoToPevStep && state.currentStep + 1 === STEPS.PRICE) return true;

    // GOING BACK
    if (isGoToPevStep && state.currentStep - 1 !== STEPS.LOCATION) return true;

    return false;
}

const ListingCreation = () => {
    const [listingCreationState, dispatch] = useReducer(reducer, initialListingCreationState);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    function handleBackClick() {
        if (listingCreationState.currentStep === STEPS.CATEGORY) {
            return navigate('/');
        }

        dispatch({ type: ListingCreationActionType.GO_PREV_STEP });
    }

    function handleCreateClick() {
        setIsLoading(true);

        const listingToCreate: Listing = {
            categoryId: listingCreationState.categoryId,
            address: listingCreationState.address,
            listingDetails: listingCreationState.basicInfo,
            title: listingCreationState.title,
            description: listingCreationState.description,
            price: listingCreationState.price
        }
        
        const stringBody = JSON.stringify(listingToCreate);
        const blobBody = new Blob([stringBody], {
            type: 'application/json'
        });

        const formData = new FormData();
        formData.append('file', listingCreationState.image);
        formData.append('listing', blobBody)

        const url = backendUrl + '/listings';

        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${authContext.auth?.token}`
            }
        })
        .then(() => {
            navigate('/');
        })
        .catch(() => {
            toast.error('Something went wrong!');
        })
        .finally(() => {
            setIsLoading(false);
        });
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
                {
                    listingCreationState.currentStep === STEPS.TITLE &&
                    <TitleSelection dispatch={dispatch} title={listingCreationState.title} />
                }
                {
                    listingCreationState.currentStep === STEPS.DESCRIPTION &&
                    <DescriptionSelection dispatch={dispatch} description={listingCreationState.description} />
                }
                {
                    listingCreationState.currentStep === STEPS.PRICE &&
                    <PriceSelection dispatch={dispatch} price={listingCreationState.price} />
                }
            </div>
            <ListingCreationFooter
                currentStep={listingCreationState.currentStep}
                nextBtnEnable={listingCreationState.nextStepEnable}
                onBack={handleBackClick}
                dispatch={dispatch}
                onCreate={handleCreateClick}
                isLoading={isLoading}
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
    DELETE_IMAGE,
    UPDATE_TITLE,
    UPDATE_DESCRIPTION,
    UPDATE_PRICE
}
