# rn-screenshot-detect

This module is used to prevent screen shots and detect screen shots.
The screen shot detection will only work on iOS, as Android does not provide the underlying functionality needed to track screenshots. But on Android, we can prevent user screen shots by using the `forbid()` method.

## Installation

```sh
yarn add rn-screenshot-detect
```

## Usage

```js
import { allow, forbid, useScreenshotDeterrent } from 'rn-screenshot-detect';

// ...

const [subscribe] = useScreenshotDeterrent();

React.useEffect(() => {
  forbid(); // work on android
  const unsubscribe = subscribe(() => {
    console.warn('user took screen shots');
  });
  return () => {
    allow(); // work on android
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
