import Image from "next/image";
import ImageModal from "./ImageModal";
import ImageCarousel from "./ImageCarousel";

export default function ImageViewer() {
  const LargeImageElement = () => {
    return (
      <div className=" size-[360px] relative">
        <Image
          alt="product image"
          src="https://via.placeholder.com/443x590"
          fill
        />
      </div>
    );
  };
  const SmallImageElement = () => {
    return (
      <div className=" size-[120px] relative">
        <Image
          alt="product image"
          src="https://via.placeholder.com/443x590"
          fill
        />
      </div>
    );
  };
  return (
    <>
      <div className=" bg-white rounded-lg dark:bg-slate-800 gap-1 grid grid-cols-3 px-2">
        <div className=" col-span-2 self-center flex justify-center items-center">
          <LargeImageElement />
        </div>
        <div className="flex flex-col col-span-1 justify-around items-center">
          <SmallImageElement />
          <SmallImageElement />
          <ImageModal>
            <ImageCarousel></ImageCarousel>
          </ImageModal>
        </div>
      </div>
    </>
  );
}
