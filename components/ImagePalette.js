const ImagePalette = ({ image, data }) => {

	const openImg = (e) => {
		const url = e.target.src;
		if (!url.includes('data:image/')) {
			window.open(url, '_blank');
		} else {
			console.log('will not open base64 image in new tab');
		}
	}

	return (
		<div className="palCon">
			<div id="oneCon">
				<img id="theOne" src={image} onClick={openImg}></img>
			</div>
			<div className="colCon">
				<div className="colBox" style={{ background: data.lightVibrant }} />
				<div className="colBox" style={{ background: data.vibrant }} />
				<div className="colBox" style={{ background: data.darkVibrant }} />
				<div className="colBox" style={{ background: data.lightMuted }} />
				<div className="colBox" style={{ background: data.muted }} />
				<div className="colBox" style={{ background: data.darkMuted }} />
			</div>
		</div>
	)

}
export default ImagePalette;


