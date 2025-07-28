import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentBlock from './ContentBlock';

describe('ContentBlock', () => {
  const defaultProps = {
    title: 'Highlights',
    items: [
      '5.5oz 100% ring spun cotton tee is super soft and comfortable',
      'Vintage washed and garment dyed for a retro look and feel',
      'No shrink comfort for a dependable fit wash after wash',
      'Cotton sourced from American farms'
    ]
  };

  it('renders with title and items', () => {
    render(<ContentBlock {...defaultProps} />);
    
    expect(screen.getByText('Highlights')).toBeInTheDocument();
    expect(screen.getByText('5.5oz 100% ring spun cotton tee is super soft and comfortable')).toBeInTheDocument();
    expect(screen.getByText('Vintage washed and garment dyed for a retro look and feel')).toBeInTheDocument();
    expect(screen.getByText('No shrink comfort for a dependable fit wash after wash')).toBeInTheDocument();
    expect(screen.getByText('Cotton sourced from American farms')).toBeInTheDocument();
  });

  it('renders correct number of list items', () => {
    render(<ContentBlock {...defaultProps} />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  it('applies custom className', () => {
    const { container } = render(
      <ContentBlock {...defaultProps} className="custom-class" />
    );
    
    const contentBlock = container.firstChild as HTMLElement;
    expect(contentBlock).toHaveClass('custom-class');
  });

  it('renders with empty items array', () => {
    render(<ContentBlock title="Empty List" items={[]} />);
    
    expect(screen.getByText('Empty List')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('renders with single item', () => {
    render(<ContentBlock title="Single Item" items={['Only one item']} />);
    
    expect(screen.getByText('Single Item')).toBeInTheDocument();
    expect(screen.getByText('Only one item')).toBeInTheDocument();
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
  });

  it('renders with long text items', () => {
    const longItems = [
      'This is a very long text item that should wrap properly within the component boundaries and maintain proper spacing',
      'Another lengthy description that contains multiple lines of text to ensure the component handles overflow correctly'
    ];
    
    render(<ContentBlock title="Long Content" items={longItems} />);
    
    expect(screen.getByText(longItems[0])).toBeInTheDocument();
    expect(screen.getByText(longItems[1])).toBeInTheDocument();
  });

  it('renders title as h3 element', () => {
    render(<ContentBlock {...defaultProps} />);
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Highlights');
  });

  it('renders items in correct order', () => {
    render(<ContentBlock {...defaultProps} />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('5.5oz 100% ring spun cotton tee is super soft and comfortable');
    expect(listItems[1]).toHaveTextContent('Vintage washed and garment dyed for a retro look and feel');
    expect(listItems[2]).toHaveTextContent('No shrink comfort for a dependable fit wash after wash');
    expect(listItems[3]).toHaveTextContent('Cotton sourced from American farms');
  });

  it('handles special characters in items', () => {
    const specialItems = [
      'Item with "quotes"',
      'Item with & ampersand',
      'Item with <brackets>',
      'Item with © copyright symbol'
    ];
    
    render(<ContentBlock title="Special Characters" items={specialItems} />);
    
    specialItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});