import { Address } from "cluster";

export default interface ListingCreationState {
    currentStep: number,
    nextStepEnable: boolean,
    categoryId?: number,
    address?: Address
}

export enum STEPS {
    CATEGORY = 1,
    LOCATION = 2
}