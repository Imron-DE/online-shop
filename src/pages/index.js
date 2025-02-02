import Hero from "@/components/organism/Hero";
import NewsLetter from "@/components/organism/NewsLetter";
import Offers from "@/components/organism/Offers";
import Popular from "@/components/organism/Popular";
import Testimonial from "@/components/organism/Testimonial";
import Layout from "@/components/templates/layout";

export default function Home() {
  return (
    <>
      <Layout>
        <Hero />
        <Popular />
        <Offers />
        <Testimonial />
        <NewsLetter />
      </Layout>
    </>
  );
}
