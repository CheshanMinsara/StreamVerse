'use client'

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
    queryParams?: Record<string, string>;
}

export default function PaginationControls({ currentPage, totalPages, basePath, queryParams }: PaginationControlsProps) {
    const router = useRouter();

    const buildUrl = (page: number) => {
        const params = new URLSearchParams(queryParams);
        params.set('page', page.toString());
        return `${basePath}?${params.toString()}`;
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            router.push(buildUrl(currentPage - 1));
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages && currentPage < 500) {
            router.push(buildUrl(currentPage + 1));
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-12">
            <Button onClick={handlePrev} disabled={currentPage <= 1} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4"/>
                Previous
            </Button>
            <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages > 500 ? 500 : totalPages}
            </span>
            <Button onClick={handleNext} disabled={currentPage >= totalPages || currentPage >= 500} variant="outline">
                Next
                <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
        </div>
    );
}
