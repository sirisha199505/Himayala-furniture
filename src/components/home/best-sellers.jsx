import { getProducts, bestSellersOf } from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { BestSellersCarousel } from "@/components/home/best-sellers-carousel";

export async function BestSellers() {
  const products = await getProducts();
  const featured = bestSellersOf(products);
  return (
    <section className="bg-beige/60 py-16 sm:py-20">
      <Container>
        <BestSellersCarousel products={featured} />
      </Container>
    </section>);

}
