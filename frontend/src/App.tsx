function App() {
	return (
		<>
			<h2>Hello</h2>
			<audio controls>
				<source
					src="http://localhost:3000/stream/mirror"
					type="audio/mpeg"
				/>
				Your browser does not support the audio element.
			</audio>
			;
		</>
	);
}

export default App;
