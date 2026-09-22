import Nav from "@/components/shared/Nav";
import Header from "@/components/shared/Header";
import Themeshowcase from "@/components/features/Themeshowcase";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Nav />
      <Header />
      <div className="flex-1">
        <Themeshowcase />
      </div>
      <Footer />
    </div>
  );
}