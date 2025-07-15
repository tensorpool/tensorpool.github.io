import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  Box,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  VStack,
} from "@chakra-ui/react";
import Layout from "../components/layout.js";
import SidePanel from "../components/SidePanel";

const supabaseUrl = "https://api.tensorpool.dev";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Balance() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        fetchBalance(session.user.id);
        setUserEmail(session.user.email);
      }
    };

    checkSession();
  }, [router]);

  const fetchBalance = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("balance")
        .eq("uid", userId)
        .single();

      if (error) throw error;
      setBalance(data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load the Stripe script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (loading) {
    return (
      <Layout>
        <Box
          ml={isCollapsed ? "0" : "220px"}
          minH="100vh"
          display="flex"
          flexDirection="column"
          transition="margin-left 0.3s ease"
          pl={10}
        >
          <Text>Loading...</Text>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <SidePanel isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Box
        ml={isCollapsed ? "0" : "220px"}
        height="100vh"
        display="flex"
        flexDirection="column"
        transition="margin-left 0.3s ease"
        pl={10}
        pt={10}
      >
        <Heading as="h1" size="xl" mb={6}>
          Balance
        </Heading>

        <VStack spacing={8} align="stretch" maxW="500px">
          <Box p={8} borderWidth="1px" borderRadius="lg" bg="gray.800">
            <Stat>
              <StatLabel fontSize="xl" mb={2}>
                Current Balance
              </StatLabel>
              <StatNumber fontSize="4xl" color="green.400">
                ${balance?.toFixed(2)}
              </StatNumber>
            </Stat>
          </Box>

          {/* Render the Stripe Buy Button */}
          <div>
            <stripe-buy-button
              buy-button-id="buy_btn_1QrBzYA1GmKl9mbTURO2NAVW"
              publishable-key="pk_live_51QdFZKA1GmKl9mbTFaV5IkzCTShxBAOhlR6tV3l3OI4acW2K4vtnZBCm9XoOqlinGX0WbsdVk6FQlh3jhWFB3PiU00hVtUMpcW"
              // buy-button-id="buy_btn_1QrBV9A1GmKl9mbT55SJslyQ"
              // publishable-key="pk_test_51QdFZKA1GmKl9mbTWexUMUGwDyg2Xy8Uj3hYYWNuWGoWoFYk2xQWpKV2AUCy54lDzOtDVM2fm2gX5Gan0pEt299e00o6XNuizX"
              customer-email={userEmail}
              onclick="window.open(this.getAttribute('checkout-url'), '_blank')"
            ></stripe-buy-button>
          </div>
        </VStack>
      </Box>
    </Layout>
  );
}
