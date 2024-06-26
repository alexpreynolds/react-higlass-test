import React, { Component } from 'react';

import { 
  HiGlassComponent,
  // ChromosomeInfo,
} from "higlass";

import "higlass/dist/hglib.css";
import "bootstrap/dist/css/bootstrap.min.css";

// higlass-pileup
// ref. https://github.com/higlass/higlass-pileup
import "higlass-pileup/dist/higlass-pileup.js";

// higlass-sequence
// ref. https://github.com/higlass/higlass-sequence
import "higlass-sequence/dist/higlass-sequence.js";

//
// uncomment the imports below to use the higlass-transcripts plugin
//

// higlass-transcripts
// ref. https://github.com/higlass/higlass-transcripts
import "higlass-transcripts/dist/higlass-transcripts.js";
//
import { default as higlassRegister } from "higlass-register/dist/higlass-register";
import { BigwigDataFetcher } from "higlass-bigwig-datafetcher";
import { TabixDataFetcher } from "higlass-tabix-datafetcher";

import * as Constants from '../../Constants.js';

import './HgContainer.css';

class HgContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hgOptions: { // http://docs.higlass.io/javascript_api.html#overview
        bounded: true,
        sizeMode: "bounded",
        // viewMarginTop: 0,
        // viewMarginBottom: 0,
        viewMarginLeft: 0,
        viewMarginRight: 0,
        // viewPaddingTop: 0,
        // viewPaddingBottom: 0,
        viewPaddingLeft: 0,
        viewPaddingRight: 0,
      },
      hgViewconf: {},
    }
    this.hgViewRef = React.createRef();

    higlassRegister(
      {
        dataFetcher: BigwigDataFetcher,
        config: BigwigDataFetcher.config,
      },
      { pluginType: "dataFetcher" }
    );

    higlassRegister(
      {
        dataFetcher: TabixDataFetcher,
        config: TabixDataFetcher.config,
      },
      { pluginType: "dataFetcher" }
    );

    //
    // re-adjust height of target test track for convenience
    //

    let availableHeight = this.props.height - Constants.widgetHeight;
    const viewconf = JSON.parse(JSON.stringify(Constants.trackAViewconf));
    const topTracks = viewconf.views[0].tracks.top;
    for (const topTrack of topTracks) {
      if (topTrack.type !== "pileup") {
        availableHeight -= topTrack.height;
      }
      else {
        topTrack.height = availableHeight;
      }
    }
    this.state.hgViewconf = viewconf;
  }

  handleToggleSelect = (e) => {
    // console.log(`handleToggleSelect | ${JSON.stringify(e.target.value)}`);
    const d = e.target.value;
    let vc = null;
    switch (d) {
      case 'trackA':
        vc = JSON.parse(JSON.stringify(Constants.trackAViewconf));
        break;
      case 'trackB':
        vc = JSON.parse(JSON.stringify(Constants.trackBViewconf));
        break;
      default:
        throw new Error(`Unexpected track toggle value: ${d}`);
    }
    let availableHeight = this.props.height - Constants.widgetHeight;
    const topTracks = vc.views[0].tracks.top;
    for (const topTrack of topTracks) {
      if (topTrack.type !== "pileup") {
        availableHeight -= topTrack.height;
      }
      else {
        topTrack.height = availableHeight;
      }
    }
    this.setState({
      hgViewconf: vc,
    });
  }

  render() {
    return (
      (this.state.hgViewconf && this.props.height > 0) 
        ? 
        <div>
          <div className="toggleLayer">
            <select className="toggleSelect" onChange={(e) => this.handleToggleSelect(e)}>
              <option value="trackA" default>Track A</option>
              <option value="trackB">Track B</option>
            </select>
          </div>
          <div className="hgViewLayer" style={{width: this.props.width, height: this.props.height}}>
            <HiGlassComponent 
              key={"testHGC"}
              ref={this.hgViewRef}
              options={this.state.hgOptions}
              viewConfig={this.state.hgViewconf}
            /> 
          </div> 
        </div>
        :
        <div>
          <h6>loading HiGlassComponent...</h6>
        </div>
    );
  }
}

export default HgContainer;