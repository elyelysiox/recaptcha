(function() {
   /* Copyright Google LLC SPDX-License-Identifier: Apache-2.0*/
   var W = function(f, r, M, E, F, n) {
         if (M.F == M)
            for (F = B(r, M), r == 348 || r == 214 || r == 347 ? (r = function(U, t, v, L) {
                  if (L = F.length, t = (L | 0) - 4 >> 3, F.d4 != t) {
                     t = (((v = [0, 0, n[1], n[2]], F)
                        .d4 = t, t) << 3) - 4;
                     try {
                        F.ZE = re(fN(F, (t | 0) + 4), fN(F, t), v)
                     } catch (K) {
                        throw K;
                     }
                  }
                  F.push(F.ZE[L & 7] ^ U)
               }, n = B(433, M)) : r = function(U) {
                  F.push(U)
               }, E && r(E & 255), M = f.length, E = 0; E < M; E++) r(f[E])
      },
      w = function(f, r, M, E, F, n) {
         if (M.P.length) {
            M.U = !(M.s5 = (M.U && ":TQR:TQR:"(), f), 0);
            try {
               E = M.G(), M.R = E, M.N = E, M.C = 0, M.B = 0, n = E2(f, M), f = r ? 0 : 10, F = M.G() - M.N, M.Wp += F, M.js && M.js(F - M.I, M.u, M.L, M.B), M.I = 0, M.u = false, M.L = false, F < f || M.Qh-- <= 0 || (F = Math.floor(F), M.Pp.push(F <= 254 ? F : 254))
            } finally {
               M.U = false
            }
            return n
         }
      },
      S = this || self,
      o4 = function(f, r, M, E, F) {
         (M = (M = (E = f & 3, f &= 4, X(r)), F = X(r), B(M, r)), f) && (M = MI("" + M)), E && W(T(2, M.length), F, r), W(M, F, r)
      },
      B = function(f, r) {
         if (r = r.W[f], r === void 0) throw [q, 30, f];
         if (r.value) return r.create();
         return (r.create(f * 3 * f + -45 * f + -43), r)
            .prototype
      },
      b = function(f, r, M, E, F, n, U, t) {
         if (r.F = ((r.Z += (t = (F = (n = (U = r.X > (f || r.C++, 0) && r.U && r.s5 && r.A <= 1 && !r.K && !r.v && (!f || r.Ss - M > 1) && document.hidden == 0, r)
               .C == 4) || U ? r.G() : r.R, F) - r.R, t >> 14) > 0, r.i) && (r.i ^= (r.Z + 1 >> 2) * (t << 2)), r)
            .Z + 1 >> 2 != 0 || r.F, n || U) r.R = F, r.C = 0;
         if (!U) return false;
         if (F - r.N < r.X - ((r.X > r.B && (r.B = r.X), E) ? 255 : f ? 5 : 2)) return false;
         return !(r.v = ((Z(r, (E = B(f ? 483 : 75, (r.Ss = M, r)), 75), r.S), r.P)
            .push([KN, E, f ? M + 1 : M, r.u, r.L]), Fp), 0)
      },
      Z = function(f, r, M) {
         if (r == 75 || r == 483) f.W[r] ? f.W[r].concat(M) : f.W[r] = ge(M, f);
         else {
            if (f.cp && r != 290) return;
            r == 182 || r == 348 || r == 435 || r == 347 || r == 457 || r == 106 || r == 390 || r == 433 || r == 214 || r == 464 ? f.W[r] || (f.W[r] = PR(M, f, r, 78)) : f.W[r] = PR(M, f, r, 57)
         }
         r == 290 && (f.i = Q(false, 32, f), f.J = void 0)
      },
      u = function(f, r) {
         f.P.splice(0, 0, r)
      },
      e = function(f, r, M, E, F, n, U, t) {
         t = this;
         try {
            z7(M, E, U, this, r, f, n, F)
         } catch (v) {
            k(this, v), M(function(L) {
               L(t.T)
            })
         }
      },
      I4 = function(f, r, M, E, F, n) {
         if ((F = f[0], F) == nN) {
            if (n = r.O(f)) n.o7 = S.setTimeout(function(U) {
               u(r, (U = (n.bN = true, !r.P.length && !r.U), u(r, n.O5), n.iN)), U && w(true, true, r)
            }, n.timeout), r.Y.push(n)
         } else if (F == BR) r.Qh = 25, r.L = true, r.lN = r.D() - f[2], r.O(f);
         else if (F == V) {
            M = f[1][3];
            try {
               E = r.T || r.O(f)
            } catch (U) {
               k(r, U), E = r.T
            }
            M((f = r.G(), E)), r.I += r.G() - f
         } else if (F == KN) f[3] && (r.u = true), f[4] && (r.L = true), r.O(f);
         else if (F == U2) r.u = true, r.O(f);
         else if (F == tw) {
            try {
               for (E = 0; E < r.kq.length; E++) try {
                  M = r.kq[E], M[0][M[1]](M[2])
               } catch (U) {}
            } catch (U) {}((0, f[1])(function(U, t) {
               r.GV(U, true, t)
            }, function(U) {
               (u((U = !r.P.length && !r.U, r), [iH]), U) && w(true, false, r)
            }, function(U) {
               return r.TV(U)
            }, (E = (r.kq = [], r)
               .G(),
               function(U, t, v) {
                  return r.vp(U, t, v)
               })), r)
            .I += r.G() - E
         } else {
            if (F == WR) return E = f[2], Z(r, 467, f[6]), Z(r, 345, E), r.O(f);
            F == iH ? (r.W = null, r.Pp = [], r.V = []) : F == vR && S.document.readyState === "loading" && (r.v = function(U, t) {
               function v() {
                  t || (t = true, U())
               }
               S.document.addEventListener("DOMContentLoaded", v, (t = false, we)), S.addEventListener("load", v, we)
            })
         }
      },
      LN = function(f, r, M, E, F, n) {
         for (F = (((n = X((E = f[NI] || {}, f)), E)
                  .JY = X(f), E)
               .l = [], f.F == f) ? (H(f) | 0) - 1 : 1, r = X(f), M = 0; M < F; M++) E.l.push(X(f));
         for (E.f6 = B(r, f), E.E5 = B(n, f); F--;) E.l[F] = B(E.l[F], f);
         return E
      },
      $f = function(f, r) {
         function M() {
            this.o = this.FX = this.n = 0
         }
         return [function(E) {
            (r.U5(E), f)
            .U5(E)
         }, (f = new(M.prototype.U5 = (M.prototype.zV = function() {
            return this.n === 0 ? 0 : Math.sqrt(this.FX / this.n)
         }, function(E, F) {
            this.o += (F = (this.n++, E) - this.o, F / this.n), this.FX += F * (E - this.o)
         }), r = new M, M), function(E) {
            return E = [r.zV(), f.zV(), r.o, f.o], f = new M, E
         })]
      },
      m = function(f, r) {
         for (r = []; f--;) r.push(Math.random() * 255 | 0);
         return r
      },
      SU = function(f, r, M, E) {
         try {
            E = f[((r | 0) + 2) % 3], f[r] = (f[r] | 0) - (f[((r | 0) + 1) % 3] | 0) - (E | 0) ^ (r == 1 ? E << M : E >>> M)
         } catch (F) {
            throw F;
         }
      },
      T = function(f, r, M, E) {
         for (M = (E = [], f | 0) - 1; M >= 0; M--) E[(f | 0) - 1 - (M | 0)] = r >> M * 8 & 255;
         return E
      },
      O2 = function(f, r) {
         return de[f](de.prototype, {
            splice: r,
            parent: r,
            prototype: r,
            call: r,
            pop: r,
            floor: r,
            propertyIsEnumerable: r,
            replace: r,
            console: r,
            length: r,
            stack: r,
            document: r
         })
      },
      z7 = function(f, r, M, E, F, n, U, t, v, L) {
         for (v = (L = ((E.I7 = O2(E.j, (E.Mw = E[V], (E.Yq = G7, E)
                  .C6 = Xp, {
                     get: function() {
                        return this.concat()
                     }
                  })), E)
               .Vh = de[E.j](E.I7, {
                  value: {
                     value: {}
                  }
               }), []), 0); v < 374; v++) L[v] = String.fromCharCode(v);
         if ((E.R7 = (E.N = 0, E.p6 = void 0, (F = (E.C = void 0, (E.X = 0, E.P = [], E)
                  .Qh = (E.hY = [], E.J = void 0, (E.K6 = false, E.U = false, E.B = 0, E.a7 = (E.Pp = [], 0), E.kq = [], E.V = [], (E.R = 0, E.T = void 0, E)
                        .n6 = (E.WO = (E.cp = false, (E.uN = [], E)
                              .K = void 0, F), (E.A = ((E.s5 = false, E)
                              .v = null, E.S = 0, 0), E)
                           .js = n, E.F = E, E.Wp = (E.Ss = 10001, 0), E.Z = 1, E.lN = 0, E.W = [], E.tY = function(K) {
                              this.F = K
                           }, E.L = false, E.i = void 0, void 0), E.Y = [], E)
                     .u = false, 25), E.H = (E.h = void 0, []), E.I = 0, window)
               .performance || {}, F.timeOrigin || (F.timing || {})
               .navigationStart) || 0), r && r.length == 2) && (E.hY = r[0], E.uN = r[1]), t) try {
            E.p6 = JSON.parse(t)
         } catch (K) {
            E.p6 = {}
         }
         w(true, true, (u((c(function(K, g, P, z, I, N) {
            b(true, K, g, false) || (N = LN(K.F), g = N.f6, z = N.l, P = N.E5, I = z.length, N = N.JY, g = I == 0 ? new g[P] : I == 1 ? new g[P](z[0]) : I == 2 ? new g[P](z[0], z[1]) : I == 3 ? new g[P](z[0], z[1], z[2]) : I == 4 ? new g[P](z[0], z[1], z[2], z[3]) : 2(), Z(K, N, g))
         }, 502, (c(function(K, g, P, z, I, N, O) {
            for (O = (g = B(301, (P = (I = X(K), ys(K)), N = "", K)), g.length), z = 0; P--;) z = ((z | 0) + (ys(K) | 0)) % O, N += L[g[z]];
            Z(K, I, N)
         }, ((c(function(K, g, P, z) {
            for (g in delete(z = B(191, (P = H(K), K)), z)[P], z)
               if (g !== "t" && Object.hasOwn(z, g)) return;
            for (P = 0; P < K.Y.length; P++) z = K.Y[P], z.bN || (S.clearTimeout(z.o7), u(K, z.O5), u(K, z.iN));
            K.Y.length = 0
         }, (Z(E, 341, (Z(E, (Z(E, 390, ((c(function(K, g, P, z) {
            Z(K, (g = X((P = (z = X(K), H(K)), K)), g), B(z, K) >>> P)
         }, 14, (Z((c(function(K, g, P, z, I, N, O) {
            if (!b(true, K, g, true)) {
               if ((P = (N = (g = (N = (P = (g = X(K), X)(K), X)(K), I = X(K), B(g, K)), B(N, K)), I = B(I, K), B)(P, K), pN(g)) == "object") {
                  for (O in z = [], g) z.push(O);
                  g = z
               }
               if (K.F == K)
                  for (K = 0, O = g.length, N = N > 0 ? N : 1; K < O; K += N) P(g.slice(K, (K | 0) + (N | 0)), I)
            }
         }, 299, (Z(E, (c((c(function(K, g, P, z) {
            Z(K, (g = (P = (z = X(K), X(K)), B(P, K)), z = B(z, K), P), g + z)
         }, (Z(E, (c(function(K) {
            o4(4, K)
         }, (c(function(K, g, P, z) {
            if (P = K.H.pop()) {
               for (z = H(K); z > 0; z--) g = X(K), P[g] = K.W[g];
               (P[464] = (P[457] = K.W[457], K.W[464]), K)
               .W = P
            } else Z(K, 75, K.S)
         }, 492, ((Z(E, 103, (c(function(K) {
            T7(4, K)
         }, (Z((c(function(K, g, P, z, I) {
            for (I = (g = (z = ys((P = X(K), K)), []), 0); I < z; I++) g.push(H(K));
            Z(K, P, g)
         }, 208, (c(function(K, g, P) {
            Z((P = (g = (P = X(K), X(K)), B(P, K)), P = pN(P), K), g, P)
         }, (c(function(K, g, P) {
            b(true, K, g, false) || (g = X(K), P = X(K), Z(K, P, function(z) {
               return eval(z)
            }(xf(B(g, K.F)))))
         }, (Z(E, 433, (c((Z(E, 435, (E.Hp = ((c(function(K, g) {
            Z(K, (g = X(K), g), [])
         }, 321, (Z(E, 464, (Z((c(function(K, g, P) {
            Z(K, (P = (g = X(K), X(K)), P), "" + B(g, K))
         }, 325, (c(function(K, g, P, z) {
            Z(K, (z = X((g = X((P = X(K), K)), K)), z), B(P, K) || B(g, K))
         }, 6, (c(function(K, g) {
            ZU((g = B(X(K), K), K.F), g)
         }, 326, (c(function(K, g, P, z, I, N, O, D, p, A, Y, x) {
            function y(a, d) {
               for (; z < a;) N |= H(K) << z, z += 8;
               return N >>= (d = N & (1 << a) - 1, a), z -= a, d
            }
            for (I = (x = (Y = ((N = (D = X(K), z = 0), y)(3) | 0) + 1, O = y(5), []), p = 0); I < O; I++) A = y(1), x.push(A), p += A ? 0 : 1;
            for (I = (p = ((p | 0) - 1)
                  .toString(2)
                  .length, P = [], 0); I < O; I++) x[I] || (P[I] = y(p));
            for (p = 0; p < O; p++) x[p] && (P[p] = X(K));
            for (g = []; Y--;) g.push(B(X(K), K));
            c(function(a, d, h, G, l) {
               for (h = (l = 0, d = [], []); l < O; l++) {
                  if (G = P[l], !x[l]) {
                     for (; G >= d.length;) d.push(X(a));
                     G = d[G]
                  }
                  h.push(G)
               }
               a.K = ge(g.slice(), a), a.h = ge(h, a)
            }, D, K)
         }, (Z(E, 319, (c(function(K) {
            qI(K, 4)
         }, (c(function(K, g, P, z) {
            Z(K, (g = (z = (P = (g = (z = X(K), X(K)), X)(K), B)(z, K), B(g, K)), P), z in g | 0)
         }, 499, (c((Z(E, (c(function(K, g, P) {
            (g = (P = B((g = (P = X(K), X(K)), P), K) != 0, B(g, K)), P) && Z(K, 75, g)
         }, (Z(E, 94, (Z(E, 182, (Z(E, (Z(E, 483, (Z(E, 75, 0), 0)), 106), []), [160, 0, 0])), 0)), 130), E), 505), S), c(function(K) {
            T7(1, K)
         }, 363, E), function(K, g, P, z) {
            g = (z = X((P = X(K), K)), X)(K), K.F == K && (z = B(z, K), g = B(g, K), B(P, K)[z] = g, P == 290 && (K.J = void 0, z == 2 && (K.i = Q(false, 32, K), K.J = void 0)))
         }), 28, E), E)), 20), E), 394)), 18), E), E)), c(function() {}, 218, E), E)), E)), E.xq = 0, E), 347, m(4)), [2048])), E)), c)(function(K, g) {
            (g = X(K), K = B(g, K.F), K)[0].removeEventListener(K[1], K[2], we)
         }, 477, E), 0), [])), function(K, g, P, z) {
            !b(true, K, g, false) && (g = LN(K), z = g.f6, P = g.E5, K.F == K || P == K.tY && z == K) && (Z(K, g.JY, P.apply(z, g.l)), K.R = K.G())
         }), 356, E), c(function(K, g, P, z) {
            Z(K, (g = X((z = (P = X(K), X(K)), K)), P = B(P, K), z = B(z, K), g), +(P == z))
         }, 381, E), [0, 0, 0])), 472), E), 2), E), E)), E), 345, {}), E.es = 0, c(function(K, g, P, z) {
            Z(K, (g = (P = B((z = X((P = (g = X(K), X)(K), K)), P), K), B(g, K)), z), g[P])
         }, 316, E), 174), E), [])), c)(function(K) {
            o4(3, K)
         }, 330, E), E)), 235), E), 457), []), 311), E), function(K, g, P, z, I) {
            z = B((I = B((P = B((z = (P = (g = X(K), X(K)), X(K)), I = X(K), P), K), I), K), z), K), Z(K, g, bH(K, z, P, I))
         }), 283, E), 214), m(4)), E)), E), 191, {}), E)), Z)(E, 348, m(4)), [])), 85), E), 0)), 386), E), c)(function(K, g, P, z, I) {
            g = (z = B((I = B((z = (g = (P = X(K), X(K)), I = X(K), X)(K), P = B(P, K.F), I), K), z), K), B(g, K)), P !== 0 && (z = bH(K, z, I, 1, P, g), P.addEventListener(g, z, we), Z(K, 94, [P, g, z]))
         }, 7, E), 242), E), E)), M || u(E, [vR]), E), [U2, U]), u(E, [tw, f]), E))
      },
      J, hw = function(f, r, M, E) {
         return B(345, (Z((a4(r, (E = B(75, f), f.V && E < f.S ? (Z(f, 75, f.S), ZU(f, M)) : Z(f, 75, M), f)), f), 75, E), f))
      },
      a4 = function(f, r, M, E, F, n) {
         if (!r.T) {
            r.A++;
            try {
               for (M = (F = (n = void 0, 0), r.S); --f;) try {
                  if (E = void 0, r.K) n = Qs(r, r.K);
                  else {
                     if ((F = B(75, r), F) >= M) break;
                     n = (Z(r, 483, F), E = X(r), B(E, r))
                  }
                  b(!(n && n[iH] & 2048 ? n(r, f) : C([q, 21, E], r, 0), 1), r, f, false)
               } catch (U) {
                  B(319, r) ? C(U, r, 22) : Z(r, 319, U)
               }
               if (!f) {
                  if (r.L6) {
                     a4(557455970023, (r.A--, r));
                     return
                  }
                  C([q, 33], r, 0)
               }
            } catch (U) {
               try {
                  C(U, r, 22)
               } catch (t) {
                  k(r, t)
               }
            }
            r.A--
         }
      },
      uH = function(f, r, M, E, F, n, U, t, v) {
         return (v = R[f.substring(0, 3) + "_"]) ? v(f.substring(3), r, M, E, F, n, U, t) : DU(r, f)
      },
      MI = function(f, r, M, E, F) {
         for (M = F = (f = f.replace(/\r\n/g, "\n"), 0), r = []; M < f.length; M++) E = f.charCodeAt(M), E < 128 ? r[F++] = E : (E < 2048 ? r[F++] = E >> 6 | 192 : ((E & 64512) == 55296 && M + 1 < f.length && (f.charCodeAt(M + 1) & 64512) == 56320 ? (E = 65536 + ((E & 1023) << 10) + (f.charCodeAt(++M) & 1023), r[F++] = E >> 18 | 240, r[F++] = E >> 12 & 63 | 128) : r[F++] = E >> 12 | 224, r[F++] = E >> 6 & 63 | 128), r[F++] = E & 63 | 128);
         return r
      },
      Yf = function(f, r, M, E, F) {
         function n() {}
         return {
            invoke: function(U, t, v, L) {
               function K() {
                  M(function(g) {
                     Fp(function() {
                        U(g)
                     })
                  }, v)
               }
               if (!t) return t = E(v), U && U(t), t;
               M ? K() : (L = n, n = function() {
                  L(), Fp(K)
               })
            },
            pe: (E = (F = (f = uH(f, (M = void 0, function(U) {
               n && (r && Fp(r), M = U, n(), n = void 0)
            }), !!r), f)[1], f)[0], function(U) {
               F && F(U)
            })
         }
      },
      pN = function(f, r, M) {
         if (M = typeof f, M == "object")
            if (f) {
               if (f instanceof Array) return "array";
               if (f instanceof Object) return M;
               if ((r = Object.prototype.toString.call(f), r) == "[object Window]") return "object";
               if (r == "[object Array]" || typeof f.length == "number" && typeof f.splice != "undefined" && typeof f.propertyIsEnumerable != "undefined" && !f.propertyIsEnumerable("splice")) return "array";
               if (r == "[object Function]" || typeof f.call != "undefined" && typeof f.propertyIsEnumerable != "undefined" && !f.propertyIsEnumerable("call")) return "function"
            } else return "null";
         else if (M == "function" && typeof f.call == "undefined") return "object";
         return M
      },
      ge = function(f, r, M) {
         return M = de[r.j](r.Vh), M[r.j] = function() {
            return f
         }, M.concat = function(E) {
            f = E
         }, M
      },
      Fp = S.requestIdleCallback ? function(f) {
         requestIdleCallback(function() {
            f()
         }, {
            timeout: 4
         })
      } : S.setImmediate ? function(f) {
         setImmediate(f)
      } : function(f) {
         setTimeout(f, 0)
      },
      X = function(f, r) {
         if (f.K) return Qs(f, f.h);
         return r = Q(true, 8, f), r & 128 && (r ^= 128, f = Q(true, 2, f), r = (r << 2) + (f | 0)), r
      },
      bH = function(f, r, M, E, F, n) {
         function U() {
            if (f.F == f) {
               if (f.W) {
                  var t = [WR, M, r, void 0, F, n, arguments];
                  if (E == 2) var v = w(false, false, (u(f, t), f));
                  else if (E == 1) {
                     var L = !f.P.length && !f.U;
                     u(f, t), L && w(false, false, f)
                  } else v = I4(t, f);
                  return v
               }
               F && n && F.removeEventListener(n, U, we)
            }
         }
         return U
      },
      DU = function(f, r) {
         return [function() {
            return r
         }, (f(function(M) {
            M(r)
         }), function() {})]
      },
      qI = function(f, r, M, E) {
         for (M = (E = X(f), 0); r > 0; r--) M = M << 8 | H(f);
         Z(f, E, M)
      },
      Aw = function(f, r, M) {
         return f.GV(function(E) {
            M = E
         }, false, r), M
      },
      PR = function(f, r, M, E, F, n, U, t) {
         return n = (f = [32, -(U = E & 7, 45), -98, -4, 9, 80, f, -49, (t = lH, -98), 28], de)[r.j](r.I7), n[r.j] = function(v) {
            U += (F = v, 6) + 7 * E, U &= 7
         }, n.concat = function(v) {
            return F = (v = 33 * F * F - -1419 * (v = M % 16 + 1, F) - v * F - -1485 * M * F - 99 * M * M * F + 3 * M * M * v + f[U + 35 & 7] * M * v + (t() | 0) * v + U, v = f[v], void 0), f[(U + 21 & 7) + (E & 2)] = v, f[U + (E & 2)] = -45, v
         }, n
      },
      c = function(f, r, M) {
         f[Z(M, r, f), vR] = 2796
      },
      E2 = function(f, r, M, E) {
         for (; r.P.length;) {
            E = (r.v = null, r.P.pop());
            try {
               M = I4(E, r)
            } catch (F) {
               k(r, F)
            }
            if (f && r.v) {
               f = r.v, f(function() {
                  w(true, true, r)
               });
               break
            }
         }
         return M
      },
      C = function(f, r, M, E, F, n, U, t) {
         if (!r.cp && (n = void 0, f && f[0] === q && (M = f[1], n = f[2], f = void 0), F = B(457, r), F.length == 0 && (E = B(483, r) >> 3, F.push(M, E >> 8 & 255, E & 255), n != void 0 && F.push(n & 255)), M = "", f && (f.message && (M += f.message), f.stack && (M += ":" + f.stack)), f = B(464, r), f[0] > 3)) {
            r.F = (f = (M = (f[0] -= ((M = M.slice(0, (f[0] | 0) - 3), M)
               .length | 0) + 3, MI(M)), r.F), r);
            try {
               r.K6 ? (U = (U = B(106, r)) && U[U.length - 1] || 95, (t = B(390, r)) && t[t.length - 1] == U || W([U & 255], 390, r)) : W([95], 106, r), W(T(2, M.length)
                  .concat(M), 348, r, 9)
            } finally {
               r.F = f
            }
         }
      },
      ys = function(f, r) {
         return r = H(f), r & 128 && (r = r & 127 | H(f) << 7), r
      },
      H = function(f) {
         return f.K ? Qs(f, f.h) : Q(true, 8, f)
      },
      ZU = function(f, r) {
         f.H.length > 104 ? C([q, 36], f, 0) : (f.H.push(f.W.slice()), f.W[75] = void 0, Z(f, 75, r))
      },
      T7 = function(f, r, M, E) {
         (M = X((E = X(r), r)), W)(T(f, B(E, r)), M, r)
      },
      re = function(f, r, M, E, F) {
         for (M = M[E = 0, F = M[2] | 0, 3] | 0; E < 14; E++) f = f >>> 8 | f << 24, f += r | 0, r = r << 3 | r >>> 29, f ^= F + 3027, M = M >>> 8 | M << 24, M += F | 0, M ^= E + 3027, r ^= f, F = F << 3 | F >>> 29, F ^= M;
         return [r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, r >>> 0 & 255, f >>> 24 & 255, f >>> 16 & 255, f >>> 8 & 255, f >>> 0 & 255]
      },
      kf = function(f, r) {
         function M() {
            this.n = (this.g = [], 0)
         }
         return f = (r = new(M.prototype.r4 = function(E, F) {
            this.n++, this.g.length < 50 ? this.g.push(E) : (F = Math.floor(Math.random() * this.n), F < 50 && (this.g[F] = E))
         }, M.prototype.qw = function() {
            if (this.n === 0) return [0, 0];
            return [(this.g.sort(function(E, F) {
               return E - F
            }), this.n), this.g[this.g.length >> 1]]
         }, M), new M), [function(E) {
            (r.r4(E), f)
            .r4(E)
         }, function(E) {
            return f = (E = r.qw()
               .concat(f.qw()), new M), E
         }]
      },
      k = function(f, r) {
         f.T = ((f.T ? f.T + "~" : "E:") + r.message + ":" + r.stack)
            .slice(0, 2048)
      },
      Q = function(f, r, M, E, F, n, U, t, v, L, K, g, P, z) {
         if (g = B(75, M), g >= M.S) throw [q, 31];
         for (U = (t = (F = M.Mw.length, L = g, r), 0); t > 0;) K = L >> 3, v = L % 8, E = M.V[K], z = 8 - (v | 0), z = z < t ? z : t, f && (P = L, n = M, n.J != P >> 6 && (n.J = P >> 6, P = B(290, n), n.n6 = re(n.J, n.i, [0, 0, P[1], P[2]])), E ^= M.n6[K & F]), U |= (E >> 8 - (v | 0) - (z | 0) & (1 << z) - 1) << (t | 0) - (z | 0), t -= z, L += z;
         return Z(M, (f = U, 75), (g | 0) + (r | 0)), f
      },
      R, eU = function(f, r) {
         if ((f = null, r = S.trustedTypes, !r) || !r.createPolicy) return f;
         try {
            f = r.createPolicy("bg", {
               createHTML: jU,
               createScript: jU,
               createScriptURL: jU
            })
         } catch (M) {
            S.console && S.console.error(M.message)
         }
         return f
      },
      fN = function(f, r) {
         return f[r] << 24 | f[(r | 0) + 1] << 16 | f[(r | 0) + 2] << 8 | f[(r | 0) + 3]
      },
      Vs = function(f, r) {
         return r = 0,
            function() {
               return r < f.length ? {
                  done: false,
                  value: f[r++]
               } : {
                  done: true
               }
            }
      },
      HR = function(f, r, M) {
         if (f.length == 3) {
            for (M = 0; M < 3; M++) r[M] += f[M];
            for (M = [13, 8, 13, 12, (f = 0, 16), 5, 3, 10, 15]; f < 9; f++) r[3](r, f % 3, M[f])
         }
      },
      jU = function(f) {
         return f
      },
      we = {
         passive: true,
         capture: true
      },
      m8 = function(f, r) {
         ((r.push(f[0] << 24 | f[1] << 16 | f[2] << 8 | f[3]), r)
            .push(f[4] << 24 | f[5] << 16 | f[6] << 8 | f[7]), r)
         .push(f[8] << 24 | f[9] << 16 | f[10] << 8 | f[11])
      },
      Qs = function(f, r) {
         return (r = r.create()
               .shift(), f.K.create())
            .length || f.h.create()
            .length || (f.K = void 0, f.h = void 0), r
      },
      NI = ("ARTICLE SECTION NAV ASIDE H1 H2 H3 H4 H5 H6 HEADER FOOTER ADDRESS P HR PRE BLOCKQUOTE OL UL LH LI DL DT DD FIGURE FIGCAPTION MAIN DIV EM STRONG SMALL S CITE Q DFN ABBR RUBY RB RT RTC RP DATA TIME CODE VAR SAMP KBD SUB SUP I B U MARK BDI BDO SPAN BR WBR NOBR INS DEL PICTURE PARAM TRACK MAP TABLE CAPTION COLGROUP COL TBODY THEAD TFOOT TR TD TH SELECT DATALIST OPTGROUP OPTION OUTPUT PROGRESS METER FIELDSET LEGEND DETAILS SUMMARY MENU DIALOG SLOT CANVAS FONT CENTER ACRONYM BASEFONT BIG DIR HGROUP STRIKE TT".split(" ")
         .concat(["BUTTON", "INPUT"]), String.fromCharCode(105, 110, 116, 101, 103, 67, 104, 101, 99, 107, 66, 121, 112, 97, 115, 115)),
      iH = [],
      q = {},
      KN = (e.prototype.yh = "toString", (e.prototype.FI = void 0, e.prototype)
         .k_ = void 0, []),
      nN = (e.prototype.L6 = false, []),
      V = [],
      WR = [],
      vR = [],
      BR = [],
      tw = [],
      U2 = [],
      lH = ((((((((m8, m, function() {})(SU), function() {})(HR), function() {})(kf), $f, void 0, function() {})(void 0), function() {})(void 0), function() {})(void 0), e)
         .prototype.j = "create", void 0),
      de = q.constructor,
      Xp = ((((J = e.prototype, J.w4 = 0, J)
               .DE = function(f, r, M, E, F, n) {
                  for (E = n = (M = [], 0); n < f.length; n++)
                     for (F = F << r | f[n], E += r; E > 7;) E -= 8, M.push(F >> E & 255);
                  return M
               }, J.D = function() {
                  return Math.floor(this.G())
               }, J.mN = function() {
                  return Math.floor(this.Wp + (this.G() - this.N))
               }, J.AY = function(f, r, M, E, F) {
                  for (E = F = 0; E < f.length; E++) F += f.charCodeAt(E), F += F << 10, F ^= F >> 6;
                  return f = (F += F << 3, F ^= F >> 11, F + (F << 15) >>> 0), F = new Number(f & (1 << r) - 1), F[0] = (f >>> r) % M, F
               }, J.G = (window.performance || {})
               .now ? function() {
                  return this.R7 + window.performance.now()
               } : function() {
                  return +new Date
               }, J.GV = function(f, r, M, E) {
                  if (M = pN(M) === "array" ? M : [M], this.T) f(this.T);
                  else try {
                     E = !this.P.length && !this.U, u(this, [nN, [], M, f, r]), r && !E || w(r, true, this)
                  } catch (F) {
                     k(this, F), f(this.T)
                  }
               }, J.Nw = function(f, r, M) {
                  return r ^= r << 13, r ^= r >> 17, (r = (r ^ r << 5) & M) || (r = 1), f ^ r
               }, J = e.prototype, J.O = function(f, r) {
                  return r = (f = {}, {}), lH = function() {
                        return f == r ? -43 : -107
                     },
                     function(M, E, F, n, U, t, v, L, K, g, P, z, I, N, O, D, p, A, Y, x, y, a, d, h, G) {
                        a = f, f = r;
                        try {
                           if (h = M[0], h == U2) {
                              n = M[1];
                              try {
                                 for (D = (g = d = 0, atob)(n), M = []; d < D.length; d++) F = D.charCodeAt(d), F > 255 && (M[g++] = F & 255, F >>= 8), M[g++] = F;
                                 Z((this.S = (this.V = M, this.V.length) << 3, this), 290, [0, 0, 0])
                              } catch (l) {
                                 C(l, this, 17);
                                 return
                              }
                              a4(10001, this)
                           } else if (h == nN) {
                              F = (D = {}, 0);
                              try {
                                 D = B(191, this) || {}, F = D.t | 0
                              } finally {
                                 if (!(G = [(d = [BR, M, this.D()], V), M], M[4])) {
                                    (this.P.push(G), this.P)
                                    .push(d);
                                    return
                                 }
                                 for (g in M = false, D)
                                    if (g !== "t" && Object.hasOwn(D, g)) {
                                       M = true;
                                       break
                                    } if (!M) {
                                    (this.P.push(G), this)
                                    .P.push(d);
                                    return
                                 }
                                 return {
                                    O5: d,
                                    iN: G,
                                    timeout: F,
                                    bN: false,
                                    o7: 0
                                 }
                              }
                           } else if (h == BR) p = M[1], p[1].push(B(347, this)
                              .length, B(390, this)
                              .length, B(182, this)
                              .length, B(214, this)
                              .length, B(348, this)
                              .length, B(106, this)
                              .length, B(435, this)
                              .length, B(464, this)[0]), Z(this, 345, p[2]), this.W[127] && hw(this, 10001, B(127, this));
                           else {
                              if (h == V) {
                                 O = (G = M[1][1], T(2, (B(182, this)
                                    .length | 0) + 2)), U = this.F, this.F = this;
                                 try {
                                    L = B(457, this), L.length > 0 && W(T(2, L.length)
                                       .concat(L), 182, this, 10), W(T(1, this.Z + 1 >> 1), 182, this, 109), W(T(1, this[V].length), 182, this), A = this.K6 ? B(390, this) : B(106, this), A.length > 0 && W(T(2, A.length)
                                       .concat(A), 347, this, 122), K = B(347, this), K.length > 4 && W(T(2, K.length)
                                       .concat(K), 182, this, 123), d = 0, d -= (B(182, this)
                                       .length | 0) + 5, y = B(348, this), d += B(341, this) & 2047, y.length > 4 && (d -= (y.length | 0) + 3), d > 0 && W(T(2, d)
                                       .concat(m(d)), 182, this, 15), y.length > 4 && (y.length > 1E6 && (y = y.slice(0, 1E6), W([], 182, this, 255), W([], 182, this, 30)), W(T(2, y.length)
                                       .concat(y), 182, this, 156))
                                 } finally {
                                    this.F = U
                                 }
                                 if (Y = ((x = m(2)
                                       .concat(B(182, this)), x)[1] = x[0] ^ 6, x[3] = x[1] ^ O[0], x[4] = x[1] ^ O[1], this)
                                    .g4(x)) Y = "!" + Y;
                                 else
                                    for (d = 0, Y = ""; d < x.length; d++) N = x[d][this.yh](16), N.length == 1 && (N = "0" + N), Y += N;
                                 return ((B(106, (((B(182, (B((B(347, (t = Y, this))
                                                      .length = G.shift(), 390), this)
                                                   .length = G.shift(), this))
                                                .length = G.shift(), B(214, this))
                                             .length = G.shift(), B(348, this))
                                          .length = G.shift(), this))
                                       .length = G.shift(), B(435, this))
                                    .length = G.shift(), B)(464, this)[0] = G.shift(), t
                              }
                              if (h == KN) hw(this, M[2], M[1]);
                              else {
                                 if (h == WR) return hw(this, 10001, M[1]);
                                 if (h == iH) {
                                    if (P = (E = B(103, this), typeof Symbol) != "undefined" && Symbol.iterator && E[Symbol.iterator]) I = P.call(E);
                                    else if (typeof E.length == "number") I = {
                                       next: Vs(E)
                                    };
                                    else throw Error(String(E) + " is not an iterable or ArrayLike");
                                    for (v = (d = I, d.next()); !v.done; v = d.next()) {
                                       z = v.value;
                                       try {
                                          z()
                                       } catch (l) {}
                                    }
                                    E.length = 0
                                 }
                              }
                           }
                        } finally {
                           f = a
                        }
                     }
               }(), J.yr = 0, J)
            .XX = 0, J)
         .g4 = function(f, r, M, E) {
            if (r = window.btoa) {
               for (M = (E = "", 0); M < f.length; M += 8192) E += String.fromCharCode.apply(null, f.slice(M, M + 8192));
               f = r(E)
                  .replace(/\+/g, "-")
                  .replace(/\//g, "_")
                  .replace(/=/g, "")
            } else f = void 0;
            return f
         }, /./),
      G7, cR = U2.pop.bind((J.TV = (J.vp = function() {
         return this[this + ""] = this, Promise.resolve()
      }, function() {
         this[this + ""] = this
      }), e.prototype[tw] = [0, 0, 1, 1, 0, 1, 1], e.prototype)[BR]),
      xf = function(f, r) {
         return (r = eU()) && f.eval(r.createScript("1")) === 1 ? function(M) {
            return r.createScript(M)
         } : function(M) {
            return "" + M
         }
      }(((G7 = O2(e.prototype.j, (Xp[e.prototype.yh] = cR, {
            get: cR
         })), e)
         .prototype.Bp = void 0, S));
   ((R = S.botguard || (S.botguard = {}), R.m > 40) || (R.m = 41, R.bg = Yf, R.a = uH), R)
   .mJo_ = function(f, r, M, E, F, n, U, t, v) {
      return [function(L) {
         return Aw(v, L)
      }, (v = new e(F, E, r, n, U, f, t), function(L) {
         v.TV(L)
      })]
   };
})
.call(window);