import Image from "next/image";
import ImageModal from "./ImageModal";
import ImageCarousel from "./ImageCarousel";

export default function ImageViewer({ images }: { images: string[] }) {
  const LargeImageElement = ({
    imageLink = "/missingImage.jpg",
  }: {
    imageLink?: string;
  }) => {
    return (
      <div className=" size-[360px] relative">
        <Image
          alt="product image"
          src={imageLink}
          fill
          className="object-contain"
        />
      </div>
    );
  };
  const SmallImageElement = ({
    imageLink = "/missingImage.jpg",
  }: {
    imageLink?: string;
  }) => {
    return (
      <div className=" size-[120px] relative">
        <Image
          alt="product image"
          src={imageLink}
          fill
          className="object-contain"
        />
      </div>
    );
  };
  return (
    <>
      <div className=" bg-white rounded-lg dark:bg-slate-800 gap-1 grid grid-cols-3 px-2">
        {images?.length > 0 ? (
          <>
            <div className=" col-span-2 self-center flex justify-center items-center">
              <LargeImageElement imageLink={images[0]} />
            </div>
            <div className="flex flex-col col-span-1 justify-around items-center">
              {images[1] && <SmallImageElement imageLink={images[1]} />}
              {images[2] && <SmallImageElement imageLink={images[2]} />}
              <ImageModal>
                <ImageCarousel images={images} />
              </ImageModal>
            </div>
          </>
        ) : (
          <div className="p-4 items-center col-span-3 gap-2 flex flex-col justify-center">
            <LargeImageElement />
            No images available
          </div>
        )}
      </div>
    </>
  );
}
