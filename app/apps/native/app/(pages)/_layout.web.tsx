import { Slot } from "expo-router";

/**
 * Pages Layout (Web) - Pass-through
 *
 * On web, navigation is handled by the WebNavigationShell header.
 * This layout simply renders the page content without any additional wrapper.
 */
export default function WebPagesLayout() {
	return <Slot />;
}
