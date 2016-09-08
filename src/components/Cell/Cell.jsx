import styles from "./style.css";
import React from "react";
import moment from "moment";
import {Card, CardActions, CardHeader, CardTitle, CardText} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { API_GETEPISODE } from "../../constants/api";

class Cell extends React.Component {
	componentDidMount() {
		this.fetchEpisode(this.props.imdbID);
	}
	componentWillReceiveProps(newProps) {
		if (newProps.imdbID) {
			this.setState({
				Poster: null,
				Plot: null,
			});
			this.fetchEpisode(newProps.imdbID);
		}
	}
	fetchEpisode(imdbID) {
		const url = API_GETEPISODE.replace("{imdbID}", imdbID).replace("{seasonNumber}", 1);
		fetch(url)
  		.then((response) => response.json())
		.then((json) => this.handleData(json))
		.catch((err) => {
    		console.log("json parse err:" + err);
  		});
	}
	handleData(json) {
		this.setState({
			Poster: json.Poster,
			Plot: json.Plot,
		});
	}
	getRatingClass() {
		if (this.props.imdbRating >= 8.5) {
			return styles.ratingHigh;
		}
		return null;
	}
	renderCellHeader() {
		return (
			<CardHeader className={styles.header} title={this.props.Title} subtitle={`Episode ${this.props.Episode}`}>
				<div className={styles.buttonContainer}>
					<div className={styles.removeButton} onClick={this.props.removeCell} />
					<FlatButton label="Remove" secondary={true} onClick={this.props.removeCell} />
					<FlatButton label={this.props.hidden ? "Show" : "Hide"} onClick={this.props.toggleHide} />
				</div>
			</CardHeader>
		)
	}
  	render() {
		if (this.props.hidden) {
			return (
				<Card className={styles.root}>
					{this.renderCellHeader()}
	      		</Card>
			);
		}
		return (
      		<Card className={styles.root}>
				{this.renderCellHeader()}
				<div className={styles.infoContainer}>
					<img className={styles.thumbnail} src={this.state ? this.state.Poster : null}></img>
					<div className={styles.textContainer}>
						<p>
							{"IMDB Rating: "} <span className={this.getRatingClass()}>{this.props.imdbRating}</span>
						</p>
						<p>{this.state ? this.state.Plot : null}</p>
						<p>Released: {moment(this.props.Released).format("MMMM Do YYYY")}</p>
					</div>
				</div>
      		</Card>
		);
	}
}

module.exports = Cell;
