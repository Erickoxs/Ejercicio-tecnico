import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        
        {/* Contenido principal del footer */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">Erick Gil</h2>
          <p className="text-sm text-gray-400">
            Construyendo experiencias digitales con pasión y calidad.
          </p>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Erick Gil. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
