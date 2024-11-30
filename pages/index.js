import {
	Button,
	Text,
	Link,
	Box,
	Flex,
	Spacer,
	Center,
	Heading,
	Alert,
	AlertIcon,
	Image,
	Icon,
} from '@chakra-ui/react';
import {IoMdTime} from "react-icons/io";
import {FaArrowTrendUp, FaDollarSign} from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import AnimatedNumber from 'animated-number-react';
import Layout from '../components/layout.js';

export default function Home() {
	return (
		<Layout>
			<Flex mb={6}>
				<Spacer />
				<Flex width={['75%', '90%']}>
					<Alert status='info' borderRadius={9} bg='rpmblue'>
						{/* TODO: Eventually target this to change the from location by url params. Adjust the ads we make to update url param */}
						<b>
              Tired of overpaying for ML model training? Tired of spending hours figuring out how to use compute providers? Try TensorPool!
						</b>
					</Alert>
				</Flex>
				<Spacer />
			</Flex>

			<Flex flexDirection={['column', 'row']} width={['90%', '75%']} mx='auto'>
				<Box width={['100%', '70%']} my={9}>
					<Center p={3}>
						<Box>
							<Heading as='h1' size='xl'>
                Access GPUs in only two lines of code.
							</Heading>
							<Text as='h2' fontSize='xxl' my={[6, 3]}>
                Join <b><AnimatedNumber
									formatValue={v => v.toFixed(0)}
									duration={2000}
									delay={300}
									value={310}
								/>
                +</b> other ML developers to save time and money on model training.
							</Text>
						</Box>
					</Center>

					<Flex alignItems='center'>
						<Link href='/login' mx={['auto', 1]}>
							<Button size='lg' bg='rpmblue' padding={6} mx={3}>
                Join Waitlist
							</Button>
						</Link>
					</Flex>
				</Box>
				<Center width={['100%', '30%']}>
					<Image src='/images/pool.svg' />
				</Center>
			</Flex>

			<Flex flexDirection={['column', 'row']} my={6}>
				<Spacer />
				<Center width={['100%', '23%']} p={1}>
					<Box>
						<Text align='center' fontSize='6xl'>
							<Icon as={FaDollarSign} mx='1' />
						</Text>
						<Text align='center' fontSize='3xl'>
							<b>Save money on model training</b>
						</Text>
						<Text align='center' fontSize='l'>
              Pay by model size instead of length spent on instance!
						</Text>
					</Box>
				</Center>
				<Spacer />
				<Center width={['100%', '23%']} p={3}>
					<Box>
						<Text align='center' fontSize='6xl'>
							<Icon as={FaArrowTrendUp} mx='1' />
						</Text>
						<Text align='center' fontSize='3xl'>
							<b>Improve model performance</b>
						</Text>
						<Text align='center' fontSize='l'>
              We automatically choose the best GPU for the job.
						</Text>
					</Box>
				</Center>
				<Spacer />
				<Center width={['100%', '23%']} p={3}>
					<Box>
						<Text align='center' fontSize='6xl'>
							<Icon as={IoMdTime} mx='1' />
						</Text>
						<Text align='center' fontSize='3xl'>
							<b>Save 50% more time</b>
						</Text>
						<Text align='center' fontSize='l'>
              Never deal with setup again!
						</Text>
					</Box>
				</Center>
				<Spacer />
			</Flex>
		</Layout>
	);
}