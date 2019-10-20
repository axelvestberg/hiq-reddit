import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Posts from './Posts';
import PostShow from './PostShow';
import './App.css';
import history from '../history';

const AppNew = () => {
		return (
			<div className="ui container app-bg">
				<Router history={history}>
					<div>
						<Header />
						<Switch>
							<Route path="/" exact component={Posts} />
							<Route path="/:subreddit" exact component={Posts} />
							<Route path="/:subreddit/comments/:id" exact component={PostShow} />
						</Switch>
					</div>
				</Router>
			</div>
		);
};

export default AppNew;