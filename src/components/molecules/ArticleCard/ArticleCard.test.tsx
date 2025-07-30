import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleCard from './ArticleCard';

describe('ArticleCard', () => {
  const defaultProps = {
    title: 'galaxy Glitter Art',
    subtitle: 'Out of this world creations',
    imageUrl: '/test-image.jpg',
    imageAlt: 'Test image',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(<ArticleCard {...defaultProps} />);
    expect(screen.getByText('galaxy Glitter Art')).toBeInTheDocument();
    expect(screen.getByText('Out of this world creations')).toBeInTheDocument();
  });

  it('renders without onClick prop', () => {
    const { container } = render(<ArticleCard {...defaultProps} />);
    const article = container.querySelector('article');
    expect(article).not.toHaveAttribute('role');
    expect(article).not.toHaveAttribute('tabIndex');
  });

  it('renders as button when onClick is provided', () => {
    const onClick = jest.fn();
    const { container } = render(
      <ArticleCard {...defaultProps} onClick={onClick} />
    );
    const article = container.querySelector('article');
    expect(article).toHaveAttribute('role', 'button');
    expect(article).toHaveAttribute('tabIndex', '0');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<ArticleCard {...defaultProps} onClick={onClick} />);
    
    const article = screen.getByRole('button');
    fireEvent.click(article);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter key is pressed', () => {
    const onClick = jest.fn();
    render(<ArticleCard {...defaultProps} onClick={onClick} />);
    
    const article = screen.getByRole('button');
    fireEvent.keyDown(article, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Space key is pressed', () => {
    const onClick = jest.fn();
    render(<ArticleCard {...defaultProps} onClick={onClick} />);
    
    const article = screen.getByRole('button');
    fireEvent.keyDown(article, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick for other keys', () => {
    const onClick = jest.fn();
    render(<ArticleCard {...defaultProps} onClick={onClick} />);
    
    const article = screen.getByRole('button');
    fireEvent.keyDown(article, { key: 'Tab' });
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ArticleCard {...defaultProps} className="custom-class" />
    );
    const article = container.querySelector('article');
    expect(article).toHaveClass('custom-class');
  });

  it('sets background image style correctly', () => {
    const { container } = render(<ArticleCard {...defaultProps} />);
    const imageDiv = container.querySelector('.article-card__image');
    expect(imageDiv).toHaveStyle(`background-image: url('${defaultProps.imageUrl}')`);
  });

  it('uses imageAlt for aria-label on image', () => {
    render(<ArticleCard {...defaultProps} />);
    const imageDiv = screen.getByRole('img');
    expect(imageDiv).toHaveAttribute('aria-label', defaultProps.imageAlt);
  });

  it('uses empty string for imageAlt when not provided', () => {
    const propsWithoutAlt = {
      title: defaultProps.title,
      subtitle: defaultProps.subtitle,
      imageUrl: defaultProps.imageUrl,
    };
    render(<ArticleCard {...propsWithoutAlt} />);
    const imageDiv = screen.getByRole('img');
    expect(imageDiv).toHaveAttribute('aria-label', '');
  });

  it('creates proper aria-label for the article', () => {
    const onClick = jest.fn();
    render(<ArticleCard {...defaultProps} onClick={onClick} />);
    const article = screen.getByRole('button');
    expect(article).toHaveAttribute(
      'aria-label',
      `${defaultProps.title}. ${defaultProps.subtitle}`
    );
  });

  it('renders arrow icon', () => {
    render(<ArticleCard {...defaultProps} />);
    const arrow = screen.getByAltText('');
    expect(arrow).toHaveAttribute('src', '/arrow.svg');
  });

  it('handles edge cases with long text', () => {
    const longProps = {
      ...defaultProps,
      title: 'This is a very long title that should be truncated with ellipsis',
      subtitle: 'This is also a very long subtitle that should be truncated with ellipsis in the component',
    };
    render(<ArticleCard {...longProps} />);
    expect(screen.getByText(longProps.title)).toBeInTheDocument();
    expect(screen.getByText(longProps.subtitle)).toBeInTheDocument();
  });
});