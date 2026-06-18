import Icon from "./Icon";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

type AudioParam = {
	src: string;
};

export default function AudioControl(param: AudioParam) {
	console.log(2);
	const [playState, setPlayState] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);
	const seekBarRef = useRef<HTMLInputElement>(null);
	const seekPercentage = useRef<number>(0);
	const seeking = useRef<boolean>(false);

	function updatePosition(percent: number) {
		let range = seekBarRef.current as HTMLInputElement;
		range.value = String(percent * 1000);
		range.style = `background-image: linear-gradient(
			to right,
			#ad3aad ${percent * 100}%,
			rgba(0, 0, 0, 0)  ${percent * 100}%
		);`;
	}

	function seekUpdate() {
		let audio = audioRef.current as HTMLAudioElement;
		if (seeking.current) return;
		updatePosition(audio.currentTime / audio.duration);
	}

	function seekTo(percent: number) {
		let audio = audioRef.current as HTMLAudioElement;
		audio.currentTime = percent * audio.duration;
		seekUpdate();
	}

	function onChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
		seekPercentage.current = Number(e.target.value) / 1000;
		updatePosition(seekPercentage.current);
	}
	function onPointerDown() {
		seeking.current = true;
	}
	function onPointerUp() {
		seeking.current = false;
		seekTo(seekPercentage.current);
	}

	useEffect(() => {
		let audio = audioRef.current as HTMLAudioElement;
		let res = fetch(`/stream/${param.src}`);
		res.then((val) => {
			val.json().then(({ url }) => {
				audio.src = url;
				audio.load();
			});
		});

		let id = setInterval(seekUpdate, 100);

		return () => {
			clearInterval(id);
		};
	}, []);

	return (
		<>
			<audio
				ref={audioRef}
				onEnded={() => {
					setPlayState(false);
				}}
			></audio>
			<button
				onClick={() => {
					if (playState) {
						audioRef.current!.pause();
					} else {
						audioRef.current!.play();
					}
					setPlayState(!playState);
				}}
			>
				<Icon
					src={playState ? "pause_button.svg" : "play_button.svg"}
					cn="size-10 bg-mystic-1 absolute top-3/7 left-1/2 -translate-1/2 origin-center hover:scale-120 transition duration-300 ease-out"
				></Icon>
			</button>
			<Icon
				src="forward.svg"
				cn="size-10 bg-mystic-1 absolute top-3/7 left-1/4 -translate-1/2 origin-center rotate-180"
			></Icon>
			<Icon
				src="forward.svg"
				cn="size-10 bg-mystic-1 absolute top-3/7 left-3/4 -translate-1/2 origin-center"
			></Icon>
			<input
				type="range"
				min="1"
				max="1000"
				ref={seekBarRef}
				onChange={onChange}
				onPointerDown={onPointerDown}
				onPointerUp={onPointerUp}
				className="absolute h-2 bottom-2 left-1/2 w-3/4 -translate-1/2 progress-bar rounded-lg shadow-lg shadow-mystic-1 border-b-mystic-6 border-b-2"
			/>
		</>
	);
}
