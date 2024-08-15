import React, { useState } from 'react';
import EditTifinModal from './EditTifinModal '; // Import the modal component

function DisplayTifin({ tifin,setTifinData }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-900">{tifin.name}</h1>
      <div className="text-lg mb-6 space-y-2">
        <p><strong className="text-gray-700">Price:</strong> <span className="text-gray-800">{tifin.price}</span></p>
        <p><strong className="text-gray-700">Type:</strong> <span className="text-gray-800">{tifin.type}</span></p>
        <p><strong className="text-gray-700">Customize:</strong> <span className="text-gray-800">{tifin.customize}</span></p>
        <p><strong className="text-gray-700">Location:</strong> <span className="text-gray-800">{tifin.Location[0]?.name || 'Unknown'}</span></p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">Menu:</h2>
        <ul className="list-disc list-inside pl-4 space-y-1">
          {tifin.menu.map((item, index) => (
            <li key={index} className="text-gray-800">
              <strong className="capitalize">{item.day}:</strong> {item.menu}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">Images:</h2>
        <div className="flex flex-wrap gap-4">
          {tifin.images.map((image, index) => (
            <div key={index} className="w-32 h-32 relative overflow-hidden rounded-lg shadow-md border border-gray-200">
              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="mt-6 bg-blue-500 text-white p-2 rounded-md"
        onClick={handleEditClick}
      >
        Edit
      </button>
      {isEditModalOpen && (
        <EditTifinModal tifin={tifin} onClose={handleCloseModal} setTifinData={setTifinData} />
      )}
    </div>
  );
}

export default DisplayTifin;
