"use client";

import React, { useState } from "react";

export default function HeroShowcase() {
  const [activeTab, setActiveTab] = useState<"company" | "store" | "custom">("company");

  const tabData = {
    company: {
      tag: "Company Profile",
      title: "Solusi Digital Terpercaya untuk Perusahaan Anda",
      desc: "Menghadirkan citra profesional dengan kredibilitas tinggi dan desain modern.",
      stat1: "99.8%",
      stat1Label: "Uptime Sistem",
      stat2: "0.4s",
      stat2Label: "Kecepatan Akses",
      color: "#1E7FB8",
    },
    store: {
      tag: "E-Commerce & Toko",
      title: "Toko Online Otomatis Siap Terima Order 24 Jam",
      desc: "Katalog interaktif, checkout instan via WhatsApp dan payment gateway.",
      stat1: "+180%",
      stat1Label: "Pertumbuhan Order",
      stat2: "100%",
      stat2Label: "Order Terintegrasi",
      color: "#10B981",
    },
    custom: {
      tag: "Web App & Dashboard",
      title: "Sistem Manajemen & Dashboard Khusus Bisnis",
      desc: "Otomasi operasional dengan alur kerja yang dirancang khusus sesuai kebutuhan.",
      stat1: "3.5x",
      stat1Label: "Efisiensi Kerja",
      stat2: "Aman",
      stat2Label: "Enkripsi Data",
      color: "#6366F1",
    },
  };

  const current = tabData[activeTab];

  return (
    <div className="showcase-container">
      {/* Main Browser Window */}
      <div className="browser-window">
        {/* Browser Top Bar */}
        <div className="browser-bar">
          <div className="browser-controls">
            <span className="dot dot-close"></span>
            <span className="dot dot-min"></span>
            <span className="dot dot-max"></span>
          </div>
          <div className="browser-address">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>https://klien-mydev.id</span>
          </div>
          <div className="browser-status">
            <span className="live-dot"></span>
            <span className="live-text">Live Preview</span>
          </div>
        </div>

        {/* Browser Content */}
        <div className="browser-content">
          {/* Mockup Header */}
          <div className="mock-nav">
            <div className="mock-brand">
              <span className="mock-logo"></span>
              <span className="mock-name">Klien Modern</span>
            </div>
            <div className="mock-tabs">
              <button
                type="button"
                className={`mock-tab-btn ${activeTab === "company" ? "active" : ""}`}
                onClick={() => setActiveTab("company")}
              >
                Company Profile
              </button>
              <button
                type="button"
                className={`mock-tab-btn ${activeTab === "store" ? "active" : ""}`}
                onClick={() => setActiveTab("store")}
              >
                Toko Online
              </button>
              <button
                type="button"
                className={`mock-tab-btn ${activeTab === "custom" ? "active" : ""}`}
                onClick={() => setActiveTab("custom")}
              >
                Web App
              </button>
            </div>
          </div>

          {/* Mockup Hero Card */}
          <div className="mock-hero">
            <span className="mock-pill">{current.tag}</span>
            <h4 className="mock-title">{current.title}</h4>
            <p className="mock-desc">{current.desc}</p>
            <div className="mock-actions">
              <span className="mock-btn-primary">Kunjungi Website →</span>
              <span className="mock-btn-secondary">Lihat Demo</span>
            </div>

            {/* Mockup Stats Bar */}
            <div className="mock-stats">
              <div className="mock-stat-item">
                <span className="stat-value">{current.stat1}</span>
                <span className="stat-label">{current.stat1Label}</span>
              </div>
              <div className="mock-stat-divider"></div>
              <div className="mock-stat-item">
                <span className="stat-value">{current.stat2}</span>
                <span className="stat-label">{current.stat2Label}</span>
              </div>
              <div className="mock-stat-divider"></div>
              <div className="mock-stat-item">
                <span className="stat-badge">⚡ PageSpeed 99</span>
                <span className="stat-label">Google Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Modern Badge 1: Page Speed & Performance */}
      <div className="float-badge float-speed">
        <div className="badge-icon-wrap speed-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>
        <div>
          <div className="badge-bold">Performa Cepat</div>
          <div className="badge-sub">Skor 99/100 Google Speed</div>
        </div>
      </div>

      {/* Floating Modern Badge 2: Client Trust & Satisfaction */}
      <div className="float-badge float-trust">
        <div className="badge-icon-wrap trust-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <div>
          <div className="badge-bold">Rating 4.9 / 5.0</div>
          <div className="badge-sub">Dari 50+ Klien Puas</div>
        </div>
      </div>
    </div>
  );
}
