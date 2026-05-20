import { useState, useEffect } from 'react';
import { searchMulti } from '../services/searchApi';
import { SearchResult } from '../types/api';

/**
 * Hook tùy chỉnh để thực hiện tìm kiếm phim (điện ảnh & truyền hình)
 * với cơ chế Debounce tự động giảm thiểu tần suất gọi API lên Server.
 * @param initialQuery Từ khóa mặc định ban đầu
 */
export function useSearch(initialQuery: string = '') {
  const [query, setQuery] = useState<string>(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Cơ chế Debounce: trì hoãn việc cập nhật debouncedQuery thêm 400ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Gọi API tìm kiếm mỗi khi debouncedQuery thay đổi
  useEffect(() => {
    const performSearch = async () => {
      const cleanQuery = debouncedQuery.trim();
      
      // Không thực hiện tìm kiếm nếu từ khóa dưới 2 ký tự
      if (cleanQuery.length < 2) {
        setResults([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const response = await searchMulti(cleanQuery);
        
        // Hỗ trợ lọc chỉ lấy kết quả phim điện ảnh (movie) và truyền hình (tv) theo yêu cầu
        const filtered = response.data.filter(
          (item) => item.mediaType === 'movie' || item.mediaType === 'tv'
        );
        
        setResults(filtered);
      } catch (err: any) {
        console.error('Lỗi trong quá trình tìm kiếm phim:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setResults([]); // Trả về mảng rỗng nếu lỗi
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearSearch: () => {
      setQuery('');
      setResults([]);
    }
  };
}
