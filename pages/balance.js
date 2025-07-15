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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Spinner,
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
  const [orgData, setOrgData] = useState(null);
  const [isInOrg, setIsInOrg] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        fetchUserAndOrgData(session.user.id);
        setUserEmail(session.user.email);
        fetchTransactions(session.user.id);
      }
    };

    checkSession();
  }, [router]);

  const fetchUserAndOrgData = async (userId) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("balance, org_id")
        .eq("uid", userId)
        .single();

      if (userError) throw userError;

      if (userData.org_id) {
        setIsInOrg(true);
        const { data: orgData, error: orgError } = await supabase
          .from("Organizations")
          .select("org_name, balance")
          .eq("org_id", userData.org_id)
          .single();

        if (orgError) throw orgError;

        setOrgData({
          name: orgData.org_name,
          balance: orgData.balance,
        });
        setBalance(orgData.balance);
      } else {
        setIsInOrg(false);
        setBalance(userData.balance);
      }
    } catch (error) {
      console.error("Error fetching user and organization data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (userId) => {
    try {
      setTransactionsLoading(true);

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("org_id")
        .eq("uid", userId)
        .single();

      if (userError) throw userError;

      let query = supabase
        .from("Ledger")
        .select("id, created_at, amount, description, finalized, uid")
        .order("created_at", { ascending: false });

      if (userData.org_id) {
        query = query.eq("org_id", userData.org_id);
      } else {
        query = query.eq("uid", userId);
      }

      const { data: transactionsData, error: transactionsError } = await query;

      if (transactionsError) throw transactionsError;

      setTransactions(transactionsData || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setTransactionsLoading(false);
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
        display="flex"
        flexDirection="column"
        pl={10}
        pt={10}
      >
        <Heading as="h1" size="xl" mb={6}>
          {isInOrg ? `${orgData?.name} - Balance` : "Balance"}
        </Heading>

        <VStack spacing={8} align="stretch" w="90%">
          <Box p={8} borderWidth="1px" borderRadius="lg" bg="gray.800">
            <Stat>
              <StatLabel fontSize="xl" mb={2}>
                {isInOrg ? "Organization Balance" : "Current Balance"}
              </StatLabel>
              <StatNumber fontSize="4xl" color="green.400">
                {balance}
              </StatNumber>
            </Stat>
          </Box>

          {/* Stripe Buy Button */}
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

          {/* Transactions Table */}
          <Box p={6} borderWidth="1px" borderRadius="lg" bg="gray.800" w="100%">
            <Heading as="h2" size="lg" mb={4} color="white">
              {isInOrg ? "Organization Transactions" : "Transaction History"}
            </Heading>

            {transactionsLoading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <Spinner size="lg" color="blue.500" />
              </Box>
            ) : transactions.length === 0 ? (
              <Text color="gray.400" textAlign="center" p={4}>
                No transactions found
              </Text>
            ) : (
              <TableContainer w="100%" overflowX="auto">
                <Table variant="simple" colorScheme="gray" size="md">
                  <Thead>
                    <Tr>
                      <Th color="gray.300">Date & Time</Th>
                      <Th color="gray.300">Description</Th>
                      <Th color="gray.300">Status</Th>
                      <Th color="gray.300">User ID</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transactions.map((transaction) => (
                      <Tr key={transaction.id}>
                        <Td color="white" fontSize="sm">
                          {new Date(transaction.created_at).toLocaleString()}
                        </Td>
                        <Td
                          color="white"
                          fontSize="sm"
                          maxW="400px"
                          wordBreak="break-word"
                        >
                          {transaction.description || "N/A"}
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={
                              transaction.finalized ? "green" : "yellow"
                            }
                            variant="solid"
                            size="sm"
                          >
                            {transaction.finalized ? "Completed" : "Pending"}
                          </Badge>
                        </Td>
                        <Td color="white" fontSize="sm">
                          {transaction.uid}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
}
