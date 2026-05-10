import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MapView from './MapView';

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: ({ url }: { url: string }) => <div data-testid="tile-layer" data-url={url} />,
  Marker: ({ position }: { position: [number, number] }) => (
    <div data-testid="marker" data-lat={position[0]} data-lng={position[1]} />
  ),
}));

vi.mock('leaflet', () => ({
  default: {
    divIcon: ({ html }: { html: string }) => ({ html }),
  },
}));

describe('MapView 컴포넌트', () => {
  it('MapContainer가 렌더링되어야 함', () => {
    render(<MapView lat={37.5085} lng={126.8676} accentColor="#8A8A8A" />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('OpenStreetMap TileLayer가 사용되어야 함', () => {
    render(<MapView lat={37.5085} lng={126.8676} accentColor="#8A8A8A" />);
    const tile = screen.getByTestId('tile-layer');
    expect(tile.getAttribute('data-url')).toContain('openstreetmap.org');
  });

  it('마커가 올바른 좌표에 렌더링되어야 함', () => {
    render(<MapView lat={37.5085} lng={126.8676} accentColor="#8A8A8A" />);
    const marker = screen.getByTestId('marker');
    expect(marker.getAttribute('data-lat')).toBe('37.5085');
    expect(marker.getAttribute('data-lng')).toBe('126.8676');
  });
});
