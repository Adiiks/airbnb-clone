import { useParams } from "react-router-dom";
import Navbar from "../components/home-page/navbar/Navbar";
import ListingDetails from "../components/listing-page/ListingDetails";

const ListingPage = () => {
    const { listingId } = useParams();

    return (
        <div>
            <Navbar showCategories={false} fixedHeader={false} />
            <ListingDetails listingId={+listingId!} />
        </div>
    );
}

export default ListingPage;