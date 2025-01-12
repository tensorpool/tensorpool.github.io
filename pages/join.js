import React, { useState, useEffect } from 'react';
import {
    Button,
    Box,
    Center,
    Input,
    Heading,
    Text,
    useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import Layout from '../components/layout.js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const MotionBox = motion(Box); // Create a motion-enabled Box component
const MotionHeading = motion(Heading); // Motion-enabled Heading
const MotionText = motion(Text); // Motion-enabled Text
const MotionButton = motion(Button); // Motion-enabled Button

const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false); // Track login status
    const [checkingSession, setCheckingSession] = useState(true); // Track session check
    const [apiData, setApiData] = useState(null); // Store api_id and api_key
    const toast = useToast();

    // Handle email login/signup
    const handleEmailSubmit = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (error) throw error;

            toast({
                title: 'Verification link sent to ' + email,
                status: 'success',
                duration: 6000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error sending email verification.',
                description: error.message,
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle Google login/signup
    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/join`,
                },
            });

            if (error) console.error('Google login error:', error.message);
        } catch (err) {
            console.error('Unexpected error:', err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setLoggedIn(false);
            setApiData(null);

            toast({
                title: 'Logged out successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: 'Error logging out.',
                description: err.message,
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
        }
    };

    // Listen for auth state changes
    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (err) {
                console.error('Error checking session:', err.message);
            } finally {
                setCheckingSession(false);
            }
        };

        checkSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setLoggedIn(!!session?.user);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
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
                                        Welcome to TensorPool
                                    </MotionHeading>
                                    <MotionText
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    >
                                        Join waitlist to get started
                                    </MotionText>
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
                                    Successfully logged in! We will reach out if you are selected for beta testing.
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
                                <Center m={3}>
                                    <MotionButton
                                        bg="rpmblue"
                                        px={4}
                                        onClick={handleGoogleLogin}
                                        isLoading={loading}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                    >
                                        Continue with Google
                                    </MotionButton>
                                </Center>
                            </MotionBox>
                        )}
                    </Center>
                </MotionBox>
            </Center>
        </Layout>
    );
};

export default Login;
