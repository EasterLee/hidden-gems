import { Link } from "react-router-dom";

function UploadOption({
	icon,
	text,
	to,
}: {
	icon: string;
	text: string;
	to: string;
}) {
	return (
		<Link
			to={to}
			className="my-3 px-5 py-1 bg-mystic-3 flex border-solid border rounded-lg border-mystic-1 items-center"
		>
			<img src={icon} className="size-10 me-2" />
			<p>{text}</p>
		</Link>
	);
}
function NavOption({
	icon,
	text,
	to,
}: {
	icon: string;
	text: string;
	to: string;
}) {
	return (
		<Link
			className="mx-8 my-2 py-1 px-2 flex items-center hover:bg-mystic-6 transition duration-300 ease-out rounded-lg"
			to={to}
		>
			<div
				style={{ maskImage: `url(${icon})` }}
				className="size-10 me-5 icon bg-mystic-1"
			></div>
			<p>{text}</p>
		</Link>
	);
}

export default function NavTab({
	appendFiles,
}: {
	appendFiles: (fileList: File[]) => void;
}) {
	return (
		<>
			<div className="flex flex-col items-center h-full text-mystic-text">
				<h2>Nav Tab</h2>
				<img className="size-25" src="hidden_gems.png" alt="" />
				<div className="mb-1 w-full">
					<NavOption icon="home.svg" text="Home" to="/"></NavOption>
					<NavOption
						icon="playlist.svg"
						text="Playlist"
						to="/playlist"
					></NavOption>
					<NavOption
						icon="heart.svg"
						text="Favorite"
						to="/favorite"
					></NavOption>
					<NavOption
						icon="history.svg"
						text="History"
						to="/history"
					></NavOption>
				</div>

				<div className="flex flex-col mb-1 px-5 w-full items-stretch">
					<h2>Upload</h2>
					<UploadOption
						icon={"yt_icon.svg"}
						text={"Upload From YouTube"}
						to="/"
					/>
					<input
						id="fileUpload"
						className="hidden"
						type="file"
						accept="audio/*"
						multiple
						onChange={(e) => {
							if (e.target.files)
								appendFiles(Array.from(e.target.files));
						}}
					/>
					<UploadOption
						icon={"file_icon.svg"}
						text={"Upload File"}
						to="/upload"
					/>
				</div>

				<div className="flex flex-col mb-5 px-5 w-full items-stretch">
					<h2>Playlist</h2>
					<div className="w-full bg-mystic-3 ps-2 py-1">
						<p>All Songs</p>
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
