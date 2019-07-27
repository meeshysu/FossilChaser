import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import authRequests from '../../Data/Auth';

import './Profile.scss';

 

export class CustomerProfile extends React.Component {

  state = {
    customer: {},
    isEditing: false,
    editId: '-1',
    open: false,
  }

  static propTypes = {
    onSubmit: PropTypes.func,
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    let uid = authRequests.getUid();
    this.getCustomer(uid);
    this.setState({ isEditing: true, editId: uid })
  }
  
  componentWillUnmount() {
    let uid = authRequests.getUid();
    this.getCustomer(uid);
    this.setState({ isEditing: false, editId: uid })
  }

  editCustomer = (e) => {
    e.preventDefault();
    let uid = authRequests.getUid();
    this.setState({ isEditing: true, editId: uid })
    this.onOpenModal();
  }

  render() {
    //const { customer, isEditing, editId } = this.state;

    return (
      <div className="container customerProfile">
      </div>
    )
  }
}

export default CustomerProfile;
