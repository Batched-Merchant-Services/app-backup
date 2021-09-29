import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from '@components';
import styles from './styles';

const renderLine = (index, step) => {
	const isFill = index < step - 1;
	return <View width-9 height-1 style={isFill ? styles.line : {}} />;
};

const renderCircles = (totalSteps, step) => {
	let circles = [];

	for (let index = 1; index < totalSteps; index++) {
		circles.push(
			<View row centerV key={index}>
				<View width-10 height-10 centerH centerV
					style={index === step ? styles.circle : styles.circleDisable}
				>
				</View>
				{index < totalSteps ? renderLine(index, step) : null}
			</View>
		);
	}

	return circles;
}
 
const StepIndicator = ({ step, totalSteps }) => {
	return (
		<View row height-10 centerV>
			{renderCircles(totalSteps, step)}
		</View>
	);
};

StepIndicator.propTypes = {
  step: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default StepIndicator;
