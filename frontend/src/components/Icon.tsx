type IconProps = {
	src: string;
	cn: string;
};

export default function Icon(props: IconProps) {
	return (
		<div
			style={{ maskImage: `url(${props.src})` }}
			className={`icon ${props.cn}`}
		></div>
	);
}
