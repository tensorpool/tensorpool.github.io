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
              				What is TensorPool?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Text ml={2} fontSize='md'>
						Our mission is to 10x ML engineering velocity. We do this by attacking two major problems: Access and pricing. 
						Right now, to use a GPU, configuration is a massive headache. GPUs are also very expensive.
						With TensorPool, you never have to configure a machine again, and you pay half as much as with major cloud providers for the same quality GPU instance.
					</Text>
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              Does TensorPool cost money?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Text ml={2} fontSize='md'>
            Yes, but we give away $10 of free usage to new users before requiring payment. After that, we end up being half the price of other cloud GPU providers due to core technological advancements. Try us out! If you like us,
			continue paying. If you don't, then dont! :)
					</Text>
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              				How can I use TensorPool at my company?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					{/*TODO: activate hyperlink*/}
					<Text ml={2} fontSize='md'>
							Reach out to us at{' '}<Link href="mailto:team@tensorpool.dev" color="white" textDecoration="underline">
                team@tensorpool.dev</Link>! We'd love to learn about your use case and how we can help.
					</Text>
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              				When should I use TensorPool?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					{/*TODO: activate hyperlink*/}
					<Text ml={2} fontSize='md'>
							Whenever you want to train an ML model!
					</Text>
				</AccordionPanel>
			</AccordionItem>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              				Why should I use TensorPool?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Text ml={2} fontSize='md'>
							All of our status quo competitors require immense amounts time wasted on configuration and are incredibly expensive. With TensorPool, GPU configuration and orchestration are handled for you, and the pricing is much more reasonable.
					</Text>
				</AccordionPanel>
			</AccordionItem>
			{/*<AccordionItem>
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
			</AccordionItem>*/}
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex='1' textAlign='left'>
              How did TensorPool start?
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Text ml={2} fontSize='md'>
            We all suffered through the problems with cloud compute providers over and over again in 
			internships and academia. We also have heard other people complain that there is no good,
			easy way to use GPUs. So we created TensorPool!
					</Text>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	</Layout>
);
export default faq;
