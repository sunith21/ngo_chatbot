import { useEffect, useRef } from "react";
import particleThemes from "../data/particleThemes";

const ParticleConstellation = ({ activeField }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: null, y: null });
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const COLOR = particleThemes[activeField] || particleThemes.default;
    const PARTICLE_COUNT = 100;
    const MAX_CONNECT_DIST = 150;
    const GRAVITY_RADIUS = 150;
    const GRAVITY_STRENGTH = 0.05;
    const RETURN_SPEED = 0.02;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.origVx = this.vx;
        this.origVy = this.vy;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        if (mouse.current.x !== null) {
          const dx = mouse.current.x - this.x;
          const dy = mouse.current.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < GRAVITY_RADIUS) {
            const force = (GRAVITY_RADIUS - dist) / GRAVITY_RADIUS;
            this.vx += (dx / dist) * force * GRAVITY_STRENGTH;
            this.vy += (dy / dist) * force * GRAVITY_STRENGTH;
          }
        }

        this.vx += (this.origVx - this.vx) * RETURN_SPEED;
        this.vy += (this.origVy - this.vy) * RETURN_SPEED;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1;
          this.origVx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1;
          this.origVy *= -1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = COLOR;
        ctx.fill();

        ctx.shadowBlur = 4;
        ctx.shadowColor = COLOR;
      }
    }

    const init = () => {
      particles.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.current.push(new Particle());
      }
    };

    const connect = () => {
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_CONNECT_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = COLOR;
            ctx.lineWidth = 0.5 * (1 - dist / MAX_CONNECT_DIST);
            ctx.globalAlpha = 1 - dist / MAX_CONNECT_DIST;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;

      particles.current.forEach((p) => {
        p.update();
        p.draw();
      });

      connect();
      requestRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, [activeField]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticleConstellation;
