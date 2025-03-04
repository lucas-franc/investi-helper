
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Calculator, Download, Printer, ChevronsUpDown, DollarSign, Clock 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { calculateCompoundInterest } from '@/utils/calculatorUtils';
import { exportToCsv, printResults, formatCurrency } from '@/utils/exportUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const CompoundInterestCalculator = () => {
  const [initialCapital, setInitialCapital] = useState<number>(1000);
  const [interestRate, setInterestRate] = useState<number>(0.5);
  const [time, setTime] = useState<number>(12);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const [results, setResults] = useState<{ 
    totalAmount: number; 
    interestEarned: number; 
    timelineData: any[];
  }>({ totalAmount: 0, interestEarned: 0, timelineData: [] });
  
  // Calculate on input changes
  useEffect(() => {
    const result = calculateCompoundInterest(
      initialCapital,
      interestRate,
      time,
      monthlyContribution,
      isMonthly
    );
    setResults(result);
  }, [initialCapital, interestRate, time, monthlyContribution, isMonthly]);
  
  // Handle exports
  const handleExportCsv = () => {
    exportToCsv(results.timelineData, 'investment-results');
    toast.success('Resultados exportados como CSV');
  };
  
  const handlePrint = () => {
    printResults();
  };
  
  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-md shadow-md">
          <p className="text-sm font-medium">{`Mês ${label}`}</p>
          <p className="text-sm text-gray-600">{`Valor: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-8 animate-enter">
      <div className="flex items-center space-x-3">
        <Calculator className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-medium">Calculadora de Juros Compostos</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="p-6 space-y-6 h-full">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="initialCapital" className="text-sm font-medium">
                  Capital Inicial (R$)
                </Label>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(initialCapital)}
                </span>
              </div>
              <div className="flex space-x-4">
                <Input
                  id="initialCapital"
                  type="number"
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  min="0"
                  className="w-full"
                />
              </div>
              <Slider
                value={[initialCapital]}
                min={0}
                max={100000}
                step={100}
                onValueChange={(value) => setInitialCapital(value[0])}
                className="my-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="monthlyContribution" className="text-sm font-medium">
                  Aporte Mensal (R$)
                </Label>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(monthlyContribution)}
                </span>
              </div>
              <Input
                id="monthlyContribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                min="0"
                className="w-full"
              />
              <Slider
                value={[monthlyContribution]}
                min={0}
                max={10000}
                step={50}
                onValueChange={(value) => setMonthlyContribution(value[0])}
                className="my-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="interestRate" className="text-sm font-medium">
                    Taxa de Juros {isMonthly ? '(% ao mês)' : '(% ao ano)'}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="rateType"
                      checked={isMonthly}
                      onCheckedChange={setIsMonthly}
                    />
                    <Label htmlFor="rateType" className="text-xs text-muted-foreground cursor-pointer">
                      {isMonthly ? 'Mensal' : 'Anual'}
                    </Label>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min="0"
                step="0.01"
                className="w-full"
              />
              <Slider
                value={[interestRate]}
                min={0}
                max={isMonthly ? 10 : 50}
                step={0.1}
                onValueChange={(value) => setInterestRate(value[0])}
                className="my-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="time" className="text-sm font-medium">
                  Tempo {isMonthly ? '(meses)' : '(anos)'}
                </Label>
                <span className="text-sm text-muted-foreground">
                  {time} {isMonthly ? 'meses' : 'anos'}
                </span>
              </div>
              <Input
                id="time"
                type="number"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                min="1"
                className="w-full"
              />
              <Slider
                value={[time]}
                min={1}
                max={isMonthly ? 120 : 40}
                step={1}
                onValueChange={(value) => setTime(value[0])}
                className="my-2"
              />
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportCsv}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>CSV</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrint}
              className="flex items-center space-x-2"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </Button>
          </div>
        </Card>
        
        {/* Results Panel */}
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-medium">Resultados</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg space-y-1">
              <p className="text-xs text-muted-foreground">Montante Final</p>
              <p className="text-2xl font-medium">{formatCurrency(results.totalAmount)}</p>
            </div>
            
            <div className="p-4 bg-secondary rounded-lg space-y-1">
              <p className="text-xs text-muted-foreground">Juros Acumulados</p>
              <p className="text-2xl font-medium">{formatCurrency(results.interestEarned)}</p>
            </div>
            
            <div className="p-4 bg-secondary rounded-lg space-y-1">
              <p className="text-xs text-muted-foreground">Capital Investido</p>
              <p className="text-lg font-medium">
                {formatCurrency(initialCapital + (monthlyContribution * (isMonthly ? time : time * 12)))}
              </p>
            </div>
            
            <div className="p-4 bg-secondary rounded-lg space-y-1">
              <p className="text-xs text-muted-foreground">Rendimento Total</p>
              <p className="text-lg font-medium">
                {(results.interestEarned / (initialCapital + (monthlyContribution * (isMonthly ? time : time * 12))) * 100).toFixed(2)}%
              </p>
            </div>
          </div>
          
          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={results.timelineData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="month" 
                  label={{ 
                    value: isMonthly ? 'Meses' : 'Anos', 
                    position: 'insideBottomRight', 
                    offset: -5 
                  }} 
                />
                <YAxis 
                  tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Valor"
                  stroke="hsl(var(--primary))"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
