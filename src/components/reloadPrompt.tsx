import { styled } from 'goober';
import { FunctionalComponent } from 'preact';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// eslint-disable-next-line import/no-unresolved
import { useRegisterSW } from 'virtual:pwa-register/preact';

const Container = styled('div')`
	padding: 0;
	margin: 0;
	width: 0;
	height: 0;
`;

const Toast = styled('div')`
	position: fixed;
	right: 0;
	top: 0;
	margin: 16px;
	padding: 12px;
	border: 1px solid #8885;
	border-radius: 4px;
	z-index: 1;
	text-align: left;
	box-shadow: 3px 4px 5px 0 #8885;
	background-color: white;
`;

const ToastMessage = styled('div')`
	margin-bottom: 8px;
`;

const ToastButton = styled('button')`
	border: 1px solid #8885;
	outline: none;
	margin-right: 5px;
	border-radius: 2px;
	padding: 3px 10px;
`;

export const ReloadPrompt: FunctionalComponent = () => {
	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegistered(r) {
			// eslint-disable-next-line prefer-template
			console.log('SW Registered: ' + r);
		},
		onRegisterError(error) {
			console.log('SW registration error', error);
		},
	});

	const close = () => {
		setOfflineReady(false);
		setNeedRefresh(false);
	};

	return (
		<Container>
			{(offlineReady || needRefresh) && (
				<Toast>
					<ToastMessage>
						{offlineReady ? (
							<span>App ready to work offline</span>
						) : (
							<span>Update is available, click on reload button to update.</span>
						)}
					</ToastMessage>
					{needRefresh && (
						<ToastButton onClick={() => updateServiceWorker(true)}>Reload</ToastButton>
					)}
					<ToastButton onClick={() => close()}>Close</ToastButton>
				</Toast>
			)}
		</Container>
	);
};
