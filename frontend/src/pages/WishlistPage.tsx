import Navbar from "../components/home-page/navbar/Navbar";
import Wishlist from "../components/wishlist/Wishlist";

const WishlistPage = () => {
    return (
        <div>
            <Navbar 
                showCategories={false}
                fixedHeader={false}
                showSearchBar={false}
            />
            <Wishlist />
        </div>
    );
}

export default WishlistPage;