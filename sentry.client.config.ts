import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4bbf156900f90cb062fb722956ebbd48@o4509180200419328.ingest.de.sentry.io/4509180204089424",
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      colorScheme: "system",
      autoInject: true,
      buttonLabel: "Feedback",
      submitButtonLabel: "Send Feedback",
      formTitle: "Send Feedback",
    }),
  ],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});
