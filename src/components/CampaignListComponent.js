import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardTitle, CardBody } from 'reactstrap';

class CampaignList extends Component {
	render() {
		let list;

		list = this.props.list.map((campaign) => {
			return (
				<div key={campaign.id} className="col-12 col-md-5 m-1">
					<Card>
						<CardImg width="100%" src="logo512.png" alt={campaign.name} />
						<CardImgOverlay>
							<CardTitle>{campaign.name}</CardTitle>
						</CardImgOverlay>
					</Card>
				</div>
			);
		});

		return (
			<div className="container">
				<div className="row mb-3">
					<h4>Campaign List</h4>
				</div>
				<div className="row">
					{list}
				</div>
			</div>
		);
	}
}

export default CampaignList;
