import { useState } from "react";
import HexBlock from './HexBlock';
import { usePalette, Palette } from 'react-palette';

const MyPalette = ({ image }) => {

	const openImg = (e) => {
		const url = e.target.src;
		if (!url.includes('data:image/')) {
			window.open(url, '_blank');
		} else {
			console.log('will not open base64 image in new tab');
		}
	}


	return (
		<Palette src={image}>
			{({ data, loading, error }) => (
				!loading && (
					<div>
						<div>
							<div id="container"></div>
							<div className="colorRegion">
								{/* <div className="colorRow">
				<div className="colBoxMini" style={{ background: data.lightVibrant }} /><div>
					<span onClick={copyColorToClipboard}>{data.lightVibrant}</span> / light vibrant
			</div>
			</div> */}

								<HexBlock color={data.lightVibrant} colorName={"light virbant"} />
								{/* <div className="colorRow">
				<div className="colBoxMini" style={{ background: data.vibrant }} /><div>
					<span onClick={copyColorToClipboard}>{data.vibrant}</span> / vibrant
			</div>
			</div>
			<div className="colorRow">
				<div className="colBoxMini" style={{ background: data.darkVibrant }} /><div>
					<span onClick={copyColorToClipboard}>{data.darkVibrant}</span> / dark vibrant
			</div>
			</div>
			<div className="colorRow">
				<div className="colBoxMini" style={{ background: data.lightMuted }} /><div>
					<span onClick={copyColorToClipboard}>{data.lightMuted}</span> / light muted
			</div>
			</div>
			<div className="colorRow">
				<div className="colBoxMini" style={{ background: data.muted }} /><div>
					<span onClick={copyColorToClipboard}>{data.muted}</span> / muted
			</div>
			</div>
			<div className="colorRow">
				<div className="colBoxMini" style={{ background: data.darkMuted }} /><div>
					<span onClick={copyColorToClipboard}>{data.darkMuted}</span> / dark muted
			</div>
			</div> */}
							</div>
						</div>
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
					</div>
				)
			)}
		</Palette>
	)

}
export default MyPalette;


