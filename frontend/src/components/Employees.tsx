import React, { useEffect, useState } from 'react';
import Employee, {EmployeeProps} from './Employee';
import './Employees.css';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  useEffect(() => {
    fetch(`http://localhost:3000/employees?_page=${currentPage}&_limit=${cardsPerPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
  }, [currentPage]);

  const totalPages = Math.ceil(employees.length / cardsPerPage);

  function handlePrevPage() {
    setCurrentPage(prevPage => prevPage - 1);
  }

  function handleNextPage() {
    setCurrentPage(prevPage => prevPage + 1);
  }

  return (
    <div className='col'>
      <div className="employees-wrapper">
        <div className="employees-container">
          {employees.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((employee) => (
            <Employee key={employee._id} {...employee} />
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Назад</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Вперед</button>
      </div>
    </div>
  );
};

export default Employees;
