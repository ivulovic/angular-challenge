import formatWithCommas from './formatWithCommas';

export default function formatPercentage(num: number){
  if(!num) return '-';
  const options = {
    maxDecimals: 2,
    withSign: true
  };
  return formatWithCommas(num, options) + '%';
}