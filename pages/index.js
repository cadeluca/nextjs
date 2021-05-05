import Head from 'next/head'
import { useState } from 'react'
import Logo from '../components/Logo';
import MyPalette from '../components/MyPalette';

var ProgressBar = require('progressbar.js')

export default function Home({ photo }) {
	const [pho, setPho] = useState(photo);

	function readURL() {
		const file = document.querySelector('input[type=file]').files[0];
		const reader = new FileReader();

		if (file) {
			reader.onloadend = () => {
				const image = reader.result;
				// console.log(image);
				setPho(image);
			}
			reader.readAsDataURL(file);
		}

		const inp = document.querySelector('input[type=file]');
		inp.value = '';
	}

	function getPhoto() {
		buttonLimiter();
		fetch(`https://source.unsplash.com/random/1280x720?sig=${Math.random()}`)
			.then((data) => {
				addBar();
				setPho(data.url)
			})
	}

	function buttonLimiter() {
		const btn = document.getElementById("mainbtn");
		btn.disabled = true;
		setTimeout(function () {
			btn.disabled = false;
		}, 5000)

	}

	function addBar() {
		var bar = new ProgressBar.Line('#container', {
			from: { color: '#000000' },
			to: { color: '#FFFFFF' },
			duration: 5000,
			// easing: 'easeIn', //easeInOut
			step: (state, bar) => {
				bar.path.setAttribute('stroke', state.color);
			}
		});
		bar.set(1.0);
		bar.animate(0.0, () => bar.destroy()) // Value from 0.0 to 1.0
	}

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
					</header>
					<p className="description">
						palette generator using unsplash. <br></br>click a hex code to copy color to your clipboard.
          </p>
					<div className="btnCont">
						<button id="mainbtn" className="regenBtn" onClick={getPhoto}>regenerate</button>
						<label htmlFor="uploadBannerImage" className="custom-file-upload">upload</label>
						<input type='file' id="uploadBannerImage" onChange={() => readURL(event)} />
					</div>
				</div>
				<MyPalette image={pho}></MyPalette>
			</main>
		</div>
	)
}

export async function getStaticProps() {
	const photoData = await fetch("https://source.unsplash.com/random/1280x720");
	const photo = photoData.url;

	return {
		props: {
			photo
		}
	}
}
