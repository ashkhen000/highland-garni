import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import type { GalleryImage } from "@/components/GalleryGrid";

export type GalleryCategory = {
  slug: "interiors" | "exteriors" | "views";
  cover: string;
  images: GalleryImage[];
};

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    slug: "interiors",
    cover: g1,
    images: [
      { src: g1, alt: "A-frame cabin interior with fireplace and mountain view" },
      { src: g1, alt: "Bedroom corner with timber beams and tall window" },
      { src: g1, alt: "Lounge area with leather sofa and stone hearth" },
    ],
  },
  {
    slug: "exteriors",
    cover: g2,
    images: [
      { src: g2, alt: "A-frame cabin exterior in snow at dusk" },
      { src: g2, alt: "Triangle cabin against basalt cliffs" },
      { src: g2, alt: "Path approaching the cabin at sunset" },
    ],
  },
  {
    slug: "views",
    cover: g3,
    images: [
      { src: g3, alt: "Infinity pool overlooking Armenian mountains" },
      { src: g4, alt: "Outdoor BBQ terrace with fire pit and lounge chairs" },
      { src: g3, alt: "Mountain horizon at golden hour" },
      { src: g4, alt: "Terrace lounge under open sky" },
    ],
  },
];

export const ALL_GALLERY_IMAGES: GalleryImage[] = GALLERY_CATEGORIES.flatMap((c) => c.images);
