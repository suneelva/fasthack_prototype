import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Modal from "react-modal";
import CampaignModal from "./CampaignModal";
import ModalExample  from "./ModalExample";

const style = {
  root: {
    flexGrow: 1,
    margin: '1.2em'
  },
  card: {
    minWidth: 300
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};
const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  }
});

class CampaignItem extends Component {

  state = {
    modalIsOpen: false,
    shadow: 1
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

 
  render() {
    const data = this.props.result._source.campaignEntry || null;
    console.log(data);

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        height: "35%",
        width: "25%"
      }
    };

    const causeTagString = data.cause_tags
        ? data.cause_tags.map((tag, i) => {
          const append = data.cause_tags.length !== i + 1 ? ", " : " ";
          return tag.name + append;
        })
    : "";

    return (
      <div style={style.root}>
        
        <Card className={style.card} raised={true} style={{backgroundColor: '#f4f4f4'}}>
           <CardHeader         
             action={
               <IconButton aria-label="Share">
                <ShareIcon />
               </IconButton>
             }        
            />
          <CardContent>
            <Typography variant="headline" component="textSecondary">
              {data.name}
            </Typography>
            <div style={{ textAlign: "left" }}>
              <Typography className={style.pos} color="textSecondary">
                Causes: {causeTagString}
              </Typography>
              <Typography component="p">
                Driven by the {data.organization.name}
              </Typography>
            </div>
            {<br />}
            <ModalExample buttonLabel="LearnMore" data={data}/>
          </CardContent>
            
           </Card>
      </div>
    );
  }
}

export default withStyles(styles)(CampaignItem);
