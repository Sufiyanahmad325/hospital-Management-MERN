import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addDepartment, editDepartment, getAllDepartments, setEditDepartment } from '../../reduxtollkit/hospitalManagementSlice';

const Departments = () => {
  const [nameOfDepartment, setNameOfDepartment] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const { totalDepartments, isEditDepartment } = useSelector((state) => state.hospitalManagement)

  const handleAddDepartments = async () => {
    if (isEditDepartment != null) {
      let response = await dispatch(editDepartment({ id: isEditDepartment._id, nameOfDepartment: nameOfDepartment, description: description })).unwrap()
      if (response.success) {
        setNameOfDepartment('')
        setDescription('')
        dispatch(getAllDepartments())
      }
      return
    }
    let details = { nameOfDepartment, description }
    let a = await dispatch(addDepartment(details)).unwrap()
    dispatch(getAllDepartments())
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
    <div className="min-h-screen bg-blue-400 p-6 space-y-6 sm:w-[75vw] sm:overflow-y-auto sm:h-screen">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-gray-800">
        Department Management
      </h1>

      <div className="grid grid-cols-1 sm:flex sm:flex-col gap-3">

        {/* ================= ADD DEPARTMENT ================= */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-blue-600 mb-4">
            Add New Department
          </h2>

          <div className="space-y-4 ">
            <div>
              <label className=" mb-1 font-medium">
                Department Name
              </label>
              <input
                value={nameOfDepartment}
                onChange={(e) => setNameOfDepartment(e.target.value)}
                placeholder="Enter department name"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className=" mb-1 font-medium">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter department description"
                className="border p-2 rounded w-full"
              />
            </div>

            <button
              onClick={() => handleAddDepartments()}
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Department
            </button>
          </div>
        </div>

        {/* ================= ALL DEPARTMENTS ================= */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-blue-600 mb-4">
            All Departments
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border">

              <thead className="bg-green-100">
                <tr>
                  <th className="border p-2">Department Name</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {
                  Array.isArray(totalDepartments) && totalDepartments.map((ele, ind) => (
                    <tr className="hover:bg-gray-50" key={ind}>
                      <td className="border p-2">{ele.nameOfDepartment}</td>
                      <td className="border p-2">
                        {ele.description}
                      </td>
                      <td className="border p-2 text-center ">
                        <button
                          onClick={() => { handleEditDepartment(ele) }}
                          className="bg-blue-300 text-black px-3 py-1 rounded hover:bg-blue-400 sm:px-6">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
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
