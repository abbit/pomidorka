import { h } from 'preact';
import { styled } from 'goober';

const HeaderContainer = styled('header')`
	height: 50px;
	width: 100%;
	padding: 32px 0;
	background: var(--primary-color);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled('h1')`
	color: #fff;
`;

export function Header() {
	return (
		<HeaderContainer>
			<Title>Pomidor</Title>
		</HeaderContainer>
	);
}
