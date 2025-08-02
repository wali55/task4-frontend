export const getDateDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime();

  difference = difference / 1000; // convert to seconds

  const dayDifference = Math.floor(difference / 86400);
  const hourDifference = Math.floor(difference / 3600);
  const minuteDifference = Math.floor(difference / 60);
  const secondDifference = Math.floor(difference);

  if (dayDifference > 0) {
    return `${dayDifference} day${dayDifference > 1 ? "s" : ""}`;
  } else if (hourDifference > 0) {
    return `${hourDifference} hour${hourDifference > 1 ? "s" : ""}`;
  } else if (minuteDifference > 0) {
    return `${minuteDifference} minute${minuteDifference > 1 ? "s" : ""}`;
  } else {
    return `${secondDifference} second${secondDifference > 1 ? "s" : ""}`;
  }
};