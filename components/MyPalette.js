import HexBlock from './HexBlock';

const MyPalette = ({ data }) => {
	return (
		<div className="colorRegion">
			<HexBlock color={data.lightVibrant} colorName={"light vibrant"} />
			<HexBlock color={data.vibrant} colorName={"vibrant"} />
			<HexBlock color={data.darkVibrant} colorName={"dark vibrant"} />
			<HexBlock color={data.lightMuted} colorName={"light muted"} />
			<HexBlock color={data.muted} colorName={"muted"} />
			<HexBlock color={data.darkMuted} colorName={"dark muted"} />
		</div>
	)

}
export default MyPalette;


