import { useRef } from 'react';
import styles from './listing-creation.module.css';
import { IoImagesOutline } from "react-icons/io5";
import { ListingCreationAction, ListingCreationActionType } from './ListingCreation';

type Props = {
    dispatch: React.Dispatch<ListingCreationAction>,
    image: File
}

const ImageSelection: React.FC<Props> = ({ dispatch, image }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const imageSrc = image ? URL.createObjectURL(image) : null;

    function handleImageSelected() {
        dispatch({
            type: ListingCreationActionType.ADD_IMAGE,
            payload: inputRef.current?.files![0]
        });
    }

    return (
        <>
            <h1>Add a photo of your apartment</h1>
            <div id={styles['image-selection-container']}>
                {!imageSrc &&
                    <div className={styles['image-input-wrapper']}>
                        <IoImagesOutline size={64} />
                        <div className={styles['image-uploader']}>
                            <input
                                type="file"
                                accept=".png, .jpg"
                                onChange={handleImageSelected}
                                ref={inputRef}
                            />
                            <button onClick={() => inputRef.current?.click()}>Upload from your device</button>
                        </div>
                    </div>
                }
                {imageSrc &&
                    <div className={styles['image-container']}>
                        <img src={imageSrc} alt='photo of my location' />
                        <button onClick={() => dispatch({ type: ListingCreationActionType.DELETE_IMAGE })}>Delete</button>
                    </div>
                }
            </div>
        </>
    );
}

export default ImageSelection;