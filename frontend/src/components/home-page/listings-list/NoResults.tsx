import styles from './listings.module.css';

const NoResults = () => {
    return (
        <div className={styles['no-results-wrapper']}>
            <h2>No exact matches</h2>
            <p>Try changing or removing some of your filters or adjusting your search area.</p>
        </div>
    );
}

export default NoResults;