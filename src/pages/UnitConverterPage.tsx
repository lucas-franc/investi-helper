
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import UnitConverter from '@/components/calculators/UnitConverter';
import { ArrowLeftRight } from 'lucide-react';
import Card from '@/components/ui-components/Card';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

const UnitConverterPage = () => {
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
          <Card variant="blue" className="shadow-md border-2">
            <div className="text-center mb-8">
              <ArrowLeftRight className="w-16 h-16 mb-4 mx-auto text-blue-600" />
              <h2 className="text-3xl font-semibold text-blue-800">Conversor de Unidades</h2>
              <p className="text-blue-600 mt-3 text-lg">Converta facilmente entre diferentes unidades de medida</p>
              <Separator className="my-6 bg-blue-100" />
            </div>
            <UnitConverter />
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default UnitConverterPage;
