import React, { useState } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';

const unsplash = new Unsplash({
	accessKey: process.env.REACT_APP_ACCESS_KEY,
});

const opts = {
	height: '200px',
	width: '200px',
	playerVars: {
		autoPlay: 1,
	},
};
function _onReady(event) {
	// access to player in all event handlers via event.target
	event.target.pauseVideo();
}
export default function SearchPhotos() {
	const [query, setQuery] = useState('');
	const [pics, setPics] = useState([]);
	const [yt, setYT] = useState({
		load: false,
		id: '',
		url: '',
		play: true,
	});
	const searchPhotos = async (e) => {
		e.preventDefault();
		setYT({
			load: false,
			id: 'MhlecL-gx4s',
			url: '',
			play: true,
		});
		unsplash.search
			.photos(query)
			.then(toJson)
			.then(async (json) => {
				// console.log(json);
				setPics(json.results);
				const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}%20song&type=video&key=${process.env.REACT_APP_YT}`;
				const load = await axios.get(url);
				console.log(load.data.items[0].id.videoId);
				setYT({
					load: true,
					id: load.data.items[0].id.videoId,
					url:
						'https://www.youtube.com/watch?v=' + load.data.items[0].id.videoId,
				});
			});
	};

	return (
		<>
			<form className="form" onSubmit={searchPhotos}>
				{' '}
				<label className="label" htmlFor="query">
					{' '}
				</label>
				<input
					type="text"
					name="query"
					className="input"
					placeholder={`Search a city you wanna visit. :)`}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type="submit" className="button">
					Search
				</button>
				{/* {yt.load ? ( */}
				{/* <YouTube videoId={yt.id} opts={opts} onReady={_onReady} /> */}
				<ReactPlayer
					url={yt.url}
					playsInline={true}
					playing={true}
					height="0"
					width="0"
				/>
				{/* // ) : null} */}
			</form>

			<div className="card-list">
				{pics.map((pic) => (
					<div className="card" key={pic.id}>
						<img
							className="card--image"
							alt={pic.alt_description}
							src={pic.urls.full}
							width="50%"
							height="50%"
						></img>
					</div>
				))}{' '}
			</div>
		</>
	);
}
