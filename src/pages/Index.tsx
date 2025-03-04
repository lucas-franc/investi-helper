
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import PasswordGenerator from '@/components/calculators/PasswordGenerator';
import UnitConverter from '@/components/calculators/UnitConverter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, KeyRound, ArrowLeftRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import Card from '@/components/ui-components/Card';
import { motion } from 'framer-motion';

// Add dependency
<lov-add-dependency>framer-motion@latest</lov-add-dependency>
<lov-add-dependency>file-saver@latest</lov-add-dependency>

const Index = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      <main className="app-container pt-24 pb-16">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto space-y-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-medium tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Ferramentas úteis para o seu dia a dia
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Calculadora de juros compostos, gerador de senhas e conversor de unidades em um só lugar.
          </motion.p>
        </motion.div>
        
        {/* Tools Section */}
        <div className="max-w-5xl mx-auto px-4">
          <Tabs defaultValue="compound-interest" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
              <TabsTrigger value="compound-interest" className="flex items-center justify-center space-x-2 py-3">
                <Calculator className="w-5 h-5" />
                <span>Juros Compostos</span>
              </TabsTrigger>
              
              <TabsTrigger value="password-generator" className="flex items-center justify-center space-x-2 py-3">
                <KeyRound className="w-5 h-5" />
                <span>Gerador de Senhas</span>
              </TabsTrigger>
              
              <TabsTrigger value="unit-converter" className="flex items-center justify-center space-x-2 py-3">
                <ArrowLeftRight className="w-5 h-5" />
                <span>Conversor de Unidades</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="compound-interest" className="mt-0 animate-fade-in focus:outline-none">
              <CompoundInterestCalculator />
            </TabsContent>
            
            <TabsContent value="password-generator" className="mt-0 animate-fade-in focus:outline-none">
              <PasswordGenerator />
            </TabsContent>
            
            <TabsContent value="unit-converter" className="mt-0 animate-fade-in focus:outline-none">
              <UnitConverter />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Footer */}
        <motion.footer 
          className="mt-24 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p>Feito com precisão e cuidado para seu uso diário</p>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
