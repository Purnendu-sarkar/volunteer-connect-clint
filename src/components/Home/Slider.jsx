const Slider = () => {
  return (
    <div className="carousel w-full">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co.com/308xj4v/4ef0ac-f96bcc144f0c4c4eb78a189969dbe8d2-mv2.jpg"
          alt="Volunteer Together"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl font-bold">Make an Impact</h1>
            <p className="mt-2">
              Join hands with us to create a better future.
            </p>
          </div>
        </div>
        <a
          href="#slide3"
          className="btn btn-circle btn-secondary absolute left-5 top-1/2 -translate-y-1/2"
        >
          ❮
        </a>
        <a
          href="#slide2"
          className="btn btn-circle btn-secondary absolute right-5 top-1/2 -translate-y-1/2"
        >
          ❯
        </a>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co.com/ZS12vfR/Google-Banner-01.png"
          alt="Support Communities"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl font-bold">Support Local Causes</h1>
            <p className="mt-2">Be a voice of change in your community.</p>
          </div>
        </div>
        <a
          href="#slide1"
          className="btn btn-circle btn-secondary absolute left-5 top-1/2 -translate-y-1/2"
        >
          ❮
        </a>
        <a
          href="#slide3"
          className="btn btn-circle btn-secondary absolute right-5 top-1/2 -translate-y-1/2"
        >
          ❯
        </a>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co.com/mFZzM3f/GKtii-FMWMAAZb-7-1.jpg"
          alt="Be a Volunteer"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl font-bold">Join the Movement</h1>
            <p className="mt-2">Together, we can make a difference.</p>
          </div>
        </div>
        <a
          href="#slide2"
          className="btn btn-circle btn-secondary absolute left-5 top-1/2 -translate-y-1/2"
        >
          ❮
        </a>
        <a
          href="#slide1"
          className="btn btn-circle btn-secondary absolute right-5 top-1/2 -translate-y-1/2"
        >
          ❯
        </a>
      </div>
    </div>
  );
};

export default Slider;
