import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal"; // Asegúrate de importar correctamente el modal

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  // Maneja la apertura y cierre del modal
  const handleLoginOpen = () => setIsLoginModalOpen(true);
  const handleLoginClose = () => setIsLoginModalOpen(false);

  // Comprueba si hay un token en el almacenamiento local al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Supongamos que el nombre del usuario también está almacenado en localStorage
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId")
    setUserName(null);
    window.location.reload();
  };

  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company Logo"
              />
            </a>
          </div>
         
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {userName ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold text-gray-900">
                  Hola, {userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-600 hover:underline"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <button
              >
                
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10"></div>
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company Logo"
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a
                      href="#"
                      className="block text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Product
                    </a>
                    <a
                      href="#"
                      className="block text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Features
                    </a>
                    <a
                      href="#"
                      className="block text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Marketplace
                    </a>
                    <a
                      href="#"
                      className="block text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Company
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {isLoginModalOpen && <LoginModal onClose={handleLoginClose}  onLogin={(userName) => setUserName(userName)} />}
    </>
  );
};

export default Navbar;
