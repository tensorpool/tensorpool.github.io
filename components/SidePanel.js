// import React, { useState } from 'react';
// import { Box, Button, VStack, IconButton } from '@chakra-ui/react';
// import { useRouter } from 'next/navigation';
// import { ChevronRight, ChevronLeft } from 'lucide-react';

// const SidePanel = () => {
//   const router = useRouter();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <>
//       {/* Toggle Button - Always visible */}
//       <IconButton
//         icon={isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         position="fixed"
//         left={isCollapsed ? "0" : "180px"}
//         top="20px"
//         bg="black"
//         color="white"
//         size="sm"
//         borderRadius="full"
//         _hover={{ bg: "gray.700" }}
//         zIndex={1000}
//         transition="left 0.3s ease"
//       />

//       {/* Panel Content */}
//       <Box
//         position="fixed"
//         left={isCollapsed ? "-200px" : "0"}
//         top={0}
//         bottom={0}
//         width="200px"
//         p={4}
//         borderRight="1px solid #ddd"
//         color="white"
//         transition="left 0.3s ease"
//         bg="rpblue"
//         zIndex={999}
//       >
//         <VStack spacing={4} align="stretch" mt={12}>
//           <Button
//             colorScheme="blue"
//             bg="rpmblue"
//             _hover={{ bg: "rpblue" }}
//             onClick={() => router.push('/dashboard')}
//           >
//             Dashboard
//           </Button>
//           <Button
//             colorScheme="blue"
//             bg="rpmblue"
//             _hover={{ bg: "rpblue" }}
//             onClick={() => router.push('/api-key')}
//           >
//             API Key
//           </Button>
//         </VStack>
//       </Box>
//     </>
//   );
// };

// export default SidePanel;


import React from 'react';
import { Box, Button, VStack, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const SidePanel = ({ isCollapsed, setIsCollapsed }) => {
  const router = useRouter();

  return (
    <>
      {/* Toggle Button - Always visible */}
      <IconButton
        icon={isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        onClick={() => setIsCollapsed(!isCollapsed)}
        position="fixed"
        left={isCollapsed ? "0" : "180px"}
        top="20px"
        bg="black"
        color="white"
        size="sm"
        borderRadius="full"
        _hover={{ bg: "gray.700" }}
        zIndex={1000}
        transition="left 0.3s ease"
      />

      {/* Panel Content */}
      <Box
        position="fixed"
        left={isCollapsed ? "-200px" : "0"}
        top={0}
        bottom={0}
        width="200px"
        p={4}
        borderRight="1px solid #ddd"
        color="white"
        transition="left 0.3s ease"
        bg="rpblue"
        zIndex={999}
      >
        <VStack spacing={4} align="stretch" mt={12}>
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
    </>
  );
};

export default SidePanel;