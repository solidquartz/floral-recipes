export const getOrderSize = (numStems, minOrderSize) =>
	Math.ceil(numStems / minOrderSize) * minOrderSize;

	
export const getTotalCost = (flowersInArrangement) => {
	const costPerArr = flowersInArrangement.map((x) =>
		x.base_cost)
		.reduce((acc, cur) => {
		return acc + cur;
	});
	return costPerArr;
};