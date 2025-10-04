import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { BookOpen, Home, User, PlusCircle, LogIn, LogOut, Shield } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-xl">Research Blog</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Button
            variant={isActive('/') ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>

          {/* Admin-only buttons */}
          {isAdmin && (
            <Button
              variant={isActive('/admin') ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/admin" className="flex items-center space-x-2">
                <PlusCircle className="h-4 w-4" />
                <span>Nuovo Post</span>
              </Link>
            </Button>
          )}
          
          <Button
            variant={isActive('/about') ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/about" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>About</span>
            </Link>
          </Button>

          {/* Auth Section */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>{user?.username}</span>
                  {isAdmin && <Badge variant="secondary" className="ml-1">Admin</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <User className="mr-2 h-4 w-4" />
                  {user?.username}
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Shield className="mr-2 h-4 w-4" />
                  Ruolo: {user?.role}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Pannello Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/login" className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}