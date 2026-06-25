type IconProps = {
	src: string;
	className: string;
};

export default function Icon(props: IconProps) {
	return (
		<div
			style={{ maskImage: `url(${props.src})` }}
			className={`icon ${props.className}`}
		></div>
	);
}
