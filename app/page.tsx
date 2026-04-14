import Nav from "@/components/shared/Nav";
import Header from "@/components/shared/Header";
import Themeshowcase from "@/components/features/Themeshowcase";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="">
      <Nav />
      <section className="p-4">
        <Header />
      </section>
      <section className="p-4">
        <Themeshowcase />
      </section>
      <Footer />
    </main>
  );
}