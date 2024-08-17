import React, { useEffect, useState } from "react";
import { roomLeads } from "../../service/operations/room";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const { vendorName } = useParams();

  const fetchLeads = async (token) => {
    try {
      console.log(vendorName);
      const response = await roomLeads(token);
      setLeads(response || []); // Ensure leads is set to an empty array if response is undefined
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLeads(token);
    }
  }, [token]);

  // Display only the first 4 leads
  const displayedLeads = leads || []; // Default to an empty array if leads is undefined

  // Function to format phone numbers
  const formatPhoneNumber = (number) => {
    if (user?.subscription?.isActive) {
      return number;
    } else {
      if (!number) return "N/A";
      const numStr = number.toString();
      if (numStr.length > 6) {
        return `XXXXXX${numStr.slice(-4)}`;
      }
      return numStr;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>
      {!user?.subscription?.isActive && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">
            Contact for Full Details
          </h2>
          <p className="text-lg mb-4">
            To get more leads and detailed information, please contact us.
          </p>
          <a
            href="support@mahitechnocrafts.in"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Contact Us
          </a>
        </div>
      )}
      {/* Leads Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Name
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Number
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedLeads.length > 0 ? (
              displayedLeads.map((lead, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-gray-700">
                    {lead?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {formatPhoneNumber(lead?.number)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-3 px-4 text-center text-gray-700">
                  No Leads Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
