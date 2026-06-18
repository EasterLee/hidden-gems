import Icon from "./Icon";
import AudioControl from "./AudioControl";
import { useState } from "react";

const songList = [
	{
		songName: "Mirror",
		artistName: "2 Mello",
		fileUrl: "mirror.mp3",
	},
];

export default function PlayTab() {
	console.log(1);
	const songState = useState(0);
	return (
		<>
			<div className="h-full grid grid-cols-5">
				<div className="flex items-center">
					<div className="ms-5 p-1 bg-mystic-3 border-mystic-2 border shadow-lg shadow-mystic-1/50">
						<Icon src="music.svg" cn="size-15 bg-mystic-1 "></Icon>
					</div>
					<div className="ps-3 text-mystic-text">
						<p className="text-lg">
							{songList[songState[0]].songName}
						</p>
						<p className="text-sm">
							{songList[songState[0]].artistName}
						</p>
					</div>
				</div>
				<div className="col-span-3 relative">
					<AudioControl
						src={songList[songState[0]].fileUrl}
					></AudioControl>
				</div>
			</div>
		</>
	);
}
