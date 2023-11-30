import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthContextProvider from "./store/auth-context";
import HomePage from "./components/pages/HomePage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
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
