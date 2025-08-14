import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
     
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Erick Gil. All rights reserved.
        </div>
    
    </footer>
  );
};

export default Footer;
