import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InfiniteSlider } from './InfiniteSlider';

describe('InfiniteSlider', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <InfiniteSlider>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </InfiniteSlider>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders children (duplicated for infinite effect)', () => {
    const { getAllByText } = render(
      <InfiniteSlider>
        <div>Item</div>
      </InfiniteSlider>
    );
    // Children are rendered twice for the infinite scroll effect
    expect(getAllByText('Item')).toHaveLength(2);
  });

  it('accepts custom className', () => {
    const { container } = render(
      <InfiniteSlider className="custom-slider">
        <div>S</div>
      </InfiniteSlider>
    );
    expect(container.firstChild).toHaveClass('custom-slider');
  });
});
