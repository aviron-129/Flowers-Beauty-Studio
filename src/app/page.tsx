import { getLandingPageData } from "@/lib/site-data";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { PopularBouquets } from "@/components/sections/PopularBouquets";
import { Catalog } from "@/components/sections/Catalog";
import { Categories } from "@/components/sections/Categories";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Gallery } from "@/components/sections/Gallery";
import { About } from "@/components/sections/About";
import { Audience } from "@/components/sections/Audience";
import { OrderSteps } from "@/components/sections/OrderSteps";
import { Delivery } from "@/components/sections/Delivery";
import { Promo } from "@/components/sections/Promo";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { OrderForm } from "@/components/sections/OrderForm";
import { Contacts } from "@/components/sections/Contacts";
import { Footer } from "@/components/sections/Footer";
import { FloatingCTA } from "@/components/sections/FloatingCTA";
import { buildMessengerChannels } from "@/lib/messenger";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getLandingPageData();
  const messengerChannels = buildMessengerChannels(data.settings);

  return (
    <>
      <Header settings={data.settings} />
      <main>
        <Hero settings={data.settings} messengerChannels={messengerChannels} />
        <Benefits />
        <PopularBouquets products={data.popularBouquets} currency={data.currency} />
        <Catalog catalog={data.catalog} currency={data.currency} messengerChannels={messengerChannels} />
        <Categories categories={data.categories} />
        <Services />
        <Pricing />
        <Gallery />
        <About />
        <Audience />
        <OrderSteps />
        <Delivery />
        <Promo />
        <Reviews />
        <FAQ />
        <OrderForm messengerChannels={messengerChannels} />
        <Contacts settings={data.settings} messengerChannels={messengerChannels} />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
