
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import PasswordGenerator from '@/components/calculators/PasswordGenerator';
import { KeyRound } from 'lucide-react';
import Card from '@/components/ui-components/Card';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

const PasswordGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      <main className="app-container pt-24 pb-16">
        <motion.div 
          className="max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card variant="purple" className="shadow-md border-2">
            <div className="text-center mb-8">
              <KeyRound className="w-16 h-16 mb-4 mx-auto text-purple-600" />
              <h2 className="text-3xl font-semibold text-purple-800">Gerador de Senhas</h2>
              <p className="text-purple-600 mt-3 text-lg">Crie senhas seguras e fáceis de lembrar</p>
              <Separator className="my-6 bg-purple-100" />
            </div>
            <PasswordGenerator />
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default PasswordGeneratorPage;
