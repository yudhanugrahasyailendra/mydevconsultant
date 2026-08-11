"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouteLoading } from "./RouteLoader";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { navigateTo } = useRouteLoading();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname === "/home" : pathname === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setOpen(false);
    navigateTo(href);
  };

  const navItems = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/services", label: "Layanan" },
    { href: "/portofolio", label: "Portofolio" },
    { href: "/contact", label: "Kontak" },
  ];

  return (
    <header>
      <nav>
        <Link href="/" className="logo" onClick={(e) => handleClick(e, "/")}>
          <Image
            src="/images/logo/MyDEV.png"
            alt="MyDEV logo"
            width={100}
            height={100}
            className="logo-img"
            priority
          />
        </Link>
        <ul className="links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={isActive(item.href) ? "active" : undefined}
                onClick={(e) => handleClick(e, item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <Link href="/contact" className="btn btn-primary" style={{ padding: "11px 20px", fontSize: "14px" }} onClick={(e) => handleClick(e, "/contact")}>Hubungi Kami</Link>
        </div>
        <button
          type="button"
          className={`burger${open ? " open" : ""}`}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active" : undefined}
            onClick={(e) => handleClick(e, item.href)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="btn btn-primary" onClick={(e) => handleClick(e, "/contact")}>Hubungi Kami</Link>
      </div>
    </header>
  );
}
