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
import Layout from '../components/layout.js';

const Price = () => (
    <Layout>
        <Center m="4">
            <Heading as="h2" size="xl" my={4} width={['85%', '50%']} align="center">
                Our Pricing Model
            </Heading>
        </Center>

        <Flex justify="center" align="center" direction={['column', 'row']} gap={6}>
            <Box
                bg="gray.800"
                color="white"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                width={['90%', '30%']}
                textAlign="center"
                height="auto"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="260px"
            >
                <Text fontSize="xl" mb={6}>
                    $10 on us.
                </Text>
                <Text fontSize="xl" mb={6}>
                    Don't pay for idle GPUs.
                </Text>
                <Text fontSize="xl" mb={6}>
                    Don't pay for configuration.
                </Text>
            </Box>

            <Box
                bg="gray.800"
                color="white"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                width={['90%', '30%']}
                textAlign="center"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="260px"
            >
                <Heading as="h2" size="lg" mb={4}>
                    Savings Based Pricing
                </Heading>
                {/* <Text fontSize="xl" mb={2}>
                    <strong>Savings based pricing</strong>
                </Text> */}
                <Text fontSize="xl" mb={2}>
                    We take a fraction of how much money you save by using us.
                </Text>
                {/* <Text justifyContent="center">All GPUs cost the same with TensorPool.</Text> */}
            </Box>
        </Flex>

        <Flex justify="center" align="center" direction={['column', 'row']} gap={6} mt={8}>
            <Box
                bg="gray.100"
                color="black"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                width={['90%', '40%']}
                textAlign="center"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="340px"
            >
                <Heading as="h3" size="lg" mb={2}>
                    PERSONAL PLAN
                </Heading> 
                <Heading as="h4" size="md" mb={4}>
                Sign up in seconds
                </Heading>
                <Text mb={2}>✓ $10 free credit</Text>
                <Text mb={2}>✓ Multi-cloud support</Text>
                <Text mb={2}>✓ Multi-GPU support</Text>
                <Text mb={2}>✓ No base rate</Text>
                <Text mb={4}>✓ Don't pay for idle GPUs</Text>
                <Link href='/join'> <Button colorScheme="blue" w={['75%', '50%']}>Sign Up</Button></Link>
            </Box>

            <Box
                bg="gray.100"
                color="black"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                width={['90%', '40%']}
                textAlign="center"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="340px"
            >
                <Heading as="h3" size="lg" mb={2}>
                    ENTERPRISE PLAN
                </Heading>
                <Heading as="h4" size="md" mb={4}>
                    Contact us
                </Heading>
                <Text mb={2}>✓ Use existing cloud or on-prem deployments</Text>
                <Text mb={2}>✓ 24/7 support</Text>
                <Text mb={2}>✓ Monitoring tools</Text>
                <Text mb={2}>✓ No time & money wasted on onboarding</Text>
                <Text mb={4}>✓ Don't pay for idle GPUs</Text>
                <Link href="mailto:team@tensorpool.dev?subject=TensorPool Enterprise Inquiry">
                    <Button colorScheme="blue" w={['75%', '50%']}>Contact Us</Button>
                </Link>
            </Box>
        </Flex>
    </Layout>
);

export default Price;
