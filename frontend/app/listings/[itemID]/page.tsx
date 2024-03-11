import RequestRentalForm from "@/app/components/RequestRentalForm";
import ImageViewer from "./ImageViewer";

export default function page({ params }: { params: { itemID: string } }) {
  return (
    <>
      <div className="flex flex-row justify-between gap-4">
        {/* Listing page for {params.itemID} */}
        <ImageViewer></ImageViewer>
        <RequestRentalForm></RequestRentalForm>
      </div>
    </>
  );
}
