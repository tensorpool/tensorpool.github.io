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
            <Heading as="h2" size="lg" my={4} width={['85%', '50%']} align="center">
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
                <Text fontSize="lg" mb={6}>
                    $20 on us. Free T4s. Don't pay for idle GPUs.
                </Text>
            </Box>

            <Box
                bg="gray.800"
                color="white"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                width={['90%', '40%']}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="260px"
            >
                <Heading as="h3" size="md" mb={4}>
                    Pricing
                </Heading>

                <Text fontSize="md" mb={2}>
                    <strong>GPU Usage</strong>
                </Text>
                <Flex justify="space-between" mb={2}>
                    <Text>NVIDIA T4</Text>
                    <Text>$0.00 / GB</Text>
                </Flex>
                <Flex justify="space-between" mb={2}>
                    <Text>NVIDIA V100</Text>
                    <Text>$0.09 / GB</Text>
                </Flex>
                <Flex justify="space-between">
                    <Text>NVIDIA A100, 40GB</Text>
                    <Text>$1.20 / GB</Text>
                </Flex>
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
                    $0.40/hr + GPU usage
                </Heading>
                <Text mb={2}>✓ $20 free credit</Text>
                <Text mb={2}>✓ Free NVIDIA T4s</Text>
                <Text mb={2}>✓ Multi-GPU support</Text>
                <Text mb={2}>✗ Base rate</Text>
                <Text mb={4}>✗ Pay for idle GPUs</Text>
                <Button colorScheme="blue">Get Started →</Button>
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
                <Text mb={2}>✓ White glove integration support</Text>
                <Text mb={2}>✓ Monitoring tools</Text>
                <Text mb={2}>✓ 24/7 dedicated support</Text>
                <Text mb={4}>✗ Pay for idle GPUs</Text>
                <Button colorScheme="blue">Contact Us</Button>
            </Box>
        </Flex>
    </Layout>
);

export default Price;
