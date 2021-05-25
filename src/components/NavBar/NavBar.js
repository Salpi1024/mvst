import './NavBar.css';
import icon from '../../icon.png';

function NavBar() {
  return (
    <nav className="container--navbar">
      <img className="img--github-icon" src={icon}></img>
      <h1 className="h1--title">REPOS FOR MVST</h1>
    </nav>
  );
}

export default NavBar;
