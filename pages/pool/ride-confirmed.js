import React from 'react';
import {
    Button,
    Box,
    Flex,
    Center,
    Heading,
    Text,
    Link,
    Icon,
} from '@chakra-ui/react';
import { IoCarOutline } from 'react-icons/io5';
import Layout from '../../components/layout.js';

const Confirmed = () => {
    return (
        <Layout>
            {/* Confirmation Message */}
            <Center m='4'>
                <Heading as='h2' size='lg' my={4} width={['85%', '50%']} textAlign='center'>
                    Congrats! Your ride has been confirmed!
                </Heading>
            </Center>

            {/* Next Steps Header */}
            <Center m='4'>
                <Heading as='h2' size='lg' my={4} width={['85%', '50%']} textAlign='center'>
                    Next Steps
                </Heading>
            </Center>

            {/* Next Steps Instructions */}
            <Center>
                <Heading size='m' my={2} width={['85%', '50%']}>
                    1) You should have received a text with your co-pooler's phone number. Contact your co-pooler and agree on a meetup location.
                </Heading>
            </Center>
            <Center>
                <Heading size='m' my={2} width={['85%', '50%']}>
                    2) Meet up with your pooler at the agreed-upon time and place.
                </Heading>
            </Center>
            <Center>
                <Heading size='m' my={2} width={['85%', '50%']}>
                    3) Decide who orders the ride. One person will order the ride, and the fare will be split between the riders.
                </Heading>
            </Center>
            <Center>
                <Heading size='m' my={2} width={['85%', '50%']}>
                    4) Order the ride (
                    <Link href='/faqs'>
                        <Text as='u' ml={1} fontSize='md'>
                            see how
                        </Text>
                    </Link>
                    ).
                </Heading>
            </Center>
            <Center>
                <Heading size='m' my={2} width={['85%', '50%']}>
                    5) Split the fare (
                    <Link href='/faqs'>
                        <Text as='u' ml={1} fontSize='md'>
                            see how
                        </Text>
                    </Link>
                    ).
                </Heading>
            </Center>
            <Center>
                <Heading size='m' my={2} width={['85%', '50%']}>
                    6) Add an extra stop if needed (
                    <Link href='/faqs'>
                        <Text as='u' ml={1} fontSize='md'>
                            see how
                        </Text>
                    </Link>
                    ).
                </Heading>
            </Center>

            {/* Final Message */}
            <Center>
                <Heading size='m' my={2} width={['85%', '50%']}>
                    <Flex flexDirection='row' alignItems='center'>
                        Enjoy the Ridepool! <Icon as={IoCarOutline} mx='1' height='23' />
                        <svg
                            width='24.25'
                            height='23'
                            viewBox='0 0 97 35'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M84.1411 10.0703C77.9744 7.23696 66.2 5.5 65 19.5C63.8 33.5 83.7822 36 96.5 32.5'
                                stroke='white'
                                strokeWidth='4'
                            />
                            <path
                                d='M1 34C9.33333 34.8333 27.6 33.8704 38 21.0704C51 5.07038 53.5 1.97934 63.5 1.07029C74.5 0.0703293 84 10.0703 84 10.0703'
                                stroke='white'
                                strokeWidth='4'
                            />
                        </svg>
                    </Flex>
                </Heading>
            </Center>
        </Layout>
    );
};

export default Confirmed;
