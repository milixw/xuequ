'use strict';

// 费马点：纯几何计算，不依赖 DOM。点用 [x, y] 表示，单位是“格”，y 向下（和 SVG 一致，长度和角度不受影响）。
(function (root) {
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const total = (P, pts) => pts.reduce((s, q) => s + dist(P, q), 0);

  // ∠APB，单位度
  function angleAt(A, P, B) {
    const a = [A[0] - P[0], A[1] - P[1]], b = [B[0] - P[0], B[1] - P[1]];
    const la = Math.hypot(...a), lb = Math.hypot(...b);
    if (la < 1e-12 || lb < 1e-12) return NaN;
    const c = Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (la * lb)));
    return Math.acos(c) * 180 / Math.PI;
  }

  // 绕 c 转 deg 度（在 y 向下的坐标里，正角看上去是顺时针）
  function rotate(p, c, deg) {
    const t = deg * Math.PI / 180, x = p[0] - c[0], y = p[1] - c[1];
    return [c[0] + x * Math.cos(t) - y * Math.sin(t), c[1] + x * Math.sin(t) + y * Math.cos(t)];
  }

  // p 在直线 ab 的哪一侧：正、负或 0（在线上）
  const side = (p, a, b) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);

  // 以 AB 为边向外（和 O 在 AB 的两侧）作等边三角形，返回第三个顶点
  function apexOut(A, B, O) {
    const p = rotate(B, A, 60), q = rotate(B, A, -60);
    return side(p, A, B) * side(O, A, B) < 0 ? p : q;
  }

  // 把 X 绕 B 转 ±60°，转到直线 BC 和 A 不同的一侧那个方向（课本阅读材料的做法），返回转的角度 60 或 −60
  function awayTurn(A, B, C) {
    return side(rotate(C, B, 60), B, C) * side(A, B, C) < 0 ? 60 : -60;
  }

  // 直线 p1p2 和直线 p3p4 的交点，平行时返回 null
  function intersect(p1, p2, p3, p4) {
    const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
    if (Math.abs(d) < 1e-12) return null;
    const a = p1[0] * p2[1] - p1[1] * p2[0], b = p3[0] * p4[1] - p3[1] * p4[0];
    return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d];
  }

  // 三角形三个内角 [∠A, ∠B, ∠C]
  const angles = (A, B, C) => [angleAt(B, A, C), angleAt(A, B, C), angleAt(A, C, B)];

  // 费马点：有一个角 ≥ 120° 时是这个顶点；否则向外作等边三角形 ABD、BCE，CD 和 AE 的交点
  function fermat(A, B, C) {
    const ang = angles(A, B, C);
    const big = ang.findIndex(a => a >= 120);
    if (big >= 0) return [A, B, C][big];
    const D = apexOut(A, B, C), E = apexOut(B, C, A);
    return intersect(C, D, A, E);
  }

  // 任意几个点的距离和最小点（Weiszfeld 迭代）。最小点在某个已知点上时，迭代会卡住，所以也比较每个已知点
  function median(pts) {
    let P = [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
    for (let k = 0; k < 2000; k++) {
      let wx = 0, wy = 0, w = 0, hit = false;
      for (const q of pts) {
        const d = dist(P, q);
        if (d < 1e-12) { hit = true; break; }
        wx += q[0] / d; wy += q[1] / d; w += 1 / d;
      }
      if (hit) break;
      const N = [wx / w, wy / w];
      if (dist(N, P) < 1e-13) { P = N; break; }
      P = N;
    }
    for (const q of pts) if (total(q, pts) < total(P, pts)) P = q.slice();
    return P;
  }
  const minTotal = pts => total(median(pts), pts);

  // 数轴上：到 xs 各点距离和最小的区间 [lo, hi] 和最小值
  function lineMin(xs) {
    const s = xs.slice().sort((a, b) => a - b), n = s.length;
    const lo = s[Math.floor((n - 1) / 2)], hi = s[Math.floor(n / 2)];
    return { lo, hi, value: s.reduce((t, x) => t + Math.abs(x - lo), 0) };
  }
  const lineTotal = (x, xs) => xs.reduce((t, a) => t + Math.abs(x - a), 0);

  // 正方形 A 左上、B 右上、C 右下、D 左下（边长 s，左上角在 o）。路网 A、D 连 P，B、C 连 Q，P 连 Q
  const roadLen = (P, Q, sq) => dist(sq[0], P) + dist(sq[3], P) + dist(P, Q) + dist(sq[1], Q) + dist(sq[2], Q);
  function squareRoads(o, s) {
    const sq = [[o[0], o[1]], [o[0] + s, o[1]], [o[0] + s, o[1] + s], [o[0], o[1] + s]];
    const h = s / (2 * Math.sqrt(3));
    const P = [o[0] + h, o[1] + s / 2], Q = [o[0] + s - h, o[1] + s / 2];
    return { sq, P, Q, best: roadLen(P, Q, sq), cross: 2 * s * Math.SQRT2 };
  }

  const FermatLogic = { dist, total, angleAt, rotate, side, apexOut, awayTurn, intersect, angles, fermat, median, minTotal, lineMin, lineTotal, roadLen, squareRoads };
  if (typeof module !== 'undefined' && module.exports) module.exports = FermatLogic;
  else root.FermatLogic = FermatLogic;
})(this);
