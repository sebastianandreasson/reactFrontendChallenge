import styles from "./style.css";
import React from "react";
import { Card } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

class Header extends React.Component {
	changeSeries() {
		const newSeries = this.refs.seriesTextField.input.value;
		this.props.fetchSeries(newSeries);
	}
  	render() {
		return (
			<Card className={styles.root}>
				<h1>{this.props.title}</h1>
				<p>{`Average episode rating:  ${this.props.averageRating}`}</p>
				<div className={styles.inputContainer}>
					<TextField className={styles.seriesInput} hintText="Enter series title" ref="seriesTextField" />
					<FlatButton label={ this.props.loading ? "Loading..." : "Change Series" } onClick={this.changeSeries.bind(this)} />
				</div>
			</Card>
		);
	}
}

module.exports = Header;
