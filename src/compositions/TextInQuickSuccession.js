import React, { useState } from 'react';

import useInterval from '../hooks/useInterval';

import TextFromFont from './TextFromFont';

export default function Text({
	texts,
	interval = 50,
	...textFromFontProps
}) {
	const [index, setIndex] = useState(0);

	useInterval(() => setIndex((index + 1) % texts.length), interval);

	return <TextFromFont {...textFromFontProps} text={texts[index]} />;
}
