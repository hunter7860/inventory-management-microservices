import React, { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import PurchaseEntry from './components/PurchaseEntry';
import PurchaseSuccess from './components/PurchaseSuccess';
import PurchaseReport from './components/PurchaseReport';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [lastSavedPurchase, setLastSavedPurchase] = useState(null);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handlePurchaseSuccess = (savedData) => {
    setLastSavedPurchase(savedData);
    setCurrentPage('success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    setLastSavedPurchase(null);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const getNavBtnStyle = (pageName) => ({
    fontSize: '16px',
    fontWeight: '600',
    padding: '10px 24px',
    background: currentPage === pageName ? '#ffffff' : '#7b1fa2',
    color: currentPage === pageName ? '#4a148c' : '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', minHeight: '100vh', backgroundColor: '#f7f4fb' }}>
      {/* Top Header Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', background: '#4a148c', color: '#ffffff', boxShadow: '0 3px 8px rgba(0,0,0,0.15)' }}>
        <span style={{ fontWeight: '700', fontSize: '24px', letterSpacing: '0.5px' }}>
          Inventory Management System
        </span>
        <div style={{ display: 'flex', gap: '14px' }}>
          <button onClick={() => setCurrentPage('home')} style={getNavBtnStyle('home')}>
            Home
          </button>
          <button onClick={() => setCurrentPage('entry')} style={getNavBtnStyle('entry')}>
            Purchase Entry
          </button>
          <button onClick={() => setCurrentPage('report')} style={getNavBtnStyle('report')}>
            Report
          </button>
          <button
            onClick={handleLogout}
            style={{
              fontSize: '16px',
              fontWeight: '600',
              padding: '10px 24px',
              background: '#d32f2f',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Routed Content Area */}
      <main style={{ padding: '30px' }}>
        {currentPage === 'home' && <Home onNavigate={(page) => setCurrentPage(page)} />}
        {currentPage === 'entry' && <PurchaseEntry onPurchaseSuccess={handlePurchaseSuccess} />}
        {currentPage === 'success' && (
          <PurchaseSuccess
            purchaseData={lastSavedPurchase}
            onBackToEntry={() => setCurrentPage('entry')}
          />
        )}
        {currentPage === 'report' && <PurchaseReport />}
      </main>
    </div>
  );
}

export default App;