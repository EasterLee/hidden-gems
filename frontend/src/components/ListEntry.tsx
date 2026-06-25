import type { ReactNode } from "react";

type ListEntryProps = {
	children: ReactNode;
};

function ListEntry(props: ListEntryProps) {
	return (
		<>
			<li className="py-1 ps-3 bg-mystic-1/30">{props.children}</li>
			<hr className="border-t-2 border-mystic-1" />
		</>
	);
}

type ListHeaderProps = {
	children: ReactNode;
};

function ListHeader(props: ListHeaderProps) {
	return (
		<>
			<div className="ps-3 text-mystic-text pe-5 sticky top-0 bg-mystic-1/90">
				{props.children}
			</div>
			<hr className="border-t-2 border-mystic-1" />
		</>
	);
}

export { ListEntry, ListHeader };
