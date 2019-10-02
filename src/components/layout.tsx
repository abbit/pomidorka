import { h, RenderableProps } from 'preact';
import { Header } from './header';

export function Layout(props: RenderableProps<void>) {
	return (
		<div id="app">
			<Header />
			<main id="content">{props.children}</main>
		</div>
	);
}
