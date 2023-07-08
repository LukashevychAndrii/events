export const getWeek = (day: number): number => {
  let counter = 7;
  let week = 1;
  for (let i = 1; i < 5; i++) {
    if (day <= counter) {
      break;
    }
    counter += 7;
    week++;
  }
  return week;
};
