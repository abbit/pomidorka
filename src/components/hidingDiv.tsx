import { h, ComponentChildren } from 'preact';
import { styled } from 'goober';

interface LayoutProps {
	children: ComponentChildren;
	hide: Boolean;
}

const Container = styled<{ hide: boolean }>('div')`
	visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};
`;

export function HidingDiv({ children, hide }: LayoutProps) {
	return <Container hide={hide}>{children}</Container>;
}
