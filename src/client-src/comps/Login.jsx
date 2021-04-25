/**
 * @author Vijay Anand
 */

import React, { useState, useEffect, } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CustomInput, Label, } from 'reactstrap';
import withStyles from '@material-ui/core/styles/withStyles'
import logo from '../assets/img/logo.png'
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { FormGroup } from '@material-ui/core';
import Paper from "@material-ui/core/Paper"
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	root: {
		paddingTop: theme.spacing(10),
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(40),
		paddingRight: theme.spacing(1),
		// backgroundColor: '#2e2e2e',
		color: "#000",
		height: '100%',
		width: '100%',
	},
	paper: {
		marginTop: 100,
		marginLeft: 50,
		display: 'flex',
		flexDirection: 'column',
		paddingTop: theme.spacing(2),
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(2),
		paddingRight: theme.spacing(1),
		fontSize: 12,
		backgroundColor: '#c0c0c0',
		align: "center",
		color: "#000000",
		height: '40%',
		width: '80%',
	},
	divcolor: {
		marginTop: -30,
		marginLeft: -15,
		width: '107.25%',
		height: 27,
		backgroundColor: '#119279',
		paddingTop: theme.spacing(0.25),
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(0.125),
		paddingRight: theme.spacing(0.25),
		borderRadius: 5,
		borderWidth: 1,
		fontSize: 13,
		borderColor: '#fff',
		align: "center"
	},
	imgpaper: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: theme.spacing(15),
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	imgs: {
		paddingTop: theme.spacing(1),
		paddingLeft: theme.spacing(0.25),
		paddingBottom: theme.spacing(0.25),
		paddingRight: theme.spacing(0.25),
		width: 139,
		height: 59,
		borderradius: 50
	},
	title: {
		fontSize: 12,
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
	para: {
		height: 5
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
		marginLeft: 10,
		cursor: 'pointer',
		width: '40%',
		// backgroundColor: '#7be0f1',
		height: '28px',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#007da7',
		"&:hover": {
			backgroundColor: "#ed9c22"
		},
	},



})

class Login extends React.Component {

	constructor() {
		super();
		this.username = React.createRef();
		this.password = React.createRef();
		this.username = this.password = "";
		this.cs = new CSInterface();
		this.title = "Smart Activity";
	}

	handleOnClick(e) {
		console.log('Submit Triggered : ');
		console.log("UserName : " + this.username);
		console.log("Password : " + this.password);
		if (this.username == "") {
			this.cs.evalScript('alert("Please fill the UserName!","' + this.title + '")');
			document.getElementById("username").focus = true;
			return;
		} else if (this.password == "") {
			this.cs.evalScript('alert("Please fill the Password!","' + this.title + '")');
			document.getElementById("password").focus = true;
			return;
		}
		this.cs.evalScript('alert("Login Sucessfully done")');
		console.log('Login Sucessfully done');


		// if (LoginDetails.length > 0) {
		// 	setflag(flag = 1);
		// 	setDesignerRole(designerRole = LoginDetails[0].Role);
		// 	console.log("Clicked...." + userName + " - " + designerRole);
		// 	localStorage.setItem('userID', userName.toLocaleLowerCase());
		// 	localStorage.setItem('designerRole', designerRole);

		// 	if (designerRole === "Admin" || designerRole === "Assistant Manager" || designerRole === "Manager" || designerRole === "Customer Success" || designerRole === "Team Lead") setpath(path = '/dashboard');
		// 	else setpath(path = '/base/timesheet');
		// 	e.preventDefault();
		// 	// console.log(path);
		// 	// history.push({ pathname: "/base/timesheet", data: [{ userName: userName, designerRole: designerRole }] });
		// 	// return <TimeSheet props={userName} />
		// } else {
		// 	alert("Please fill the valid Domain UserName");
		// }
	}

	handleUserChange(evt) {
		console.log('Username Triggered because this input lost focus : ' + evt.target.value);
		this.username = evt.target.value;
		// setUsers(userName = evt);
	};
	handlePassChange(evt) {
		console.log('Password Triggered because this input lost focus : ' + evt.target.value);
		this.password = evt.target.value;
		if (this.password == "" && !this.initValue) {
			alert("Please fill the Password value");
			document.getElementById("password").focus = true;
			this.initValue = true
		} else this.initValue = false
		// setPass(_password = evt);
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div style={{ align: "center" }} >
					<img src={logo} alt='Logo' id="Preview" style={{ width: 145, height: 59 }} />
				</div>

				<Paper elevation={2} className={classes.paper}>
					<div className={classes.divcolor} style={{ align: "center" }} >
						<Typography className={classes.title} color="textSecondary" gutterBottom>LOGIN</Typography>
					</div>
					<div style={{ marginTop: 20, marginLeft: 50, align: "center" }}>
						{/* {flag === 1 ? <Redirect from="/login" to={path} /> : <Redirect from="/" to="/login" />} */}
						<Container>
							{/* <form onSubmit={(e) => this.handleOnClick(e)}></form> */}
							<Form className="was-validated" onSubmit={(e) => this.handleOnClick(e)}>
								<FormGroup>
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="icon-user"></i>
											</InputGroupText>
										</InputGroupAddon>
										User Name : &nbsp;
										<Input type="text" id="username" autoFocus placeholder="" autoComplete="username" onBlur={(e) => { this.handleUserChange(e) }} required />	</InputGroup>
									<span className={classes.para} />
									<InputGroup className="mb-4">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="icon-lock"></i>
											</InputGroupText>
										</InputGroupAddon>
										&nbsp;&nbsp;&nbsp;Password : &nbsp;
										<Input type="password" id="password" placeholder="" autoComplete="current-password" onBlur={(e) => { this.handlePassChange(e) }} required />
									</InputGroup>
									<Row>
										<Col xs="6">
											<div align="center" style={{ marginTop: 10, marginLeft: 10 }}>
												<Button onClick={(e) => this.handleOnClick(e)} className={classes.submitBtn} > Login </Button>
											</div>
										</Col>
									</Row>
								</FormGroup>
							</Form>
						</Container>
					</div>
				</Paper>
			</div>
		);

	}

}
export default withStyles(styles)(Login);