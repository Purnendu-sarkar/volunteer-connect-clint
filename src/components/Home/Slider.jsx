import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Slider = () => {
  const slides = [
    {
      id: "slide1",
      img: "https://i.ibb.co/308xj4v/4ef0ac-f96bcc144f0c4c4eb78a189969dbe8d2-mv2.jpg",
      title: "Make an Impact",
      text: "Join hands with us to create a better future.",
    },
    {
      id: "slide2",
      img: "https://i.ibb.co/ZS12vfR/Google-Banner-01.png",
      title: "Support Local Causes",
      text: "Be a voice of change in your community.",
    },
    {
      id: "slide3",
      img: "https://i.ibb.co/mFZzM3f/GKtii-FMWMAAZb-7-1.jpg",
      title: "Join the Movement",
      text: "Together, we can make a difference.",
    },
  ];

  return (
    <div className="carousel w-full relative">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          id={slide.id}
          className="carousel-item relative w-full"
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold">{slide.title}</h1>
              <p className="mt-2">{slide.text}</p>
              <Link to="/volunteer-needs">
                <button className="btn bg-primary  mt-4">Join Now</button>
              </Link>
            </motion.div>
          </div>
          <a
            href={`#${slides[(index - 1 + slides.length) % slides.length].id}`}
            className="btn btn-circle btn-secondary absolute left-5 top-1/2 -translate-y-1/2"
          >
            ❮
          </a>
          <a
            href={`#${slides[(index + 1) % slides.length].id}`}
            className="btn btn-circle btn-secondary absolute right-5 top-1/2 -translate-y-1/2"
          >
            ❯
          </a>
        </div>
      ))}
    </div>
  );
};

export default Slider;
