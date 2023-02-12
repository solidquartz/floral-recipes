import { Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";
import { getOrderSize } from "./helpers";

export const FloralOrder = ({ project }) => {
	const { flowers } = useAppContext();

	//!!!! these are NOT taking into account the amount of arrangements. needs to be fixed !!!! //

	const flowerOrders = project.arrangements
		.map(x => x.flowers)
		.flat()
		.reduce((acc, cur) => {
			const order = acc.find((x) => x.id === cur.flower_id); // see if the acc object already has an entry for this flower_id
			const flower = flowers.find((x) => x.id === cur.flower_id); // look up the flower
			const stemPrice = parseFloat(flower.stem_price); // pre-calculate stem price because easier

			if (order) { // if there's an order for cur.flower_id
				order.quantity += cur.stem_quantity;
				order.total = order.quantity * stemPrice;
				order.markedUp = order.total * 1.25;

				order.roundedUp = getOrderSize(order.quantity, flower.rounded_up);
			} else { // make a new order entry
				const rounded = getOrderSize(cur.stem_quantity, flower.rounded_up);

				acc.push({
					id: cur.flower_id,
					name: flower.flower_name,
					quantity: cur.stem_quantity,
					roundedUp: rounded,
					pricePerStem: stemPrice,
					total: rounded * stemPrice,
					markedUp: (rounded * stemPrice) * 2.50,
				});
			}

			return acc;
		}, []);

	const { total, withMarkup } = flowerOrders.reduce((acc, cur) => {
		acc.total += cur.total;
		acc.withMarkup += cur.markedUp;

		return acc;
	}, { total: 0, withMarkup: 0 });

	return (
		<Flex p="25px" width="100%" m="auto" flexDirection="column">
			<TableContainer whiteSpace="normal" maxW="1080px">
				<Heading size="lg">Floral Order</Heading>
				<Table size="lg">
					<Thead>
						<Tr>
							<Th>Item</Th>
							<Th>Stems</Th>
							<Th>Rounded Up</Th>
							<Th>Price per Stem</Th>
							<Th>Total</Th>
							<Th>Marked Up Total</Th>
						</Tr>
					</Thead>
					<Tbody>
						{flowerOrders.map((x, idx) => (
							<FloralOrderItem
								key={idx}
								name={x.name}
								quantity={x.quantity}
								roundedUp={x.roundedUp}
								pricePerStem={x.pricePerStem}
								total={x.total}
								markedUp={x.markedUp}
							/>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<Flex justifyContent="right" pr="40px" pt="20px">
				<Text fontSize="md" fontWeight="semibold" textTransform="uppercase">
					Floral Budget: ${total.toFixed(2)}
				</Text>
			</Flex>
			<Flex justifyContent="right" pr="40px" pt="20px">
				<Text fontSize="md" fontWeight="semibold" textTransform="uppercase">
					With Markup: ${withMarkup.toFixed(2)}
				</Text>
			</Flex>
		</Flex>
	);
};

const FloralOrderItem = ({
	name,
	quantity,
	roundedUp,
	pricePerStem,
	total,
	markedUp,
}) => (
	<Tr>
		<Td textTransform="capitalize">{name}</Td>
		<Td>{quantity}</Td>
		<Td>{roundedUp}</Td>
		<Td>${pricePerStem.toFixed(2)}</Td>
		<Td>${total.toFixed(2)}</Td>
		<Td>${markedUp.toFixed(2)}</Td>
	</Tr>
);
