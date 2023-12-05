import { useRef } from 'react';
import { ListingCreationAction, ListingCreationActionType } from './ListingCreation';
import styles from './listing-creation.module.css';

type Props = {
    dispatch: React.Dispatch<ListingCreationAction>,
    description: string
}

const maxCharacters = 500;

const DescriptionSelection: React.FC<Props> = ({ dispatch, description }) => {
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    function handleDescriptionChange() {
        const value = descriptionRef.current?.value.trim();

        dispatch({
            type: ListingCreationActionType.UPDATE_DESCRIPTION,
            payload: value
        });
    }

    return (
        <>
            <h1>Create your description</h1>
            <div className={styles['text-area-wrapper']}>
                <textarea maxLength={maxCharacters} onChange={handleDescriptionChange} ref={descriptionRef} value={description} />
                <p>{`${description.length}/${maxCharacters}`}</p>
            </div>
        </>
    );
}

export default DescriptionSelection;