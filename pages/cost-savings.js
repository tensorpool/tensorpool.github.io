"use client";

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
  StatHelpText,
} from "@chakra-ui/react";
import Layout from "../components/layout.js";
import SidePanel from "../components/SidePanel";

const supabaseUrl = "https://api.tensorpool.dev";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CostSavings() {
  const [totalSavings, setTotalSavings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        fetchSavings(session.user.id);
      }
    };

    checkSession();
  }, [router]);

  const fetchSavings = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("Jobs")
        .select("on_demand_price, user_cost")
        .eq("user_id", userId);

      if (error) throw error;

      // Calculate total savings
      const savings = data.reduce((total, job) => {
        if (job.on_demand_price && job.user_cost) {
          return total + (job.on_demand_price - job.user_cost);
        }
        return total;
      }, 0);

      setTotalSavings(savings);
    } catch (error) {
      console.error("Error fetching savings:", error);
    } finally {
      setLoading(false);
    }
  };

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
          Cost Savings
        </Heading>

        <Box
          p={8}
          borderWidth="1px"
          borderRadius="lg"
          maxW="500px"
          bg="gray.800"
        >
          <Stat>
            <StatLabel fontSize="xl" mb={2}>
              Total Cost Savings
            </StatLabel>
            <StatNumber fontSize="4xl" color="green.400">
              ${totalSavings.toFixed(2)}
            </StatNumber>
            <StatHelpText>Compared to typical on-demand pricing</StatHelpText>
          </Stat>
        </Box>
      </Box>
    </Layout>
  );
}
