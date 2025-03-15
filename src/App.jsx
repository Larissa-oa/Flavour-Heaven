import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import RecipesList from "./components/RecipesList";
import HomePage from "./pages/HomePage";
import Carousel from "./components/Carousel";
import AboutPage from "./pages/AboutPage";
import RecipeDetailPage from "./pages/RecipeDetails";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recipes/:recipesId" element={<RecipeDetailPage />} />
          <Route path="/recipes" element={<RecipesList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
