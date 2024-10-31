// import React, { useState, useRef, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { provinces, getDistrictsByProvince } from "@/components/constants/Area";
// import { getDSDivisionByDistrict } from "@/components/constants/dsDivisions";
// import API from '@/app/api/index';
// import { toast } from 'react-toastify';

// // Custom pin icon
// const pinIcon = new L.Icon({
//   iconUrl: '/images/homeCardImages/icon.svg',
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30]
// });

// const MapWellLocation = ({ handleChange, formData }) => {
//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [selectedDSDivision, setSelectedDSDivision] = useState('');
//   const [position, setPosition] = useState(null);
//   const mapRef = useRef(null);

//   // Approximate coordinates for provinces and districts (you'll need to add more)
//   const areaCoordinates = {
//     'Central': { lat: 7.2906, lng: 80.6337, zoom: 9 },
//     'Western': { lat: 6.9271, lng: 79.8612, zoom: 9 },
//     'Southern': { lat: 6.0535, lng: 80.2210, zoom: 9 },
//     'Kandy': { lat: 7.2906, lng: 80.6337, zoom: 11 },
//     'Colombo': { lat: 6.9271, lng: 79.8612, zoom: 11 },
//     'Galle': { lat: 6.0535, lng: 80.2210, zoom: 11 },
//     // Add more coordinates for other provinces, districts, and DS divisions
//   };

//   const handleProvinceChange = (e) => {
//     const province = e.target.value;
//     setSelectedProvince(province);
//     setSelectedDistrict('');
//     setSelectedDSDivision('');
//     handleChange({ target: { name: 'selectedProvince', value: province } });
//     zoomToArea(province);
//   };

//   const handleDistrictChange = (e) => {
//     const district = e.target.value;
//     setSelectedDistrict(district);
//     setSelectedDSDivision('');
//     handleChange({ target: { name: 'selectedDistrict', value: district } });
//     zoomToArea(district);
//   };

//   const handleDSDivisionChange = (e) => {
//     const dsDivision = e.target.value;
//     setSelectedDSDivision(dsDivision);
//     handleChange({ target: { name: 'selectedDSDivision', value: dsDivision } });
//     zoomToArea(dsDivision);
//   };

//   const zoomToArea = (area) => {
//     if (mapRef.current && areaCoordinates[area]) {
//       const { lat, lng, zoom } = areaCoordinates[area];
//       mapRef.current.setView([lat, lng], zoom);
//     }
//   };

//   const MapEvents = () => {
//     useMapEvents({
//       click(e) {
//         setPosition(e.latlng);
//         handleChange({ target: { name: 'location', value: e.latlng } });
//       },
//     });
//     return null;
//   };

//   const saveLocation = async () => {
//     if (position && selectedProvince && selectedDistrict && selectedDSDivision) {
//       try {
//         const response = await API.addLocation({
//           latitude: position.lat,
//           longitude: position.lng,
//           province: selectedProvince,
//           district: selectedDistrict,
//           dsDivision: selectedDSDivision
//         });
        
//         if (response.data.success) {
//           toast.success('Location saved successfully!');
//           // Update formData with the saved location
//           handleChange({ 
//             target: { 
//               name: 'location', 
//               value: { 
//                 lat: position.lat, 
//                 lng: position.lng,
//                 province: selectedProvince,
//                 district: selectedDistrict,
//                 dsDivision: selectedDSDivision
//               } 
//             } 
//           });
//         } else {
//           toast.error('Failed to save location: ' + (response.data.message || 'Unknown error'));
//         }
//       } catch (error) {
//         console.error('Error saving location:', error);
//         toast.error('An error occurred while saving the location: ' + (error.message || 'Unknown error'));
//       }
//     } else {
//       toast.warning('Please select a location and fill in all area fields.');
//     }
//   };

//   return (
//     <div className="flex flex-col space-y-4">
//       <div className="flex space-x-4">
//         <select
//           value={selectedProvince}
//           onChange={handleProvinceChange}
//           className="p-2 border rounded"
//         >
//           <option value="">Select Province</option>
//           {provinces.map(province => (
//             <option key={province} value={province}>{province}</option>
//           ))}
//         </select>
//         <select
//           value={selectedDistrict}
//           onChange={handleDistrictChange}
//           className="p-2 border rounded"
//         >
//           <option value="">Select District</option>
//           {getDistrictsByProvince(selectedProvince).map(district => (
//             <option key={district} value={district}>{district}</option>
//           ))}
//         </select>
//         <select
//           value={selectedDSDivision}
//           onChange={handleDSDivisionChange}
//           className="p-2 border rounded"
//         >
//           <option value="">Select DS Division</option>
//           {getDSDivisionByDistrict(selectedDistrict).map(dsDivision => (
//             <option key={dsDivision} value={dsDivision}>{dsDivision}</option>
//           ))}
//         </select>
//       </div>
//       <MapContainer 
//         center={[7.8731, 80.7718]} 
//         zoom={8} 
//         style={{ height: '400px', width: '100%' }}
//         ref={mapRef}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <MapEvents />
//         {position && <Marker position={position} icon={pinIcon} />}
//       </MapContainer>
//       {position && (
//         <div>
//           <p>Selected Location: Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}</p>
//           <p>Province: {selectedProvince}</p>
//           <p>District: {selectedDistrict}</p>
//           <p>DS Division: {selectedDSDivision}</p>
//           <button 
//             onClick={saveLocation}
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             disabled={!selectedProvince || !selectedDistrict || !selectedDSDivision}
//           >
//             Save Location
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapWellLocation;


import React from 'react'

function MapWellLocation() {
  return (
    <div>
      <h1>MapWellLocation</h1>
    </div>
  )
}

export default MapWellLocation
