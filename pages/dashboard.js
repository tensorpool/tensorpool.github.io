'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Box, Heading, Text, Button, useToast, Table, Thead, Tbody, Tr, Th, Td, Link } from '@chakra-ui/react';
import Layout from '../components/layout.js';
import SidePanel from '../components/SidePanel'; // Import SidePanel

const supabaseUrl = 'https://jxzbchdihjvupnnusedd.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        fetchJobs(session.user.id);
      }
    };

    checkSession();
  }, [router]);

  const fetchJobs = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('Jobs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: 'Error fetching jobs',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: 'Error logging out',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <Text>Loading...</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <SidePanel /> {/* Add SidePanel */}
      <Box ml="220px" 
        minH="100vh" 
        display="flex"
        flexDirection="column"
        >
        <Heading as="h1" size="xl" mb={6}>Dashboard</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color='white' fontSize='lg'>Job ID</Th>
              <Th color='white' fontSize='lg'>Status</Th>
              <Th color='white' fontSize='lg'>Date Created</Th>
              <Th color='white' fontSize='lg'>stdout Link</Th>
              <Th color='white' fontSize='lg'>Output Link</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs.map((job) => (
              <Tr key={job.id}>
                <Td>{job.id}</Td>
                <Td>{job.status}</Td>
                <Td>{new Date(job.created_at).toLocaleString()}</Td>
                <Td>
                  <Link href={job.stdout_link} isExternal color="blue.500">
                    View stdout
                  </Link>
                </Td>
                <Td>
                  <Link href={job.output_link} isExternal color="blue.500">
                    View Output
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button colorScheme="red" onClick={handleLogout} mt={6}>Log Out</Button>
      </Box>
    </Layout>
  );
}
