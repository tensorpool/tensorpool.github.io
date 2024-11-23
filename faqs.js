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
	Icon,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	HStack,
} from '@chakra-ui/react';
import {IoCarOutline} from 'react-icons/io5';
import Layout from '../components/layout.js';

const splittingRides = [
	{
		title: 'Splitting Fare With Uber',
		href: 'https://www.uber.com/us/en/ride/how-it-works/split-fare/',
	},
	{
		title: 'Splitting Fare With Lyft',
		href: 'https://techcrunch.com/2014/12/23/lyft-now-lets-you-split-fares-with-friends-for-a-25-cent-fee/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAGcwxyTlAGJ8NVXty4Z8J9U8yw3YnwValRo20rE8ibL0xyFoCeBE9P2axhMa1YG0g6wjrJof0FiwBc6E1xfORh3mlN7jaoXxfw2cAytYxyI1NpJtas5gRdnj6-2yZwjF_ebaOv3afUATU-JbPt-YlzFZFXeuZmtovwDOYE-KufYL',
	},
];

const addingStops = [
	{
		title: 'Adding A Stop With Uber',
		href: 'https://www.uber.com/us/en/ride/how-it-works/multiple-stops/',
	},
	{
		title: 'Adding A stop With Lyft',
		href: 'https://www.businessinsider.com/guides/tech/how-to-add-a-stop-on-lyft',
	},
];

const requestingRides = [
	{
		title: 'Ordering a Ride With Uber',
		href: 'https://help.uber.com/riders/article/how-to-request-a-ride--get-a-price-estimate?nodeId=67f41961-e0aa-4670-af32-58be02c7c492',
	},
	{
		title: 'Ordering a Ride With Lyft',
		href: 'https://help.lyft.com/hc/en5us/all/articles/115013079988-How-to-request-a-ride',
	},
];

const faq = () => (
	<Layout>
		<Center m='4'>
			<Heading as='h2' size='lg' my={4} width={['85%', '50%']} align='center'>
        Frequently Asked Questions
			</Heading>
		</Center>
		<Accordion allowToggle>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              What is RidePool?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Text ml={2} fontSize='md'>
            RidePool is a service that connects rideshare people for the
            purpose of saving money, saving the environment, and making new
            friends. By using RidePool, you split the cost of an Uber or Lyft
            in half!
					</Text>
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              Does this service cost money?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Text ml={2} fontSize='md'>
            No! RidePool is completely free to use!
					</Text>
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              Ordering A Ride
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					{requestingRides.map(({title, href}) => (
						<Box my={2} key={href}>
							<Link href={href}>
								<Flex>
									<Text as='u' ml={2} fontSize='md'>
										{title}
									</Text>
								</Flex>
							</Link>
						</Box>
					))}
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              Splitting a Fare
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					{splittingRides.map(({title, href}) => (
						<Box my={2} key={href}>
							<Link href={href}>
								<Flex>
									<Text as='u' ml={2} fontSize='md'>
										{title}
									</Text>
								</Flex>
							</Link>
						</Box>
					))}
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              Adding A Stop
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					{addingStops.map(({title, href}) => (
						<Box my={2} key={href}>
							<Link href={href}>
								<Flex>
									<Text as='u' ml={2} fontSize='md'>
										{title}
									</Text>
								</Flex>
							</Link>
						</Box>
					))}
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              Canceling/Updating a Ridepool request
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Text ml={2} fontSize='md'>
            To cancel a Ridepool request, view <u><Link href='/pool/rides'>your rides</Link></u>. You're always able to submit a new Ridepool request in case your information is wrong.
					</Text>
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              Am I guaranteed to find a co-pooler?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Text ml={2} fontSize='md'>
            You're not guaranteed to find a co-pooler, but there are steps you
            can take to drastically improve your chances! For example, booking a
            ride in advance gives you priority over someone who enters the pool
            15 minutes before their ride.
					</Text>
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              Is Ridepool safe?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Text ml={2} my={2} fontSize='md'>
            We believe Ridepooling is actually safer than Ubering! When you get
            in an Uber, it's just you and your driver. But when you're
            Ridepooling, more people (that you've already met) from your community are in the car.
					</Text>
					<Text ml={2} my={2} fontSize='md'>
            If you're worried about meeting up with a pooler you can coordinate
            with them to meet somewhere you feel safe. You are always able to
            back out of the ride and travel by yourself.
					</Text>
		  <Text ml={2} my={2} fontSize='md'>
			  If an accident happens, Uber passengers are eligible for up to <u><Link href='https://www.uber.com/us/en/drive/insurance/'>$1,000,000 in claims</Link></u>.
					</Text>

					{/* <Text ml={2} my={2} fontSize='md'>
						We are also planning on adding a star rating feature so that you have the power to rate other poolers.
						This way, if you match with a pooler with a low star rating, you can cancel your ride.
					</Text> */}
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              How did Ridepool start?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Text ml={2} fontSize='md'>
            When we first started college, we realized how obscenely expensive
            taking rideshares is. Ubers from the airport to campus costed
            upwards of $100! For a 30 minute drive!! After noticing other
            students were also looking for people to split rideshares with, we
            created this service to allow people to find Ridepoolers without the
            hassle of group chats and email lists.
					</Text>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	</Layout>
);
export default faq;