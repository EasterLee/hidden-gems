import type { ReactNode } from "react";

type TableParam = {
	headers: string[];
	children: ReactNode;
};

export default function Table(param: TableParam) {
	return (
		<>
			<div className="text-mystic-text overflow-y-auto max-h-full scroll-area pe-5">
				<ul>
					<div className="ps-3 text-mystic-text flex justify-between pe-5 sticky top-0 bg-mystic-1/90">
						{param.headers.map((v) => (
							<h4>{v}</h4>
						))}
					</div>
					<hr className="border-t-2 border-mystic-1" />
					{param.children}
				</ul>
			</div>
		</>
	);
}

function TableEntry() {}
