import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const DemoLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, setCurrentView } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular un pequeño delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(password);
    if (!success) {
      setError('Contraseña incorrecta. Intenta de nuevo.');
      setPassword('');
    }
    setIsLoading(false);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              Acceso a Demos
            </h1>
            <p className="text-neutral-600">
              Ingresa la contraseña para ver las demostraciones de nuestros productos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Ingresa tu contraseña"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {isLoading ? 'Verificando...' : 'Acceder'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleBackToHome}
              className="text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              ← Volver al inicio
            </button>
          </div>

          <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
            <p className="text-xs text-neutral-500 text-center">
              <strong>Para esta demo:</strong> La contraseña es "demo123"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoLogin;