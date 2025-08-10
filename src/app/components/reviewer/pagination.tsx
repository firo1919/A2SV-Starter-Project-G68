'use client'

import { CustomButton } from "./custom-button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "./utils"

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 2) {
        pages.push("...");
      }
      if (currentPage > 1 && currentPage < totalPages) {
        pages.push(currentPage);
      }
      if (currentPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full max-w-[1280px] mx-auto px-8 py-6 flex items-center justify-between bg-gray-50">
      <div className="text-sm text-gray-600">
        {`Showing ${startItem} to ${endItem} of ${totalItems} results`}
      </div>
      <div className="flex items-center gap-1">
        <CustomButton
          variant="outline"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2"
        >
          <ChevronLeft className="h-4 w-4" />
        </CustomButton>

        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <CustomButton
              key={index}
              variant="outline"
              onClick={() => onPageChange?.(page)}
              className={cn(
                "min-w-[36px] p-2",
                page === currentPage && "border-2 border-[#4F46E5] text-[#4F46E5]"
              )}
            >
              {page}
            </CustomButton>
          ) : (
            <span key={index} className="px-2 text-gray-600">...</span>
          )
        )}

        <CustomButton
          variant="outline"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2"
        >
          <ChevronRight className="h-4 w-4" />
        </CustomButton>
      </div>
    </div>
  );
}
