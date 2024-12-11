"use client"

import React, { useState, useEffect } from 'react';
import { Pie, Line, Scatter, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

import API from "@/app/api/index";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const [wells, setWells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('depth');
  const [selectedWellType, setSelectedWellType] = useState('all');

  useEffect(() => {
    const fetchWells = async () => {
      try {
        const response = await API.viewallwells();
        const filteredWells = selectedWellType === 'all' 
          ? response.data 
          : response.data.filter(well => well.selectedWellType === selectedWellType);
        setWells(filteredWells);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wells:", error);
        setLoading(false);
      }
    };

    fetchWells();
  }, [selectedWellType]);


  // Modern donut chart for well types
  const wellTypeData = {
    labels: ['Production', 'Observation', 'Other'],
    datasets: [{
      data: [
        wells.filter(well => well.selectedWellType === 'Production').length,
        wells.filter(well => well.selectedWellType === 'Observation').length,
        wells.filter(well => well.selectedWellType === 'Other').length,
      ],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)', // Indigo
        'rgba(14, 165, 233, 0.8)', // Sky blue
        'rgba(249, 115, 22, 0.8)', // Orange
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(14, 165, 233, 1)', 
        'rgba(249, 115, 22, 1)',
      ],
      borderWidth: 2,
    }],
  };

  // Interactive time series chart
  const getTimeFilteredData = () => {
    let filteredWells = [...wells];
    
    if (selectedTimeRange !== 'all') {
      const cutoffDate = new Date();
      if (selectedTimeRange === 'month') {
        cutoffDate.setMonth(cutoffDate.getMonth() - 1);
      } else if (selectedTimeRange === 'quarter') {
        cutoffDate.setMonth(cutoffDate.getMonth() - 3);
      } else if (selectedTimeRange === 'year') {
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
      }
      
      filteredWells = wells.filter(well => new Date(well.TestDate) >= cutoffDate);
    }

    return {
      labels: filteredWells.map(well => new Date(well.TestDate).toLocaleDateString()),
      datasets: [{
        label: selectedMetric === 'depth' ? 'Well Depth (m)' : 'Well Yield',
        data: filteredWells.map(well => selectedMetric === 'depth' ? well.drillDepth : well.yield),
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }]
    };
  };

  // Modern scatter plot with animation
  const depthYieldData = {
    datasets: [{
      label: 'Depth vs Yield Distribution',
      data: wells.map(well => ({
        x: well.drillDepth,
        y: well.yield
      })),
      backgroundColor: 'rgba(99, 102, 241, 0.6)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 1,
      pointRadius: 6,
      pointHoverRadius: 8,
    }],
  };

  const scatterOptions = {
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Depth (m)',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Yield',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)'
        }
      }
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        }
      },
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  // Enhanced statistics with trends
  const getEnhancedStats = () => {
    if (!wells.length) return null;
    
    const currentMonth = new Date().getMonth();
    const lastMonth = new Date().setMonth(currentMonth - 1);
    
    const currentWells = wells.filter(w => new Date(w.TestDate).getMonth() === currentMonth);
    const lastMonthWells = wells.filter(w => new Date(w.TestDate).getMonth() === lastMonth);
    
    const growthRate = ((currentWells.length - lastMonthWells.length) / lastMonthWells.length * 100).toFixed(1);
    
    return {
      totalWells: wells.length,
      averageDepth: (wells.reduce((acc, well) => acc + (well.drillDepth || 0), 0) / wells.length).toFixed(1),
      maxDepth: Math.max(...wells.map(w => w.drillDepth || 0)).toFixed(1),
      averageYield: (wells.reduce((acc, well) => acc + (well.yield || 0), 0) / wells.length).toFixed(1),
      monthlyGrowth: growthRate,
      wellTypes: {
        production: wells.filter(w => w.selectedWellType === 'Production').length,
        observation: wells.filter(w => w.selectedWellType === 'Observation').length,
        other: wells.filter(w => w.selectedWellType === 'Other').length
      }
    };
  };

  // Modern stat card with animations
  const StatCard = ({ title, value, subtext, icon, trend }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
            )}
          </div>
          {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
    
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    
    );
  }

  const stats = getEnhancedStats();

  return (
    
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Well Analytics Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <select 
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <select 
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800"
              value={selectedWellType}
              onChange={(e) => setSelectedWellType(e.target.value)}
            >
              <option value="all">All Well Types</option>
              <option value="Production">Production</option>
              <option value="Observation">Observation</option>
              <option value="Other">Other</option>
            </select>
            <span className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Modern Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <StatCard
            title="Total Wells"
            value={stats?.totalWells || 0}
            subtext="Active wells in system"
            icon="🎯"
            trend={parseInt(stats?.monthlyGrowth) || 0}
          />
         
          <StatCard
            title="Average Yield"
            value={stats?.averageYield || 0}
            subtext="Cubic meters per hour"
            icon="💧"
          />
          <StatCard
            title="Production Wells"
            value={stats?.wellTypes.production || 0}
            subtext={`${((stats?.wellTypes.production || 0) / (stats?.totalWells || 1) * 100).toFixed(1)}% of total`}
            icon="⚡"
          />
        </div>

        {/* Interactive Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Well Distribution</h2>
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 text-sm"
                  onClick={() => {/* Add filter logic */}}
                >
                  Filter
                </button>
              </div>
            </div>
            <div className="h-[300px]">
              <Pie 
                data={wellTypeData} 
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      padding: 12,
                      titleFont: { size: 14 },
                      bodyFont: { size: 13 }
                    }
                  },
                  animation: {
                    animateScale: true,
                    animateRotate: true
                  }
                }} 
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Time Series Analysis</h2>
              <select 
                className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="depth">Depth</option>
                <option value="yield">Yield</option>
              </select>
            </div>
            <div className="h-[300px]">
              <Line 
                data={getTimeFilteredData()} 
                options={{
                  maintainAspectRatio: false,
                  animations: {
                    tension: {
                      duration: 1000,
                      easing: 'linear',
                      from: 0.8,
                      to: 0.4,
                      loop: false
                    }
                  },
                  plugins: {
                    legend: { position: 'bottom' }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0,0,0,0.1)'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Scatter Plot Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Depth vs Yield Analysis</h2>
          <div className="h-[400px]">
            <Scatter data={depthYieldData} options={scatterOptions} />
          </div>
        </div>
      </div>
  
  );
}

export default Dashboard;