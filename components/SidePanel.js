import React, { useState } from "react";
import { Box, Button, VStack, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
const supabaseUrl = "https://api.tensorpool.dev";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SidePanel = ({ isCollapsed, setIsCollapsed }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      await new Promise((resolve) => setTimeout(resolve, 500));
      window.location.href = "/?logout=true";
    } catch (error) {
      console.error("Error logging out:", error);
      // Still redirect on error
      window.location.href = "/?logout=true";
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      <IconButton
        icon={
          isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />
        }
        onClick={() => setIsCollapsed(!isCollapsed)}
        position="fixed"
        left={isCollapsed ? "0" : "185px"}
        top="20px"
        bg="black"
        color="white"
        size="sm"
        borderRadius="full"
        _hover={{ bg: "gray.700" }}
        zIndex={1000}
        transition="left 0.3s ease"
      />

      <Box
        position="fixed"
        left={isCollapsed ? "-230px" : "0"}
        top={0}
        bottom={0}
        width="200px"
        p={4}
        borderRight="1px solid #ddd"
        color="white"
        transition="left 0.3s ease"
        bg="black"
        zIndex={999}
        display="flex"
        flexDirection="column"
      >
        <VStack spacing={4} align="stretch" mt={12}>
          <Button
            colorScheme="ghost"
            bg={pathname === "/dashboard" ? "white" : "black"}
            color={pathname === "/dashboard" ? "black" : "white"}
            _hover={{ bg: "poolblue" }}
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            colorScheme="ghost"
            bg={pathname === "/balance" ? "white" : "black"}
            color={pathname === "/balance" ? "black" : "white"}
            _hover={{ bg: "poolblue" }}
            onClick={() => router.push("/balance")}
          >
            Balance
          </Button>
          <Button
            colorScheme="ghost"
            bg={pathname === "/api-key" ? "white" : "black"}
            color={pathname === "/api-key" ? "black" : "white"}
            _hover={{ bg: "poolblue" }}
            onClick={() => router.push("/api-key")}
          >
            API Key
          </Button>
          {/* <Button
            colorScheme="ghost"
            // bg="rpmblue"
            _hover={{ bg: "rpblue" }}
            onClick={() => router.push("/cost-savings")}
          >
            Cost Savings
          </Button> */}
        </VStack>
        <Button
          colorScheme="ghost"
          onClick={handleLogout}
          isLoading={loggingOut}
          loadingText="Logging out..."
          mt="auto"
          mb={4}
        >
          Log Out
        </Button>
      </Box>
    </>
  );
};

export default SidePanel;
