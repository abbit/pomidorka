import { h, ComponentChildren } from 'preact';
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
	align-items: center;
`;

const Main = styled('div')`
	flex: 1;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
`;

export function Layout({ children }: LayoutProps) {
	return (
		<Container>
			<Header />
			<Main>{children}</Main>
		</Container>
	);
}
