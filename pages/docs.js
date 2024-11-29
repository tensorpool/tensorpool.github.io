import {
	Button,
	Box,
	Flex,
	Spacer,
	InputGroup,
	Input,
	InputLeftElement,
	Center,
	Heading,
	Text,
	Link,
	Icon,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	HStack,
} from '@chakra-ui/react';
import {IoCarOutline} from 'react-icons/io5';
import Layout from '../components/layout.js';

const doc = () => (
	<Layout>
		<Center m='4'>
			<Heading as='h2' size='lg' my={4} width={['85%', '50%']} align='center'>
        TensorPool Documentation
			</Heading>
		</Center>
        {/* TODO: FIGURE OUT HOW TO MAKE THE BOX NOT HUG THE LEFT SO HARD */}
        <Box width={['90%', '100%']} my={9} mx={15}>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Heading as='h3' size='lg' my={4} align='left'>
                                Quick Start
                            </Heading>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <Heading as='h3' size='m' mx={4} my={4} align='left'>
                        This is how you can get started with TensorPool in a few simple steps.
                    </Heading>
                    <Heading as='h3' size='m' mx={8} my={4} align='left'>
                        1) Run "pip install tensorpool" in terminal
                    </Heading>
                    <Heading as='h3' size='m' mx={8} my={4} align='left'>
                        2) Import "tensorpool" at the top of your file
                    </Heading>
                    <Heading as='h3' size='m' mx={8} my={4} align='left'>
                        3) Wrap your model using the command "with TensorPool:"
                    </Heading>
                    <Heading as='h3' size='m' mx={8} my={4} align='left'>
                        4) Once you have your model, simply add ".realize()" to the end to train on TensorPool
                    </Heading>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Heading as='h3' size='lg' my={4} align='left'>
                                Callable Functions
                            </Heading>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <Heading as='h3' size='lg' mx={4} my={4} align='left'>
                        .realize( )
                    </Heading>
                    <Text fontSize='md' mx={8}>
                        This function sends your model to TensorPool for training.
                    </Text>
                    <Text my={3} fontSize='md' mx={8}>
                        Example: model.realize()
                    </Text>
                    <Heading as='h3' size='lg' mx={4} my={4} align='left'>
                        .comp_graph( )
                    </Heading>
                    <Text fontSize='md' mx={8}>
                        This function fetches the computation graph of your model.
                    </Text>
                    <Text my={3} fontSize='md' mx={8}>
                        Example: model.comp_graph()
                    </Text>
                    <Heading as='h3' size='lg' mx={4} my={4} align='left'>
                        .price( )
                    </Heading>
                    <Text fontSize='md' mx={8}>
                        This function fetches the price of your model.
                    </Text>
                    <Text my={3} fontSize='md' mx={8}>
                        Example: model.price()
                    </Text>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                {/*add pictures of examples from VS code here. can be from gdoc*/}
                    <h2>
                        <AccordionButton>
                            <Heading as='h3' size='lg' my={4} align='left'>
                                Examples
                            </Heading>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <Heading as='h3' size='m' mx={8} my={4} align='left'>
                        1) Run "pip install tensorpool" in terminal
                    </Heading>
                    <Heading as='h3' size='m' mx={8} my={4} align='left'>
                        2) Import "tensorpool" at the top of your file
                    </Heading>
                    <Heading as='h3' size='m' mx={8} my={4} align='left'>
                        3) Wrap your model using the command "with TensorPool:"
                    </Heading>
                    <Heading as='h3' size='m' mx={8} my={4} align='left'>
                        4) Once you have your model, simply add ".realize()" to the end to train on TensorPool
                    </Heading>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
	</Layout>
);
export default doc;
