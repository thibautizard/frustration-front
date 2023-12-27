export function getNumberOfDaysFromNow(date) {
  const now = new Date();
  const differenceInMilliseconds = now.getTime() - date.getTime();
  const differenceInDays = Math.floor(differenceInMilliseconds / 86400000);
  return differenceInDays;
}

export function convertDifferenceOfDays(differenceInDays) {
  switch (differenceInDays) {
    case 1:
      return "Publié hier";
    case 2:
      return "Publié avant-hier";
    default:
      return `Publié il y a ${differenceInDays} jours`;
  }
}
