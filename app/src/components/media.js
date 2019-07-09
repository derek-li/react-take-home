import React, { Component } from 'react';
import './media.css';

import { ReactComponent as Link } from '../assets/Link.svg';
import { ReactComponent as Download } from '../assets/Download.svg';
import { ReactComponent as Play } from '../assets/Play.svg';

		

export default class Media extends Component {

	constructor(props) {
		super(props);

		this.state = {
			previewOrVideo: 'preview',
			mediaURL: ''
		};
	}

	downloadMedia() {
		const media = this.props.media;

	 	fetch("https://cors-anywhere.herokuapp.com/" + media.download_url)
	 	.then(function(response) {
	 		return response.blob();
	 	}).then(function(blob) {
	 		const newBlob = new Blob([blob], {type: "video/mp4"});
	 		const objectURL = URL.createObjectURL(newBlob);

	 		// IE doesn't allow using blob objects directly as link href
	 		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			    window.navigator.msSaveOrOpenBlob(newBlob);
			    return;
			};

	 		let link = document.createElement('a');
			link.href = objectURL;
			link.download="file.mp4";
			link.click();

			// For Firefox it is necessary to delay revoking the ObjectURL   
			setTimeout(function(){
			    window.URL.revokeObjectURL(objectURL);
			}, 100);
	 	});
	}

	copyLink() {
		const media = this.props.media;

		window.Clipboard = (function(window, document, navigator) {
		    var textArea;
		    var copy;

		    function createTextArea(text) {
		        textArea = document.createElement('textArea');
		        textArea.value = text;
		        document.body.appendChild(textArea);
		    }

		    function selectText() {
		        var range,
		            selection;

		        if (navigator.userAgent.match(/ipad|iphone/i)) {
		            range = document.createRange();
		            range.selectNodeContents(textArea);
		            selection = window.getSelection();
		            selection.removeAllRanges();
		            selection.addRange(range);
		        } else {
		            textArea.select();
		        }
		    }

		    function copyToClipboard() {        
		        document.execCommand('copy');
		        document.body.removeChild(textArea);
		    }

		    copy = function(text) {
		        createTextArea(text);
		        selectText();
		        copyToClipboard();
		    };

		    return {
		        copy: copy
		    };
		})(window, document, navigator);

		window.Clipboard.copy(media.tracking_link);
	}

	handleClick() {
		const media = this.props.media;

		fetch("https://cors-anywhere.herokuapp.com/" + media.download_url)
		 .then(function(response) {
		 	return response.blob();
		 }).then(function(blob) {
		 	const objectURL = URL.createObjectURL(blob);
			this.setState({previewOrVideo: "video", mediaURL: objectURL});
		}.bind(this));
	}

	renderPlay() {
		const media = this.props.media;

		if (media.media_type === 'video') {
			return <Play 
				className="play-button"
				onClick={() => this.handleClick()}
			/>
		}

	}

	renderPreviewOrVideo() {
		const { previewOrVideo, mediaURL } = this.state;
		const media = this.props.media;

		if (previewOrVideo === 'preview') {
			return (
				<div>
					<img
						alt="cover"
						className="cover-photo"
						src={media.cover_photo_url}
					/>
					{this.renderPlay()}
				</div>
			);
		} else {
			return (
				<video controls
					className="video"
				>
					<source src={mediaURL} type="video/mp4" />
				</video>
			);
		}
	}

	render() {

		return (
			<div>
				<div className="media-box">
					{this.renderPreviewOrVideo()}
				</div>
				<div className="interactives">
					<button
						onClick={() => this.copyLink()}
						style={{transform: "rotateY(180deg)"}}
					>
						<Link 
							className="svg-icon"
						/>
					</button>
					<button
						onClick={() => this.downloadMedia()}
					>
						<Download 
							className="svg-icon"
						/>
					</button>					
				</div>
			</div>
		);
	}

}
