import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Save, Eye, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { BlogPost } from '@/data/posts';

function AdminContent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
      title: '',
      excerpt: '',
      content: ''
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    // Get existing posts from localStorage
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    
    const newPost: BlogPost = {
      id: (existingPosts.length + 1).toString(),
      title: formData.title,
      excerpt: formData.excerpt,
      date: new Date().toISOString().split('T')[0],
      slug: generateSlug(formData.title),
      content: formData.content
  };

    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));

    window.dispatchEvent(new Event('postsUpdated'));

    toast.success('Post pubblicato con successo!');

    setFormData({
      title: '',
      excerpt: '',
      content: '',
    });

    setTimeout(() => {
      navigate(`/post/${newPost.slug}`);
    }, 1000);
  };

  const handlePreview = () => {
    if (!formData.title || !formData.content) {
      toast.error('Inserisci almeno titolo e contenuto per l\'anteprima');
      return;
    }

    const previewPost = {
      ...formData,
      id: 'preview',
      date: new Date().toISOString().split('T')[0],
      slug: 'preview'
    };
    
    localStorage.setItem('previewPost', JSON.stringify(previewPost));
    window.open('/post/preview', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold">Pannello Amministratore</h1>
            <Badge variant="secondary">
              Benvenuto, {user?.username}
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Crea un nuovo post per il tuo blog
              </CardTitle>
              <CardDescription>
                Compila i campi sottostanti per aggiungere un nuovo homework o progetto di ricerca
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Titolo *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="es. HMWK Mark IV: Analisi statistica dei dati di cybersecurity"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Descrizione breve *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Una breve descrizione che apparirà nella lista dei post..."
                    rows={3}
                    required
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Contenuto del post *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Scrivi qui il contenuto completo del tuo post usando Markdown...

Esempio:
# Titolo Principale

## Introduzione
Il tuo contenuto qui...

### Sottosezione
- Punto 1
- Punto 2

**Testo in grassetto**

## Conclusioni
Le tue conclusioni..."
                    rows={15}
                    className="font-mono text-sm"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Pubblica Post
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePreview}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Anteprima
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Admin() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminContent />
    </ProtectedRoute>
  );
}