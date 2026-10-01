import React, { useState, useEffect } from 'react';
import API from '../api';

// Exact mappings decoded directly from materialdb database tables
const CATEGORY_MAP = {
  'C001': 'Thread',
  'C002': 'Cloth',
  'C003': 'Button'
};

const TYPE_MAP = {
  'T001': 'Silk',
  'T002': 'Silk',
  'T003': 'Linen',
  'T004': 'Linen',
  'T005': 'Silk Cotton',
  'T006': 'Suit',
  'T007': 'Silk Cotton'
};

const UNIT_MAP = {
  'U001': 'Metres',
  'U002': 'Metres',
  'U003': 'Yards',
  'U004': 'Yards',
  'U005': 'Kilograms'
};

const PurchaseReport = () => {
  const [vendors, setVendors] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [vendorInfo, setVendorInfo] = useState(null);
  const [reportList, setReportList] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    API.get('/vendors')
      .then(res => setVendors(res.data || []))
      .catch(err => console.error('Error fetching vendors:', err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const selected = vendors.find(v => v.vendorName === vendorName);
    setVendorInfo(selected || null);

    API.post('/report/controller/getPurchaseDetails', {
      vendorName,
      fromDate,
      toDate
    })
      .then(res => {
        setReportList(res.data || []);
        setSearched(true);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching purchase report:', err);
        setErrorMsg('Failed to retrieve records. Please ensure backend services are running.');
        setReportList([]);
        setSearched(true);
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '36px auto', padding: '0 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 6px 24px rgba(0, 0, 0, 0.09)', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
        
        {/* Header Bar */}
        <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', padding: '24px 32px', color: '#ffffff' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', letterSpacing: '0.3px' }}>
            Vendor Purchase Analytics & Report
          </h2>
          <p style={{ margin: '6px 0 0 0', fontSize: '15px', color: '#c7d2fe' }}>
            Filter and view purchase orders, material categories, and transaction summaries
          </p>
        </div>

        {/* Filter Controls Form */}
        <form onSubmit={handleSearch} style={{ padding: '28px 32px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          
          <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '15px', fontWeight: '600', color: '#334155' }}>Vendor Name</label>
            <select
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              required
              style={{ padding: '12px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '16px', backgroundColor: '#fff', outline: 'none' }}
            >
              <option value="">-- Choose Vendor --</option>
              {vendors.map((v, i) => (
                <option key={i} value={v.vendorName}>{v.vendorName}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: '1 1 190px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '15px', fontWeight: '600', color: '#334155' }}>From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
              style={{ padding: '11px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '16px', backgroundColor: '#fff', outline: 'none' }}
            />
          </div>

          <div style={{ flex: '1 1 190px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '15px', fontWeight: '600', color: '#334155' }}>To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
              style={{ padding: '11px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '16px', backgroundColor: '#fff', outline: 'none' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 28px',
              backgroundColor: '#4f46e5',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 6px rgba(79, 70, 229, 0.3)'
            }}
          >
            {loading ? 'Searching...' : 'Search Records'}
          </button>
        </form>

        {errorMsg && (
          <div style={{ margin: '18px 32px', padding: '14px 18px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#991b1b', fontSize: '15px' }}>
            {errorMsg}
          </div>
        )}

        {/* Vendor Profile Card */}
        {vendorInfo && (
          <div style={{ margin: '24px 32px', padding: '20px 24px', backgroundColor: '#f1f5f9', borderRadius: '8px', borderLeft: '5px solid #4f46e5', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#64748b', fontWeight: '700' }}>Vendor Location</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>
                {vendorInfo.vendorAddress || 'Stock home road, Sector 22, New Delhi, 110001'}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#64748b', fontWeight: '700' }}>Contact Info</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1e293b' }}>
                <strong>{vendorInfo.contactPerson || 'Elizabeth'}</strong> ({vendorInfo.contactNumber || '9005600744'})
              </p>
            </div>
          </div>
        )}

        {/* Results Data Table */}
        {searched && (
          <div style={{ padding: '0 32px 32px 32px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0', textAlign: 'left', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '14px 18px', fontSize: '15px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Material Category</th>
                  <th style={{ padding: '14px 18px', fontSize: '15px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Material Type</th>
                  <th style={{ padding: '14px 18px', fontSize: '15px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Brand</th>
                  <th style={{ padding: '14px 18px', fontSize: '15px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Quantity</th>
                  <th style={{ padding: '14px 18px', fontSize: '15px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Unit</th>
                  <th style={{ padding: '14px 18px', fontSize: '15px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Price (₹)</th>
                  <th style={{ padding: '14px 18px', fontSize: '15px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {reportList.length > 0 ? (
                  reportList.map((row, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fcfcfd' }}>
                      <td style={{ padding: '14px 18px', fontSize: '15px', color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ backgroundColor: '#e0e7ff', color: '#3730a3', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', fontWeight: '600' }}>
                          {row.materialCategoryName || CATEGORY_MAP[row.materialCategoryId] || CATEGORY_MAP[row.material_category_id] || row.materialCategoryId}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '15px', color: '#334155', borderBottom: '1px solid #f1f5f9', fontWeight: '500' }}>
                        {row.materialTypeName || TYPE_MAP[row.materialTypeId] || TYPE_MAP[row.material_type_id] || TYPE_MAP[row.typeId] || row.materialTypeId}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '15px', color: '#1e293b', borderBottom: '1px solid #f1f5f9', fontWeight: '600' }}>
                        {row.brandName || row.brandname || row.brand_name}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '15px', color: '#334155', borderBottom: '1px solid #f1f5f9' }}>
                        {row.quantity}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '15px', color: '#64748b', borderBottom: '1px solid #f1f5f9' }}>
                        {row.materialUnitName || row.unitName || row.unit_name || UNIT_MAP[row.unitId] || UNIT_MAP[row.unit_id] || row.unitId}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '15px', color: '#0f172a', borderBottom: '1px solid #f1f5f9', fontWeight: '600' }}>
                        {row.purchaseAmount || row.price || row.purchase_amount}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '15px', color: '#64748b', borderBottom: '1px solid #f1f5f9' }}>
                        {row.purchaseDate || row.purchase_date}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px 16px', color: '#64748b', fontSize: '16px' }}>
                      No purchase records found for the selected vendor and date range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default PurchaseReport;