import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Homepage } from "./components/sections/Homepage";
import { AboutPage } from "./components/sections/AboutPage";
import { AmenitiesPage } from "./components/sections/AmenitiesPage";
import { ContactPage } from "./components/sections/ContactPage";
import { GalleryIndex } from "./components/sections/GalleryIndex";
import { SuccessPage } from "./components/sections/SuccessPage";
import { ReservePage } from "./components/sections/ReservePage";
import { AdminPlaceholder } from "./components/sections/AdminPlaceholder";

import { GalleryCategoryPage } from "./routes/GalleryCategoryPage";
export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/admin" element={<AdminPlaceholder />} />
      <Route path="/amenities" element={<AmenitiesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/gallery" element={<GalleryIndex />} />
      <Route path="/gallery/:category" element={<GalleryCategoryPage />} />
      <Route path="/reservation-success" element={<SuccessPage />} />
      <Route path="/reserve" element={<ReservePage />} />
    </Routes>
  );
}
