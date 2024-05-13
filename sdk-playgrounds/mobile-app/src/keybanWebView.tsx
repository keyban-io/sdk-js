import {WebViewRoot} from '@keyban/sdk-react-native/dist/web';
import {webViewRender} from 'react-native-react-bridge/lib/web';

const Wrapper = () => {
  return (
    <div>
      test
      <WebViewRoot />
    </div>
  );
};

export default webViewRender(<Wrapper />);
