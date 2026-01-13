import { execSync } from "child_process";

/**
 * Returns the installed version of WP-CLI
 *
 * @since MNMLST 0.6.0
 *
 * @returns {string | false} WP-CLI version or false if WP-CLI is not installed or not working properly
 */
const getWpCliVersion = () => {
	try {
		return execSync("wp cli version").toString();
	} catch {
		return false;
	}
};

export default getWpCliVersion;
