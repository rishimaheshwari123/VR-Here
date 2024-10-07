import React from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
        <p className="text-gray-600 mb-6">This Is Admin Panel For Vendors</p>
        <Link
          to='/vendor'
          className="inline-block px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300"
        >
          Go to Vendor Panel
        </Link>
      </div>
    </div>
  );
}

export default AdminPanel;
