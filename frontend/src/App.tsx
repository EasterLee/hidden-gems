import "./App.css";
import NavTab from "./components/NavTab";
import MainView from "./components/MainView";
import PlayTab from "./components/PlayTab";

function App() {
	return (
		<>
			<div className="w-screen h-screen bg-mystic-5 p-3 sniglet-regular">
				<div className="flex flex-col bg-mystic-4/70 size-full border-solid border-2 rounded-lg border-mystic-3">
					<div className="flex flex-1">
						<div className="h-full w-75 bg-mystic-4 border-r-solid border-r-2 border-mystic-3 rounded-tl-lg">
							<NavTab></NavTab>
						</div>
						<div className="h-full flex-1">
							<MainView></MainView>
						</div>
					</div>
					<div className="w-full h-25 bg-mystic-4 border-t-solid border-t-2 border-mystic-3 rounded-b-lg">
						<PlayTab></PlayTab>
					</div>
				</div>
			</div>
			{/* <h2>Hello</h2>
			<audio controls>
				<source
					src="http://localhost:3000/stream/mirror"
					type="audio/mpeg"
				/>
				Your browser does not support the audio element.
			</audio> */}
		</>
	);
}

export default App;
