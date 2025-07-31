import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './layouts/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/navbar/home/Home'
import MealPlan from './pages/navbar/planning/MealPlan'
import ShoppingList from './pages/navbar/shopping_list/ShoppingList'
import Login from './pages/navbar/login/Login'
import Register from './pages/navbar/login/Register'
import Recipes from './pages/navbar/recipes/Recipes'
import ForgotForm from './pages/navbar/login/ForgotForm'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotte con Layout (navbar) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route 
              path="recipes" 
              element={
                <ProtectedRoute>
                  <Recipes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="meal-plan" 
              element={
                <ProtectedRoute>
                  <MealPlan />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="shopping-list" 
              element={
                <ProtectedRoute>
                  <ShoppingList />
                </ProtectedRoute>
              } 
            />
          </Route>
          
          {/* Rotte senza Layout (standalone) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
