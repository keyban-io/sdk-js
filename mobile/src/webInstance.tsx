import {
  webViewRender,
  emit,
  useNativeMessage,
} from 'react-native-react-bridge/lib/web';

import {useEffect, useState} from 'react';

const Root = () => {
  const [instance, setInstance] = useState<any | null>(null);
  // useNativeMessage hook receives message from React Native
  useNativeMessage(message => {
    if (!instance) return;

    if (message.type === 'add') {
      const {params, id} = JSON.parse(message.data as string);
      const result = instance.add(params.num1, params.num2);
      emit({type: 'add', data: JSON.stringify({result, id})});
    }
  });

  useEffect(() => {
    const init = async () => {
      const bufferSrc = Uint8Array.from([
        0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x87, 0x80, 0x80,
        0x80, 0x00, 0x01, 0x60, 0x02, 0x7f, 0x7f, 0x01, 0x7f, 0x03, 0x82, 0x80,
        0x80, 0x80, 0x00, 0x01, 0x00, 0x07, 0x87, 0x80, 0x80, 0x80, 0x00, 0x01,
        0x03, 0x61, 0x64, 0x64, 0x00, 0x00, 0x0a, 0x8d, 0x80, 0x80, 0x80, 0x00,
        0x01, 0x87, 0x80, 0x80, 0x80, 0x00, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6a,
        0x0b,
      ]);

      const module = await WebAssembly.instantiate(bufferSrc);

      setInstance(module.instance.exports);
      emit({type: 'initialized', data: ''});
    };
    init();
  }, []);

  return <div>load end here</div>;
};

// This statement is detected by babelTransformer as an entry point
// All dependencies are resolved, compressed and stringified into one file
export default webViewRender(<Root />);
