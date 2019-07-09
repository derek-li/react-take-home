import React, { Component } from 'react';
import './campaign.css';

import Media from './media';

export default class Campaign extends Component {
	
	renderMedia() {
		const campaign = this.props.campaign;

		if (campaign.medias.length !== 0) {
			return campaign.medias.map(function(media, i) {
				return (
					<Media
						key={i}
						media={media}
					/>
				);
			}, this);
		}
	}

	render() {
		const campaign = this.props.campaign;

		return (
			<div className="campaign">
				<div className="overview">
					<img
						alt="app-icon"
						className="icon"
						src={campaign.campaign_icon_url}
					/>
					<div className="details">
						<div className="name">
							{campaign.campaign_name}
						</div>
						<div className="pay-per-install">
							<span className="dollar-amount">{campaign.pay_per_install} </span> 
							per install
						</div>
					</div>
				</div>
				<div className="media">
					{this.renderMedia()}
				</div>
			</div>
		);
	}
} 