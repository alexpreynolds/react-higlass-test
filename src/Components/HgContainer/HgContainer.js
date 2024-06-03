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
import { TabixDataFetcher } from "higlass-tabix-datafetcher";

import * as Constants from '../../Constants.js';

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

    //
    // uncomment the higlass-register call to use the tabix data fetcher (to support the higlass-transcripts plugin)
    //

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

    let availableHeight = this.props.height - 60;
    const viewconf = JSON.parse(JSON.stringify(Constants.baseHg38Viewconf));
    const topTracks = viewconf.views[0].tracks.top;
    for (const topTrack of topTracks) {
      if (topTrack.type !== "horizontal-transcripts") {
        availableHeight -= topTrack.height;
      }
      else {
        topTrack.height = availableHeight;
      }
    }
    this.state.hgViewconf = viewconf;
  }

  render() {
    return (
      (this.state.hgViewconf && this.props.height > 0) 
        ? 
        <div style={{width: this.props.width, height: this.props.height}}>
          <HiGlassComponent 
            key={"testHGC"}
            ref={this.hgViewRef}
            options={this.state.hgOptions}
            viewConfig={this.state.hgViewconf}
          /> 
        </div> 
        :
        <div>
          <h6>loading HiGlassComponent...</h6>
        </div>
    );
  }
}

export default HgContainer;