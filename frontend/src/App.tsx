import Navbar from "./components/navbar/Navbar";
import AuthContextProvider from "./store/auth-context";

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
    </AuthContextProvider>
  );
}

export default App;
