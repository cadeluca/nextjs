import Head from 'next/head'
import { Palette } from 'react-palette';
import React, {useState} from 'react'
import Logo from '../components/logo';
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
    setTimeout(function() {
      btn.disabled = false;
    }, 5000)

  }

  function addBar() {
    var bar = new ProgressBar.Line('#container', {
      from: {color: '#000000'},
      to: {color: '#FFFFFF'},
      duration: 5000,
      // easing: 'easeIn', //easeInOut
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      }
  });
    bar.set(1.0);
    bar.animate(0.0, () => bar.destroy()) // Value from 0.0 to 1.0
  }

  function copyColorToClipboard(e) {
    // console.log(e.target.innerHTML)
    var color = e.target.innerHTML;
    navigator.clipboard.writeText(color)
  };

  function openImg(e) {
    var url = e.target.src;
    if (!url.includes('data:image/')) {
      window.open(url, '_blank')
    } else {
      console.log('will not open base64 image in new tab')
    }
  }

  return (
    <div className="container">
    <Head>
      <title>tavolozza</title> {/*swatches*/}
      <link rel="icon" href="/favicon.ico" />
      {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */}
    </Head>
    <Palette src={pho}>
      {({ data }) => (
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
            <div id="container"></div>
            <div className="colorRegion">
              <div className="colorRow">
                <div className="colBoxMini" style={{ background: data.lightVibrant }}/><div>
                  <span onClick={copyColorToClipboard}>{data.lightVibrant}</span> / light vibrant
                </div>
              </div>
              <div className="colorRow">
                <div className="colBoxMini" style={{ background: data.vibrant }}/><div>
                <span onClick={copyColorToClipboard}>{data.vibrant}</span> / vibrant
                </div>
              </div>
              <div className="colorRow">
                <div className="colBoxMini" style={{ background: data.darkVibrant }}/><div>
                <span onClick={copyColorToClipboard}>{data.darkVibrant}</span> / dark vibrant
                </div>
              </div>
              <div className="colorRow">
                <div className="colBoxMini" style={{ background: data.lightMuted }}/><div>
                <span onClick={copyColorToClipboard}>{data.lightMuted}</span> / light muted
                </div>
              </div>
              <div className="colorRow">
                <div className="colBoxMini" style={{ background: data.muted }}/><div>
                <span onClick={copyColorToClipboard}>{data.muted}</span> / muted
                </div>
              </div>
              <div className="colorRow">
                <div className="colBoxMini" style={{ background: data.darkMuted }}/><div>
                <span onClick={copyColorToClipboard}>{data.darkMuted}</span> / dark muted
                </div>
              </div>
            </div>
          </div>
          <div className="palCon">
            <div id="oneCon">
              <img id="theOne" src={pho} onClick={openImg}></img>
            </div>
            <div className="colCon">
              <div className="colBox" style={{ background: data.lightVibrant }}/>
              <div className="colBox" style={{ background: data.vibrant }}/>
              <div className="colBox" style={{ background: data.darkVibrant }}/>
              <div className="colBox" style={{ background: data.lightMuted }}/>
              <div className="colBox" style={{ background: data.muted }}/>
              <div className="colBox" style={{ background: data.darkMuted }}/>
            </div>
          </div>
        </main>
      )}
    </Palette>
    {/* <footer>
      <img src="GitHub-Mark-64px.png"></img>
    </footer> */}
    {/* <div id="stripes">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div> */}
  </div>
  )
}

export async function getStaticProps() {
  const photo = await fetch("https://source.unsplash.com/random/1280x720")
    .then((data) => { return data.url });
  return {
    props: {
      photo
    }
  }
}
