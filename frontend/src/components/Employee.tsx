import { useNavigate } from 'react-router-dom';
import './Employee.css';
import LikeButton from './Like'; 

export interface EmployeeProps {
  _id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  position: string;
  phone: string;
  email: string;
  description: string;
}

const Employee: React.FC<EmployeeProps> = ({ _id, firstName, lastName, imageUrl }) => {
  const navigate = useNavigate();

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.currentTarget as HTMLDivElement;
    const employeeId = target.getAttribute('data-id');
    if (employeeId) {
      sessionStorage.setItem('employeeId', employeeId);
      navigate(`/employee/${employeeId}`);
    }
  };

  return (
    <div className="employee-card" data-id={_id} onClick={handleCardClick}>
      <img src={imageUrl} alt="img" className="employee-image" />
      <h2>{firstName} {lastName}</h2>
      <div className="like-button-container">
        <LikeButton />
      </div>
    </div>
  );
};

export default Employee;
