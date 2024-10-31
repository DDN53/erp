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
import MainLayout from '@/components/MainLayout';
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

  useEffect(() => {
    const fetchWells = async () => {
      try {
        const response = await API.viewallwells();
        setWells(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wells:", error);
        setLoading(false);
      }
    };

    fetchWells();
  }, []);

  // Prepare data for Well Types Pie Chart
  const wellTypeData = {
    labels: ['Production', 'Observation', 'Other'],
    datasets: [{
      data: [
        wells.filter(well => well.WellType === 'Production').length,
        wells.filter(well => well.WellType === 'Observation').length,
        wells.filter(well => well.WellType === 'Other').length,
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    }],
  };

  // Prepare data for Depth vs Time Line Chart
  const depthTimeData = {
    labels: wells.map(well => new Date(well.TestDate).toLocaleDateString()),
    datasets: [{
      label: 'Well Depth Over Time',
      data: wells.map(well => well.drillDepth),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }],
  };

  // Prepare data for Depth vs Yield Scatter Plot
  const depthYieldData = {
    datasets: [{
      label: 'Depth vs Yield',
      data: wells.map(well => ({
        x: well.drillDepth,
        y: well.yield
      })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }],
  };

  const scatterOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Depth (m)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Yield'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Depth vs Yield Distribution'
      }
    }
  };

  // Add new data preparation for RSC, Province, and District
  const rscData = {
    labels: [...new Set(wells.map(well => well.RSC))],
    datasets: [{
      label: 'Wells by RSC',
      data: [...new Set(wells.map(well => well.RSC))].map(rsc => 
        wells.filter(well => well.RSC === rsc).length
      ),
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const provinceData = {
    labels: [...new Set(wells.map(well => well.province))],
    datasets: [{
      label: 'Wells by Province',
      data: [...new Set(wells.map(well => well.province))].map(province => 
        wells.filter(well => well.province === province).length
      ),
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
      fill: false
    }]
  };

  const districtData = {
    labels: [...new Set(wells.map(well => well.district))],
    datasets: [{
      label: 'Wells by District',
      data: [...new Set(wells.map(well => well.district))].map(district => 
        wells.filter(well => well.district === district).length
      ),
      backgroundColor: 'rgba(153, 102, 255, 0.8)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Well Data Dashboard</h1>
        
        {/* Add new section for Regional Analysis */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          {/* RSC Distribution */}
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Wells by RSC</h2>
            <div className="h-[300px]">
              <Bar 
                data={rscData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Number of Wells' }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Province Distribution */}
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Wells by Province</h2>
            <div className="h-[300px]">
              <Line 
                data={provinceData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Number of Wells' }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* District Distribution */}
          <div className="p-4 bg-white rounded-lg shadow-lg md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Wells by District</h2>
            <div className="h-[400px]">
              <Bar 
                data={districtData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Number of Wells' }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Well Types Distribution */}
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Well Types Distribution</h2>
            <div className="h-[300px]">
              <Pie data={wellTypeData} options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }} />
            </div>
          </div>

          {/* Depth Over Time */}
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Well Depth Over Time</h2>
            <div className="h-[300px]">
              <Line 
                data={depthTimeData} 
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Depth (m)'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Depth vs Yield Scatter Plot */}
          <div className="p-4 bg-white rounded-lg shadow-lg md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Depth vs Yield Analysis</h2>
            <div className="h-[400px]">
              <Scatter 
                data={depthYieldData}
                options={{
                  ...scatterOptions,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-semibold">Total Wells</h3>
            <p className="text-2xl">{wells.length}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-semibold">Average Depth</h3>
            <p className="text-2xl">
              {(wells.reduce((acc, well) => acc + (well.drillDepth || 0), 0) / wells.length).toFixed(2)} m
            </p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg">
            <h3 className="font-semibold">Average Yield</h3>
            <p className="text-2xl">
              {(wells.reduce((acc, well) => acc + (well.yield || 0), 0) / wells.length).toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-semibold">Latest Well</h3>
            <p className="text-2xl">
              {wells.length > 0 ? wells[wells.length - 1].newWellNo : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard; 