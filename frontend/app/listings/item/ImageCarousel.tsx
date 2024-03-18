import { Carousel } from "flowbite-react";
import Image from "next/image";

const CarouselItem = ({
  src = "/missingImage.jpg",
  alt,
}: {
  src: string;
  alt: string;
}) => {
  return (
    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
      <Image src={src} alt={alt} width={400} height={400} />
    </div>
  );
};

export default function ImageCarousel({ images }: { images: string[] }) {
  return (
    <div className="h-96">
      <Carousel slide={false}>
        {images.map((src, index) => (
          <CarouselItem key={index} src={src} alt={`Image ${index + 1}`} />
        ))}
      </Carousel>
    </div>
  );
}
