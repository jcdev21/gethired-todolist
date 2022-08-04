import { Box, Container, Text } from '@chakra-ui/react';

export default function Header({ title }) {
	return (
		<Box bg="prime.900" height={105} display="flex" alignItems="center">
			<Container maxW="5xl">
				<Text textStyle="h2" textTransform="uppercase" color="white">
					{title}
				</Text>
			</Container>
		</Box>
	);
}
