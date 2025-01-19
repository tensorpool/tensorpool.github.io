// import React, { useState, useEffect } from 'react';
// import {
//     Button,
//     Box,
//     Center,
//     Input,
//     Heading,
//     Text,
//     useToast,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion'; // Import motion from Framer Motion
// import Layout from '../components/layout.js';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// const MotionBox = motion(Box); // Create a motion-enabled Box component
// const MotionHeading = motion(Heading); // Motion-enabled Heading
// const MotionText = motion(Text); // Motion-enabled Text
// const MotionButton = motion(Button); // Motion-enabled Button

// const supabase = createClient(supabaseUrl, supabaseKey);

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [loggedIn, setLoggedIn] = useState(false); // Track login status
//     const [checkingSession, setCheckingSession] = useState(true); // Track session check
//     const [apiData, setApiData] = useState(null); // Store api_id and api_key
//     const toast = useToast();

//     // Handle email login/signup
//     const handleEmailSubmit = async () => {
//         setLoading(true);
//         try {
//             const { error } = await supabase.auth.signInWithOtp({ email });
//             if (error) throw error;

//             toast({
//                 title: 'Verification link sent to ' + email,
//                 status: 'success',
//                 duration: 6000,
//                 isClosable: true,
//             });
//         } catch (error) {
//             toast({
//                 title: 'Error sending email verification.',
//                 description: error.message,
//                 status: 'error',
//                 duration: 6000,
//                 isClosable: true,
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle Google login/signup
//     const handleGoogleLogin = async () => {
//         setLoading(true);
//         try {
//             const { error } = await supabase.auth.signInWithOAuth({
//                 provider: 'google',
//                 options: {
//                     redirectTo: `${window.location.origin}/join`,
//                 },
//             });

//             if (error) console.error('Google login error:', error.message);
//         } catch (err) {
//             console.error('Unexpected error:', err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle Logout
//     const handleLogout = async () => {
//         try {
//             const { error } = await supabase.auth.signOut();
//             if (error) throw error;

//             setLoggedIn(false);
//             setApiData(null);

//             toast({
//                 title: 'Logged out successfully!',
//                 status: 'success',
//                 duration: 3000,
//                 isClosable: true,
//             });
//         } catch (err) {
//             toast({
//                 title: 'Error logging out.',
//                 description: err.message,
//                 status: 'error',
//                 duration: 6000,
//                 isClosable: true,
//             });
//         }
//     };

//     // Listen for auth state changes
//     useEffect(() => {
//         const checkSession = async () => {
//             try {
//                 const { data: { session } } = await supabase.auth.getSession();
//                 if (session?.user) {
//                     setLoggedIn(true);
//                 } else {
//                     setLoggedIn(false);
//                 }
//             } catch (err) {
//                 console.error('Error checking session:', err.message);
//             } finally {
//                 setCheckingSession(false);
//             }
//         };

//         checkSession();

//         const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//             setLoggedIn(!!session?.user);
//         });

//         return () => {
//             authListener.subscription.unsubscribe();
//         };
//     }, []);

//     if (checkingSession) {
//         return (
//             <Layout>
//                 <Center p={6} minHeight="100vh">
//                     <MotionText
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 1 }}
//                     >
//                         Checking session...
//                     </MotionText>
//                 </Center>
//             </Layout>
//         );
//     }

//     return (
//         <Layout>
//             <Center p={6} minHeight="100vh">
//                 <MotionBox
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 1 }}
//                 >
//                     <Center my={6}>
//                         <Box>
//                             {loggedIn ? (
//                                 <MotionHeading
//                                     as="h2"
//                                     size="lg"
//                                     my={6}
//                                     initial={{ opacity: 0, x: -50 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 1 }}
//                                 >
//                                     Welcome to TensorPool!
//                                 </MotionHeading>
//                             ) : (
//                                 <>
//                                     <MotionHeading
//                                         as="h2"
//                                         size="lg"
//                                         my={6}
//                                         initial={{ opacity: 0, x: -50 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ duration: 1 }}
//                                     >
//                                         Welcome to TensorPool
//                                     </MotionHeading>
//                                     <MotionText
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 1, delay: 0.5 }}
//                                     >
//                                         Join waitlist to get started
//                                     </MotionText>
//                                 </>
//                             )}
//                         </Box>
//                     </Center>
//                     <Center>
//                         {loggedIn ? (
//                             <MotionBox
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 1 }}
//                             >
//                                 <Heading as="h3" size="md">
//                                     Successfully logged in! We will reach out if you are selected for beta testing.
//                                 </Heading>
//                                 <Center mt={6}>
//                                     <MotionButton
//                                         colorScheme="red"
//                                         onClick={handleLogout}
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 1, delay: 0.3 }}
//                                     >
//                                         Log Out
//                                     </MotionButton>
//                                 </Center>
//                             </MotionBox>
//                         ) : (
//                             <MotionBox
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 1 }}
//                             >
//                                 <Center m={3}>
//                                     <MotionButton
//                                         bg="rpmblue"
//                                         px={4}
//                                         onClick={handleGoogleLogin}
//                                         isLoading={loading}
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 1, delay: 0.3 }}
//                                     >
//                                         Continue with Google
//                                     </MotionButton>
//                                 </Center>
//                             </MotionBox>
//                         )}
//                     </Center>
//                 </MotionBox>
//             </Center>
//         </Layout>
//     );
// };
// export default Login;
//////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import {
//     Button,
//     Box,
//     Center,
//     Input,
//     Heading,
//     Text,
//     useToast,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion'; // Import motion from Framer Motion
// import Layout from '../components/layout.js';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// const MotionBox = motion(Box); // Create a motion-enabled Box component
// const MotionHeading = motion(Heading); // Motion-enabled Heading
// const MotionText = motion(Text); // Motion-enabled Text
// const MotionButton = motion(Button); // Motion-enabled Button

// const supabase = createClient(supabaseUrl, supabaseKey);

// const isEmbeddedBrowser = () => {
//     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//     return /FBAN|FBAV|Instagram|LinkedIn/i.test(userAgent);
// };

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [loggedIn, setLoggedIn] = useState(false); // Track login status
//     const [checkingSession, setCheckingSession] = useState(true); // Track session check
//     const [apiData, setApiData] = useState(null); // Store api_id and api_key
//     const toast = useToast();

//     // Handle email login/signup
//     const handleEmailSubmit = async () => {
//         setLoading(true);
//         try {
//             const { error } = await supabase.auth.signInWithOtp({ email });
//             if (error) throw error;

//             toast({
//                 title: 'Verification link sent to ' + email,
//                 status: 'success',
//                 duration: 6000,
//                 isClosable: true,
//             });
//         } catch (error) {
//             toast({
//                 title: 'Error sending email verification.',
//                 description: error.message,
//                 status: 'error',
//                 duration: 6000,
//                 isClosable: true,
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle Google login/signup
//     const handleGoogleLogin = async () => {
//         setLoading(true);
//         try {
//             if (isEmbeddedBrowser()) {
//                 toast({
//                     title: 'Unsupported Browser',
//                     description: 'Google login is not supported in LinkedIn’s browser. Please open this page in Chrome, Safari, or another browser.',
//                     status: 'error',
//                     duration: 6000,
//                     isClosable: true,
//                 });
//                 setLoading(false);
//                 return;
//             }

//             const { error } = await supabase.auth.signInWithOAuth({
//                 provider: 'google',
//                 options: {
//                     redirectTo: `${window.location.origin}/join`,
//                 },
//             });

//             if (error) {
//                 console.error('Google login error:', error.message);
//             }
//         } catch (err) {
//             console.error('Unexpected error:', err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle Logout
//     const handleLogout = async () => {
//         try {
//             const { error } = await supabase.auth.signOut();
//             if (error) throw error;

//             setLoggedIn(false);
//             setApiData(null);

//             toast({
//                 title: 'Logged out successfully!',
//                 status: 'success',
//                 duration: 3000,
//                 isClosable: true,
//             });
//         } catch (err) {
//             toast({
//                 title: 'Error logging out.',
//                 description: err.message,
//                 status: 'error',
//                 duration: 6000,
//                 isClosable: true,
//             });
//         }
//     };

//     // Listen for auth state changes
//     useEffect(() => {
//         const checkSession = async () => {
//             try {
//                 const { data: { session } } = await supabase.auth.getSession();
//                 if (session?.user) {
//                     setLoggedIn(true);
//                 } else {
//                     setLoggedIn(false);
//                 }
//             } catch (err) {
//                 console.error('Error checking session:', err.message);
//             } finally {
//                 setCheckingSession(false);
//             }
//         };

//         checkSession();

//         const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//             setLoggedIn(!!session?.user);
//         });

//         return () => {
//             authListener.subscription.unsubscribe();
//         };
//     }, []);

//     // Warn users if they are in an embedded browser
//     useEffect(() => {
//         if (isEmbeddedBrowser()) {
//             toast({
//                 title: 'Unsupported Browser Detected',
//                 description: 'It seems you are using LinkedIn’s in-app browser. For the best experience, please open this page in your default browser (e.g., Chrome or Safari).',
//                 status: 'warning',
//                 duration: 6000,
//                 isClosable: true,
//             });
//         }
//     }, []);

//     if (checkingSession) {
//         return (
//             <Layout>
//                 <Center p={6} minHeight="100vh">
//                     <MotionText
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 1 }}
//                     >
//                         Checking session...
//                     </MotionText>
//                 </Center>
//             </Layout>
//         );
//     }

//     return (
//         <Layout>
//             <Center p={6} minHeight="100vh">
//                 <MotionBox
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 1 }}
//                 >
//                     <Center my={6}>
//                         <Box>
//                             {loggedIn ? (
//                                 <MotionHeading
//                                     as="h2"
//                                     size="lg"
//                                     my={6}
//                                     initial={{ opacity: 0, x: -50 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 1 }}
//                                 >
//                                     Welcome to TensorPool!
//                                 </MotionHeading>
//                             ) : (
//                                 <>
//                                     <MotionHeading
//                                         as="h2"
//                                         size="lg"
//                                         my={6}
//                                         initial={{ opacity: 0, x: -50 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ duration: 1 }}
//                                     >
//                                         Welcome to TensorPool
//                                     </MotionHeading>
//                                     <MotionText
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 1, delay: 0.5 }}
//                                     >
//                                         Join waitlist to get started
//                                     </MotionText>
//                                 </>
//                             )}
//                         </Box>
//                     </Center>
//                     <Center>
//                         {loggedIn ? (
//                             <MotionBox
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 1 }}
//                             >
//                                 <Heading as="h3" size="md">
//                                     Successfully logged in! We will reach out if you are selected for beta testing.
//                                 </Heading>
//                                 <Center mt={6}>
//                                     <MotionButton
//                                         colorScheme="red"
//                                         onClick={handleLogout}
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 1, delay: 0.3 }}
//                                     >
//                                         Log Out
//                                     </MotionButton>
//                                 </Center>
//                             </MotionBox>
//                         ) : (
//                             <MotionBox
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 1 }}
//                             >
//                                 <Center m={3}>
//                                     <MotionButton
//                                         bg="rpmblue"
//                                         px={4}
//                                         onClick={handleGoogleLogin}
//                                         isLoading={loading}
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 1, delay: 0.3 }}
//                                     >
//                                         Continue with Google
//                                     </MotionButton>
//                                 </Center>
//                                 <Center mt={4}>
//                                     <Text>
//                                         Having trouble logging in? Copy the link and open it in a browser:
//                                     </Text>
//                                     <Button
//                                         onClick={() => navigator.clipboard.writeText(window.location.href)}
//                                         colorScheme="blue"
//                                         ml={3}
//                                     >
//                                         Copy Link
//                                     </Button>
//                                 </Center>
//                             </MotionBox>
//                         )}
//                     </Center>
//                 </MotionBox>
//             </Center>
//         </Layout>
//     );
// };

// export default Login;

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import {
//     Button,
//     Box,
//     Center,
//     Input,
//     Heading,
//     Text,
//     VStack,
//     useToast,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import Layout from '../components/layout.js';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// const MotionBox = motion(Box);
// const MotionHeading = motion(Heading);
// const MotionText = motion(Text);
// const MotionButton = motion(Button);

// const supabase = createClient(supabaseUrl, supabaseKey);

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [checkingSession, setCheckingSession] = useState(true);
//     const toast = useToast();

//     const handleSubmit = async () => {
//         if (!email || !name) {
//             toast({
//                 title: 'Missing Information',
//                 description: 'Please provide both your name and email.',
//                 status: 'error',
//                 duration: 4000,
//                 isClosable: true,
//             });
//             return;
//         }

//         setLoading(true);
//         try {
//             const { error } = await supabase.auth.signInWithOtp({
//                 email: email,
//                 options: {
//                     data: {
//                         full_name: name
//                     },
//                     emailRedirectTo: `${window.location.origin}/join`
//                 }
//             });
            
//             if (error) throw error;

//             toast({
//                 title: 'Verification link sent!',
//                 description: `Please check ${email} for a verification link.`,
//                 status: 'success',
//                 duration: 6000,
//                 isClosable: true,
//             });

//             setEmail('');
//             setName('');
//         } catch (error) {
//             toast({
//                 title: 'Error sending verification.',
//                 description: error.message,
//                 status: 'error',
//                 duration: 6000,
//                 isClosable: true,
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             const { error } = await supabase.auth.signOut();
//             if (error) throw error;

//             setLoggedIn(false);

//             toast({
//                 title: 'Logged out successfully!',
//                 status: 'success',
//                 duration: 3000,
//                 isClosable: true,
//             });
//         } catch (err) {
//             toast({
//                 title: 'Error logging out.',
//                 description: err.message,
//                 status: 'error',
//                 duration: 6000,
//                 isClosable: true,
//             });
//         }
//     };

//     useEffect(() => {
//         const checkSession = async () => {
//             try {
//                 const { data: { session } } = await supabase.auth.getSession();
//                 if (session?.user) {
//                     setLoggedIn(true);
//                 } else {
//                     setLoggedIn(false);
//                 }
//             } catch (err) {
//                 console.error('Error checking session:', err.message);
//             } finally {
//                 setCheckingSession(false);
//             }
//         };

//         checkSession();

//         const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//             setLoggedIn(!!session?.user);
//         });

//         return () => {
//             authListener.subscription.unsubscribe();
//         };
//     }, []);

//     if (checkingSession) {
//         return (
//             <Layout>
//                 <Center p={6} minHeight="100vh">
//                     <MotionText
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 1 }}
//                     >
//                         Checking session...
//                     </MotionText>
//                 </Center>
//             </Layout>
//         );
//     }

//     return (
//         <Layout>
//             <Center p={6} minHeight="100vh">
//                 <MotionBox
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 1 }}
//                 >
//                     <Center my={6}>
//                         <Box>
//                             {loggedIn ? (
//                                 <MotionHeading
//                                     as="h2"
//                                     size="lg"
//                                     my={6}
//                                     initial={{ opacity: 0, x: -50 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 1 }}
//                                 >
//                                     Welcome to TensorPool!
//                                 </MotionHeading>
//                             ) : (
//                                 <>
//                                     <MotionHeading
//                                         as="h2"
//                                         size="lg"
//                                         my={6}
//                                         initial={{ opacity: 0, x: -50 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ duration: 1 }}
//                                     >
//                                         Welcome to TensorPool
//                                     </MotionHeading>
//                                     <MotionText
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 1, delay: 0.5 }}
//                                     >
//                                         Join the waitlist to get started
//                                     </MotionText>
//                                 </>
//                             )}
//                         </Box>
//                     </Center>
//                     <Center>
//                         {loggedIn ? (
//                             <MotionBox
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 1 }}
//                             >
//                                 <Heading as="h3" size="md">
//                                     Successfully logged in! We will reach out if you are selected for beta testing.
//                                 </Heading>
//                                 <Center mt={6}>
//                                     <MotionButton
//                                         colorScheme="red"
//                                         onClick={handleLogout}
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 1, delay: 0.3 }}
//                                     >
//                                         Log Out
//                                     </MotionButton>
//                                 </Center>
//                             </MotionBox>
//                         ) : (
//                             <MotionBox
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 1 }}
//                             >
//                                 <VStack spacing={4} align="center">
//                                     <Input
//                                         placeholder="Enter your full name"
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                         size="md"
//                                         width="300px"
//                                     />
//                                     <Input
//                                         placeholder="Enter your email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         size="md"
//                                         width="300px"
//                                     />
//                                     <MotionButton
//                                         bg="rpmblue"
//                                         px={4}
//                                         onClick={handleSubmit}
//                                         isLoading={loading}
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ duration: 1, delay: 0.3 }}
//                                     >
//                                         Join Waitlist
//                                     </MotionButton>
//                                 </VStack>
//                             </MotionBox>
//                         )}
//                     </Center>
//                 </MotionBox>
//             </Center>
//         </Layout>
//     );
// };

// export default Login;

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import {
    Button,
    Box,
    Center,
    Input,
    Heading,
    Text,
    VStack,
    Divider,
    useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Layout from '../components/layout.js';
import { createClient } from '@supabase/supabase-js';

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
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);
    const toast = useToast();

    const handleEmailSubmit = async () => {
        if (!email || !name) {
            toast({
                title: 'Missing Information',
                description: 'Please provide both your name and email.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    data: {
                        full_name: name
                    },
                    emailRedirectTo: `${window.location.origin}/join`
                }
            });
            
            if (error) throw error;

            toast({
                title: 'Verification link sent!',
                description: `Please check ${email} for a verification link.`,
                status: 'success',
                duration: 6000,
                isClosable: true,
            });

            setEmail('');
            setName('');
        } catch (error) {
            toast({
                title: 'Error sending verification.',
                description: error.message,
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            if (isEmbeddedBrowser()) {
                toast({
                    title: 'Unsupported Browser',
                    description: 'Google login is not supported in LinkedIns browser. Please open this page in Chrome, Safari, or another browser.',
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                });
                setLoading(false);
                return;
            }

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/join`,
                }
            });

            if (error) throw error;
        } catch (error) {
            toast({
                title: 'Error with Google login',
                description: error.message,
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setLoggedIn(false);

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

    useEffect(() => {
        if (isEmbeddedBrowser()) {
            toast({
                title: 'Unsupported Browser Detected',
                description: 'It seems you are using LinkedIns in-app browser. For the best experience, please open this page in your default browser (e.g., Chrome or Safari).',
                status: 'warning',
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
                                        Welcome to TensorPool
                                    </MotionHeading>
                                    <MotionText
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    >
                                        Join the waitlist to get started
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
                                <VStack spacing={6} align="center">
                                    <VStack spacing={4} align="center" width="300px">
                                        <Input
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            size="md"
                                        />
                                        <Input
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            size="md"
                                        />
                                        <MotionButton
                                            width="full"
                                            onClick={handleEmailSubmit}
                                            isLoading={loading}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            bg="rpmblue"
                                        >
                                            Join Waitlist with Email
                                        </MotionButton>
                                    </VStack>
                                    
                                    <Divider />
                                    
                                    <MotionButton
                                        bg="rpmblue"
                                        width="300px"
                                        onClick={handleGoogleLogin}
                                        isLoading={loading}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                    >
                                        Continue with Google
                                    </MotionButton>

                                    {isEmbeddedBrowser() && (
                                        <VStack mt={4} spacing={2}>
                                            <Text>
                                                Having trouble logging in? Copy the link and open it in a browser:
                                            </Text>
                                            <Button
                                                bg="rpmblue"
                                                onClick={() => navigator.clipboard.writeText(window.location.href)}
                                                colorScheme="blue"
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