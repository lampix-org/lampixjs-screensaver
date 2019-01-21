import lampix from '@lampix/core';

const depthClassifier = (callback:Function) => {
  return new Promise(resolve => {
    const watcher:any = {
      name: 'DepthClassifier',
      shape: lampix.helpers.rectangle(0, 0, 1280, 800),
      params: {
        frames_until_stable: 1
      },
      onClassification: callback,
    };
    lampix.watchers.add(watcher).then(([result]:any) => resolve(result));
  });
};

export default depthClassifier;
