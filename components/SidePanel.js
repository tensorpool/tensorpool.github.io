import React from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const SidePanel = () => {
  const router = useRouter();

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      width="200px"
      p={4}
      borderRight="1px solid #ddd"
      color="white"
    >
      <VStack spacing={4} align="stretch">
        <Button
          colorScheme="blue"
          bg="rpmblue"
          _hover={{ bg: "rpblue" }}
          onClick={() => router.push('/dashboard')}
        >
          Dashboard
        </Button>
        <Button
          colorScheme="blue"
          bg="rpmblue"
          _hover={{ bg: "rpblue" }}
          onClick={() => router.push('/api-key')}
        >
          API Key
        </Button>
      </VStack>
    </Box>
  );
};

export default SidePanel;
