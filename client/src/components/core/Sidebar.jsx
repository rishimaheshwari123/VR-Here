import { useState } from "react";
import { VscChevronLeft } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "react-icons/vsc";
import { sidebarLinks } from "../../constant/sidebarLinks.js";
import { logout } from "../../service/operations/user.js";
import LogoutModal from "../common/Navbar/LogoutModal.jsx";
import { MdOutlineLogout } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  return (
    <motion.div
      className={`flex flex-col h-screen bg-black text-yellow-500 shadow-lg transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      } min-w-fit`}
      initial={{ width: "w-16" }}
      animate={{ width: collapsed ? "w-16" : "w-56" }}
      transition={{ duration: 0.3 }}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="flex justify-end p-2 text-white rounded-md mt-2 ml-2"
      >
        {collapsed ? (
          <GiHamburgerMenu className="text-2xl" />
        ) : (
          <ImCross className="text-2xl" />
        )}
      </button>

      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        {/* Logo and Branding */}
        {!collapsed && (
          <div className="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
            <span className="text-xl font-bold">VR HERE</span>
          </div>
        )}

        {/* Sidebar Links */}
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden py-4">
          {sidebarLinks.map((link) => {
            if (link.type && user?.role !== link.type) return null;

            const IconComponent = Icons[link.icon];

            if (!IconComponent) {
              console.error(`Icon component ${link.icon} not found`);
              return null;
            }

            return (
              <motion.div
                key={link.id}
                className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer ${
                  collapsed ? "justify-center" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(link.path)}
                style={{ pointerEvents: "auto" }}
              >
                <IconComponent className="text-xl mr-3" />
                {!collapsed && <span className="text-lg">{link.name}</span>}
              </motion.div>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className={`flex justify-center items-center py-4 text-xl ${
            collapsed ? "text-red-500" : "text-red-500 bg-gray-800"
          } mt-2 font-bold rounded-md transition-colors duration-300`}
        >
          <MdOutlineLogout size={28} />
          {!collapsed && <span className="ml-2">Logout</span>}
        </button>

        {/* Logout Modal */}
        {showLogoutModal && (
          <LogoutModal
            onClose={() => setShowLogoutModal(false)}
            onConfirmLogout={() => {
              logoutHandler();
              setShowLogoutModal(false);
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
