import formatNumber from "../utils/formatters/formatNumber";
import formatPercentage from "../utils/formatters/formatPercentage";

export default function formatRealtimeTableData(data: any){
	return data.map((symbol: any) => {
		const {chanId, pair, values} = symbol;
		const [last, change, changePercent, high, low /*, time */] = values;
		return {
			id: chanId,
			name: pair,
			last: formatNumber(last), 
			change: formatNumber(change), 
			changePercent: formatPercentage(changePercent), 
			high: formatNumber(high), 
			low: formatNumber(low), 
		}
	})
}