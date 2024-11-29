import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';

@Injectable()
export class FallingSnowService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private readonly isEnabled = signal(true);

  private static readonly NUMBER_OF_SNOWFLAKES = 150;
  private static readonly MAX_SNOWFLAKE_SIZE = 5;
  private static readonly MAX_SNOWFLAKE_SPEED = 0.01;
  private static readonly SNOWFLAKE_COLOR = '#ddd';

  private rafId: number | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private readonly PROPERTIES_PER_SNOWFLAKE = 5; // x, y, sway, radius, speed
  private snowflakes = new Float64Array(
    FallingSnowService.NUMBER_OF_SNOWFLAKES * this.PROPERTIES_PER_SNOWFLAKE,
  );

  private resizeListener: ((e: UIEvent) => void) | null = null;
  private scrollListener: ((e: Event) => void) | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => this.cleanup());
  }

  public toggleSnow(): void {
    this.isEnabled.set(!this.isEnabled());

    if (this.isEnabled()) {
      this.init();
    } else {
      this.cleanup();
    }
  }

  public isSnowEnabled(): boolean {
    return this.isEnabled();
  }

  init(): void {
    if (!this.isEnabled()) return;

    this.setupCanvas();
    this.initializeSnowflakes();
    this.setupEventListeners();
    this.animate();
  }

  private setupCanvas(): void {
    this.canvas = this.document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });

    if (!this.canvas || !this.ctx) return;

    this.canvas.style.position = 'absolute';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.top = '0';
    this.document.body.appendChild(this.canvas);

    this.updateCanvasSize();
  }

  private initializeSnowflakes(): void {
    if (!this.canvas) return;

    for (let i = 0; i < FallingSnowService.NUMBER_OF_SNOWFLAKES; i++) {
      const baseIndex = i * this.PROPERTIES_PER_SNOWFLAKE;

      this.snowflakes[baseIndex] = Math.random() * this.canvas.width;
      this.snowflakes[baseIndex + 1] = Math.random() * this.canvas.height;
      this.snowflakes[baseIndex + 2] = Math.random() * 0.5 - 0.25;
      this.snowflakes[baseIndex + 3] =
        Math.random() * FallingSnowService.MAX_SNOWFLAKE_SIZE + 1;
      this.snowflakes[baseIndex + 4] =
        Math.random() * FallingSnowService.MAX_SNOWFLAKE_SPEED + 0.5;
    }
  }

  private setupEventListeners(): void {
    this.resizeListener = (() => {
      let resizeTimeout: number;
      return () => {
        if (resizeTimeout) {
          window.cancelAnimationFrame(resizeTimeout);
        }
        resizeTimeout = window.requestAnimationFrame(() =>
          this.updateCanvasSize(),
        );
      };
    })();

    this.scrollListener = (() => {
      let scrollTimeout: number;
      return () => {
        if (scrollTimeout) {
          window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
          if (this.canvas) {
            this.canvas.style.top = `${window.scrollY}px`;
          }
        });
      };
    })();

    window.addEventListener('resize', this.resizeListener, { passive: true });
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  private updateCanvasSize(): void {
    if (!this.canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }
  }

  private animate = (): void => {
    if (!this.canvas || !this.ctx || !this.isEnabled()) {
      this.cleanup();
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.fillStyle = FallingSnowService.SNOWFLAKE_COLOR;

    for (let i = 0; i < FallingSnowService.NUMBER_OF_SNOWFLAKES; i++) {
      const baseIndex = i * this.PROPERTIES_PER_SNOWFLAKE;

      this.snowflakes[baseIndex + 1] += this.snowflakes[baseIndex + 4];
      this.snowflakes[baseIndex] += this.snowflakes[baseIndex + 2];

      if (this.snowflakes[baseIndex + 1] > this.canvas.height) {
        this.snowflakes[baseIndex + 1] = -this.snowflakes[baseIndex + 3];
        this.snowflakes[baseIndex] = Math.random() * this.canvas.width;
      }

      if (this.snowflakes[baseIndex] < -this.snowflakes[baseIndex + 3]) {
        this.snowflakes[baseIndex] =
          this.canvas.width + this.snowflakes[baseIndex + 3];
      } else if (
        this.snowflakes[baseIndex] >
        this.canvas.width + this.snowflakes[baseIndex + 3]
      ) {
        this.snowflakes[baseIndex] = -this.snowflakes[baseIndex + 3];
      }

      this.ctx.moveTo(
        this.snowflakes[baseIndex],
        this.snowflakes[baseIndex + 1],
      );
      this.ctx.arc(
        this.snowflakes[baseIndex],
        this.snowflakes[baseIndex + 1],
        this.snowflakes[baseIndex + 3],
        0,
        Math.PI * 2,
      );
    }

    this.ctx.fill();
    this.ctx.closePath();

    this.rafId = requestAnimationFrame(this.animate);
  };

  private cleanup(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }

    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
      this.scrollListener = null;
    }

    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
      this.ctx = null;
    }
  }
}
