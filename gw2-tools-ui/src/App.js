import './App.css';
import './navbar.css';
import {Link, Outlet, Route, Routes} from 'react-router-dom';
import {AddOpening} from "./components/creation/AddOpening";
import {ViewOpenings} from "./components/overview/ViewOpenings";
import {ItemRatesOverview} from "./components/rates/ItemRatesOverview";

function Layout() {
    return <ul className="App-header">
        <nav className="navbar">
            <div className="container">
                <div className="nav-elements">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/viewOpenings">
                                View openings
                            </Link>
                        </li>
                        <li>
                            <Link to="/addOpening">
                                Add new openings
                            </Link>
                        </li>
                        <li>
                            <Link to="/dropRates">
                                View drop rates
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Outlet/>
    </ul>;
}

function App() {
    return (
        <div>
            <Routes>
            <Route path="/" element={<Layout/>}>
                    <Route path="addOpening" element={<AddOpening/>}/>
                    <Route path="viewOpenings" element={<ViewOpenings/>}/>
                    <Route path="dropRates" element={<ItemRatesOverview/>}/>
                </Route>
            </Routes>
        </div>

    );
}

export default App;
