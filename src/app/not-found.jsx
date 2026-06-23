import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 py-20">
      <div className="text-center">
        <p className="font-editorial text-[7rem] font-bold leading-none text-brand sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-charcoal sm:text-4xl">
          This page took a different turn
        </h1>
        <p className="mx-auto mt-3 max-w-md text-warmbrown/80">
          The page you're looking for doesn't exist or has moved. Let's get you
          back to beautiful living.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <Home size={18} /> Back Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              <Search size={18} /> Browse Furniture
            </Link>
          </Button>
        </div>
      </div>
    </section>);

}
