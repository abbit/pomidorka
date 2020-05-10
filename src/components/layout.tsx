import { h, ComponentChildren, FunctionalComponent } from 'preact';
import { styled } from 'goober';
import { Header } from './header';

interface LayoutProps {
	children: ComponentChildren;
}

const Container = styled('div')`
	width: 100vw;
	height: 100vh;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const Main = styled('div')`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: flex-start;
`;

export const Layout: FunctionalComponent<LayoutProps> = ({ children }) => {
	return (
		<Container>
			<Header />
			<Main>{children}</Main>
		</Container>
	);
};
