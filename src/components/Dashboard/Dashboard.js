import './Dashboard.css';
import icon from '../../icon.png';

function Dashboard() {
  return (
    <nav className="container--dashboard">
      <img className="img--github-icon" src={icon}></img>
      <h1 className="h1--title">REPOS FOR MVST</h1>
    </nav>
  );
}

export default Dashboard;
