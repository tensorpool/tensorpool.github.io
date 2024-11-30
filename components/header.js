import {
	Flex,
	Box,
	Center,
	Heading,
	Image,
	ButtonGroup,
	Button,
	Link,
} from '@chakra-ui/react';

const Header = () => {
	// Mock `user` and `loading` state if needed.
	const user = null; // Replace with actual user state if necessary.
	const loading = false; // Set to true if you need a loading state.

	return (
		<Box bg='rpblue' color='white' py={[1, 3]}>
			<Center>
				<Flex>
					<Link href='/'>
						<Flex my='3'>
							<Image src='/images/logo-transparent.svg' height={69} />
							<Button variant='link' color='white'>
								<Heading as='h1'>TensorPool</Heading>
							</Button>
						</Flex>
					</Link>
				</Flex>
			</Center>
			<Center>
				<ButtonGroup gap={3} colorScheme='whiteAlpha'>
					<Link href='/'>
						<Button
							bg='transparent'
							borderColor='white'
							borderWidth='1.5px'
							borderRadius='25'
						>
							About
						</Button>
					</Link>
					<Link href='/pricing'>
						<Button
							bg='transparent'
							borderColor='white'
							borderWidth='1.5px'
							borderRadius='25'
						>
							Pricing
						</Button>
					</Link>
					<Link href='https://tensorpool.mintlify.app/quickstart' isExternal>
						<Button
							bg='transparent'
							borderColor='white'
							borderWidth='1.5px'
							borderRadius='25'
						>
							Docs
						</Button>
					</Link>
					<Link href='/faqs'>
						<Button
							bg='transparent'
							borderColor='white'
							borderWidth='1.5px'
							borderRadius='25'
						>
							FAQs
						</Button>
					</Link>
					<Link href='https://forms.gle/3W2aa9eAof2fMnfu7' isExternal>
						<Button
							bg='transparent'
							borderColor='white'
							borderWidth='1.5px'
							borderRadius='25'
						>
							Sign Up
						</Button>
					</Link>
				</ButtonGroup>
			</Center>
		</Box>
	);
};

export default Header;