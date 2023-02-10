export const getOrderSize = (numStems, minOrderSize) =>
	Math.ceil(numStems / minOrderSize) * minOrderSize;