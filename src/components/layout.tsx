import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';
import { Header } from './header';
import { Content } from './content';

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
