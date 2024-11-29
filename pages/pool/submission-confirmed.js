import React from 'react';
import {
	Button,
	Box,
	Flex,
	Center,
	Heading,
	Text,
	Link,
	Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IoCarOutline } from 'react-icons/io5';
import Layout from '../../components/layout.js';

const Confirmed = () => {
	const router = useRouter();

	return (
		<Layout>
			<Box width={['85%', '50%']} mx="auto">
				<Center m="4">
					<Heading as="h2" size="lg" my={4} align="center">
						Submission Confirmed!
					</Heading>
				</Center>

				<Box fontSize="lg" my={6}>
					<Box my={6}>
						<Center my={3}>
							<Text>
								If you would like to cancel or update your pool request, view{' '}
								<u>
									<Link color="teal" href="/pool/rides">
										your rides.
									</Link>
								</u>
							</Text>
						</Center>

						<Center>
							<Text>
								If you submitted your pool request <b>over 24 hours in advance</b>, the latest
								you will be notified if a ridepool has been found for you is <b>an hour before</b>{' '}
								your earliest ride time.
							</Text>
						</Center>
						<Center>
							<Text>
								Otherwise, you will be notified if a ridepool has been found for you{' '}
								<b>30 minutes before</b> your latest ride time at the latest.
							</Text>
						</Center>
					</Box>

					<Center>
						As soon as a match for your ride has been found, you will be notified.
					</Center>
				</Box>

				<Center my={6}>
					<Text>
						When matched with a pooler, <b>you will receive an email</b> with your fellow poolers'
						information.
					</Text>
				</Center>

				<Center>
					<Heading size="m" my={2}>
						<Flex flexDirection="row">
							Enjoy the Ridepool! <Icon as={IoCarOutline} mx="1" height="23" />{' '}
							<svg
								width="24.25"
								height="23"
								viewBox="0 0 97 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M84.1411 10.0703C77.9744 7.23696 66.2 5.5 65 19.5C63.8 33.5 83.7822 36 96.5 32.5"
									stroke="white"
									strokeWidth="4"
								/>
								<path
									d="M1 34C9.33333 34.8333 27.6 33.8704 38 21.0704C51 5.07038 53.5 1.97934 63.5 1.07029C74.5 0.0703293 84 10.0703 84 10.0703"
									stroke="white"
									strokeWidth="4"
								/>
							</svg>
						</Flex>
					</Heading>
				</Center>
			</Box>
		</Layout>
	);
};

export default Confirmed;
