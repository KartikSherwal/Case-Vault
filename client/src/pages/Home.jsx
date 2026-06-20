import { useState, useEffect } from "react";
import API from "../services/api";
import SlideCard from "../components/SlideCard";

function Home() {

  const [slides, setSlides] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchSlides = async () => {
      try {

        const res = await API.get(
          `/slides?search=${search}`
        );

        setSlides(res.data.slides);

      } catch (error) {
        console.log(error);
      }
    };

    fetchSlides();

  }, [search]);

  return (
    <div className="min-h-screen bg-slate-100 px-8 py-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          The Gallery
        </h1>

        <p className="text-gray-600 mt-2">
          Curated collections from top case competitions.
        </p>
        <div className="mt-6 mb-6">
          <input
            type="text"
            placeholder="Search slides..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-96 border p-3 rounded-lg shadow-sm"
          />
        </div>
        <p className="text-gray-500 mb-4">
          Total Slides: {slides.length}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {slides.map((slide) => (
          <SlideCard
            key={slide._id}
            slide={slide}
          />
        ))}

      </div>

    </div>
  );
}

export default Home;