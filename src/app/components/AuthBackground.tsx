"use client";

export function AuthBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* main mesh gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 50%, rgba(108,92,231,0.12) 0%, transparent 40%)," +
            "radial-gradient(ellipse at 85% 20%, rgba(0,206,201,0.10) 0%, transparent 40%)," +
            "radial-gradient(ellipse at 50% 80%, rgba(9,132,227,0.08) 0%, transparent 40%)",
        }}
      />
      {/* floating orb 1 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          top: "-10%",
          left: "-15%",
          background: "radial-gradient(circle, rgba(108,92,231,0.18) 0%, transparent 70%)",
          animation: "authOrb1 14s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      {/* floating orb 2 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 360,
          height: 360,
          bottom: "5%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(0,206,201,0.15) 0%, transparent 70%)",
          animation: "authOrb2 18s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      {/* floating orb 3 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 240,
          height: 240,
          top: "40%",
          right: "15%",
          background: "radial-gradient(circle, rgba(9,132,227,0.12) 0%, transparent 70%)",
          animation: "authOrb3 22s ease-in-out infinite",
          filter: "blur(30px)",
        }}
      />
      {/* subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
