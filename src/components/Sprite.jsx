import React from 'react';

export default class Sprite extends React.Component {
	render () {
		if ( this.props.fileURL ) {
			// * Define the CSS
			const style = {
				margin: `2px`,
				border: `1px dotted #000`,
				display: `inline-block`,
				backgroundImage: `url(${ this.props.fileURL })`,
				backgroundPosition: `${ this.props.x * ( -1 ) }px ${ this.props.y * ( -1 ) }px`,
				backgroundRepeat: 'no-repeat',
				width: `${ this.props.width }px`,
				height: `${ this.props.height }px`,
			};

			// * If the rotate is true, it means need to rotate -90deg, and swap the width and height
			if ( this.props.rotate ) {
				style[ 'transform' ] = 'rotate(-90deg)';
				style[ 'width' ] = `${ this.props.height }px`;
				style[ 'height' ] = `${ this.props.width }px`;
			}

			return (
				<div style={style} title={this.props.fileName} />
			);
		} else {
			return undefined;
		}
	}
}
