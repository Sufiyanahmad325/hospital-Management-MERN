import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addDepartment, editDepartment, getAllDepartments, setEditDepartment } from '../../reduxtollkit/hospitalManagementSlice';
import { FaEdit, FaPlus, FaHospitalUser } from 'react-icons/fa';

const Departments = () => {
  const [nameOfDepartment, setNameOfDepartment] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const { totalDepartments, isEditDepartment } = useSelector((state) => state.hospitalManagement)

  const handleAddDepartments = async () => {
    if (isEditDepartment != null) {
      let response = await dispatch(editDepartment({ id: isEditDepartment._id, nameOfDepartment: nameOfDepartment, description: description })).unwrap()
      if (response.success) {
        resetForm()
        dispatch(getAllDepartments())
      }
      return
    }
    let details = { nameOfDepartment, description }
    await dispatch(addDepartment(details)).unwrap()
    resetForm()
    dispatch(getAllDepartments())
  }

  const resetForm = () => {
    setNameOfDepartment('')
    setDescription('')
    dispatch(setEditDepartment(null))
  }

  const handleEditDepartment = (ele) => {
    dispatch(setEditDepartment(ele))
  }

  useEffect(() => {
    if (isEditDepartment != null) {
      setNameOfDepartment(isEditDepartment.nameOfDepartment)
      setDescription(isEditDepartment.description)
    }
  }, [isEditDepartment])

  return (
    <div className="min-h-screen bg-[#b3d4f6] p-6 space-y-6 sm:w-[75vw] sm:overflow-y-auto sm:h-screen custom-scrollbar">

      {/* PAGE TITLE */}
      <div className="flex items-center gap-3 mb-2">
        <FaHospitalUser className="text-3xl text-blue-600" />
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Departments
        </h1>
      </div>

      <div className="flex flex-col gap-6">

        {/* ================= ADD / EDIT DEPARTMENT FORM ================= */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-lg font-bold flex items-center gap-2 ${isEditDepartment ? 'text-orange-500' : 'text-blue-600'}`}>
              {isEditDepartment ? <FaEdit /> : <FaPlus />}
              {isEditDepartment ? 'Update Department' : 'Create New Department'}
            </h2>
            {isEditDepartment && (
              <button onClick={resetForm} className="text-xs text-gray-400 hover:text-red-500 font-bold uppercase underline">
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">
                Department Name
              </label>
              <input
                value={nameOfDepartment}
                onChange={(e) => setNameOfDepartment(e.target.value)}
                placeholder="e.g. Cardiology, Neurology"
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">
                Short Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly explain the department's focus..."
                rows="1"
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => handleAddDepartments()}
              className={`w-full sm:w-auto px-10 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${
                isEditDepartment 
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
              }`}>
              {isEditDepartment ? 'Save Changes' : 'Confirm & Add'}
            </button>
          </div>
        </div>

        {/* ================= ALL DEPARTMENTS TABLE ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-700">All Active Departments</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white text-left border-b border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Name</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {
                  Array.isArray(totalDepartments) && totalDepartments.length > 0 ? (
                    totalDepartments.map((ele, ind) => (
                      <tr className="hover:bg-blue-50/30 transition-colors" key={ind}>
                        <td className="p-4">
                          <span className="font-bold text-gray-700 block">{ele.nameOfDepartment}</span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-500 line-clamp-1 italic">{ele.description}</p>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => { handleEditDepartment(ele) }}
                            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-bold text-sm flex items-center gap-2 mx-auto">
                            <FaEdit size={14}/> Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-10 text-center text-gray-400 italic">
                        No departments registered yet.
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Departments;