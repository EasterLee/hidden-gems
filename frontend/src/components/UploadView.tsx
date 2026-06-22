import { useState } from "react";
import type { FileInfo } from "../App";

type FileEntryParam = {
	fileInfo: FileInfo;
	removeFile: (key: number) => void;
};

function uploadWithProgress(
	presignedUrl: string,
	file: File,
	onProgress: (percentage: number) => void,
) {
	return new Promise<void>((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("PUT", presignedUrl);
		xhr.setRequestHeader("Content-Type", file.type);

		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable) {
				onProgress(Math.round((e.loaded / e.total) * 100));
			}
		};

		xhr.onload = () =>
			xhr.status >= 200 && xhr.status < 300
				? resolve()
				: reject(new Error(`Upload failed: ${xhr.status}`));
		xhr.onerror = () => reject(new Error("Network error"));
		xhr.send(file);
	});
}

function FileEntry(param: FileEntryParam) {
	const [progress, setProgress] = useState(0);
	async function uploadFile() {
		const res = await fetch("/api/uploads/presign", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: param.fileInfo.file.name,
			}),
		});

		const result = await res.json();
		const url = result.url as string;

		await uploadWithProgress(url, param.fileInfo.file, setProgress);
	}
	return (
		<>
			<li className="py-1 ps-3 bg-mystic-1/30 grid grid-cols-3">
				<p className="line-clamp-2">{param.fileInfo.file.name}</p>
				<div className="self-center">
					<div className="w-9/10 h-2 border border-mystic-text justify-self-center rounded-lg">
						<div
							className="h-full bg-mystic-6 rounded-lg"
							style={{ width: `${progress}%` }}
						></div>
					</div>
				</div>
				<div className="me-5 justify-self-end-safe">
					<button
						className="cursor-pointer mx-2"
						onClick={uploadFile}
					>
						Upload
					</button>
					<button
						className="cursor-pointer"
						onClick={() => {
							param.removeFile(param.fileInfo.key);
						}}
					>
						&#10005;
					</button>
				</div>
			</li>
			<hr className="border-t-2 border-mystic-1" />
		</>
	);
}

export default function UploadView({
	fileList,
	removeFile,
}: {
	fileList: FileInfo[];
	removeFile: (key: number) => void;
}) {
	return (
		<>
			<div className="text-mystic-text overflow-y-auto max-h-full scroll-area pe-5">
				<ul>
					<div className="ps-3 text-mystic-text flex justify-between pe-5 sticky top-0 bg-mystic-1/90">
						<h4>File Name</h4>
						<h4>Progress</h4>
						<h4>Action</h4>
					</div>
					<hr className="border-t-2 border-mystic-1" />
					{fileList.map((v) => (
						<FileEntry
							fileInfo={v}
							key={v.key}
							removeFile={removeFile}
						></FileEntry>
					))}
				</ul>
			</div>
		</>
	);
}
