import { useEffect, useRef } from "react";

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const decorativeRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeInUp");
        }
      });
    }, observerOptions);

    const elements = [
      titleRef.current,
      subtitleRef.current,
      descriptionRef.current,
      decorativeRef.current,
    ];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        {/* Blue-Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/80 via-blue-600/70 to-emerald-600/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Title */}
        <div className="mb-8">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-2xl relative opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <span className="relative z-10">A&G REFRIGERATION AND</span>
            <div className="absolute inset-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 text-yellow-400 blur-sm opacity-80 animate-pulse">
              A&G REFRIGERATION AND
            </div>
          </h1>
          <h2
            ref={subtitleRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-2xl relative opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            style={{ transitionDelay: "200ms" }}
          >
            <span className="relative z-10">AIRCONDITIONING</span>
            <div className="absolute inset-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 text-yellow-400 blur-sm opacity-80 animate-pulse">
              AIRCONDITIONING
            </div>
          </h2>
          <h3
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight drop-shadow-2xl relative opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            style={{ transitionDelay: "400ms" }}
          >
            <span className="relative z-10">SERVICES</span>
            <div className="absolute inset-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-yellow-400 blur-sm opacity-80 animate-pulse">
              SERVICES
            </div>
          </h3>
        </div>

        {/* Bottom Text */}
        <div
          ref={descriptionRef}
          className="mt-12 max-w-4xl mx-auto opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed font-medium drop-shadow-lg">
            Our commitment to quality, integrity, and customer satisfaction is
            evident in every aspect of our operations.
          </p>
        </div>

        {/* Decorative Elements */}
        <div
          ref={decorativeRef}
          className="mt-16 flex justify-center space-x-4 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          style={{ transitionDelay: "800ms" }}
        >
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      {/* Additional Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-20 w-16 h-16 bg-emerald-400/20 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};

export default Home;
