import { useState, useEffect } from 'react';

export const usePagination = (initialPage = 1, initialLimit = 12) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });

  // Reset to first page when dependencies change
  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  // Update pagination data
  const updatePagination = (newPagination) => {
    setPagination(newPagination);
  };

  // Go to specific page
  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  // Go to next page
  const nextPage = () => {
    if (pagination.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (pagination.hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to first page
  const firstPage = () => {
    setCurrentPage(1);
  };

  // Go to last page
  const lastPage = () => {
    setCurrentPage(pagination.totalPages);
  };

  // Check if current page is valid
  const isValidPage = (page) => {
    return page >= 1 && page <= pagination.totalPages;
  };

  // Get page info
  const getPageInfo = () => {
    const startItem = (currentPage - 1) * pagination.limit + 1;
    const endItem = Math.min(currentPage * pagination.limit, pagination.total);
    
    return {
      startItem,
      endItem,
      totalItems: pagination.total,
      currentPage,
      totalPages: pagination.totalPages,
      itemsPerPage: pagination.limit
    };
  };

  // Generate page numbers for display
  const getPageNumbers = (maxVisible = 5) => {
    const pages = [];
    
    if (pagination.totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= pagination.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(pagination.totalPages, start + maxVisible - 1);
      
      // Adjust start if we're near the end
      if (end === pagination.totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return {
    // State
    currentPage,
    pagination,
    
    // Actions
    setCurrentPage,
    updatePagination,
    resetToFirstPage,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    
    // Utilities
    isValidPage,
    getPageInfo,
    getPageNumbers,
    
    // Computed values
    hasNext: pagination.hasNext,
    hasPrev: pagination.hasPrev,
    totalPages: pagination.totalPages,
    total: pagination.total,
    limit: pagination.limit
  };
}; 