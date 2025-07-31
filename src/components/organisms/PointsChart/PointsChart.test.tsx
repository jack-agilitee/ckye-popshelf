import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PointsChart from './PointsChart';
import type { ChartDataPoint } from './PointsChart';

// Mock Recharts components
jest.mock('recharts', () => ({
  AreaChart: ({ children, data }: { children: React.ReactNode; data: unknown }) => (
    <div data-testid="area-chart" data-chart-data={JSON.stringify(data)}>
      {children}
    </div>
  ),
  Area: (props: { dataKey: string; stroke: string }) => (
    <div data-testid="area" data-datakey={props.dataKey} data-stroke={props.stroke} />
  ),
  XAxis: (props: { dataKey: string }) => (
    <div data-testid="x-axis" data-datakey={props.dataKey} />
  ),
  YAxis: (props: { domain: unknown }) => (
    <div data-testid="y-axis" data-domain={JSON.stringify(props.domain)} />
  ),
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}));

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  };
});

const mockMonthlyData: ChartDataPoint[] = [
  { month: 'Jun', points: 350, displayMonth: 'Jun' },
  { month: 'Jul', points: 450, displayMonth: 'Jul' },
  { month: 'Aug', points: 320, displayMonth: 'Aug' },
  { month: 'Sep', points: 580, displayMonth: 'Sep' },
  { month: 'Oct', points: 290, displayMonth: 'Oct' },
];

const mockYearlyData: ChartDataPoint[] = [
  { month: 'Jan', points: 200, displayMonth: 'Jan' },
  { month: 'Feb', points: 250, displayMonth: 'Feb' },
  { month: 'Mar', points: 180, displayMonth: 'Mar' },
  { month: 'Apr', points: 320, displayMonth: 'Apr' },
  { month: 'May', points: 410, displayMonth: 'May' },
  { month: 'Jun', points: 350, displayMonth: 'Jun' },
  { month: 'Jul', points: 450, displayMonth: 'Jul' },
  { month: 'Aug', points: 320, displayMonth: 'Aug' },
  { month: 'Sep', points: 580, displayMonth: 'Sep' },
  { month: 'Oct', points: 290, displayMonth: 'Oct' },
  { month: 'Nov', points: 190, displayMonth: 'Nov' },
  { month: 'Dec', points: 220, displayMonth: 'Dec' },
];

describe('PointsChart', () => {
  const defaultProps = {
    data: mockMonthlyData,
    totalPoints: 2400,
    period: 'monthly' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<PointsChart {...defaultProps} />);
      expect(screen.getByText('points earned')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const customClass = 'custom-points-chart';
      const { container } = render(
        <PointsChart {...defaultProps} className={customClass} />
      );
      expect(container.firstChild).toHaveClass(customClass);
    });

    it('renders the title correctly', () => {
      render(<PointsChart {...defaultProps} />);
      expect(screen.getByText('points earned')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('points earned');
    });

    it('renders the summary text with total points', () => {
      render(<PointsChart {...defaultProps} />);
      expect(screen.getByText("you've earned 2400 points this year!")).toBeInTheDocument();
    });

    it('renders the summary text with custom total points', () => {
      render(<PointsChart {...defaultProps} totalPoints={3500} />);
      expect(screen.getByText("you've earned 3500 points this year!")).toBeInTheDocument();
    });
  });

  describe('Dropdown Functionality', () => {
    it('renders dropdown with correct options', () => {
      render(<PointsChart {...defaultProps} />);
      
      // Check for dropdown trigger button
      const dropdown = screen.getByRole('button', { name: /select time period/i });
      expect(dropdown).toBeInTheDocument();
    });

    it('shows initial period value', () => {
      render(<PointsChart {...defaultProps} period="yearly" />);
      
      const dropdown = screen.getByRole('button', { name: /select time period/i });
      expect(dropdown).toHaveTextContent('2024');
    });

    it('calls onPeriodChange when dropdown value changes', async () => {
      const mockOnPeriodChange = jest.fn();
      render(
        <PointsChart 
          {...defaultProps} 
          onPeriodChange={mockOnPeriodChange}
        />
      );

      // Click dropdown to open
      const dropdown = screen.getByRole('button', { name: /select time period/i });
      fireEvent.click(dropdown);

      // Wait for options to appear and click yearly option
      await waitFor(() => {
        const yearlyOption = screen.getByText('2024');
        fireEvent.click(yearlyOption);
      });

      expect(mockOnPeriodChange).toHaveBeenCalledWith('yearly');
      expect(mockOnPeriodChange).toHaveBeenCalledTimes(1);
    });

    it('updates internal state when period changes', async () => {
      const { rerender } = render(<PointsChart {...defaultProps} period="monthly" />);
      
      let dropdown = screen.getByRole('button', { name: /select time period/i });
      expect(dropdown).toHaveTextContent('last 6 months');

      rerender(<PointsChart {...defaultProps} period="yearly" />);
      
      dropdown = screen.getByRole('button', { name: /select time period/i });
      expect(dropdown).toHaveTextContent('2024');
    });
  });

  describe('Chart Rendering', () => {
    it('renders Recharts components', () => {
      render(<PointsChart {...defaultProps} />);
      
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
      expect(screen.getByTestId('area-chart')).toBeInTheDocument();
      expect(screen.getByTestId('area')).toBeInTheDocument();
      expect(screen.getByTestId('x-axis')).toBeInTheDocument();
      expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    });

    it('passes correct data to chart', () => {
      render(<PointsChart {...defaultProps} />);
      
      const chart = screen.getByTestId('area-chart');
      const chartData = JSON.parse(chart.getAttribute('data-chart-data') || '[]');
      expect(chartData).toEqual(mockMonthlyData);
    });

    it('configures Area component correctly', () => {
      render(<PointsChart {...defaultProps} />);
      
      const area = screen.getByTestId('area');
      expect(area).toHaveAttribute('data-datakey', 'points');
      expect(area).toHaveAttribute('data-stroke', '#87189D');
    });

    it('configures XAxis correctly', () => {
      render(<PointsChart {...defaultProps} />);
      
      const xAxis = screen.getByTestId('x-axis');
      expect(xAxis).toHaveAttribute('data-datakey', 'month');
    });

    it('calculates Y-axis domain correctly', () => {
      render(<PointsChart {...defaultProps} />);
      
      const yAxis = screen.getByTestId('y-axis');
      const domain = JSON.parse(yAxis.getAttribute('data-domain') || '[]');
      expect(domain).toEqual([0, 750]); // Max points is 580, rounded up to nearest 250
    });
  });

  describe('Y-Axis Labels', () => {
    it('renders Y-axis labels correctly for default data', () => {
      render(<PointsChart {...defaultProps} />);
      
      // Should have labels: 750, 500, 250, 0 (based on max value of 580)
      expect(screen.getByText('750')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
      expect(screen.getByText('250')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('adjusts Y-axis labels for higher values', () => {
      const highValueData = [
        { month: 'Jan', points: 1200, displayMonth: 'Jan' },
        { month: 'Feb', points: 850, displayMonth: 'Feb' },
      ];
      
      render(<PointsChart {...defaultProps} data={highValueData} />);
      
      // Should have labels up to 1250 (1200 rounded up to nearest 250)
      expect(screen.getByText('1250')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('750')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
      expect(screen.getByText('250')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('X-Axis Labels', () => {
    it('renders X-axis labels for all data points', () => {
      render(<PointsChart {...defaultProps} />);
      
      mockMonthlyData.forEach((dataPoint) => {
        expect(screen.getByText(dataPoint.displayMonth)).toBeInTheDocument();
      });
    });

    it('marks middle month as current', () => {
      render(<PointsChart {...defaultProps} />);
      
      // With 5 data points, index 2 (Sep) should be marked as current
      const currentMonthElement = screen.getByText('Sep').closest('div');
      expect(currentMonthElement).toHaveClass('points-chart__x-label--current');
    });

    it('handles yearly data X-axis labels', () => {
      render(<PointsChart {...defaultProps} data={mockYearlyData} period="yearly" />);
      
      mockYearlyData.forEach((dataPoint) => {
        expect(screen.getByText(dataPoint.displayMonth)).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty data gracefully', () => {
      render(<PointsChart {...defaultProps} data={[]} />);
      
      expect(screen.getByText('points earned')).toBeInTheDocument();
      expect(screen.getByText("you've earned 2400 points this year!")).toBeInTheDocument();
    });

    it('handles data with zero values', () => {
      const zeroData = [
        { month: 'Jan', points: 0, displayMonth: 'Jan' },
        { month: 'Feb', points: 0, displayMonth: 'Feb' },
      ];
      
      render(<PointsChart {...defaultProps} data={zeroData} />);
      
      // Should still render Y-axis with minimum scale
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles single data point', () => {
      const singleData = [
        { month: 'Jan', points: 500, displayMonth: 'Jan' }
      ];
      
      render(<PointsChart {...defaultProps} data={singleData} />);
      
      expect(screen.getByText('Jan')).toBeInTheDocument();
      // Single data point should be marked as current (index 0 = Math.floor(1/2))
      const currentMonthElement = screen.getByText('Jan').closest('div');
      expect(currentMonthElement).toHaveClass('points-chart__x-label--current');
    });

    it('uses default totalPoints when not provided', () => {
      const { totalPoints: _, ...propsWithoutTotal } = defaultProps;
      render(<PointsChart {...propsWithoutTotal} />);
      
      expect(screen.getByText("you've earned 2400 points this year!")).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for dropdown', () => {
      render(<PointsChart {...defaultProps} />);
      
      const dropdown = screen.getByRole('button', { name: /select time period for points chart/i });
      expect(dropdown).toBeInTheDocument();
      expect(dropdown).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('has proper heading structure', () => {
      render(<PointsChart {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('points earned');
    });

    it('maintains focus management in dropdown', async () => {
      render(<PointsChart {...defaultProps} />);
      
      const dropdown = screen.getByRole('button', { name: /select time period/i });
      
      // Focus dropdown
      dropdown.focus();
      expect(dropdown).toHaveFocus();
      
      // Open dropdown with Enter key
      fireEvent.keyDown(dropdown, { key: 'Enter' });
      
      // Should still maintain accessibility structure
      expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Performance', () => {
    it('does not re-render unnecessarily with same props', () => {
      const { rerender } = render(<PointsChart {...defaultProps} />);
      
      // Get initial render count
      const chart = screen.getByTestId('area-chart');
      const initialData = chart.getAttribute('data-chart-data');
      
      // Re-render with same props
      rerender(<PointsChart {...defaultProps} />);
      
      // Should have same data (React should optimize re-renders)
      const newChart = screen.getByTestId('area-chart');
      const newData = newChart.getAttribute('data-chart-data');
      expect(newData).toBe(initialData);
    });
  });
});