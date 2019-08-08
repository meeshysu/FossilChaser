import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import brand from '../../Images/FossilChaser4.png';
import favorites from '../../Images/Favorites.png';
import map from '../../Images/Map.png';
import logout from '../../Images/Logout.png';
import './Navbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClick: PropTypes.func,
  }

  render() {
    const { isAuthed, logoutClick } = this.props;

    const buildLinks = () => {
      if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} className='map' to='/map'><img src={map} alt='map'></img></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} className='favorites' to='/favorites'><img src={favorites} alt='favorites'></img></NavLink>
            </NavItem>
            <NavLink className='logout-link' onClick={logoutClick}><img src={logout} alt='logout'></img></NavLink>
          </Nav>
        );
      }
      return <div></div>;
    };

    return (
      <div className="my-navbar">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/"><img className='navbar-brand' src={brand} alt='brand'></img></NavbarBrand>
          {buildLinks()}
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;