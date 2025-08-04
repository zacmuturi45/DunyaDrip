'use client';
import React from 'react';

export default function Products() {
  return (
    <div className="admin-section products-section">
      <h2 className="section-title">Product Management</h2>

      <div className="product-controls">
        <button className="btn-add">+ Add New Product</button>
      </div>

      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="/placeholder.jpg" alt="Product" width="40" /></td>
              <td>Product 1</td>
              <td>$25</td>
              <td>Active</td>
              <td>
                <button>Edit</button>
                <button className="danger">Delete</button>
              </td>
            </tr>
            {/* Map your real products here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
