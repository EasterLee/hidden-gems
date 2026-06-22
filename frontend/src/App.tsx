import "./App.css";
import NavTab from "./components/NavTab";
import MainView from "./components/MainView";
import PlayTab from "./components/PlayTab";
import UploadView from "./components/UploadView";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

export type FileInfo = {
	key: number;
	file: File;
};

function App() {
	let fileKey = 0;
	const [fileList, setFileList] = useState<FileInfo[]>([]);
	function appendFiles(f: File[]) {
		setFileList(
			fileList.concat(f.map((v) => ({ key: fileKey++, file: v }))),
		);
	}
	function removeFile(key: number) {
		setFileList(fileList.filter((v) => v.key != key));
	}
	return (
		<>
			<div className="w-screen h-screen max-h-screen bg-mystic-5 p-3 sniglet-regular">
				<div className="flex flex-col bg-mystic-4/70 size-full border-solid border-2 rounded-lg border-mystic-3">
					<div className="flex h-7/8">
						<div className="h-full w-75 bg-mystic-4 border-r-solid border-r-2 border-mystic-3 rounded-tl-lg">
							<NavTab appendFiles={appendFiles}></NavTab>
						</div>
						<div className="h-full flex-1">
							<MainView>
								<Routes>
									<Route
										path="/upload"
										element={
											<UploadView
												fileList={fileList}
												removeFile={removeFile}
											/>
										}
									/>
								</Routes>
							</MainView>
						</div>
					</div>
					<div className="w-full flex-1 bg-mystic-4 border-t-solid border-t-2 border-mystic-3 rounded-b-lg">
						<PlayTab></PlayTab>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
