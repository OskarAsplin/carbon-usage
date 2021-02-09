import { minDate, maxDate, isValidStartDate, isValidStartDateAndCountry, isValidWeeklyUsages } from './validation';

it('validates start date to be a valid date', () => {
    const invalidDate = new Date('12/12/123');
    const validDate = new Date('12/12/2021');
    expect(isValidStartDate(invalidDate)).toBeFalsy();
    expect(isValidStartDate(null)).toBeFalsy();
    expect(isValidStartDate(validDate)).toBeTruthy();
});

it('validates start date to be inside limits', () => {
    const lessThanMin: Date = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    lessThanMin.setDate(lessThanMin.getDate() - 1);
    lessThanMin.setTime(0);
    const moreThanMax: Date = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    moreThanMax.setDate(maxDate.getDate() + 1);

    expect(isValidStartDate(lessThanMin)).toBeFalsy();
    expect(isValidStartDate(moreThanMax)).toBeFalsy();
    expect(isValidStartDate(minDate)).toBeTruthy();
    expect(isValidStartDate(maxDate)).toBeTruthy();
});

it('validates date and country', () => {
    const invalidDate = new Date('12/12/123');
    const validDate = new Date('12/12/2021');

    expect(isValidStartDateAndCountry(validDate, '')).toBeFalsy();
    expect(isValidStartDateAndCountry(invalidDate, 'us')).toBeFalsy();
    expect(isValidStartDateAndCountry(validDate, 'us')).toBeTruthy();
});

it('validates weekly usages', () => {
    const undefinedWeeklyUsages = Array(7).fill(undefined);
    const invalidWeeklyUsages_0 = Array(7).fill('13.1.1');
    const invalidWeeklyUsages_1 = Array(7).fill('.11');
    const invalidWeeklyUsages_2 = Array(7).fill('13.37e');
    const invalidWeeklyUsages_3 = Array(7).fill('0');
    const validWeeklyUsages_0 = Array(7).fill('13.11');
    const validWeeklyUsages_1 = Array(7).fill('123456789.123456789');

    expect(isValidWeeklyUsages(undefinedWeeklyUsages)).toBeFalsy();
    expect(isValidWeeklyUsages(invalidWeeklyUsages_0)).toBeFalsy();
    expect(isValidWeeklyUsages(invalidWeeklyUsages_1)).toBeFalsy();
    expect(isValidWeeklyUsages(invalidWeeklyUsages_2)).toBeFalsy();
    expect(isValidWeeklyUsages(invalidWeeklyUsages_3)).toBeFalsy();
    expect(isValidWeeklyUsages(validWeeklyUsages_0)).toBeTruthy();
    expect(isValidWeeklyUsages(validWeeklyUsages_1)).toBeTruthy();
});
