import { styled } from 'goober';
import { FunctionalComponent } from 'preact';

import { SettingsButton } from './settingsButton';

const HeaderContainer = styled('header')`
	width: 100%;
	height: 10vh;
	padding: 16px 64px;
	background: var(--primary-color);
	display: flex;
	align-items: center;

	@media screen and (max-width: 700px) {
		padding: 16px 32px;
	}

	@media screen and (max-width: 450px) {
		padding: 16px;
	}
`;

const HeaderGrid = styled('div')`
	display: grid;
	width: 100%;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr;
	align-items: center;
`;

const Align = styled('div')`
	display: flex;
	align-items: center;
`;

const AlignLeft = styled(Align)`
	justify-self: start;
`;

const AlignRight = styled(Align)`
	justify-self: end;
`;

const Title = styled('h1')`
	justify-self: center;
	color: #fff;

	@media screen and (max-width: 450px) {
		font-size: 1.8em;
	}
`;

export const Header: FunctionalComponent = () => {
	return (
		<HeaderContainer>
			<HeaderGrid>
				<AlignLeft />
				<Title>Pomidorka</Title>
				<AlignRight>
					<SettingsButton />
				</AlignRight>
			</HeaderGrid>
		</HeaderContainer>
	);
};
