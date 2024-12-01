import {
	Center,
	Heading,
	Box,
	Flex,
	Button,
	Link,
	Spacer,
	Text,
	Image,
	ComponentStyleConfig,
} from '@chakra-ui/react';
import {Instagram, Twitter} from '@styled-icons/bootstrap';

const links = [
	{title: 'About', href: '/#about'},
	{title: 'Sign Up', href: '/login'},
	// {title: 'How it Works', href: '/#how-it-works'},
	{title: 'FAQs', href: '/faqs'},
	// {title: 'Terms of Service', href: '/terms-of-service'},
];

const socials = [
	{
		title: 'Instagram',
		icon: <Instagram size='20' />,
		href: 'https://www.instagram.com/ridepool_stanford/',
	},
	{
		title: 'Twitter',
		icon: <Twitter size='20' />,
		href: 'https://twitter.com/ridepoolapp',
	},
];

const Footer = () => (
	<Box bg='rpblue' color='white' py={9}>
		<Flex>
			<Spacer />
			<Center width={['90%', '21%']}>
				<Box>
					<Center>
						<Flex>
							<Image src='/images/logo-transparent.svg' height={39} />
							<Center>
								<Heading size='md'>TensorPool</Heading>
							</Center>
						</Flex>
					</Center>
					{links.map(({title, href}) => (
						<Box my={2} key={href}>
							<Link href={href} fontSize='sm'>
								{title}
							</Link>
						</Box>
					))}
				</Box>
			</Center>

			<Center width={['90%', '30%']}>
				<Box>
					{socials.map(({title, icon, href}) => (
						<Box my={2} key={href}>
							<Link href={href}>
								<Flex>
									{icon}
									<Text ml={2} fontSize='sm'>
										{title}
									</Text>
								</Flex>
							</Link>
						</Box>
					))}
				</Box>
			</Center>
			<Spacer />
		</Flex>
	</Box>
);

export default Footer;
