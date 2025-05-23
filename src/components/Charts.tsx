import React from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { getActivityTypeLabel } from '../utils/helpers';
import { ActivityType } from '../context/CarbonDataContext';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler
);

// Professional chart theme
const chartTheme = {
  fontFamily: '"-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
  fontSize: 12,
  fontColor: '#666',
  backgroundColor: '#fff',
  gridColor: '#f0f0f0',
  tooltipBackgroundColor: 'rgba(0, 0, 0, 0.75)',
  tooltipTitleColor: '#fff',
  tooltipBodyColor: '#fff',
  tooltipBorderColor: 'rgba(0, 0, 0, 0)',
  tooltipBorderWidth: 0,
  tooltipCornerRadius: 4,
  tooltipPadding: 8,
  tooltipCaretSize: 6,
  legendPosition: 'bottom' as const
};

// Apply theme to ChartJS defaults
ChartJS.defaults.font.family = chartTheme.fontFamily;
ChartJS.defaults.font.size = chartTheme.fontSize;
ChartJS.defaults.color = chartTheme.fontColor;
ChartJS.defaults.plugins.tooltip.backgroundColor = chartTheme.tooltipBackgroundColor;
ChartJS.defaults.plugins.tooltip.titleColor = chartTheme.tooltipTitleColor;
ChartJS.defaults.plugins.tooltip.bodyColor = chartTheme.tooltipBodyColor;
ChartJS.defaults.plugins.tooltip.borderColor = chartTheme.tooltipBorderColor;
ChartJS.defaults.plugins.tooltip.borderWidth = chartTheme.tooltipBorderWidth;
ChartJS.defaults.plugins.tooltip.cornerRadius = chartTheme.tooltipCornerRadius;
ChartJS.defaults.plugins.tooltip.padding = chartTheme.tooltipPadding;
ChartJS.defaults.plugins.tooltip.caretSize = chartTheme.tooltipCaretSize;

// Define professional chart colors
const chartColors = [
  'rgba(76, 175, 80, 0.8)',   // Primary green
  'rgba(33, 150, 243, 0.8)',   // Blue
  'rgba(255, 152, 0, 0.8)',    // Orange
  'rgba(156, 39, 176, 0.8)',   // Purple
  'rgba(0, 188, 212, 0.8)',    // Cyan
  'rgba(233, 30, 99, 0.8)'     // Pink
];

const chartBorderColors = [
  'rgba(76, 175, 80, 1)',
  'rgba(33, 150, 243, 1)',
  'rgba(255, 152, 0, 1)',
  'rgba(156, 39, 176, 1)',
  'rgba(0, 188, 212, 1)',
  'rgba(233, 30, 99, 1)'
];

// Comparison colors
const comparisonColors = {
  user: 'rgba(76, 175, 80, 0.8)',      // User (green)
  city: 'rgba(33, 150, 243, 0.8)',      // City (blue)
  country: 'rgba(255, 152, 0, 0.8)',    // Country (orange)
  average: 'rgba(156, 39, 176, 0.8)',   // Average person (purple)
  global: 'rgba(0, 188, 212, 0.8)'      // Global (cyan)
};

const comparisonBorderColors = {
  user: 'rgba(76, 175, 80, 1)',
  city: 'rgba(33, 150, 243, 1)',
  country: 'rgba(255, 152, 0, 1)',
  average: 'rgba(156, 39, 176, 1)',
  global: 'rgba(0, 188, 212, 1)'
};

interface PieChartProps {
  data: Array<{
    type: ActivityType;
    value: number;
  }>;
  title?: string;
}

export const PieChart: React.FC<PieChartProps> = ({ data, title = 'Carbon Footprint by Activity' }) => {
  // Process data for the pie chart
  const chartData = {
    labels: data.map(item => getActivityTypeLabel(item.type)),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: chartColors,
        borderColor: chartBorderColors,
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: chartBorderColors,
        hoverBackgroundColor: chartColors.map(color => color.replace('0.8', '0.9')),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: chartTheme.legendPosition,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value.toFixed(2)} kg CO2e (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return <Pie data={chartData} options={options} />;
};

interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
    type?: 'user' | 'city' | 'country' | 'average' | 'global';
  }>;
  title?: string;
  yAxisLabel?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  title = 'Carbon Emissions Comparison',
  yAxisLabel = 'kg CO2e'
}) => {
  // Process data for the bar chart
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: yAxisLabel,
        data: data.map(item => item.value),
        backgroundColor: data.map(item => 
          item.type ? comparisonColors[item.type] : chartColors[0]
        ),
        borderColor: data.map(item => 
          item.type ? comparisonBorderColors[item.type] : chartBorderColors[0]
        ),
        borderWidth: 2,
        borderRadius: 6,
        hoverBorderWidth: 3,
        barThickness: 40,
        maxBarThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw || 0;
            return `${yAxisLabel}: ${value.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: chartTheme.gridColor,
          drawBorder: false,
        },
        ticks: {
          padding: 10,
          font: {
            size: 11,
          },
        },
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            size: 13,
            weight: 'normal' as const,
          },
          padding: {
            bottom: 10
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          padding: 10,
          font: {
            size: 11,
          },
        }
      }
    },
    animation: {
      duration: 2000
    }
  };

  return <Bar data={chartData} options={options} />;
};
