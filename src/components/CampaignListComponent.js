import React, { Component } from 'react';

class CampaignList extends Component {
	render() {
		let list;

		list = this.props.list.map((campaign) => {
			return (
				<div key={campaign.id}>
					<div className="card">
						<div>
							<h3>{campaign.name}</h3>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div className="container">
				<div className="row mb-5">
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
