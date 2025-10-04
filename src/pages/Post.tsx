import { useParams, Link, Navigate } from 'react-router-dom';
import { usePosts } from '@/hooks/usePosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/data/posts';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const { posts, loading } = usePosts();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (slug === 'preview') {
      // Load preview LocalStorage
      const previewData = localStorage.getItem('previewPost');
      if (previewData) {
        try {
          setPost(JSON.parse(previewData));
        } catch (error) {
          console.error('Error loading preview post:', error);
          setPost(null);
        }
      }
    } else {
      // Find post in regular posts
      const foundPost = posts.find(p => p.slug === slug);
      setPost(foundPost || null);
    }
    
    setPostLoading(false);
  }, [slug, posts, loading]);

  // Show loading while posts are being loaded
  if (loading || postLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Caricamento post...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Remember f post not found after loading is complete
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Post non trovato</h2>
            <p className="text-gray-600 mb-6">
              Il post che stai cercando non esiste o è stato rimosso.
            </p>
            <Button asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Torna alla homepage
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copiato negli appunti!');
      } catch (error) {
        toast.error('Errore nel copiare il link');
      }
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Research':
        return 'bg-blue-100 text-blue-800';
      case 'Homework':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <article className="container max-w-4xl py-8">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Torna a tutti i post
            </Link>
          </Button>

          {/* Preview Badge */}
          {slug === 'preview' && (
            <div className="mb-4">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                🔍 Anteprima - Questo post non è ancora pubblicato
              </Badge>
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-sm text-muted-foreground gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString('it-IT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>

            {slug !== 'preview' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-3 w-3" />
                    Condividi
                  </Button>
                </div>
              </div>
            )}

            <Separator className="mt-6" />
          </header>

          {/* Post Content */}
          <div className="prose prose-gray max-w-none">
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('### ')) {
                      return `<h3 class="text-xl font-semibold mt-8 mb-4">${line.slice(4)}</h3>`;
                    }
                    if (line.startsWith('## ')) {
                      return `<h2 class="text-2xl font-bold mt-10 mb-6">${line.slice(3)}</h2>`;
                    }
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-3xl font-bold mt-12 mb-8">${line.slice(2)}</h1>`;
                    }
                    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    if (line.startsWith('- ')) {
                      return `<li class="ml-4 mb-2">${line.slice(2)}</li>`;
                    }
                    if (line.trim() && !line.startsWith('<')) {
                      return `<p class="mb-4 leading-relaxed">${line}</p>`;
                    }
                    return line;
                  })
                  .join('')
              }}
            />
          </div>

          {/* Post Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <Button variant="outline" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Torna a tutti i post
                </Link>
              </Button>
              
              {slug !== 'preview' && (
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Condividi questo post
                </Button>
              )}
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}