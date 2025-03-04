
import React from 'react';
import { Calculator, KeyRound, ArrowLeftRight } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 glass-morphism border-b border-gray-100">
      <div className="app-container flex justify-between items-center h-16 px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-medium">Utilidades</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#compound-interest" 
            className="flex items-center space-x-2 text-sm hover:text-primary focus-ring rounded"
          >
            <Calculator className="w-4 h-4" />
            <span>Juros Compostos</span>
          </a>
          
          <a 
            href="#password-generator" 
            className="flex items-center space-x-2 text-sm hover:text-primary focus-ring rounded"
          >
            <KeyRound className="w-4 h-4" />
            <span>Gerador de Senhas</span>
          </a>
          
          <a 
            href="#unit-converter" 
            className="flex items-center space-x-2 text-sm hover:text-primary focus-ring rounded"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Conversor de Unidades</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
