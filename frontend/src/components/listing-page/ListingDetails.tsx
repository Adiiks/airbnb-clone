import React, { useEffect, useState } from 'react';
import styles from './listing.module.css';
import axios from 'axios';
import { backendUrl } from '../../global-proporties';
import toast from 'react-hot-toast';
import Listing from '../../models/Listing';

type Props = {
    listingId: number
}

const ListingDetails: React.FC<Props> = ({ listingId }) => {
    const [listing, setListing] = useState<Listing>();

    useEffect(() => {
        axios.get(`${backendUrl}/listings/${listingId}`)
        .then(({ data }) => {
            setListing(data);
        })
        .catch(() => {
            toast.error('Something went wrong!')
        })
    }, [listingId]);

    return (
        <div id={styles["listing-details-container"]}>
            <div className={styles["listing-image-wrapper"]}>
                <img src={listing?.imageUrl} alt="listing" />
            </div>
            <div id={styles["listing-information-section"]}>
                <h2>{listing?.title}</h2>
                <ul className={styles["listing-basic-info"]}>
                    <li>{`${listing?.listingDetails.maxGuests} guest${listing?.listingDetails.maxGuests! > 1 ? 's' : ''}`}</li>
                    <li>{`${listing?.listingDetails.totalBedrooms} bedroom${listing?.listingDetails.totalBedrooms! > 1 ? 's' : ''}`}</li>
                    <li>{`${listing?.listingDetails.totalBeds} bed${listing?.listingDetails.totalBeds! > 1 ? 's' : ''}`}</li>
                    <li>{`${listing?.listingDetails.totalBathrooms} bath${listing?.listingDetails.totalBathrooms! > 1 ? 's' : ''}`}</li>
                </ul>
                <hr />
                <h3>{`Hosted by ${listing?.ownerName}`}</h3>
                <hr />
                <p>{listing?.description}</p>
                <hr />
                <h3>Where you&#39;ll be</h3>
                <p>{`${listing?.address.city}, ${listing?.address.country}`}</p>
            </div>
        </div>
    );
}

export default ListingDetails;