import {
	Button,
	Box,
	Flex,
	Spacer,
	InputGroup,
	Input,
	InputLeftElement,
	Center,
	Heading,
	Text,
	Link,
	HStack,
	PinInput,
	PinInputField,
} from '@chakra-ui/react';
import {Instagram, Twitter} from '@styled-icons/bootstrap';
import Layout from '../components/layout.js';

const socials = [
	{title: 'Instagram', icon: <Instagram size='26' />, href: 'https://www.instagram.com/ridepool_stanford'},
	{title: 'Twitter', icon: <Twitter size='26' />, href: 'https://twitter.com/ridepoolapp'},
];

const livepool = () => (
	<Layout>
		<Center>
			<Heading as='h2' size='lg' my={6} width={['85%', '50%']} align='center'>
                Oops! Live pooling is currently under construction...🛠
			</Heading>
		</Center>
		<Center>
			<Heading as='h2' size='lg' my={6} width={['85%', '50%']} align='center'>
                Check back shortly or follow us on social media to get updates!
			</Heading>
		</Center>
		<Center>
			{socials.map(({title, icon, href}) => (
				<Box my={2} key={href} p='3'>
					<Link href={href}>
						<Flex>
							{icon}
							<Text ml={2}>{title}</Text></Flex>
					</Link>
				</Box>
			))}
		</Center>
		<Center>
			<Link href='/choice'>
				<Button bg='rpmblue' px={9} m={10}>
                    Back
				</Button>
			</Link>
		</Center>
	</Layout>
);

export default livepool;
