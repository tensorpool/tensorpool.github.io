import { Box, Heading, Text, Container, VStack, Flex, Icon } from '@chakra-ui/react';
import { FaDollarSign, FaBolt } from 'react-icons/fa';
import Layout from '../components/layout.js';

export default function HowItWorks() {
  return (
    <Layout>
      <Container maxW="container.xl" py={12}>
        <VStack spacing={16} align="stretch">
          <Box>
            <Heading mb={8} textAlign="center">How We Cut Costs</Heading>
            <Flex direction={['column', 'row']} gap={8}>
              <Box flex={1}>
                <Flex align="center" mb={4}>
                  <Icon as={FaDollarSign} mr={2} />
                  <Heading size="md">Real-time Cost Analysis</Heading>
                </Flex>
                <Text>
                  We continuously analyze GPU prices across multiple providers to automatically select the most cost-effective option for your workload.
                </Text>
              </Box>
              <Box flex={1}>
                <Flex align="center" mb={4}>
                  <Icon as={FaBolt} mr={2} />
                  <Heading size="md">Spot Recovery Technology</Heading>
                </Flex>
                <Text>
                  Our in-house spot node recovery system uses machine state snapshotting and resuming to save your progress, ensuring cost savings without compromising reliability.
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Heading mb={8} textAlign="center">Easy to Use</Heading>
            <Flex direction={['column', 'row']} gap={8}>
              <Box flex={1}>
                <Heading size="md" mb={4}>No Cloud Configuration</Heading>
                <Text>
                  Skip the complex cloud provider(GCP, EC2, Azure, etc) setup. We handle all the infrastructure configuration so you can focus on your ML models.
                </Text>
              </Box>
              <Box flex={1}>
                <Heading size="md" mb={4}>Natural Language CLI</Heading>
                <Text>
                  Execute ML jobs using our intuitive CLI that understands natural language commands, making training simpler than ever.
                </Text>
              </Box>
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
}