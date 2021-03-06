export const minDate = new Date(new Date().getFullYear() - 20, 0, 1);
export const maxDate = new Date(new Date().getFullYear() + 1, 11, 31);

const isValidDate = (d: Date | null): boolean => {
  return d instanceof Date && !isNaN(d.getTime());
}

export const isValidStartDate = (date: Date | null): boolean => {
  if (date) {
    return isValidDate(date) && date >= minDate && date <= maxDate;
  } else {
    return false;
  }
}

export const isValidStartDateAndCountry = (date: Date|null, country: string): boolean => {
  return isValidStartDate(date) && country.length > 0;
}

export const isValidUsage = (usage: (number | undefined)): boolean => {
  if (typeof usage === 'undefined') {
    return false;
  }
  const re = /^[0-9]+(\.[0-9]+)?$/
  return re.test('' + usage) && usage > 0;
}

export const isValidWeeklyUsages = (weeklyUsage: (number | undefined)[]): boolean => {
  for (let i = 0; i < weeklyUsage.length; i++) {
    if (!isValidUsage(weeklyUsage[i])) {
      return false;
    }
  }
  return true;
}
