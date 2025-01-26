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
	Grid,
} from '@chakra-ui/react';
import {FaTwitter, FaLinkedin, FaEnvelope} from 'react-icons/fa';

const links = [
	{title: 'About', href: '/#about'},
	{title: 'Blog', href: '/blog'},
	// {title: 'How it Works', href: '/#how-it-works'},
	{title: 'FAQs', href: '/faqs'},
	// {title: 'Terms of Service', href: '/terms-of-service'},
];
const links2 = [
	{title: 'Pricing', href: '/pricing'},
	// {title: 'Documentation', href:'https://tensorpool.mintlify.app/quickstart'},
	{title: 'Documentation', href:'https://github.com/tensorpool/tensorpool'},
	//{title: 'Contact Sales', href: 'mailto:team@tensorpool.dev'},
	{title: 'How It Works', href: '/how-it-works'},
	// {title: 'FAQs', href: '/faqs'},
	// {title: 'Terms of Service', href: '/terms-of-service'},
];

const socials = [
	{
		title: 'LinkedIn',
		icon: <FaLinkedin size='20' />,
		href: 'https://linkedin.com/company/105594641/',
	},
	{
		title: 'Twitter',
		icon: <FaTwitter size='20' />,
		href: 'https://x.com/TensorPool',
	},
	{
		title: 'Contact Team',
		icon: <FaEnvelope size='20' />,
		href: 'mailto:team@tensorpool.dev',
	},
];

const Footer = () => (
	<Box bg='rpblue' color='white' py={9}>
	  {/* Header */}
	  <Center mb={6}>
		<Flex>
		  <Image src='/images/logo-transparent.svg' height={39} />
		  <Center>
			<Heading size='md' mx='2'>TensorPool</Heading>
		  </Center>
		</Flex>
	  </Center>
   
	  {/* Table Layout */}
	  <Box px={['5%', '15%']} maxW="1200px" mx="auto">
		<Flex justify="center" align="flex-start">
		  {/* Column 1 */}
		  <Box width="250px">
			<Heading size='sm' mb={4}>Company</Heading>
			<Grid templateRows="repeat(3, 1fr)" gap={4}>
			  {links.map(({title, href}) => (
				<Link href={href} fontSize='sm' key={href}>{title}</Link>
			  ))}
			</Grid>
		  </Box>
   
		  {/* Column 2 */}
		  <Box width="250px" mx={16}>
			<Heading size='sm' mb={4}>Resources</Heading>
			<Grid templateRows="repeat(3, 1fr)" gap={4}>
			  {links2.map(({title, href}) => (
				<Link href={href} fontSize='sm' key={href}>{title}</Link>
			  ))}
			</Grid>
		  </Box>
   
		  {/* Column 3 */}
		  <Box width="250px">
			<Heading size='sm' mb={4}>Connect</Heading>
			<Grid templateRows="repeat(3, 1fr)" gap={4}>
			  {socials.map(({title, icon, href}) => (
				<Link href={href} key={href}>
				  <Flex>
					{icon}
					<Text ml={2} fontSize='sm'>{title}</Text>
				  </Flex>
				</Link>
			  ))}
			</Grid>
		  </Box>
		</Flex>
	  </Box>
	</Box>
   );

export default Footer;
