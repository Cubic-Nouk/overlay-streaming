import ValorantOverlayPage from "../components/riot/valorant/overlay/page_component";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ValorantOverlayPage></ValorantOverlayPage>
    </div>
  );
}