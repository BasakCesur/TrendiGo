import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import store from "./data/Store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Diğer route'larınızı buraya ekleyebilirsiniz */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
