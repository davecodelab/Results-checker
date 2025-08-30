"use client"
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { FaInstagram, FaFacebookF, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        
        {/* Contact Info */}
        <div className="flex flex-col space-y-2 text-sm md:text-base">
          <p className="flex items-center space-x-2">
            <Phone size={16} /> <span>+233 55 944 1309</span>
          </p>
          <p className="flex items-center space-x-2">
            <Mail size={16} /> <span>support@checkershub.com</span>
          </p>
          <p className="flex items-center space-x-2">
            <span>WhatsApp: +233 55 944 1309</span>
          </p>
        </div>

        {/* Logo + Links / Services */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/" className="text-2xl font-bold  tracking-tight hover:cursor-pointer hover:scale-105 transition-transform">
            Checkers Hub
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base text-gray-200 justify-center">
            <Link href="/" className="hover:text-white">BECE Results</Link>
            <Link href="/" className="hover:text-white">WASSCE / NOV-DEC Results</Link>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex space-x-4 justify-center md:justify-end">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 hover:scale-110 transition-transform"
          >
            <FaInstagram size={18} color="white" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:scale-110 transition-transform"
          >
            <FaXTwitter size={18} color="white" />
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:scale-110 transition-transform"
          >
            <FaFacebookF size={18} color="white" />
          </Link>
          <Link
            href="https://wa.me/233559441309"
            target="_blank"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:scale-110 transition-transform"
          >
            <FaWhatsapp size={18} color="white" />
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 text-center text-xs md:text-sm text-gray-200">
        © {new Date().getFullYear()} Powered by Checkers Hub | Built with ❤️ in Ghana
      </div>
    </footer>
  );
}
