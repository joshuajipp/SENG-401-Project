import RequestRentalForm from "./components/RequestRentalForm";
import Notification from "./components/Notification";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RequestRentalForm></RequestRentalForm>
    </main>
  );
}
