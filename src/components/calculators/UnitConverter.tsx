import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, ThermometerIcon, ClockIcon, RulerIcon, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { convertUnits } from '@/utils/calculatorUtils';
import { toast } from 'sonner';

const UnitConverter = () => {
  const [category, setCategory] = useState<string>('temperature');
  const [fromValue, setFromValue] = useState<number>(0);
  const [toValue, setToValue] = useState<number>(0);
  const [fromUnit, setFromUnit] = useState<string>('celsius');
  const [toUnit, setToUnit] = useState<string>('fahrenheit');
  const [exchangeRates, setExchangeRates] = useState<any>({
    USD: 1,
    BRL: 5.05,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 151.32,
  });
  
  // Unit categories and their options
  const unitCategories = {
    temperature: {
      name: 'Temperatura',
      icon: <ThermometerIcon className="w-4 h-4" />,
      units: [
        { value: 'celsius', label: 'Celsius (°C)' },
        { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
        { value: 'kelvin', label: 'Kelvin (K)' }
      ]
    },
    length: {
      name: 'Comprimento',
      icon: <RulerIcon className="w-4 h-4" />,
      units: [
        { value: 'millimeters', label: 'Milímetros (mm)' },
        { value: 'centimeters', label: 'Centímetros (cm)' },
        { value: 'meters', label: 'Metros (m)' },
        { value: 'kilometers', label: 'Quilômetros (km)' },
        { value: 'inches', label: 'Polegadas (in)' },
        { value: 'feet', label: 'Pés (ft)' },
        { value: 'yards', label: 'Jardas (yd)' },
        { value: 'miles', label: 'Milhas (mi)' }
      ]
    },
    time: {
      name: 'Tempo',
      icon: <ClockIcon className="w-4 h-4" />,
      units: [
        { value: 'seconds', label: 'Segundos (s)' },
        { value: 'minutes', label: 'Minutos (min)' },
        { value: 'hours', label: 'Horas (h)' },
        { value: 'days', label: 'Dias (d)' }
      ]
    },
    currency: {
      name: 'Moeda',
      icon: <DollarSign className="w-4 h-4" />,
      units: [
        { value: 'USD', label: 'Dólar (USD)' },
        { value: 'BRL', label: 'Real (BRL)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'Libra (GBP)' },
        { value: 'JPY', label: 'Iene (JPY)' }
      ]
    }
  };
  
  // Set default units based on category
  useEffect(() => {
    const categoryUnits = unitCategories[category as keyof typeof unitCategories].units;
    setFromUnit(categoryUnits[0].value);
    setToUnit(categoryUnits[1].value);
    // Reset values when changing categories
    setFromValue(0);
    setToValue(0);
  }, [category]);
  
  // Convert values when inputs change
  useEffect(() => {
    if (category === 'currency') {
      // Currency conversion using exchange rates
      if (fromUnit && toUnit && exchangeRates[fromUnit] && exchangeRates[toUnit]) {
        const valueInUSD = fromValue / exchangeRates[fromUnit];
        const convertedValue = valueInUSD * exchangeRates[toUnit];
        setToValue(Number(convertedValue.toFixed(6)));
      }
    } else {
      // Other conversions
      const result = convertUnits(fromValue, fromUnit, toUnit, category);
      setToValue(Number(result.toFixed(6)));
    }
  }, [fromValue, fromUnit, toUnit, category, exchangeRates]);
  
  // Handle swap units
  const handleSwapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    const tempValue = fromValue;
    setFromValue(toValue);
    setToValue(tempValue);
  };
  
  // Format value display
  const formatValueDisplay = (value: number, unit: string) => {
    if (category === 'currency') {
      const currencySymbols: Record<string, string> = {
        USD: '$',
        BRL: 'R$',
        EUR: '€',
        GBP: '£',
        JPY: '¥'
      };
      
      return `${currencySymbols[unit] || ''}${value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
    
    return value;
  };
  
  return (
    <div className="space-y-8 animate-enter">
      <div className="flex items-center space-x-3">
        <ArrowLeftRight className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-medium">Conversor de Unidades</h2>
      </div>
      
      <Card className="p-6 space-y-6">
        <Tabs 
          defaultValue={category} 
          onValueChange={(value) => setCategory(value)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            {Object.entries(unitCategories).map(([key, { name, icon }]) => (
              <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
                {icon}
                <span>{name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(unitCategories).map(([key, { name }]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="fromValue">Valor de Origem</Label>
                    <div className="flex space-x-3">
                      <Input
                        id="fromValue"
                        type="number"
                        value={fromValue}
                        onChange={(e) => setFromValue(Number(e.target.value))}
                        className="flex-1"
                      />
                      <Select
                        value={fromUnit}
                        onValueChange={setFromUnit}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecione a unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {unitCategories[key as keyof typeof unitCategories].units.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSwapUnits}
                      className="rounded-full h-12 w-12 flex items-center justify-center"
                    >
                      <ArrowLeftRight className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 md:col-start-2">
                    <Label htmlFor="toValue">Valor Convertido</Label>
                    <div className="flex space-x-3">
                      <Input
                        id="toValue"
                        type="number"
                        value={toValue}
                        onChange={(e) => setToValue(Number(e.target.value))}
                        className="flex-1"
                        readOnly={category !== 'currency'} // Only allow editing for currency
                      />
                      <Select
                        value={toUnit}
                        onValueChange={setToUnit}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecione a unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {unitCategories[key as keyof typeof unitCategories].units.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-center">
                    {fromValue} {unitCategories[key as keyof typeof unitCategories].units.find(u => u.value === fromUnit)?.label} = {' '}
                    <span className="font-medium">
                      {formatValueDisplay(toValue, toUnit)} {unitCategories[key as keyof typeof unitCategories].units.find(u => u.value === toUnit)?.label}
                    </span>
                  </p>
                </div>
                
                {category === 'currency' && (
                  <p className="text-xs text-muted-foreground text-center">
                    * Taxas de câmbio aproximadas para fins demonstrativos. Para valores reais, considere conectar a uma API de câmbio.
                  </p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};

export default UnitConverter;
