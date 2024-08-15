import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assests/logo2.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          <div className="mb-6 md:mb-0">
            <img src={logo} alt="Logo" className="w-40 h-auto mb-4 md:mb-0" />
            <div className="flex space-x-4">
              <Link
                to="#"
                className="text-white text-xl hover:text-gray-400 transition"
              >
                <FaFacebook />
              </Link>
              <Link
                to="#"
                className="text-white text-xl hover:text-gray-400 transition"
              >
                <FaTwitter />
              </Link>
              <Link
                to="#"
                className="text-white text-xl hover:text-gray-400 transition"
              >
                <FaInstagram />
              </Link>
              <Link
                to="#"
                className="text-white text-xl hover:text-gray-400 transition"
              >
                <FaLinkedin />
              </Link>
              <Link
                to="#"
                className="text-white text-xl hover:text-gray-400 transition"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-semibold mb-4 text-xl">Links</h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/contact-us"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/tifin-center"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Find Tifin
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/pg-room"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Find My PG/Room
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-xl">Services</h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/tifin-center"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Tifin Center
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/pg-room"
                    className="hover:text-gray-400 transition-colors"
                  >
                    My PG/Room
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-xl">Account</h3>

              <ul>
                <li className="mb-2">
                  <Link
                    to="/profile"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Profile
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/my-account"
                    className="hover:text-gray-400 transition-colors"
                  >
                    My Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/preferences"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Preferences
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/purchase"
                    className="hover:text-gray-400 transition-colors"
                  >
                    Purchase
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <h3 className="font-semibold mb-4">Subscribe</h3>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full p-2 mb-4 rounded-md bg-gray-800 text-white border border-gray-600"
            />
            <button className="w-full py-2 bg-yellow-600 hover:bg-blue-600 text-white rounded-md transition">
              Subscribe
            </button>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center">
          <Link
            to="https://mahitechnocrafts.in/"
            target="_blank"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            Made by Mahi Technocrafts ❤️
          </Link>
          <span className="block mt-2 text-gray-500">
            &copy; {new Date().getFullYear()} VR-Here. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
