import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Box, Heading, Text, useToast, Link } from "@chakra-ui/react";
import Layout from "../components/layout";
import SidePanel from "../components/SidePanel"; // Import SidePanel

const supabaseUrl = "https://api.tensorpool.dev";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ApiKey() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        fetchApiKey(session.user.id);
      }
    };

    checkSession();
  }, [router]);

  // TODO: move this behind an endpoint
  const fetchApiKey = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("api_key, banned")
        .eq("uid", userId)
        .single();

      if (error) throw error;

      setApiData(data);
    } catch (error) {
      console.error("Error fetching API key:", error);
      toast({
        title: "Error fetching API key",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box ml="220px" minH="100vh" display="flex" flexDirection="column">
          <Text>Loading...</Text>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <SidePanel />
      <Box ml="220px" minH="100vh" display="flex" flexDirection="column">
        <Heading as="h1" size="xl" mb={6}>
          API Key
        </Heading>
        {apiData ? (
          <Box>
            {apiData.banned ? (
              <Text mb={4} color="white" fontSize="lg">
                Error 9406. No API key found. Contact team@tensorpool.dev to get
                your API key.
              </Text>
            ) : (
              <Text mb={4}> {apiData.api_key}</Text>
            )}
          </Box>
        ) : (
          <Text mb={4}>
            No API key found. Please contact team@tensorpool.dev
          </Text>
        )}
      </Box>
    </Layout>
  );
}
