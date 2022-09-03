# useBreakpointChrome

> Use the Chrome breakpoints within javascript code.

## Usage

Check [useBreakpoint](./breakpoint.md) for more detailed usage

```typescript
import { useBreakpointChrome } from '@elonehoo/pistachio'

useBreakpointChrome();
/* Equivalent of:

useBreakpoint({
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop4K: 2560
})
*/
```
