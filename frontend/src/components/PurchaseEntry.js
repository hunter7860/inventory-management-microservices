import React, { useState, useEffect } from 'react';
import API from '../api';

const PurchaseEntry = ({ onPurchaseSuccess }) => {
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [units, setUnits] = useState([]);

  const initialFormState = {
    vendorName: '',
    materialCategoryId: '',
    materialTypeId: '',
    unitId: '',
    brandName: '',
    quantity: '',
    purchaseAmount: '',
    purchaseDate: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // 1. Fetch Vendors and Categories on component mount
  useEffect(() => {
    API.get('/vendors')
      .then(res => setVendors(res.data || []))
      .catch(err => console.error('Error fetching vendors:', err));

    API.get('/categories')
      .then(res => setCategories(res.data || []))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // 2. Fetch dependent Types & Units from backend based on selected category_id (C001, C002, C003)
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;

    setFormData({
      ...formData,
      materialCategoryId: selectedCategoryId,
      materialTypeId: '',
      unitId: ''
    });

    if (errors.materialCategoryId) {
      setErrors({ ...errors, materialCategoryId: '' });
    }

    if (!selectedCategoryId) {
      setMaterialTypes([]);
      setUnits([]);
      return;
    }

    // Call backend orchestrator to fetch matching material_type and unit records
    API.post('/getUnitAndTypeList', {
      materialCategoryId: selectedCategoryId
    })
      .then(res => {
        const types = res.data?.typeList || res.data?.materialTypeList || res.data?.types || [];
        const unitsList = res.data?.unitList || res.data?.materialUnitList || res.data?.units || [];
        setMaterialTypes(types);
        setUnits(unitsList);
      })
      .catch(err => {
        console.error('Error fetching unit and type lists:', err);
        setMaterialTypes([]);
        setUnits([]);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.vendorName) newErrors.vendorName = 'Vendor name is a required field.';
    if (!formData.materialCategoryId) newErrors.materialCategoryId = 'Material category is a required field.';
    if (!formData.materialTypeId) newErrors.materialTypeId = 'Material type is a required field.';
    if (!formData.unitId) newErrors.unitId = 'Unit is a required field.';
    if (!formData.brandName.trim()) newErrors.brandName = 'Brand name is a required field.';

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is a required field.';
    } else if (Number(formData.quantity) <= 0 || !Number.isInteger(Number(formData.quantity))) {
      newErrors.quantity = 'Quantity must be a positive number.';
    }

    if (!formData.purchaseAmount) {
      newErrors.purchaseAmount = 'Purchase amount is a required field.';
    } else if (Number(formData.purchaseAmount) <= 0) {
      newErrors.purchaseAmount = 'Purchase amount must be greater than zero.';
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'PurchaseDate is a required field.';
    } else if (formData.purchaseDate > today) {
      newErrors.purchaseDate = 'Purchase date cannot be in the future.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    API.post('/addPurchaseDetail', formData)
      .then(res => {
        onPurchaseSuccess({
          ...formData,
          purchaseId: res.data?.purchaseId || `P_${formData.vendorName.substring(0, 3).toUpperCase()}_${formData.purchaseDate.replace(/-/g, '')}_CLO_1`
        });
      })
      .catch(err => {
        setApiError('Failed to save purchase details. Please check your backend connection.');
        console.error(err);
      });
  };

  const handleClear = () => {
    setFormData(initialFormState);
    setErrors({});
    setApiError('');
    setMaterialTypes([]);
    setUnits([]);
  };

  const inputStyle = (fieldName, disabled = false) => ({
    width: '100%',
    padding: '12px 14px',
    fontSize: '15px',
    borderRadius: '4px',
    border: errors[fieldName] ? '1.5px solid #a83264' : '1px solid #c9a7d8',
    backgroundColor: disabled ? '#f8f4fa' : '#ffffff',
    color: disabled ? '#888' : '#222',
    boxSizing: 'border-box',
    outline: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer'
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px', fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e8e0ee', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', padding: '36px 44px' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', color: '#6a1b9a', textTransform: 'uppercase' }}>
            TRANSACTION
          </span>
          <h2 style={{ margin: '6px 0 4px 0', fontSize: '24px', fontWeight: '700', color: '#1a1a1a' }}>
            Add Purchase Entry
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#666666' }}>
            Capture a purchase and let the IMS generate the transaction details.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Row 1: Vendor & Material Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Vendor <span style={{ color: '#d32f2f' }}>*</span>
              </label>
              <select
                name="vendorName"
                value={formData.vendorName}
                onChange={handleChange}
                style={inputStyle('vendorName')}
              >
                <option value="">Select vendor</option>
                {vendors.map((v, i) => (
                  <option key={i} value={v.vendorName}>{v.vendorName}</option>
                ))}
              </select>
              {errors.vendorName && <div style={{ color: '#b71c1c', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>{errors.vendorName}</div>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Material Category <span style={{ color: '#d32f2f' }}>*</span>
              </label>
              <select
                name="materialCategoryId"
                value={formData.materialCategoryId}
                onChange={handleCategoryChange}
                style={inputStyle('materialCategoryId')}
              >
                <option value="">Select category</option>
                {categories.map((c, i) => (
                  <option key={i} value={c.categoryId || c.category_id}>
                    {c.categoryName || c.category_name}
                  </option>
                ))}
              </select>
              {errors.materialCategoryId && <div style={{ color: '#b71c1c', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>{errors.materialCategoryId}</div>}
            </div>
          </div>

          {/* Row 2: Material Type & Unit */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Material Type <span style={{ color: '#d32f2f' }}>*</span>
              </label>
              <select
                name="materialTypeId"
                value={formData.materialTypeId}
                onChange={handleChange}
                disabled={materialTypes.length === 0}
                style={inputStyle('materialTypeId', materialTypes.length === 0)}
              >
                <option value="">Select material type</option>
                {materialTypes.map((t, i) => (
                  <option key={i} value={t.typeId || t.type_id || t.materialTypeId}>
                    {t.typeName || t.type_name || t.materialTypeName}
                  </option>
                ))}
              </select>
              {errors.materialTypeId && <div style={{ color: '#b71c1c', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>{errors.materialTypeId}</div>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Unit <span style={{ color: '#d32f2f' }}>*</span>
              </label>
              <select
                name="unitId"
                value={formData.unitId}
                onChange={handleChange}
                disabled={units.length === 0}
                style={inputStyle('unitId', units.length === 0)}
              >
                <option value="">Select unit</option>
                {units.map((u, i) => (
                  <option key={i} value={u.unitId || u.unit_id || u.materialUnitId}>
                    {u.unitName || u.unit_name || u.materialUnitName}
                  </option>
                ))}
              </select>
              {errors.unitId && <div style={{ color: '#b71c1c', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>{errors.unitId}</div>}
            </div>
          </div>

          {/* Row 3: Brand Name & Quantity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Brand Name <span style={{ color: '#d32f2f' }}>*</span>
              </label>
              <input
                type="text"
                name="brandName"
                placeholder="e.g. Raymonds"
                value={formData.brandName}
                onChange={handleChange}
                style={inputStyle('brandName')}
              />
              {errors.brandName && <div style={{ color: '#b71c1c', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>{errors.brandName}</div>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Quantity <span style={{ color: '#d32f2f' }}>*</span>
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="e.g. 50"
                value={formData.quantity}
                onChange={handleChange}
                style={inputStyle('quantity')}
              />
              {errors.quantity && <div style={{ color: '#b71c1c', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>{errors.quantity}</div>}
            </div>
          </div>

          {/* Row 4: Purchase Amount & Purchase Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Purchase Amount <span style={{ color: '#d32f2f' }}>*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="purchaseAmount"
                placeholder="e.g. 7899"
                value={formData.purchaseAmount}
                onChange={handleChange}
                style={inputStyle('purchaseAmount')}
              />
              {errors.purchaseAmount && <div style={{ color: '#b71c1c', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>{errors.purchaseAmount}</div>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Purchase Date <span style={{ color: '#d32f2f' }}>*</span>
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                style={inputStyle('purchaseDate')}
              />
              {errors.purchaseDate && <div style={{ color: '#b71c1c', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>{errors.purchaseDate}</div>}
            </div>
          </div>

          {apiError && (
            <div style={{ padding: '12px 16px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', fontSize: '14px', fontWeight: '600' }}>
              {apiError}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={handleClear}
              style={{
                padding: '10px 24px',
                backgroundColor: '#ffffff',
                color: '#333333',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 26px',
                backgroundColor: '#6200ea',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(98, 0, 234, 0.3)'
              }}
            >
              Add Purchase
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default PurchaseEntry;