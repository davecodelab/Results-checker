"use client"
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);

  const toggleNavbar = () => setMobileDrawerOpen((v) => !v);

  // Animate dropdown open/close
  useEffect(() => {
    if (!menuRef.current) return;

    if (mobileDrawerOpen) {
      // Animate opening
      gsap.to(menuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        display: "block",
      });

      gsap.fromTo(
        linksRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.15,
        }
      );
    } else {
      // Animate closing
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.display = "none";
          }
        },
      });
    }
  }, [mobileDrawerOpen]);

  // Reset refs on render
  linksRef.current = [];

  return (
    <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="text-2xl font-bold  text-blue-700 tracking-tighter cursor-pointer hover:text-blue-500 transition-colors">
            <Link href="/">Checkers Hub</Link>
          </div>

          {/* Mobile Menu Button (hidden on desktop) */}
          <div className="lg:hidden">
            <button
              className="text-blue-700 hover:text-blue-500"
              title="Open mobile menu"
              onClick={toggleNavbar}
            >
              {mobileDrawerOpen ? (
                <X className="text-blue-700" size={28} />
              ) : (
                <Menu className="text-blue-700" size={28} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu (always mounted, GSAP handles animation) */}
      <div
        ref={menuRef}
        style={{ height: 0, overflow: "hidden", opacity: 0, display: "none" }}
        className="lg:hidden bg-white"
      >
        <ul className="flex flex-col items-center space-y-6 py-6 text-blue-700 text-lg font-semibold">
          {["Home", "Buy", "Retrieve"].map((item, i) => (
            <li
              key={item}
              ref={(el: HTMLLIElement | null) => {
                linksRef.current[i] = el;
              }}
              onClick={toggleNavbar}
              className="cursor-pointer hover:text-blue-500 transition-transform hover:scale-105"
            >
              <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
