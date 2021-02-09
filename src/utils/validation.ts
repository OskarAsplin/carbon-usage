export const minDate = new Date(new Date().getFullYear() - 20, 0, 1);
export const maxDate = new Date(new Date().getFullYear() + 1, 11, 31);

const isValidDate = (d: any) => {
  return d instanceof Date && !isNaN(d.getTime());
}

export const isValidStartDate = (date: Date | null) => {
  if (date) {
    return isValidDate(date) && date >= minDate && date <= maxDate;
  } else {
    return false;
  }
}

export const isValidStartDateAndCountry = (date: Date|null, country: string) => {
  return isValidStartDate(date) && country.length > 0;
}

export const isValidWeeklyUsages = (weeklyUsage: (number | undefined)[]) => {
  const re = /^[0-9]+(\.[0-9]+)?$/
  if (!weeklyUsage.includes(undefined)) {
    for (let i = 0; i < weeklyUsage.length; i++) {
      const validated = re.test('' + weeklyUsage[i]);
      if (!validated) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
  return !weeklyUsage.includes(undefined)
}
