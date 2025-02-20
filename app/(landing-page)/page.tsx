import { FeatureGrid } from "@/components/landing-page/features";
import { Hero } from "@/components/landing-page/hero";
import { Video } from "@/components/landing-page/video";
import { stackServerApp } from "@/stack";

export default async function IndexPage() {
  return (
    <>
      <Hero
        title="A Faster AWS Lambda Editor"
        subtitle="Lambda Devbox is an editor that lets you write, test and debug your AWS Lambda functions in one place."
        primaryCtaText="Try for Free"
        primaryCtaLink={stackServerApp.urls.signUp}
      />

      <Video />

      <div id="features" />
      <FeatureGrid
        title="Features"
        subtitle="Write, test, debug in one place."
        items={[
          { icon: <></>, title: "Code Execution", description: "Run your Lambda code instantly in a secure environment without AWS setup." },
          { icon: <></>, title: "AWS Services", description: "Easily connect and test AWS services like S3 and DynamoDB with your function." },
          { icon: <></>, title: "Triggers", description: "Simulate S3 events and API Gateway calls." },
          { icon: <></>, title: "Logs & Debugging", description: "View real-time logs and debug errors inside the editor." },
        ]}
        ctaLink={stackServerApp.urls.signUp}
      />
    </>
  );
}
