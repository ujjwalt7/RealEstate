"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/assets/img/logo.svg';
import Link from 'next/link';

function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    // Here you would typically send the email to your backend or a service
    setTimeout(() => setSubmitted(false), 3000);
    setEmail('');
  };

  return (
    <footer className="bg-borderDark text-white pt-10 pb-6 px-4 md:px-12 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        {/* Brand & Description */}
        <div className="flex-1 mb-8 md:mb-0">
          <div className="flex items-center gap-3 mb-3">
            <Image src={logo} alt="Logo" className="w-10 h-10" />
            <span className="text-2xl font-bold tracking-wide">Varsha Infra</span>
          </div>
          <p className="text-gray-300 max-w-xs text-sm">
            Your trusted partner in real estate. Discover, buy, and sell properties with confidence and ease. We bring you the best plots, homes, and commercial spaces across India.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 mb-8 md:mb-0">
          <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/" className="hover:text-accentYellow transition-colors">Home</Link></li>
            <li><Link href="/discover" className="hover:text-accentYellow transition-colors">Discover</Link></li>
            <li><Link href="/about" className="hover:text-accentYellow transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-accentYellow transition-colors">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-accentYellow transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-3">Stay Updated</h4>
          <p className="text-gray-300 text-sm mb-2">Subscribe to our newsletter for the latest property updates:</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-2 rounded-md bg-white text-black flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-accentYellow"
              required
            />
            <button
              type="submit"
              className="bg-accentYellow text-borderDark font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors"
            >
              Subscribe
            </button>
          </form>
          {error && <div className="text-red-400 text-xs mb-2">{error}</div>}
          {submitted && <div className="text-green-400 text-xs mb-2">Thank you for subscribing!</div>}
          <div className="mt-4">
            <h5 className="font-semibold mb-1">Contact Us</h5>
            <p className="text-gray-300 text-sm">Email: <a href="mailto:varshainfraandproperties@gmail.com" className="hover:text-accentYellow">varshainfraandproperties@gmail.com</a></p>
            <p className="text-gray-300 text-sm">Phone: <a href="tel:+911169296437" className="hover:text-accentYellow">+911169296437</a></p>
            <p className="text-gray-300 text-sm">Address: Jari Bazar Prayagraj Uttar Pradesh 212106</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Varsha Infra. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer; 
