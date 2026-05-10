import { describe, it, expect } from 'vitest';
import { WEDDING } from './wedding-data';

describe('WEDDING.location', () => {
  describe('좌표', () => {
    it('구로구 경인로 610의 정확한 좌표이어야 함', () => {
      expect(WEDDING.location.lat).toBe(37.5054141);
      expect(WEDDING.location.lng).toBe(126.8840785);
    });
  });

  describe('transport', () => {
    it('3가지 교통수단이 있어야 함', () => {
      expect(WEDDING.location.transport).toHaveLength(3);
    });

    describe('지하철 (subway)', () => {
      const subway = WEDDING.location.transport[0];

      it('아이콘은 subway이어야 함', () => {
        expect(subway.icon).toBe('subway');
      });

      it('제목은 지하철이어야 함', () => {
        expect(subway.title).toBe('지하철');
      });

      it('4개의 라인 정보가 있어야 함', () => {
        expect(subway.lines).toHaveLength(4);
      });

      it('신도림역 정보를 포함해야 함', () => {
        expect(subway.lines[0]).toContain('신도림역');
        expect(subway.lines[0]).toContain('1·2호선');
        expect(subway.lines[0]).toContain('도보 10분');
      });

      it('신도림역 셔틀버스 정보를 포함해야 함', () => {
        expect(subway.lines[1]).toContain('셔틀버스 수시 운행');
      });

      it('구로역 정보를 포함해야 함', () => {
        expect(subway.lines[2]).toContain('구로역');
        expect(subway.lines[2]).toContain('1호선');
        expect(subway.lines[2]).toContain('도보 5분');
      });

      it('구로역 셔틀버스 정보를 포함해야 함', () => {
        expect(subway.lines[3]).toContain('셔틀버스 미운행');
      });
    });

    describe('버스 (bus)', () => {
      const bus = WEDDING.location.transport[1];

      it('아이콘은 bus이어야 함', () => {
        expect(bus.icon).toBe('bus');
      });

      it('제목은 버스이어야 함', () => {
        expect(bus.title).toBe('버스');
      });

      it('8개 이상의 라인 정보가 있어야 함', () => {
        expect(bus.lines.length).toBeGreaterThanOrEqual(8);
      });

      it('신도림동 정류장 정보를 포함해야 함', () => {
        expect(bus.lines.join('\n')).toContain('신도림동');
      });

      it('신도림중학교 정류장 정보를 포함해야 함', () => {
        expect(bus.lines.join('\n')).toContain('신도림중학교');
      });

      it('경기일반 버스를 포함해야 함', () => {
        expect(bus.lines.join('\n')).toContain('경기일반');
      });

      it('간선 버스를 포함해야 함', () => {
        expect(bus.lines.join('\n')).toContain('간선');
      });
    });

    describe('자가용 (car)', () => {
      const car = WEDDING.location.transport[2];

      it('아이콘은 car이어야 함', () => {
        expect(car.icon).toBe('car');
      });

      it('제목은 자가용이어야 함', () => {
        expect(car.title).toBe('자가용');
      });

      it('3개의 라인 정보가 있어야 함', () => {
        expect(car.lines).toHaveLength(3);
      });

      it('주차 시간 정보를 포함해야 함', () => {
        expect(car.lines[0]).toContain('1시간 30분 무료');
      });

      it('주소(경인로 610)를 포함해야 함', () => {
        expect(car.lines[1]).toContain('경인로 610');
      });

      it('구 주소(신도림동 413-9)를 포함해야 함', () => {
        expect(car.lines[2]).toContain('신도림동 413-9');
      });
    });
  });
});
