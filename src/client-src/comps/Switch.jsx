/**
 * @author Vijay Anand
 */

import React from "react";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import { green, yellow } from "@material-ui/core/colors";
import { Label } from "reactstrap";

const useStyles = makeStyles({
	switchBase: {
		color: '#a7cd6f',
		"&$checked": {
			color: '#81a651'
		},
		"&$checked + $track": {
			backgroundColor: '#81a651'
		}
	},
	checked: {},
	track: {}
});

export default function SwitchItem() {
	const classes = useStyles();
	return (
		<div >
			<Label check className="form-check-label" htmlFor="checkbox1">Portrait</Label>
			<Switch
				focusVisibleClassName={classes.focusVisible}
				disableRipple
				classes={{
					root: classes.root,
					switchBase: classes.switchBase,
					thumb: classes.thumb,
					track: classes.track,
					checked: classes.checked
				}}
			/>
			<Label check className="form-check-label" htmlFor="checkbox1">Landscape</Label>

		</div>
	);
}
