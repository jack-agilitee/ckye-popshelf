import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PointsEarningCart from './PointsEarningCart';

describe('PointsEarningCart', () => {
  const defaultProps = {
    points: 180,
  };

  const unauthenticatedProps = {
    ...defaultProps,
    isAuthenticated: false,
    onSignIn: jest.fn(),
    onRegister: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Authenticated State', () => {
    it('renders with required props in authenticated state', () => {
      render(<PointsEarningCart {...defaultProps} isAuthenticated={true} />);
      expect(screen.getByText(/Earn up to/)).toBeInTheDocument();
      expect(screen.getByText('180 points')).toBeInTheDocument();
      expect(screen.getByText(/with this order/)).toBeInTheDocument();
    });

    it('does not show buttons when authenticated', () => {
      render(<PointsEarningCart {...defaultProps} isAuthenticated={true} />);
      expect(screen.queryByText('SIGN IN')).not.toBeInTheDocument();
      expect(screen.queryByText('REGISTER')).not.toBeInTheDocument();
    });

    it('shows PopShelf logo', () => {
      render(<PointsEarningCart {...defaultProps} isAuthenticated={true} />);
      const logo = screen.getByAltText('PopShelf Perks');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logos/main-logo.svg');
    });
  });

  describe('Unauthenticated State', () => {
    it('renders with required props in unauthenticated state', () => {
      render(<PointsEarningCart {...unauthenticatedProps} />);
      expect(screen.getByText(/Earn up to/)).toBeInTheDocument();
      expect(screen.getByText('180 points')).toBeInTheDocument();
      expect(screen.getByText(/with this order/)).toBeInTheDocument();
    });

    it('shows both sign in and register buttons when unauthenticated', () => {
      render(<PointsEarningCart {...unauthenticatedProps} />);
      expect(screen.getByText('SIGN IN')).toBeInTheDocument();
      expect(screen.getByText('REGISTER')).toBeInTheDocument();
    });

    it('calls onSignIn when sign in button is clicked', () => {
      render(<PointsEarningCart {...unauthenticatedProps} />);
      fireEvent.click(screen.getByText('SIGN IN'));
      expect(unauthenticatedProps.onSignIn).toHaveBeenCalledTimes(1);
    });

    it('calls onRegister when register button is clicked', () => {
      render(<PointsEarningCart {...unauthenticatedProps} />);
      fireEvent.click(screen.getByText('REGISTER'));
      expect(unauthenticatedProps.onRegister).toHaveBeenCalledTimes(1);
    });

    it('has proper accessibility attributes on buttons', () => {
      render(<PointsEarningCart {...unauthenticatedProps} />);
      const signInButton = screen.getByLabelText('Sign in to earn points');
      const registerButton = screen.getByLabelText('Register to earn points');
      
      expect(signInButton).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();
    });
  });

  describe('Points Display', () => {
    it('displays the correct points number', () => {
      render(<PointsEarningCart points={250} isAuthenticated={true} />);
      expect(screen.getByText('250 points')).toBeInTheDocument();
    });

    it('handles zero points', () => {
      render(<PointsEarningCart points={0} isAuthenticated={true} />);
      expect(screen.getByText('0 points')).toBeInTheDocument();
    });

    it('handles large point values', () => {
      render(<PointsEarningCart points={9999} isAuthenticated={true} />);
      expect(screen.getByText('9999 points')).toBeInTheDocument();
    });

    it('renders points text with proper styling class', () => {
      render(<PointsEarningCart {...defaultProps} isAuthenticated={true} />);
      const pointsElement = screen.getByText('180 points');
      expect(pointsElement).toHaveClass('points-earning-cart__points');
    });
  });

  describe('Component Structure', () => {
    it('applies default styling classes', () => {
      const { container } = render(<PointsEarningCart {...defaultProps} isAuthenticated={true} />);
      const component = container.firstChild as HTMLElement;
      expect(component).toHaveClass('points-earning-cart');
    });

    it('applies custom className', () => {
      const { container } = render(
        <PointsEarningCart {...defaultProps} isAuthenticated={true} className="custom-class" />
      );
      const component = container.firstChild as HTMLElement;
      expect(component).toHaveClass('custom-class');
      expect(component).toHaveClass('points-earning-cart');
    });

    it('has proper text structure with message and subtitle', () => {
      render(<PointsEarningCart {...defaultProps} isAuthenticated={true} />);
      const message = screen.getByText(/Earn up to/);
      const subtitle = screen.getByText(/with this order/);
      
      expect(message.tagName).toBe('P');
      expect(subtitle.tagName).toBe('P');
    });
  });

  describe('Default Behavior', () => {
    it('defaults to unauthenticated state when isAuthenticated is not provided', () => {
      const props = {
        points: 180,
        onSignIn: jest.fn(),
        onRegister: jest.fn(),
      };
      render(<PointsEarningCart {...props} />);
      expect(screen.getByText('SIGN IN')).toBeInTheDocument();
      expect(screen.getByText('REGISTER')).toBeInTheDocument();
    });

    it('handles missing callback props gracefully', () => {
      render(<PointsEarningCart points={180} isAuthenticated={false} />);
      expect(screen.getByText('SIGN IN')).toBeInTheDocument();
      expect(screen.getByText('REGISTER')).toBeInTheDocument();
      
      // Should not throw when clicked without callbacks
      fireEvent.click(screen.getByText('SIGN IN'));
      fireEvent.click(screen.getByText('REGISTER'));
    });
  });

  describe('Edge Cases', () => {
    it('handles negative points gracefully', () => {
      render(<PointsEarningCart points={-10} isAuthenticated={true} />);
      expect(screen.getByText('-10 points')).toBeInTheDocument();
    });

    it('handles decimal points', () => {
      render(<PointsEarningCart points={180.5} isAuthenticated={true} />);
      expect(screen.getByText('180.5 points')).toBeInTheDocument();
    });
  });
});