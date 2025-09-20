import { useEffect, useRef } from "react";

const AboutUs = () => {
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const contentCardRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const featuresTitleRef = useRef(null);
  const feature1Ref = useRef(null);
  const feature2Ref = useRef(null);
  const feature3Ref = useRef(null);

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
      contentCardRef.current,
      image1Ref.current,
      image2Ref.current,
      featuresTitleRef.current,
      feature1Ref.current,
      feature2Ref.current,
      feature3Ref.current,
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
            <span className="relative z-10">About Us</span>
            <div className="absolute inset-0 text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400 blur-sm opacity-80 animate-pulse">
              About Us
            </div>
          </h1>
          <p
            ref={heroSubtitleRef}
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            style={{ transitionDelay: "200ms" }}
          >
            Learn more about A&G Refrigeration and Air Conditioning Services
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div
              ref={contentCardRef}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-cyan-200/50 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            >
              <h2 className="text-3xl font-bold text-cyan-900 mb-6 text-center relative">
                <span className="relative z-10">
                  A & G REFRIGERATION AND AIRCONDITIONING SERVICES
                </span>
                <div className="absolute inset-0 text-3xl font-bold text-yellow-400 blur-sm opacity-60 animate-pulse">
                  A & G REFRIGERATION AND AIRCONDITIONING SERVICES
                </div>
              </h2>

              <div className="space-y-6 text-cyan-800 leading-relaxed">
                <p className="text-lg font-medium">
                  SUPPLY, INSTALL AND OFFERS AFTER SALE SERVICES FOR AIR
                  CONDITIONING AND REFRIGERATION SYSTEMS IN METRO MANILA AND
                  NEARBY PROVINCES FOR RESIDENTIAL, COMMERCIAL, AND INDUSTRIAL.
                </p>

                <p className="text-lg font-medium">
                  EQUIPPED WITH KNOWLEDGE AND HARDWORK IS OUR HUMBLE BEGINNING
                  OF OWNING AND OPERATING THIS BUSINESS. OUR DEDICATION AND HARD
                  WORK CONTINUE TO BRING THE LEVEL OF EXPERTISE AND EXPERIENCE
                  IN THIS FIELD.
                </p>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-8">
            {/* First Image */}
            <div
              ref={image1Ref}
              className="relative group opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Professional HVAC Installation"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold drop-shadow-lg">
                    Professional Installation
                  </h3>
                  <p className="text-sm drop-shadow-md">
                    Expert HVAC system installation
                  </p>
                </div>
              </div>
            </div>

            {/* Second Image */}
            <div
              ref={image2Ref}
              className="relative group opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
              style={{ transitionDelay: "400ms" }}
            >
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="HVAC Maintenance and Service"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold drop-shadow-lg">
                    Maintenance & Service
                  </h3>
                  <p className="text-sm drop-shadow-md">
                    Reliable after-sale support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2
              ref={featuresTitleRef}
              className="text-3xl font-bold text-cyan-900 mb-4 relative opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            >
              <span className="relative z-10">Why Choose Us?</span>
              <div className="absolute inset-0 text-3xl font-bold text-yellow-400 blur-sm opacity-60 animate-pulse">
                Why Choose Us?
              </div>
            </h2>
            <p
              className="text-lg text-cyan-700 max-w-2xl mx-auto font-medium opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
              style={{ transitionDelay: "200ms" }}
            >
              Our commitment to excellence and customer satisfaction sets us
              apart
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              ref={feature1Ref}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-cyan-200/50 hover:border-cyan-300/70 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
              style={{ transitionDelay: "400ms" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-cyan-900 mb-2">
                Quality Service
              </h3>
              <p className="text-cyan-700 font-medium">
                Professional installation and maintenance services
              </p>
            </div>

            <div
              ref={feature2Ref}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-blue-200/50 hover:border-blue-300/70 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
              style={{ transitionDelay: "600ms" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-cyan-900 mb-2">
                Wide Coverage
              </h3>
              <p className="text-cyan-700 font-medium">
                Serving Metro Manila and nearby provinces
              </p>
            </div>

            <div
              ref={feature3Ref}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-emerald-200/50 hover:border-emerald-300/70 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
              style={{ transitionDelay: "800ms" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-xl font-bold text-cyan-900 mb-2">
                Expertise
              </h3>
              <p className="text-cyan-700 font-medium">
                Years of experience and dedication in the field
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
