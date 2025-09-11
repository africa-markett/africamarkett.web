
import Footer from './Footer';
import Header from './Header';
import styles from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className="text-ink flex min-h-screen flex-col">
      <Header styles={styles} />
      <main className="flex-1">{children}</main>
      <Footer styles={styles} />
    </div>
  );
}
