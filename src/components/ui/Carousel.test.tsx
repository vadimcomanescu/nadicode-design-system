import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './Carousel';

// Embla carousel requires IntersectionObserver
beforeAll(() => {
  if (!globalThis.IntersectionObserver) {
    globalThis.IntersectionObserver = class IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      constructor(_callback: IntersectionObserverCallback) {}
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] { return []; }
    } as unknown as typeof IntersectionObserver;
  }
});

describe('Carousel', () => {
  function renderCarousel() {
    return render(
      <Carousel className="group">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }

  it('renders all slides', () => {
    renderCarousel();
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('has carousel region role with aria-roledescription', () => {
    renderCarousel();
    const region = screen.getByRole('region');
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('renders slides with slide aria-roledescription', () => {
    renderCarousel();
    const slides = screen.getAllByRole('group');
    expect(slides).toHaveLength(3);
    slides.forEach((slide) => {
      expect(slide).toHaveAttribute('aria-roledescription', 'slide');
    });
  });

  it('renders previous and next buttons', () => {
    renderCarousel();
    expect(screen.getByText('Previous slide')).toBeInTheDocument();
    expect(screen.getByText('Next slide')).toBeInTheDocument();
  });

  it('previous and next buttons have sr-only labels', () => {
    renderCarousel();
    expect(screen.getByText('Previous slide')).toHaveClass('sr-only');
    expect(screen.getByText('Next slide')).toHaveClass('sr-only');
  });
});
