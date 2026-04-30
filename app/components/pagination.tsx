import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export const Paginationultra = ({ page, setPage }) => {
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(page - 1)} />
          </PaginationItem>

          {[1, 2, 3].map((p) => (
            <PaginationItem key={p}>
              <PaginationLink isActive={page === p} onClick={() => setPage(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext onClick={() => setPage(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
