export default interface ListingCreationState {
    currentStep: number,
    nextStepEnable: boolean,
    categoryId?: number
}

export enum STEPS {
    CATEGORY = 1
}