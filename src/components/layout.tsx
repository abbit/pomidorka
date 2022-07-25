import { styled } from 'goober';
import { FunctionalComponent } from 'preact';

import { Content } from './content';
import { Header } from './header';

const Container = styled('div')`
	width: 100vw;
	height: 100vh;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

export const Layout: FunctionalComponent = () => {
	return (
		<Container>
			<Header />
			<Content />
		</Container>
	);
};
