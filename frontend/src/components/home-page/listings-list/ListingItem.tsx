import Listing from '../../../models/Listing';
import styles from './listings.module.css';
import { GoHeart, GoHeartFill } from "react-icons/go";

type Props = {
    listing: Listing
}

const ListingItem: React.FC<Props> = ({ listing }) => {
    return (
        <div className={styles["listing-item-container"]}>
            <img src={listing.imageUrl} alt="listing" />
            <p className={styles["bold"]}>{`${listing.address.city}, ${listing.address.country}`}</p>
            <p>{`Stay with ${listing.ownerName}`}</p>
            <p>
                <span className={styles["bold"]}>{`${listing.price} zł `}</span>
                night
            </p>
            <button className={styles['favourite-btn']}>
                {listing.isOnUserWishlist ? <GoHeartFill size={25} color='white' /> : <GoHeart size={25} color='white' />}
            </button>
        </div>
    );
}

export default ListingItem;