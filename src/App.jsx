import React from 'react';
import Sprite from './components/Sprite';

export default class App extends React.Component {

	createdImageURL = undefined;
	spriteJson = undefined;

	constructor ( props ) {
		super( props );

		this.state = ( {
			createdImageURL: undefined,
			uploadedJsonFile: undefined,
			isImageUploaded: false,
			isJsonUploaded: false,
		} );


		this.onImageFileChange = this.onImageFileChange.bind( this );
		this.onJsonFileChange = this.onJsonFileChange.bind( this );
		this.showImage = this.showImage.bind( this );
	}

	onImageFileChange ( event ) {
		this.createdImageURL = URL.createObjectURL( event.target.files[ 0 ] );

		this.setState( {
			createdImageURL: this.createdImageURL,
			isImageUploaded: true
		}, this.showImage );
	}

	onJsonFileChange ( event ) {
		this.setState( {
			uploadedJsonFile: event.target.files[ 0 ]
		}, this.restoreJsonFile );
	}

	restoreJsonFile () {
		let jsonFile = new FileReader();
		jsonFile.onload = ( event ) => {
			this.processJsonFile( event.target.result );
		};
		jsonFile.readAsText( this.state.uploadedJsonFile );
	}

	processJsonFile ( file ) {
		this.spriteJson = JSON.parse( file ).frames;

		this.setState( {
			isJsonUploaded: true
		}, this.showImage );
	}

	showImage () {
		if ( this.state.isImageUploaded && this.state.isJsonUploaded ) {
			let spriteObjectArray = [];
			let allSpriteKeys = Object.keys( this.spriteJson );
			allSpriteKeys.forEach( ( element, index ) => {
				spriteObjectArray.push(
					<Sprite
						fileName={element}
						fileURL={this.state.createdImageURL}
						x={this.spriteJson[ element ].frame.x}
						y={this.spriteJson[ element ].frame.y}
						width={this.spriteJson[ element ].frame.w}
						height={this.spriteJson[ element ].frame.h}
						rotate={this.spriteJson[ element ].rotated}
						key={index}
					/>
				);
			} );

			return <div>{spriteObjectArray}</div>;
		} else {
			return undefined;
		}
	}

	render () {
		return (
			<div>
				<h2>Spritesheet Viewer</h2>
				<div>
					<div>
						<p>
							<input type='file' accept='image/*' onChange={this.onImageFileChange} />
							(.png)
						</p>
					</div>

					<div>
						<p>
							<input type='file' accept='application/JSON' onChange={this.onJsonFileChange} />
							(.json)
						</p>
					</div>
				</div>
				{this.showImage()}
			</div >
		);
	}
}