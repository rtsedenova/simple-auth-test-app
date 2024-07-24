import Header from "../components/Header";
import { EmployeeProps } from '../components/Employee';
import phone from '../../public/icons/phone.png'
import email from '../../public/icons/email.png'
import './Card.css';

const CardDetails: React.FC = () => {
  const employee: EmployeeProps | null = (() => {
    const storedEmployee = sessionStorage.getItem('employee');
    return storedEmployee ? JSON.parse(storedEmployee) : null;
  })();

  return (
    <div>
      <Header page='employee' employee={employee || undefined} />
      {employee && (
        <div className="employee-details">
          <p className="description">{employee.description}</p>
          <div className="contacts">
              <p><img src={phone} alt="Phone Icon" />{employee.phone}</p>
              <p><img src={email} alt="Email Icon" />{employee.email}</p>
          </div>
        </div>
      )}
      {!employee && (
        <div className="not-found">
          <p>Сотрудник не найден</p>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
