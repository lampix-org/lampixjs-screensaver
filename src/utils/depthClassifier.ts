import lampix from '@lampix/core';

const depthClassifier = (callback:Function) => {
  return new Promise(resolve => {
    const watcher:any = {
      type: 'segmenter',
      name: 'DepthClassifier',
      shape: lampix.helpers.rectangle(0, 0, 1280, 800),
      params: {},
      // onClassification: (detectedObjects:any) => {
      //   detectedObjects.forEach((obj:any) => console.log('classification', obj));
      // },
      onClassification: callback,
      onLocation: callback
    };
    lampix.watchers.add(watcher).then(([result]:any) => resolve(result));
  });
};

export default depthClassifier;
