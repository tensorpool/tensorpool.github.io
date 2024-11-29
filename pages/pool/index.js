import React, { useState } from 'react';
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
import { useRouter } from 'next/router';
import Layout from '../../components/layout.js';
import { formatPhoneNumber } from '../../lib/phoneUtils.js';

const choice = () => {
	// Mock authenticated user state
	const [user, setUser] = useState({ phoneNumber: '1234567890' }); // Replace with actual user data, if needed.
	const router = useRouter();

	const logOut = () => {
		// Mock logout function
		setUser(null);
		router.push('/');
	};

	// If not logged in, redirect to login page (optional)
	if (!user) {
		router.push('/login');
		return null; // Prevent rendering if redirecting
	}

	return (
		<Layout>
			<Center>
				<Box>
					<Heading as='h2' size='lg' my={6} textAlign='center'>
						What would you like to do?
					</Heading>
					<Text textAlign='center'>
						Your phone number: {user ? formatPhoneNumber(user.phoneNumber) : null}
					</Text>
				</Box>
			</Center>
			<Center>
				<Link href='/pool/schedule'>
					<Button bg='rpmblue' px={9} my={9}>
						Schedule a Ridepool
					</Button>
				</Link>
			</Center>
			{/* Optionally uncomment or modify additional sections */}
			{/* <Center>
                <Heading as='h2' size='lg' my={6} width='50%' align='center'>
                    Or
                </Heading>
            </Center>
            <Center m={10}>
                <Flex flexDirection={['column', 'column']}>
                    <Link href='/livepool'>
                        <Button bg='rpmblue' px={9}>
                            Find A Current Pooler
                        </Button>
                    </Link>
                </Flex>
            </Center> */}
			<Center my={3}>
				<Link href='/pool/rides'>
					<Button bg='rpmblue' px={9} my={9}>
						View my rides
					</Button>
				</Link>
			</Center>
			<Center my={6}>
				<Button variant='outline' onClick={logOut}>
					Sign Out
				</Button>
			</Center>
		</Layout>
	);
};

export default choice;
