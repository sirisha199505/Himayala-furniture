import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ProductsExplorer } from "@/components/product/products-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Shop All Furniture",
  description:
  "Browse premium furniture from Himalayan Furniture Mart — sofas, beds, dining sets, office furniture, wardrobes, TV units and more. Filter by category, price, material and colour.",
  path: "/products"
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
        { name: "Home", url: "/" },
        { name: "Shop", url: "/products" }]
        )} />
      
      <PageHeader
        eyebrow="Shop"
        title="All Furniture"
        description="Explore our full range of premium, handcrafted furniture — designed for beautiful living and built to last."
        crumbs={[
        { name: "Home", href: "/" },
        { name: "Shop", href: "/products" }]
        } />
      
      <Container className="py-12">
        <Suspense fallback={<div className="py-20 text-center text-muted">Loading products…</div>}>
          <ProductsExplorer />
        </Suspense>
      </Container>
    </>);

}
