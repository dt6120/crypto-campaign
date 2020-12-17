import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Campaign from '../../ethereum/campaign';
import background from './bg.jpg';

export class ShowCard extends Component {
  state = {
    campaignName: ''
  };
  async componentDidMount() {
    const campaign = Campaign(this.props.address);
    const campaignName = await campaign.methods.campaignName().call();
    this.setState({ campaignName });
  }
  render() {
    return (
      <div className="card blue-grey lighten-1 hoverable  valign-wrapper">
        <div className="card-content white-text">
          <blockquote>
          <h3 className="card-title">
            {this.state.campaignName}
          </h3>
          <h5>{this.props.address}</h5>
          </blockquote>
          <Link to={'campaigns/' + this.props.route}>
          <a class=" card-content waves-effect waves-teal btn-flat white-text">View Campaign</a>
          </Link>
        </div>
      </div>
    );
  }
}

export const DetailCard = props => {
  return (
    <div className="col-md-5 mt-5 animated fadeIn">
      <div className="z-depth-3">
        <div className="card grey white-text" style={{ height: 'auto', width: "auto" , padding: "10px 10px"}}>

            <div className="card-body">
              <h2 className="amber-text">{props.title}</h2>
              <h4 className="white-text text-muted">{props.meta}</h4>
              <p className="card-text">{props.description}</p>
            </div>

        </div>
      </div>
    </div>
  );
};

export const CampaignTron = props => {
  return (
    <div className="jumbotron blue-grey darken-2 text-center hoverable animated fadeIn">
      <div className="container">
      <large className="container white-text ">
        <h2>
        {props.campaignName}
        </h2>
      </large>
      <small
        className="container  white-text text-muted"
        style={{ wordWrap: 'break-word' }}
      >
        <h6>
        Campaign Smart Contract Address: <b>{props.contractAddress}</b>
        </h6>
      </small>
      <small
        className="container white-text text-muted"
        style={{ wordWrap: 'break-word' }}
      >
        <h6>
        Managed by: <b>{props.manager}</b>
        </h6>
      </small>
      </div>
    </div>
  );
};

export const JumboTron = props => {
  return (
    <div className="jumbotron grey z-depth-2 " style={{
      backgroundImage:
        `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "-350px -300px"
    }}>
        <div className="container center">
          <h1 className="white-text center display-4">
            {props.title}
          </h1>
          <h5 className="white-text center">{props.children}</h5>
          <br />
          {/* <Link to="/create-campaign">
          <a class="waves-effect waves-light btn">{props.buttonText}<i class="fas fa-arrow-circle-right material-icons right"></i></a>
          </Link>
          <br/> */}
        </div>
    </div>
  );
};

export class FooterCustom extends Component {
  render() {
    return (
      <footer class="page-footer center grey ">
            <div class="container">
              <div class="row">
                  <p class="white-text lead">Crypto-Campaign</p>
                {/* <div class="col l4 offset-l2 s12">
                  <h5 class="white-text">Links</h5>
                  <ul>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                    <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                  </ul>
                </div> */}
              </div>
            </div>
            <div class="footer-copyright">
              <div class="container right white-text">
              Dhruv Takwal | Manvendra Pandey
              </div>
            </div>
          </footer>
    )
  }
}
