import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ShopClient from './ShopClient'

export const metadata = {
  title: 'Shop | RageCloud',
  description: 'Browse premium digital products from RageCloud',
}

export default function ShopPage() {
  return (
    <main className="bg-dark-950">
      <Navigation />
      <ShopClient />
      <Footer />
    </main>
  )
}
