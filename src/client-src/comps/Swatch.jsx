/**
 * @author Vijay Anand
 */

import React from 'react'
import reactCSS from 'reactcss'
import ScriptLoader from '../../session-src/src/ScriptLoader'

export default class Swatch extends React.Component {
	constructor(props) {
		super();
		this.state = {
			displayColorPicker: false,
			color: {
				r: props.color !== undefined ? props.color.r : '241',
				g: props.color !== undefined ? props.color.g : '112',
				b: props.color !== undefined ? props.color.b : '19',
				a: props.color !== undefined ? props.color.a : '1',
			},
			mTop: 0,
		};
	}

	handleClick = () => {
		// this.setState({ displayColorPicker: !this.state.displayColorPicker })	
	};

	handleClose = () => {
		// this.setState({ displayColorPicker: false })
	};

	handleChange = (color) => {
		this.setState({ color: color.rgb })
	};


	render() {
		const styles = reactCSS({
			'default': {
				color: {
					width: '40px',
					height: '16px',
					borderRadius: '2px',
					background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
				},
				swatch: {
					marginTop: this.state.mTop,
					padding: '1px',
					background: '#555',
					borderRadius: '1px',
					// boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
					display: 'inline-block',
					cursor: 'pointer',
				},
				popover: {
					position: 'absolute',
					zIndex: '2',
				},
				cover: {
					position: 'fixed',
					top: '0px',
					right: '0px',
					bottom: '0px',
					left: '0px',
				},
			},
		});

		return (
			<div>
				<div style={styles.swatch} onClick={this.handleClick}>
					<div style={styles.color} />
				</div>
			</div>
		)
	}
}
