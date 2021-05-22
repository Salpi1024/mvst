import './Dashboard.css';
import icon from './icon.png';

function Dashboard() {
  return (
    <div className="Dashboard">
      <nav className="top">
        <img className="github-icon" src={icon}></img>
        <h1 className="title">REPOS FOR MVST</h1>
      </nav>
    </div>
  );
}

export default Dashboard;
