import { useState, useEffect } from 'react';
import { posts as defaultPosts, BlogPost } from '@/data/posts';

export function usePosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = () => {
      try {
        const storedPosts = localStorage.getItem('blogPosts');
        const userPosts = storedPosts ? JSON.parse(storedPosts) : [];

        const allPosts = [...userPosts, ...defaultPosts];
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts(defaultPosts);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    const handleStorageChange = () => {
      loadPosts();
    };

    window.addEventListener('storage', handleStorageChange);
    
    window.addEventListener('postsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('postsUpdated', handleStorageChange);
    };
  }, []);

  const refreshPosts = () => {
    window.dispatchEvent(new Event('postsUpdated'));
  };

  // Function to get a single post by slug
  const getPostBySlug = (slug: string): BlogPost | null => {
    return posts.find(post => post.slug === slug) || null;
  };

  return { posts, loading, refreshPosts, getPostBySlug };
}