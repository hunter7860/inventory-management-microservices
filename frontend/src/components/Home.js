import React from 'react';

const Home = ({ onNavigate }) => {
  return (
    <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px', fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
      
      {/* Hero Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)',
        color: '#ffffff',
        padding: '36px 40px',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(74, 20, 140, 0.25)',
        marginBottom: '32px'
      }}>
        <span style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '700',
          letterSpacing: '0.8px',
          textTransform: 'uppercase'
        }}>
          Operations Portal
        </span>
        <h1 style={{ margin: '14px 0 10px 0', fontSize: '30px', fontWeight: '800' }}>
          Inventory Management System (IMS)
        </h1>
        <p style={{ margin: 0, fontSize: '17px', color: '#f3e5f5', lineHeight: '1.6', maxWidth: '850px' }}>
          Centralized microservice-driven platform to streamline procurement, vendor coordination, and real-time inventory tracking.
        </p>
      </div>

      {/* System Features & Properties Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e0d4f5', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#4a148c', fontSize: '16px' }}> Automated Tracking</h4>
          <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.5' }}>
            Generates standardized, unique purchase transaction IDs instantly on submission.
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e0d4f5', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#4a148c', fontSize: '16px' }}> Dynamic Mapping</h4>
          <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.5' }}>
            Cascades material types and measurement units based on selected categories.
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e0d4f5', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#4a148c', fontSize: '16px' }}> Vendor Analytics</h4>
          <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.5' }}>
            Filters procurement histories, payment details, and vendor profiles across date ranges.
          </p>
        </div>

      </div>

      {/* Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Card 1: Add Purchase */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #e0d4f5',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1a1a1a' }}>Purchase Entry</h3>
            <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
              Record inward stock items and dispatch orders to the IMS backend orchestrator.
            </p>
          </div>
          <button
            onClick={() => onNavigate('entry')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#7b1fa2',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              alignSelf: 'flex-start'
            }}
          >
            Enter Purchase →
          </button>
        </div>

        {/* Card 2: Reports */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #e0d4f5',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1a1a1a' }}>Purchase Reports</h3>
            <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
              Query vendorwise statements, item balances, and procurement records.
            </p>
          </div>
          <button
            onClick={() => onNavigate('report')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4a148c',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              alignSelf: 'flex-start'
            }}
          >
            View Reports →
          </button>
        </div>

      </div>

    </div>
  );
};

export default Home;