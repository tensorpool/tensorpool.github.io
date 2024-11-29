import React, { useState } from 'react';
import {
    Button,
    Box,
    Flex,
    Spacer,
    InputGroup,
    Input,
    InputLeftAddon,
    Center,
    Heading,
    Text,
    useToast,
} from '@chakra-ui/react';
import Layout from '../components/layout.js';
import { formatPhoneNumber, isValidPhoneNumber } from '../lib/phoneUtils.js';

const login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [show, setShow] = useState(false); // Indicates whether to show OTP input or phone # input.
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const handlePhoneNumberSubmit = () => {
        setLoading(true);

        if (!isValidPhoneNumber(phoneNumber)) {
            toast({
                title: 'Invalid phone number. Please try again.',
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }

        // Simulate OTP sending logic here, if needed.
        toast({
            title: 'Verification code sent to ' + phoneNumber,
            status: 'success',
            duration: 6000,
            isClosable: true,
        });
        setShow(true);
        setLoading(false);
    };

    const handleOtpSubmit = () => {
        setLoading(true);

        if (otp.length !== 6) {
            toast({
                title: 'Invalid login code.',
                description: 'Please check your code and try again.',
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }

        // Simulate OTP validation logic here, if needed.
        toast({
            title: 'Successfully logged in!',
            status: 'success',
            duration: 6000,
            isClosable: true,
        });
        setLoading(false);
    };

    return (
        <Layout>
            <Center p={6}>
                <Box>
                    <Center my={6}>
                        <Box>
                            <Heading as='h2' size='lg' my={6}>
                                Ready to split an Uber?
                            </Heading>
                            <Heading as='h2'>Get moving with Ridepool</Heading>
                            <Text>
                                Enter the same number you use for your Uber and Lyft accounts
                            </Text>
                        </Box>
                    </Center>
                    <Flex>
                        <Spacer />
                        <Center>
                            {!show ? (
                                <Box>
                                    <Center m={3}>
                                        <InputGroup>
                                            <InputLeftAddon bg='transparent' children='+1' />
                                            <Input
                                                type='tel'
                                                placeholder='Phone Number'
                                                value={phoneNumber}
                                                onChange={e => setPhoneNumber(formatPhoneNumber(e.target.value))}
                                            />
                                        </InputGroup>
                                    </Center>
                                    <Center m={3}>
                                        <Button
                                            bg='rpmblue'
                                            px={4}
                                            onClick={handlePhoneNumberSubmit}
                                            isLoading={loading}
                                        >
                                            Join The Pool!
                                        </Button>
                                    </Center>
                                </Box>
                            ) : (
                                <Box>
                                    <Heading my={3}>Enter the code sent to {phoneNumber}</Heading>
                                    <Center>
                                        <Input
                                            placeholder='6 digit code'
                                            maxLength={6}
                                            value={otp}
                                            onChange={e => setOtp(e.target.value)}
                                        />
                                    </Center>
                                    <Center m={3}>
                                        <Button
                                            bg='rpmblue'
                                            px={4}
                                            onClick={handleOtpSubmit}
                                            isLoading={loading}
                                        >
                                            Verify
                                        </Button>
                                    </Center>
                                </Box>
                            )}
                        </Center>
                        <Spacer />
                    </Flex>
                </Box>
            </Center>
        </Layout>
    );
};

export default login;
