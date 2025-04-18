import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Background from './components/Background';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Background />
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
