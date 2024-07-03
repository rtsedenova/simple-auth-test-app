import { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeCard from '../components/Employee';
import { EmployeeCardProps } from '../components/Employee';

const EmployeesContainer: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeCardProps[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getemployees', {
          // headers: {
          //   'Accept': 'application/json'
          // }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="cards">
      {employees.map((employee, index) => (
        <EmployeeCard
          key={index}
          firstName={employee.firstName}
          lastName={employee.lastName}
          imageUrl={employee.imageUrl}
          phone={employee.phone}
          email={employee.email}
          position={employee.position}
          description={employee.description}
          likes={employee.likes}
        />
      ))}
    </div>
  );
};

export default EmployeesContainer;
