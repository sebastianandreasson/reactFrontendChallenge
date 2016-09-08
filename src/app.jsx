import styles from "./app.css";
import React from "react";
import { render } from "react-dom";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import baseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import "whatwg-fetch";
import _ from "underscore";
import { API_GETSERIES, START_SERIES } from "./constants/api";
import CellContainer from "./components/CellContainer";
import Header from "./components/Header";

class App extends React.Component {
	getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
	componentDidMount() {
		this.fetchSeries(START_SERIES);
	}
	fetchSeries(series) {
		console.log("fetch: " + series);
		this.setState({ loading: true }, () => {
			const url = API_GETSERIES.replace("{series}", series).replace("{seasonNumber}", 1);
			fetch(url)
	  		.then((response) => response.json())
			.then((json) => {
				if (json && json.Episodes) {
					this.setState({ episodes: null, series: null }, () => {
						this.handleData(json);
					});
				} else {
					this.setState({ loading: false });
					alert("Series not found! Did you enter the correct title?");
				}
			})
			.catch((err) => {
				this.setState({ loading: false });
	    		console.log("json parse err:" + err);
	  		});
		});
	}
	handleData(json) {
		this.setState({
			loading: false,
			series: {
				title: json.Title,
				averageRating: this.getAverageRating(json.Episodes),
				seasons: json.totalSeasons,
			},
			episodes: json.Episodes,
		});
	}
	getAverageRating(episodes) {
		const totalRating = _.reduce(episodes, (memo, episode) => {
			return memo + parseFloat(episode.imdbRating);
		}, 0);
		return Number(Math.round((totalRating / episodes.length)+"e2")+"e-2");
	}
  	render() {
		const episodes = this.state ? this.state.episodes : [];
		const series = this.state ? this.state.series : {};
		return (
      		<div className={styles.root}>
				<Header {...series} loading={this.state ? this.state.loading : true} fetchSeries={this.fetchSeries.bind(this)} />
				<CellContainer episodes={episodes} />
			</div>
		);
	}
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

render(<App/>, document.querySelector("#app"));
