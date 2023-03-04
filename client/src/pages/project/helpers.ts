import { ArrangedFlowerRow } from "src/types";

export const getOrderSize = (numStems: number, minOrderSize: number) =>
	Math.ceil(numStems / minOrderSize) * minOrderSize;


export const getTotalCost = (flowersInArrangement: ArrangedFlowerRow[]) => {
	const costPerArr = flowersInArrangement
		.map((x) => x.base_cost)
		.reduce((acc, cur) => acc + cur);

	return costPerArr;
};
