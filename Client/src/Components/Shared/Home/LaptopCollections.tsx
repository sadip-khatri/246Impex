/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../../Ui/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../Utils/api";
import { toast } from "react-toastify";

const LaptopCollections = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [bags, setBags] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const fetchBags = async () => {
    try {
      const res = await api.get("/products");
      // console.log(res.data);
      setBags(res.data.filter((item: any) => item.category === "Mobiles"));
    } catch (err) {
      console.error("Failed to fetch bags", err);
      setBags([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBags();
  }, []);

  const handleAddToCart = (product: any, selectedSize: string = "M") => {
    const cartProduct = {
      id: product.id,
      name: product.title,
      price: product.price,
      selectedSize,
      quantity: 1,
      images: { main: product.mainImage },
    };
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <section className="relative px-4 md:px-16 py-10 bg-white">
      {/* Top Text Section */}
      <div className="mb-6 max-w-4xl">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            MOBILE COLLECTIONS
          </h2>
          <p className="text-gray-600 mb-4">
            Rooted in innovation and versatility, our mobile collection brings
            together performance, design, and reliability. Whether for work or
            play, these smartphones are crafted to keep you connected,
            efficient, and ahead of the curve—an essential in today's fast-paced
            world.
          </p>
        </div>
        <Link to="mobile-collection">
          <button className="px-5 py-2 border border-[#2563eb] text-sm rounded-full hover:bg-[#2563eb] hover:text-white transition">
            Shop Now →
          </button>
        </Link>
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-[60%] transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 z-10 shadow-md hover:bg-gray-100 cursor-pointer"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-[60%] transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 z-10 shadow-md hover:bg-gray-100 cursor-pointer"
      >
        <FaChevronRight />
      </button>

      {/* Scrollable Cards Section */}
      <div
        className="overflow-x-auto scroll-smooth hide-scrollbar"
        ref={scrollRef}
      >
        <div className="flex items-start w-max gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : bags.length > 0 ? (
            bags.map((bag) => (
              <div key={bag._id} className="min-w-[220px] shrink-0">
                <ProductCard
                  id={bag._id}
                  image={bag.mainImage}
                  title={bag.title}
                  price={bag.price}
                  category={bag.category}
                />
              </div>
            ))
          ) : (
            <p>No bags found.</p>
          )}
        </div>
      </div>

      {/* Inline CSS for scrollbar hiding */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default LaptopCollections;
