import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Location from './Location';
import { THEMES } from '@/lib/config/themes';
import { WEDDING } from '@/lib/wedding-data';

const theme = Object.values(THEMES)[0];

describe('Location 컴포넌트', () => {
  describe('구글 지도 iframe', () => {
    it('iframe이 렌더링되어야 함', () => {
      render(<Location t={theme} />);
      const iframe = screen.getByTitle('웨딩홀 위치');
      expect(iframe).toBeInTheDocument();
    });

    it('iframe src에 정확한 좌표가 포함되어야 함', () => {
      render(<Location t={theme} />);
      const iframe = screen.getByTitle('웨딩홀 위치');
      const src = iframe.getAttribute('src') ?? '';
      expect(src).toContain(String(WEDDING.location.lat));
      expect(src).toContain(String(WEDDING.location.lng));
      expect(src).toContain('maps.google.com');
    });
  });

  describe('지도 링크 버튼', () => {
    it('3개의 지도 버튼이 렌더링되어야 함', () => {
      render(<Location t={theme} />);
      expect(screen.getByRole('link', { name: '네이버지도' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '카카오맵' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'T map' })).toBeInTheDocument();
    });

    it('네이버지도 링크가 주소 검색 URL이어야 함', () => {
      render(<Location t={theme} />);
      const naverLink = screen.getByRole('link', { name: '네이버지도' });
      expect(naverLink).toHaveAttribute('href', expect.stringContaining('map.naver.com'));
      expect(naverLink).toHaveAttribute('href', expect.stringContaining(encodeURIComponent(WEDDING.address)));
      expect(naverLink).toHaveAttribute('target', '_blank');
    });

    it('카카오맵 링크가 주소 검색 URL이어야 함', () => {
      render(<Location t={theme} />);
      const kakaoLink = screen.getByRole('link', { name: '카카오맵' });
      expect(kakaoLink).toHaveAttribute('href', expect.stringContaining('map.kakao.com'));
      expect(kakaoLink).toHaveAttribute('href', expect.stringContaining(encodeURIComponent(WEDDING.address)));
    });

    it('T map 버튼이 onClick 핸들러를 가져야 함', () => {
      render(<Location t={theme} />);
      const tmapLink = screen.getByRole('link', { name: 'T map' });
      expect(tmapLink).toBeInTheDocument();
      // href="#" + onClick으로 fallback 처리
      expect(tmapLink).toHaveAttribute('href', '#');
    });
  });

  describe('교통 정보 렌더링', () => {
    it('지하철 정보가 렌더링되어야 함', () => {
      render(<Location t={theme} />);
      expect(screen.getByText(/1·2호선 신도림역 1번 출구/)).toBeInTheDocument();
      expect(screen.getByText(/셔틀버스 수시 운행/)).toBeInTheDocument();
      expect(screen.getByText(/1호선 구로역 3번 출구/)).toBeInTheDocument();
    });

    it('버스 정보가 렌더링되어야 함', () => {
      render(<Location t={theme} />);
      expect(screen.getByText(/\[신도림동\(구로역\)\]/)).toBeInTheDocument();
      expect(screen.getByText(/경기일반/)).toBeInTheDocument();
    });

    it('자가용 정보가 렌더링되어야 함', () => {
      render(<Location t={theme} />);
      expect(screen.getByText(/웨딩고객 주차 1시간 30분 무료/)).toBeInTheDocument();
      expect(screen.getAllByText(/서울특별시 구로구 경인로 610/).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/신도림동 413-9/)).toBeInTheDocument();
    });
  });
});
