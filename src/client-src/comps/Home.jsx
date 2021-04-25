/**
 * @author Vijay Anand
 */

import React from 'react'
import Paper from "@material-ui/core/Paper"
import { CustomInput, Table, Input, Label, FormControlLabel } from 'reactstrap';
import withStyles from '@material-ui/core/styles/withStyles'
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from '@material-ui/core/TableRow';
import TableBody from "@material-ui/core/TableBody";
import Typography from '@material-ui/core/Typography';
import logo from '../assets/img/logo.png'
import variantImg from '../assets/img/submit.png'
import Button from "react-bootstrap/Button";
import Swatch from './Swatch';
import ScriptLoader from '../../session-src/src/ScriptLoader'

const styles = theme => ({
	root: {
		paddingTop: theme.spacing(2),
		paddingLeft: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.75),
		paddingRight: theme.spacing(1),
	},
	paper: {
		marginTop: 10,
		display: 'flex',
		flexDirection: 'column',
		paddingTop: theme.spacing(0.5),
		paddingLeft: theme.spacing(0.25),
		paddingBottom: theme.spacing(0.25),
		paddingRight: theme.spacing(0.15),
		fontSize: 12,
		backgroundColor: '#5a5a5a',
		height: 115,
		width: '101%'

	},
	imgpaper: {
		marginTop: -15,
		display: 'flex',
		flexDirection: 'column',
		paddingTop: theme.spacing(0.5),
		paddingLeft: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.5),
		paddingRight: theme.spacing(0.5),
		backgroundColor: '#5a5a5a',
		height: 225,
		width: 247,
	},
	imgs: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: theme.spacing(0.25),
		paddingLeft: theme.spacing(0.25),
		paddingBottom: theme.spacing(0.25),
		paddingRight: theme.spacing(0.25),
		width: 240,
		height: 192,
		align: "center",
		marginLeft: 0,
		borderradius: 50
	},
	export: {
		margin: theme.spacing(3),
		alignSelf: 'flex-end'
	},
	pos: {
		marginTop: 5,
		marginBottom: 12,
	},
	title: {
		fontSize: 12,
	},
	divcolor: {
		marginLeft: -15,
		marginTop: -5,
		width: '107%',
		height: 25,
		backgroundColor: '#3b3b3a',
		paddingTop: theme.spacing(0.25),
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(0.125),
		paddingRight: theme.spacing(0.25),
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#fff'
	},
	typography: {
		// In Japanese the characters are usually larger.
		fontSize: 12,
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	slider: {
		backgroundColor: '#222321',
		marginTop: 5,
		width: '90%',
		align: "center",
		marginLeft: 10,
	},
	variant: {
		backgroundColor: '#222321',
		width: 50,
		alignSelf: 'flex-start',
		borderRadius: 3, borderWidth: 1
	},
	variantSize: {
		width: 120,
		borderRadius: 3, borderWidth: 0.5
	},
	productSize: {
		// backgroundColor: '#454646',
		width: 50,
		borderRadius: 3, borderWidth: 0.5
	},
	divVariants: {
		marginTop: -10
	},
	Action_btn: {
		backgroundColor: '#288edf'
	},
	AboutText: {
		fontSize: 12,
		display: 'inline-block',
		cursor: 'pointer',
		color: '#888',
		"&:hover": {
			color: "#81a651"
		},
	},
	submitBtn: {
		cursor: 'pointer',
		width: '90%',
		backgroundColor: '#a7cd6f',
		height: '28px',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#708f42',
		"&:hover": {
			backgroundColor: "#81a651"
		},
	},

	swatch: {
		cursor: 'pointer',
		width: '40px',
		height: '16px',
		borderRadius: '2px',
		background: '#666666',
	}


})

/**
 * Home tab content
 *
 */
class Home extends React.Component {

	constructor() {
		super()

		this.textureItemRef = React.createRef();
		this.masksItemRef = React.createRef();
		this.infoItemRef = React.createRef();
		this.hierarchicalItemRef = React.createRef();
		this.inspectVisibleItemRef = React.createRef();
		this.browseItemRef = React.createRef();
		this.namesItemRef = React.createRef();

		this.displayColorPicker = false;
		this.variantBC = {
			r: '102',
			g: '102',
			b: '102',
			a: '1'
		};
		this.variantFC = {
			r: '255',
			g: '255',
			b: '255',
			a: '1'
		};
		this.sizeBC = {
			r: '0',
			g: '0',
			b: '0',
			a: '1'
		};
		this.sizeFC = {
			r: '255',
			g: '255',
			b: '255',
			a: '1'
		};
		this.state = {
			value: 'random text'
		}
	}

	/**
	 * export button was clicked
	 *
	 */
	export_onClick = (e) => {
		var folderPath = this.browseItemRef.current.path
		var isTexturesChecked = this.textureItemRef.current.isChecked
		var isMasksChecked = this.masksItemRef.current.isChecked
		var isInfoChecked = this.infoItemRef.current.isChecked
		var isHierarchicalChecked = this.hierarchicalItemRef.current.isChecked
		var isInspectVisibleChecked = this.inspectVisibleItemRef.current.isChecked
		var isMeaningfulNamesChecked = this.namesItemRef.current.isChecked

		var { onExecutePlugin } = this.props

		onExecutePlugin({
			folderPath,
			isTexturesChecked,
			isMasksChecked,
			isInfoChecked,
			isMeaningfulNamesChecked,
			isHierarchicalChecked,
			isInspectVisibleChecked
		})
	}


	handleChangeVariant(e) {
		console.log('Triggered because this input lost focus');
		let prodType = document.getElementById("Portrait").checked ? "Height" : "Width";
		let variantName = e.target.value;
		ScriptLoader.variantNameChange({ text: variantName, len: String(variantName).length, prodType: prodType });
	}

	handleChangeSize(e) {
		console.log('Triggered because this input lost focus');
		let prodType = document.getElementById("Portrait").checked ? "Height" : "Width";
		let variantSize = e.target.value;
		ScriptLoader.sizeChange({ text: variantSize, len: String(variantSize).length, prodType: prodType });
	}

	handleChangeMeasure(e) {
		console.log('Triggered because this input lost focus');
		let prodType = document.getElementById("Portrait").checked ? "Height" : "Width";
		let variantMeasure = e.target.value;
		ScriptLoader.measureChange({ text: variantMeasure, len: String(variantMeasure).length, prodType: prodType });
	}

	handleVarientBC_Click() {
		let prodType = document.getElementById("Portrait").checked ? "Height" : "Width";
		ScriptLoader.showColorPicker({ flag: "", prodType: prodType, type: "variantBC" });
	}

	handleVarientFC_Click() {
		let prodType = document.getElementById("Portrait").checked ? "Height" : "Width";
		ScriptLoader.showColorPicker({ flag: "Text", prodType: prodType, type: "variantFC" });
	}

	handleSizeBC_Click() {
		let prodType = document.getElementById("Portrait").checked ? "Height" : "Width";
		ScriptLoader.showColorPicker({ flag: "", prodType: prodType, type: "sizeBC" });
	}

	handleSizeFC_Click() {
		let prodType = document.getElementById("Portrait").checked ? "Height" : "Width";
		ScriptLoader.showColorPicker({ flag: "Text2", prodType: prodType, type: "sizeFC" });
	}

	render() {
		const { classes } = this.props;


		return (
			<div className={classes.root}>
				<div>
					<Paper elevation={2} className={classes.imgpaper}>
						<div>
							<img src={logo} alt='Logo' id="Preview" className={classes.imgs} />
						</div>
						<CustomInput type="range" name="translate" id="imageTranslate" className={classes.slider} />
					</Paper>
					<Paper elevation={2} className={classes.paper}>
						<div className={classes.divcolor} >
							<Typography className={classes.title} color="textSecondary" gutterBottom>&nbsp;&nbsp;Product Description</Typography>
						</div>
						<Typography className={classes.typography} color="textSecondary" gutterBottom>
							<TableContainer className={classes.pos}>
								<Table hover striped className="table-align-middle mb-0" responsive="xl" bordered>
									<TableBody>
										<TableRow>
											<td align="right">Resize (%) &nbsp;&nbsp;:&nbsp; </td>
											<td><Input type="select" name="Resizepercentage" id="productResize" width="200">
												<option value="1">100</option>
												<option value="2">120</option>
												<option value="3">150</option>
												<option value="4">200</option>
												<option value="6">250</option>
											</Input> </td>
										</TableRow>
										<TableRow>
											<td align="right">View &nbsp;&nbsp;:&nbsp;</td>
											<td>
												<Input type="radio" name="radio1" id="Portrait" checked />Portrait&nbsp;
												<Input type="radio" name="radio1" id="Landscape" />Landscape
										</td>
										</TableRow>
										<TableRow>
											<td align="right">Layouts &nbsp;&nbsp;:&nbsp;</td>
											<td> <Input className="form-check-input" type="checkbox" id="Variant" name="Variant" value="Variant" checked />
												<Label check className="form-check-label" htmlFor="checkbox1">Variant</Label>
												<Input className="form-check-input" type="checkbox" id="Quantity" name="Quantity" value="Quantity" disabled />
												<Label check className="form-check-label" htmlFor="checkbox2">Quantity</Label> </td>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Typography>
					</Paper>
				</div>

				{/* Variants panel section start here */}
				<div className={classes.divVariants}>
					<Paper elevation={2} className={classes.paper}>
						<div className={classes.divcolor} style={{ marginTop: -10 }}>
							<Typography className={classes.title} color="textSecondary" gutterBottom>&nbsp;&nbsp;Variants Description</Typography>
						</div>
						<Typography className={classes.typography} color="textSecondary" gutterBottom>
							<TableContainer className={classes.pos}>
								<Table hover striped className="table-align-middle mb-0" responsive="xl" bordered>
									<TableBody>
										<TableRow>
											<td align="right">Name &nbsp;:&nbsp; </td>
											<td style={{ verticalAlign: "center" }}>
												<Input type="text" name="variantName" id="variantName" className={classes.variantSize} onBlur={(e) => { this.handleChangeVariant(e) }} /></td>

										</TableRow>
										<TableRow  >
											<td align="right" >BG Color &nbsp;:&nbsp;</td>
											<td> <div id="id_variantBC" onClick={this.handleVarientBC_Click.bind(this)} className={classes.swatch}></div> </td>
										</TableRow>
										<TableRow>
											<td align="right">Font Color &nbsp;:&nbsp;</td>
											<td> <div id="id_variantFC" onClick={this.handleVarientFC_Click.bind(this)} className={classes.swatch}></div>  </td>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Typography>
					</Paper>
				</div>

				{/* Product Size panel section start here */}
				<div className={classes.divVariants}>
					<Paper elevation={2} className={classes.paper}>
						<div className={classes.divcolor} style={{ marginTop: -10 }}>
							<Typography className={classes.title} color="textSecondary" gutterBottom>&nbsp;&nbsp;Size Description</Typography>
						</div>
						<Typography className={classes.typography} color="textSecondary" gutterBottom>
							<TableContainer className={classes.pos}>
								<Table responsive="xl" bordered>
									<TableBody>
										<TableRow>
											<td align="right">Size &nbsp;:&nbsp; </td>
											<td>
												<Input type="text" name="sizeName" id="sizetName" className={classes.productSize} onBlur={(e) => { this.handleChangeSize(e) }} />&nbsp;
												<Input type="text" palceholder="Measurement" name="Measurement" id="Measurement" className={classes.productSize} onBlur={(e) => { this.handleChangeMeasure(e) }} />
											</td>
										</TableRow>
										<TableRow>
											<td align="right">BG Color &nbsp;:&nbsp;</td>
											<td> <div id="id_sizeBC" onClick={this.handleSizeBC_Click.bind(this)} className={classes.swatch}></div> </td>
										</TableRow>
										<TableRow>
											<td align="right">Font Color &nbsp;:&nbsp;</td>
											<td> <div id="id_sizeFC" onClick={this.handleSizeFC_Click.bind(this)} className={classes.swatch}></div> </td>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Typography>
					</Paper>
				</div>

				<div style={{ marginTop: 10 }}><hr style={{ width: '80%', backgroundColor: "textSecondary" }} /></div>
				<div align="center" style={{ marginTop: 10 }}>
					<Button onClick={this.handleCloseModal} className={classes.submitBtn} > Let's Build </Button>
				</div>
				<div align="center" style={{ marginTop: 7 }}>
					<Label id="howitworks" className={classes.AboutText} onClick={''}>HowItWorks?</Label>&nbsp;|&nbsp; <Label onClick={''} className={classes.AboutText}>About</Label>
				</div>
			</div >
		)
	}
}

export default withStyles(styles)(Home);
