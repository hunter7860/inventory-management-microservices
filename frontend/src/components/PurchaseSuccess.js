import React from 'react';

const PurchaseSuccess = ({ purchaseData, onBackToEntry }) => {
  return (
    <div style={{ maxWidth: '750px', margin: '40px auto', border: '2px solid #81c784', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#ffffff' }}>
      
      <div style={{ backgroundColor: '#c8e6c9', padding: '18px 24px', textAlign: 'center', fontWeight: 'bold', color: '#1b5e20', fontSize: '22px', borderBottom: '2px solid #81c784' }}>
        Purchase Details Saved Successfully!
      </div>
      
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '18px', color: '#333' }}>
        
        <div style={{ padding: '16px 20px', backgroundColor: '#f1f8e9', borderRadius: '6px', border: '1px solid #c8e6c9', fontSize: '19px' }}>
          <strong style={{ color: '#2e7d32' }}>Generated Purchase ID:</strong>{' '}
          <span style={{ color: '#1b5e20', fontWeight: 'bold' }}>
            {purchaseData?.purchaseId}
          </span>
        </div>

        <div><strong>Vendor Name:</strong> {purchaseData?.vendorName}</div>
        <div><strong>Brand Name:</strong> {purchaseData?.brandName}</div>
        <div><strong>Quantity:</strong> {purchaseData?.quantity}</div>
        <div><strong>Purchase Amount:</strong> Rs. {purchaseData?.purchaseAmount}</div>
        <div><strong>Purchase Date:</strong> {purchaseData?.purchaseDate}</div>

        <button
          onClick={onBackToEntry}
          style={{
            marginTop: '20px',
            padding: '14px 28px',
            backgroundColor: '#8e24aa',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '17px',
            alignSelf: 'flex-start'
          }}
        >
          Add Another Purchase Entry
        </button>
      </div>
    </div>
  );
};

export default PurchaseSuccess;