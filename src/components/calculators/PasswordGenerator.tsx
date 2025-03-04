
import React, { useState, useEffect } from 'react';
import { KeyRound, Copy, RefreshCw, Check, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { generatePassword, calculatePasswordStrength } from '@/utils/calculatorUtils';

const PasswordGenerator = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [includeLetters, setIncludeLetters] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(true);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  
  // Generate password on initial load and when options change
  useEffect(() => {
    handleGeneratePassword();
  }, []);
  
  // Calculate password strength when password changes
  useEffect(() => {
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  }, [password]);
  
  // Generate new password
  const handleGeneratePassword = () => {
    const newPassword = generatePassword(
      passwordLength,
      includeLetters,
      includeNumbers,
      includeSpecialChars
    );
    setPassword(newPassword);
    setCopied(false);
  };
  
  // Copy password to clipboard
  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast.success('Senha copiada para a área de transferência');
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error('Erro ao copiar senha');
      console.error('Failed to copy: ', error);
    }
  };
  
  // Get password strength text and color
  const getStrengthInfo = (strength: number) => {
    if (strength < 30) return { text: 'Fraca', color: 'bg-red-500' };
    if (strength < 60) return { text: 'Média', color: 'bg-yellow-500' };
    if (strength < 80) return { text: 'Boa', color: 'bg-blue-500' };
    return { text: 'Forte', color: 'bg-green-500' };
  };
  
  const strengthInfo = getStrengthInfo(passwordStrength);
  
  return (
    <div className="space-y-8 animate-enter">
      <div className="flex items-center space-x-3">
        <KeyRound className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-medium">Gerador de Senhas Fortes</h2>
      </div>
      
      <Card className="p-6 space-y-6">
        <div className="relative">
          <Input
            value={password}
            readOnly
            className="pr-20 font-mono text-lg h-14"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleGeneratePassword}
              className="h-8 w-8 rounded-full"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost"
              size="icon"
              onClick={handleCopyPassword}
              className="h-8 w-8 rounded-full"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className={`w-4 h-4 ${
                passwordStrength < 30 ? 'text-red-500' :
                passwordStrength < 60 ? 'text-yellow-500' :
                passwordStrength < 80 ? 'text-blue-500' :
                'text-green-500'
              }`} />
              <span className="text-sm font-medium">Força da Senha: {strengthInfo.text}</span>
            </div>
            <span className="text-sm text-muted-foreground">{passwordStrength}%</span>
          </div>
          <Progress value={passwordStrength} className={strengthInfo.color} />
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="passwordLength" className="text-sm font-medium">
                Comprimento da Senha
              </Label>
              <span className="text-sm text-muted-foreground">{passwordLength} caracteres</span>
            </div>
            <Slider
              id="passwordLength"
              value={[passwordLength]}
              min={8}
              max={32}
              step={1}
              onValueChange={(value) => setPasswordLength(value[0])}
              className="my-2"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Incluir:</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="includeLetters" 
                  checked={includeLetters}
                  onCheckedChange={setIncludeLetters}
                />
                <Label htmlFor="includeLetters" className="cursor-pointer">Letras (a-z, A-Z)</Label>
              </div>
              <span className="text-xs text-muted-foreground">abc, XYZ</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="includeNumbers" 
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                />
                <Label htmlFor="includeNumbers" className="cursor-pointer">Números (0-9)</Label>
              </div>
              <span className="text-xs text-muted-foreground">123, 789</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="includeSpecialChars" 
                  checked={includeSpecialChars}
                  onCheckedChange={setIncludeSpecialChars}
                />
                <Label htmlFor="includeSpecialChars" className="cursor-pointer">Caracteres Especiais</Label>
              </div>
              <span className="text-xs text-muted-foreground">!@#$%</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-end">
          <Button onClick={handleGeneratePassword} className="w-full sm:w-auto">
            Gerar Nova Senha
          </Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Dicas para Senhas Seguras</h3>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
          <li>Use senhas com pelo menos 12 caracteres</li>
          <li>Combine letras, números e caracteres especiais</li>
          <li>Não use informações pessoais como nomes ou datas</li>
          <li>Use senhas únicas para cada serviço</li>
          <li>Considere usar um gerenciador de senhas</li>
        </ul>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
