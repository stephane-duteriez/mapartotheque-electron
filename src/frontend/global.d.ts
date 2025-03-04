export { }

declare global {
	interface Window {
		backend: {
			send: (channel: string, ...args: any[]) => void;
			receive: (channel: string, func: (...args: any[]) => void) => void;
			invoke: (channel: string, ...args: any[]) => Promise<any>;
		};
	}
}