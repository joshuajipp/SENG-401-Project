import ListItemForm from "./components/ListItemForm";
import RequestRentalForm from "./components/RequestRentalForm";
import HomePage from "./components/HomePage";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <RequestRentalForm></RequestRentalForm> */}
      <HomePage></HomePage>
    </main>
  );
}
