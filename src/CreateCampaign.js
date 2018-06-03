import React from 'react';
import { Button, 
         Modal, 
         ModalHeader, 
         ModalBody, 
         ModalFooter,
         FormGroup,
         Form,Label, Input, FormText 
} from 'reactstrap';
import axios from 'axios';

class CampaignModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      campaign_name: '',
      organization_name:'',
      causes_type:'', 
      causes_location:'', 
      causes_quantity:'', 
      cause_tags:'',
      cause_tag_name:'', 
      actvist_name:'', 
      activits_id:'',
      campaign_status:'',
      campaign_goal:''
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
        e.preventDefault();
        console.log("Submit Pressed");
        // get our form data out of state
        const { 
          campaign_name,
          organization_name,
          causes_type, 
          causes_location, 
          causes_quantity, 
          cause_tags,
          cause_tag_name, 
          actvist_name, 
          activits_id,
          campaign_status,
          campaign_goal
        } = this.state;

           axios.post('https://dh-api.herokuapp.com/api/v1/campaigns', { 
             campaign_name,
             organization_name,
             causes_type, 
             causes_location, 
             causes_quantity, 
             cause_tags,
             cause_tag_name, 
             actvist_name, 
             activits_id,
             campaign_status,
             campaign_goal
            })
            .then((result) => {
              //access the results here....
              console.log(result);

          }).catch((error) => {
              //access the results here....
              console.log(error);
          });
            
      }

  render() {
    const { 
      campaign_name,
      organization_name,
      causes_type, 
      causes_location, 
      causes_quantity, 
      cause_tags,
      cause_tag_name, 
      actvist_name, 
      activits_id,
      campaign_status,
      campaign_goal
     } = this.state;
    return (
      <div >
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create a Campaign</ModalHeader>
          <div style={{padding: '20px'}}>
            <Form>
        <FormGroup>
           <Label for="cname">Campaign Name</Label>
           <Input type="text" name="campaign_name" value={campaign_name} id="cname" placeholder="Campaign Name" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
           <Label for="oname">Organization Name</Label>
           <Input type="text" name="organization_name" value={organization_name} id="oname" placeholder="Organization Name" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="causesName">Causes Type</Label>
          <Input type="select" name="causes_type" value={causes_type} id="causesName" onChange={this.onChange} >
            <option>Non-Profit</option>
            <option>Business</option>
            <option>Resource Access</option>
            <option>Food</option>
          </Input>
        </FormGroup>
         <FormGroup>
           <Label for="lname">Causes Location</Label>
           <Input type="text" name="causes_location" value={causes_location} id="lname" placeholder="City, State etc" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
           <Label for="qname">Causes Quantity</Label>
           <Input type="number" name="causes_quantity" value={causes_quantity} id="qname" placeholder="1,2,3..." onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
           <Label for="tagsname">Causes Tags</Label>
           <Input type="select" name="cause_tags" value={cause_tags} id="tagsname" onChange={this.onChange} >
            <option>Rural issues</option>
            <option>Drinking Water</option>
            <option>Resource Access</option>
            <option>Food</option>
          </Input>
          <Input type="text" name="cause_tag_name" value={cause_tag_name} id="qname" placeholder="" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
           <Label for="activistname">Activist Name</Label>
           <Input type="text" name="actvist_name" value={actvist_name} id="activistname" placeholder="Quantity (optional)" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
           <Label for="activistId">Activist ID</Label>
           <Input type="text" name="activits_id" value={activits_id} id="activistId" placeholder="Your Id" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="cStatus">Campaign Status</Label>
          <Input type="select" name="campaign_status" value={campaign_status} id="cStatus" onChange={this.onChange} >
            <option>Active</option>
            <option>Not-Active</option>
            <option>Pending</option>
          </Input>
        </FormGroup>
        <FormGroup>
           <Label for="campaigngoal">Campaign Goal</Label>
           <Input type="text" name="campaign_goal" value={campaign_goal} id="campaigngoal" placeholder="goal of this campign" onChange={this.onChange} />
        </FormGroup>
      </Form>
      </div>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>Create Campaign</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CampaignModal;
