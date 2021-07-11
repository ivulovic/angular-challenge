import formatWithCommas from './formatWithCommas';

export default function formatNumber(num: string | number, withSign = false){
  if(!num) return '-';
  return formatWithCommas(num, {
    withSign,
  });
}