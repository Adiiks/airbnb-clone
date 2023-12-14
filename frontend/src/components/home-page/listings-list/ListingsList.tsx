import { useSearchParams } from 'react-router-dom';
import styles from './listings.module.css';
import { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../../global-proporties';
import toast from 'react-hot-toast';
import Listing from '../../../models/Listing';
import ListingItem from './ListingItem';
import NoResults from './NoResults';
import { FiltersContext } from '../../../store/filters-context';

const ListingsList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [listings, setListings] = useState<Listing[]>([]);
    const [showNoResults, setShowNoResults] = useState<boolean>(false);

    const filtersContext = useContext(FiltersContext);

    useEffect(() => {
        const categoryId = searchParams.get('category');

        if (categoryId === null) return;

        const url = `${backendUrl}/listings/category/${categoryId}`;
        const body = filtersContext.filters ? filtersContext.filters : {};

        axios.post(url, body)
            .then(({ data }) => {
                if (data.length > 0) {
                    setListings(data);
                    setShowNoResults(false);
                } else {
                    setShowNoResults(true);
                }
            })
            .catch(() => {
                toast.error('Something went wrong. Reload page!');
            });
    }, [searchParams, filtersContext]);

    const listingsItems = listings.map((listing) =>
        <ListingItem key={listing.id} listing={listing} />
    );

    return (
        <div id={styles['listings-list-container']}>
            {!showNoResults &&
                <div id={styles['listings-list-wrapper']}>
                    {listingsItems}
                </div>
            }
            {showNoResults && <NoResults />}
        </div>
    );
}

export default ListingsList;