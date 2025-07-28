import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  describe('Rendering', () => {
    it('renders the footer component', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('renders the Popshelf logo', () => {
      render(<Footer />);
      const logo = screen.getByAltText('Popshelf');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logos/logo_white.svg');
    });

    it('renders social media icons', () => {
      render(<Footer />);
      const facebookLink = screen.getByLabelText('Facebook');
      const instagramLink = screen.getByLabelText('Instagram');
      const pinterestLink = screen.getByLabelText('Pinterest');
      const tiktokLink = screen.getByLabelText('TikTok');

      expect(facebookLink).toBeInTheDocument();
      expect(instagramLink).toBeInTheDocument();
      expect(pinterestLink).toBeInTheDocument();
      expect(tiktokLink).toBeInTheDocument();
    });

    it('renders all footer links', () => {
      render(<Footer />);
      
      // Check for some key links that appear in both mobile and desktop
      expect(screen.getByText('About popshelf®')).toBeInTheDocument();
      expect(screen.getByText('Careers')).toBeInTheDocument();
      expect(screen.getByText('Help')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('renders copyright text with current year', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      const copyrightText = screen.getByText((content) => 
        content.includes(`© Copyright ${currentYear}`) && 
        content.includes('pshelf®. All rights reserved.')
      );
      expect(copyrightText).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
      const { container } = render(<Footer className="custom-footer" />);
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('Navigation', () => {
    it('has proper navigation landmarks', () => {
      const { container } = render(<Footer />);
      const navElements = container.querySelectorAll('nav[aria-label="Footer navigation"]');
      expect(navElements.length).toBeGreaterThan(0);
    });

    it('all links navigate to homepage', () => {
      const { container } = render(<Footer />);
      const links = container.querySelectorAll('a[href="/"]');
      expect(links.length).toBeGreaterThan(0);
      
      // Verify all links have href="/"
      links.forEach(link => {
        expect(link).toHaveAttribute('href', '/');
      });
    });

    it('logo link navigates to homepage', () => {
      render(<Footer />);
      const logoLink = screen.getByAltText('Popshelf').closest('a');
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });

  describe('Responsive Design', () => {
    it('renders both mobile and desktop navigation', () => {
      const { container } = render(<Footer />);
      
      // Check for mobile nav
      const mobileNav = container.querySelector('.footer__mobileNav');
      expect(mobileNav).toBeInTheDocument();
      
      // Check for desktop nav
      const desktopNav = container.querySelector('.footer__desktopNav');
      expect(desktopNav).toBeInTheDocument();
    });

    it('desktop navigation has two columns', () => {
      const { container } = render(<Footer />);
      const desktopColumns = container.querySelectorAll('.footer__column');
      expect(desktopColumns).toHaveLength(2);
    });

    it('renders different link sets for mobile and desktop', () => {
      render(<Footer />);
      
      // Mobile-specific link
      expect(screen.getByText('Do Not Sell My Info')).toBeInTheDocument();
      
      // Desktop-specific link
      expect(screen.getByText('CA Privacy Notice for Employees, Applicants & Contractors')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML footer element', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('social media links have proper aria-labels', () => {
      render(<Footer />);
      
      expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
      expect(screen.getByLabelText('Pinterest')).toBeInTheDocument();
      expect(screen.getByLabelText('TikTok')).toBeInTheDocument();
    });

    it('decorative images have empty alt text', () => {
      const { container } = render(<Footer />);
      const socialIcons = container.querySelectorAll('.footer__socialIcon');
      
      socialIcons.forEach(icon => {
        expect(icon).toHaveAttribute('alt', '');
      });
    });

    it('navigation areas have proper aria-labels', () => {
      const { container } = render(<Footer />);
      const navs = container.querySelectorAll('nav[aria-label="Footer navigation"]');
      expect(navs.length).toBeGreaterThan(0);
    });
  });

  describe('Content', () => {
    it('renders the correct number of links in desktop columns', () => {
      const { container } = render(<Footer />);
      const columns = container.querySelectorAll('.footer__column');
      
      // First column should have 8 links
      const firstColumnLinks = columns[0]?.querySelectorAll('a');
      expect(firstColumnLinks).toHaveLength(8);
      
      // Second column should have 8 links
      const secondColumnLinks = columns[1]?.querySelectorAll('a');
      expect(secondColumnLinks).toHaveLength(8);
    });

    it('renders all mobile links', () => {
      const { container } = render(<Footer />);
      const mobileNav = container.querySelector('.footer__mobileNav');
      const mobileLinks = mobileNav?.querySelectorAll('a');
      
      expect(mobileLinks).toHaveLength(11);
    });

    it('includes registered trademark symbol in copyright', () => {
      render(<Footer />);
      const copyrightText = screen.getByText((content) => 
        content.includes('pshelf®')
      );
      expect(copyrightText).toBeInTheDocument();
    });
  });
});