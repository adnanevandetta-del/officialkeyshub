import Image from "next/image";
import { getProductBoxImage } from "../lib/productImage";

// Article hero: the Microsoft product boxes the article is about, on a branded
// gradient. Uses our own generated box art (/api/product-image), so the images
// are copyright-safe and never show an outdated price.
export default function ArticleHero({
  products,
  alt,
  caption,
  className = "mb-8",
}: {
  products: string[];
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={alt}
        className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-[#071836] via-[#0b3a6e] to-[#0369a1] flex items-center justify-center gap-3 md:gap-10 px-4 md:px-6"
      >
        {products.map((name) => (
          <Image
            key={name}
            src={getProductBoxImage(name)}
            alt={`${name} product box`}
            width={564}
            height={780}
            unoptimized
            className="min-w-0 flex-1 max-w-[200px] md:max-w-[260px] h-auto object-contain drop-shadow-2xl"
          />
        ))}
      </div>
      {caption && <figcaption className="text-sm text-gray-500 text-center mt-3">{caption}</figcaption>}
    </figure>
  );
}
