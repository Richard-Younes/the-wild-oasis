/** @format */

import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
	font-size: 30px;
	font-weight: 600;
`;

const StyledApp = styled.main`
	background-color: orangered;
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<p>Hiehfihiub eubi qwbwbq iubqw i</p>
				<H1>Hello world</H1>
				<Button onClick={() => alert('Check in')}>Check in</Button>
				<Input type='number' placeholder='Number of guests' />
			</StyledApp>
		</>
	);
}

export default App;
