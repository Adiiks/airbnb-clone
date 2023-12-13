import React from 'react';
import Listing from '../../models/Listing';
import styles from './wishlist.module.css';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";

type Props = {
    listing: Listing,
    onRemove: (id: number) => void
}

const WishlistItem: React.FC<Props> = ({ listing, onRemove }) => {
    const navigate = useNavigate();

    return (
        <div className={styles['wishlist-item']}>
            <div className={styles['image-container']}>
                <img src={listing.imageUrl} alt="listing" onClick={() => navigate(`/listing/${listing.id}`)} />
                <button onClick={() => onRemove(listing.id!)}>
                    <IoCloseOutline size={20} />
                </button>
            </div>
            <p><strong>{`${listing.address.city}, ${listing.address.country}`}</strong></p>
        </div>
    );
}

export default WishlistItem;