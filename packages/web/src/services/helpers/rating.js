export const formatRating =
  rating => rating ? rating.toFixed(1).replace(/\.0+$/, '') : 0;
