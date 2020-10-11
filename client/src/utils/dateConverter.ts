export const convertDate = (date: string): string => {
  if (date.includes('.')) {
    return date.split('.').reverse().join('-')
    // const parsedDate: string[] = date.split('.');
    // const year: string = parsedDate[2]
    // const month: string = parsedDate[1]
    // const day: string = parsedDate[0]
    // if (month.length === 1) return `${year}-0${month}-${day}`;
    // else if (day.length === 1) return `${year}-${month}-0${day}`;
    // return `${year}-${month}-${day}`;
  }
  return date
};


export const convertDateReverse = (date: string): string => {
  if (!date.includes('.')) {
   return date.split('-').reverse().join('.')
  }
  return date
}
