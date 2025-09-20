import { useEffect, useRef } from "react";

const MissionVission = () => {
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const visionCardRef = useRef(null);
  const missionCardRef = useRef(null);
  const valuesRef = useRef(null);

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
      heroTitleRef.current,
      heroSubtitleRef.current,
      visionCardRef.current,
      missionCardRef.current,
      valuesRef.current,
    ];

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50/30 to-emerald-50/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-cyan-600/80 via-blue-600/70 to-emerald-600/80 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            ref={heroTitleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl relative opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <span className="relative z-10">Vision & Mission</span>
            <div className="absolute inset-0 text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400 blur-sm opacity-80 animate-pulse">
              Vision & Mission
            </div>
          </h1>
          <p
            ref={heroSubtitleRef}
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            style={{ transitionDelay: "200ms" }}
          >
            Our guiding principles that drive excellence in everything we do
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Vision Card */}
          <div
            ref={visionCardRef}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-cyan-200/50 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-cyan-900 mb-4 relative">
                <span className="relative z-10">Our Vision</span>
                <div className="absolute inset-0 text-3xl font-bold text-yellow-400 blur-sm opacity-60 animate-pulse">
                  Our Vision
                </div>
              </h2>
            </div>

            <div className="text-cyan-800 leading-relaxed">
              <p className="text-lg font-medium text-center">
                TO BE THE BEST REFRIGERATION AND AIR CONDITIONING COMPANY WHO
                CREATES LIFE LONG RELATIONSHIPS WITH OUR CUSTOMERS AND
                EMPLOYEES, BY EXHIBITING EXCELLENT SERVICE AND DEDICATION.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div
            ref={missionCardRef}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-emerald-200/50 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-cyan-900 mb-4 relative">
                <span className="relative z-10">Our Mission</span>
                <div className="absolute inset-0 text-3xl font-bold text-yellow-400 blur-sm opacity-60 animate-pulse">
                  Our Mission
                </div>
              </h2>
            </div>

            <div className="text-cyan-800 leading-relaxed">
              <p className="text-lg font-medium text-center">
                WE ARE COMMITTED TO BUILDING THE LOYALTY OF OUR CUSTOMERS AND
                ENSURING THAT WE PERFORM AT THE HIGHEST STANDARDS OF OUR
                SERVICES TO MEET CUSTOMERS' SATISFACTION.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVission;
