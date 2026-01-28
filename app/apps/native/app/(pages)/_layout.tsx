import { Stack } from "expo-router";

/**
 * Pages Layout (Native) - Stack Navigator
 *
 * Content pages that are accessible via navigation but are NOT tabs.
 * Pages push onto the root stack, so the tab bar is hidden when viewing them.
 * Use router.push("/about") or <Link href="/about"> to navigate here.
 */
export default function PagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
