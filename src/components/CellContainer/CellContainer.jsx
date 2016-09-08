import styles from "./style.css";
import React from "react";
import _ from "underscore";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import Cell from "../Cell";

class CellContainer extends React.Component {
	componentDidMount() {
		this.setState({ episodes: this.props.episodes });
	}
	componentWillReceiveProps(newProps) {
		if (newProps.episodes) {
			this.setState({ episodes: newProps.episodes });
		}
	}
	toggleHide(imdbID) {
		this.setState({
			episodes: this.state.episodes.map((episode) => {
				if (imdbID === episode.imdbID) {
					episode.hidden = !episode.hidden;
				}
				return episode;
			}),
		});
	}
	removeCell(imdbID) {
		this.setState({
			episodes: _.filter(this.state.episodes, (episode) => episode.imdbID !== imdbID),
		});
	}
  	render() {
		const episodes = this.state && this.state.episodes ? this.state.episodes : this.props.episodes;
		return (
			<div className={styles.root}>
				{episodes.map((episode, i) => {
					return <Cell {...episode} removeCell={this.removeCell.bind(this, episode.imdbID)} toggleHide={this.toggleHide.bind(this, episode.imdbID)} key={i} />
				})}
			</div>
		);
	}
}

module.exports = CellContainer;
