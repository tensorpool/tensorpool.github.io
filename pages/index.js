import {
  Button,
  Text,
  Link,
  Box,
  Flex,
  Center,
  Heading,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "../components/layout.js";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const MotionBox = motion(Box);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Layout>
      <Flex
        flexDirection={["column", "row"]}
        width={["90%", "75%"]}
        mx="auto"
        minHeight="50vh"
        alignItems="center"
        justifyContent="center"
      >
        <MotionBox
          width={["100%", "70%"]}
          my={9}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          flexDirection="column"
          alignItems={["center", "flex-start"]}
          textAlign={["center", "left"]}
        >
          <Heading as="h1" fontSize={["4xl", "6xl"]} fontWeight="bold">
            TensorPool
          </Heading>
          <Text as="h2" fontSize={["2xl", "3xl"]} my={[6, 3]}>
            The easiest way to execute ML jobs on the cloud.
          </Text>
          <Text as="h3" fontSize={["lg", "xl"]} my={[6, 3]}>
            Our CLI makes ML model training effortless - just describe your job,
            and we handle GPU orchestration and execution at half the cost of
            major cloud providers.
          </Text>
          <Flex direction="column" align={["center", "flex-start"]}>
            <Link href="/how-it-works" mb={4}>
              <Button size="lg" bg="rpmblue" padding={6} width="200px">
                How It Works
              </Button>
            </Link>
            <Link href={user ? "/dashboard" : "/join"}>
              <Button size="lg" bg="rpmblue" padding={6} width="200px">
                {user ? "Dashboard" : "Sign In"}
              </Button>
            </Link>
          </Flex>
        </MotionBox>

        <MotionBox
          width={["100%", "30%"]}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Center>
            <Image
              src="/images/logo-transparent.svg"
              boxSize={["60%", "90%"]}
            />
          </Center>
        </MotionBox>
      </Flex>
    </Layout>
  );
}
