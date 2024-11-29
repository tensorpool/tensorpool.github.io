import {
	Box,
	Text,
	InputGroup,
	Input,
	InputRightAddon,
	Link,
} from '@chakra-ui/react';
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import {Close} from '@styled-icons/evil';

const PlacesAutocomplete = ({placeholder, initValue, stepIndex, setData}) => {
	const {
		ready,
		value,
		suggestions: {status, data},
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			/* Define search scope here */
		},
		debounce: 300,
	});
	const ref = useOnclickOutside(() => {
		// When user clicks outside of the component, we can dismiss
		// the searched suggestions by calling this method
		clearSuggestions();
	});

	const handleInput = e => {
		// Update the keyword of the input element
		setValue(e.target.value);
	};

	const handleSelect
    = ({description}) =>
    	() => {
    		// When user selects a place, we can replace the keyword without request data from API
    		// by setting the second parameter to "false"
    		setValue(description, false);
    		clearSuggestions();

    		// Get latitude and longitude via utility functions
    		getGeocode({address: description}).then(results => {
    			const {lat, lng} = getLatLng(results[0]);
    			// Console.log('📍 Coordinates:', {lat, lng});
    			setData(stepIndex, [results[0].formatted_address, lat + ', ' + lng]);
    		});
    	};

	const renderSuggestions = () =>
		data.map(suggestion => {
			const {
				place_id,
				structured_formatting: {main_text, secondary_text},
			} = suggestion;

			return (
				<Link key={place_id}>
					<Text my={3} onClick={handleSelect(suggestion)}>
						<strong>{main_text}</strong> <small>{secondary_text}</small>
					</Text>
				</Link>
			);
		});

	return (
		<Box ref={ref} width='100%'>
			<script
				src={
					'https://maps.googleapis.com/maps/api/js?key='
          + process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          + '&libraries=places'
				}
			></script>
			<InputGroup>
				<Input
					value={value}
					onChange={handleInput}
					disabled={!ready}
					placeholder={!initValue ? placeholder : initValue}
				/>
				{/* <InputRightAddon bg="transparent" children={<Close size={16}/>} /> */}
			</InputGroup>
			{/* We can use the "status" to decide whether we should display the dropdown or not */}
			{status === 'OK' && <ul>{renderSuggestions()}</ul>}
		</Box>
	);
};

export default PlacesAutocomplete;
