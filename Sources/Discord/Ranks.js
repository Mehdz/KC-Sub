// const ranks = {
//   1: 'OEUF',
//   3: 'TETARD',
//   6: 'POISSON ROUGE',
//   9: 'POISSON VERT',
//   12: 'POISSON OR',
//   18: 'POISSON OR/DIAMANT',
//   24: 'POISSON DIAMANT',
//   30: 'POISSON DIAMANT/RUBY',
//   36: 'POISSON RUBY',
//   42: 'POISSON NOIR',
//   48: 'LEVIATHOR',
//   60: 'LEVIATHOR ROUGE',
// };

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
  const findClosest = (arr = [], target = 1) => {
    const size = 2;

    const result = arr.sort((a, b) => {
      if (Math.abs(a - target) === Math.abs(b - target))
        return a - b;
      return Math.abs(a - target) - Math.abs(b - target);
    }).slice(0, size)
      .sort((a, b) => a - b);
    return result[0];
  };

  const badge = findClosest(ranks, rank);
  return ranks[badge];
};