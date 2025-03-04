
import { saveAs } from 'file-saver';

// Function to export data as CSV
export const exportToCsv = (data: any[], filename: string) => {
  // Convert data to CSV format
  const csvRows = [];
  
  // Add header row if data has objects
  if (data.length > 0 && typeof data[0] === 'object') {
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    
    // Add data rows
    data.forEach(item => {
      const values = headers.map(header => {
        const value = item[header];
        // Handle string values that may contain commas
        const escaped = typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
        return escaped;
      });
      csvRows.push(values.join(','));
    });
  } else {
    // Simple array data
    csvRows.push(data.join(','));
  }
  
  // Create CSV file
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
  
  // Save file
  saveAs(blob, `${filename}.csv`);
};

// Function to create a simple PDF using window.print()
export const printResults = () => {
  // Prepare the page for printing
  const originalTitle = document.title;
  document.title = 'Investment Results';
  
  // Trigger print dialog
  window.print();
  
  // Restore original title
  document.title = originalTitle;
};

// Helper function to format currency
export const formatCurrency = (value: number, currency: string = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Helper function to format percentage
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};
