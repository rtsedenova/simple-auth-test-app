import Header from '../components/Header'; 
import Employees from '../components/Employees';

const Home: React.FC = () => {
  return (
    <div>
      <Header page={'home'}/>
      <h2>Home</h2>
      <Employees/>
    </div>
  );
};

export default Home;
