import { Address } from "cluster";
import ListingBasicInfo from "./ListingBasicInfo";

export default interface ListingCreationState {
    currentStep: number,
    nextStepEnable: boolean,
    categoryId?: number,
    address?: Address,
    basicInfo: ListingBasicInfo
}

export enum STEPS {
    CATEGORY = 1,
    LOCATION = 2,
    BASIC_INFO = 3
}