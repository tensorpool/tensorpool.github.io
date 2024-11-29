import React, { useState, useEffect } from 'react';
import {
    Button,
    Box,
    Flex,
    Spacer,
    InputGroup,
    Center,
    Heading,
    Text,
    Link,
    Badge,
    CloseButton,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Layout from '../../components/layout.js';
import { formatPhoneNumber } from '../../lib/phoneUtils.js';

const Rides = () => {
    const [user, setUser] = useState(null); // Mock user state
    const [rides, setRides] = useState([]);
    const [fetchComplete, setFetchComplete] = useState(false);
    const [cancelUid, setCancelUid] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const router = useRouter();

    // Mock fetching rides (replace with API call if needed)
    const fetchRides = async () => {
        // Simulated rides data
        const mockRides = [
            {
                id: '1',
                phone: '+11234567890',
                email: 'user@example.com',
                pickup: 'Location A',
                dropoff: 'Location B',
                distance: 5,
                time1: moment().add(1, 'hours').toISOString(),
                time2: moment().add(2, 'hours').toISOString(),
                matched: false,
                canceled: false,
                stale: false,
            },
            {
                id: '2',
                phone: '+11234567890',
                email: 'user@example.com',
                pickup: 'Location C',
                dropoff: 'Location D',
                distance: 10,
                time1: moment().add(3, 'hours').toISOString(),
                time2: moment().add(4, 'hours').toISOString(),
                matched: true,
                canceled: false,
                stale: false,
                matchedRiderPhone: '+19876543210',
                matchedRiderEmail: 'matched@example.com',
            },
        ];
        setRides(mockRides);
    };

    const logOut = () => {
        // Simulate logout
        setUser(null);
        router.push('/');
    };

    // If not logged in, redirect to login page.
    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else if (!fetchComplete) {
            fetchRides();
            setFetchComplete(true);
        }
    }, [user, fetchComplete]);

    // Cancel ride request logic (replace with API call if needed)
    const cancelRide = (rideId) => {
        setRides((prevRides) =>
            prevRides.map((ride) =>
                ride.id === rideId ? { ...ride, canceled: true } : ride
            )
        );
        onClose();
    };

    return (
        <Layout>
            <Center>
                <Box>
                    <Text textAlign="center">
                        Your phone number:{' '}
                        {user ? formatPhoneNumber('+11234567890'.slice(2)) : null}
                    </Text>
                    <Heading as="h2" size="lg" my={6} textAlign="center">
                        Your Ridepool Requests
                    </Heading>
                </Box>
            </Center>
            <Center width={['100%', '60%']} mx="auto">
                {rides && rides.length > 0 ? (
                    <Box>
                        <Accordion allowMultiple defaultIndex={[0]}>
                            {rides.map((r) => (
                                <AccordionItem key={r.id}>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left" fontSize="lg">
                                            <Badge
                                                m={3}
                                                variant="solid"
                                                colorScheme={
                                                    r.matched
                                                        ? 'green'
                                                        : r.canceled
                                                        ? 'red'
                                                        : r.stale
                                                        ? 'gray'
                                                        : 'purple'
                                                }
                                            >
                                                {r.matched
                                                    ? 'MATCHED'
                                                    : r.canceled
                                                    ? 'Canceled'
                                                    : r.stale
                                                    ? 'Unmatched'
                                                    : 'Searching for pooler...'}
                                            </Badge>
                                            To {r.dropoff} on {moment(r.time1).format('L')}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>

                                    <AccordionPanel pb={4}>
                                        <Text fontSize="lg">
                                            Pickup: {r.pickup}
                                            <Text>Destination: {r.dropoff}</Text>
                                            <Text>
                                                Maximum distance to co-pooler: {r.distance} miles
                                            </Text>
                                            <Text>
                                                Earliest ride time: {moment(r.time1).format('LLL')}
                                            </Text>
                                            <Text>
                                                Latest ride time: {moment(r.time2).format('LLL')}
                                            </Text>
                                            <Text>Your phone: {r.phone}</Text>
                                            Your email: {r.email}
                                        </Text>
                                        {r.matched && (
                                            <Box bg="teal" p={3} my={3}>
                                                You've matched with someone, congrats! Your pooler's
                                                information:
                                                <Text>Phone: {r.matchedRiderPhone}</Text>
                                                <Text>Email: {r.matchedRiderEmail}</Text>
                                                Reach out to your pooler ASAP to coordinate pickup
                                                location, ride time, and who will be calling the Uber.
                                            </Box>
                                        )}
                                        {!r.matched && !r.canceled && !r.stale && (
                                            <Flex
                                                fontSize="sm"
                                                color="grey"
                                                onClick={() => {
                                                    onOpen();
                                                    setCancelUid(r.id);
                                                }}
                                            >
                                                <Center>Cancel Ridepool request</Center>{' '}
                                                <CloseButton size="sm" />
                                            </Flex>
                                        )}

                                        <AlertDialog
                                            isOpen={isOpen}
                                            leastDestructiveRef={cancelRef}
                                            onClose={onClose}
                                        >
                                            <AlertDialogOverlay>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                                        Cancel Ridepool request
                                                    </AlertDialogHeader>

                                                    <AlertDialogBody>
                                                        Are you sure? You can't undo this action
                                                        afterwards. You can always submit a new Ridepool
                                                        request.
                                                    </AlertDialogBody>

                                                    <AlertDialogFooter>
                                                        <Button ref={cancelRef} onClick={onClose}>
                                                            Back
                                                        </Button>
                                                        <Button
                                                            colorScheme="red"
                                                            onClick={() => cancelRide(cancelUid)}
                                                            ml={3}
                                                        >
                                                            Cancel ride
                                                        </Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialogOverlay>
                                        </AlertDialog>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Box>
                ) : (
                    <Text fontSize="lg">You have no Ridepool requests yet!</Text>
                )}
            </Center>
            <Center my={9} p={3}>
                <Box fontSize="sm">
                    <Center>
                        <Text>
                            If you submitted your pool request <b>over 24 hours in advance</b>,
                            the latest you will be notified if a ridepool has been found for
                            you <b>an hour before</b> your earliest ride time.
                        </Text>
                    </Center>
                    <Center>
                        <Text>
                            Otherwise, you will be notified if a ridepool has been found for
                            you <b>30 minutes before</b> your latest ride time at the latest.
                        </Text>
                    </Center>
                    <Center>
                        <Link href="/pool/schedule">
                            <Button bg="rpmblue" m={3} p={6}>
                                Schedule Ridepool
                            </Button>
                        </Link>
                    </Center>
                </Box>
            </Center>
        </Layout>
    );
};

export default Rides;
