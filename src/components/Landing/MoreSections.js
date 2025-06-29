import React from 'react';
import { FaRegHandshake, FaRegCheckCircle, FaRegLightbulb, FaRegClock, FaSearch } from 'react-icons/fa';

export default function MoreSections() {
  return (
    <section className="w-full py-10 px-4 bg-white grid grid-cols-1 gap-10">
      {/* Why Choose Us */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-borderDark">Why Choose Varsha Infra?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <FaRegHandshake className="text-3xl text-accentYellow mb-2" />
            <span className="font-semibold text-borderDark mb-1">Trusted by Thousands</span>
            <p className="text-gray-600 text-sm">A proven track record with happy clients across India.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaRegCheckCircle  className="text-3xl text-accentYellow mb-2" />
            <span className="font-semibold text-borderDark mb-1">Verified Properties</span>
            <p className="text-gray-600 text-sm">All listings are thoroughly verified for your peace of mind.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaRegLightbulb className="text-3xl text-accentYellow mb-2" />
            <span className="font-semibold text-borderDark mb-1">Expert Guidance</span>
            <p className="text-gray-600 text-sm">Our team helps you at every step, from search to registration.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaRegClock className="text-3xl text-accentYellow mb-2" />
            <span className="font-semibold text-borderDark mb-1">Quick Process</span>
            <p className="text-gray-600 text-sm">Fast, transparent, and hassle-free property transactions.</p>
          </div>
        </div>
      </div>
      {/* How It Works */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-borderDark">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <FaSearch className="text-3xl text-accentYellow mb-2" />
            <span className="font-semibold text-borderDark mb-1">1. Search</span>
            <p className="text-gray-600 text-sm">Find your ideal property using our smart filters and map tools.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaRegHandshake className="text-3xl text-accentYellow mb-2" />
            <span className="font-semibold text-borderDark mb-1">2. Connect</span>
            <p className="text-gray-600 text-sm">Contact verified agents or owners directly through our platform.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaRegCheckCircle className="text-3xl text-accentYellow mb-2" />
            <span className="font-semibold text-borderDark mb-1">3. Close</span>
            <p className="text-gray-600 text-sm">Complete your transaction securely and move in with confidence.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 