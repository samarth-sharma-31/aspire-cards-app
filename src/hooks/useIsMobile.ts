import { useEffect, useLayoutEffect, useState } from 'react';
import {debounce} from 'lodash';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function resize() {
        const rootEle = document.getElementById('main-root-container')
        if(rootEle){
            setIsMobile(rootEle.clientWidth < 750);
        }
      }
      resize()
      window.onresize = resize;
    // updateSize();
    // return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
