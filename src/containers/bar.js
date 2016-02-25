import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestCountries } from '../actions/request_country';
import { getAllData } from '../actions/get_all_data';
import worldGlobe from '../components/world_view.js';

class Bar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        year: 2002,
        currentIssue: '',
      };
      this.props.getAllData();
      this.getAnnualData = this.getAnnualData.bind(this);
      this.extraFunction = this.extraFunction.bind(this);
      this.povertyButton = this.povertyButton.bind(this);
      this.waterPollutionButton = this.waterPollutionButton.bind(this);
      this.foodScarcityButton = this.foodScarcityButton.bind(this);
      this.getCurrentIssue = this.getCurrentIssue.bind(this);
    }

    extraFunction(event) {
      //console.log('this is the new state', this.state.year);
      this.setState({ year: event.target.value }, this.getAnnualData.bind(this));
      this.getCurrentIssue();

    }

    getAnnualData() {
      let storage = [];

      for (var i = 0; i < this.props.allData.length; i++) {
        if (this.props.allData[i].year == this.state.year) {
          storage.push(this.props.allData[i]);
        }
      }

      var currentData = this.state.currentIssue;
      if (currentData === 'poverty') {
        this.povertyButton();
      };

      if (currentData === 'waterPollution') {
        this.waterPollutionButton();
      };

      if (currentData === 'foodScarcity') {
        this.foodScarcityButton();
      };

    }

    povertyButton() {
      let stats = [];
      let lowrange = undefined;
      let highrange = 0;

      for (var i = 0; i < this.props.allData.length; i++) {
        if (this.props.allData[i].year == this.state.year) {
          if (this.props.allData[i].category === 'Poverty') {
            if (this.props.allData[i].value === 0) {
              //do nothing
            } else {
              if (lowrange === undefined) {
                lowrange = this.props.allData[i].value;
              }

              if (lowrange > this.props.allData[i].value) {
                lowrange = this.props.allData[i].value;
              }

              if (highrange < this.props.allData[i].value) {
                highrange = this.props.allData[i].value;
              }

              stats.push(this.props.allData[i]);
            }
          }
        }
      }

      this.setState({ currentIssue: 'poverty' });
      worldGlobe.renderGlobeStats(stats, lowrange, highrange, 'poverty');
    }

    foodScarcityButton() {
      let stats = [];
      let lowrange = undefined;
      let highrange = 0;

      for (var i = 0; i < this.props.allData.length; i++) {
        if (this.props.allData[i].year == this.state.year) {
          if (this.props.allData[i].category === 'Food Scarcity') {
            if (this.props.allData[i].value === 0) {
              //do nothing
            } else {
              if (lowrange === undefined) {
                lowrange = this.props.allData[i].value;
              }

              if (lowrange > this.props.allData[i].value) {
                lowrange = this.props.allData[i].value;
              }

              if (highrange < this.props.allData[i].value) {
                highrange = this.props.allData[i].value;
              }

              stats.push(this.props.allData[i]);
            }
          }
        }
      }

      this.setState({ currentIssue: 'foodScarcity' });
      worldGlobe.renderGlobeStats(stats, lowrange, highrange, 'food scarcity');
    }

    waterPollutionButton() {
      let stats = [];
      let lowrange = undefined;
      let highrange = 0;

      for (var i = 0; i < this.props.allData.length; i++) {
        if (this.props.allData[i].year == this.state.year) {
          if (this.props.allData[i].category === 'Water Pollution') {
            if (this.props.allData[i].value === 0) {
              //do nothing
            } else {
              if (lowrange === undefined) {
                lowrange = this.props.allData[i].value;
              }

              if (lowrange > this.props.allData[i].value) {
                lowrange = this.props.allData[i].value;
              }

              if (highrange < this.props.allData[i].value) {
                highrange = this.props.allData[i].value;
              }

              stats.push(this.props.allData[i]);
            }
          }
        }
      }

      this.setState({ currentIssue: 'waterPollution' });
      worldGlobe.renderGlobeStats(stats, lowrange, highrange, 'water pollution');
    }

    getCurrentIssue () {
      console.log('CURRENT ISSUE : ', this.state.currentIssue);
    }

    render() {
      return (
        <div>
          <div className="barSlider">
            <input type="range" min="1990"
              max="2015"
              step="1"
              id="fader"
              onChange={
                 this.extraFunction
              }
              >
              <datalist id="steplist">
              <output id="volume">2002</output>
              </datalist>
            </input>
            <span>{this.state.year}</span>
          </div>
          <div className="issues">
            <ul>
              <li className='category' onClick={this.povertyButton}>Poverty</li>
              <li className='category' onClick={this.waterPollutionButton}>Water Pollution</li>
              <li className='category' onClick={this.foodScarcityButton}>Food Scarcity</li>
            </ul>
          </div>
        </div>
      );
    }
  }

function mapStateToProps({ allData }) {
    return { allData };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAllData }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
