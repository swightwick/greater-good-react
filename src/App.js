import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // ES6
import axios from 'axios';
import './App.css';
import logo from './img/gg.png';
import video from './lp.mp4';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom'
var SC = require('soundcloud');

// SC settings
const clientId = 'KyZEBUaphfHpKKZ9B0H9JsmvDULUPAkj';
const trackId1 = '244035956';
const trackId2 = '174693848';
const trackId3 = '171843057';

class SCPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cover: '',
      band: '',
      song: '',
      isPLayingClass: 'closed',
      playerIcon: 'ion-ios7-play'
    };
  };
  componentDidMount() {
    // Init SoundCloud JS SDK
    SC.initialize({
      client_id: this.props.clientId
    });
    
    // Getting SC track infos
    SC.get('/tracks/'+ this.props.trackId, function(track){

      this.setState({
        cover: track.artwork_url.replace('-large', '-crop'),
        band: track.user.username,
        song: track.title
      });
      
      // Create audio stream
      this.audioStream = new Audio(track.uri +'/stream?client_id='+ this.props.clientId);
    }.bind(this));
  }
    // Handle play / pause status switch
  togglePlay(){
    isPlaying: false
    // play / pause switch
    this.isPlaying = !this.isPlaying;
    
    // handle dynamic css classes
    this.setState({
      isPLayingClass: this.isPlaying ? 'open' : 'closed',
      playerIcon: this.isPlaying ? 'ion-ios7-pause' : 'ion-ios7-play'
    });
    
    // play / pause audio stream
    this.isPlaying ? this.audioStream.play() : this.audioStream.pause();
  }
  render() {
    return (
      <div id="player" className={this.state.isPLayingClass}>
      
      <div id="cover">
        <img src={this.state.cover} width="250" height="250" alt="" id="artwork" />
        <div id="trackInfos">
          <p id="track">{this.state.song}</p>

          <a href="#" id="play" className={this.state.playerIcon} onClick={this.togglePlay}></a>
        </div>
      </div>
    </div>
    )
  }
}

class ReactSoundcloud extends Component {
  
    static defaultProps = { 
      width: "100%",
      height: "450px",
      url: "https://soundcloud.com/icebound/dusty-breaks-at-the-bottom-of-the-random-crates",
      autoPlay: false,
      hideRelated: false,
      showComments: true,
      showUser: true,
      showReposts: false,
      visual: true,
      color: "ff5500"
    };
  
    render() {
      const { url, width, height, autoPlay, hideRelated, 
              showComments, showUser, showReposts, visual, color } = this.props;
  
      var src = visual ? 
                  `https://w.soundcloud.com/player/?url=${url}&amp;auto_play=${autoPlay}&amp;hide_related=${hideRelated}&amp;show_comments=${showComments}&amp;show_user=${showUser}&amp;show_reposts=${showReposts}&amp;visual=${visual}` :
                  `https://w.soundcloud.com/player/?url=${url}&amp;color=${color}&amp;auto_play=${autoPlay}&amp;hide_related=${hideRelated}&amp;show_comments=${showComments}&amp;show_user=${showUser}&amp;show_reposts=${showReposts}`;
  
      return (
        <iframe 
          width={ width } 
          height={ visual ? height : "auto" } 
          scrolling="no" 
          frameborder="no" 
          src={ src } />
      );
    };
  }


class Album extends React.Component {
  render() {
    return (
        <div className="six columns bg album">
          <a href={this.props.album.link} target="_blank" rel="noopener noreferrer" className="listen">
            <img src={this.props.album.image} rel="noopener noreferrer" alt={ this.props.album.alt } />
          </a>
            <span>{this.props.album.name}</span>
              <p>{this.props.album.year}</p>
              <hr/>
            <a href={this.props.album.link} target="_blank" rel="noopener noreferrer" className="listen">Download</a>
        </div>
    )
  }
}

class AlbumList extends React.Component {
  render() {
    const albums = [
      { id: '1', name: 'Lost Galaxies', image: 'https://f4.bcbits.com/img/a2166116565_16.jpg', link: 'https://greatergoodbeats.bandcamp.com/album/lost-galaxies', alt:'Lost galaxies', year: '2014' },
      { id: '2', name: 'Effortless EP', image: 'https://f4.bcbits.com/img/a4229218851_16.jpg', link: 'https://greatergoodbeats.bandcamp.com/album/effortless-ep', alt:'Effortless', year: '2014' },
      { id: '3', name: 'Startgazing', image: 'https://f4.bcbits.com/img/a2333490904_16.jpg', link: 'https://greatergoodbeats.bandcamp.com/album/stargazing', alt:'Stargazing', year: '2013' },
      { id: '4', name: 'Unheardof', image: 'https://f4.bcbits.com/img/a2629100912_16.jpg', link: 'https://greatergoodbeats.bandcamp.com/album/unheardof', alt:'Unheardof', year: '2015' }
    ]
    return (
      <div>
        {
          albums.map((album => <Album album={album} key={album.id}/>))
        }
       </div>
    )
  }
}

class Instagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }
  componentDidMount() {
        var th = this;
      axios.get('https://igpi.ga/greater_good/media/')
        .then(function(result) {    
          th.setState({
            data: result.data.items
          });
    })
  } 
  render() {
    return (
      <div>   
        {this.state.data.map(function(item, index) {
          return (
            <div key={index} className="gram">
              <a href={item.link}>
                <img alt={item.caption.text} src={item.images.standard_resolution.url}/>
              </a>
              <p>{item.caption.text}</p>
            </div>
          );
        })}
      </div>
    );
  }

}

const Releases = () => (
  <div style={{...styles.fill, background: ''}}>
  <ScrollToTopOnMount/>
    <div className="container">
       <div className="row">
          <AlbumList/>
       </div>
    </div>
    <Footer/>
  </div>
)



class Feed extends React.Component {
  render() {
    return (
      <div style={{...styles.fill, background: ''}}>
        <div className="container">
            <Instagram/>
        </div>
      </div>
    )
  }
  componentDidMount() {
    console.log('feed mounted');
  }
}


const Home = () => (
  <div style={{...styles.fill, background: ''}}>
  <ScrollToTopOnMount/>
    <Video/>
    <div className="container home">
      <div className="row">
          <section id="intro" className="twelve columns">
          <span data-content="instrumentals">instrumentals</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-content="beats">beats</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-content="soundscapes">soundscapes</span>
          </section>
          <section id="bio" className="twelve columns">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </section>
          <section id="music" className="twelve columns">
             <div className="embedHolder"> 
              <ReactSoundcloud height="135" url="https://soundcloud.com/greatergoodbeats/lowband"/>
              </div>
              <div className="embedHolder"> 
              <ReactSoundcloud height="135" url="https://soundcloud.com/greatergoodbeats/landing"/>
              </div>
              <div className="embedHolder"> 
              <ReactSoundcloud height="135" url="https://soundcloud.com/greatergoodbeats/ray-vendetta-broken-ladders-ft-saab-produced-by-greater-good"/>
              </div>
          </section>
      </div>
    </div>
    <Footer/>
  </div>
)

const Logo = () => (
    <img src={logo} alt="Logo" id="logo"/>
)


class Video extends Component {
    constructor (props) {
        super(props);
        this.state = {
            videoURL: 'video/lp.mp4'
        }
    }

    render () {
        return (
          <div className="cover">
            <div className="video-wrapper wrapper">
              <video autoPlay="autoplay" loop="true" preload="true" poster="poster.jpg"><source src="video/lp.mp4"></source><source src="https://s3-us-west-2.amazonaws.com/pieoneers/videos/pieoneers-hero-video.webm"></source></video>
            </div>
            <div className="hero-wrapper wrapper">
              <div className="hero">
                <Logo/>
              </div>
            </div>

          </div>
        )
    }
};


const Footer = () => (
  <footer>
    <div className="container home">
       <div className="row">
         <div className="twelve columns bg">
            <Social/>
          </div>
       </div>
     </div>
  </footer>
)

class ScrollToTopOnMount extends Component {
  componentDidMount(prevProps) {
    window.scrollTo(0, 0)
  }

  render() {
    return null
  }
}

class Social extends React.Component {

  render() {
    return (
      <div>
        <div id="social">
          <a href="https://twitter.com/greatergood13" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter-square" aria-hidden="true"></i></a>
          <a href="https://www.instagram.com/greater_good/" rel="noopener noreferrer" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a>
          <a href="http://" rel="noopener noreferrer" target="_blank"><i className="fa fa-envelope-o" aria-hidden="true"></i></a>
        </div>
      </div>
    )
  }
}



const styles = {}

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

const Main = () => (
  <div>
      <Route exact path='/' component={Home}/>
      <Route path='/releases' component={Releases}/>
      <Route path='/feed' component={Feed}/>
  </div>
)

const App = () => (
  <Router>
    <Route render={({ location }) => (
      <div>
        <header>
        <Route exact path="/" render={() => (
          <Redirect to="/"/>
        )}/>

        <ul>
        <li><NavLink to='/' activeClassName='active'>Home</NavLink></li>
        <li><NavLink to='/releases' activeClassName='active'>Releases </NavLink></li>
        <li><NavLink to='/feed' activeClassName='active'>Feed</NavLink></li>
        </ul>
        </header>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={100}>
            <Route
              location={location}
              key={location.key}
              path="/"
              component={Main}
            />

          </CSSTransitionGroup>

      </div>
    )}/>
  </Router>
)



export default App
