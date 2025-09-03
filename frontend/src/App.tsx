import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ToastContainer from "./components/ui/ToastContainer";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import MealPlan from "./pages/meal-plan/MealPlan";
import ShoppingList from "./pages/shopping_list/ShoppingList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Recipes from "./pages/recipes/Recipes";
import Profile from "./pages/profile/Profile";
import ForgotForm from "./pages/auth/ForgotForm";
import Search from "./pages/search/Search";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Rotte con Layout (navbar) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
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
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="search" element={<Search />} />
            </Route>

            {/* Rotte senza Layout (standalone) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotForm />} />
          </Routes>
          <ToastContainer />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
