import type { ReactNode } from "react";

export default function MainView({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col h-full">
			<div className="flex bg-linear-to-r from-mystic-3/50 to-transparent">
				<h2 className="ms-5 my-2 ps-3 text-4xl text-mystic-text">
					Main View
				</h2>
			</div>

			<div className="flex-1 border-t-2 border-t-mystic-3 p-5 background-1 min-h-0">
				<div className="border-2 border-mystic-2 size-full rounded-4xl backdrop backdrop-brightness-50 backdrop-blur-xs p-7">
					{children}
				</div>
			</div>
		</div>
	);
}
