
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Calculator, KeyRound, ArrowLeftRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import Card from '@/components/ui-components/Card';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/juros-compostos" className="block">
              <Card variant="green" className="shadow-md border-2 h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="text-center">
                  <Calculator className="w-16 h-16 mb-4 mx-auto text-green-600" />
                  <h2 className="text-2xl font-semibold text-green-800">Calculadora de Juros Compostos</h2>
                  <p className="text-green-600 mt-2">Calcule o crescimento do seu investimento ao longo do tempo</p>
                </div>
              </Card>
            </Link>
            
            <Link to="/gerador-senhas" className="block">
              <Card variant="purple" className="shadow-md border-2 h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="text-center">
                  <KeyRound className="w-16 h-16 mb-4 mx-auto text-purple-600" />
                  <h2 className="text-2xl font-semibold text-purple-800">Gerador de Senhas</h2>
                  <p className="text-purple-600 mt-2">Crie senhas seguras e fáceis de lembrar</p>
                </div>
              </Card>
            </Link>
            
            <Link to="/conversor-unidades" className="block">
              <Card variant="blue" className="shadow-md border-2 h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="text-center">
                  <ArrowLeftRight className="w-16 h-16 mb-4 mx-auto text-blue-600" />
                  <h2 className="text-2xl font-semibold text-blue-800">Conversor de Unidades</h2>
                  <p className="text-blue-600 mt-2">Converta facilmente entre diferentes unidades de medida</p>
                </div>
              </Card>
            </Link>
          </div>
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
