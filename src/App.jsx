import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Diğer route'larınızı buraya ekleyebilirsiniz */}
      </Routes>
    </Router>
  );
}

export default App;
