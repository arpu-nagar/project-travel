import './App.css';
import { useState } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import SearchPhotos from './searchPhotos';

function App() {
	return (
		<div className="App">
			<h1 className="heading">TRAVELAND 📷</h1>
			<h3 className="subt">
				Wander around dream cities while listen to their favourite beats!{' '}
			</h3>
			<SearchPhotos />
		</div>
	);
}

export default App;
