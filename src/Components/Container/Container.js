import React, {useMemo, useEffect} from 'react';
import {useWindowSize} from 'react-use';

import HgContainer from '../HgContainer/HgContainer';
import * as Constants from '../../Constants.js';

function debounce(func, wait, immediate) {
  var timeout;
  return (...args) => {
    var context = this;
    var later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const Container = () => {
  const {width, height} = useWindowSize();

  const handleWindowSizeChange = useMemo(
    () => debounce((width, height) => { console.log(`debounced width: ${width} | height: ${height}`); }, Constants.windowSizeDebounceTime), 
    []
  );

  useEffect(() => {
    handleWindowSizeChange(width, height);
  }, [handleWindowSizeChange, width, height]);

  return (
    <div>
      <HgContainer
        className="hgViewLayer"
        width={width}
        height={height} 
        />
    </div>
  );  
};

export default Container;