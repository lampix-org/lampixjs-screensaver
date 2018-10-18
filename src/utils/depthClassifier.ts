import lampix from '@lampix/core';

const depthClassifier = (callback:Function) => {
  return new Promise(resolve => {
    const watcher:any = {
      type: 'segmenter',
      name: 'DepthClassifier',
      shape: lampix.helpers.rectangle(0, 0, 1280, 800),
      // onClassification: (detectedObjects:any) => {
      //   detectedObjects.forEach((obj:any) => console.log('classification', obj));
      // },
      onLocation: () => callback()
    };
    lampix.getLampixInfo().then((data: any) => console.log('Lampix info: ', data));
    lampix.watchers.add(watcher).then(([result]:any) => resolve(result));
  });
};

export default depthClassifier;
