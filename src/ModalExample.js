import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PaymentButton  from "./PaymentButton";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      tabNumber: 0
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  tabNumberMap = ["Drive Overview", "Campaign Details"];

  _setDetail = intVal => {
    this.setState({ tabNumber: intVal });
    return;
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  render() {

    const data = this.props.data;
    const detailsTabs = this.tabNumberMap.map((num, i) => {
      return (
        <div
          className={
            this.state.tabNumber === i
              ? "linedUp filter selected"
              : "linedUp filter"
          }
          style={{
            display: "inline",
            paddingRight: "0.5rem",
            cursor: "pointer"
          }}
           onClick={this._setDetail.bind(this, i)}
           key={i}
          >
          {num}
        </div>
      );
    });

    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{detailsTabs}</ModalHeader>
          <ModalBody>
            Campaign: {data.name}
            {<br />}
            Organized by {data.organization.name}
            {<br />}
            {<br />}
            <Button color="success" onClick={this.toggleNested}>Donate</Button>
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>Donate</ModalHeader>
              <ModalBody>
               <PaymentButton />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;