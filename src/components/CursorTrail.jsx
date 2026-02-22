import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const trails = useRef([]);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Trail {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseSize = 4;
        this.size = this.baseSize;
        this.opacity = 0.5;
        this.life = 1;
      }

      update() {
        this.life -= 0.02;
        this.size = this.baseSize * this.life;
        this.opacity = 0.5 * this.life;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();

        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;

      for (let i = trails.current.length - 1; i >= 0; i--) {
        const t = trails.current[i];
        t.update();
        if (t.life <= 0) {
          trails.current.splice(i, 1);
        } else {
          t.draw();
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      trails.current.push(new Trail(e.clientX, e.clientY));
      if (trails.current.length > 50) trails.current.shift();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

export default CursorTrail;
