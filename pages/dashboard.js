// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createClient } from '@supabase/supabase-js';
// import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Link } from '@chakra-ui/react';
// import Layout from '../components/layout.js';
// import SidePanel from '../components/SidePanel';

// const supabaseUrl = 'https://jxzbchdihjvupnnusedd.supabase.co';
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default function Dashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const checkSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (!session) {
//         router.push('/login');
//       } else {
//         fetchJobs(session.user.id);
//       }
//     };

//     checkSession();
//   }, [router]);

//   useEffect(() => {
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === 'SIGNED_OUT') {
//         window.location.href = '/join';
//       }
//     });

//     return () => {
//       subscription?.unsubscribe();
//     };
//   }, []);

//   const fetchJobs = async (userId) => {
//     try {
//       const { data, error } = await supabase
//         .from('Jobs')
//         .select('*')
//         .eq('user_id', userId)
//         .order('created_at', { ascending: false });

//       if (error) throw error;
//       setJobs(data);
//     } catch (error) {
//       console.error('Error fetching jobs:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <Box 
//           ml={isCollapsed ? "0" : "220px"}
//           minH="100vh" 
//           display="flex"
//           flexDirection="column"
//           transition="margin-left 0.3s ease"
//           pl={10}
//         >
//           <Text>Loading...</Text>
//         </Box>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <SidePanel isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       <Box 
//         ml={isCollapsed ? "0" : "220px"}
//         minH="49vh" 
//         display="flex"
//         flexDirection="column"
//         transition="margin-left 0.3s ease"
//         pl={10}
//       >
//         <Heading as="h1" size="xl" mb={6}>Dashboard</Heading>
//         <Box overflowX="auto" width="100%">
//           <Table variant="simple" minWidth="800px">
//             <Thead>
//               <Tr>
//                 <Th color='white' fontSize='lg'>Job ID</Th>
//                 <Th color='white' fontSize='lg'>Status</Th>
//                 <Th color='white' fontSize='lg'>Date Created</Th>
//                 <Th color='white' fontSize='lg'>stdout Link</Th>
//                 <Th color='white' fontSize='lg'>Output Link</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {jobs.map((job) => (
//                 <Tr key={job.id}>
//                   <Td>{job.id}</Td>
//                   <Td>{job.status}</Td>
//                   <Td>
//                     {new Date(job.created_at).toLocaleString(undefined, {
//                       timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//                       dateStyle: 'medium',
//                       timeStyle: 'medium'
//                     })}
//                   </Td>
//                   <Td>
//                     {job.is_notified ? (
//                       <Link href={job.stdout_link} isExternal color="blue.500">
//                         View stdout
//                       </Link>
//                     ) : <Text color="gray.500">N/A</Text>}
//                   </Td>
//                   <Td>
//                     {job.is_notified ? (
//                       <Link href={job.output_link} isExternal color="blue.500">
//                         View Output
//                       </Link>
//                     ) : <Text color="gray.500">N/A</Text>}
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </Box>
//       </Box>
//     </Layout>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Link } from '@chakra-ui/react';
import Layout from '../components/layout.js';
import SidePanel from '../components/SidePanel';

const supabaseUrl = 'https://jxzbchdihjvupnnusedd.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to map job status to display status
const getDisplayStatus = (status) => {
  const provisioningStates = ['PROVISIONING', 'LAUNCHED', 'SUBMITTED', 'PENDING'];
  
  if (provisioningStates.includes(status)) {
    return 'PROVISIONING';
  }
  
  if (status === 'SUCCEEDED') {
    return 'COMPLETED';
  }
  
  if (status?.startsWith('FAILED')) {
    return 'FAILED';
  }
  
  return status;
};

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        window.location.href = '/join';
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

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
        minH="49vh" 
        display="flex"
        flexDirection="column"
        transition="margin-left 0.3s ease"
        pl={10}
      >
        <Heading as="h1" size="xl" mb={6}>Dashboard</Heading>
        <Box overflowX="auto" width="100%">
          <Table variant="simple" minWidth="800px">
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
                  <Td>{getDisplayStatus(job.status)}</Td>
                  <Td>
                    {new Date(job.created_at).toLocaleString(undefined, {
                      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                      dateStyle: 'medium',
                      timeStyle: 'medium'
                    })}
                  </Td>
                  <Td>
                    {job.is_notified ? (
                      <Link href={job.stdout_link} isExternal color="blue.500">
                        View stdout
                      </Link>
                    ) : <Text color="gray.500">N/A</Text>}
                  </Td>
                  <Td>
                    {job.is_notified ? (
                      <Link href={job.output_link} isExternal color="blue.500">
                        View Output
                      </Link>
                    ) : <Text color="gray.500">N/A</Text>}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Layout>
  );
}