export type DateDataObject = {day: number, month: number, monthName: string, year: number};

export function dateToObject (date: Date): DateDataObject {
    const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = monthNames[month];
    const day = date.getDate();

    return {day: day, month: month, monthName: monthName, year: year};
}