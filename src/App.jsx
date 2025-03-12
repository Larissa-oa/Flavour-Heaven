import './App.css'
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import RecipesList from './components/RecipesList'


function App() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <RecipesList />
      <Footer />

    </div>
  )
}

export default App
