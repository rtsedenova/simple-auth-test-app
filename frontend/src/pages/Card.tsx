import { useEffect, useState } from 'react';
import Header from "../components/Header";
import { EmployeeProps } from '../components/Employee';

const CardDetails: React.FC = () => {
  const [employee, setEmployee] = useState<EmployeeProps | null>(null);
  const employeeId = sessionStorage.getItem('employeeId');

  useEffect(() => {
    const fetchEmployee = async () => {
      if (employeeId) {
        try {
          const response = await fetch(`http://localhost:3000/employees/${employeeId}`);
          const data = await response.json();
          setEmployee(data);
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      }
    };

    fetchEmployee();
  }, [employeeId]);

  return (
    <div>
      <Header page='employee' />
      {employee && (
        <div>
          <img src={employee.imageUrl} alt={`${employee.firstName} ${employee.lastName}`} />
          <h2>{employee.firstName} {employee.lastName}</h2>
          <p>{employee.position}</p>
          <p>{employee.phone}</p>
          <p>{employee.email}</p>
          <p>{employee.description}</p>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
  