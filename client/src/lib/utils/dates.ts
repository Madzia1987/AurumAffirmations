export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('pl-PL', options);
};

export const formatShortDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  };
  return date.toLocaleDateString('pl-PL', options);
};

export const getDayNumber = (): number => {
  const today = new Date();
  const day = today.getDate();
  
  // Simple digit sum for day number
  return reduceSingleDigit(day);
};

// Reduce a number to a single digit (unless it's a master number)
export const reduceSingleDigit = (num: number): number => {
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }
  
  while (num > 9) {
    num = String(num).split('').reduce((a, b) => Number(a) + Number(b), 0);
  }
  
  return num;
};
