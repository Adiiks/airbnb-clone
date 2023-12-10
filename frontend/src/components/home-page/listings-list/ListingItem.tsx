import { useContext, useState } from 'react';
import Listing from '../../../models/Listing';
import styles from './listings.module.css';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { AuthContext } from '../../../store/auth-context';
import ModalObject, { ModalType } from '../../../models/Modal';
import Modal from '../../modals/Modal';
import axios from 'axios';
import { backendUrl } from '../../../global-proporties';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const initialModalState: ModalObject = {
    showModal: false
}

type Props = {
    listing: Listing
}

const ListingItem: React.FC<Props> = ({ listing }) => {
    const [modal, setModal] = useState<ModalObject>(initialModalState);
    const [isOnUserWishlist, setIsOnUserWishlist] = useState<boolean | null>(null);

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    function handleCloseModalClick() {
        setModal({
            showModal: false
        });
    }

    function showLoginModal() {
        setModal({
            showModal: true,
            type: ModalType.LOGIN
        });
    }

    function handleWishlistClick(filledHeart: boolean) {
        if (authContext.auth === null) {
            showLoginModal();
            return;
        }

        const action = filledHeart ? 'remove' : 'add';

        axios.put(`${backendUrl}/listings/wishlist/${action}/${listing.id}`)
            .then(() => {
                setIsOnUserWishlist(
                    action === 'remove' ? false : true
                )
            })
            .catch(() => {
                toast.error('Something went wrong!');
            });
    }

    const filledHeart = isOnUserWishlist === null ? listing.isOnUserWishlist : isOnUserWishlist; 

    return (
        <div className={styles["listing-item-container"]}>
            <img src={listing.imageUrl} alt="listing" onClick={() => navigate(`/listing/${listing.id}`)} />
            <p className={styles["bold"]}>{`${listing.address.city}, ${listing.address.country}`}</p>
            <p>{`Stay with ${listing.ownerName}`}</p>
            <p>
                <span className={styles["bold"]}>{`${listing.price} zł `}</span>
                night
            </p>
            <button className={styles['favourite-btn']} onClick={() => handleWishlistClick(filledHeart!)}>
                {filledHeart ? <GoHeartFill size={25} color='white' /> : <GoHeart size={25} color='white' />}
            </button>
            {modal.showModal && <Modal type={modal.type!} onClose={handleCloseModalClick} />}
        </div>
    );
}

export default ListingItem;