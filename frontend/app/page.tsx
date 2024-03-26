import GetLocationComponent from "./components/GetLocationComponent";
import HomePage from "./components/HomePage";

export default async function Home() {
  return (
    <main>
      <HomePage></HomePage>
      <GetLocationComponent />
    </main>
  );
}
