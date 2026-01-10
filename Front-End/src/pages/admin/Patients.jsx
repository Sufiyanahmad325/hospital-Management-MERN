import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever } from "react-icons/md";
import { deletePatientFromUser } from '../../reduxtollkit/hospitalManagementSlice';

const PatientCards = () => {
  // 1. State for patients
  const [patients, setPatients] = useState([]);

  const {totalPatients} = useSelector((state)=>state.hospitalManagement)

  const dispatch = useDispatch()

const handleDeletePatient =async(id)=>{
  try {
    let res =await dispatch(deletePatientFromUser({id:id})).unwrap()
  } catch (error) {
      console.log(error)
  }
}

  // Demo Data (Jo aapne format diya tha)
  useEffect(() => {
    setPatients([
      {
        "name": "Noman",
        "email": "sufiyanDemo@gmail.com",
        "age": "40",
        "gender": "male",
        "address": "Delhi, India",
        "phone": "9876543210"
      },
      {
        "name": "Ayesha",
        "email": "ayesha@demo.com",
        "age": "28",
        "gender": "female",
        "address": "Mumbai",
        "phone": "9999999999"
      },
      {
        "name": "Rahul",
        "email": "rahul@test.com",
        "age": "35",
        "gender": "male",
        "address": "Patna",
        "phone": "8888888888"
      }
    ]);
  }, []);

  return (
    <div className="h-screen bg-blue-400 p-6 w-full sm:w-[75vw] overflow-y-auto">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">Patient Directory</h1>
          <p className="text-gray-100 text-sm">Total Patients: {patients.length}</p>
        </div>
       
      </div>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {totalPatients?.map((patient, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow relative overflow-hidden"
          >
            {/* Gender Badge */}
            <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-lg ${patient.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
              {patient.gender}
            </div>

            <div className="flex items-center gap-4 mb-4">
              {/* Avatar Placeholder */}
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {patient.name[0].toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg capitalize">{patient.name}</h3>
                <p className="text-gray-500 text-xs">{patient.email}</p>
              </div>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Phone:</span>
                <span className="text-gray-700 font-medium">{patient.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Age:</span>
                <span className="text-gray-700 font-medium">{patient.age} Years</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Address:</span>
                <span className="text-gray-700 mt-1 line-clamp-1 italic">{patient.address}</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2 ">
              <button
              onClick={()=>handleDeletePatient(patient._id)}
               className="flex w-full py-1 rounded-md justify-center border-2 border-gray-300 hover:bg-blue-200 transition-all ">
               <MdDeleteForever className='font-bold text-2xl' />
              </button>
              
            </div>
          </div>
        ))}
      </div>

      {/* Extra space for scrolling */}
      <div className="h-20"></div>
    </div>
  );
};

export default PatientCards;