
// Function to calculate compound interest
export const calculateCompoundInterest = (
  initialCapital: number,
  interestRate: number,
  time: number,
  monthlyContribution: number,
  isMonthly: boolean
): { totalAmount: number; interestEarned: number; timelineData: any[] } => {
  // Convert annual rate to monthly if needed
  let monthlyRate = isMonthly ? interestRate / 100 : (interestRate / 100) / 12;
  // Convert time to months
  let totalMonths = isMonthly ? time : time * 12;
  
  let currentCapital = initialCapital;
  let timelineData = [];
  
  // First data point is the initial investment
  timelineData.push({
    month: 0,
    amount: initialCapital,
    interest: 0,
    contribution: 0
  });
  
  // Calculate for each month
  for (let month = 1; month <= totalMonths; month++) {
    // Calculate interest for this month
    const interestThisMonth = currentCapital * monthlyRate;
    
    // Add monthly contribution and interest
    currentCapital += interestThisMonth + monthlyContribution;
    
    // Add data point every 6 months or at the end
    if (month % 6 === 0 || month === totalMonths) {
      timelineData.push({
        month,
        amount: currentCapital,
        interest: interestThisMonth,
        contribution: monthlyContribution
      });
    }
  }
  
  const totalAmount = currentCapital;
  const interestEarned = totalAmount - initialCapital - (monthlyContribution * totalMonths);
  
  return { totalAmount, interestEarned, timelineData };
};

// Function to generate a strong password
export const generatePassword = (
  length: number,
  includeLetters: boolean,
  includeNumbers: boolean,
  includeSpecialChars: boolean
): string => {
  // Character sets
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
  // Build character pool based on options
  let charPool = '';
  if (includeLetters) charPool += letters;
  if (includeNumbers) charPool += numbers;
  if (includeSpecialChars) charPool += specialChars;
  
  // If no options selected, default to letters
  if (charPool.length === 0) charPool = letters;
  
  // Generate password
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool.charAt(randomIndex);
  }
  
  return password;
};

// Function to calculate password strength from 0-100
export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length contribution (up to 40 points)
  const lengthFactor = Math.min(password.length / 32, 1);
  strength += lengthFactor * 40;
  
  // Character variety contribution (up to 60 points)
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[^a-zA-Z0-9]/.test(password);
  
  if (hasLowercase) strength += 15;
  if (hasUppercase) strength += 15;
  if (hasNumbers) strength += 15;
  if (hasSpecialChars) strength += 15;
  
  return Math.min(100, strength);
};

// Function to convert units
export const convertUnits = (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: string
): number => {
  // Temperature conversions
  if (category === 'temperature') {
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      return (value * 9/5) + 32;
    }
    if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
      return (value - 32) * 5/9;
    }
    if (fromUnit === 'celsius' && toUnit === 'kelvin') {
      return value + 273.15;
    }
    if (fromUnit === 'kelvin' && toUnit === 'celsius') {
      return value - 273.15;
    }
    if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
      return (value - 32) * 5/9 + 273.15;
    }
    if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
      return (value - 273.15) * 9/5 + 32;
    }
  }
  
  // Time conversions
  if (category === 'time') {
    const conversionFactors: { [key: string]: number } = {
      'seconds': 1,
      'minutes': 60,
      'hours': 3600,
      'days': 86400,
    };
    
    // Convert to the base unit (seconds), then to the target unit
    const valueInSeconds = value * conversionFactors[fromUnit];
    return valueInSeconds / conversionFactors[toUnit];
  }
  
  // Length conversions
  if (category === 'length') {
    const conversionFactors: { [key: string]: number } = {
      'millimeters': 1,
      'centimeters': 10,
      'meters': 1000,
      'kilometers': 1000000,
      'inches': 25.4,
      'feet': 304.8,
      'yards': 914.4,
      'miles': 1609344,
    };
    
    // Convert to the base unit (millimeters), then to the target unit
    const valueInMillimeters = value * conversionFactors[fromUnit];
    return valueInMillimeters / conversionFactors[toUnit];
  }
  
  // Default case - no conversion or same units
  return value;
};
