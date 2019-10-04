import { h, RenderableProps } from 'preact';
import { Header } from './header';

export function Layout({ children }: RenderableProps<void>): h.JSX.Element {
	return (
		<div id="app">
			<Header />
			<main id="content">{children}</main>
		</div>
	);
}
