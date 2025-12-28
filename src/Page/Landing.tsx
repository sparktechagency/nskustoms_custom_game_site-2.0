"use client";
import Header from "@/src/components/Landing/Header";
import Herosection from "@/src/components/herosection/herosection";
import RankUpProcess from "@/src/components/Landing/RankUpProcess";
import ServicesSection from "@/src/components/Landing/ServicesSection";
import FAQSection from "@/src/components/Landing/FAQSection";
import CommunitySection from "@/src/components/Landing/CommunitySection";
import BoostSection from "@/src/components/Landing/BoostSection";
import Boostersbacked from "@/src/components/Landing/Boostersbacked";
import Footer from "../components/Landing/Footer";
function LandingPage() {
  return (
    <div className=" min-h-screen dark:bg-black">
      <Header />
      <Herosection />
      <RankUpProcess />
      <Boostersbacked />
      <CommunitySection />
      <BoostSection />
      <FAQSection />
      <ServicesSection />
      <Footer />
    </div>
  );
}
export default LandingPage;
