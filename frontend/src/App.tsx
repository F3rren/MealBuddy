import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import MealPlan from './pages/MealPlan'
import ShoppingList from './pages/ShoppingList'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="meal-plan" element={<MealPlan />} />
          <Route path="shopping-list" element={<ShoppingList />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
