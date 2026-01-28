import {
  NativeTabs,
  Icon,
  Label,
} from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="inbox">
        <Label>Inbox</Label>
        <Icon sf="envelope" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="browse">
        <Label>Browse</Label>
        <Icon sf="magnifyingglass" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="orders">
        <Label>Orders</Label>
        <Icon sf="doc.plaintext" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="more">
        <Label>More</Label>
        <Icon sf="ellipsis" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
