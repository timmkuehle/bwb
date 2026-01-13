// eslint-disable-next-line @typescript-eslint/unbound-method
const stdoutWrite = process.stdout.write;

export const muteStdout = () => {
	process.stdout.write = () => false;
};

export const unmuteStdout = () => {
	process.stdout.write = stdoutWrite;
};
