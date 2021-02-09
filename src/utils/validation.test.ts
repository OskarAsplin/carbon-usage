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

    console.log(moreThanMax);
    console.log(maxDate);
    console.log(moreThanMax < maxDate);

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
