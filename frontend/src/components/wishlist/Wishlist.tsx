import { useContext, useEffect, useState } from 'react';
import EmptyWishlist from './EmptyWishlist';
import styles from './wishlist.module.css';
import Listing from '../../models/Listing';
import WishlistItem from './WishlistItem';
import { backendUrl } from '../../global-proporties';
import axios from 'axios';
import { AuthContext } from '../../store/auth-context';
import toast from 'react-hot-toast';

const Wishlist = () => {
    const [listings, setListings] = useState<Listing[]>([]);

    const authContext = useContext(AuthContext);

    useEffect(() => {
        const url = `${backendUrl}/listings/wishlist`;

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${authContext.auth?.token}`
            }
        })
        .then(({ data }) => {
            setListings(data);
        })
        .catch(() => {
            toast.error("Something went wrong!");
        })
    }, []);

    function handleRemove(id: number) {
        const url = `${backendUrl}/listings/wishlist/remove/${id}`;

        axios.put(url, {
            headers: {
                'Authorization': `Bearer ${authContext.auth?.token}`
            }
        })
        .then(() => {
            setListings((prevListings) => {
                const updatedListings = [...prevListings];

                const indexToRemove = updatedListings.findIndex(listing => listing.id === id);

                updatedListings.splice(indexToRemove, 1);

                return updatedListings;
            });
        })
        .catch(() => {
            toast.error("Something went wrong!");
        })
    }

    return (
        <section id={styles['wishlist-section']}>
            <h1>Wishlists</h1>
            {listings.length === 0 && <EmptyWishlist />}
            {listings.length > 0 &&
                <div className={styles['listings-list']}>
                    {listings.map(listing =>
                        <WishlistItem
                            key={listing.id}
                            listing={listing}
                            onRemove={handleRemove} 
                        />
                    )}
                </div>
            }
        </section>
    );
}

export default Wishlist;