const ranks = {
  1: '1050654724489236500',
  3: '1050656149239767070',
  6: '1050655266628194324',
  9: '1050655343849504809',
  12: '511302827944050690',
  18: '511302827944050690',
  24: '511302701620133908',
  30: '511302701620133908',
  36: '739238343941947483',
  42: '854632385638825995',
  48: '854633814789324810',
  60: '854634448431349800',
};

export const rankSorter = async (rank) => {
  try {
    const findClosest = (arr, target) => {
      const size = 2;

      const result = arr.sort((a, b) => {
        if (Math.abs(a - target) === Math.abs(b - target))
          return a - b;
        return Math.abs(a - target) - Math.abs(b - target);
      }).slice(0, size)
        .sort((a, b) => a - b);
      return result[0];
    };

    if (rank >= 60)
      return ranks[60];
    const badge = findClosest([1, 3, 6, 9, 12, 18, 24, 30, 36, 42, 48, 60], rank);
    return ranks[badge];
  } catch (error) {
    console.log('[RANKS]:', error);
  }
};