import React, {useState, useEffect, useRef} from 'react';
import {
	Button,
	Box,
	Flex,
	Spacer,
	InputGroup,
	Input,
	Center,
	Heading,
	Text,
	Link,
	Progress,
	extendTheme,
	NumberInput,
	NumberInputField,
	NumberIncrementStepper,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	NumberInputStepper,
	NumberDecrementStepper,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import {ArrowRight} from 'styled-icons/bootstrap';
import moment from 'moment';
import {useRouter} from 'next/router';
import Layout from '../../components/layout.js';
import PlacesAutocomplete from '../../components/locationAutocomplete.js';
import AdUnit from '../../components/adUnit.js';

// Theme for the progress bar: allows for a white background
const progressTheme = extendTheme({
	components: {
		Progress: {
			baseStyle: {
				filledTrack: {
					bg: 'whitesmoke',
				},
			},
		},
	},
});

const schedule = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [formInput, setFormInput] = useState([[], [], 1]);
	const [secondDatePickerReady, setSecondDatePickerReady] = useState(false);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const [canSubmit, setCanSubmit] = useState(false);
	const cancelRef = React.useRef();

	const router = useRouter();
	const toast = useToast();

	// If not logged in, redirect to login page.
	useEffect(() => {
		// Redirect logic if necessary
	}, []);
	

	const setData = (stepIndex, formValue) => {
		const i = formInput;
		i[stepIndex] = formValue;
		setFormInput(i);
	};

	const validateEmail = email => {
		if (
			/^[\w.%+-]+@stanford\.edu$/.test(
				email,
			)
		) {
			return true;
		}

		return false;
	};

	const steps = [
		{
			name: 'Pickup Location',
			contents: (
				<Box>
					<Center>
						<Box>
							<Heading my={3} align='center'>
                Select pickup location
							</Heading>
							<Text align='center' mt={3} mb={9}>
                This is the address you'd like to be picked up from.
							</Text>
						</Box>
					</Center>
					<Center>
						<Center width={['90%', '50%']}>
							<PlacesAutocomplete
								placeholder='Pickup Address'
								initValue={formInput[0] ? formInput[0][0] : null}
								stepIndex={0}
								setData={setData} // TODO: FIX, SETDATA DOESN'T CHANGE ON KEYSTROKE, ONLY CHANGES WHEN NEW LOCATION IS SELECTED
							/>
						</Center>
					</Center>
				</Box>
			),
		},
		{
			name: 'Dropoff Location',
			contents: (
				<Box>
					<Center>
						<Box>
							<Heading my={3} align='center'>
                Select dropoff location
							</Heading>
							<Text align='center' mt={3} mb={9}>
                This is the address you'd like to be dropped off at.
							</Text>
						</Box>
					</Center>
					<Center>
						<Center width={['90%', '50%']}>
							<PlacesAutocomplete
								placeholder='Dropoff Address'
								initValue={formInput[1] ? formInput[1][0] : null}
								stepIndex={1}
								setData={setData}
							/>
						</Center>
					</Center>
				</Box>
			),
		},
		{
			name: 'Pooler Distance',
			contents: (
				<Box>
					<Center>
						<Box>
							<Heading my={6} align='center'>
                Select distance from co-pooler
							</Heading>
							<Text align='center' mt={3} mb={3}>
                This is the <b>MAXIMUM</b> distance you'd be willing to travel
                to meet up with your co-pooler.
							</Text>
							<Text align='center'>
                The larger the distance, the faster you'll find a pooler!
							</Text>
						</Box>
					</Center>
					<Center>
						<Box>
							<Center my={10}>
								<Flex>
									<NumberInput
										isRequired
										maxWidth={100}
										mr={2}
										step={0.1}
										defaultValue={1}
										min={0.1}
										max={10}
										// Value={formInput[2]}
										onChange={(string_, number_) => {
											setData(2, number_);
										}}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
									<Text m={2}>Miles</Text>
								</Flex>
							</Center>
							{
								// TODO: Fix warning, make it actually show up
								formInput[2] < 1 ? (
									<Text align='center' my={3} color='orange'>
                    Warning: Choosing a distance under 1 mile massively
                    decreases your chances at finding a pooler.
										<Text>
                      It is recommended to have a have a distance of at least 1
                      mile, the greater the better.
										</Text>
									</Text>
								) : null
							}
						</Box>
						{/* TODO: Add visualization here to see distance around pickup location */}
					</Center>
				</Box>
			),
		},
		{
			name: 'Ride Time',
			contents: (
				<Box align='center'>
					<Center>
						<Box>
							<Heading my={6} align='center'>
                When do you want to take your ride?
							</Heading>
							<Text align='center' mt={3} mb={3}>
                Enter two times that you can ride between.{' '}
								<Text>
                  The greater your time flexibility, the more likely you are to
                  match with a pooler!
								</Text>
							</Text>
						</Box>
					</Center>
					<Heading my={4} align='center' fontSize='2xl'>
            Between
					</Heading>
					<Center color='black' width={[
						'100%', '50%',
					]}>
						<Box>
							<Input
								placeholder='Select Date and Time'
								backgroundColor='white'
								type='datetime-local'
								// Value={formInput[3]}
								min={moment().format('YYYY-MM-DDThh:mm')}
								onChange={e => {
									setData(3, e.target.value);
									setSecondDatePickerReady(true);
								}}
							/>
							<Heading color='white' my={6} align='center' fontSize='2xl'>
                And
							</Heading>
							<Input
								isDisabled={!secondDatePickerReady}
								placeholder='Select Date and Time'
								backgroundColor='white'
								type='datetime-local'
								// Value={formInput[4]}
								min={formInput[3]}
								onChange={e => {
									setData(4, e.target.value);
								}}
							/>
							<Text color='grey' fontSize='sm' my={3}>Safari on MacOS does not support this date and time picker. If you are having issues, please use another browser or use your phone.</Text>
						</Box>
					</Center>
				</Box>
			),
		},
		{
			name: 'Email',
			contents: (
				<Box>
					<Center>
						<Box>
							<Heading my={3} align='center'>
                Please enter your Stanford email.
							</Heading>
							<Text align='center' mt={3} mb={9}>
                We use this to notify you once a Ridepool has been found for you. Be sure to check your email!
								<Text><b>Make sure this email is correct, otherwise you can't be notified of your Ridepool.</b></Text>
							</Text>
						</Box>
					</Center>
					<Center mb={6}>
						<Text color='grey'>Outside of the Stanford community and want access to Ridepool? Fill out{' '}<Link target='_blank' href='https://forms.gle/WrCHiXiWXbnsgHMz6'>this form.</Link></Text></Center>
					<Center>
						<Center width={['90%', '50%']}>
							<Input
								isRequired
								placeholder='Email'
								onChange={e => {
									setData(5, e.target.value);
				  if (validateEmail(formInput[5])) {
										setCanSubmit(true);
									}
								}}
							/>
						</Center>
					</Center>
					<Center>
						<Text align='center' mt={3} mb={9} fontSize='sm'>
					Don't worry, we won't spam you ;)
						</Text>
					</Center>
				</Box>
			),
		},
	];

	const readableDateFormat = date =>
		moment(date).format('dddd, MMMM Do YYYY, h:mm a');

	return (
		<Layout>
			<Center>
				<Text mb={3}>
          Step {activeStep + 1} out of {steps.length}
				</Text>
			</Center>
			<Progress
				bg='rpblue'
				theme={progressTheme}
				value={(activeStep / steps.length) * 100}
			/>
			<Center>
				<Box width={['90%', '75%']}>
					{
						// Renders the current step
						steps.map(step =>
							steps[activeStep].name == step.name ? (
								<Box key={step.name} my={6}>
									{step.contents}
									{/* <AdUnit /> */}
								</Box>
							) : null,
						)
					}

					<Center my={10}>
						<Box>
							<Center>
								{/* If last step, show confirmation info and submit button
			TODO: Create confirmation screen */}
								{activeStep == steps.length - 1 ? (
									<Button
				  disabled={!canSubmit}
										onClick={() => {
											if (!formInput[activeStep]) {
												toast({
													title:
                            'Please complete the current step before submitting.',
													status: 'error',
													isClosable: true,
												});
												return;
											}

											onOpen();
										}}
										bg='rpmblue'
									>
                    Submit
									</Button>
								) : (
									<Button
										bg='rpmblue'
										onClick={() => {
											if (
												activeStep === 3
                        && moment(formInput[4]).isSameOrBefore(formInput[3])
											) {
												toast({
													title:
                            'Error. Please choose valid ride times. The second time best be at least 1 hour after the first time.',
													status: 'error',
													isClosable: true,
												});
												return;
											}

											if (
												!formInput[activeStep]
                        || formInput[activeStep] === ['', '']
											) {
												toast({
													title:
                            'Please complete the current step before moving on to the next one.',
													status: 'error',
													isClosable: true,
												});
												return;
											}

											setActiveStep(activeStep + 1);
										}}
										rightIcon={<ArrowRight size={23} />}
									>
                    Select {steps[activeStep + 1].name}
									</Button>
								)}

								{/* Confirmation popup */}
								<AlertDialog
									isOpen={isOpen}
									leastDestructiveRef={cancelRef}
									onClose={onClose}
								>
									<AlertDialogOverlay>
										<AlertDialogContent>
											<AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Please verify your information is correct.
											</AlertDialogHeader>

											<AlertDialogBody>
												<Box>
													<Text>
                            Pickup location:{' '}
														{formInput[0]
															? formInput[0][0]
															: 'ERROR. REFRESH PAGE AND TRY AGAIN'}
														<Text>
                              Dropoff location:{' '}
															{formInput[1]
																? formInput[1][0]
																: 'ERROR. REFRESH PAGE AND TRY AGAIN'}
														</Text>
														<Text>
                              Maximum pooler distance: {formInput[2]} miles
														</Text>
														<Text>
                              Earliest ride time:{' '}
															{readableDateFormat(formInput[3])}
														</Text>
														<Text>
															{' '}
                              Latest ride time:{' '}
															{readableDateFormat(formInput[4])}
														</Text>
                            Email: {formInput[5]}
													</Text>
												</Box>
											</AlertDialogBody>

											<AlertDialogFooter>
												<Button ref={cancelRef} onClick={onClose}>
                          Cancel
												</Button>
												<Button
													colorScheme='blue'
													onClick={() => {
														console.log('Form submitted:', formInput);
														router.push('/pool/submission-confirmed');
													}}
													
													ml={3}
												>
                          Submit
												</Button>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialogOverlay>
								</AlertDialog>
							</Center>

							<Center p={9}>
								{/* If not first step, show back button and name */}
								{activeStep == 0 ? (
									<Link href='/pool'>
										<Text fontSize='s' color='placeholderGrey'>
                      Cancel Ridepool
										</Text>
									</Link>
								) : (
									<Link>
										<Text
											fontSize='s'
											color='placeholderGrey'
											onClick={() => {
												setActiveStep(activeStep - 1);
											}}
										>
                      Back
										</Text>
									</Link>
								)}
							</Center>
						</Box>
					</Center>
				</Box>
			</Center>
		</Layout>
	);
};

export default schedule;
