export function dateformatter(date: string) {
    let dateString: string = new Date(date).getDate() < 10
        ? '0' + new Date(date).getDate()
        : new Date(date).getDate().toString();

    let monthString: string = new Date(date).getMonth() + 1 < 10
        ? '0' + new Date(date).getMonth()
        : new Date(date).getMonth().toString();

    let yearString: string = new Date(date).getFullYear() < 10
        ? '0' + new Date(date).getFullYear()
        : new Date(date).getFullYear().toString();


    return `${dateString}-${monthString}-${yearString}`;
}