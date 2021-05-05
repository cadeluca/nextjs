const HexBlock = ({ color, colorName }) => {

	const copyColorToClipboard = (e) => {
		const hex = e.target.innerHTML;
		navigator.clipboard.writeText(hex);
	}

	return (
		<div className="colorRow">
			<div className="colBoxMini" style={{ background: color }} />
			<div>
				<span onClick={(e) => copyColorToClipboard(e)}>{color}</span> / {colorName}
			</div>
		</div>
	)
}

export default HexBlock;