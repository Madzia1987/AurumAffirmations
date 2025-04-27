// Numerology calculator functions

// Calculate name number
export const calculateNameNumber = (name: string): number => {
  const normalizedName = name.toLowerCase().trim();
  let sum = 0;
  
  for (let i = 0; i < normalizedName.length; i++) {
    const char = normalizedName.charAt(i);
    const charCode = char.charCodeAt(0) - 96; // 'a' is 97 in ASCII
    
    if (charCode > 0 && charCode < 27) {
      sum += charCode;
    }
  }
  
  return reduceSingleDigit(sum);
};

// Calculate life path number
export const calculateLifePathNumber = (birthdate: string): number => {
  const parts = birthdate.split('-');
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Use YYYY-MM-DD');
  }
  
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);
  
  const dayNum = reduceSingleDigit(day);
  const monthNum = reduceSingleDigit(month);
  const yearNum = reduceSingleDigit(year);
  
  return reduceSingleDigit(dayNum + monthNum + yearNum);
};

// Reduce to single digit
export const reduceSingleDigit = (num: number): number => {
  // Keep master numbers
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }
  
  while (num > 9) {
    num = String(num).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }
  
  return num;
};

// Get day number for today
export const getDayNumber = (): number => {
  const today = new Date();
  return reduceSingleDigit(today.getDate());
};

// Get simple numerology meaning for a number
export const getBasicMeaning = (number: number): string => {
  const meanings: Record<number, string> = {
    1: "Numer 1 symbolizuje nowe początki, przywództwo i niezależność. Dzisiaj jest dobry dzień na rozpoczęcie nowych projektów.",
    2: "Numer 2 to harmonii, współpracy i dyplomacji. Dzisiaj warto skupić się na relacjach i partnerstwie.",
    3: "Numer 3 reprezentuje kreatywność, radość i ekspresję. Doskonały dzień, aby wyrażać siebie i cieszyć się życiem.",
    4: "Numer 4 to stabilność, porządek i praktyczność. Dzisiaj warto skupić się na organizacji i tworzeniu solidnych fundamentów.",
    5: "Numer 5 symbolizuje zmianę, wolność i przygodę. Dzień sprzyja podejmowaniu ryzyka i nowym doświadczeniom.",
    6: "Numer 6 to opieka, odpowiedzialność i równowaga. Dobry dzień na dbanie o innych i tworzenie harmonii w domu.",
    7: "Numer 7 symbolizuje duchowość, analizę i refleksję. Dzień sprzyja medytacji i wewnętrznym poszukiwaniom.",
    8: "Numer 8 to siła, obfitość i władza. Doskonały dzień na sprawy finansowe i działania biznesowe.",
    9: "Numer 9 reprezentuje zakończenia, altruizm i mądrość. Dobry dzień na zamknięcie spraw i działanie dla dobra innych.",
    11: "Numer mistrzowski 11 to intuicja, duchowa inspiracja i oświecenie. Dzień sprzyja duchowym praktykom i podążaniu za intuicją.",
    22: "Numer mistrzowski 22 to budowniczy i realizator wielkich wizji. Dzień sprzyja tworzeniu projektów na dużą skalę.",
    33: "Numer mistrzowski 33 to nauczyciel i opiekun. Dzień sprzyja działaniom altruistycznym i pomocy innym."
  };

  return meanings[number] || "Znaczenie niedostępne. Spróbuj ponownie później.";
};
