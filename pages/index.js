import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Center,
  Heading,
  Text,
  VStack,
  Divider,
  useToast,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "../components/layout.js";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { FaGoogle, FaGithub } from "react-icons/fa";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const supabase = createClient(supabaseUrl, supabaseKey);

const isEmbeddedBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /FBAN|FBAV|Instagram|LinkedIn/i.test(userAgent);
};

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [authProvider, setAuthProvider] = useState("");
  const toast = useToast();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setAuthProvider("google");
    try {
      if (isEmbeddedBrowser()) {
        toast({
          title: "Unsupported Browser",
          description:
            "Google login is not supported in LinkedIn's browser. Please open this page in Chrome, Safari, or another browser.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error with Google login",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setAuthProvider("");
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    setAuthProvider("github");
    try {
      if (isEmbeddedBrowser()) {
        toast({
          title: "Unsupported Browser",
          description:
            "GitHub login is not supported in LinkedIn's browser. Please open this page in Chrome, Safari, or another browser.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error with GitHub login",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setAuthProvider("");
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setLoggedIn(false);
      router.push("/");

      toast({
        title: "Logged out successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error logging out",
        description: err.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      // Check if we've just logged out
      const justLoggedOut =
        new URLSearchParams(window.location.search).get("logout") === "true";

      if (justLoggedOut) {
        // Skip session check if we just logged out
        setLoggedIn(false);
        setCheckingSession(false);
        return;
      }

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setLoggedIn(true);
          router.push("/dashboard");
        } else {
          setLoggedIn(false);
        }
      } catch (err) {
        console.error("Error checking session:", err.message);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          setLoggedIn(true);
          router.push("/dashboard");
        } else if (event === "SIGNED_OUT") {
          setLoggedIn(false);
          router.push("/");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (isEmbeddedBrowser()) {
      toast({
        title: "Unsupported Browser Detected",
        description:
          "It seems you are using LinkedIn's in-app browser. For the best experience, please open this page in your default browser (e.g., Chrome or Safari).",
        status: "warning",
        duration: 6000,
        isClosable: true,
      });
    }
  }, []);

  if (checkingSession) {
    return (
      <Layout>
        <Center p={6} minHeight="100vh">
          <MotionText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Checking session...
          </MotionText>
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <Center p={6} minHeight="100vh">
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Center my={6}>
            <Box>
              {loggedIn ? (
                <MotionHeading
                  as="h2"
                  size="lg"
                  my={6}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  Welcome to TensorPool!
                </MotionHeading>
              ) : (
                <>
                  <MotionHeading
                    as="h2"
                    size="lg"
                    my={6}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                  >
                    TensorPool
                  </MotionHeading>
                </>
              )}
            </Box>
          </Center>
          <Center>
            {loggedIn ? (
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Heading as="h3" size="md">
                  Loading...
                </Heading>
                <Center mt={6}>
                  <MotionButton
                    colorScheme="red"
                    onClick={handleLogout}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    Log Out
                  </MotionButton>
                </Center>
              </MotionBox>
            ) : (
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <VStack spacing={6} align="center">
                  <Text fontSize="md" textAlign="center" mb={2}>
                    Sign in to access the TensorPool dashboard
                  </Text>

                  <Stack spacing={4} width="300px">
                    <MotionButton
                      width="full"
                      leftIcon={<Icon as={FaGoogle} />}
                      onClick={handleGoogleLogin}
                      isLoading={loading && authProvider === "google"}
                      loadingText="Connecting..."
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      bg="rpmblue"
                      _hover={{ bg: "blue.500" }}
                    >
                      Continue with Google
                    </MotionButton>

                    {/* <MotionButton
                      width="full"
                      leftIcon={<Icon as={FaGithub} />}
                      onClick={handleGithubLogin}
                      isLoading={loading && authProvider === "github"}
                      loadingText="Connecting..."
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      bg="gray.800"
                      color="white"
                      _hover={{ bg: "gray.700" }}
                    >
                      Continue with GitHub
                    </MotionButton> */}
                  </Stack>

                  {isEmbeddedBrowser() && (
                    <VStack mt={4} spacing={2}>
                      <Text textAlign="center" fontSize="sm">
                        Having trouble logging in? Copy the link and open it in
                        a browser:
                      </Text>
                      <Button
                        bg="rpmblue"
                        onClick={() =>
                          navigator.clipboard.writeText(window.location.href)
                        }
                        size="sm"
                      >
                        Copy Link
                      </Button>
                    </VStack>
                  )}
                </VStack>
              </MotionBox>
            )}
          </Center>
        </MotionBox>
      </Center>
    </Layout>
  );
};

export default Login;
