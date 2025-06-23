import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  // This layout is no longer in the main auth flow but is kept to avoid breaking imports.
  return (
    <main>
      {children}
    </main>
  );
}
