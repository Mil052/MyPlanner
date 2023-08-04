export function dateToQuery (date: Date): string {
    let month: number | string = date.getMonth() + 1;
    month = month < 10 ? `0${month.toString()}` : month.toString();
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
}

export function QueryToDate (dateString: string): Date {
    const dateArray = dateString.split('-');
    let month = parseInt(dateArray[1]) - 1;
    return new Date(parseInt(dateArray[0]), month, parseInt(dateArray[2]));
}