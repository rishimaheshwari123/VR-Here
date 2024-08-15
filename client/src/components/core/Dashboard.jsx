import React, { useEffect, useState } from 'react';
import { roomVisits } from '../../service/operations/room';
import { useSelector } from 'react-redux';
import { FaEye } from 'react-icons/fa'; // Importing an icon for visits

function Dashboard() {
  const { token, user } = useSelector(state => state.auth);
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const fetchVisits = async () => {
      const response = await roomVisits(token);
      setVisits(response?.data[0]?.visits || 0);
    };

    fetchVisits();
  }, [token]);

  return (
    <div className="dashboard-container flex justify-center items-center h-screen bg-gray-100">
      <div className="visit-card bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
        <div className="icon-container flex justify-center items-center text-blue-500 mb-4">
          <FaEye size={50} />
        </div>
        <div className="visit-info text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
  {user?.role === "room" ? "Room" : "Tiffin"} Visits
</h2>

          <p className="text-4xl text-blue-600 font-bold mt-2">{visits}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
