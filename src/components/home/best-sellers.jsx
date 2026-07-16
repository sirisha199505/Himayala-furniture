import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts, bestSellersOf } from "@/lib/catalog";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ProductSlider } from "@/components/product/product-slider";
import { Button } from "@/components/ui/button";

export async function BestSellers() {
  const products = await getProducts();
  const featured = bestSellersOf(products);
  return (
    <section className="bg-beige/60 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow mb-3">Best Sellers</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
                Loved by thousands of homes
              </h2>
            </Reveal>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/products">
              View All <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          <ProductSlider products={featured} />
        </div>
      </Container>
    </section>);

}
