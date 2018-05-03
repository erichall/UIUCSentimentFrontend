import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import DatePicker from './datePicker';
import { create_dataset, create_data } from './utils';
import { chartOptions } from './graphConf';
var _ = require('lodash');

const serverHost = typeof process.env.REACT_APP_SERVER_HOST === 'undefined' ? 'localhost' : process.env.REACT_APP_SERVER_HOST

const serverPort = typeof process.env.REACT_APP_SERVER_PORT === 'undefined' ? '8080' : process.env.REACT_APP_SERVER_PORT


const prod = 'http://backend-1.sentiment.eab445d0.cont.dockerapp.io:8080'

const server = serverHost + ':' + serverPort;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        labels: [],
        datasets: [
          'data': []
        ]
      },
      fetching: true
    };
  };

  fetch_data(start_date='2018-01-01', end_date='2018-02-01') {
      const url = server + `/sentiment_range?start_date=${start_date}&end_date=${end_date}.json`
      console.log('fetch data from: ', url)
      return axios.get(url)
  };

  setupGraph(start_date, end_date) {
    this.setState({fetching: true})
    this.fetch_data(start_date, end_date)
    .then(res => res.data)
    .then(data => {
      return Object.keys(data).reduce((acc,day) => {
          acc['label_dates'].push(day);
          acc['sentiments'].push(data[day]['sentiment']);
          acc['post_count'].push(data[day]['post_count']);
          return acc 
      },{label_dates: [], sentiments: [], post_count: []});
    })
    .then(({label_dates, sentiments, post_count}) => {
      const ema = sentiments.EMA(4);
      const ema_d = create_dataset(ema, 'Sentiments', 'rgba(243, 128, 37,1)', 'y-axis-1') 
      const post_counts = create_dataset(post_count, 'Post count', 'rgba(0, 61, 124,1)','y-axis-2') 
      const data_format = create_data(label_dates, [post_counts, ema_d]) 
      this.setState({data: data_format})
    })
    .then(() => this.setState({fetching: false }));
  };

  dateChanged(start_date, end_date){
    this.setupGraph(start_date.format('YYYY-MM-DD'), end_date.format('YYYY-MM-DD'))
  };

  componentDidMount(){
    this.setupGraph();
  };

  render() {
    return (
      <div className="App">
      
          <div className="Select-date">
            <h1>Sentiment Analysis for UIUC subreddit</h1>
            <DatePicker dateChanged={this.dateChanged.bind(this)}/>
          </div>

          <div style={{flex: 1, marginLeft: 50, marginRight: 50, marginTop: 100, marginBottom: 100}}>
          { !this.state.fetching && 
              <Line data={this.state.data} options={chartOptions} height={300}/> 
          }
          </div>
          <h1> What is Sentiment Analysis?</h1>
          <p className='text'> 
            Sentiment Analysis is the process of determining whether a piece of writing is positive, negative or neutral. It’s also known as opinion mining, deriving the opinion or attitude of a speaker. A common use case for this technology is to discover how people feel about a particular topic. </p>
      </div>
    );
  }
}


export default App;
