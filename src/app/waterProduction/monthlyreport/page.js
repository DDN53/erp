// 'use client'
// import React, { useState, useEffect, Suspense } from 'react';
// import dynamic from 'next/dynamic';
// import * as XLSX from 'xlsx';
// import API from '@/app/api/index';

// // Dynamically import the WellReport component
// const WellReport = dynamic(() => import('./WellReport'), {
//   suspense: true,
// });

// export default function MonthlyReport() {
//   const [wellData, setWellData] = useState([]);

//   // useEffect(() => {
//   //   fetchWellData();
//   // }, []);

//   const fetchWellData = async () => {
//     try {
//       // const response = await API.viewallmonthlydata();  // Adjust the API endpoint
//       setWellData(response.data);
//     } catch (error) {
//       console.error('Error fetching well data:', error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <Suspense fallback={<div>Loading...</div>}>
//         <WellReport wellData={wellData} />
//       </Suspense>
//     </div>
//   );
// }

// // Add getStaticProps for ISR
// export async function getStaticProps() {
//   // const response = await API.viewallmonthlydata(); // Fetch data at build time
//   return {
//     props: {
//       initialWellData: response.data,
//     },
//     revalidate: 10, // Revalidate every 10 seconds
//   };
// }
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}

