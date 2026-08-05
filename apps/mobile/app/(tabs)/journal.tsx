import { Redirect } from "expo-router";

/** Legacy route → Check-in tab */
export default function JournalRedirect() {
  return <Redirect href="/(tabs)/checkin" />;
}
