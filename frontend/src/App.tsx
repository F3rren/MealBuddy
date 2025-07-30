import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/navbar/home/Home'
import MealPlan from './pages/navbar/planning/MealPlan'
import ShoppingList from './pages/navbar/shopping_list/ShoppingList'
import Login from './pages/navbar/login/Login'
import Register from './pages/navbar/login/Register'
import Recipes from './pages/navbar/recipes/Recipes'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotte con Layout (navbar) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="meal-plan" element={<MealPlan />} />
          <Route path="shopping-list" element={<ShoppingList />} />
        </Route>
        
        {/* Rotte senza Layout (standalone) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
