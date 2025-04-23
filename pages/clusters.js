import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Heading,
  Text,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Layout from "../components/layout";
import SidePanel from "../components/SidePanel";

const API_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/https://engine.tensorpool.dev";

export default function Cluster() {
  const [apiKey, setApiKey] = useState("");
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState({});
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey) {
      fetchClusters();
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter your API key",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchClusters = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_ENDPOINT}/cluster/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: apiKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          setError(data.message || "No clusters found");
          setClusters([]);
        } else {
          throw new Error(data.message || "Failed to fetch clusters");
        }
      } else {
        // Parse the tabular data from the message
        // This is a simplistic parser assuming the format is Markdown tables
        const tableLines = data.message.split("\n");
        if (tableLines.length > 3) {
          const headers = tableLines[0]
            .trim()
            .split("|")
            .map((h) => h.trim())
            .filter((h) => h);

          const parsedClusters = [];
          for (let i = 2; i < tableLines.length; i++) {
            if (tableLines[i].trim() === "") continue;

            const values = tableLines[i]
              .trim()
              .split("|")
              .map((v) => v.trim())
              .filter((v) => v);
            if (values.length === headers.length) {
              const clusterObj = {};
              headers.forEach((header, index) => {
                clusterObj[header] = values[index];
              });
              parsedClusters.push(clusterObj);
            }
          }

          setClusters(parsedClusters);
        } else {
          setClusters([]);
        }
      }
    } catch (error) {
      console.error("Error fetching clusters:", error);
      setError(error.message);
      toast({
        title: "Error fetching clusters",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const changeClusterStatus = async (clusterIp, newStatus) => {
    setLoadingAction((prev) => ({ ...prev, [clusterIp]: true }));
    try {
      const response = await fetch(`${API_ENDPOINT}/cluster/change-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: apiKey,
          ip: clusterIp,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Failed to change cluster ${clusterIp} status`
        );
      }

      toast({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Update local state or refetch
      fetchClusters();
    } catch (error) {
      console.error("Error changing cluster status:", error);
      toast({
        title: "Error changing cluster status",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoadingAction((prev) => ({ ...prev, [clusterIp]: false }));
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "gray";

    status = status.toLowerCase();
    if (status.includes("running") || status.includes("on")) return "green";
    if (status.includes("off") || status.includes("stopped")) return "red";
    if (status.includes("starting")) return "yellow";
    return "gray";
  };

  return (
    <Layout>
      <SidePanel />
      <Box ml="220px" minH="100vh" display="flex" flexDirection="column" p={6}>
        <Heading as="h1" size="xl" mb={6}>
          Manage Clusters
        </Heading>

        <Box mb={6} p={4} borderWidth="1px" borderRadius="lg">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="apiKey">API Key</FormLabel>
              <Flex>
                <Input
                  id="apiKey"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  mr={3}
                />
                <Button colorScheme="blue" type="submit" isLoading={loading}>
                  Fetch Clusters
                </Button>
              </Flex>
            </FormControl>
          </form>
        </Box>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="40vh">
            <Spinner size="xl" />
          </Flex>
        ) : error ? (
          <Alert status="info" mb={6} borderRadius="md">
            <AlertIcon />
            <AlertTitle>Information:</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : clusters.length > 0 ? (
          <>
            <Text mb={4}>
              Below are your available clusters. You can turn them on or off as
              needed.
            </Text>

            <Table variant="simple" mb={6}>
              <Thead>
                <Tr>
                  {Object.keys(clusters[0]).map((header) => (
                    <Th key={header}>{header}</Th>
                  ))}
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {clusters.map((cluster, index) => (
                  <Tr key={index}>
                    {Object.entries(cluster).map(([key, value]) => (
                      <Td key={key}>
                        {key.toLowerCase() === "status" ? (
                          <Badge colorScheme={getStatusColor(value)}>
                            {value}
                          </Badge>
                        ) : (
                          value
                        )}
                      </Td>
                    ))}
                    <Td>
                      <Flex gap={2}>
                        <Button
                          colorScheme="green"
                          size="sm"
                          isLoading={loadingAction[cluster.IP]}
                          isDisabled={
                            cluster.Status?.toLowerCase().includes("running") ||
                            cluster.Status?.toLowerCase().includes(
                              "starting"
                            ) ||
                            loadingAction[cluster.IP]
                          }
                          onClick={() => changeClusterStatus(cluster.IP, "ON")}
                        >
                          Turn On
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          isLoading={loadingAction[cluster.IP]}
                          isDisabled={
                            cluster.Status?.toLowerCase().includes("off") ||
                            cluster.Status?.toLowerCase().includes("stopped") ||
                            loadingAction[cluster.IP]
                          }
                          onClick={() => changeClusterStatus(cluster.IP, "OFF")}
                        >
                          Turn Off
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Button colorScheme="blue" onClick={fetchClusters} mb={4}>
              Refresh Clusters
            </Button>
          </>
        ) : apiKey ? (
          <Box>
            <Text mb={4}>
              No clusters found. Contact team@tensorpool.dev to get started!
            </Text>
            <Button colorScheme="blue" onClick={fetchClusters}>
              Refresh
            </Button>
          </Box>
        ) : (
          <Box>
            <Text>Please enter your API key to view your clusters.</Text>
          </Box>
        )}
      </Box>
    </Layout>
  );
}
