import { useRef } from 'react';
import { ListingCreationAction, ListingCreationActionType } from '../ListingCreation';
import styles from '../listing-creation.module.css';

type Props = {
    dispatch: React.Dispatch<ListingCreationAction>,
    title: string
}

const maxCharacters = 32;

const TitleSelection: React.FC<Props> = ({ dispatch, title }) => {
    const titleRef = useRef<HTMLTextAreaElement>(null);

    function handleTitleChange() {
        const value = titleRef.current?.value.trim();

        dispatch({
            type: ListingCreationActionType.UPDATE_TITLE,
            payload: value
        });
    }

    return (
        <>
            <h1>Now, let's give your house a title</h1>
            <div className={styles['text-area-wrapper']}>
                <textarea className={styles['text-area-short']} maxLength={maxCharacters} onChange={handleTitleChange} ref={titleRef} value={title} />
                <p>{`${title ? title.length : 0}/${maxCharacters}`}</p>
            </div>
        </>
    );
}

export default TitleSelection;