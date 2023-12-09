import ListingsList from "../components/home-page/listings-list/ListingsList";
import Navbar from "../components/home-page/navbar/Navbar";


const HomePage = () => {
    return (
        <div>
            <Navbar />
            <ListingsList />
        </div>
    );
}

export default HomePage;