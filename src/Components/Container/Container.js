import React, {useCallback, useEffect} from 'react';
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

  useEffect(() => {
    handleWindowSizeChange(width, height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const handleWindowSizeChange = useCallback(debounce((width, height) => {
    console.log(`debounced width: ${width} | height: ${height}`);
  }, Constants.windowSizeDebounceTime), [width, height]); 

  return (
    <div>
      <HgContainer
        width={width}
        height={height} 
        />
    </div>
  );  
};

export default Container;