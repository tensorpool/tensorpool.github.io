// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createClient } from '@supabase/supabase-js';
// import {
//   Box,
//   Heading,
//   Text,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Link,
//   Button
// } from '@chakra-ui/react';
// import Layout from '../components/layout.js';
// import SidePanel from '../components/SidePanel';
// import Script from 'next/script';

// const supabaseUrl = 'https://jxzbchdihjvupnnusedd.supabase.co';
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Function to map job status to display status
// const getDisplayStatus = (status) => {
//   const provisioningStates = ['PROVISIONING', 'LAUNCHED', 'SUBMITTED', 'PENDING'];

//   if (provisioningStates.includes(status)) {
//     return 'PROVISIONING';
//   }

//   if (status === 'SUCCEEDED') {
//     return 'COMPLETED';
//   }

//   if (status?.startsWith('FAILED')) {
//     return 'FAILED';
//   }

//   return status;
// };

// export default function Dashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const checkSession = async () => {
//       const {
//         data: { session }
//       } = await supabase.auth.getSession();
//       if (!session) {
//         router.push('/login');
//       } else {
//         fetchJobs(session.user.id);
//       }
//     };

//     checkSession();
//   }, [router]);

//   useEffect(() => {
//     const {
//       data: { subscription }
//     } = supabase.auth.onAuthStateChange((event, session) => {
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

//   // Handler to cancel a job
//   const handleCancel = async (jobId) => {
//     const confirmCancel = window.confirm(
//       'Are you sure you want to cancel this job?'
//     );
//     if (!confirmCancel) return;

//     try {
//       const { error } = await supabase
//         .from('Jobs')
//         .update({ cancel: true })
//         .eq('id', jobId);

//       if (error) {
//         console.error('Error cancelling job:', error);
//         alert('There was an error cancelling the job. Please try again.');
//         return;
//       }

//       // Update the local jobs state
//       setJobs((prevJobs) =>
//         prevJobs.map((job) =>
//           job.id === jobId ? { ...job, cancel: true } : job
//         )
//       );
//     } catch (err) {
//       console.error('Error in handleCancel:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <Box
//           ml={isCollapsed ? '0' : '220px'}
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
//       <Script
//         src="https://www.googletagmanager.com/gtag/js?id=G-33SGJV6BR1"
//         strategy="afterInteractive"
//       />
//       <Script id="google-analytics" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', 'G-33SGJV6BR1');
//         `}
//       </Script>
//       <SidePanel isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       <Box
//         ml={isCollapsed ? '0' : '220px'}
//         height="100vh"
//         display="flex"
//         flexDirection="column"
//         transition="margin-left 0.3s ease"
//         pl={10}
//       >
//         <Heading as="h1" size="xl" mb={6}>
//           Dashboard
//         </Heading>
//         <Box overflowX="auto" width="100%">
//           <Table variant="simple" minWidth="800px">
//             <Thead>
//               <Tr>
//                 <Th color="white" fontSize="lg">
//                   Job ID
//                 </Th>
//                 <Th color="white" fontSize="lg">
//                   Status
//                 </Th>
//                 <Th color="white" fontSize="lg">
//                   Date Created
//                 </Th>
//                 <Th color="white" fontSize="lg">
//                   stdout Link
//                 </Th>
//                 <Th color="white" fontSize="lg">
//                   Output Link
//                 </Th>
//                 <Th color="white" fontSize="lg">
//                   Savings
//                 </Th>
//                 <Th color="white" fontSize="lg">
//                   Cancel
//                 </Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {jobs.map((job) => (
//                 <Tr key={job.id}>
//                   <Td>{job.id}</Td>
//                   <Td>{getDisplayStatus(job.status)}</Td>
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
//                     ) : (
//                       <Text color="gray.500">N/A</Text>
//                     )}
//                   </Td>
//                   <Td>
//                     {job.is_notified ? (
//                       <Link href={job.output_link} isExternal color="blue.500">
//                         View Output
//                       </Link>
//                     ) : (
//                       <Text color="gray.500">N/A</Text>
//                     )}
//                   </Td>
//                   <Td>
//                     {job.on_demand_price && job.user_cost ? (
//                       `$${(job.on_demand_price - job.user_cost).toFixed(2)}`
//                     ) : (
//                       <Text color="gray.500">N/A</Text>
//                     )}
//                   </Td>
//                   <Td>
//                     {/*
//                       Only display the cancel button if:
//                       - The job is not yet cancelled (optional check if a cancelled flag exists)
//                       - The status is not SUCCEEDED and does not start with FAILED
//                     */}
//                     {/* {!job.cancel &&
//                     job.status !== 'SUCCEEDED' &&
//                     !job.status?.startsWith('FAILED') ? ( */}
//                     {!job.cancel &&
//                     ['SUBMITTED', 'PENDING', 'STARTING', 'RUNNING'].includes(job.status) ? (
//                       <Button
//                         colorScheme="red"
//                         onClick={() => handleCancel(job.id)}
//                       >
//                         Cancel
//                       </Button>
//                     ) : job.cancel ? (
//                       <Text color="gray.500">Cancelled</Text>
//                     ) : (
//                       <Text color="gray.500">N/A</Text>
//                     )}
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
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Button
} from '@chakra-ui/react';
import Layout from '../components/layout.js';
import SidePanel from '../components/SidePanel';
import Script from 'next/script';

const supabaseUrl = 'https://jxzbchdihjvupnnusedd.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        fetchJobs(session.user.id);
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
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

  const handleCancel = async (jobId) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this job?'
    );
    if (!confirmCancel) return;

    try {
      const { error } = await supabase
        .from('Jobs')
        .update({ cancel: true })
        .eq('id', jobId);

      if (error) {
        console.error('Error cancelling job:', error);
        alert('There was an error cancelling the job. Please try again.');
        return;
      }

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, cancel: true } : job
        )
      );
    } catch (err) {
      console.error('Error in handleCancel:', err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box
          ml={isCollapsed ? '0' : '220px'}
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-33SGJV6BR1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-33SGJV6BR1');
        `}
      </Script>
      <SidePanel isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Box
        ml={isCollapsed ? '0' : '220px'}
        height="100vh"
        display="flex"
        flexDirection="column"
        transition="margin-left 0.3s ease"
        pl={10}
      >
        <Heading as="h1" size="xl" mb={6}>
          Dashboard
        </Heading>
        <Box overflowX="auto" width="100%">
          <Table variant="simple" minWidth="800px">
            <Thead>
              <Tr>
                <Th color="white" fontSize="lg">
                  Job ID
                </Th>
                <Th color="white" fontSize="lg">
                  Status
                </Th>
                <Th color="white" fontSize="lg">
                  Date Created
                </Th>
                <Th color="white" fontSize="lg">
                  stdout Link
                </Th>
                <Th color="white" fontSize="lg">
                  Output Link
                </Th>
                <Th color="white" fontSize="lg">
                  Savings
                </Th>
                <Th color="white" fontSize="lg">
                  Cancel
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobs.map((job) => (
                <Tr key={job.id}>
                  <Td>{job.id}</Td>
                  <Td>{job.external_status || 'N/A'}</Td>
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
                    ) : (
                      <Text color="gray.500">N/A</Text>
                    )}
                  </Td>
                  <Td>
                    {job.is_notified ? (
                      <Link href={job.output_link} isExternal color="blue.500">
                        View Output
                      </Link>
                    ) : (
                      <Text color="gray.500">N/A</Text>
                    )}
                  </Td>
                  <Td>
                    {job.on_demand_price && job.user_cost ? (
                      `$${(job.on_demand_price - job.user_cost).toFixed(2)}`
                    ) : (
                      <Text color="gray.500">N/A</Text>
                    )}
                  </Td>
                  <Td>
                    {!job.cancel &&
                    ['SUBMITTED', 'PENDING', 'STARTING', 'RUNNING'].includes(job.status) ? (
                      <Button
                        colorScheme="red"
                        onClick={() => handleCancel(job.id)}
                      >
                        Cancel
                      </Button>
                    ) : job.cancel ? (
                      <Text color="gray.500">Cancelled</Text>
                    ) : (
                      <Text color="gray.500">N/A</Text>
                    )}
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