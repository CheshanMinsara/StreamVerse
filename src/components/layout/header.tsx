"use client";

import Link from "next/link";
import { Search, Film, Tv, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Clapperboard } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/discover/movie", label: "Movies", icon: Film },
  { href: "/discover/tv", label: "TV Series", icon: Tv },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (debouncedSearchQuery) {
      current.set("q", debouncedSearchQuery);
    } else {
      current.delete("q");
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    const targetPath = debouncedSearchQuery ? `/search${query}` : (pathname === '/search' ? '/' : pathname + query);
    
    // Only push if the path or query is different
    if ( (pathname + '?' + searchParams.toString()) !== (targetPath + query) ) {
        router.push(targetPath);
    }

  }, [debouncedSearchQuery, router, pathname, searchParams]);
  
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const NavLinks = () => (
    <>
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Clapperboard className="h-6 w-6 text-accent" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
              StreamVerse
            </span>
          </Link>
          <nav className="hidden items-center space-x-2 md:flex">
             <NavLinks />
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search movies and shows..."
                  className="pl-9 w-full md:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
          </div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 py-6">
                  <Link href="/" className="mb-4 flex items-center space-x-2 px-3">
                     <Clapperboard className="h-6 w-6 text-accent" />
                     <span className="font-bold font-headline text-lg">
                       StreamVerse
                     </span>
                  </Link>
                  <nav className="flex flex-col gap-2">
                    <NavLinks />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
