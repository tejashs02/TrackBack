import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './hooks/useAuth';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ReportItemPage from './pages/ReportItemPage';
import SearchPage from './pages/SearchPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import OrganizationDashboard from './pages/OrganizationDashboard';
import MatchesPage from './pages/MatchesPage';
import LoadingSpinner from './components/UI/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean; orgOnly?: boolean }> = ({ 
  children, 
  adminOnly = false, 
  orgOnly = false 
}) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
  if (orgOnly && user.role !== 'organization') return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/item/:id" element={<ItemDetailsPage />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/report" element={
            <ProtectedRoute>
              <ReportItemPage />
            </ProtectedRoute>
          } />
          
          <Route path="/matches" element={
            <ProtectedRoute>
              <MatchesPage />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/organization" element={
            <ProtectedRoute orgOnly>
              <OrganizationDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;