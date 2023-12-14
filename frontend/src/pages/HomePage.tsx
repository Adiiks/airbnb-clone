import ListingsList from "../components/home-page/listings-list/ListingsList";
import Navbar from "../components/home-page/navbar/Navbar";
import FiltersContextProvider from "../store/filters-context";


const HomePage = () => {
    return (
        <FiltersContextProvider>
            <Navbar fixedHeader={true} />
            <ListingsList />
        </FiltersContextProvider>
    );
}

export default HomePage;