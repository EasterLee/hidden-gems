import type { ReactNode } from "react";

type ListProps = {
	children: ReactNode;
	className?: string;
};

export default function List(props: ListProps) {
	return (
		<>
			<div
				className={`text-mystic-text overflow-y-auto max-h-full scroll-area pe-5 ${props.className ?? ""}`}
			>
				<ul>{props.children}</ul>
			</div>
		</>
	);
}
