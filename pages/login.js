// const supabaseUrl = 'https://jxzbchdihjvupnnusedd.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4emJjaGRpaGp2dXBubnVzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NDE2MTEsImV4cCI6MjA0ODQxNzYxMX0.-YOZ_BTFDoYU7GZ7OTHni_raG-j7sxXY5tpxsY8AQUY';

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
// import Layout from '../components/layout.js';
// import { createClient } from '@supabase/supabase-js';
// import { v4 as uuidv4 } from 'uuid'; // For generating API keys

// // Initialize Supabase client
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

//             if (error) {
//                 throw error;
//             }

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
//                     redirectTo: `${window.location.origin}/login`, // Dynamically set redirect URI
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

//             if (error) {
//                 throw error;
//             }

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

//     // Fetch or create API keys for the logged-in user
//     const fetchApiKey = async (userId) => {
//         try {
//             console.log('Fetching API key for user:', userId); // Debug log
            
//             const { data, error } = await supabase
//                 .from('UserAPIs')
//                 .select('api_id, api_key')
//                 .eq('user_id', userId)
//                 .single();
    
//             if (error) {
//                 console.error('Error fetching API key:', {
//                     message: error.message,
//                     code: error.code,
//                     details: error.details,
//                     hint: error.hint
//                 });
//                 throw error;
//             }
    
//             console.log('Successfully fetched API key'); // Debug log
//             return data;
//         } catch (err) {
//             console.error('Unexpected error in fetchApiKey:', {
//                 name: err.name,
//                 message: err.message,
//                 stack: err.stack
//             });
//             return null;
//         }
//     };
    
    

//     // Listen for auth state changes and fetch API keys
//     useEffect(() => {
//         const checkSession = async () => {
//             try {
//                 const { data: { session } } = await supabase.auth.getSession();
    
//                 if (session?.user) {
//                     console.log('User logged in:', session.user.id);
    
//                     // Fetch the user's API key
//                     const apiData = await fetchApiKey(session.user.id);
    
//                     if (apiData) {
//                         console.log('API Key:', apiData.api_key);
//                         setApiData(apiData); // Update state with the API key
//                     }
    
//                     setLoggedIn(true); // User is logged in
//                 } else {
//                     console.log('No active session.');
//                     setLoggedIn(false); // User is not logged in
//                 }
//             } catch (err) {
//                 console.error('Error checking session:', err.message);
//             } finally {
//                 setCheckingSession(false); // Ensure session check ends
//             }
//         };
    
//         checkSession();
    
//         const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//             if (session?.user) {
//                 fetchApiKey(session.user.id).then(setApiData);
//                 setLoggedIn(true); // User logged in
//             } else {
//                 setApiData(null);
//                 setLoggedIn(false); // User logged out
//             }
//         });
    
//         return () => {
//             authListener.subscription.unsubscribe();
//         };
//     }, []);
    
    
    
    

//     if (checkingSession) {
//         return (
//             <Layout>
//                 <Center p={6}>
//                     <Text>Checking session...</Text>
//                 </Center>
//             </Layout>
//         );
//     }

//     return (
//         <Layout>
//             <Center p={6}>
//                 <Box>
//                     <Center my={6}>
//                         <Box>
//                             {loggedIn ? (
//                                 <Heading as="h2" size="lg" my={6}>
//                                     Welcome Back to TensorPool!
//                                 </Heading>
//                             ) : (
//                                 <>
//                                     <Heading as="h2" size="lg" my={6}>
//                                         Welcome to TensorPool
//                                     </Heading>
//                                     <Text>Sign up or log in to get started</Text>
//                                 </>
//                             )}
//                         </Box>
//                     </Center>

//                     {/* <Center my={6}>
//                         <Box>
//                             <Heading as="h2" size="lg" my={6}>
//                                 Welcome to TensorPool
//                             </Heading>
//                             <Text>Sign up or log in to get started</Text>
//                         </Box>
//                     </Center> */}
//                     <Center>
//                         {loggedIn ? (
//                             <Box>
//                                 <Heading as="h3" size="md">
//                                     Successfully logged in!
//                                 </Heading>
//                                 {apiData && (
//                                     <Box mt={4}>
//                                         <Text><strong>API Key:</strong> {apiData.api_key}</Text>
//                                     </Box>
//                                 )}
//                                 <Center mt={6}>
//                                     <Button colorScheme="red" onClick={handleLogout}>
//                                         Log Out
//                                     </Button>
//                                 </Center>
//                             </Box>
//                         ) : (
//                             <Box>
//                                 <Center m={3}>
//                                     <Button
//                                         bg="rpmblue"
//                                         px={4}
//                                         onClick={handleGoogleLogin}
//                                         isLoading={loading}
//                                     >
//                                         Continue with Google
//                                     </Button>
//                                 </Center>
//                                 {/* <Center m={3}>
//                                     <Input
//                                         type="email"
//                                         placeholder="Enter your email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                     <Button
//                                         bg="rpmblue"
//                                         px={4}
//                                         onClick={handleEmailSubmit}
//                                         isLoading={loading}
//                                     >
//                                         Send Email Verification
//                                     </Button>
//                                 </Center> */}
//                             </Box>
//                         )}
//                     </Center>
//                 </Box>
//             </Center>
//         </Layout>
//     );
// };

// export default Login;



'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Box,
  Center,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react'
import Layout from '../components/layout.js'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jxzbchdihjvupnnusedd.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [checkingSession, setCheckingSession] = useState(true)
    const router = useRouter()
    const toast = useToast()
  
    useEffect(() => {
      const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.push('/dashboard')
        }
        setCheckingSession(false)
      }
  
      checkSession()
    }, [router])
  
    const handleGoogleLogin = async () => {
      setLoading(true)
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/dashboard`,
          },
        })
  
        if (error) {
          throw error
        }
      } catch (error) {
        console.error('Google login error:', error)
        toast({
          title: 'Error logging in with Google',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setLoading(false)
      }
    }
  
    if (checkingSession) {
      return (
        <Layout>
          <Center p={6}>
            <Text>Checking session...</Text>
          </Center>
        </Layout>
      )
    }
  
    return (
      <Layout>
        <Center p={6}>
          <Box>
            <Heading as="h2" size="lg" my={6}>
              Welcome to TensorPool
            </Heading>
            <Text mb={6}>Sign up or log in to get started</Text>
            <Button
              bg="rpmblue"
              px={4}
              onClick={handleGoogleLogin}
              isLoading={loading}
            >
              Continue with Google
            </Button>
          </Box>
        </Center>
      </Layout>
    )
  }
  
  export default Login