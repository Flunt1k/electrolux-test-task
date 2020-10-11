export const convertDate = (date: string): string => {
  if (date.includes('.')) {
    return date.split('.').reverse().join('-')
  }
  return date
};


export const convertDateReverse = (date: string): string => {
  if (!date.includes('.')) {
   return date.split('-').reverse().join('.')
  }
  return date
}
