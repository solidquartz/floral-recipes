import {
	Box,
	Flex,
	Heading,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";
import { FiInfo } from "react-icons/fi";
import { Icon } from "../shared";
import { useMemo } from "react";
import { getOrderSize, getTotalCost } from "./helpers";

export const Arrangement = ({ arrangement }) => {
	const { flowers } = useAppContext();

	const flowersInArrangement = useMemo(() => {
		if (!flowers) {
			return [];
		}

		return arrangement.flowers.map((x) => {
			const flower = flowers.find((f) => f.id === x.flower_id);
			const stemPrice = parseFloat(flower.stem_price);
			const stemQuantity = parseFloat(x.stem_quantity);

			const rounded = getOrderSize(stemQuantity, flower.rounded_up);
			const baseCost = stemPrice * x.stem_quantity;
			const roundedCost = rounded * stemPrice;


			return {
				name: flower.flower_name,
				stem_price: stemPrice,
				quantity: x.stem_quantity,
				rounded,
				base_cost: parseFloat(baseCost),
				rounded_cost: roundedCost,
				markup200: roundedCost * 2,
				markup250: roundedCost * 2.5,
			};
		});
	}, [flowers]);

	console.log("arrangement", arrangement)

	const totalCost = getTotalCost(flowersInArrangement);
	const costAllArrangements = totalCost * arrangement.arrangement_quantity;
	const totalMarkup200 = costAllArrangements * 2;
	const totalMarkup250 = costAllArrangements * 2.5;


	return (
		<Box borderBottom="1px solid #ececec" py="1rem" my="1rem">
			<Flex flexDirection="column">
				<Heading size="md" textTransform="capitalize">
					{arrangement.arrangement_name}
				</Heading>
				<TableContainer whiteSpace="normal" maxW="1080px">
					<Table size="lg">
						<Thead>
							<Tr>
								<Th>Flower Type</Th>
								<Th>Price per Stem</Th>
								<Th>Stems per Piece</Th>
								<Th>Min Order Size</Th>
								<Th>
									<Icon
										icon={<FiInfo />}
										placement="end"
										tooltipText="Total cost for the stem order of each flower type before rounding up"
									>
										Total
									</Icon>
								</Th>
								<Th>Rounded Up Total</Th>
								<Th>Markup 200%</Th>
								<Th>Markup 250%</Th>
							</Tr>
						</Thead>
						<Tbody>
							{flowersInArrangement.map((x, idx) => (
								<Tr key={idx}>
									<Td textTransform="capitalize">{x.name}</Td>
									<Td textAlign="right">${x.stem_price.toFixed(2)}</Td>
									<Td>{x.quantity}</Td>
									<Td>{x.rounded}</Td>
									<Td textAlign="right">${x.base_cost.toFixed(2)}</Td>
									<Td textAlign="right">${x.rounded_cost.toFixed(2)}</Td>
									<Td textAlign="right">${x.markup200.toFixed(2)}</Td>
									<Td textAlign="right">${x.markup250.toFixed(2)}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Flex>
			<Flex flexDirection="column" alignItems="flex-end" pr="30px" pt="20px">
				<Text fontSize="md" textTransform="uppercase" textAlign="right">
					<b>Cost per Arrangement</b>: ${totalCost.toFixed(2)}
				</Text>
				<Text fontSize="md" textTransform="uppercase" textAlign="right">
					<b>Total (All Arrangements)</b>: ${costAllArrangements.toFixed(2)}
				</Text>

				{/* Put below into accordion */}
				<Text fontSize="md" textTransform="uppercase" textAlign="right">
					<b>Total 200% Markup</b>: ${totalMarkup200.toFixed(2)}
				</Text>
				<Text fontSize="md" textTransform="uppercase" textAlign="right">
					<b>Total 250% Markup</b>: ${totalMarkup250.toFixed(2)}
				</Text>
			</Flex>
		</Box>
	);
};

// export const ArrangementItem = ({ }) => (
// 	<Tr>
// 		<Td>Lilac</Td>
// 		<Td>7</Td>
// 		<Td>14</Td>
// 		<Td>$60</Td>
// 		<Td>$150</Td>
// 		<Td>$200</Td>
// 	</Tr>
// );
