import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
  } from '@chakra-ui/react';
import Layout from '../components/layout.js';
  
  const Blog = () => {
    return (
    <Layout>
      <Container maxW="container.xl" py={10} minHeight="45vh">
        <VStack spacing={8} align="center">
          <Heading as="h1" size="2xl">
            TensorPool Blog
          </Heading>
          <Text fontSize="xl" textAlign="center">
            Under Construction - Coming Soon!
          </Text>
          <Text>
            Stay tuned for updates, insights, and news about TensorPool.
          </Text>
        </VStack>
      </Container>
      </Layout>
    );
  };
  
  export default Blog;