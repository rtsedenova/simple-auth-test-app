export interface EmployeeCardProps {
  firstName: string;
  lastName: string;
  imageUrl: string;
  phone: string;
  email: string;
  position: string;
  description: string;
  likes: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ firstName, lastName, imageUrl, phone, email, position, description, likes }) => {
  return (
    <div className="employee-card">
      <img src={imageUrl} alt={`${firstName} ${lastName}`} />
      <h2>{firstName} {lastName}</h2>
      <p>Position: {position}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Description: {description}</p>
      <p>Likes: {likes}</p>
    </div>
  );
};

export default EmployeeCard;
