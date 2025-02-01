"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNoteContext } from "@/lib/noteContext";
function NotePage() {
  const { noteMeta, setSelectedPage } = useNoteContext();
  const { totalNotes, totalPages, currentPage } = noteMeta;

  const handlePageChange = (newPage) => {
    setSelectedPage(newPage);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    endPage = Math.max(endPage, 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
            className={"hover:bg-blue-500 hover:text-white cursor-pointer"}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <Pagination className="absolute bottom-4 left-0 right-0 justify-center">
      <PaginationContent>
        <PaginationItem className="cursor-pointer hidden md:block">
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem className="cursor-pointer hidden md:block">
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export default NotePage;
