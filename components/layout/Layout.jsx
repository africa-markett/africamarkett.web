import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className="bg-neutrals-50 text-ink flex min-h-screen flex-col">
      <Header styles={styles} />
      <main className="flex-1">{children}</main>
      <Footer styles={styles} />
    </div>
  );
}
