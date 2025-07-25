import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocationPicker from './LocationPicker';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('LocationPicker', () => {
  const defaultProps = {
    address: '315 N Main St, Atlanta GA',
    onEdit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<LocationPicker {...defaultProps} />);
    
    expect(screen.getByText('Picking up at')).toBeInTheDocument();
    expect(screen.getByText('315 N Main St, Atlanta GA')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Edit pickup location' })).toHaveLength(2); // Text button and icon button
  });

  it('renders with custom label', () => {
    render(
      <LocationPicker {...defaultProps} label="Delivery address" />
    );
    
    expect(screen.getByText('Delivery address')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <LocationPicker {...defaultProps} className="custom-class" />
    );
    
    const component = container.firstChild as HTMLElement;
    expect(component).toHaveClass('custom-class');
  });

  it('calls onEdit when edit icon button is clicked', () => {
    render(<LocationPicker {...defaultProps} />);
    
    const editButtons = screen.getAllByRole('button', { name: 'Edit pickup location' });
    const iconButton = editButtons[1]; // Second button is the icon
    fireEvent.click(iconButton);
    
    expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onEdit when text content is clicked', () => {
    render(<LocationPicker {...defaultProps} />);
    
    const editButtons = screen.getAllByRole('button', { name: 'Edit pickup location' });
    const textButton = editButtons[0]; // First button contains the text
    fireEvent.click(textButton);
    
    expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onEdit when clicking on address text', () => {
    render(<LocationPicker {...defaultProps} />);
    
    const addressText = screen.getByText('315 N Main St, Atlanta GA');
    fireEvent.click(addressText);
    
    expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
  });

  it('uses custom aria label for edit buttons', () => {
    render(
      <LocationPicker 
        {...defaultProps} 
        editAriaLabel="Change delivery location" 
      />
    );
    
    expect(screen.getAllByRole('button', { name: 'Change delivery location' })).toHaveLength(2);
  });

  it('displays address with underline styling', () => {
    render(<LocationPicker {...defaultProps} />);
    
    const address = screen.getByText('315 N Main St, Atlanta GA');
    expect(address).toHaveClass('location-picker__address');
  });

  it('renders edit icon', () => {
    render(<LocationPicker {...defaultProps} />);
    
    const icon = screen.getByAltText('');
    expect(icon).toHaveAttribute('src', '/edit.svg');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '23');
  });

  it('handles long addresses', () => {
    const longAddress = '1234 Very Long Street Name, Apartment Complex Building B, Suite 567, Some City With A Long Name, State 12345';
    render(
      <LocationPicker {...defaultProps} address={longAddress} />
    );
    
    expect(screen.getByText(longAddress)).toBeInTheDocument();
  });

  it('maintains focus on clicked button after click', () => {
    render(<LocationPicker {...defaultProps} />);
    
    const editButtons = screen.getAllByRole('button', { name: 'Edit pickup location' });
    const textButton = editButtons[0];
    fireEvent.click(textButton);
    
    expect(document.activeElement).toBe(textButton);
  });

  it('has correct structure for label and address', () => {
    const { container } = render(<LocationPicker {...defaultProps} />);
    
    const content = container.querySelector('.location-picker__content');
    expect(content).toBeInTheDocument();
    
    const label = content?.querySelector('.location-picker__label');
    expect(label).toHaveTextContent('Picking up at');
    
    const address = content?.querySelector('.location-picker__address');
    expect(address).toHaveTextContent('315 N Main St, Atlanta GA');
  });
});