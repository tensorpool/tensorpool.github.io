import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
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
  Button,
} from "@chakra-ui/react";
import Layout from "../components/layout.js";
import SidePanel from "../components/SidePanel";
import Script from "next/script";

const supabaseUrl = "https://api.tensorpool.dev";
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
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
      } else {
        fetchJobs(session.user.id);
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        window.location.href = "/";
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const fetchJobs = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("Jobs")
        .select(
          "id, external_status, received, stdout_link, received, is_notified, created_at, status, cancel, created_at"
        )
        .not("external_status", "is", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (jobId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this job?"
    );
    if (!confirmCancel) return;

    try {
      const { error } = await supabase
        .from("Jobs")
        .update({ cancel: true })
        .eq("id", jobId);

      if (error) {
        console.error("Error cancelling job:", error);
        alert("There was an error cancelling the job. Please try again.");
        return;
      }

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, cancel: true } : job
        )
      );
    } catch (err) {
      console.error("Error in handleCancel:", err);
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
        ml={isCollapsed ? "0" : "220px"}
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
                  stdout
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
                  <Td>{job.external_status || "N/A"}</Td>
                  <Td>
                    {new Date(job.received).toLocaleString(undefined, {
                      timeZone:
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                      dateStyle: "medium",
                      timeStyle: "medium",
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
                    {!job.cancel &&
                    ["SUBMITTED", "PENDING", "STARTING", "RUNNING"].includes(
                      job.status
                    ) ? (
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
