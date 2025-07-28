'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  // Desktop links organized by column
  const desktopLinks = {
    column1: [
      { label: 'About popshelf®', href: '/' },
      { label: 'Careers', href: '/' },
      { label: 'Help', href: '/' },
      { label: 'News', href: '/' },
      { label: 'Gift Cards', href: '/' },
      { label: 'Locations', href: '/' },
      { label: 'Stores', href: '/' },
      { label: 'California Privacy Rights', href: '/' },
    ],
    column2: [
      { label: 'Vendors', href: '/' },
      { label: 'Track Your Order', href: '/' },
      { label: 'Terms & Conditions', href: '/' },
      { label: 'SDS/Ingredient Information', href: '/' },
      { label: 'Your Privacy Choices', href: '/' },
      { label: 'CA Privacy Notice for Employees, Applicants & Contractors', href: '/' },
      { label: 'Privacy Policy', href: '/' },
      { label: 'Cookie Preferences', href: '/' },
    ],
  };

  // Mobile links (single column)
  const mobileLinks: FooterLink[] = [
    { label: 'About pOpshelf®', href: '/' },
    { label: 'Careers', href: '/' },
    { label: 'Help', href: '/' },
    { label: 'News', href: '/' },
    { label: 'Gift Cards', href: '/' },
    { label: 'Track Your Order', href: '/' },
    { label: 'Terms & Conditions', href: '/' },
    { label: 'SDS/Ingredient Information', href: '/' },
    { label: 'Do Not Sell My Info', href: '/' },
    { label: 'CA Privacy Rights', href: '/' },
    { label: 'Privacy Policy', href: '/' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.footer__main}>
        <div className={styles.footer__container}>
          {/* Logo and Social Media */}
          <div className={styles.footer__brand}>
            <Link href="/" className={styles.footer__logo}>
              <Image
                src="/logos/logo_white.svg"
                alt="Popshelf"
                width={162}
                height={36}
                priority
              />
            </Link>
            <div className={styles.footer__social}>
              <Link href="/" aria-label="Social media links">
                <Image
                  src="/social-media.svg"
                  alt="Facebook, Instagram, Pinterest, and TikTok"
                  width={143}
                  height={36}
                  className={styles.footer__socialIcon}
                />
              </Link>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className={styles.footer__desktopNav} aria-label="Footer navigation">
            <div className={styles.footer__column}>
              {desktopLinks.column1.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className={styles.footer__link}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.footer__column}>
              {desktopLinks.column2.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className={styles.footer__link}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Links */}
          <nav className={styles.footer__mobileNav} aria-label="Footer navigation">
            {mobileLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className={styles.footer__link}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.footer__copyright}>
        <div className={styles.footer__copyrightContainer}>
          <p className={styles.footer__copyrightText}>
            © Copyright {currentYear}. p<span className={styles.footer__copyrightO}>O</span>pshelf®. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;