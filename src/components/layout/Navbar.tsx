
import React from 'react';
import { Calculator, KeyRound, ArrowLeftRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  // Define a função para verificar rota ativa
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="w-full fixed top-0 left-0 z-50 glass-morphism border-b border-gray-100">
      <div className="app-container flex justify-between items-center h-16 px-6">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-medium">Utilidades</h1>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={`flex items-center space-x-2 text-sm hover:text-primary focus-ring rounded transition-colors ${
              isActive('/') ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Início</span>
          </Link>
          
          <Link 
            to="/juros-compostos" 
            className={`flex items-center space-x-2 text-sm hover:text-primary focus-ring rounded transition-colors ${
              isActive('/juros-compostos') ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Juros Compostos</span>
          </Link>
          
          <Link 
            to="/gerador-senhas" 
            className={`flex items-center space-x-2 text-sm hover:text-primary focus-ring rounded transition-colors ${
              isActive('/gerador-senhas') ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Gerador de Senhas</span>
          </Link>
          
          <Link 
            to="/conversor-unidades" 
            className={`flex items-center space-x-2 text-sm hover:text-primary focus-ring rounded transition-colors ${
              isActive('/conversor-unidades') ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Conversor de Unidades</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
