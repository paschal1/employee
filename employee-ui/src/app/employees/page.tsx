'use client';
import { useEffect, useState } from 'react';
import { Employee, fetchEmployees } from '@/lib/api';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchEmployees(page, 20);
        setEmployees(data.content);
        setTotalPages(data.totalPages);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">ID</th>  
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Job</th>
                <th className="border border-gray-300 p-2">Department</th>
                <th className="border border-gray-300 p-2">Location</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{emp.id}</td>
                  <td className="border border-gray-300 p-2">{emp.firstName} {emp.lastName}</td>
                  <td className="border border-gray-300 p-2">{emp.email}</td>
                  <td className="border border-gray-300 p-2">{emp.phoneNumber}</td>
                  <td className="border border-gray-300 p-2">{emp.jobTitle}</td>
                  <td className="border border-gray-300 p-2">{emp.department}</td>
                  <td className="border border-gray-300 p-2">{emp.city}, {emp.state}, {emp.country}</td>
                    <td className="border border-gray-300 p-2">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                        <button className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page + 1} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
              disabled={page + 1 >= totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
