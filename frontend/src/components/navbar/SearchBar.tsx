import LoopIcon from './LoopIcon';
import classes from './navbar.module.css';

const SearchBar = () => {
    return (
        <div id={classes["search-bar"]}>
            <button id={classes["anywhere-button"]}>Anywhere</button>
            <button id={classes["anyweek-button"]}>Any week</button>
            <button id={classes["add-guests-button"]}>Add guests</button>
            <button id={classes["search-button"]}>
                <LoopIcon />
            </button>
        </div>
    );
}

export default SearchBar;