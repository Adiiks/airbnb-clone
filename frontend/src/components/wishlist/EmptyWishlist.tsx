import styles from './wishlist.module.css';

const EmptyWishlist = () => {
    return (
        <div className={styles['empty-wishlist']}>
            <h2>Create your first wishlist</h2>
            <p>As you search, click the heart icon to save your favorite places and <br /> Experiences to a wishlist.</p>
        </div>
    );
}

export default EmptyWishlist;