import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthContextProvider from "./store/auth-context";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import ListingCreationState from "./components/listing-creation/ListingCreation";
import ListingCreation from "./components/listing-creation/ListingCreation";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/listing-creation',
    element:
      <ProtectedRoute>
        <ListingCreation />
      </ProtectedRoute>
  }
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
