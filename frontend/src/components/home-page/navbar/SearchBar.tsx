import { useState } from 'react';
import LoopIcon from './LoopIcon';
import classes from './navbar.module.css';
import Modal from '../../modals/Modal';
import { ModalType } from '../../../models/Modal';

const SearchBar = () => {
    const [showFilters, setShowFilters] = useState<boolean>(false);

    return (
        <>
            <div id={classes["search-bar"]} onClick={() => setShowFilters(true)}>
                <button id={classes["anywhere-button"]}>Anywhere</button>
                <button id={classes["anyweek-button"]}>Any week</button>
                <button id={classes["add-guests-button"]}>Add guests</button>
                <button id={classes["search-button"]}>
                    <LoopIcon />
                </button>
            </div>
            {showFilters && <Modal type={ModalType.FILTERS} onClose={() => setShowFilters(false)} />}
        </>
    );
}

export default SearchBar;