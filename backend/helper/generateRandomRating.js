export const generateRandomRating = function () {
  const min = 2.5;
  const max = 5.0;
  const random = Math.random() * (max - min) + min;
  const rating = Math.round(random * 10) / 10;
  return rating;
};
