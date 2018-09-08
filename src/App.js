import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '691d475943344cb9a931da300aebdb4e'
});

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height), 
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
                       this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;

    return (
      <div className="App">
        <Particles className='particles' params={ particlesOptions } />
        <Navigation onRouteChange={ this.onRouteChange} isSignedIn={ isSignedIn } />
        { route === 'home' 
          ? <div>
            <div className='center'>
              <Logo />
              <Rank />
            </div>
            <ImageLinkForm  onInputChange={ this.onInputChange } 
                            onButtonSubmit={ this.onButtonSubmit } />
            <FaceRecognition box={ box }imageUrl={ imageUrl } />
          </div>
          : this.state.route === 'signin'
            ? <Signin onRouteChange={ this.onRouteChange } /> 
            : <Register onRouteChange={ this.onRouteChange } /> 
        }
      </div>
    );
  }
}

export default App;
