import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Location from './Location';
import { THEMES } from '@/lib/config/themes';

const theme = Object.values(THEMES)[0];

describe('Location 컴포넌트', () => {
  describe('지도 링크 버튼', () => {
    it('3개의 지도 버튼이 렌더링되어야 함', () => {
      render(<Location t={theme} />);
      expect(screen.getByRole('link', { name: '네이버지도' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '카카오맵' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'T map' })).toBeInTheDocument();
    });

    it('네이버지도 링크가 올바른 URL을 가져야 함', () => {
      render(<Location t={theme} />);
      const naverLink = screen.getByRole('link', { name: '네이버지도' });
      expect(naverLink).toHaveAttribute(
        'href',
        'https://map.naver.com/v5/search/더링크서울 트리뷰트 포트폴리오 호텔 웨딩'
      );
      expect(naverLink).toHaveAttribute('target', '_blank');
      expect(naverLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('카카오맵 링크가 올바른 URL을 가져야 함', () => {
      render(<Location t={theme} />);
      const kakaoLink = screen.getByRole('link', { name: '카카오맵' });
      expect(kakaoLink).toHaveAttribute(
        'href',
        'https://map.kakao.com/link/search/더링크서울'
      );
      expect(kakaoLink).toHaveAttribute('target', '_blank');
    });

    it('T map 링크가 올바른 URL을 가져야 함', () => {
      render(<Location t={theme} />);
      const tmapLink = screen.getByRole('link', { name: 'T map' });
      expect(tmapLink).toHaveAttribute(
        'href',
        'https://tmap.life/map?keyword=더링크서울'
      );
      expect(tmapLink).toHaveAttribute('target', '_blank');
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
