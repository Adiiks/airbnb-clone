import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthContextProvider from "./store/auth-context";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import ListingCreation from "./components/listing-creation/ListingCreation";
import { Toaster } from "react-hot-toast";
import ListingPage from "./pages/ListingPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/listing-creation',
    element:
      <ProtectedRoute>
        <ListingCreation />
      </ProtectedRoute>
  },
  {
    path: '/listing/:listingId',
    element: <ListingPage />
  }
]);

function App() {
  return (
    <AuthContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
