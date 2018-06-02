import React, { Component } from "react";

import { Grid, Row, Col } from "react-bootstrap";


class CampaignModal extends Component {
  state = {
    tabNumber: 0
  };
  tabNumberMap = ["Drive Overview", "Campaign Details"];

  _setDetail = intVal => {
    this.setState({ tabNumber: intVal });
    return;
  };

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
        <Row>
          <Col md={3} className="modal-tab-head">
            {detailsTabs}
          </Col>
          <Col md={3}>
            <button onClick={this.props.close} style={{marginLeft: '180px'}}> X </button>
          </Col>
        </Row>
        {this.state.tabNumber === 0 && (
          <div className="dc-modal-content">
            <Grid>
              <Row>
                <Col> Campaign: {data.name}</Col>
              </Row>
              <Row>
                <Col> Organized by {data.organization.name}</Col>
              </Row>
            </Grid>
          </div>
        )}
        {this.state.tabNumber === 1 && (
          <div className="dc-modal-content">
            <div className="row">
              <div className="col md-75">
                {" "}
                map through campaign data and list each as a row
              </div>
            </div>
          </div>
        )}
        {<br />}
        <button > Donate </button>
      </div>
    );
  }
}

export default CampaignModal;
