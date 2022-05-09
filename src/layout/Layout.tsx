import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

interface LayoutComponent {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutComponent) {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
}
