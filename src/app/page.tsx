"use client";

import { useState, useMemo } from "react";
import { mediaData, type Media } from "@/lib/data";
import Catalog from "@/components/media/catalog";
import Header from "@/components/layout/header";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedia = useMemo(() => {
    if (!searchQuery) {
      return mediaData;
    }
    return mediaData.filter((item: Media) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mx-auto px-4 py-8">
        <Catalog media={filteredMedia} />
      </div>
    </>
  );
}
