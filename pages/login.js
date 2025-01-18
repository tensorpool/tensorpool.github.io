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
            <Box
            minH="100vh" 
            display="flex"
            flexDirection="column"
            >
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