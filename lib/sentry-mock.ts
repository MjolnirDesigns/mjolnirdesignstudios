// lib/sentry-mock.ts
const mockSentry = {
    init: () => {},
    captureException: () => {},
    captureMessage: () => {},
    configureScope: () => {},
    setUser: () => {},
    // Add other Sentry methods you use as no-ops
  };
  
  export default mockSentry;