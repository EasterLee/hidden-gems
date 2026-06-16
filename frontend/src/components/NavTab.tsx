import { Component } from "react";

function UploadOption({ icon, text }: { icon: string; text: string }) {
	return (
		<div className="my-3 px-5 py-1 bg-mystic-3 flex border-solid border-1 rounded-lg border-mystic-1 items-center">
			<img src={icon} className="size-10 me-2" />
			<p>{text}</p>
		</div>
	);
}
function NavOption({ icon, text }: { icon: string; text: string }) {
	return (
		<div className="mx-8 my-2 py-1 px-2 flex items-center hover:bg-mystic-6 transition duration-300 ease-out rounded-lg">
			<div
				style={{ maskImage: `url(${icon})` }}
				className="size-10 me-5 icon bg-mystic-1"
			></div>
			<p>{text}</p>
		</div>
	);
}

export default function NavTab() {
	return (
		<>
			<div className="flex flex-col items-center h-full text-white">
				<h2>Nav Tab</h2>
				<img className="size-25" src="hidden_gems.png" alt="" />
				<div className="mb-1 w-full">
					<NavOption icon="home.svg" text="Home"></NavOption>
					<NavOption icon="playlist.svg" text="Playlist"></NavOption>
					<NavOption icon="heart.svg" text="Favorite"></NavOption>
					<NavOption icon="history.svg" text="History"></NavOption>
				</div>

				<div className="flex flex-col mb-1 px-5 w-full items-stretch">
					<h2>Upload</h2>
					<UploadOption
						icon={"yt_icon.svg"}
						text={"Upload From YouTube"}
					/>
					<UploadOption
						icon={"file_icon.svg"}
						text={"Upload From File"}
					/>
				</div>

				<div className="flex flex-col mb-5 px-5 w-full items-stretch">
					<h2>Playlist</h2>
					<div className="w-full bg-mystic-3 ps-2 py-1">
						<p>Playlist 1</p>
					</div>
					<hr />
					<div className="w-full bg-mystic-3 ps-2 py-1">
						<p>Playlist 1</p>
					</div>
					<hr />
				</div>
			</div>
		</>
	);
}
