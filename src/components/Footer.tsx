import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-center py-8 text-center">
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          Made only for academic research
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          © 2025 Academic Research Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}