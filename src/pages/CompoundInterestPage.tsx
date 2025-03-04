
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import { Calculator } from 'lucide-react';
import Card from '@/components/ui-components/Card';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

const CompoundInterestPage = () => {
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
          <Card variant="green" className="shadow-md border-2">
            <div className="text-center mb-8">
              <Calculator className="w-16 h-16 mb-4 mx-auto text-green-600" />
              <h2 className="text-3xl font-semibold text-green-800">Calculadora de Juros Compostos</h2>
              <p className="text-green-600 mt-3 text-lg">Calcule o crescimento do seu investimento ao longo do tempo</p>
              <Separator className="my-6 bg-green-100" />
            </div>
            <CompoundInterestCalculator />
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default CompoundInterestPage;
