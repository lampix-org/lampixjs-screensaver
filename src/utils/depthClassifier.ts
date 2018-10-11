import lampix from '@lampix/core';

const depthClassifier = (callback:Function) => {
  const watcher:any = {
    type: 'segmenter',
    name: 'DepthClassifier',
    shape: lampix.helpers.rectangle(0, 0, 1280, 800),
    onClassification: (detectedObjects:any) => {
      detectedObjects.forEach((obj:any) => console.log('onClassification', obj.classTag, obj.outline));
    },
    onLocation: () => callback()
  };
  lampix.getLampixInfo().then((data: any) => console.log('Lampix info: ', data));
  lampix.watchers.add(watcher).then((result:any) => console.log('Watchers ready to be used', result));
  // setTimeout(() => lampix.watchers.remove(watcher).then(() => console.log('Watchers removed')), 1500);
};

export default depthClassifier;
