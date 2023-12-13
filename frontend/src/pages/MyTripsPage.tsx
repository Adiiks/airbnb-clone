import Navbar from "../components/home-page/navbar/Navbar";
import MyTrips from "../components/trips/MyTrips";

const MyTripsPage = () => {
    return (
        <div>
            <Navbar 
                showCategories={false}
                fixedHeader={false}
                showSearchBar={false}
            />
            <MyTrips />
        </div>
    );
}

export default MyTripsPage;