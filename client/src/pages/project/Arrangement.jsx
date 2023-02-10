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
import { getOrderSize } from "./helpers";

export const Arrangement = ({ arrangement }) => {
	const { flowers } = useAppContext();

	const flowersInArrangement = useMemo(() => {
		if (!flowers) {
			return [];
		}

		return arrangement.flowers.map((x) => {
			const flower = flowers.find((f) => f.id === x.flower_id);

			const rounded = getOrderSize(x.stem_quantity, flower.rounded_up);
			const cost = rounded * flower.stem_price;

			return {
				name: flower.flower_name,
				price: flower.stem_price,
				quantity: x.stem_quantity,
				rounded,
				cost,
				markup200: cost * 2,
				markup250: cost * 2.5,
				total_cost: cost * arrangement.quantity,
			};
		});
	}, [flowers]);

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
								<Th>Flower</Th>
								<Th>Avg. Price/Stem</Th>
								<Th>Stems per Piece</Th>
								<Th>Rounded up</Th>
								<Th>
									<Icon
										icon={<FiInfo />}
										placement="end"
										tooltipText="Avg. price per stem * num stems"
									>
										Totals
									</Icon>
								</Th>
								<Th>Markup</Th>
								<Th />
							</Tr>
						</Thead>
						<Tbody>
							{flowersInArrangement.map((x, idx) => (
								<Tr key={idx}>
									<Td>{x.name}</Td>
									<Td>${x.price}</Td>
									<Td>{x.quantity}</Td>
									<Td>{x.rounded}</Td>
									<Td>
										Base: ${(2.22 * 18).toFixed(2)}
										<br />
										With round up: ${(2.22 * 20).toFixed(2)}
									</Td>
									<Td>
										200%: ${(2.22 * 20 * 5 * 1.5).toFixed(2)}
										<br />
										250%: ${(2.22 * 20 * 5 * 2).toFixed(2)}
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Flex>
			<Flex flexDirection="column" alignItems="flex-end" pr="40px" pt="20px">
				<Text fontSize="md" textTransform="uppercase">
					<b>Cost per Arrangement</b>: $200
				</Text>
				<Text fontSize="md" textTransform="uppercase">
					<b>Quantity</b>: 5
				</Text>
				<Text fontSize="md" textTransform="uppercase">
					<b>Total (no markup)</b>: $1000
				</Text>
				<Text fontSize="md" textTransform="uppercase">
					<b>Total (200% markup)</b>: ${1000 * 2}
				</Text>
				<Text fontSize="md" textTransform="uppercase">
					<b>Total (250% markup)</b>: ${1000 * 2.5}
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
