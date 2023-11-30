# react-native-prevent-screenshot

This module is used to prevent screen shots and detect screen shots.

## Installation

```sh
yarn add react-native-prevent-screenshot
```

## Usage

```js
import { useScreenshotDeterrent } from 'react-native-prevent-screenshot';

// ...

const [subscribe] = useScreenshotDeterrent();

React.useEffect(() => {
  const unsubscribe = subscribe(() => {
    console.warn('user took screen shots');
  });
  return () => {
    unsubscribe();
  };
}, [subscribe]);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
