import {
	Flex,
	Box,
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
	  <Box bg="rpblue" color="white" py={[1, 3]}>
		<Flex direction="column" alignItems="center" justifyContent="center">
		  <Link href="/" display="flex" alignItems="center" mb="3">
			<Image src="/images/logo-transparent.svg" boxSize="50px" />
			<Heading as="h1" mx="2">
			  TensorPool
			</Heading>
		  </Link>
		  <ButtonGroup
			gap={3}
			colorScheme="whiteAlpha"
			flexWrap="wrap"
			justifyContent="center"
			display="flex"
			width="100%"
			maxW="800px"
		  >
			<Link href="/">
			  <Button
				bg="transparent"
				borderColor="white"
				borderWidth="1.5px"
				borderRadius="25"
			  >
				About
			  </Button>
			</Link>
			<Link href="/pricing">
			  <Button
				bg="transparent"
				borderColor="white"
				borderWidth="1.5px"
				borderRadius="25"
			  >
				Pricing
			  </Button>
			</Link>
			<Link href="https://tensorpool.mintlify.app/quickstart" isExternal>
			  <Button
				bg="transparent"
				borderColor="white"
				borderWidth="1.5px"
				borderRadius="25"
			  >
				Docs
			  </Button>
			</Link>
			<Link href="/faqs">
			  <Button
				bg="transparent"
				borderColor="white"
				borderWidth="1.5px"
				borderRadius="25"
			  >
				FAQs
			  </Button>
			</Link>
			<Link href="/login">
			  <Button
				bg="transparent"
				borderColor="white"
				borderWidth="1.5px"
				borderRadius="25"
			  >
				Sign Up
			  </Button>
			</Link>
		  </ButtonGroup>
		</Flex>
	  </Box>
	);
  };
  
  export default Header;
