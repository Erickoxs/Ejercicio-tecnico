import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <a href="#" className="flex items-center mb-4">
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
                className="h-10 w-auto"
              />
              <span className="ml-2 text-lg font-semibold">Your Company</span>
            </a>
            <p className="text-gray-400">
              Building innovative solutions for a better tomorrow. Stay connected with us for updates and news.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Get in Touch</h4>
            <p className="text-gray-400 mb-4">info@yourcompany.com</p>
            <p className="text-gray-400 mb-4">+1 (234) 567-890</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path d="M12 2.163c-5.823 0-10.54 4.717-10.54 10.54 0 4.677 3.662 8.537 8.339 10.212v-7.22H7.896v-3.018h2.903v-2.345c0-2.87 1.75-4.433 4.301-4.433 1.222 0 2.27.091 2.576.131v2.987h-1.768c-1.387 0-1.654.657-1.654 1.623v2.037h3.308l-.432 3.018h-2.876v7.28c4.677-1.675 8.339-5.535 8.339-10.212 0-5.823-4.717-10.54-10.54-10.54z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path d="M24 4.559c-.883.392-1.832.657-2.828.775a4.932 4.932 0 0 0 2.165-2.723 9.865 9.865 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.37 4.482 13.94 13.94 0 0 1-10.11-5.13 4.906 4.906 0 0 0 1.524 6.553A4.886 4.886 0 0 1 .964 9.71v.062a4.919 4.919 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.224.084 4.919 4.919 0 0 0 4.6 3.417 9.862 9.862 0 0 1-6.1 2.104c-.395 0-.785-.023-1.17-.068a13.902 13.902 0 0 0 7.548 2.212c9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.426-.015-.637A10.005 10.005 0 0 0 24 4.559z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path d="M19.633 8.301a4.527 4.527 0 0 0-3.195-3.215c-2.863-.722-9.438-.722-12.301 0a4.524 4.524 0 0 0-3.215 3.215c-.722 2.863-.722 9.438 0 12.301a4.524 4.524 0 0 0 3.215 3.215c2.863.722 9.438.722 12.301 0a4.524 4.524 0 0 0 3.215-3.215c.722-2.863.722-9.438 0-12.301zm-7.633 10.4a4.915 4.915 0 1 1 0-9.83 4.915 4.915 0 0 1 0 9.83zm6.3-10.717a1.15 1.15 0 1 1 0-2.3 1.15 1.15 0 0 1 0 2.3z" />
                  <circle cx="12" cy="12" r="3.2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
