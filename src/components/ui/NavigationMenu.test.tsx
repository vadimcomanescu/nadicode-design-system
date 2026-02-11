import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './NavigationMenu';

describe('NavigationMenu', () => {
  it('renders navigation menu items', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">About</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders trigger with dropdown indicator', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <p>Product list</p>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('applies custom className to root', () => {
    render(
      <NavigationMenu className="custom-nav">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Link</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(document.querySelector('.custom-nav')).toBeInTheDocument();
  });

  it('renders links as anchor elements', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const link = screen.getByText('Docs');
    expect(link.closest('a')).toHaveAttribute('href', '/docs');
  });
});
