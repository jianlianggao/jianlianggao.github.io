import Benifits from "./Components/Benifits";
import Button from "./Components/Button";
import Collabration from "./Components/Collabration";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Pricing from "./Components/Pricing";
import Roadmap from "./Components/Roadmap";
import Services from "./Components/Services";
import ButtonGradient from "./assets/svg/ButtonGradient";
function App() {
  return (
    <>
      <div className="overflow-hidden ">
        <Header />
        <Hero />
        <Benifits />
        <Collabration />
        <Services />
        <Pricing />
        <Roadmap />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
}

export default App;
