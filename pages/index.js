import Head from 'next/head'
import { useState } from 'react'
import Logo from '../components/logo';
import MyPalette from '../components/MyPalette';
import ImagePalette from '../components/ImagePalette';
import { usePalette } from 'react-palette';
import { unsplash } from '../lib/unsplash';

export default function Home({ photo }) {
	const [image, setImage] = useState(photo);
	const { data, loading, error } = usePalette(image);

	function readURL() {
		const file = document.querySelector('input[type=file]').files[0];
		const reader = new FileReader();

		if (file) {
			reader.onloadend = () => {
				const image = reader.result;
				setImage(image);
			}
			reader.readAsDataURL(file);
		}

		const inp = document.querySelector('input[type=file]');
		inp.value = '';
	}

	// function getPhoto() {
	// 	buttonLimiter();
	// 	fetch(`https://source.unsplash.com/random/1280x720?sig=${Math.random()}`)
	// 		.then((data) => {
	// 			// addBar();
	// 			setImage(data.url)
	// 		})
	// }

	// function buttonLimiter() {
	// 	const btn = document.getElementById("mainbtn");
	// 	btn.disabled = true;
	// 	setTimeout(function () {
	// 		btn.disabled = false;
	// 	}, 5000)

	// }

	return (
		<div className="container">
			<Head>
				<title>tavolozza</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className="main-text">
					<header>
						<Logo></Logo>
						<h1 className="title">
							tavolozza
            </h1>
						<div id="container"></div>
					</header>
					<p className="description">
						palette generator using unsplash. <br></br>click a hex code to copy color to your clipboard.
          </p>
					<div className="btnCont">
						<button id="mainbtn" className="regenBtn" 
						// onClick={getPhoto}
						>regenerate</button>
						<label htmlFor="uploadBannerImage" className="custom-file-upload">upload</label>
						<input type='file' id="uploadBannerImage" onChange={() => readURL(event)} />
					</div>
				</div>
				<MyPalette data={data}></MyPalette>
				<ImagePalette image={image} data={data}></ImagePalette>
			</main>
		</div>
	)
}

export async function getStaticProps() {
	// const photoData = await fetch("https://source.unsplash.com/random/1280x720");
	// const photo = photoData.url;
	let foo = await unsplash.photos.getRandom({});

	let photo = foo.response.urls.raw;

	console.log(foo);
	return {
		props: {
			photo
		}
	}
}
