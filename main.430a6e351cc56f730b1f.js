(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (e, t, n) {
      e.exports = n("zUnb");
    },
    zUnb: function (e, t, n) {
      "use strict";
      function s(e) {
        return "function" == typeof e;
      }
      n.r(t);
      let i = !1;
      const r = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(e) {
          if (e) {
            const e = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                e.stack
            );
          } else
            i &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          i = e;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return i;
        },
      };
      function o(e) {
        setTimeout(() => {
          throw e;
        }, 0);
      }
      const a = {
          closed: !0,
          next(e) {},
          error(e) {
            if (r.useDeprecatedSynchronousErrorHandling) throw e;
            o(e);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((e) => e && "number" == typeof e.length))();
      function c(e) {
        return null !== e && "object" == typeof e;
      }
      const u = (() => {
        function e(e) {
          return (
            Error.call(this),
            (this.message = e
              ? `${e.length} errors occurred during unsubscription:\n${e
                  .map((e, t) => `${t + 1}) ${e.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = e),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      let d = (() => {
        class e {
          constructor(e) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              e && ((this._ctorUnsubscribe = !0), (this._unsubscribe = e));
          }
          unsubscribe() {
            let t;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: i,
              _unsubscribe: r,
              _subscriptions: o,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof e)
            )
              n.remove(this);
            else if (null !== n)
              for (let e = 0; e < n.length; ++e) n[e].remove(this);
            if (s(r)) {
              i && (this._unsubscribe = void 0);
              try {
                r.call(this);
              } catch (a) {
                t = a instanceof u ? h(a.errors) : [a];
              }
            }
            if (l(o)) {
              let e = -1,
                n = o.length;
              for (; ++e < n; ) {
                const n = o[e];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (a) {
                    (t = t || []),
                      a instanceof u ? (t = t.concat(h(a.errors))) : t.push(a);
                  }
              }
            }
            if (t) throw new u(t);
          }
          add(t) {
            let n = t;
            if (!t) return e.EMPTY;
            switch (typeof t) {
              case "function":
                n = new e(t);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof e)) {
                  const t = n;
                  (n = new e()), (n._subscriptions = [t]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + t + " added to Subscription."
                );
            }
            let { _parentOrParents: s } = n;
            if (null === s) n._parentOrParents = this;
            else if (s instanceof e) {
              if (s === this) return n;
              n._parentOrParents = [s, this];
            } else {
              if (-1 !== s.indexOf(this)) return n;
              s.push(this);
            }
            const i = this._subscriptions;
            return null === i ? (this._subscriptions = [n]) : i.push(n), n;
          }
          remove(e) {
            const t = this._subscriptions;
            if (t) {
              const n = t.indexOf(e);
              -1 !== n && t.splice(n, 1);
            }
          }
        }
        return (
          (e.EMPTY = (function (e) {
            return (e.closed = !0), e;
          })(new e())),
          e
        );
      })();
      function h(e) {
        return e.reduce((e, t) => e.concat(t instanceof u ? t.errors : t), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends d {
        constructor(e, t, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!e) {
                this.destination = a;
                break;
              }
              if ("object" == typeof e) {
                e instanceof f
                  ? ((this.syncErrorThrowable = e.syncErrorThrowable),
                    (this.destination = e),
                    e.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, e)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, e, t, n));
          }
        }
        [p]() {
          return this;
        }
        static create(e, t, n) {
          const s = new f(e, t, n);
          return (s.syncErrorThrowable = !1), s;
        }
        next(e) {
          this.isStopped || this._next(e);
        }
        error(e) {
          this.isStopped || ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          this.destination.error(e), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: e } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = e),
            this
          );
        }
      }
      class g extends f {
        constructor(e, t, n, i) {
          let r;
          super(), (this._parentSubscriber = e);
          let o = this;
          s(t)
            ? (r = t)
            : t &&
              ((r = t.next),
              (n = t.error),
              (i = t.complete),
              t !== a &&
                ((o = Object.create(t)),
                s(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = r),
            (this._error = n),
            (this._complete = i);
        }
        next(e) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: t } = this;
            r.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
              ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, e);
          }
        }
        error(e) {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this,
              { useDeprecatedSynchronousErrorHandling: n } = r;
            if (this._error)
              n && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
            else if (t.syncErrorThrowable)
              n ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0)) : o(e),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw e;
              o(e);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this;
            if (this._complete) {
              const t = () => this._complete.call(this._context);
              r.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, t), this.unsubscribe())
                : (this.__tryOrUnsub(t), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(e, t) {
          try {
            e.call(this._context, t);
          } catch (n) {
            if ((this.unsubscribe(), r.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(e, t, n) {
          if (!r.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            t.call(this._context, n);
          } catch (s) {
            return r.useDeprecatedSynchronousErrorHandling
              ? ((e.syncErrorValue = s), (e.syncErrorThrown = !0), !0)
              : (o(s), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: e } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            e.unsubscribe();
        }
      }
      const v = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function m(e) {
        return e;
      }
      let y = (() => {
        class e {
          constructor(e) {
            (this._isScalar = !1), e && (this._subscribe = e);
          }
          lift(t) {
            const n = new e();
            return (n.source = this), (n.operator = t), n;
          }
          subscribe(e, t, n) {
            const { operator: s } = this,
              i = (function (e, t, n) {
                if (e) {
                  if (e instanceof f) return e;
                  if (e[p]) return e[p]();
                }
                return e || t || n ? new f(e, t, n) : new f(a);
              })(e, t, n);
            if (
              (i.add(
                s
                  ? s.call(i, this.source)
                  : this.source ||
                    (r.useDeprecatedSynchronousErrorHandling &&
                      !i.syncErrorThrowable)
                  ? this._subscribe(i)
                  : this._trySubscribe(i)
              ),
              r.useDeprecatedSynchronousErrorHandling &&
                i.syncErrorThrowable &&
                ((i.syncErrorThrowable = !1), i.syncErrorThrown))
            )
              throw i.syncErrorValue;
            return i;
          }
          _trySubscribe(e) {
            try {
              return this._subscribe(e);
            } catch (t) {
              r.useDeprecatedSynchronousErrorHandling &&
                ((e.syncErrorThrown = !0), (e.syncErrorValue = t)),
                (function (e) {
                  for (; e; ) {
                    const { closed: t, destination: n, isStopped: s } = e;
                    if (t || s) return !1;
                    e = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(e)
                  ? e.error(t)
                  : console.warn(t);
            }
          }
          forEach(e, t) {
            return new (t = w(t))((t, n) => {
              let s;
              s = this.subscribe(
                (t) => {
                  try {
                    e(t);
                  } catch (i) {
                    n(i), s && s.unsubscribe();
                  }
                },
                n,
                t
              );
            });
          }
          _subscribe(e) {
            const { source: t } = this;
            return t && t.subscribe(e);
          }
          [v]() {
            return this;
          }
          pipe(...e) {
            return 0 === e.length
              ? this
              : (0 === (t = e).length
                  ? m
                  : 1 === t.length
                  ? t[0]
                  : function (e) {
                      return t.reduce((e, t) => t(e), e);
                    })(this);
            var t;
          }
          toPromise(e) {
            return new (e = w(e))((e, t) => {
              let n;
              this.subscribe(
                (e) => (n = e),
                (e) => t(e),
                () => e(n)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function w(e) {
        if ((e || (e = r.Promise || Promise), !e))
          throw new Error("no Promise impl found");
        return e;
      }
      const _ = (() => {
        function e() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (e.prototype = Object.create(Error.prototype)), e;
      })();
      class b extends d {
        constructor(e, t) {
          super(),
            (this.subject = e),
            (this.subscriber = t),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const e = this.subject,
            t = e.observers;
          if (
            ((this.subject = null),
            !t || 0 === t.length || e.isStopped || e.closed)
          )
            return;
          const n = t.indexOf(this.subscriber);
          -1 !== n && t.splice(n, 1);
        }
      }
      class C extends f {
        constructor(e) {
          super(e), (this.destination = e);
        }
      }
      let x = (() => {
        class e extends y {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new C(this);
          }
          lift(e) {
            const t = new S(this, this);
            return (t.operator = e), t;
          }
          next(e) {
            if (this.closed) throw new _();
            if (!this.isStopped) {
              const { observers: t } = this,
                n = t.length,
                s = t.slice();
              for (let i = 0; i < n; i++) s[i].next(e);
            }
          }
          error(e) {
            if (this.closed) throw new _();
            (this.hasError = !0), (this.thrownError = e), (this.isStopped = !0);
            const { observers: t } = this,
              n = t.length,
              s = t.slice();
            for (let i = 0; i < n; i++) s[i].error(e);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new _();
            this.isStopped = !0;
            const { observers: e } = this,
              t = e.length,
              n = e.slice();
            for (let s = 0; s < t; s++) n[s].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(e) {
            if (this.closed) throw new _();
            return super._trySubscribe(e);
          }
          _subscribe(e) {
            if (this.closed) throw new _();
            return this.hasError
              ? (e.error(this.thrownError), d.EMPTY)
              : this.isStopped
              ? (e.complete(), d.EMPTY)
              : (this.observers.push(e), new b(this, e));
          }
          asObservable() {
            const e = new y();
            return (e.source = this), e;
          }
        }
        return (e.create = (e, t) => new S(e, t)), e;
      })();
      class S extends x {
        constructor(e, t) {
          super(), (this.destination = e), (this.source = t);
        }
        next(e) {
          const { destination: t } = this;
          t && t.next && t.next(e);
        }
        error(e) {
          const { destination: t } = this;
          t && t.error && this.destination.error(e);
        }
        complete() {
          const { destination: e } = this;
          e && e.complete && this.destination.complete();
        }
        _subscribe(e) {
          const { source: t } = this;
          return t ? this.source.subscribe(e) : d.EMPTY;
        }
      }
      function E(e) {
        return e && "function" == typeof e.schedule;
      }
      class T {
        constructor(e, t) {
          (this.project = e), (this.thisArg = t);
        }
        call(e, t) {
          return t.subscribe(new k(e, this.project, this.thisArg));
        }
      }
      class k extends f {
        constructor(e, t, n) {
          super(e),
            (this.project = t),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(e) {
          let t;
          try {
            t = this.project.call(this.thisArg, e, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(t);
        }
      }
      const I = (e) => (t) => {
        for (let n = 0, s = e.length; n < s && !t.closed; n++) t.next(e[n]);
        t.complete();
      };
      function M() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const O = M();
      const P = (e) => {
        if (e && "function" == typeof e[v])
          return (
            (r = e),
            (e) => {
              const t = r[v]();
              if ("function" != typeof t.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return t.subscribe(e);
            }
          );
        if ((t = e) && "number" == typeof t.length && "function" != typeof t)
          return I(e);
        var t, n, s, i, r;
        if (
          (n = e) &&
          "function" != typeof n.subscribe &&
          "function" == typeof n.then
        )
          return (
            (i = e),
            (e) => (
              i
                .then(
                  (t) => {
                    e.closed || (e.next(t), e.complete());
                  },
                  (t) => e.error(t)
                )
                .then(null, o),
              e
            )
          );
        if (e && "function" == typeof e[O])
          return (
            (s = e),
            (e) => {
              const t = s[O]();
              for (;;) {
                let s;
                try {
                  s = t.next();
                } catch (n) {
                  return e.error(n), e;
                }
                if (s.done) {
                  e.complete();
                  break;
                }
                if ((e.next(s.value), e.closed)) break;
              }
              return (
                "function" == typeof t.return &&
                  e.add(() => {
                    t.return && t.return();
                  }),
                e
              );
            }
          );
        {
          const t = c(e) ? "an invalid object" : `'${e}'`;
          throw new TypeError(
            `You provided ${t} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
      };
      function A(e, t) {
        return new y((n) => {
          const s = new d();
          let i = 0;
          return (
            s.add(
              t.schedule(function () {
                i !== e.length
                  ? (n.next(e[i++]), n.closed || s.add(this.schedule()))
                  : n.complete();
              })
            ),
            s
          );
        });
      }
      class D extends f {
        constructor(e) {
          super(), (this.parent = e);
        }
        _next(e) {
          this.parent.notifyNext(e);
        }
        _error(e) {
          this.parent.notifyError(e), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class R extends f {
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyError(e) {
          this.destination.error(e);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      class N {
        constructor(e, t = Number.POSITIVE_INFINITY) {
          (this.project = e), (this.concurrent = t);
        }
        call(e, t) {
          return t.subscribe(new L(e, this.project, this.concurrent));
        }
      }
      class L extends R {
        constructor(e, t, n = Number.POSITIVE_INFINITY) {
          super(e),
            (this.project = t),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(e) {
          this.active < this.concurrent
            ? this._tryNext(e)
            : this.buffer.push(e);
        }
        _tryNext(e) {
          let t;
          const n = this.index++;
          try {
            t = this.project(e, n);
          } catch (s) {
            return void this.destination.error(s);
          }
          this.active++, this._innerSub(t);
        }
        _innerSub(e) {
          const t = new D(this),
            n = this.destination;
          n.add(t);
          const s = (function (e, t) {
            if (!t.closed) return e instanceof y ? e.subscribe(t) : P(e)(t);
          })(e, t);
          s !== t && n.add(s);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyComplete() {
          const e = this.buffer;
          this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function V(e, t) {
        return t ? A(e, t) : new y(I(e));
      }
      function j() {
        return function (e) {
          return e.lift(new z(e));
        };
      }
      class z {
        constructor(e) {
          this.connectable = e;
        }
        call(e, t) {
          const { connectable: n } = this;
          n._refCount++;
          const s = new F(e, n),
            i = t.subscribe(s);
          return s.closed || (s.connection = n.connect()), i;
        }
      }
      class F extends f {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _unsubscribe() {
          const { connectable: e } = this;
          if (!e) return void (this.connection = null);
          this.connectable = null;
          const t = e._refCount;
          if (t <= 0) return void (this.connection = null);
          if (((e._refCount = t - 1), t > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            s = e._connection;
          (this.connection = null), !s || (n && s !== n) || s.unsubscribe();
        }
      }
      class H extends y {
        constructor(e, t) {
          super(),
            (this.source = e),
            (this.subjectFactory = t),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(e) {
          return this.getSubject().subscribe(e);
        }
        getSubject() {
          const e = this._subject;
          return (
            (e && !e.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let e = this._connection;
          return (
            e ||
              ((this._isComplete = !1),
              (e = this._connection = new d()),
              e.add(this.source.subscribe(new $(this.getSubject(), this))),
              e.closed && ((this._connection = null), (e = d.EMPTY))),
            e
          );
        }
        refCount() {
          return j()(this);
        }
      }
      const B = (() => {
        const e = H.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: e._subscribe },
          _isComplete: { value: e._isComplete, writable: !0 },
          getSubject: { value: e.getSubject },
          connect: { value: e.connect },
          refCount: { value: e.refCount },
        };
      })();
      class $ extends C {
        constructor(e, t) {
          super(e), (this.connectable = t);
        }
        _error(e) {
          this._unsubscribe(), super._error(e);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const e = this.connectable;
          if (e) {
            this.connectable = null;
            const t = e._connection;
            (e._refCount = 0),
              (e._subject = null),
              (e._connection = null),
              t && t.unsubscribe();
          }
        }
      }
      function G() {
        return new x();
      }
      function q(e) {
        return { toString: e }.toString();
      }
      const W = "__parameters__";
      function Z(e, t, n) {
        return q(() => {
          const s = (function (e) {
            return function (...t) {
              if (e) {
                const n = e(...t);
                for (const e in n) this[e] = n[e];
              }
            };
          })(t);
          function i(...e) {
            if (this instanceof i) return s.apply(this, e), this;
            const t = new i(...e);
            return (n.annotation = t), n;
            function n(e, n, s) {
              const i = e.hasOwnProperty(W)
                ? e[W]
                : Object.defineProperty(e, W, { value: [] })[W];
              for (; i.length <= s; ) i.push(null);
              return (i[s] = i[s] || []).push(t), e;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      const U = Z("Inject", (e) => ({ token: e })),
        Y = Z("Optional"),
        Q = Z("Self"),
        X = Z("SkipSelf");
      var K = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })({});
      function J(e) {
        for (let t in e) if (e[t] === J) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function ee(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function te(e) {
        return {
          factory: e.factory,
          providers: e.providers || [],
          imports: e.imports || [],
        };
      }
      function ne(e) {
        return se(e, e[re]) || se(e, e[le]);
      }
      function se(e, t) {
        return t && t.token === e ? t : null;
      }
      function ie(e) {
        return e && (e.hasOwnProperty(oe) || e.hasOwnProperty(ce))
          ? e[oe]
          : null;
      }
      const re = J({ "\u0275prov": J }),
        oe = J({ "\u0275inj": J }),
        ae = J({ "\u0275provFallback": J }),
        le = J({ ngInjectableDef: J }),
        ce = J({ ngInjectorDef: J });
      function ue(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ue).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return "" + e.overriddenName;
        if (e.name) return "" + e.name;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function de(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const he = J({ __forward_ref__: J });
      function pe(e) {
        return (
          (e.__forward_ref__ = pe),
          (e.toString = function () {
            return ue(this());
          }),
          e
        );
      }
      function fe(e) {
        return "function" == typeof (t = e) &&
          t.hasOwnProperty(he) &&
          t.__forward_ref__ === pe
          ? e()
          : e;
        var t;
      }
      const ge = "undefined" != typeof globalThis && globalThis,
        ve = "undefined" != typeof window && window,
        me =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        ye = "undefined" != typeof global && global,
        we = ge || ye || ve || me,
        _e = J({ "\u0275cmp": J }),
        be = J({ "\u0275dir": J }),
        Ce = J({ "\u0275pipe": J }),
        xe = J({ "\u0275mod": J }),
        Se = J({ "\u0275loc": J }),
        Ee = J({ "\u0275fac": J }),
        Te = J({ __NG_ELEMENT_ID__: J });
      class ke {
        constructor(e, t) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = ee({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        toString() {
          return "InjectionToken " + this._desc;
        }
      }
      const Ie = new ke("INJECTOR", -1),
        Me = {},
        Oe = /\n/gm,
        Pe = "__source",
        Ae = J({ provide: String, useValue: J });
      let De,
        Re = void 0;
      function Ne(e) {
        const t = Re;
        return (Re = e), t;
      }
      function Le(e) {
        const t = De;
        return (De = e), t;
      }
      function Ve(e, t = K.Default) {
        if (void 0 === Re)
          throw new Error("inject() must be called from an injection context");
        return null === Re
          ? ze(e, void 0, t)
          : Re.get(e, t & K.Optional ? null : void 0, t);
      }
      function je(e, t = K.Default) {
        return (De || Ve)(fe(e), t);
      }
      function ze(e, t, n) {
        const s = ne(e);
        if (s && "root" == s.providedIn)
          return void 0 === s.value ? (s.value = s.factory()) : s.value;
        if (n & K.Optional) return null;
        if (void 0 !== t) return t;
        throw new Error(`Injector: NOT_FOUND [${ue(e)}]`);
      }
      function Fe(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const s = fe(e[n]);
          if (Array.isArray(s)) {
            if (0 === s.length)
              throw new Error("Arguments array must have arguments.");
            let e = void 0,
              n = K.Default;
            for (let t = 0; t < s.length; t++) {
              const i = s[t];
              i instanceof Y || "Optional" === i.ngMetadataName || i === Y
                ? (n |= K.Optional)
                : i instanceof X || "SkipSelf" === i.ngMetadataName || i === X
                ? (n |= K.SkipSelf)
                : i instanceof Q || "Self" === i.ngMetadataName || i === Q
                ? (n |= K.Self)
                : (e = i instanceof U || i === U ? i.token : i);
            }
            t.push(je(e, n));
          } else t.push(je(s));
        }
        return t;
      }
      class He {
        get(e, t = Me) {
          if (t === Me) {
            const t = new Error(`NullInjectorError: No provider for ${ue(e)}!`);
            throw ((t.name = "NullInjectorError"), t);
          }
          return t;
        }
      }
      class Be {}
      function $e(e, t) {
        e.forEach((e) => (Array.isArray(e) ? $e(e, t) : t(e)));
      }
      function Ge(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function qe(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function We(e, t) {
        const n = [];
        for (let s = 0; s < e; s++) n.push(t);
        return n;
      }
      function Ze(e, t, n) {
        let s = Ye(e, t);
        return (
          s >= 0
            ? (e[1 | s] = n)
            : ((s = ~s),
              (function (e, t, n, s) {
                let i = e.length;
                if (i == t) e.push(n, s);
                else if (1 === i) e.push(s, e[0]), (e[0] = n);
                else {
                  for (i--, e.push(e[i - 1], e[i]); i > t; )
                    (e[i] = e[i - 2]), i--;
                  (e[t] = n), (e[t + 1] = s);
                }
              })(e, s, t, n)),
          s
        );
      }
      function Ue(e, t) {
        const n = Ye(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Ye(e, t) {
        return (function (e, t, n) {
          let s = 0,
            i = e.length >> 1;
          for (; i !== s; ) {
            const n = s + ((i - s) >> 1),
              r = e[n << 1];
            if (t === r) return n << 1;
            r > t ? (i = n) : (s = n + 1);
          }
          return ~(i << 1);
        })(e, t);
      }
      var Qe = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })({}),
        Xe = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.Native = 1)] = "Native"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })({});
      const Ke = {},
        Je = [];
      let et = 0;
      function tt(e) {
        return q(() => {
          const t = {},
            n = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: t,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === Qe.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: e.selectors || Je,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || Xe.Emulated,
              id: "c",
              styles: e.styles || Je,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            s = e.directives,
            i = e.features,
            r = e.pipes;
          return (
            (n.id += et++),
            (n.inputs = ot(e.inputs, t)),
            (n.outputs = ot(e.outputs)),
            i && i.forEach((e) => e(n)),
            (n.directiveDefs = s
              ? () => ("function" == typeof s ? s() : s).map(nt)
              : null),
            (n.pipeDefs = r
              ? () => ("function" == typeof r ? r() : r).map(st)
              : null),
            n
          );
        });
      }
      function nt(e) {
        return (
          ct(e) ||
          (function (e) {
            return e[be] || null;
          })(e)
        );
      }
      function st(e) {
        return (function (e) {
          return e[Ce] || null;
        })(e);
      }
      const it = {};
      function rt(e) {
        const t = {
          type: e.type,
          bootstrap: e.bootstrap || Je,
          declarations: e.declarations || Je,
          imports: e.imports || Je,
          exports: e.exports || Je,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        };
        return (
          null != e.id &&
            q(() => {
              it[e.id] = e.type;
            }),
          t
        );
      }
      function ot(e, t) {
        if (null == e) return Ke;
        const n = {};
        for (const s in e)
          if (e.hasOwnProperty(s)) {
            let i = e[s],
              r = i;
            Array.isArray(i) && ((r = i[1]), (i = i[0])),
              (n[i] = s),
              t && (t[i] = r);
          }
        return n;
      }
      const at = tt;
      function lt(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function ct(e) {
        return e[_e] || null;
      }
      function ut(e, t) {
        return e.hasOwnProperty(Ee) ? e[Ee] : null;
      }
      function dt(e, t) {
        const n = e[xe] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${ue(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const ht = 20,
        pt = 10;
      function ft(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function gt(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function vt(e) {
        return 0 != (8 & e.flags);
      }
      function mt(e) {
        return 2 == (2 & e.flags);
      }
      function yt(e) {
        return 1 == (1 & e.flags);
      }
      function wt(e) {
        return null !== e.template;
      }
      function _t(e) {
        return 0 != (512 & e[2]);
      }
      function bt(e) {
        return "string" == typeof e ? e : null == e ? "" : "" + e;
      }
      function Ct(e) {
        return "function" == typeof e
          ? e.name || e.toString()
          : "object" == typeof e && null != e && "function" == typeof e.type
          ? e.type.name || e.type.toString()
          : bt(e);
      }
      const xt = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(we))();
      function St(e) {
        return e instanceof Function ? e() : e;
      }
      function Et(e, t) {
        const n = t ? " in " + t : "";
        throw new Error(`No provider for ${Ct(e)} found${n}`);
      }
      class Tt {
        constructor(e, t, n) {
          (this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function kt() {
        return It;
      }
      function It(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = Ot), Mt;
      }
      function Mt() {
        const e = Pt(this),
          t = null == e ? void 0 : e.current;
        if (t) {
          const n = e.previous;
          if (n === Ke) e.previous = t;
          else for (let e in t) n[e] = t[e];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function Ot(e, t, n, s) {
        const i =
            Pt(e) ||
            (function (e, t) {
              return (e.__ngSimpleChanges__ = t);
            })(e, { previous: Ke, current: null }),
          r = i.current || (i.current = {}),
          o = i.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (r[a] = new Tt(l && l.currentValue, t, o === Ke)), (e[s] = t);
      }
      function Pt(e) {
        return e.__ngSimpleChanges__ || null;
      }
      kt.ngInherit = !0;
      let At = void 0;
      function Dt(e) {
        return !!e.listen;
      }
      const Rt = {
        createRenderer: (e, t) =>
          void 0 !== At
            ? At
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function Nt(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function Lt(e, t) {
        return Nt(t[e.index]);
      }
      function Vt(e, t) {
        return e.data[t + ht];
      }
      function jt(e, t) {
        return e[t + ht];
      }
      function zt(e, t) {
        const n = t[e];
        return ft(n) ? n : n[0];
      }
      function Ft(e) {
        const t = (function (e) {
          return e.__ngContext__ || null;
        })(e);
        return t ? (Array.isArray(t) ? t : t.lView) : null;
      }
      function Ht(e) {
        return 4 == (4 & e[2]);
      }
      function Bt(e) {
        return 128 == (128 & e[2]);
      }
      function $t(e, t) {
        return null === e || null == t ? null : e[t];
      }
      function Gt(e) {
        e[18] = 0;
      }
      function qt(e, t) {
        e[5] += t;
        let n = e,
          s = e[3];
        for (
          ;
          null !== s && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (s[5] += t), (n = s), (s = s[3]);
      }
      const Wt = {
        lFrame: fn(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function Zt() {
        return Wt.bindingsEnabled;
      }
      function Ut() {
        return Wt.lFrame.lView;
      }
      function Yt() {
        return Wt.lFrame.tView;
      }
      function Qt(e) {
        Wt.lFrame.contextLView = e;
      }
      function Xt() {
        return Wt.lFrame.currentTNode;
      }
      function Kt(e, t) {
        (Wt.lFrame.currentTNode = e), (Wt.lFrame.isParent = t);
      }
      function Jt() {
        return Wt.lFrame.isParent;
      }
      function en() {
        Wt.lFrame.isParent = !1;
      }
      function tn() {
        return Wt.isInCheckNoChangesMode;
      }
      function nn(e) {
        Wt.isInCheckNoChangesMode = e;
      }
      function sn() {
        const e = Wt.lFrame;
        let t = e.bindingRootIndex;
        return (
          -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
        );
      }
      function rn() {
        return Wt.lFrame.bindingIndex++;
      }
      function on(e) {
        const t = Wt.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function an(e, t) {
        const n = Wt.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), ln(t);
      }
      function ln(e) {
        Wt.lFrame.currentDirectiveIndex = e;
      }
      function cn() {
        return Wt.lFrame.currentQueryIndex;
      }
      function un(e) {
        Wt.lFrame.currentQueryIndex = e;
      }
      function dn(e, t) {
        const n = pn();
        (Wt.lFrame = n), (n.currentTNode = t), (n.lView = e);
      }
      function hn(e) {
        const t = pn(),
          n = e[1];
        (Wt.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex);
      }
      function pn() {
        const e = Wt.lFrame,
          t = null === e ? null : e.child;
        return null === t ? fn(e) : t;
      }
      function fn(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: 0,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
        };
        return null !== e && (e.child = t), t;
      }
      function gn() {
        const e = Wt.lFrame;
        return (
          (Wt.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const vn = gn;
      function mn() {
        const e = gn();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = 0),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function yn() {
        return Wt.lFrame.selectedIndex;
      }
      function wn(e) {
        Wt.lFrame.selectedIndex = e;
      }
      function _n() {
        const e = Wt.lFrame;
        return Vt(e.tView, e.selectedIndex);
      }
      function bn(e, t) {
        for (let n = t.directiveStart, s = t.directiveEnd; n < s; n++) {
          const t = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: i,
              ngAfterViewInit: r,
              ngAfterViewChecked: o,
              ngOnDestroy: a,
            } = t;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            i &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, i),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, i)),
            r && (e.viewHooks || (e.viewHooks = [])).push(-n, r),
            o &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, o),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, o)),
            null != a && (e.destroyHooks || (e.destroyHooks = [])).push(n, a);
        }
      }
      function Cn(e, t, n) {
        En(e, t, 3, n);
      }
      function xn(e, t, n, s) {
        (3 & e[2]) === n && En(e, t, n, s);
      }
      function Sn(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function En(e, t, n, s) {
        const i = null != s ? s : -1;
        let r = 0;
        for (let o = void 0 !== s ? 65535 & e[18] : 0; o < t.length; o++)
          if ("number" == typeof t[o + 1]) {
            if (((r = t[o]), null != s && r >= s)) break;
          } else
            t[o] < 0 && (e[18] += 65536),
              (r < i || -1 == i) &&
                (Tn(e, n, t, o), (e[18] = (4294901760 & e[18]) + o + 2)),
              o++;
      }
      function Tn(e, t, n, s) {
        const i = n[s] < 0,
          r = n[s + 1],
          o = e[i ? -n[s] : n[s]];
        i
          ? e[2] >> 11 < e[18] >> 16 &&
            (3 & e[2]) === t &&
            ((e[2] += 2048), r.call(o))
          : r.call(o);
      }
      const kn = -1;
      class In {
        constructor(e, t, n) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = n);
        }
      }
      function Mn(e, t, n) {
        const s = Dt(e);
        let i = 0;
        for (; i < n.length; ) {
          const r = n[i];
          if ("number" == typeof r) {
            if (0 !== r) break;
            i++;
            const o = n[i++],
              a = n[i++],
              l = n[i++];
            s ? e.setAttribute(t, a, l, o) : t.setAttributeNS(o, a, l);
          } else {
            const o = r,
              a = n[++i];
            On(o)
              ? s && e.setProperty(t, o, a)
              : s
              ? e.setAttribute(t, o, a)
              : t.setAttribute(o, a),
              i++;
          }
        }
        return i;
      }
      function On(e) {
        return 64 === e.charCodeAt(0);
      }
      function Pn(e, t) {
        if (null === t || 0 === t.length);
        else if (null === e || 0 === e.length) e = t.slice();
        else {
          let n = -1;
          for (let s = 0; s < t.length; s++) {
            const i = t[s];
            "number" == typeof i
              ? (n = i)
              : 0 === n ||
                An(e, n, i, null, -1 === n || 2 === n ? t[++s] : null);
          }
        }
        return e;
      }
      function An(e, t, n, s, i) {
        let r = 0,
          o = e.length;
        if (-1 === t) o = -1;
        else
          for (; r < e.length; ) {
            const n = e[r++];
            if ("number" == typeof n) {
              if (n === t) {
                o = -1;
                break;
              }
              if (n > t) {
                o = r - 1;
                break;
              }
            }
          }
        for (; r < e.length; ) {
          const t = e[r];
          if ("number" == typeof t) break;
          if (t === n) {
            if (null === s) return void (null !== i && (e[r + 1] = i));
            if (s === e[r + 1]) return void (e[r + 2] = i);
          }
          r++, null !== s && r++, null !== i && r++;
        }
        -1 !== o && (e.splice(o, 0, t), (r = o + 1)),
          e.splice(r++, 0, n),
          null !== s && e.splice(r++, 0, s),
          null !== i && e.splice(r++, 0, i);
      }
      function Dn(e) {
        return e !== kn;
      }
      function Rn(e) {
        return 32767 & e;
      }
      function Nn(e, t) {
        let n = e >> 16,
          s = t;
        for (; n > 0; ) (s = s[15]), n--;
        return s;
      }
      let Ln = !0;
      function Vn(e) {
        const t = Ln;
        return (Ln = e), t;
      }
      let jn = 0;
      function zn(e, t) {
        const n = Hn(e, t);
        if (-1 !== n) return n;
        const s = t[1];
        s.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Fn(s.data, e),
          Fn(t, null),
          Fn(s.blueprint, null));
        const i = Bn(e, t),
          r = e.injectorIndex;
        if (Dn(i)) {
          const e = Rn(i),
            n = Nn(i, t),
            s = n[1].data;
          for (let i = 0; i < 8; i++) t[r + i] = n[e + i] | s[e + i];
        }
        return (t[r + 8] = i), r;
      }
      function Fn(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Hn(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Bn(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          s = null,
          i = t;
        for (; null !== i; ) {
          const e = i[1],
            t = e.type;
          if (((s = 2 === t ? e.declTNode : 1 === t ? i[6] : null), null === s))
            return kn;
          if ((n++, (i = i[15]), -1 !== s.injectorIndex))
            return s.injectorIndex | (n << 16);
        }
        return kn;
      }
      function $n(e, t, n) {
        !(function (e, t, n) {
          let s;
          "string" == typeof n
            ? (s = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Te) && (s = n[Te]),
            null == s && (s = n[Te] = jn++);
          const i = 255 & s,
            r = 1 << i,
            o = 64 & i,
            a = 32 & i,
            l = t.data;
          128 & i
            ? o
              ? a
                ? (l[e + 7] |= r)
                : (l[e + 6] |= r)
              : a
              ? (l[e + 5] |= r)
              : (l[e + 4] |= r)
            : o
            ? a
              ? (l[e + 3] |= r)
              : (l[e + 2] |= r)
            : a
            ? (l[e + 1] |= r)
            : (l[e] |= r);
        })(e, t, n);
      }
      function Gn(e, t, n, s = K.Default, i) {
        if (null !== e) {
          const i = (function (e) {
            if ("string" == typeof e) return e.charCodeAt(0) || 0;
            const t = e.hasOwnProperty(Te) ? e[Te] : void 0;
            return "number" == typeof t && t > 0 ? 255 & t : t;
          })(n);
          if ("function" == typeof i) {
            dn(t, e);
            try {
              const e = i();
              if (null != e || s & K.Optional) return e;
              Et(n);
            } finally {
              vn();
            }
          } else if ("number" == typeof i) {
            if (-1 === i) return new Xn(e, t);
            let r = null,
              o = Hn(e, t),
              a = kn,
              l = s & K.Host ? t[16][6] : null;
            for (
              (-1 === o || s & K.SkipSelf) &&
              ((a = -1 === o ? Bn(e, t) : t[o + 8]),
              a !== kn && Qn(s, !1)
                ? ((r = t[1]), (o = Rn(a)), (t = Nn(a, t)))
                : (o = -1));
              -1 !== o;

            ) {
              const e = t[1];
              if (Yn(i, o, e.data)) {
                const e = Wn(o, t, n, r, s, l);
                if (e !== qn) return e;
              }
              (a = t[o + 8]),
                a !== kn && Qn(s, t[1].data[o + 8] === l) && Yn(i, o, t)
                  ? ((r = e), (o = Rn(a)), (t = Nn(a, t)))
                  : (o = -1);
            }
          }
        }
        if (
          (s & K.Optional && void 0 === i && (i = null),
          0 == (s & (K.Self | K.Host)))
        ) {
          const e = t[9],
            r = Le(void 0);
          try {
            return e ? e.get(n, i, s & K.Optional) : ze(n, i, s & K.Optional);
          } finally {
            Le(r);
          }
        }
        if (s & K.Optional) return i;
        Et(n, "NodeInjector");
      }
      const qn = {};
      function Wn(e, t, n, s, i, r) {
        const o = t[1],
          a = o.data[e + 8],
          l = Zn(
            a,
            o,
            n,
            null == s ? mt(a) && Ln : s != o && 2 === a.type,
            i & K.Host && r === a
          );
        return null !== l ? Un(t, o, l, a) : qn;
      }
      function Zn(e, t, n, s, i) {
        const r = e.providerIndexes,
          o = t.data,
          a = 1048575 & r,
          l = e.directiveStart,
          c = r >> 20,
          u = i ? a + c : e.directiveEnd;
        for (let d = s ? a : a + c; d < u; d++) {
          const e = o[d];
          if ((d < l && n === e) || (d >= l && e.type === n)) return d;
        }
        if (i) {
          const e = o[l];
          if (e && wt(e) && e.type === n) return l;
        }
        return null;
      }
      function Un(e, t, n, s) {
        let i = e[n];
        const r = t.data;
        if (i instanceof In) {
          const o = i;
          o.resolving &&
            (function (e, t) {
              throw new Error("Circular dependency in DI detected for " + e);
            })(Ct(r[n]));
          const a = Vn(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? Le(o.injectImpl) : null;
          dn(e, s);
          try {
            (i = e[n] = o.factory(void 0, r, e, s)),
              t.firstCreatePass &&
                n >= s.directiveStart &&
                (function (e, t, n) {
                  const {
                    ngOnChanges: s,
                    ngOnInit: i,
                    ngDoCheck: r,
                  } = t.type.prototype;
                  if (s) {
                    const s = It(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  i &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, i),
                    r &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, r),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, r));
                })(n, r[n], t);
          } finally {
            null !== l && Le(l), Vn(a), (o.resolving = !1), vn();
          }
        }
        return i;
      }
      function Yn(e, t, n) {
        const s = 64 & e,
          i = 32 & e;
        let r;
        return (
          (r =
            128 & e
              ? s
                ? i
                  ? n[t + 7]
                  : n[t + 6]
                : i
                ? n[t + 5]
                : n[t + 4]
              : s
              ? i
                ? n[t + 3]
                : n[t + 2]
              : i
              ? n[t + 1]
              : n[t]),
          !!(r & (1 << e))
        );
      }
      function Qn(e, t) {
        return !(e & K.Self || (e & K.Host && t));
      }
      class Xn {
        constructor(e, t) {
          (this._tNode = e), (this._lView = t);
        }
        get(e, t) {
          return Gn(this._tNode, this._lView, e, void 0, t);
        }
      }
      function Kn(e) {
        return e.ngDebugContext;
      }
      function Jn(e) {
        return e.ngOriginalError;
      }
      function es(e, ...t) {
        e.error(...t);
      }
      class ts {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const t = this._findOriginalError(e),
            n = this._findContext(e),
            s = (function (e) {
              return e.ngErrorLogger || es;
            })(e);
          s(this._console, "ERROR", e),
            t && s(this._console, "ORIGINAL ERROR", t),
            n && s(this._console, "ERROR CONTEXT", n);
        }
        _findContext(e) {
          return e ? (Kn(e) ? Kn(e) : this._findContext(Jn(e))) : null;
        }
        _findOriginalError(e) {
          let t = Jn(e);
          for (; t && Jn(t); ) t = Jn(t);
          return t;
        }
      }
      function ns(e) {
        return e instanceof
          class {
            constructor(e) {
              this.changingThisBreaksApplicationSecurity = e;
            }
            toString() {
              return (
                "SafeValue must use [property]=binding: " +
                this.changingThisBreaksApplicationSecurity +
                " (see http://g.co/ng/security#xss)"
              );
            }
          }
          ? e.changingThisBreaksApplicationSecurity
          : e;
      }
      let ss = !0,
        is = !1;
      function rs() {
        return (is = !0), ss;
      }
      function os(e, t) {
        e.__ngContext__ = t;
      }
      function as(e, t, n) {
        let s = e.length;
        for (;;) {
          const i = e.indexOf(t, n);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const n = t.length;
            if (i + n === s || e.charCodeAt(i + n) <= 32) return i;
          }
          n = i + 1;
        }
      }
      const ls = "ng-template";
      function cs(e, t, n) {
        let s = 0;
        for (; s < e.length; ) {
          let i = e[s++];
          if (n && "class" === i) {
            if (((i = e[s]), -1 !== as(i.toLowerCase(), t, 0))) return !0;
          } else if (1 === i) {
            for (; s < e.length && "string" == typeof (i = e[s++]); )
              if (i.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function us(e) {
        return 0 === e.type && e.tagName !== ls;
      }
      function ds(e, t, n) {
        return t === (0 !== e.type || n ? e.tagName : ls);
      }
      function hs(e, t, n) {
        let s = 4;
        const i = e.attrs || [],
          r = (function (e) {
            for (let n = 0; n < e.length; n++)
              if (3 === (t = e[n]) || 4 === t || 6 === t) return n;
            var t;
            return e.length;
          })(i);
        let o = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & s) {
                if (
                  ((s = 2 | (1 & s)),
                  ("" !== l && !ds(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (ps(s)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & s ? l : t[++a];
                if (8 & s && null !== e.attrs) {
                  if (!cs(e.attrs, c, n)) {
                    if (ps(s)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const u = fs(8 & s ? "class" : l, i, us(e), n);
                if (-1 === u) {
                  if (ps(s)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let e;
                  e = u > r ? "" : i[u + 1].toLowerCase();
                  const t = 8 & s ? e : null;
                  if ((t && -1 !== as(t, c, 0)) || (2 & s && c !== e)) {
                    if (ps(s)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !ps(s) && !ps(l)) return !1;
            if (o && ps(l)) continue;
            (o = !1), (s = l | (1 & s));
          }
        }
        return ps(s) || o;
      }
      function ps(e) {
        return 0 == (1 & e);
      }
      function fs(e, t, n, s) {
        if (null === t) return -1;
        let i = 0;
        if (s || !n) {
          let n = !1;
          for (; i < t.length; ) {
            const s = t[i];
            if (s === e) return i;
            if (3 === s || 6 === s) n = !0;
            else {
              if (1 === s || 2 === s) {
                let e = t[++i];
                for (; "string" == typeof e; ) e = t[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += n ? 1 : 2;
          }
          return -1;
        }
        return (function (e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const s = e[n];
              if ("number" == typeof s) return -1;
              if (s === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function gs(e, t, n = !1) {
        for (let s = 0; s < t.length; s++) if (hs(e, t[s], n)) return !0;
        return !1;
      }
      function vs(e, t) {
        e: for (let n = 0; n < t.length; n++) {
          const s = t[n];
          if (e.length === s.length) {
            for (let t = 0; t < e.length; t++) if (e[t] !== s[t]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function ms(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function ys(e) {
        let t = e[0],
          n = 1,
          s = 2,
          i = "",
          r = !1;
        for (; n < e.length; ) {
          let o = e[n];
          if ("string" == typeof o)
            if (2 & s) {
              const t = e[++n];
              i += "[" + o + (t.length > 0 ? '="' + t + '"' : "") + "]";
            } else 8 & s ? (i += "." + o) : 4 & s && (i += " " + o);
          else
            "" === i || ps(o) || ((t += ms(r, i)), (i = "")),
              (s = o),
              (r = r || !ps(s));
          n++;
        }
        return "" !== i && (t += ms(r, i)), t;
      }
      const ws = {};
      function _s(e) {
        const t = e[3];
        return gt(t) ? t[3] : t;
      }
      function bs(e) {
        return xs(e[13]);
      }
      function Cs(e) {
        return xs(e[4]);
      }
      function xs(e) {
        for (; null !== e && !gt(e); ) e = e[4];
        return e;
      }
      function Ss(e) {
        Es(Yt(), Ut(), yn() + e, tn());
      }
      function Es(e, t, n, s) {
        if (!s)
          if (3 == (3 & t[2])) {
            const s = e.preOrderCheckHooks;
            null !== s && Cn(t, s, n);
          } else {
            const s = e.preOrderHooks;
            null !== s && xn(t, s, 0, n);
          }
        wn(n);
      }
      function Ts(e, t) {
        return (e << 17) | (t << 2);
      }
      function ks(e) {
        return (e >> 17) & 32767;
      }
      function Is(e) {
        return 2 | e;
      }
      function Ms(e) {
        return (131068 & e) >> 2;
      }
      function Os(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Ps(e) {
        return 1 | e;
      }
      function As(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let s = 0; s < n.length; s += 2) {
            const i = n[s],
              r = n[s + 1];
            if (-1 !== r) {
              const n = e.data[r];
              un(i), n.contentQueries(2, t[r], r);
            }
          }
      }
      function Ds(e, t, n) {
        return Dt(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e);
      }
      function Rs(e, t, n, s, i, r, o, a, l, c) {
        const u = t.blueprint.slice();
        return (
          (u[0] = i),
          (u[2] = 140 | s),
          Gt(u),
          (u[3] = u[15] = e),
          (u[8] = n),
          (u[10] = o || (e && e[10])),
          (u[11] = a || (e && e[11])),
          (u[12] = l || (e && e[12]) || null),
          (u[9] = c || (e && e[9]) || null),
          (u[6] = r),
          (u[16] = 2 == t.type ? e[16] : u),
          u
        );
      }
      function Ns(e, t, n, s, i) {
        const r = t + ht,
          o =
            e.data[r] ||
            (function (e, t, n, s, i) {
              const r = Xt(),
                o = Jt(),
                a = (e.data[t] = (function (e, t, n, s, i, r) {
                  return {
                    type: n,
                    index: s,
                    injectorIndex: t ? t.injectorIndex : -1,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    propertyBindings: null,
                    flags: 0,
                    providerIndexes: 0,
                    tagName: i,
                    attrs: r,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tViews: null,
                    next: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  };
                })(0, o ? r : r && r.parent, n, t, s, i));
              return (
                null === e.firstChild && (e.firstChild = a),
                null !== r &&
                  (o && null == r.child && null !== a.parent
                    ? (r.child = a)
                    : o || (r.next = a)),
                a
              );
            })(e, r, n, s, i);
        return Kt(o, !0), o;
      }
      function Ls(e, t, n) {
        hn(t);
        try {
          const s = e.viewQuery;
          null !== s && hi(1, s, n);
          const i = e.template;
          null !== i && zs(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && As(e, t),
            e.staticViewQueries && hi(2, e.viewQuery, n);
          const r = e.components;
          null !== r &&
            (function (e, t) {
              for (let n = 0; n < t.length; n++) ai(e, t[n]);
            })(t, r);
        } catch (s) {
          throw (e.firstCreatePass && (e.incompleteFirstPass = !0), s);
        } finally {
          (t[2] &= -5), mn();
        }
      }
      function Vs(e, t, n, s) {
        const i = t[2];
        if (256 == (256 & i)) return;
        hn(t);
        const r = tn();
        try {
          Gt(t),
            (Wt.lFrame.bindingIndex = e.bindingStartIndex),
            null !== n && zs(e, t, n, 2, s);
          const o = 3 == (3 & i);
          if (!r)
            if (o) {
              const n = e.preOrderCheckHooks;
              null !== n && Cn(t, n, null);
            } else {
              const n = e.preOrderHooks;
              null !== n && xn(t, n, 0, null), Sn(t, 0);
            }
          if (
            ((function (e) {
              for (let t = bs(e); null !== t; t = Cs(t)) {
                if (!t[2]) continue;
                const e = t[9];
                for (let t = 0; t < e.length; t++) {
                  const n = e[t],
                    s = n[3];
                  0 == (1024 & n[2]) && qt(s, 1), (n[2] |= 1024);
                }
              }
            })(t),
            (function (e) {
              for (let t = bs(e); null !== t; t = Cs(t))
                for (let e = pt; e < t.length; e++) {
                  const n = t[e],
                    s = n[1];
                  Bt(n) && Vs(s, n, s.template, n[8]);
                }
            })(t),
            null !== e.contentQueries && As(e, t),
            !r)
          )
            if (o) {
              const n = e.contentCheckHooks;
              null !== n && Cn(t, n);
            } else {
              const n = e.contentHooks;
              null !== n && xn(t, n, 1), Sn(t, 1);
            }
          !(function (e, t) {
            try {
              const n = e.expandoInstructions;
              if (null !== n) {
                let s = e.expandoStartIndex,
                  i = -1,
                  r = -1;
                for (let e = 0; e < n.length; e++) {
                  const o = n[e];
                  "number" == typeof o
                    ? o <= 0
                      ? ((r = 0 - o), wn(r), (s += 9 + n[++e]), (i = s))
                      : (s += o)
                    : (null !== o && (an(s, i), o(2, t[i])), i++);
                }
              }
            } finally {
              wn(-1);
            }
          })(e, t);
          const a = e.components;
          null !== a &&
            (function (e, t) {
              for (let n = 0; n < t.length; n++) oi(e, t[n]);
            })(t, a);
          const l = e.viewQuery;
          if ((null !== l && hi(2, l, s), !r))
            if (o) {
              const n = e.viewCheckHooks;
              null !== n && Cn(t, n);
            } else {
              const n = e.viewHooks;
              null !== n && xn(t, n, 2), Sn(t, 2);
            }
          !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
            r || (t[2] &= -73),
            1024 & t[2] && ((t[2] &= -1025), qt(t[3], -1));
        } finally {
          mn();
        }
      }
      function js(e, t, n, s) {
        const i = t[10],
          r = !tn(),
          o = Ht(t);
        try {
          r && !o && i.begin && i.begin(), o && Ls(e, t, s), Vs(e, t, n, s);
        } finally {
          r && !o && i.end && i.end();
        }
      }
      function zs(e, t, n, s, i) {
        const r = yn();
        try {
          wn(-1), 2 & s && t.length > ht && Es(e, t, 0, tn()), n(s, i);
        } finally {
          wn(r);
        }
      }
      function Fs(e, t, n) {
        if (vt(t)) {
          const s = t.directiveEnd;
          for (let i = t.directiveStart; i < s; i++) {
            const t = e.data[i];
            t.contentQueries && t.contentQueries(1, n[i], i);
          }
        }
      }
      function Hs(e, t, n) {
        Zt() &&
          ((function (e, t, n, s) {
            const i = n.directiveStart,
              r = n.directiveEnd;
            e.firstCreatePass || zn(n, t), os(s, t);
            const o = n.initialInputs;
            for (let a = i; a < r; a++) {
              const s = e.data[a],
                r = wt(s);
              r && ni(t, n, s);
              const l = Un(t, e, a, n);
              os(l, t),
                null !== o && si(0, a - i, l, s, 0, o),
                r && (zt(n.index, t)[8] = l);
            }
          })(e, t, n, Lt(n, t)),
          128 == (128 & n.flags) &&
            (function (e, t, n) {
              const s = n.directiveStart,
                i = n.directiveEnd,
                r = e.expandoInstructions,
                o = e.firstCreatePass,
                a = n.index - ht,
                l = Wt.lFrame.currentDirectiveIndex;
              try {
                wn(a);
                for (let n = s; n < i; n++) {
                  const s = e.data[n],
                    i = t[n];
                  ln(n),
                    null !== s.hostBindings ||
                    0 !== s.hostVars ||
                    null !== s.hostAttrs
                      ? Qs(s, i)
                      : o && r.push(null);
                }
              } finally {
                wn(-1), ln(l);
              }
            })(e, t, n));
      }
      function Bs(e, t, n = Lt) {
        const s = t.localNames;
        if (null !== s) {
          let i = t.index + 1;
          for (let r = 0; r < s.length; r += 2) {
            const o = s[r + 1],
              a = -1 === o ? n(t, e) : e[o];
            e[i++] = a;
          }
        }
      }
      function $s(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Gs(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Gs(e, t, n, s, i, r, o, a, l, c) {
        const u = ht + s,
          d = u + i,
          h = (function (e, t) {
            const n = [];
            for (let s = 0; s < t; s++) n.push(s < e ? null : ws);
            return n;
          })(u, d),
          p = "function" == typeof c ? c() : c;
        return (h[1] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          expandoInstructions: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof r ? r() : r,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
        });
      }
      function qs(e, t, n, s) {
        const i = fi(t);
        i.push(n),
          e.firstCreatePass &&
            (function (e) {
              return e.cleanup || (e.cleanup = []);
            })(e).push(s, i.length - 1);
      }
      function Ws(e, t, n) {
        for (let s in e)
          if (e.hasOwnProperty(s)) {
            const i = e[s];
            (n = null === n ? {} : n).hasOwnProperty(s)
              ? n[s].push(t, i)
              : (n[s] = [t, i]);
          }
        return n;
      }
      function Zs(e, t, n, s) {
        let i = !1;
        if (Zt()) {
          const r = (function (e, t, n) {
              const s = e.directiveRegistry;
              let i = null;
              if (s)
                for (let r = 0; r < s.length; r++) {
                  const o = s[r];
                  gs(n, o.selectors, !1) &&
                    (i || (i = []),
                    $n(zn(n, t), e, o.type),
                    wt(o) ? (Ks(e, n), i.unshift(o)) : i.push(o));
                }
              return i;
            })(e, t, n),
            o = null === s ? null : { "": -1 };
          if (null !== r) {
            let s = 0;
            (i = !0), ei(n, e.data.length, r.length);
            for (let e = 0; e < r.length; e++) {
              const t = r[e];
              t.providersResolver && t.providersResolver(t);
            }
            Xs(e, n, r.length);
            let a = !1,
              l = !1;
            for (let i = 0; i < r.length; i++) {
              const c = r[i];
              (n.mergedAttrs = Pn(n.mergedAttrs, c.hostAttrs)),
                ti(e, t, c),
                Js(e.data.length - 1, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128);
              const u = c.type.prototype;
              !a &&
                (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index - ht),
                (a = !0)),
                l ||
                  (!u.ngOnChanges && !u.ngDoCheck) ||
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index - ht
                  ),
                  (l = !0)),
                Us(e, c),
                (s += c.hostVars);
            }
            !(function (e, t) {
              const n = t.directiveEnd,
                s = e.data,
                i = t.attrs,
                r = [];
              let o = null,
                a = null;
              for (let l = t.directiveStart; l < n; l++) {
                const e = s[l],
                  n = e.inputs,
                  c = null === i || us(t) ? null : ii(n, i);
                r.push(c), (o = Ws(n, l, o)), (a = Ws(e.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty("class") && (t.flags |= 16),
                o.hasOwnProperty("style") && (t.flags |= 32)),
                (t.initialInputs = r),
                (t.inputs = o),
                (t.outputs = a);
            })(e, n),
              Ys(e, t, s);
          }
          o &&
            (function (e, t, n) {
              if (t) {
                const s = (e.localNames = []);
                for (let e = 0; e < t.length; e += 2) {
                  const i = n[t[e + 1]];
                  if (null == i)
                    throw new Error(`Export of name '${t[e + 1]}' not found!`);
                  s.push(t[e], i);
                }
              }
            })(n, s, o);
        }
        return (n.mergedAttrs = Pn(n.mergedAttrs, n.attrs)), i;
      }
      function Us(e, t) {
        const n = e.expandoInstructions;
        n.push(t.hostBindings), 0 !== t.hostVars && n.push(t.hostVars);
      }
      function Ys(e, t, n) {
        for (let s = 0; s < n; s++)
          t.push(ws), e.blueprint.push(ws), e.data.push(null);
      }
      function Qs(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Xs(e, t, n) {
        const s = ht - t.index,
          i = e.data.length - (1048575 & t.providerIndexes);
        (e.expandoInstructions || (e.expandoInstructions = [])).push(s, i, n);
      }
      function Ks(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function Js(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let s = 0; s < t.exportAs.length; s++) n[t.exportAs[s]] = e;
          wt(t) && (n[""] = e);
        }
      }
      function ei(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function ti(e, t, n) {
        e.data.push(n);
        const s = n.factory || (n.factory = ut(n.type)),
          i = new In(s, wt(n), null);
        e.blueprint.push(i), t.push(i);
      }
      function ni(e, t, n) {
        const s = Lt(t, e),
          i = $s(n),
          r = e[10],
          o = li(
            e,
            Rs(
              e,
              i,
              null,
              n.onPush ? 64 : 16,
              s,
              t,
              r,
              r.createRenderer(s, n),
              null,
              null
            )
          );
        e[t.index] = o;
      }
      function si(e, t, n, s, i, r) {
        const o = r[t];
        if (null !== o) {
          const e = s.setInput;
          for (let t = 0; t < o.length; ) {
            const i = o[t++],
              r = o[t++],
              a = o[t++];
            null !== e ? s.setInput(n, a, i, r) : (n[r] = a);
          }
        }
      }
      function ii(e, t) {
        let n = null,
          s = 0;
        for (; s < t.length; ) {
          const i = t[s];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              e.hasOwnProperty(i) &&
                (null === n && (n = []), n.push(i, e[i], t[s + 1])),
                (s += 2);
            } else s += 2;
          else s += 4;
        }
        return n;
      }
      function ri(e, t, n, s) {
        return new Array(e, !0, !1, t, null, 0, s, n, null, null);
      }
      function oi(e, t) {
        const n = zt(t, e);
        if (Bt(n)) {
          const e = n[1];
          80 & n[2]
            ? Vs(e, n, e.template, n[8])
            : n[5] > 0 &&
              (function e(t) {
                for (let s = bs(t); null !== s; s = Cs(s))
                  for (let t = pt; t < s.length; t++) {
                    const n = s[t];
                    if (1024 & n[2]) {
                      const e = n[1];
                      Vs(e, n, e.template, n[8]);
                    } else n[5] > 0 && e(n);
                  }
                const n = t[1].components;
                if (null !== n)
                  for (let s = 0; s < n.length; s++) {
                    const i = zt(n[s], t);
                    Bt(i) && i[5] > 0 && e(i);
                  }
              })(n);
        }
      }
      function ai(e, t) {
        const n = zt(t, e),
          s = n[1];
        !(function (e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(s, n),
          Ls(s, n, n[8]);
      }
      function li(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function ci(e) {
        for (; e; ) {
          e[2] |= 64;
          const t = _s(e);
          if (_t(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function ui(e, t, n) {
        const s = t[10];
        s.begin && s.begin();
        try {
          Vs(e, t, e.template, n);
        } catch (i) {
          throw (gi(t, i), i);
        } finally {
          s.end && s.end();
        }
      }
      function di(e) {
        !(function (e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              s = Ft(n),
              i = s[1];
            js(i, s, i.template, n);
          }
        })(e[8]);
      }
      function hi(e, t, n) {
        un(0), t(e, n);
      }
      const pi = (() => Promise.resolve(null))();
      function fi(e) {
        return e[7] || (e[7] = []);
      }
      function gi(e, t) {
        const n = e[9],
          s = n ? n.get(ts, null) : null;
        s && s.handleError(t);
      }
      function vi(e, t, n, s, i) {
        for (let r = 0; r < n.length; ) {
          const o = n[r++],
            a = n[r++],
            l = t[o],
            c = e.data[o];
          null !== c.setInput ? c.setInput(l, i, s, a) : (l[a] = i);
        }
      }
      function mi(e, t, n, s, i) {
        if (null != s) {
          let r,
            o = !1;
          gt(s) ? (r = s) : ft(s) && ((o = !0), (s = s[0]));
          const a = Nt(s);
          0 === e && null !== n
            ? null == i
              ? Si(t, n, a)
              : xi(t, n, a, i || null)
            : 1 === e && null !== n
            ? xi(t, n, a, i || null)
            : 2 === e
            ? (function (e, t, n) {
                const s = Ti(e, t);
                s &&
                  (function (e, t, n, s) {
                    Dt(e) ? e.removeChild(t, n, s) : t.removeChild(n);
                  })(e, s, t, n);
              })(t, a, o)
            : 3 === e && t.destroyNode(a),
            null != r &&
              (function (e, t, n, s, i) {
                const r = n[7];
                r !== Nt(n) && mi(t, e, s, r, i);
                for (let o = pt; o < n.length; o++) {
                  const i = n[o];
                  Oi(i[1], i, e, t, s, r);
                }
              })(t, e, r, n, i);
        }
      }
      function yi(e, t) {
        const n = e[9],
          s = n.indexOf(t),
          i = t[3];
        1024 & t[2] && ((t[2] &= -1025), qt(i, -1)), n.splice(s, 1);
      }
      function wi(e, t) {
        if (e.length <= pt) return;
        const n = pt + t,
          s = e[n];
        if (s) {
          const r = s[17];
          null !== r && r !== e && yi(r, s), t > 0 && (e[n - 1][4] = s[4]);
          const o = qe(e, pt + t);
          Oi(s[1], (i = s), i[11], 2, null, null), (i[0] = null), (i[6] = null);
          const a = o[19];
          null !== a && a.detachView(o[1]),
            (s[3] = null),
            (s[4] = null),
            (s[2] &= -129);
        }
        var i;
        return s;
      }
      function _i(e, t) {
        if (!(256 & t[2])) {
          const n = t[11];
          Dt(n) && n.destroyNode && Oi(e, t, n, 3, null, null),
            (function (e) {
              let t = e[13];
              if (!t) return bi(e[1], e);
              for (; t; ) {
                let n = null;
                if (ft(t)) n = t[13];
                else {
                  const e = t[10];
                  e && (n = e);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    ft(t) && bi(t[1], t), (t = t[3]);
                  null === t && (t = e), ft(t) && bi(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function bi(e, t) {
        if (!(256 & t[2])) {
          (t[2] &= -129),
            (t[2] |= 256),
            (function (e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let s = 0; s < n.length; s += 2) {
                  const e = t[n[s]];
                  if (!(e instanceof In)) {
                    const t = n[s + 1];
                    if (Array.isArray(t))
                      for (let n = 0; n < t.length; n += 2)
                        t[n + 1].call(e[t[n]]);
                    else t.call(e);
                  }
                }
            })(e, t),
            (function (e, t) {
              const n = e.cleanup;
              if (null !== n) {
                const e = t[7];
                for (let s = 0; s < n.length - 1; s += 2)
                  if ("string" == typeof n[s]) {
                    const i = n[s + 1],
                      r = "function" == typeof i ? i(t) : Nt(t[i]),
                      o = e[n[s + 2]],
                      a = n[s + 3];
                    "boolean" == typeof a
                      ? r.removeEventListener(n[s], o, a)
                      : a >= 0
                      ? e[a]()
                      : e[-a].unsubscribe(),
                      (s += 2);
                  } else n[s].call(e[n[s + 1]]);
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && Dt(t[11]) && t[11].destroy();
          const n = t[17];
          if (null !== n && gt(t[3])) {
            n !== t[3] && yi(n, t);
            const s = t[19];
            null !== s && s.detachView(e);
          }
        }
      }
      function Ci(e, t, n) {
        let s = t.parent;
        for (; null != s && (3 === s.type || 4 === s.type); )
          s = (t = s).parent;
        if (null === s) return n[0];
        if (t && 4 === t.type && 4 & t.flags) return Lt(t, n).parentNode;
        if (2 & s.flags) {
          const t = e.data,
            n = t[t[s.index].directiveStart].encapsulation;
          if (n !== Xe.ShadowDom && n !== Xe.Native) return null;
        }
        return Lt(s, n);
      }
      function xi(e, t, n, s) {
        Dt(e) ? e.insertBefore(t, n, s) : t.insertBefore(n, s, !0);
      }
      function Si(e, t, n) {
        Dt(e) ? e.appendChild(t, n) : t.appendChild(n);
      }
      function Ei(e, t, n, s) {
        null !== s ? xi(e, t, n, s) : Si(e, t, n);
      }
      function Ti(e, t) {
        return Dt(e) ? e.parentNode(t) : t.parentNode;
      }
      function ki(e, t) {
        return 3 === e.type || 4 === e.type ? Lt(e, t) : null;
      }
      function Ii(e, t, n, s) {
        const i = Ci(e, s, t);
        if (null != i) {
          const e = t[11],
            r = ki(s.parent || t[6], t);
          if (Array.isArray(n))
            for (let t = 0; t < n.length; t++) Ei(e, i, n[t], r);
          else Ei(e, i, n, r);
        }
      }
      function Mi(e, t, n, s, i, r, o) {
        for (; null != n; ) {
          const a = s[n.index],
            l = n.type;
          o && 0 === t && (a && os(Nt(a), s), (n.flags |= 4)),
            64 != (64 & n.flags) &&
              (3 === l || 4 === l
                ? (Mi(e, t, n.child, s, i, r, !1), mi(t, e, i, a, r))
                : 1 === l
                ? Pi(e, t, s, n, i, r)
                : mi(t, e, i, a, r)),
            (n = o ? n.projectionNext : n.next);
        }
      }
      function Oi(e, t, n, s, i, r) {
        Mi(n, s, e.firstChild, t, i, r, !1);
      }
      function Pi(e, t, n, s, i, r) {
        const o = n[16],
          a = o[6].projection[s.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) mi(t, e, i, a[l], r);
        else Mi(e, t, a, o[3], i, r, !0);
      }
      function Ai(e, t, n) {
        Dt(e) ? e.setAttribute(t, "style", n) : (t.style.cssText = n);
      }
      function Di(e, t, n) {
        Dt(e)
          ? "" === n
            ? e.removeAttribute(t, "class")
            : e.setAttribute(t, "class", n)
          : (t.className = n);
      }
      class Ri {
        constructor(e, t) {
          (this._lView = e),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._viewContainerRef = null);
        }
        get rootNodes() {
          const e = this._lView,
            t = e[1];
          return (function e(t, n, s, i, r = !1) {
            for (; null !== s; ) {
              const o = n[s.index];
              if ((null !== o && i.push(Nt(o)), gt(o)))
                for (let t = pt; t < o.length; t++) {
                  const n = o[t],
                    s = n[1].firstChild;
                  null !== s && e(n[1], n, s, i);
                }
              const a = s.type;
              if (3 === a || 4 === a) e(t, n, s.child, i);
              else if (1 === a) {
                const t = n[16],
                  r = t[6].projection[s.projection];
                if (Array.isArray(r)) i.push(...r);
                else {
                  const n = _s(t);
                  e(n[1], n, r, i, !0);
                }
              }
              s = r ? s.projectionNext : s.next;
            }
            return i;
          })(t, e, t.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._viewContainerRef) {
            const e = this._viewContainerRef.indexOf(this);
            e > -1 && this._viewContainerRef.detach(e),
              (this._viewContainerRef = null);
          }
          _i(this._lView[1], this._lView);
        }
        onDestroy(e) {
          qs(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          ci(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          ui(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (e, t, n) {
            nn(!0);
            try {
              ui(e, t, n);
            } finally {
              nn(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef(e) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = e;
        }
        detachFromAppRef() {
          var e;
          (this._appRef = null),
            Oi(this._lView[1], (e = this._lView), e[11], 2, null, null);
        }
        attachToAppRef(e) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = e;
        }
      }
      class Ni extends Ri {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          di(this._view);
        }
        checkNoChanges() {
          !(function (e) {
            nn(!0);
            try {
              di(e);
            } finally {
              nn(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      let Li, Vi, ji;
      function zi(e, t, n) {
        return Li || (Li = class extends e {}), new Li(Lt(t, n));
      }
      function Fi(e, t, n, s) {
        return (
          Vi ||
            (Vi = class extends e {
              constructor(e, t, n) {
                super(),
                  (this._declarationView = e),
                  (this._declarationTContainer = t),
                  (this.elementRef = n);
              }
              createEmbeddedView(e) {
                const t = this._declarationTContainer.tViews,
                  n = Rs(
                    this._declarationView,
                    t,
                    e,
                    16,
                    null,
                    t.declTNode,
                    null,
                    null,
                    null,
                    null
                  );
                n[17] = this._declarationView[
                  this._declarationTContainer.index
                ];
                const s = this._declarationView[19];
                return (
                  null !== s && (n[19] = s.createEmbeddedView(t)),
                  Ls(t, n, e),
                  new Ri(n)
                );
              }
            }),
          0 === n.type ? new Vi(s, n, zi(t, n, s)) : null
        );
      }
      function Hi(e, t, n, s) {
        let i;
        ji ||
          (ji = class extends e {
            constructor(e, t, n) {
              super(),
                (this._lContainer = e),
                (this._hostTNode = t),
                (this._hostView = n);
            }
            get element() {
              return zi(t, this._hostTNode, this._hostView);
            }
            get injector() {
              return new Xn(this._hostTNode, this._hostView);
            }
            get parentInjector() {
              const e = Bn(this._hostTNode, this._hostView);
              if (Dn(e)) {
                const t = Nn(e, this._hostView),
                  n = Rn(e);
                return new Xn(t[1].data[n + 8], t);
              }
              return new Xn(null, this._hostView);
            }
            clear() {
              for (; this.length > 0; ) this.remove(this.length - 1);
            }
            get(e) {
              return (
                (null !== this._lContainer[8] && this._lContainer[8][e]) || null
              );
            }
            get length() {
              return this._lContainer.length - pt;
            }
            createEmbeddedView(e, t, n) {
              const s = e.createEmbeddedView(t || {});
              return this.insert(s, n), s;
            }
            createComponent(e, t, n, s, i) {
              const r = n || this.parentInjector;
              if (!i && null == e.ngModule && r) {
                const e = r.get(Be, null);
                e && (i = e);
              }
              const o = e.create(r, s, void 0, i);
              return this.insert(o.hostView, t), o;
            }
            insert(e, t) {
              const n = e._lView,
                s = n[1];
              if (e.destroyed)
                throw new Error(
                  "Cannot insert a destroyed View in a ViewContainer!"
                );
              if ((this.allocateContainerIfNeeded(), gt(n[3]))) {
                const t = this.indexOf(e);
                if (-1 !== t) this.detach(t);
                else {
                  const t = n[3],
                    s = new ji(t, t[6], t[3]);
                  s.detach(s.indexOf(e));
                }
              }
              const i = this._adjustIndex(t),
                r = this._lContainer;
              !(function (e, t, n, s) {
                const i = pt + s,
                  r = n.length;
                s > 0 && (n[i - 1][4] = t),
                  s < r - pt
                    ? ((t[4] = n[i]), Ge(n, pt + s, t))
                    : (n.push(t), (t[4] = null)),
                  (t[3] = n);
                const o = t[17];
                null !== o &&
                  n !== o &&
                  (function (e, t) {
                    const n = e[9];
                    t[16] !== t[3][3][16] && (e[2] = !0),
                      null === n ? (e[9] = [t]) : n.push(t);
                  })(o, t);
                const a = t[19];
                null !== a && a.insertView(e), (t[2] |= 128);
              })(s, n, r, i);
              const o = (function e(t, n) {
                  const s = pt + t + 1;
                  if (s < n.length) {
                    const t = n[s],
                      i = t[1].firstChild;
                    if (null !== i)
                      return (function t(n, s) {
                        if (null !== s) {
                          const i = s.type;
                          if (2 === i) return Lt(s, n);
                          if (0 === i) return e(-1, n[s.index]);
                          if (3 === i || 4 === i) {
                            const i = s.child;
                            if (null !== i) return t(n, i);
                            {
                              const t = n[s.index];
                              return gt(t) ? e(-1, t) : Nt(t);
                            }
                          }
                          {
                            const e = n[16],
                              i = e[6],
                              r = _s(e),
                              o = i.projection[s.projection];
                            return null != o ? t(r, o) : t(n, s.next);
                          }
                        }
                        return null;
                      })(t, i);
                  }
                  return n[7];
                })(i, r),
                a = n[11],
                l = Ti(a, r[7]);
              return (
                null !== l &&
                  (function (e, t, n, s, i, r) {
                    (s[0] = i), (s[6] = t), Oi(e, s, n, 1, i, r);
                  })(s, r[6], a, n, l, o),
                e.attachToViewContainerRef(this),
                Ge(r[8], i, e),
                e
              );
            }
            move(e, t) {
              if (e.destroyed)
                throw new Error(
                  "Cannot move a destroyed View in a ViewContainer!"
                );
              return this.insert(e, t);
            }
            indexOf(e) {
              const t = this._lContainer[8];
              return null !== t ? t.indexOf(e) : -1;
            }
            remove(e) {
              this.allocateContainerIfNeeded();
              const t = this._adjustIndex(e, -1),
                n = wi(this._lContainer, t);
              n && (qe(this._lContainer[8], t), _i(n[1], n));
            }
            detach(e) {
              this.allocateContainerIfNeeded();
              const t = this._adjustIndex(e, -1),
                n = wi(this._lContainer, t);
              return n && null != qe(this._lContainer[8], t) ? new Ri(n) : null;
            }
            _adjustIndex(e, t = 0) {
              return null == e ? this.length + t : e;
            }
            allocateContainerIfNeeded() {
              null === this._lContainer[8] && (this._lContainer[8] = []);
            }
          });
        const r = s[n.index];
        if (gt(r)) i = r;
        else {
          let e;
          if (3 === n.type) e = Nt(r);
          else if (((e = s[11].createComment("")), _t(s))) {
            const t = s[11],
              i = Lt(n, s);
            xi(
              t,
              Ti(t, i),
              e,
              (function (e, t) {
                return Dt(e) ? e.nextSibling(t) : t.nextSibling;
              })(t, i)
            );
          } else Ii(s[1], s, e, n);
          (s[n.index] = i = ri(r, s, e, n)), li(s, i);
        }
        return new ji(i, n, s);
      }
      function Bi(e = !1) {
        return (function (e, t, n) {
          if (!n && mt(e)) {
            const n = zt(e.index, t);
            return new Ri(n, n);
          }
          return 2 === e.type || 0 === e.type || 3 === e.type || 4 === e.type
            ? new Ri(t[16], t)
            : null;
        })(Xt(), Ut(), e);
      }
      let $i = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => Gi()), e;
      })();
      const Gi = Bi,
        qi = new ke("Set Injector scope."),
        Wi = {},
        Zi = {},
        Ui = [];
      let Yi = void 0;
      function Qi() {
        return void 0 === Yi && (Yi = new He()), Yi;
      }
      function Xi(e, t = null, n = null, s) {
        return new Ki(e, n, t || Qi(), s);
      }
      class Ki {
        constructor(e, t, n, s = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const i = [];
          t && $e(t, (n) => this.processProvider(n, e, t)),
            $e([e], (e) => this.processInjectorType(e, [], i)),
            this.records.set(Ie, er(void 0, this));
          const r = this.records.get(qi);
          (this.scope = null != r ? r.value : null),
            (this.source = s || ("object" == typeof e ? null : ue(e)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((e) => e.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(e, t = Me, n = K.Default) {
          this.assertNotDestroyed();
          const s = Ne(this);
          try {
            if (!(n & K.SkipSelf)) {
              let t = this.records.get(e);
              if (void 0 === t) {
                const n =
                  ("function" == typeof (i = e) ||
                    ("object" == typeof i && i instanceof ke)) &&
                  ne(e);
                (t = n && this.injectableDefInScope(n) ? er(Ji(e), Wi) : null),
                  this.records.set(e, t);
              }
              if (null != t) return this.hydrate(e, t);
            }
            return (n & K.Self ? Qi() : this.parent).get(
              e,
              (t = n & K.Optional && t === Me ? null : t)
            );
          } catch (r) {
            if ("NullInjectorError" === r.name) {
              if (
                ((r.ngTempTokenPath = r.ngTempTokenPath || []).unshift(ue(e)),
                s)
              )
                throw r;
              return (function (e, t, n, s) {
                const i = e.ngTempTokenPath;
                throw (
                  (t[Pe] && i.unshift(t[Pe]),
                  (e.message = (function (e, t, n, s = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.substr(2)
                        : e;
                    let i = ue(t);
                    if (Array.isArray(t)) i = t.map(ue).join(" -> ");
                    else if ("object" == typeof t) {
                      let e = [];
                      for (let n in t)
                        if (t.hasOwnProperty(n)) {
                          let s = t[n];
                          e.push(
                            n +
                              ":" +
                              ("string" == typeof s ? JSON.stringify(s) : ue(s))
                          );
                        }
                      i = `{${e.join(", ")}}`;
                    }
                    return `${n}${s ? "(" + s + ")" : ""}[${i}]: ${e.replace(
                      Oe,
                      "\n  "
                    )}`;
                  })("\n" + e.message, i, n, s)),
                  (e.ngTokenPath = i),
                  (e.ngTempTokenPath = null),
                  e)
                );
              })(r, e, "R3InjectorError", this.source);
            }
            throw r;
          } finally {
            Ne(s);
          }
          var i;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((e) => this.get(e));
        }
        toString() {
          const e = [];
          return (
            this.records.forEach((t, n) => e.push(ue(n))),
            `R3Injector[${e.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(e, t, n) {
          if (!(e = fe(e))) return !1;
          let s = ie(e);
          const i = (null == s && e.ngModule) || void 0,
            r = void 0 === i ? e : i,
            o = -1 !== n.indexOf(r);
          if ((void 0 !== i && (s = ie(i)), null == s)) return !1;
          if (null != s.imports && !o) {
            let e;
            n.push(r);
            try {
              $e(s.imports, (s) => {
                this.processInjectorType(s, t, n) &&
                  (void 0 === e && (e = []), e.push(s));
              });
            } finally {
            }
            if (void 0 !== e)
              for (let t = 0; t < e.length; t++) {
                const { ngModule: n, providers: s } = e[t];
                $e(s, (e) => this.processProvider(e, n, s || Ui));
              }
          }
          this.injectorDefTypes.add(r), this.records.set(r, er(s.factory, Wi));
          const a = s.providers;
          if (null != a && !o) {
            const t = e;
            $e(a, (e) => this.processProvider(e, t, a));
          }
          return void 0 !== i && void 0 !== e.providers;
        }
        processProvider(e, t, n) {
          let s = nr((e = fe(e))) ? e : fe(e && e.provide);
          const i = (function (e, t, n) {
            return tr(e)
              ? er(void 0, e.useValue)
              : er(
                  (function (e, t, n) {
                    let s = void 0;
                    if (nr(e)) {
                      const t = fe(e);
                      return ut(t) || Ji(t);
                    }
                    if (tr(e)) s = () => fe(e.useValue);
                    else if ((i = e) && i.useFactory)
                      s = () => e.useFactory(...Fe(e.deps || []));
                    else if (
                      (function (e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      s = () => je(fe(e.useExisting));
                    else {
                      const t = fe(e && (e.useClass || e.provide));
                      if (
                        !(function (e) {
                          return !!e.deps;
                        })(e)
                      )
                        return ut(t) || Ji(t);
                      s = () => new t(...Fe(e.deps));
                    }
                    var i;
                    return s;
                  })(e),
                  Wi
                );
          })(e);
          if (nr(e) || !0 !== e.multi) this.records.get(s);
          else {
            let t = this.records.get(s);
            t ||
              ((t = er(void 0, Wi, !0)),
              (t.factory = () => Fe(t.multi)),
              this.records.set(s, t)),
              (s = e),
              t.multi.push(e);
          }
          this.records.set(s, i);
        }
        hydrate(e, t) {
          var n;
          return (
            t.value === Wi && ((t.value = Zi), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              null !== (n = t.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(t.value),
            t.value
          );
        }
        injectableDefInScope(e) {
          return (
            !!e.providedIn &&
            ("string" == typeof e.providedIn
              ? "any" === e.providedIn || e.providedIn === this.scope
              : this.injectorDefTypes.has(e.providedIn))
          );
        }
      }
      function Ji(e) {
        const t = ne(e),
          n = null !== t ? t.factory : ut(e);
        if (null !== n) return n;
        const s = ie(e);
        if (null !== s) return s.factory;
        if (e instanceof ke)
          throw new Error(`Token ${ue(e)} is missing a \u0275prov definition.`);
        if (e instanceof Function)
          return (function (e) {
            const t = e.length;
            if (t > 0) {
              const n = We(t, "?");
              throw new Error(
                `Can't resolve all parameters for ${ue(e)}: (${n.join(", ")}).`
              );
            }
            const n = (function (e) {
              const t = e && (e[re] || e[le] || (e[ae] && e[ae]()));
              if (t) {
                const n = (function (e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new Error("unreachable");
      }
      function er(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function tr(e) {
        return null !== e && "object" == typeof e && Ae in e;
      }
      function nr(e) {
        return "function" == typeof e;
      }
      const sr = function (e, t, n) {
        return (function (e, t = null, n = null, s) {
          const i = Xi(e, t, n, s);
          return i._resolveInjectorDefTypes(), i;
        })({ name: n }, t, e, n);
      };
      let ir = (() => {
        class e {
          static create(e, t) {
            return Array.isArray(e)
              ? sr(e, t, "")
              : sr(e.providers, e.parent, e.name || "");
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Me),
          (e.NULL = new He()),
          (e.ɵprov = ee({
            token: e,
            providedIn: "any",
            factory: () => je(Ie),
          })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function rr(e, t, n) {
        let s = n ? e.styles : null,
          i = n ? e.classes : null,
          r = 0;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const e = t[o];
            "number" == typeof e
              ? (r = e)
              : 1 == r
              ? (i = de(i, e))
              : 2 == r && (s = de(s, e + ": " + t[++o] + ";"));
          }
        n ? (e.styles = s) : (e.stylesWithoutHost = s),
          n ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      function or(e, t) {
        const n = Ft(e)[1],
          s = n.data.length - 1;
        bn(n, { directiveStart: s, directiveEnd: s + 1 });
      }
      let ar = null;
      function lr() {
        if (!ar) {
          const e = we.Symbol;
          if (e && e.iterator) ar = e.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const n = e[t];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (ar = n);
            }
          }
        }
        return ar;
      }
      class cr {
        constructor(e) {
          this.wrapped = e;
        }
        static wrap(e) {
          return new cr(e);
        }
        static unwrap(e) {
          return cr.isWrapped(e) ? e.wrapped : e;
        }
        static isWrapped(e) {
          return e instanceof cr;
        }
      }
      function ur(e) {
        return (
          !!dr(e) && (Array.isArray(e) || (!(e instanceof Map) && lr() in e))
        );
      }
      function dr(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function hr(e, t, n) {
        return (e[t] = n);
      }
      function pr(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function fr(e, t, n, s) {
        const i = Ut();
        return (
          pr(i, rn(), t) &&
            (Yt(),
            (function (e, t, n, s, i, r) {
              const o = Lt(e, t),
                a = t[11];
              if (null == s)
                Dt(a) ? a.removeAttribute(o, n, r) : o.removeAttribute(n);
              else {
                const t = null == i ? bt(s) : i(s, e.tagName || "", n);
                Dt(a)
                  ? a.setAttribute(o, n, t, r)
                  : r
                  ? o.setAttributeNS(r, n, t)
                  : o.setAttribute(n, t);
              }
            })(_n(), i, e, t, n, s)),
          fr
        );
      }
      function gr(e, t, n, s, i, r, o, a) {
        const l = Ut(),
          c = Yt(),
          u = e + ht,
          d = c.firstCreatePass
            ? (function (e, t, n, s, i, r, o, a, l) {
                const c = t.consts,
                  u = Ns(t, e, 0, o || null, $t(c, a));
                Zs(t, n, u, $t(c, l)), bn(t, u);
                const d = (u.tViews = Gs(
                  2,
                  u,
                  s,
                  i,
                  r,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  c
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, u),
                    (d.queries = t.queries.embeddedTView(u))),
                  u
                );
              })(e, c, l, t, n, s, i, r, o)
            : c.data[u];
        Kt(d, !1);
        const h = l[11].createComment("");
        Ii(c, l, h, d),
          os(h, l),
          li(l, (l[u] = ri(h, l, h, d))),
          yt(d) && Hs(c, l, d),
          null != o && Bs(l, d, a);
      }
      function vr(e) {
        return jt(Wt.lFrame.contextLView, e);
      }
      function mr(e, t = K.Default) {
        const n = Ut();
        return null === n ? je(e, t) : Gn(Xt(), n, fe(e), t);
      }
      function yr(e, t, n) {
        const s = Ut();
        return (
          pr(s, rn(), t) &&
            (function (e, t, n, s, i, r, o, a) {
              const l = Lt(t, n);
              let c,
                u = t.inputs;
              var d;
              null != u && (c = u[s])
                ? (vi(e, n, c, s, i),
                  mt(t) &&
                    (function (e, t) {
                      const n = zt(t, e);
                      16 & n[2] || (n[2] |= 64);
                    })(n, t.index))
                : 2 === t.type &&
                  ((s =
                    "class" === (d = s)
                      ? "className"
                      : "for" === d
                      ? "htmlFor"
                      : "formaction" === d
                      ? "formAction"
                      : "innerHtml" === d
                      ? "innerHTML"
                      : "readonly" === d
                      ? "readOnly"
                      : "tabindex" === d
                      ? "tabIndex"
                      : d),
                  (i = null != o ? o(i, t.tagName || "", s) : i),
                  Dt(r)
                    ? r.setProperty(l, s, i)
                    : On(s) ||
                      (l.setProperty ? l.setProperty(s, i) : (l[s] = i)));
            })(Yt(), _n(), s, e, t, s[11], n),
          yr
        );
      }
      function wr(e, t, n, s, i) {
        const r = i ? "class" : "style";
        vi(e, n, t.inputs[r], r, s);
      }
      function _r(e, t, n, s) {
        const i = Ut(),
          r = Yt(),
          o = ht + e,
          a = i[11],
          l = (i[o] = Ds(t, a, Wt.lFrame.currentNamespace)),
          c = r.firstCreatePass
            ? (function (e, t, n, s, i, r, o) {
                const a = t.consts,
                  l = Ns(t, e, 2, i, $t(a, r));
                return (
                  Zs(t, n, l, $t(a, o)),
                  null !== l.attrs && rr(l, l.attrs, !1),
                  null !== l.mergedAttrs && rr(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(e, r, i, 0, t, n, s)
            : r.data[o];
        Kt(c, !0);
        const u = c.mergedAttrs;
        null !== u && Mn(a, l, u);
        const d = c.classes;
        null !== d && Di(a, l, d);
        const h = c.styles;
        null !== h && Ai(a, l, h),
          Ii(r, i, l, c),
          0 === Wt.lFrame.elementDepthCount && os(l, i),
          Wt.lFrame.elementDepthCount++,
          yt(c) && (Hs(r, i, c), Fs(r, c, i)),
          null !== s && Bs(i, c);
      }
      function br() {
        let e = Xt();
        Jt() ? en() : ((e = e.parent), Kt(e, !1));
        const t = e;
        Wt.lFrame.elementDepthCount--;
        const n = Yt();
        n.firstCreatePass && (bn(n, e), vt(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function (e) {
              return 0 != (16 & e.flags);
            })(t) &&
            wr(n, t, Ut(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function (e) {
              return 0 != (32 & e.flags);
            })(t) &&
            wr(n, t, Ut(), t.stylesWithoutHost, !1);
      }
      function Cr(e, t, n, s) {
        _r(e, t, n, s), br();
      }
      function xr(e, t, n) {
        const s = Ut(),
          i = Yt(),
          r = e + ht,
          o = i.firstCreatePass
            ? (function (e, t, n, s, i) {
                const r = t.consts,
                  o = $t(r, s),
                  a = Ns(t, e, 3, "ng-container", o);
                return (
                  null !== o && rr(a, o, !0),
                  Zs(t, n, a, $t(r, i)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(e, i, s, t, n)
            : i.data[r];
        Kt(o, !0);
        const a = (s[r] = s[11].createComment(""));
        Ii(i, s, a, o),
          os(a, s),
          yt(o) && (Hs(i, s, o), Fs(i, o, s)),
          null != n && Bs(s, o);
      }
      function Sr() {
        let e = Xt();
        const t = Yt();
        Jt() ? en() : ((e = e.parent), Kt(e, !1)),
          t.firstCreatePass && (bn(t, e), vt(e) && t.queries.elementEnd(e));
      }
      function Er(e) {
        return !!e && "function" == typeof e.then;
      }
      function Tr(e, t, n = !1, s) {
        const i = Ut(),
          r = Yt(),
          o = Xt();
        return (
          (function (e, t, n, s, i, r, o = !1, a) {
            const l = yt(s),
              c = e.firstCreatePass && (e.cleanup || (e.cleanup = [])),
              u = fi(t);
            let d = !0;
            if (2 === s.type) {
              const h = Lt(s, t),
                p = a ? a(h) : Ke,
                f = p.target || h,
                g = u.length,
                v = a ? (e) => a(Nt(e[s.index])).target : s.index;
              if (Dt(n)) {
                let o = null;
                if (
                  (!a &&
                    l &&
                    (o = (function (e, t, n, s) {
                      const i = e.cleanup;
                      if (null != i)
                        for (let r = 0; r < i.length - 1; r += 2) {
                          const e = i[r];
                          if (e === n && i[r + 1] === s) {
                            const e = t[7],
                              n = i[r + 2];
                            return e.length > n ? e[n] : null;
                          }
                          "string" == typeof e && (r += 2);
                        }
                      return null;
                    })(e, t, i, s.index)),
                  null !== o)
                )
                  ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = r),
                    (o.__ngLastListenerFn__ = r),
                    (d = !1);
                else {
                  r = Ir(s, t, r, !1);
                  const e = n.listen(p.name || f, i, r);
                  u.push(r, e), c && c.push(i, v, g, g + 1);
                }
              } else
                (r = Ir(s, t, r, !0)),
                  f.addEventListener(i, r, o),
                  u.push(r),
                  c && c.push(i, v, g, o);
            }
            const h = s.outputs;
            let p;
            if (d && null !== h && (p = h[i])) {
              const e = p.length;
              if (e)
                for (let n = 0; n < e; n += 2) {
                  const e = t[p[n]][p[n + 1]].subscribe(r),
                    o = u.length;
                  u.push(r, e), c && c.push(i, s.index, o, -(o + 1));
                }
            }
          })(r, i, i[11], o, e, t, n, s),
          Tr
        );
      }
      function kr(e, t, n) {
        try {
          return !1 !== t(n);
        } catch (s) {
          return gi(e, s), !1;
        }
      }
      function Ir(e, t, n, s) {
        return function i(r) {
          if (r === Function) return n;
          const o = 2 & e.flags ? zt(e.index, t) : t;
          0 == (32 & t[2]) && ci(o);
          let a = kr(t, n, r),
            l = i.__ngNextListenerFn__;
          for (; l; ) (a = kr(t, l, r) && a), (l = l.__ngNextListenerFn__);
          return s && !1 === a && (r.preventDefault(), (r.returnValue = !1)), a;
        };
      }
      function Mr(e = 1) {
        return (function (e) {
          return (Wt.lFrame.contextLView = (function (e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, Wt.lFrame.contextLView))[8];
        })(e);
      }
      function Or(e, t) {
        let n = null;
        const s = (function (e) {
          const t = e.attrs;
          if (null != t) {
            const e = t.indexOf(5);
            if (0 == (1 & e)) return t[e + 1];
          }
          return null;
        })(e);
        for (let i = 0; i < t.length; i++) {
          const r = t[i];
          if ("*" !== r) {
            if (null === s ? gs(e, r, !0) : vs(s, r)) return i;
          } else n = i;
        }
        return n;
      }
      function Pr(e, t = 0, n) {
        const s = Ut(),
          i = Yt(),
          r = Ns(i, e, 1, null, n || null);
        null === r.projection && (r.projection = t),
          en(),
          (function (e, t, n) {
            Pi(t[11], 0, t, n, Ci(e, n, t), ki(n.parent || t[6], t));
          })(i, s, r);
      }
      const Ar = [];
      function Dr(e, t, n, s, i) {
        const r = e[n + 1],
          o = null === t;
        let a = s ? ks(r) : Ms(r),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const n = e[a + 1];
          Rr(e[a], t) && ((l = !0), (e[a + 1] = s ? Ps(n) : Is(n))),
            (a = s ? ks(n) : Ms(n));
        }
        l && (e[n + 1] = s ? Is(r) : Ps(r));
      }
      function Rr(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Ye(e, t) >= 0)
        );
      }
      const Nr = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Lr(e) {
        return e.substring(Nr.key, Nr.keyEnd);
      }
      function Vr(e) {
        return e.substring(Nr.value, Nr.valueEnd);
      }
      function jr(e, t) {
        const n = Nr.textEnd;
        return n === t
          ? -1
          : ((t = Nr.keyEnd = (function (e, t, n) {
              for (; t < n && e.charCodeAt(t) > 32; ) t++;
              return t;
            })(e, (Nr.key = t), n)),
            Hr(e, t, n));
      }
      function zr(e, t) {
        const n = Nr.textEnd;
        let s = (Nr.key = Hr(e, t, n));
        return n === s
          ? -1
          : ((s = Nr.keyEnd = (function (e, t, n) {
              let s;
              for (
                ;
                t < n &&
                (45 === (s = e.charCodeAt(t)) ||
                  95 === s ||
                  ((-33 & s) >= 65 && (-33 & s) <= 90) ||
                  (s >= 48 && s <= 57));

              )
                t++;
              return t;
            })(e, s, n)),
            (s = Br(e, s, n)),
            (s = Nr.value = Hr(e, s, n)),
            (s = Nr.valueEnd = (function (e, t, n) {
              let s = -1,
                i = -1,
                r = -1,
                o = t,
                a = o;
              for (; o < n; ) {
                const l = e.charCodeAt(o++);
                if (59 === l) return a;
                34 === l || 39 === l
                  ? (a = o = $r(e, l, o, n))
                  : t === o - 4 && 85 === r && 82 === i && 76 === s && 40 === l
                  ? (a = o = $r(e, 41, o, n))
                  : l > 32 && (a = o),
                  (r = i),
                  (i = s),
                  (s = -33 & l);
              }
              return a;
            })(e, s, n)),
            Br(e, s, n));
      }
      function Fr(e) {
        (Nr.key = 0),
          (Nr.keyEnd = 0),
          (Nr.value = 0),
          (Nr.valueEnd = 0),
          (Nr.textEnd = e.length);
      }
      function Hr(e, t, n) {
        for (; t < n && e.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function Br(e, t, n, s) {
        return (t = Hr(e, t, n)) < n && t++, t;
      }
      function $r(e, t, n, s) {
        let i = -1,
          r = n;
        for (; r < s; ) {
          const n = e.charCodeAt(r++);
          if (n == t && 92 !== i) return r;
          i = 92 == n && 92 === i ? 0 : n;
        }
        throw new Error();
      }
      function Gr(e, t, n) {
        return (
          (function (e, t, n, s) {
            const i = Ut(),
              r = Yt(),
              o = on(2);
            r.firstUpdatePass && Yr(r, e, o, false),
              t !== ws &&
                pr(i, o, t) &&
                Jr(
                  r,
                  r.data[yn() + ht],
                  i,
                  i[11],
                  e,
                  (i[o + 1] = (function (e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = ue(ns(e)))),
                      e
                    );
                  })(t, n)),
                  false,
                  o
                );
          })(e, t, n),
          Gr
        );
      }
      function qr(e, t) {
        for (
          let n = (function (e) {
            return Fr(e), zr(e, Hr(e, 0, Nr.textEnd));
          })(t);
          n >= 0;
          n = zr(t, n)
        )
          Kr(e, Lr(t), Vr(t));
      }
      function Wr(e, t) {
        for (
          let n = (function (e) {
            return Fr(e), jr(e, Hr(e, 0, Nr.textEnd));
          })(t);
          n >= 0;
          n = jr(t, n)
        )
          Ze(e, Lr(t), !0);
      }
      function Zr(e, t, n, s) {
        const i = Yt(),
          r = on(2);
        i.firstUpdatePass && Yr(i, null, r, s);
        const o = Ut();
        if (n !== ws && pr(o, r, n)) {
          const a = i.data[yn() + ht];
          if (no(a, s) && !Ur(i, r)) {
            let e = s ? a.classesWithoutHost : a.stylesWithoutHost;
            null !== e && (n = de(e, n || "")), wr(i, a, o, n, s);
          } else
            !(function (e, t, n, s, i, r, o, a) {
              i === ws && (i = Ar);
              let l = 0,
                c = 0,
                u = 0 < i.length ? i[0] : null,
                d = 0 < r.length ? r[0] : null;
              for (; null !== u || null !== d; ) {
                const h = l < i.length ? i[l + 1] : void 0,
                  p = c < r.length ? r[c + 1] : void 0;
                let f = null,
                  g = void 0;
                u === d
                  ? ((l += 2), (c += 2), h !== p && ((f = d), (g = p)))
                  : null === d || (null !== u && u < d)
                  ? ((l += 2), (f = u))
                  : ((c += 2), (f = d), (g = p)),
                  null !== f && Jr(e, t, n, s, f, g, o, a),
                  (u = l < i.length ? i[l] : null),
                  (d = c < r.length ? r[c] : null);
              }
            })(
              i,
              a,
              o,
              o[11],
              o[r + 1],
              (o[r + 1] = (function (e, t, n) {
                if (null == n || "" === n) return Ar;
                const s = [],
                  i = ns(n);
                if (Array.isArray(i))
                  for (let r = 0; r < i.length; r++) e(s, i[r], !0);
                else if ("object" == typeof i)
                  for (const r in i) i.hasOwnProperty(r) && e(s, r, i[r]);
                else "string" == typeof i && t(s, i);
                return s;
              })(e, t, n)),
              s,
              r
            );
        }
      }
      function Ur(e, t) {
        return t >= e.expandoStartIndex;
      }
      function Yr(e, t, n, s) {
        const i = e.data;
        if (null === i[n + 1]) {
          const r = i[yn() + ht],
            o = Ur(e, n);
          no(r, s) && null === t && !o && (t = !1),
            (t = (function (e, t, n, s) {
              const i = (function (e) {
                const t = Wt.lFrame.currentDirectiveIndex;
                return -1 === t ? null : e[t];
              })(e);
              let r = s ? t.residualClasses : t.residualStyles;
              if (null === i)
                0 === (s ? t.classBindings : t.styleBindings) &&
                  ((n = Xr((n = Qr(null, e, t, n, s)), t.attrs, s)),
                  (r = null));
              else {
                const o = t.directiveStylingLast;
                if (-1 === o || e[o] !== i)
                  if (((n = Qr(i, e, t, n, s)), null === r)) {
                    let n = (function (e, t, n) {
                      const s = n ? t.classBindings : t.styleBindings;
                      if (0 !== Ms(s)) return e[ks(s)];
                    })(e, t, s);
                    void 0 !== n &&
                      Array.isArray(n) &&
                      ((n = Qr(null, e, t, n[1], s)),
                      (n = Xr(n, t.attrs, s)),
                      (function (e, t, n, s) {
                        e[ks(n ? t.classBindings : t.styleBindings)] = s;
                      })(e, t, s, n));
                  } else
                    r = (function (e, t, n) {
                      let s = void 0;
                      const i = t.directiveEnd;
                      for (let r = 1 + t.directiveStylingLast; r < i; r++)
                        s = Xr(s, e[r].hostAttrs, n);
                      return Xr(s, t.attrs, n);
                    })(e, t, s);
              }
              return (
                void 0 !== r &&
                  (s ? (t.residualClasses = r) : (t.residualStyles = r)),
                n
              );
            })(i, r, t, s)),
            (function (e, t, n, s, i, r) {
              let o = r ? t.classBindings : t.styleBindings,
                a = ks(o),
                l = Ms(o);
              e[s] = n;
              let c,
                u = !1;
              if (Array.isArray(n)) {
                const e = n;
                (c = e[1]), (null === c || Ye(e, c) > 0) && (u = !0);
              } else c = n;
              if (i)
                if (0 !== l) {
                  const t = ks(e[a + 1]);
                  (e[s + 1] = Ts(t, a)),
                    0 !== t && (e[t + 1] = Os(e[t + 1], s)),
                    (e[a + 1] = (131071 & e[a + 1]) | (s << 17));
                } else
                  (e[s + 1] = Ts(a, 0)),
                    0 !== a && (e[a + 1] = Os(e[a + 1], s)),
                    (a = s);
              else
                (e[s + 1] = Ts(l, 0)),
                  0 === a ? (a = s) : (e[l + 1] = Os(e[l + 1], s)),
                  (l = s);
              u && (e[s + 1] = Is(e[s + 1])),
                Dr(e, c, s, !0),
                Dr(e, c, s, !1),
                (function (e, t, n, s, i) {
                  const r = i ? e.residualClasses : e.residualStyles;
                  null != r &&
                    "string" == typeof t &&
                    Ye(r, t) >= 0 &&
                    (n[s + 1] = Ps(n[s + 1]));
                })(t, c, e, s, r),
                (o = Ts(a, l)),
                r ? (t.classBindings = o) : (t.styleBindings = o);
            })(i, r, t, n, o, s);
        }
      }
      function Qr(e, t, n, s, i) {
        let r = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((r = t[a]), (s = Xr(s, r.hostAttrs, i)), r !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), s;
      }
      function Xr(e, t, n) {
        const s = n ? 1 : 2;
        let i = -1;
        if (null !== t)
          for (let r = 0; r < t.length; r++) {
            const o = t[r];
            "number" == typeof o
              ? (i = o)
              : i === s &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                Ze(e, o, !!n || t[++r]));
          }
        return void 0 === e ? null : e;
      }
      function Kr(e, t, n) {
        Ze(e, t, ns(n));
      }
      function Jr(e, t, n, s, i, r, o, a) {
        if (2 !== t.type) return;
        const l = e.data,
          c = l[a + 1];
        to(1 == (1 & c) ? eo(l, t, n, i, Ms(c), o) : void 0) ||
          (to(r) || (2 == (2 & c) && (r = eo(l, null, n, i, a, o))),
          (function (e, t, n, s, i) {
            const r = Dt(e);
            if (t)
              i
                ? r
                  ? e.addClass(n, s)
                  : n.classList.add(s)
                : r
                ? e.removeClass(n, s)
                : n.classList.remove(s);
            else {
              const t = -1 == s.indexOf("-") ? void 0 : 2;
              null == i
                ? r
                  ? e.removeStyle(n, s, t)
                  : n.style.removeProperty(s)
                : r
                ? e.setStyle(n, s, i, t)
                : n.style.setProperty(s, i);
            }
          })(
            s,
            o,
            (function (e, t) {
              return Nt(t[e + ht]);
            })(yn(), n),
            i,
            r
          ));
      }
      function eo(e, t, n, s, i, r) {
        const o = null === t;
        let a = void 0;
        for (; i > 0; ) {
          const t = e[i],
            r = Array.isArray(t),
            l = r ? t[1] : t,
            c = null === l;
          let u = n[i + 1];
          u === ws && (u = c ? Ar : void 0);
          let d = c ? Ue(u, s) : l === s ? u : void 0;
          if ((r && !to(d) && (d = Ue(t, s)), to(d) && ((a = d), o))) return a;
          const h = e[i + 1];
          i = o ? ks(h) : Ms(h);
        }
        if (null !== t) {
          let e = r ? t.residualClasses : t.residualStyles;
          null != e && (a = Ue(e, s));
        }
        return a;
      }
      function to(e) {
        return void 0 !== e;
      }
      function no(e, t) {
        return 0 != (e.flags & (t ? 16 : 32));
      }
      function so(e, t = "") {
        const n = Ut(),
          s = Yt(),
          i = e + ht,
          r = s.firstCreatePass ? Ns(s, e, 2, null, null) : s.data[i],
          o = (n[i] = (function (e, t) {
            return Dt(t) ? t.createText(e) : t.createTextNode(e);
          })(t, n[11]));
        Ii(s, n, o, r), Kt(r, !1);
      }
      const io = void 0;
      var ro = [
        "en",
        [["a", "p"], ["AM", "PM"], io],
        [["AM", "PM"], io, io],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        io,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        io,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", io, "{1} 'at' {0}", io],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (e) {
          let t = Math.floor(Math.abs(e)),
            n = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === n ? 1 : 5;
        },
      ];
      let oo = {};
      function ao(e) {
        return (
          e in oo ||
            (oo[e] =
              we.ng &&
              we.ng.common &&
              we.ng.common.locales &&
              we.ng.common.locales[e]),
          oo[e]
        );
      }
      var lo = (function (e) {
        return (
          (e[(e.LocaleId = 0)] = "LocaleId"),
          (e[(e.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (e[(e.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (e[(e.DaysFormat = 3)] = "DaysFormat"),
          (e[(e.DaysStandalone = 4)] = "DaysStandalone"),
          (e[(e.MonthsFormat = 5)] = "MonthsFormat"),
          (e[(e.MonthsStandalone = 6)] = "MonthsStandalone"),
          (e[(e.Eras = 7)] = "Eras"),
          (e[(e.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (e[(e.WeekendRange = 9)] = "WeekendRange"),
          (e[(e.DateFormat = 10)] = "DateFormat"),
          (e[(e.TimeFormat = 11)] = "TimeFormat"),
          (e[(e.DateTimeFormat = 12)] = "DateTimeFormat"),
          (e[(e.NumberSymbols = 13)] = "NumberSymbols"),
          (e[(e.NumberFormats = 14)] = "NumberFormats"),
          (e[(e.CurrencyCode = 15)] = "CurrencyCode"),
          (e[(e.CurrencySymbol = 16)] = "CurrencySymbol"),
          (e[(e.CurrencyName = 17)] = "CurrencyName"),
          (e[(e.Currencies = 18)] = "Currencies"),
          (e[(e.Directionality = 19)] = "Directionality"),
          (e[(e.PluralCase = 20)] = "PluralCase"),
          (e[(e.ExtraData = 21)] = "ExtraData"),
          e
        );
      })({});
      const co = "en-US";
      let uo = co;
      function ho(e) {
        var t, n;
        (n = "Expected localeId to be defined"),
          null == (t = e) &&
            (function (e, t, n, s) {
              throw new Error(
                "ASSERTION ERROR: " + e + ` [Expected=> null != ${t} <=Actual]`
              );
            })(n, t),
          "string" == typeof e && (uo = e.toLowerCase().replace(/_/g, "-"));
      }
      class po {}
      class fo {
        resolveComponentFactory(e) {
          throw (function (e) {
            const t = Error(
              `No component factory found for ${ue(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(e);
        }
      }
      let go = (() => {
          class e {}
          return (e.NULL = new fo()), e;
        })(),
        vo = (() => {
          class e {
            constructor(e) {
              this.nativeElement = e;
            }
          }
          return (e.__NG_ELEMENT_ID__ = () => mo(e)), e;
        })();
      const mo = function (e) {
        return zi(e, Xt(), Ut());
      };
      class yo {}
      var wo = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })({});
      let _o = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => bo()), e;
      })();
      const bo = function () {
        const e = Ut(),
          t = zt(Xt().index, e);
        return (function (e) {
          const t = e[11];
          if (Dt(t)) return t;
          throw new Error(
            "Cannot inject Renderer2 when the application uses Renderer3!"
          );
        })(ft(t) ? t : e);
      };
      let Co = (() => {
        class e {}
        return (
          (e.ɵprov = ee({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class xo {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const So = new xo("10.2.4");
      class Eo {
        constructor() {}
        supports(e) {
          return ur(e);
        }
        create(e) {
          return new ko(e);
        }
      }
      const To = (e, t) => t;
      class ko {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || To);
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t);
        }
        forEachOperation(e) {
          let t = this._itHead,
            n = this._removalsHead,
            s = 0,
            i = null;
          for (; t || n; ) {
            const r = !n || (t && t.currentIndex < Po(n, s, i)) ? t : n,
              o = Po(r, s, i),
              a = r.currentIndex;
            if (r === n) s--, (n = n._nextRemoved);
            else if (((t = t._next), null == r.previousIndex)) s++;
            else {
              i || (i = []);
              const e = o - s,
                t = a - s;
              if (e != t) {
                for (let n = 0; n < e; n++) {
                  const s = n < i.length ? i[n] : (i[n] = 0),
                    r = s + n;
                  t <= r && r < e && (i[n] = s + 1);
                }
                i[r.previousIndex] = t - e;
              }
            }
            o !== a && e(r, o, a);
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        forEachIdentityChange(e) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t);
        }
        diff(e) {
          if ((null == e && (e = []), !ur(e)))
            throw new Error(
              `Error trying to diff '${ue(
                e
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t,
            n,
            s,
            i = this._itHead,
            r = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let t = 0; t < this.length; t++)
              (n = e[t]),
                (s = this._trackByFn(t, n)),
                null !== i && Object.is(i.trackById, s)
                  ? (r && (i = this._verifyReinsertion(i, n, s, t)),
                    Object.is(i.item, n) || this._addIdentityChange(i, n))
                  : ((i = this._mismatch(i, n, s, t)), (r = !0)),
                (i = i._next);
          } else
            (t = 0),
              (function (e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[lr()]();
                  let s;
                  for (; !(s = n.next()).done; ) t(s.value);
                }
              })(e, (e) => {
                (s = this._trackByFn(t, e)),
                  null !== i && Object.is(i.trackById, s)
                    ? (r && (i = this._verifyReinsertion(i, e, s, t)),
                      Object.is(i.item, e) || this._addIdentityChange(i, e))
                    : ((i = this._mismatch(i, e, s, t)), (r = !0)),
                  (i = i._next),
                  t++;
              }),
              (this.length = t);
          return this._truncate(i), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, t, n, s) {
          let i;
          return (
            null === e ? (i = this._itTail) : ((i = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, s))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, i, s))
              : null !==
                (e =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, i, s))
              : (e = this._addAfter(new Io(t, n), i, s)),
            e
          );
        }
        _verifyReinsertion(e, t, n, s) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== i
              ? (e = this._reinsertAfter(i, e._prev, s))
              : e.currentIndex != s &&
                ((e.currentIndex = s), this._addToMoves(e, s)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), (e = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, t, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const s = e._prevRemoved,
            i = e._nextRemoved;
          return (
            null === s ? (this._removalsHead = i) : (s._nextRemoved = i),
            null === i ? (this._removalsTail = s) : (i._prevRemoved = s),
            this._insertAfter(e, t, n),
            this._addToMoves(e, n),
            e
          );
        }
        _moveAfter(e, t, n) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, n),
            this._addToMoves(e, n),
            e
          );
        }
        _addAfter(e, t, n) {
          return (
            this._insertAfter(e, t, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, t, n) {
          const s = null === t ? this._itHead : t._next;
          return (
            (e._next = s),
            (e._prev = t),
            null === s ? (this._itTail = e) : (s._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new Oo()),
            this._linkedRecords.put(e),
            (e.currentIndex = n),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            n = e._next;
          return (
            null === t ? (this._itHead = n) : (t._next = n),
            null === n ? (this._itTail = t) : (n._prev = t),
            e
          );
        }
        _addToMoves(e, t) {
          return (
            e.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Oo()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class Io {
        constructor(e, t) {
          (this.item = e),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Mo {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, t) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === t || t <= n.currentIndex) &&
              Object.is(n.trackById, e)
            )
              return n;
          return null;
        }
        remove(e) {
          const t = e._prevDup,
            n = e._nextDup;
          return (
            null === t ? (this._head = n) : (t._nextDup = n),
            null === n ? (this._tail = t) : (n._prevDup = t),
            null === this._head
          );
        }
      }
      class Oo {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const t = e.trackById;
          let n = this.map.get(t);
          n || ((n = new Mo()), this.map.set(t, n)), n.add(e);
        }
        get(e, t) {
          const n = this.map.get(e);
          return n ? n.get(e, t) : null;
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Po(e, t, n) {
        const s = e.previousIndex;
        if (null === s) return s;
        let i = 0;
        return n && s < n.length && (i = n[s]), s + t + i;
      }
      class Ao {
        constructor() {}
        supports(e) {
          return e instanceof Map || dr(e);
        }
        create() {
          return new Do();
        }
      }
      class Do {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t);
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || dr(e)))
              throw new Error(
                `Error trying to diff '${ue(
                  e
                )}'. Only maps and objects are allowed`
              );
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (e, n) => {
              if (t && t.key === n)
                this._maybeAddToChanges(t, e),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const s = this._getOrCreateRecordForKey(n, e);
                t = this._insertBeforeOrAppend(t, s);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let e = t; null !== e; e = e._nextRemoved)
              e === this._mapHead && (this._mapHead = null),
                this._records.delete(e.key),
                (e._nextRemoved = e._next),
                (e.previousValue = e.currentValue),
                (e.currentValue = null),
                (e._prev = null),
                (e._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const n = e._prev;
            return (
              (t._next = e),
              (t._prev = n),
              (e._prev = t),
              n && (n._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const n = this._records.get(e);
            this._maybeAddToChanges(n, t);
            const s = n._prev,
              i = n._next;
            return (
              s && (s._next = i),
              i && (i._prev = s),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new Ro(e);
          return (
            this._records.set(e, n),
            (n.currentValue = t),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, t) {
          Object.is(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach((n) => t(e[n], n));
        }
      }
      class Ro {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let No = (() => {
          class e {
            constructor(e) {
              this.factories = e;
            }
            static create(t, n) {
              if (null != n) {
                const e = n.factories.slice();
                t = t.concat(e);
              }
              return new e(t);
            }
            static extend(t) {
              return {
                provide: e,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return e.create(t, n);
                },
                deps: [[e, new X(), new Y()]],
              };
            }
            find(e) {
              const t = this.factories.find((t) => t.supports(e));
              if (null != t) return t;
              throw new Error(
                `Cannot find a differ supporting object '${e}' of type '${
                  ((n = e), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (e.ɵprov = ee({
              token: e,
              providedIn: "root",
              factory: () => new e([new Eo()]),
            })),
            e
          );
        })(),
        Lo = (() => {
          class e {
            constructor(e) {
              this.factories = e;
            }
            static create(t, n) {
              if (n) {
                const e = n.factories.slice();
                t = t.concat(e);
              }
              return new e(t);
            }
            static extend(t) {
              return {
                provide: e,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return e.create(t, n);
                },
                deps: [[e, new X(), new Y()]],
              };
            }
            find(e) {
              const t = this.factories.find((t) => t.supports(e));
              if (t) return t;
              throw new Error(`Cannot find a differ supporting object '${e}'`);
            }
          }
          return (
            (e.ɵprov = ee({
              token: e,
              providedIn: "root",
              factory: () => new e([new Ao()]),
            })),
            e
          );
        })();
      const Vo = [new Ao()],
        jo = new No([new Eo()]),
        zo = new Lo(Vo);
      let Fo = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => Ho(e, vo)), e;
      })();
      const Ho = function (e, t) {
        return Fi(e, t, Xt(), Ut());
      };
      let Bo = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = () => $o(e, vo)), e;
      })();
      const $o = function (e, t) {
          return Hi(e, t, Xt(), Ut());
        },
        Go = {};
      class qo extends go {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const t = ct(e);
          return new Uo(t, this.ngModule);
        }
      }
      function Wo(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      const Zo = new ke("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => xt,
      });
      class Uo extends po {
        constructor(e, t) {
          super(),
            (this.componentDef = e),
            (this.ngModule = t),
            (this.componentType = e.type),
            (this.selector = e.selectors.map(ys).join(",")),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        get inputs() {
          return Wo(this.componentDef.inputs);
        }
        get outputs() {
          return Wo(this.componentDef.outputs);
        }
        create(e, t, n, s) {
          const i = (s = s || this.ngModule)
              ? (function (e, t) {
                  return {
                    get: (n, s, i) => {
                      const r = e.get(n, Go, i);
                      return r !== Go || s === Go ? r : t.get(n, s, i);
                    },
                  };
                })(e, s.injector)
              : e,
            r = i.get(yo, Rt),
            o = i.get(Co, null),
            a = r.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function (e, t, n) {
                  if (Dt(e)) return e.selectRootElement(t, n === Xe.ShadowDom);
                  let s = "string" == typeof t ? e.querySelector(t) : t;
                  return (s.textContent = ""), s;
                })(a, n, this.componentDef.encapsulation)
              : Ds(
                  l,
                  r.createRenderer(null, this.componentDef),
                  (function (e) {
                    const t = e.toLowerCase();
                    return "svg" === t
                      ? "http://www.w3.org/2000/svg"
                      : "math" === t
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            d = {
              components: [],
              scheduler: xt,
              clean: pi,
              playerHandler: null,
              flags: 0,
            },
            h = Gs(0, null, null, 1, 0, null, null, null, null, null),
            p = Rs(null, h, d, u, null, null, r, a, o, i);
          let f, g;
          hn(p);
          try {
            const e = (function (e, t, n, s, i, r) {
              const o = n[1];
              n[20] = e;
              const a = Ns(o, 0, 2, null, null),
                l = (a.mergedAttrs = t.hostAttrs);
              null !== l &&
                (rr(a, l, !0),
                null !== e &&
                  (Mn(i, e, l),
                  null !== a.classes && Di(i, e, a.classes),
                  null !== a.styles && Ai(i, e, a.styles)));
              const c = s.createRenderer(e, t),
                u = Rs(
                  n,
                  $s(t),
                  null,
                  t.onPush ? 64 : 16,
                  n[20],
                  a,
                  s,
                  c,
                  null,
                  null
                );
              return (
                o.firstCreatePass &&
                  ($n(zn(a, n), o, t.type), Ks(o, a), ei(a, n.length, 1)),
                li(n, u),
                (n[20] = u)
              );
            })(c, this.componentDef, p, r, a);
            if (c)
              if (n) Mn(a, c, ["ng-version", So.full]);
              else {
                const { attrs: e, classes: t } = (function (e) {
                  const t = [],
                    n = [];
                  let s = 1,
                    i = 2;
                  for (; s < e.length; ) {
                    let r = e[s];
                    if ("string" == typeof r)
                      2 === i
                        ? "" !== r && t.push(r, e[++s])
                        : 8 === i && n.push(r);
                    else {
                      if (!ps(i)) break;
                      i = r;
                    }
                    s++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                e && Mn(a, c, e), t && t.length > 0 && Di(a, c, t.join(" "));
              }
            if (((g = Vt(h, 0)), void 0 !== t)) {
              const e = (g.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const s = t[n];
                e.push(null != s ? Array.from(s) : null);
              }
            }
            (f = (function (e, t, n, s, i) {
              const r = n[1],
                o = (function (e, t, n) {
                  const s = Xt();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Xs(e, s, 1),
                    ti(e, t, n));
                  const i = Un(t, e, t.length - 1, s);
                  os(i, t);
                  const r = Lt(s, t);
                  return r && os(r, t), i;
                })(r, n, t);
              s.components.push(o),
                (e[8] = o),
                i && i.forEach((e) => e(o, t)),
                t.contentQueries && t.contentQueries(1, o, n.length - 1);
              const a = Xt();
              if (
                r.firstCreatePass &&
                (null !== t.hostBindings || null !== t.hostAttrs)
              ) {
                wn(a.index - ht);
                const e = n[1];
                Us(e, t), Ys(e, n, t.hostVars), Qs(t, o);
              }
              return o;
            })(e, this.componentDef, p, d, [or])),
              Ls(h, p, null);
          } finally {
            mn();
          }
          return new Yo(this.componentType, f, zi(vo, g, p), p, g);
        }
      }
      class Yo extends class {} {
        constructor(e, t, n, s, i) {
          super(),
            (this.location = n),
            (this._rootLView = s),
            (this._tNode = i),
            (this.destroyCbs = []),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new Ni(s)),
            (this.componentType = e);
        }
        get injector() {
          return new Xn(this._tNode, this._rootLView);
        }
        destroy() {
          this.destroyCbs &&
            (this.destroyCbs.forEach((e) => e()),
            (this.destroyCbs = null),
            !this.hostView.destroyed && this.hostView.destroy());
        }
        onDestroy(e) {
          this.destroyCbs && this.destroyCbs.push(e);
        }
      }
      const Qo = new Map();
      class Xo extends Be {
        constructor(e, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new qo(this));
          const n = dt(e),
            s = e[Se] || null;
          s && ho(s),
            (this._bootstrapComponents = St(n.bootstrap)),
            (this._r3Injector = Xi(
              e,
              t,
              [
                { provide: Be, useValue: this },
                { provide: go, useValue: this.componentFactoryResolver },
              ],
              ue(e)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(e));
        }
        get(e, t = ir.THROW_IF_NOT_FOUND, n = K.Default) {
          return e === ir || e === Be || e === Ie
            ? this
            : this._r3Injector.get(e, t, n);
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((e) => e()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class Ko extends class {} {
        constructor(e) {
          super(),
            (this.moduleType = e),
            null !== dt(e) &&
              (function (e) {
                const t = new Set();
                !(function e(n) {
                  const s = dt(n, !0),
                    i = s.id;
                  null !== i &&
                    ((function (e, t, n) {
                      if (t && t !== n)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${ue(
                            t
                          )} vs ${ue(t.name)}`
                        );
                    })(i, Qo.get(i), n),
                    Qo.set(i, n));
                  const r = St(s.imports);
                  for (const o of r) t.has(o) || (t.add(o), e(o));
                })(e);
              })(e);
        }
        create(e) {
          return new Xo(this.moduleType, e);
        }
      }
      function Jo(e, t, n, s) {
        return ea(Ut(), sn(), e, t, n, s);
      }
      function ea(e, t, n, s, i, r) {
        const o = t + n;
        return pr(e, o, i)
          ? hr(e, o + 1, r ? s.call(r, i) : s(i))
          : (function (e, t) {
              const n = e[t];
              return n === ws ? void 0 : n;
            })(e, o + 1);
      }
      const ta = class extends x {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, t, n) {
          let s,
            i = (e) => null,
            r = () => null;
          e && "object" == typeof e
            ? ((s = this.__isAsync
                ? (t) => {
                    setTimeout(() => e.next(t));
                  }
                : (t) => {
                    e.next(t);
                  }),
              e.error &&
                (i = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e.error(t));
                    }
                  : (t) => {
                      e.error(t);
                    }),
              e.complete &&
                (r = this.__isAsync
                  ? () => {
                      setTimeout(() => e.complete());
                    }
                  : () => {
                      e.complete();
                    }))
            : ((s = this.__isAsync
                ? (t) => {
                    setTimeout(() => e(t));
                  }
                : (t) => {
                    e(t);
                  }),
              t &&
                (i = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t(e));
                    }
                  : (e) => {
                      t(e);
                    }),
              n &&
                (r = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(s, i, r);
          return e instanceof d && e.add(o), o;
        }
      };
      function na() {
        return this._results[lr()]();
      }
      class sa {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new ta()),
            (this.length = 0);
          const e = lr(),
            t = sa.prototype;
          t[e] || (t[e] = na);
        }
        map(e) {
          return this._results.map(e);
        }
        filter(e) {
          return this._results.filter(e);
        }
        find(e) {
          return this._results.find(e);
        }
        reduce(e, t) {
          return this._results.reduce(e, t);
        }
        forEach(e) {
          this._results.forEach(e);
        }
        some(e) {
          return this._results.some(e);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(e) {
          (this._results = (function e(t, n) {
            void 0 === n && (n = t);
            for (let s = 0; s < t.length; s++) {
              let i = t[s];
              Array.isArray(i)
                ? (n === t && (n = t.slice(0, s)), e(i, n))
                : n !== t && n.push(i);
            }
            return n;
          })(e)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class ia {
        constructor(e) {
          (this.queryList = e), (this.matches = null);
        }
        clone() {
          return new ia(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class ra {
        constructor(e = []) {
          this.queries = e;
        }
        createEmbeddedView(e) {
          const t = e.queries;
          if (null !== t) {
            const n =
                null !== e.contentQueries ? e.contentQueries[0] : t.length,
              s = [];
            for (let e = 0; e < n; e++) {
              const n = t.getByIndex(e);
              s.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new ra(s);
          }
          return null;
        }
        insertView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        detachView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        dirtyQueriesWithMatches(e) {
          for (let t = 0; t < this.queries.length; t++)
            null !== ma(e, t).matches && this.queries[t].setDirty();
        }
      }
      class oa {
        constructor(e, t, n, s = null) {
          (this.predicate = e),
            (this.descendants = t),
            (this.isStatic = n),
            (this.read = s);
        }
      }
      class aa {
        constructor(e = []) {
          this.queries = e;
        }
        elementStart(e, t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(e, t);
        }
        elementEnd(e) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(e);
        }
        embeddedTView(e) {
          let t = null;
          for (let n = 0; n < this.length; n++) {
            const s = null !== t ? t.length : 0,
              i = this.getByIndex(n).embeddedTView(e, s);
            i &&
              ((i.indexInDeclarationView = n),
              null !== t ? t.push(i) : (t = [i]));
          }
          return null !== t ? new aa(t) : null;
        }
        template(e, t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(e, t);
        }
        getByIndex(e) {
          return this.queries[e];
        }
        get length() {
          return this.queries.length;
        }
        track(e) {
          this.queries.push(e);
        }
      }
      class la {
        constructor(e, t = -1) {
          (this.metadata = e),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(e, t) {
          this.isApplyingToNode(t) && this.matchTNode(e, t);
        }
        elementEnd(e) {
          this._declarationNodeIndex === e.index &&
            (this._appliesToNextNode = !1);
        }
        template(e, t) {
          this.elementStart(e, t);
        }
        embeddedTView(e, t) {
          return this.isApplyingToNode(e)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-e.index, t),
              new la(this.metadata))
            : null;
        }
        isApplyingToNode(e) {
          if (this._appliesToNextNode && !1 === this.metadata.descendants) {
            const t = this._declarationNodeIndex;
            let n = e.parent;
            for (; null !== n && 3 === n.type && n.index !== t; ) n = n.parent;
            return t === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(e, t) {
          const n = this.metadata.predicate;
          if (Array.isArray(n))
            for (let s = 0; s < n.length; s++) {
              const i = n[s];
              this.matchTNodeWithReadOption(e, t, ca(t, i)),
                this.matchTNodeWithReadOption(e, t, Zn(t, e, i, !1, !1));
            }
          else
            n === Fo
              ? 0 === t.type && this.matchTNodeWithReadOption(e, t, -1)
              : this.matchTNodeWithReadOption(e, t, Zn(t, e, n, !1, !1));
        }
        matchTNodeWithReadOption(e, t, n) {
          if (null !== n) {
            const s = this.metadata.read;
            if (null !== s)
              if (s === vo || s === Bo || (s === Fo && 0 === t.type))
                this.addMatch(t.index, -2);
              else {
                const n = Zn(t, e, s, !1, !1);
                null !== n && this.addMatch(t.index, n);
              }
            else this.addMatch(t.index, n);
          }
        }
        addMatch(e, t) {
          null === this.matches
            ? (this.matches = [e, t])
            : this.matches.push(e, t);
        }
      }
      function ca(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let s = 0; s < n.length; s += 2) if (n[s] === t) return n[s + 1];
        return null;
      }
      function ua(e, t, n, s) {
        return -1 === n
          ? (function (e, t) {
              return 2 === e.type || 3 === e.type
                ? zi(vo, e, t)
                : 0 === e.type
                ? Fi(Fo, vo, e, t)
                : null;
            })(t, e)
          : -2 === n
          ? (function (e, t, n) {
              return n === vo
                ? zi(vo, t, e)
                : n === Fo
                ? Fi(Fo, vo, t, e)
                : n === Bo
                ? Hi(Bo, vo, t, e)
                : void 0;
            })(e, t, s)
          : Un(e, e[1], n, t);
      }
      function da(e, t, n, s) {
        const i = t[19].queries[s];
        if (null === i.matches) {
          const s = e.data,
            r = n.matches,
            o = [];
          for (let e = 0; e < r.length; e += 2) {
            const i = r[e];
            o.push(i < 0 ? null : ua(t, s[i], r[e + 1], n.metadata.read));
          }
          i.matches = o;
        }
        return i.matches;
      }
      function ha(e) {
        const t = Ut(),
          n = Yt(),
          s = cn();
        un(s + 1);
        const i = ma(n, s);
        if (e.dirty && Ht(t) === i.metadata.isStatic) {
          if (null === i.matches) e.reset([]);
          else {
            const r = i.crossesNgTemplate
              ? (function e(t, n, s, i) {
                  const r = t.queries.getByIndex(s),
                    o = r.matches;
                  if (null !== o) {
                    const a = da(t, n, r, s);
                    for (let t = 0; t < o.length; t += 2) {
                      const s = o[t];
                      if (s > 0) i.push(a[t / 2]);
                      else {
                        const r = o[t + 1],
                          a = n[-s];
                        for (let t = pt; t < a.length; t++) {
                          const n = a[t];
                          n[17] === n[3] && e(n[1], n, r, i);
                        }
                        if (null !== a[9]) {
                          const t = a[9];
                          for (let n = 0; n < t.length; n++) {
                            const s = t[n];
                            e(s[1], s, r, i);
                          }
                        }
                      }
                    }
                  }
                  return i;
                })(n, t, s, [])
              : da(n, t, i, s);
            e.reset(r), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function pa(e, t, n) {
        !(function (e, t, n, s, i, r) {
          e.firstCreatePass && va(e, new oa(n, s, false, i), -1), ga(e, t);
        })(Yt(), Ut(), e, t, n);
      }
      function fa() {
        return (e = Ut()), (t = cn()), e[19].queries[t].queryList;
        var e, t;
      }
      function ga(e, t) {
        const n = new sa();
        qs(e, t, n, n.destroy),
          null === t[19] && (t[19] = new ra()),
          t[19].queries.push(new ia(n));
      }
      function va(e, t, n) {
        null === e.queries && (e.queries = new aa()),
          e.queries.track(new la(t, n));
      }
      function ma(e, t) {
        return e.queries.getByIndex(t);
      }
      function ya(e, t) {
        return Fi(Fo, vo, e, t);
      }
      const wa = new ke("Application Initializer");
      let _a = (() => {
        class e {
          constructor(e) {
            (this.appInits = e),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((e, t) => {
                (this.resolve = e), (this.reject = t);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const e = [],
              t = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const t = this.appInits[n]();
                Er(t) && e.push(t);
              }
            Promise.all(e)
              .then(() => {
                t();
              })
              .catch((e) => {
                this.reject(e);
              }),
              0 === e.length && t(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(je(wa, 8));
          }),
          (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ba = new ke("AppId"),
        Ca = {
          provide: ba,
          useFactory: function () {
            return `${xa()}${xa()}${xa()}`;
          },
          deps: [],
        };
      function xa() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Sa = new ke("Platform Initializer"),
        Ea = new ke("Platform ID"),
        Ta = new ke("appBootstrapListener");
      let ka = (() => {
        class e {
          log(e) {
            console.log(e);
          }
          warn(e) {
            console.warn(e);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ia = new ke("LocaleId"),
        Ma = new ke("DefaultCurrencyCode");
      class Oa {
        constructor(e, t) {
          (this.ngModuleFactory = e), (this.componentFactories = t);
        }
      }
      const Pa = function (e) {
          return new Ko(e);
        },
        Aa = Pa,
        Da = function (e) {
          return Promise.resolve(Pa(e));
        },
        Ra = function (e) {
          const t = Pa(e),
            n = St(dt(e).declarations).reduce((e, t) => {
              const n = ct(t);
              return n && e.push(new Uo(n)), e;
            }, []);
          return new Oa(t, n);
        },
        Na = Ra,
        La = function (e) {
          return Promise.resolve(Ra(e));
        };
      let Va = (() => {
        class e {
          constructor() {
            (this.compileModuleSync = Aa),
              (this.compileModuleAsync = Da),
              (this.compileModuleAndAllComponentsSync = Na),
              (this.compileModuleAndAllComponentsAsync = La);
          }
          clearCache() {}
          clearCacheFor(e) {}
          getModuleId(e) {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ja = (() => Promise.resolve(0))();
      function za(e) {
        "undefined" == typeof Zone
          ? ja.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Fa {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: t = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ta(!1)),
            (this.onMicrotaskEmpty = new ta(!1)),
            (this.onStable = new ta(!1)),
            (this.onError = new ta(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const n = this;
          (n._nesting = 0),
            (n._outer = n._inner = Zone.current),
            Zone.wtfZoneSpec && (n._inner = n._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (n._inner = n._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (n._inner = n._inner.fork(Zone.longStackTraceZoneSpec)),
            (n.shouldCoalesceEventChangeDetection = t),
            (n.lastRequestAnimationFrameId = -1),
            (n.nativeRequestAnimationFrame = (function () {
              let e = we.requestAnimationFrame,
                t = we.cancelAnimationFrame;
              if ("undefined" != typeof Zone && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const s = t[Zone.__symbol__("OriginalDelegate")];
                s && (t = s);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function (e) {
              const t =
                !!e.shouldCoalesceEventChangeDetection &&
                e.nativeRequestAnimationFrame &&
                (() => {
                  !(function (e) {
                    -1 === e.lastRequestAnimationFrameId &&
                      ((e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(
                        we,
                        () => {
                          e.fakeTopEventTask ||
                            (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                              "fakeTopEventTask",
                              () => {
                                (e.lastRequestAnimationFrameId = -1),
                                  Ga(e),
                                  $a(e);
                              },
                              void 0,
                              () => {},
                              () => {}
                            )),
                            e.fakeTopEventTask.invoke();
                        }
                      )),
                      Ga(e));
                  })(e);
                });
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: t },
                onInvokeTask: (n, s, i, r, o, a) => {
                  try {
                    return qa(e), n.invokeTask(i, r, o, a);
                  } finally {
                    t && "eventTask" === r.type && t(), Wa(e);
                  }
                },
                onInvoke: (t, n, s, i, r, o, a) => {
                  try {
                    return qa(e), t.invoke(s, i, r, o, a);
                  } finally {
                    Wa(e);
                  }
                },
                onHasTask: (t, n, s, i) => {
                  t.hasTask(s, i),
                    n === s &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Ga(e),
                          $a(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (t, n, s, i) => (
                  t.handleError(s, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(n);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Fa.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Fa.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, t, n) {
          return this._inner.run(e, t, n);
        }
        runTask(e, t, n, s) {
          const i = this._inner,
            r = i.scheduleEventTask("NgZoneEvent: " + s, e, Ba, Ha, Ha);
          try {
            return i.runTask(r, t, n);
          } finally {
            i.cancelTask(r);
          }
        }
        runGuarded(e, t, n) {
          return this._inner.runGuarded(e, t, n);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      function Ha() {}
      const Ba = {};
      function $a(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ga(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          (e.shouldCoalesceEventChangeDetection &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function qa(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Wa(e) {
        e._nesting--, $a(e);
      }
      class Za {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ta()),
            (this.onMicrotaskEmpty = new ta()),
            (this.onStable = new ta()),
            (this.onError = new ta());
        }
        run(e, t, n) {
          return e.apply(t, n);
        }
        runGuarded(e, t, n) {
          return e.apply(t, n);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, t, n, s) {
          return e.apply(t, n);
        }
      }
      let Ua = (() => {
          class e {
            constructor(e) {
              (this._ngZone = e),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                e.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Fa.assertNotInAngularZone(),
                        za(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                za(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let e = this._callbacks.pop();
                    clearTimeout(e.timeoutId), e.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let e = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (t) =>
                    !t.updateCb ||
                    !t.updateCb(e) ||
                    (clearTimeout(t.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((e) => ({
                    source: e.source,
                    creationLocation: e.creationLocation,
                    data: e.data,
                  }))
                : [];
            }
            addCallback(e, t, n) {
              let s = -1;
              t &&
                t > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (e) => e.timeoutId !== s
                  )),
                    e(this._didWork, this.getPendingTasks());
                }, t)),
                this._callbacks.push({ doneCb: e, timeoutId: s, updateCb: n });
            }
            whenStable(e, t, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(e, t, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(e, t, n) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(je(Fa));
            }),
            (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ya = (() => {
          class e {
            constructor() {
              (this._applications = new Map()), Ka.addToWindow(this);
            }
            registerApplication(e, t) {
              this._applications.set(e, t);
            }
            unregisterApplication(e) {
              this._applications.delete(e);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(e) {
              return this._applications.get(e) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(e, t = !0) {
              return Ka.findTestabilityInTree(this, e, t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      class Qa {
        addToWindow(e) {}
        findTestabilityInTree(e, t, n) {
          return null;
        }
      }
      let Xa,
        Ka = new Qa();
      const Ja = new ke("AllowMultipleToken");
      function el(e, t, n = []) {
        const s = "Platform: " + t,
          i = new ke(s);
        return (t = []) => {
          let r = tl();
          if (!r || r.injector.get(Ja, !1))
            if (e) e(n.concat(t).concat({ provide: i, useValue: !0 }));
            else {
              const e = n
                .concat(t)
                .concat(
                  { provide: i, useValue: !0 },
                  { provide: qi, useValue: "platform" }
                );
              !(function (e) {
                if (Xa && !Xa.destroyed && !Xa.injector.get(Ja, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Xa = e.get(nl);
                const t = e.get(Sa, null);
                t && t.forEach((e) => e());
              })(ir.create({ providers: e, name: s }));
            }
          return (function (e) {
            const t = tl();
            if (!t) throw new Error("No platform exists!");
            if (!t.injector.get(e, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return t;
          })(i);
        };
      }
      function tl() {
        return Xa && !Xa.destroyed ? Xa : null;
      }
      let nl = (() => {
        class e {
          constructor(e) {
            (this._injector = e),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(e, t) {
            const n = (function (e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new Za()
                      : ("zone.js" === e ? void 0 : e) ||
                        new Fa({
                          enableLongStackTrace: rs(),
                          shouldCoalesceEventChangeDetection: t,
                        })),
                  n
                );
              })(t ? t.ngZone : void 0, (t && t.ngZoneEventCoalescing) || !1),
              s = [{ provide: Fa, useValue: n }];
            return n.run(() => {
              const t = ir.create({
                  providers: s,
                  parent: this.injector,
                  name: e.moduleType.name,
                }),
                i = e.create(t),
                r = i.injector.get(ts, null);
              if (!r)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                i.onDestroy(() => rl(this._modules, i)),
                n.runOutsideAngular(() =>
                  n.onError.subscribe({
                    next: (e) => {
                      r.handleError(e);
                    },
                  })
                ),
                (function (e, t, n) {
                  try {
                    const s = n();
                    return Er(s)
                      ? s.catch((n) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(n)), n)
                          );
                        })
                      : s;
                  } catch (s) {
                    throw (t.runOutsideAngular(() => e.handleError(s)), s);
                  }
                })(r, n, () => {
                  const e = i.injector.get(_a);
                  return (
                    e.runInitializers(),
                    e.donePromise.then(
                      () => (
                        ho(i.injector.get(Ia, co) || co),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(e, t = []) {
            const n = sl({}, t);
            return (function (e, t, n) {
              const s = new Ko(n);
              return Promise.resolve(s);
            })(0, 0, e).then((e) => this.bootstrapModuleFactory(e, n));
          }
          _moduleDoBootstrap(e) {
            const t = e.injector.get(il);
            if (e._bootstrapComponents.length > 0)
              e._bootstrapComponents.forEach((e) => t.bootstrap(e));
            else {
              if (!e.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${ue(
                    e.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              e.instance.ngDoBootstrap(t);
            }
            this._modules.push(e);
          }
          onDestroy(e) {
            this._destroyListeners.push(e);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((e) => e.destroy()),
              this._destroyListeners.forEach((e) => e()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(je(ir));
          }),
          (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function sl(e, t) {
        return Array.isArray(t)
          ? t.reduce(sl, e)
          : Object.assign(Object.assign({}, e), t);
      }
      let il = (() => {
        class e {
          constructor(e, t, n, s, i, r) {
            (this._zone = e),
              (this._console = t),
              (this._injector = n),
              (this._exceptionHandler = s),
              (this._componentFactoryResolver = i),
              (this._initStatus = r),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = rs()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const o = new y((e) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    e.next(this._stable), e.complete();
                  });
              }),
              a = new y((e) => {
                let t;
                this._zone.runOutsideAngular(() => {
                  t = this._zone.onStable.subscribe(() => {
                    Fa.assertNotInAngularZone(),
                      za(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), e.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Fa.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        e.next(!1);
                      }));
                });
                return () => {
                  t.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...e) {
              let t = Number.POSITIVE_INFINITY,
                n = null,
                s = e[e.length - 1];
              return (
                E(s)
                  ? ((n = e.pop()),
                    e.length > 1 &&
                      "number" == typeof e[e.length - 1] &&
                      (t = e.pop()))
                  : "number" == typeof s && (t = e.pop()),
                null === n && 1 === e.length && e[0] instanceof y
                  ? e[0]
                  : (function (e = Number.POSITIVE_INFINITY) {
                      return (function e(t, n, s = Number.POSITIVE_INFINITY) {
                        return "function" == typeof n
                          ? (i) =>
                              i.pipe(
                                e((e, s) => {
                                  return ((i = t(e, s)),
                                  i instanceof y ? i : new y(P(i))).pipe(
                                    (function (e, t) {
                                      return function (t) {
                                        return t.lift(new T(e, void 0));
                                      };
                                    })((t, i) => n(e, t, s, i))
                                  );
                                  var i;
                                }, s)
                              )
                          : ("number" == typeof n && (s = n),
                            (e) => e.lift(new N(t, s)));
                      })(m, e);
                    })(t)(V(e, n))
              );
            })(
              o,
              a.pipe((e) => {
                return j()(
                  ((t = G),
                  function (e) {
                    let n;
                    n =
                      "function" == typeof t
                        ? t
                        : function () {
                            return t;
                          };
                    const s = Object.create(e, B);
                    return (s.source = e), (s.subjectFactory = n), s;
                  })(e)
                );
                var t;
              })
            );
          }
          bootstrap(e, t) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              e instanceof po
                ? e
                : this._componentFactoryResolver.resolveComponentFactory(e)),
              this.componentTypes.push(n.componentType);
            const s = n.isBoundToModule ? void 0 : this._injector.get(Be),
              i = n.create(ir.NULL, [], t || n.selector, s);
            i.onDestroy(() => {
              this._unloadComponent(i);
            });
            const r = i.injector.get(Ua, null);
            return (
              r &&
                i.injector
                  .get(Ya)
                  .registerApplication(i.location.nativeElement, r),
              this._loadComponent(i),
              rs() &&
                this._console.log(
                  "Angular is running in development mode. Call enableProdMode() to enable production mode."
                ),
              i
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let e of this._views) e.detectChanges();
              if (this._enforceNoNewChanges)
                for (let e of this._views) e.checkNoChanges();
            } catch (e) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(e)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(e) {
            const t = e;
            this._views.push(t), t.attachToAppRef(this);
          }
          detachView(e) {
            const t = e;
            rl(this._views, t), t.detachFromAppRef();
          }
          _loadComponent(e) {
            this.attachView(e.hostView),
              this.tick(),
              this.components.push(e),
              this._injector
                .get(Ta, [])
                .concat(this._bootstrapListeners)
                .forEach((t) => t(e));
          }
          _unloadComponent(e) {
            this.detachView(e.hostView), rl(this.components, e);
          }
          ngOnDestroy() {
            this._views.slice().forEach((e) => e.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(je(Fa), je(ka), je(ir), je(ts), je(go), je(_a));
          }),
          (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function rl(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const ol = el(null, "core", [
          { provide: Ea, useValue: "unknown" },
          { provide: nl, deps: [ir] },
          { provide: Ya, deps: [] },
          { provide: ka, deps: [] },
        ]),
        al = [
          { provide: il, useClass: il, deps: [Fa, ka, ir, ts, go, _a] },
          {
            provide: Zo,
            deps: [Fa],
            useFactory: function (e) {
              let t = [];
              return (
                e.onStable.subscribe(() => {
                  for (; t.length; ) t.pop()();
                }),
                function (e) {
                  t.push(e);
                }
              );
            },
          },
          { provide: _a, useClass: _a, deps: [[new Y(), wa]] },
          { provide: Va, useClass: Va, deps: [] },
          Ca,
          {
            provide: No,
            useFactory: function () {
              return jo;
            },
            deps: [],
          },
          {
            provide: Lo,
            useFactory: function () {
              return zo;
            },
            deps: [],
          },
          {
            provide: Ia,
            useFactory: function (e) {
              return (
                ho(
                  (e =
                    e ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    co)
                ),
                e
              );
            },
            deps: [[new U(Ia), new Y(), new X()]],
          },
          { provide: Ma, useValue: "USD" },
        ];
      let ll = (() => {
          class e {
            constructor(e) {}
          }
          return (
            (e.ɵmod = rt({ type: e })),
            (e.ɵinj = te({
              factory: function (t) {
                return new (t || e)(je(il));
              },
              providers: al,
            })),
            e
          );
        })(),
        cl = null;
      function ul() {
        return cl;
      }
      const dl = new ke("DocumentToken");
      var hl = (function (e) {
        return (
          (e[(e.Zero = 0)] = "Zero"),
          (e[(e.One = 1)] = "One"),
          (e[(e.Two = 2)] = "Two"),
          (e[(e.Few = 3)] = "Few"),
          (e[(e.Many = 4)] = "Many"),
          (e[(e.Other = 5)] = "Other"),
          e
        );
      })({});
      class pl {}
      let fl = (() => {
          class e extends pl {
            constructor(e) {
              super(), (this.locale = e);
            }
            getPluralCategory(e, t) {
              switch (
                (function (e) {
                  return (function (e) {
                    const t = (function (e) {
                      return e.toLowerCase().replace(/_/g, "-");
                    })(e);
                    let n = ao(t);
                    if (n) return n;
                    const s = t.split("-")[0];
                    if (((n = ao(s)), n)) return n;
                    if ("en" === s) return ro;
                    throw new Error(
                      `Missing locale data for the locale "${e}".`
                    );
                  })(e)[lo.PluralCase];
                })(t || this.locale)(e)
              ) {
                case hl.Zero:
                  return "zero";
                case hl.One:
                  return "one";
                case hl.Two:
                  return "two";
                case hl.Few:
                  return "few";
                case hl.Many:
                  return "many";
                default:
                  return "other";
              }
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(je(Ia));
            }),
            (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        gl = (() => {
          class e {
            constructor(e, t, n, s) {
              (this._iterableDiffers = e),
                (this._keyValueDiffers = t),
                (this._ngEl = n),
                (this._renderer = s),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._initialClasses = []),
                (this._rawClass = null);
            }
            set klass(e) {
              this._removeClasses(this._initialClasses),
                (this._initialClasses =
                  "string" == typeof e ? e.split(/\s+/) : []),
                this._applyClasses(this._initialClasses),
                this._applyClasses(this._rawClass);
            }
            set ngClass(e) {
              this._removeClasses(this._rawClass),
                this._applyClasses(this._initialClasses),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._rawClass = "string" == typeof e ? e.split(/\s+/) : e),
                this._rawClass &&
                  (ur(this._rawClass)
                    ? (this._iterableDiffer = this._iterableDiffers
                        .find(this._rawClass)
                        .create())
                    : (this._keyValueDiffer = this._keyValueDiffers
                        .find(this._rawClass)
                        .create()));
            }
            ngDoCheck() {
              if (this._iterableDiffer) {
                const e = this._iterableDiffer.diff(this._rawClass);
                e && this._applyIterableChanges(e);
              } else if (this._keyValueDiffer) {
                const e = this._keyValueDiffer.diff(this._rawClass);
                e && this._applyKeyValueChanges(e);
              }
            }
            _applyKeyValueChanges(e) {
              e.forEachAddedItem((e) =>
                this._toggleClass(e.key, e.currentValue)
              ),
                e.forEachChangedItem((e) =>
                  this._toggleClass(e.key, e.currentValue)
                ),
                e.forEachRemovedItem((e) => {
                  e.previousValue && this._toggleClass(e.key, !1);
                });
            }
            _applyIterableChanges(e) {
              e.forEachAddedItem((e) => {
                if ("string" != typeof e.item)
                  throw new Error(
                    "NgClass can only toggle CSS classes expressed as strings, got " +
                      ue(e.item)
                  );
                this._toggleClass(e.item, !0);
              }),
                e.forEachRemovedItem((e) => this._toggleClass(e.item, !1));
            }
            _applyClasses(e) {
              e &&
                (Array.isArray(e) || e instanceof Set
                  ? e.forEach((e) => this._toggleClass(e, !0))
                  : Object.keys(e).forEach((t) =>
                      this._toggleClass(t, !!e[t])
                    ));
            }
            _removeClasses(e) {
              e &&
                (Array.isArray(e) || e instanceof Set
                  ? e.forEach((e) => this._toggleClass(e, !1))
                  : Object.keys(e).forEach((e) => this._toggleClass(e, !1)));
            }
            _toggleClass(e, t) {
              (e = e.trim()) &&
                e.split(/\s+/g).forEach((e) => {
                  t
                    ? this._renderer.addClass(this._ngEl.nativeElement, e)
                    : this._renderer.removeClass(this._ngEl.nativeElement, e);
                });
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(mr(No), mr(Lo), mr(vo), mr(_o));
            }),
            (e.ɵdir = at({
              type: e,
              selectors: [["", "ngClass", ""]],
              inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            })),
            e
          );
        })();
      class vl {
        constructor(e, t, n, s) {
          (this.$implicit = e),
            (this.ngForOf = t),
            (this.index = n),
            (this.count = s);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let ml = (() => {
        class e {
          constructor(e, t, n) {
            (this._viewContainer = e),
              (this._template = t),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(e) {
            (this._ngForOf = e), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(e) {
            rs() &&
              null != e &&
              "function" != typeof e &&
              console &&
              console.warn &&
              console.warn(
                `trackBy must be a function, but received ${JSON.stringify(
                  e
                )}. See https://angular.io/api/common/NgForOf#change-propagation for more information.`
              ),
              (this._trackByFn = e);
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(e) {
            e && (this._template = e);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (t) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((e = n), e.name || typeof e)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var e;
            if (this._differ) {
              const e = this._differ.diff(this._ngForOf);
              e && this._applyChanges(e);
            }
          }
          _applyChanges(e) {
            const t = [];
            e.forEachOperation((e, n, s) => {
              if (null == e.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new vl(null, this._ngForOf, -1, -1),
                    null === s ? void 0 : s
                  ),
                  i = new yl(e, n);
                t.push(i);
              } else if (null == s)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const i = this._viewContainer.get(n);
                this._viewContainer.move(i, s);
                const r = new yl(e, i);
                t.push(r);
              }
            });
            for (let n = 0; n < t.length; n++)
              this._perViewChange(t[n].view, t[n].record);
            for (let n = 0, s = this._viewContainer.length; n < s; n++) {
              const e = this._viewContainer.get(n);
              (e.context.index = n),
                (e.context.count = s),
                (e.context.ngForOf = this._ngForOf);
            }
            e.forEachIdentityChange((e) => {
              this._viewContainer.get(e.currentIndex).context.$implicit =
                e.item;
            });
          }
          _perViewChange(e, t) {
            e.context.$implicit = t.item;
          }
          static ngTemplateContextGuard(e, t) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(mr(Bo), mr(Fo), mr(No));
          }),
          (e.ɵdir = at({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          e
        );
      })();
      class yl {
        constructor(e, t) {
          (this.record = e), (this.view = t);
        }
      }
      let wl = (() => {
        class e {
          constructor(e, t) {
            (this._viewContainer = e),
              (this._context = new _l()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = t);
          }
          set ngIf(e) {
            (this._context.$implicit = this._context.ngIf = e),
              this._updateView();
          }
          set ngIfThen(e) {
            bl("ngIfThen", e),
              (this._thenTemplateRef = e),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(e) {
            bl("ngIfElse", e),
              (this._elseTemplateRef = e),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(e, t) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(mr(Bo), mr(Fo));
          }),
          (e.ɵdir = at({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          e
        );
      })();
      class _l {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function bl(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${ue(t)}'.`
          );
      }
      class Cl {
        constructor(e, t) {
          (this._viewContainerRef = e),
            (this._templateRef = t),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(e) {
          e && !this._created
            ? this.create()
            : !e && this._created && this.destroy();
        }
      }
      let xl = (() => {
          class e {
            constructor() {
              (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(e) {
              (this._ngSwitch = e),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(e) {
              this._defaultViews || (this._defaultViews = []),
                this._defaultViews.push(e);
            }
            _matchCase(e) {
              const t = e == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || t),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                t
              );
            }
            _updateDefaultCases(e) {
              if (this._defaultViews && e !== this._defaultUsed) {
                this._defaultUsed = e;
                for (let t = 0; t < this._defaultViews.length; t++)
                  this._defaultViews[t].enforceState(e);
              }
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵdir = at({
              type: e,
              selectors: [["", "ngSwitch", ""]],
              inputs: { ngSwitch: "ngSwitch" },
            })),
            e
          );
        })(),
        Sl = (() => {
          class e {
            constructor(e, t, n) {
              (this.ngSwitch = n), n._addCase(), (this._view = new Cl(e, t));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(mr(Bo), mr(Fo), mr(xl, 1));
            }),
            (e.ɵdir = at({
              type: e,
              selectors: [["", "ngSwitchCase", ""]],
              inputs: { ngSwitchCase: "ngSwitchCase" },
            })),
            e
          );
        })(),
        El = (() => {
          class e {
            constructor(e, t, n) {
              n._addDefault(new Cl(e, t));
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(mr(Bo), mr(Fo), mr(xl, 1));
            }),
            (e.ɵdir = at({
              type: e,
              selectors: [["", "ngSwitchDefault", ""]],
            })),
            e
          );
        })(),
        Tl = (() => {
          class e {
            constructor(e) {
              (this._viewContainerRef = e),
                (this._viewRef = null),
                (this.ngTemplateOutletContext = null),
                (this.ngTemplateOutlet = null);
            }
            ngOnChanges(e) {
              if (this._shouldRecreateView(e)) {
                const e = this._viewContainerRef;
                this._viewRef && e.remove(e.indexOf(this._viewRef)),
                  (this._viewRef = this.ngTemplateOutlet
                    ? e.createEmbeddedView(
                        this.ngTemplateOutlet,
                        this.ngTemplateOutletContext
                      )
                    : null);
              } else
                this._viewRef &&
                  this.ngTemplateOutletContext &&
                  this._updateExistingContext(this.ngTemplateOutletContext);
            }
            _shouldRecreateView(e) {
              const t = e.ngTemplateOutletContext;
              return (
                !!e.ngTemplateOutlet || (t && this._hasContextShapeChanged(t))
              );
            }
            _hasContextShapeChanged(e) {
              const t = Object.keys(e.previousValue || {}),
                n = Object.keys(e.currentValue || {});
              if (t.length === n.length) {
                for (let e of n) if (-1 === t.indexOf(e)) return !0;
                return !1;
              }
              return !0;
            }
            _updateExistingContext(e) {
              for (let t of Object.keys(e))
                this._viewRef.context[t] = this.ngTemplateOutletContext[t];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(mr(Bo));
            }),
            (e.ɵdir = at({
              type: e,
              selectors: [["", "ngTemplateOutlet", ""]],
              inputs: {
                ngTemplateOutletContext: "ngTemplateOutletContext",
                ngTemplateOutlet: "ngTemplateOutlet",
              },
              features: [kt],
            })),
            e
          );
        })();
      class kl {
        createSubscription(e, t) {
          return e.subscribe({
            next: t,
            error: (e) => {
              throw e;
            },
          });
        }
        dispose(e) {
          e.unsubscribe();
        }
        onDestroy(e) {
          e.unsubscribe();
        }
      }
      class Il {
        createSubscription(e, t) {
          return e.then(t, (e) => {
            throw e;
          });
        }
        dispose(e) {}
        onDestroy(e) {}
      }
      const Ml = new Il(),
        Ol = new kl();
      let Pl = (() => {
          class e {
            constructor(e) {
              (this._ref = e),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null);
            }
            ngOnDestroy() {
              this._subscription && this._dispose();
            }
            transform(e) {
              return this._obj
                ? e !== this._obj
                  ? (this._dispose(), this.transform(e))
                  : this._latestValue
                : (e && this._subscribe(e), this._latestValue);
            }
            _subscribe(e) {
              (this._obj = e),
                (this._strategy = this._selectStrategy(e)),
                (this._subscription = this._strategy.createSubscription(
                  e,
                  (t) => this._updateLatestValue(e, t)
                ));
            }
            _selectStrategy(t) {
              if (Er(t)) return Ml;
              if (
                (function (e) {
                  return !!e && "function" == typeof e.subscribe;
                })(t)
              )
                return Ol;
              throw Error(`InvalidPipeArgument: '${t}' for pipe '${ue(e)}'`);
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(e, t) {
              e === this._obj &&
                ((this._latestValue = t), this._ref.markForCheck());
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(
                (function (e = K.Default) {
                  const t = Bi(!0);
                  if (null != t || e & K.Optional) return t;
                  Et("ChangeDetectorRef");
                })()
              );
            }),
            (e.ɵpipe = lt({ name: "async", type: e, pure: !1 })),
            e
          );
        })(),
        Al = (() => {
          class e {}
          return (
            (e.ɵmod = rt({ type: e })),
            (e.ɵinj = te({
              factory: function (t) {
                return new (t || e)();
              },
              providers: [{ provide: pl, useClass: fl }],
            })),
            e
          );
        })();
      class Dl extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var e;
          (e = new Dl()), cl || (cl = e);
        }
        getProperty(e, t) {
          return e[t];
        }
        log(e) {
          window.console && window.console.log && window.console.log(e);
        }
        logGroup(e) {
          window.console && window.console.group && window.console.group(e);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(e, t, n) {
          return (
            e.addEventListener(t, n, !1),
            () => {
              e.removeEventListener(t, n, !1);
            }
          );
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t);
        }
        remove(e) {
          return e.parentNode && e.parentNode.removeChild(e), e;
        }
        getValue(e) {
          return e.value;
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, t) {
          return "window" === t
            ? window
            : "document" === t
            ? e
            : "body" === t
            ? e.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(e) {
          const t =
            Nl || ((Nl = document.querySelector("base")), Nl)
              ? Nl.getAttribute("href")
              : null;
          return null == t
            ? null
            : ((n = t),
              Rl || (Rl = document.createElement("a")),
              Rl.setAttribute("href", n),
              "/" === Rl.pathname.charAt(0) ? Rl.pathname : "/" + Rl.pathname);
          var n;
        }
        resetBaseElement() {
          Nl = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(e) {
          return (function (e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const e = n.indexOf("="),
                [s, i] = -1 == e ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
              if (s.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, e);
        }
      }
      let Rl,
        Nl = null;
      const Ll = new ke("TRANSITION_ID"),
        Vl = [
          {
            provide: wa,
            useFactory: function (e, t, n) {
              return () => {
                n.get(_a).donePromise.then(() => {
                  const n = ul();
                  Array.prototype.slice
                    .apply(t.querySelectorAll("style[ng-transition]"))
                    .filter((t) => t.getAttribute("ng-transition") === e)
                    .forEach((e) => n.remove(e));
                });
              };
            },
            deps: [Ll, dl, ir],
            multi: !0,
          },
        ];
      class jl {
        static init() {
          var e;
          (e = new jl()), (Ka = e);
        }
        addToWindow(e) {
          (we.getAngularTestability = (t, n = !0) => {
            const s = e.findTestabilityInTree(t, n);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (we.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (we.getAllAngularRootElements = () => e.getAllRootElements()),
            we.frameworkStabilizers || (we.frameworkStabilizers = []),
            we.frameworkStabilizers.push((e) => {
              const t = we.getAllAngularTestabilities();
              let n = t.length,
                s = !1;
              const i = function (t) {
                (s = s || t), n--, 0 == n && e(s);
              };
              t.forEach(function (e) {
                e.whenStable(i);
              });
            });
        }
        findTestabilityInTree(e, t, n) {
          if (null == t) return null;
          const s = e.getTestability(t);
          return null != s
            ? s
            : n
            ? ul().isShadowRoot(t)
              ? this.findTestabilityInTree(e, t.host, !0)
              : this.findTestabilityInTree(e, t.parentElement, !0)
            : null;
        }
      }
      const zl = new ke("EventManagerPlugins");
      let Fl = (() => {
        class e {
          constructor(e, t) {
            (this._zone = t),
              (this._eventNameToPlugin = new Map()),
              e.forEach((e) => (e.manager = this)),
              (this._plugins = e.slice().reverse());
          }
          addEventListener(e, t, n) {
            return this._findPluginFor(t).addEventListener(e, t, n);
          }
          addGlobalEventListener(e, t, n) {
            return this._findPluginFor(t).addGlobalEventListener(e, t, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(e) {
            const t = this._eventNameToPlugin.get(e);
            if (t) return t;
            const n = this._plugins;
            for (let s = 0; s < n.length; s++) {
              const t = n[s];
              if (t.supports(e)) return this._eventNameToPlugin.set(e, t), t;
            }
            throw new Error("No event manager plugin found for event " + e);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(je(zl), je(Fa));
          }),
          (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Hl {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, t, n) {
          const s = ul().getGlobalEventTarget(this._doc, e);
          if (!s)
            throw new Error(`Unsupported event target ${s} for event ${t}`);
          return this.addEventListener(s, t, n);
        }
      }
      let Bl = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(e) {
              const t = new Set();
              e.forEach((e) => {
                this._stylesSet.has(e) || (this._stylesSet.add(e), t.add(e));
              }),
                this.onStylesAdded(t);
            }
            onStylesAdded(e) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        $l = (() => {
          class e extends Bl {
            constructor(e) {
              super(),
                (this._doc = e),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(e.head);
            }
            _addStylesToHost(e, t) {
              e.forEach((e) => {
                const n = this._doc.createElement("style");
                (n.textContent = e), this._styleNodes.add(t.appendChild(n));
              });
            }
            addHost(e) {
              this._addStylesToHost(this._stylesSet, e), this._hostNodes.add(e);
            }
            removeHost(e) {
              this._hostNodes.delete(e);
            }
            onStylesAdded(e) {
              this._hostNodes.forEach((t) => this._addStylesToHost(e, t));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((e) => ul().remove(e));
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(je(dl));
            }),
            (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Gl = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        ql = /%COMP%/g;
      function Wl(e, t, n) {
        for (let s = 0; s < t.length; s++) {
          let i = t[s];
          Array.isArray(i) ? Wl(e, i, n) : ((i = i.replace(ql, e)), n.push(i));
        }
        return n;
      }
      function Zl(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Ul = (() => {
        class e {
          constructor(e, t, n) {
            (this.eventManager = e),
              (this.sharedStylesHost = t),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Yl(e));
          }
          createRenderer(e, t) {
            if (!e || !t) return this.defaultRenderer;
            switch (t.encapsulation) {
              case Xe.Emulated: {
                let n = this.rendererByCompId.get(t.id);
                return (
                  n ||
                    ((n = new Ql(
                      this.eventManager,
                      this.sharedStylesHost,
                      t,
                      this.appId
                    )),
                    this.rendererByCompId.set(t.id, n)),
                  n.applyToHost(e),
                  n
                );
              }
              case Xe.Native:
              case Xe.ShadowDom:
                return new Xl(this.eventManager, this.sharedStylesHost, e, t);
              default:
                if (!this.rendererByCompId.has(t.id)) {
                  const e = Wl(t.id, t.styles, []);
                  this.sharedStylesHost.addStyles(e),
                    this.rendererByCompId.set(t.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(je(Fl), je($l), je(ba));
          }),
          (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Yl {
        constructor(e) {
          (this.eventManager = e), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(e, t) {
          return t
            ? document.createElementNS(Gl[t] || t, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        insertBefore(e, t, n) {
          e && e.insertBefore(t, n);
        }
        removeChild(e, t) {
          e && e.removeChild(t);
        }
        selectRootElement(e, t) {
          let n = "string" == typeof e ? document.querySelector(e) : e;
          if (!n)
            throw new Error(`The selector "${e}" did not match any elements`);
          return t || (n.textContent = ""), n;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, t, n, s) {
          if (s) {
            t = s + ":" + t;
            const i = Gl[s];
            i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n);
          } else e.setAttribute(t, n);
        }
        removeAttribute(e, t, n) {
          if (n) {
            const s = Gl[n];
            s ? e.removeAttributeNS(s, t) : e.removeAttribute(`${n}:${t}`);
          } else e.removeAttribute(t);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        setStyle(e, t, n, s) {
          s & wo.DashCase
            ? e.style.setProperty(t, n, s & wo.Important ? "important" : "")
            : (e.style[t] = n);
        }
        removeStyle(e, t, n) {
          n & wo.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
        }
        setProperty(e, t, n) {
          e[t] = n;
        }
        setValue(e, t) {
          e.nodeValue = t;
        }
        listen(e, t, n) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, t, Zl(n))
            : this.eventManager.addEventListener(e, t, Zl(n));
        }
      }
      class Ql extends Yl {
        constructor(e, t, n, s) {
          super(e), (this.component = n);
          const i = Wl(s + "-" + n.id, n.styles, []);
          t.addStyles(i),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              ql,
              s + "-" + n.id
            )),
            (this.hostAttr = "_nghost-%COMP%".replace(ql, s + "-" + n.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, t) {
          const n = super.createElement(e, t);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class Xl extends Yl {
        constructor(e, t, n, s) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = n),
            (this.component = s),
            (this.shadowRoot =
              s.encapsulation === Xe.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Wl(s.id, s.styles, []);
          for (let r = 0; r < i.length; r++) {
            const e = document.createElement("style");
            (e.textContent = i[r]), this.shadowRoot.appendChild(e);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t);
        }
        insertBefore(e, t, n) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, n);
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let Kl = (() => {
        class e extends Hl {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return !0;
          }
          addEventListener(e, t, n) {
            return (
              e.addEventListener(t, n, !1),
              () => this.removeEventListener(e, t, n)
            );
          }
          removeEventListener(e, t, n) {
            return e.removeEventListener(t, n);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(je(dl));
          }),
          (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Jl = ["alt", "control", "meta", "shift"],
        ec = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        tc = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        nc = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let sc = (() => {
        class e extends Hl {
          constructor(e) {
            super(e);
          }
          supports(t) {
            return null != e.parseEventName(t);
          }
          addEventListener(t, n, s) {
            const i = e.parseEventName(n),
              r = e.eventCallback(i.fullKey, s, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => ul().onAndCancel(t, i.domEventName, r));
          }
          static parseEventName(t) {
            const n = t.toLowerCase().split("."),
              s = n.shift();
            if (0 === n.length || ("keydown" !== s && "keyup" !== s))
              return null;
            const i = e._normalizeKey(n.pop());
            let r = "";
            if (
              (Jl.forEach((e) => {
                const t = n.indexOf(e);
                t > -1 && (n.splice(t, 1), (r += e + "."));
              }),
              (r += i),
              0 != n.length || 0 === i.length)
            )
              return null;
            const o = {};
            return (o.domEventName = s), (o.fullKey = r), o;
          }
          static getEventFullKey(e) {
            let t = "",
              n = (function (e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && tc.hasOwnProperty(t) && (t = tc[t]));
                }
                return ec[t] || t;
              })(e);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              Jl.forEach((s) => {
                s != n && (0, nc[s])(e) && (t += s + ".");
              }),
              (t += n),
              t
            );
          }
          static eventCallback(t, n, s) {
            return (i) => {
              e.getEventFullKey(i) === t && s.runGuarded(() => n(i));
            };
          }
          static _normalizeKey(e) {
            switch (e) {
              case "esc":
                return "escape";
              default:
                return e;
            }
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(je(dl));
          }),
          (e.ɵprov = ee({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ic = el(ol, "browser", [
          { provide: Ea, useValue: "browser" },
          {
            provide: Sa,
            useValue: function () {
              Dl.makeCurrent(), jl.init();
            },
            multi: !0,
          },
          {
            provide: dl,
            useFactory: function () {
              return (
                (function (e) {
                  At = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        rc = [
          [],
          { provide: qi, useValue: "root" },
          {
            provide: ts,
            useFactory: function () {
              return new ts();
            },
            deps: [],
          },
          { provide: zl, useClass: Kl, multi: !0, deps: [dl, Fa, Ea] },
          { provide: zl, useClass: sc, multi: !0, deps: [dl] },
          [],
          { provide: Ul, useClass: Ul, deps: [Fl, $l, ba] },
          { provide: yo, useExisting: Ul },
          { provide: Bl, useExisting: $l },
          { provide: $l, useClass: $l, deps: [dl] },
          { provide: Ua, useClass: Ua, deps: [Fa] },
          { provide: Fl, useClass: Fl, deps: [zl, Fa] },
          [],
        ];
      let oc = (() => {
        class e {
          constructor(e) {
            if (e)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(t) {
            return {
              ngModule: e,
              providers: [
                { provide: ba, useValue: t.appId },
                { provide: Ll, useExisting: ba },
                Vl,
              ],
            };
          }
        }
        return (
          (e.ɵmod = rt({ type: e })),
          (e.ɵinj = te({
            factory: function (t) {
              return new (t || e)(je(e, 12));
            },
            providers: rc,
            imports: [Al, ll],
          })),
          e
        );
      })();
      function ac(e) {
        return (
          null !== e &&
          "object" == typeof e &&
          "constructor" in e &&
          e.constructor === Object
        );
      }
      function lc(e, t) {
        void 0 === e && (e = {}),
          void 0 === t && (t = {}),
          Object.keys(t).forEach(function (n) {
            void 0 === e[n]
              ? (e[n] = t[n])
              : ac(t[n]) &&
                ac(e[n]) &&
                Object.keys(t[n]).length > 0 &&
                lc(e[n], t[n]);
          });
      }
      "undefined" != typeof window && window;
      var cc = {
        body: {},
        addEventListener: function () {},
        removeEventListener: function () {},
        activeElement: { blur: function () {}, nodeName: "" },
        querySelector: function () {
          return null;
        },
        querySelectorAll: function () {
          return [];
        },
        getElementById: function () {
          return null;
        },
        createEvent: function () {
          return { initEvent: function () {} };
        },
        createElement: function () {
          return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute: function () {},
            getElementsByTagName: function () {
              return [];
            },
          };
        },
        createElementNS: function () {
          return {};
        },
        importNode: function () {
          return null;
        },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
      };
      function uc() {
        var e = "undefined" != typeof document ? document : {};
        return lc(e, cc), e;
      }
      var dc = {
        document: cc,
        navigator: { userAgent: "" },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
        history: {
          replaceState: function () {},
          pushState: function () {},
          go: function () {},
          back: function () {},
        },
        CustomEvent: function () {
          return this;
        },
        addEventListener: function () {},
        removeEventListener: function () {},
        getComputedStyle: function () {
          return {
            getPropertyValue: function () {
              return "";
            },
          };
        },
        Image: function () {},
        Date: function () {},
        screen: {},
        setTimeout: function () {},
        clearTimeout: function () {},
        matchMedia: function () {
          return {};
        },
        requestAnimationFrame: function (e) {
          return "undefined" == typeof setTimeout
            ? (e(), null)
            : setTimeout(e, 0);
        },
        cancelAnimationFrame: function (e) {
          "undefined" != typeof setTimeout && clearTimeout(e);
        },
      };
      function hc() {
        var e = "undefined" != typeof window ? window : {};
        return lc(e, dc), e;
      }
      function pc(e) {
        return (pc = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function fc(e, t) {
        return (fc =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function gc() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      }
      function vc(e, t, n) {
        return (vc = gc()
          ? Reflect.construct
          : function (e, t, n) {
              var s = [null];
              s.push.apply(s, t);
              var i = new (Function.bind.apply(e, s))();
              return n && fc(i, n.prototype), i;
            }).apply(null, arguments);
      }
      function mc(e) {
        var t = "function" == typeof Map ? new Map() : void 0;
        return (mc = function (e) {
          if (
            null === e ||
            -1 === Function.toString.call(e).indexOf("[native code]")
          )
            return e;
          if ("function" != typeof e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          if (void 0 !== t) {
            if (t.has(e)) return t.get(e);
            t.set(e, n);
          }
          function n() {
            return vc(e, arguments, pc(this).constructor);
          }
          return (
            (n.prototype = Object.create(e.prototype, {
              constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            fc(n, e)
          );
        })(e);
      }
      var yc = (function (e) {
        var t, n;
        function s(t) {
          var n, s, i;
          return (
            (s = (function (e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })((n = e.call.apply(e, [this].concat(t)) || this))),
            (i = s.__proto__),
            Object.defineProperty(s, "__proto__", {
              get: function () {
                return i;
              },
              set: function (e) {
                i.__proto__ = e;
              },
            }),
            n
          );
        }
        return (
          (n = e),
          ((t = s).prototype = Object.create(n.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = n),
          s
        );
      })(mc(Array));
      function wc(e) {
        void 0 === e && (e = []);
        var t = [];
        return (
          e.forEach(function (e) {
            Array.isArray(e) ? t.push.apply(t, wc(e)) : t.push(e);
          }),
          t
        );
      }
      function _c(e, t) {
        return Array.prototype.filter.call(e, t);
      }
      function bc(e, t) {
        var n = hc(),
          s = uc(),
          i = [];
        if (!t && e instanceof yc) return e;
        if (!e) return new yc(i);
        if ("string" == typeof e) {
          var r = e.trim();
          if (r.indexOf("<") >= 0 && r.indexOf(">") >= 0) {
            var o = "div";
            0 === r.indexOf("<li") && (o = "ul"),
              0 === r.indexOf("<tr") && (o = "tbody"),
              (0 !== r.indexOf("<td") && 0 !== r.indexOf("<th")) || (o = "tr"),
              0 === r.indexOf("<tbody") && (o = "table"),
              0 === r.indexOf("<option") && (o = "select");
            var a = s.createElement(o);
            a.innerHTML = r;
            for (var l = 0; l < a.childNodes.length; l += 1)
              i.push(a.childNodes[l]);
          } else
            i = (function (e, t) {
              if ("string" != typeof e) return [e];
              for (
                var n = [], s = t.querySelectorAll(e), i = 0;
                i < s.length;
                i += 1
              )
                n.push(s[i]);
              return n;
            })(e.trim(), t || s);
        } else if (e.nodeType || e === n || e === s) i.push(e);
        else if (Array.isArray(e)) {
          if (e instanceof yc) return e;
          i = e;
        }
        return new yc(
          (function (e) {
            for (var t = [], n = 0; n < e.length; n += 1)
              -1 === t.indexOf(e[n]) && t.push(e[n]);
            return t;
          })(i)
        );
      }
      bc.fn = yc.prototype;
      var Cc = "resize scroll".split(" ");
      function xc(e) {
        return function () {
          for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
            n[s] = arguments[s];
          if (void 0 === n[0]) {
            for (var i = 0; i < this.length; i += 1)
              Cc.indexOf(e) < 0 &&
                (e in this[i] ? this[i][e]() : bc(this[i]).trigger(e));
            return this;
          }
          return this.on.apply(this, [e].concat(n));
        };
      }
      xc("click"),
        xc("blur"),
        xc("focus"),
        xc("focusin"),
        xc("focusout"),
        xc("keyup"),
        xc("keydown"),
        xc("keypress"),
        xc("submit"),
        xc("change"),
        xc("mousedown"),
        xc("mousemove"),
        xc("mouseup"),
        xc("mouseenter"),
        xc("mouseleave"),
        xc("mouseout"),
        xc("mouseover"),
        xc("touchstart"),
        xc("touchend"),
        xc("touchmove"),
        xc("resize"),
        xc("scroll");
      var Sc = {
        addClass: function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          var s = wc(
            t.map(function (e) {
              return e.split(" ");
            })
          );
          return (
            this.forEach(function (e) {
              var t;
              (t = e.classList).add.apply(t, s);
            }),
            this
          );
        },
        removeClass: function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          var s = wc(
            t.map(function (e) {
              return e.split(" ");
            })
          );
          return (
            this.forEach(function (e) {
              var t;
              (t = e.classList).remove.apply(t, s);
            }),
            this
          );
        },
        hasClass: function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          var s = wc(
            t.map(function (e) {
              return e.split(" ");
            })
          );
          return (
            _c(this, function (e) {
              return (
                s.filter(function (t) {
                  return e.classList.contains(t);
                }).length > 0
              );
            }).length > 0
          );
        },
        toggleClass: function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          var s = wc(
            t.map(function (e) {
              return e.split(" ");
            })
          );
          this.forEach(function (e) {
            s.forEach(function (t) {
              e.classList.toggle(t);
            });
          });
        },
        attr: function (e, t) {
          if (1 === arguments.length && "string" == typeof e)
            return this[0] ? this[0].getAttribute(e) : void 0;
          for (var n = 0; n < this.length; n += 1)
            if (2 === arguments.length) this[n].setAttribute(e, t);
            else
              for (var s in e)
                (this[n][s] = e[s]), this[n].setAttribute(s, e[s]);
          return this;
        },
        removeAttr: function (e) {
          for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
          return this;
        },
        transform: function (e) {
          for (var t = 0; t < this.length; t += 1) this[t].style.transform = e;
          return this;
        },
        transition: function (e) {
          for (var t = 0; t < this.length; t += 1)
            this[t].style.transitionDuration =
              "string" != typeof e ? e + "ms" : e;
          return this;
        },
        on: function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          var s = t[0],
            i = t[1],
            r = t[2],
            o = t[3];
          function a(e) {
            var t = e.target;
            if (t) {
              var n = e.target.dom7EventData || [];
              if ((n.indexOf(e) < 0 && n.unshift(e), bc(t).is(i)))
                r.apply(t, n);
              else
                for (var s = bc(t).parents(), o = 0; o < s.length; o += 1)
                  bc(s[o]).is(i) && r.apply(s[o], n);
            }
          }
          function l(e) {
            var t = (e && e.target && e.target.dom7EventData) || [];
            t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
          }
          "function" == typeof t[1] &&
            ((s = t[0]), (r = t[1]), (o = t[2]), (i = void 0)),
            o || (o = !1);
          for (var c, u = s.split(" "), d = 0; d < this.length; d += 1) {
            var h = this[d];
            if (i)
              for (c = 0; c < u.length; c += 1) {
                var p = u[c];
                h.dom7LiveListeners || (h.dom7LiveListeners = {}),
                  h.dom7LiveListeners[p] || (h.dom7LiveListeners[p] = []),
                  h.dom7LiveListeners[p].push({
                    listener: r,
                    proxyListener: a,
                  }),
                  h.addEventListener(p, a, o);
              }
            else
              for (c = 0; c < u.length; c += 1) {
                var f = u[c];
                h.dom7Listeners || (h.dom7Listeners = {}),
                  h.dom7Listeners[f] || (h.dom7Listeners[f] = []),
                  h.dom7Listeners[f].push({ listener: r, proxyListener: l }),
                  h.addEventListener(f, l, o);
              }
          }
          return this;
        },
        off: function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          var s = t[0],
            i = t[1],
            r = t[2],
            o = t[3];
          "function" == typeof t[1] &&
            ((s = t[0]), (r = t[1]), (o = t[2]), (i = void 0)),
            o || (o = !1);
          for (var a = s.split(" "), l = 0; l < a.length; l += 1)
            for (var c = a[l], u = 0; u < this.length; u += 1) {
              var d = this[u],
                h = void 0;
              if (
                (!i && d.dom7Listeners
                  ? (h = d.dom7Listeners[c])
                  : i && d.dom7LiveListeners && (h = d.dom7LiveListeners[c]),
                h && h.length)
              )
                for (var p = h.length - 1; p >= 0; p -= 1) {
                  var f = h[p];
                  (r && f.listener === r) ||
                  (r &&
                    f.listener &&
                    f.listener.dom7proxy &&
                    f.listener.dom7proxy === r)
                    ? (d.removeEventListener(c, f.proxyListener, o),
                      h.splice(p, 1))
                    : r ||
                      (d.removeEventListener(c, f.proxyListener, o),
                      h.splice(p, 1));
                }
            }
          return this;
        },
        trigger: function () {
          for (
            var e = hc(), t = arguments.length, n = new Array(t), s = 0;
            s < t;
            s++
          )
            n[s] = arguments[s];
          for (var i = n[0].split(" "), r = n[1], o = 0; o < i.length; o += 1)
            for (var a = i[o], l = 0; l < this.length; l += 1) {
              var c = this[l];
              if (e.CustomEvent) {
                var u = new e.CustomEvent(a, {
                  detail: r,
                  bubbles: !0,
                  cancelable: !0,
                });
                (c.dom7EventData = n.filter(function (e, t) {
                  return t > 0;
                })),
                  c.dispatchEvent(u),
                  (c.dom7EventData = []),
                  delete c.dom7EventData;
              }
            }
          return this;
        },
        transitionEnd: function (e) {
          var t = this;
          return (
            e &&
              t.on("transitionend", function n(s) {
                s.target === this &&
                  (e.call(this, s), t.off("transitionend", n));
              }),
            this
          );
        },
        outerWidth: function (e) {
          if (this.length > 0) {
            if (e) {
              var t = this.styles();
              return (
                this[0].offsetWidth +
                parseFloat(t.getPropertyValue("margin-right")) +
                parseFloat(t.getPropertyValue("margin-left"))
              );
            }
            return this[0].offsetWidth;
          }
          return null;
        },
        outerHeight: function (e) {
          if (this.length > 0) {
            if (e) {
              var t = this.styles();
              return (
                this[0].offsetHeight +
                parseFloat(t.getPropertyValue("margin-top")) +
                parseFloat(t.getPropertyValue("margin-bottom"))
              );
            }
            return this[0].offsetHeight;
          }
          return null;
        },
        styles: function () {
          var e = hc();
          return this[0] ? e.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
          if (this.length > 0) {
            var e = hc(),
              t = uc(),
              n = this[0],
              s = n.getBoundingClientRect(),
              i = t.body;
            return {
              top:
                s.top +
                (n === e ? e.scrollY : n.scrollTop) -
                (n.clientTop || i.clientTop || 0),
              left:
                s.left +
                (n === e ? e.scrollX : n.scrollLeft) -
                (n.clientLeft || i.clientLeft || 0),
            };
          }
          return null;
        },
        css: function (e, t) {
          var n,
            s = hc();
          if (1 === arguments.length) {
            if ("string" != typeof e) {
              for (n = 0; n < this.length; n += 1)
                for (var i in e) this[n].style[i] = e[i];
              return this;
            }
            if (this[0])
              return s.getComputedStyle(this[0], null).getPropertyValue(e);
          }
          if (2 === arguments.length && "string" == typeof e) {
            for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
            return this;
          }
          return this;
        },
        each: function (e) {
          return e
            ? (this.forEach(function (t, n) {
                e.apply(t, [t, n]);
              }),
              this)
            : this;
        },
        html: function (e) {
          if (void 0 === e) return this[0] ? this[0].innerHTML : null;
          for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
          return this;
        },
        text: function (e) {
          if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
          for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
          return this;
        },
        is: function (e) {
          var t,
            n,
            s = hc(),
            i = uc(),
            r = this[0];
          if (!r || void 0 === e) return !1;
          if ("string" == typeof e) {
            if (r.matches) return r.matches(e);
            if (r.webkitMatchesSelector) return r.webkitMatchesSelector(e);
            if (r.msMatchesSelector) return r.msMatchesSelector(e);
            for (t = bc(e), n = 0; n < t.length; n += 1)
              if (t[n] === r) return !0;
            return !1;
          }
          if (e === i) return r === i;
          if (e === s) return r === s;
          if (e.nodeType || e instanceof yc) {
            for (t = e.nodeType ? [e] : e, n = 0; n < t.length; n += 1)
              if (t[n] === r) return !0;
            return !1;
          }
          return !1;
        },
        index: function () {
          var e,
            t = this[0];
          if (t) {
            for (e = 0; null !== (t = t.previousSibling); )
              1 === t.nodeType && (e += 1);
            return e;
          }
        },
        eq: function (e) {
          if (void 0 === e) return this;
          var t = this.length;
          if (e > t - 1) return bc([]);
          if (e < 0) {
            var n = t + e;
            return bc(n < 0 ? [] : [this[n]]);
          }
          return bc([this[e]]);
        },
        append: function () {
          for (var e, t = uc(), n = 0; n < arguments.length; n += 1) {
            e = n < 0 || arguments.length <= n ? void 0 : arguments[n];
            for (var s = 0; s < this.length; s += 1)
              if ("string" == typeof e) {
                var i = t.createElement("div");
                for (i.innerHTML = e; i.firstChild; )
                  this[s].appendChild(i.firstChild);
              } else if (e instanceof yc)
                for (var r = 0; r < e.length; r += 1) this[s].appendChild(e[r]);
              else this[s].appendChild(e);
          }
          return this;
        },
        prepend: function (e) {
          var t,
            n,
            s = uc();
          for (t = 0; t < this.length; t += 1)
            if ("string" == typeof e) {
              var i = s.createElement("div");
              for (i.innerHTML = e, n = i.childNodes.length - 1; n >= 0; n -= 1)
                this[t].insertBefore(i.childNodes[n], this[t].childNodes[0]);
            } else if (e instanceof yc)
              for (n = 0; n < e.length; n += 1)
                this[t].insertBefore(e[n], this[t].childNodes[0]);
            else this[t].insertBefore(e, this[t].childNodes[0]);
          return this;
        },
        next: function (e) {
          return this.length > 0
            ? e
              ? this[0].nextElementSibling &&
                bc(this[0].nextElementSibling).is(e)
                ? bc([this[0].nextElementSibling])
                : bc([])
              : bc(
                  this[0].nextElementSibling ? [this[0].nextElementSibling] : []
                )
            : bc([]);
        },
        nextAll: function (e) {
          var t = [],
            n = this[0];
          if (!n) return bc([]);
          for (; n.nextElementSibling; ) {
            var s = n.nextElementSibling;
            e ? bc(s).is(e) && t.push(s) : t.push(s), (n = s);
          }
          return bc(t);
        },
        prev: function (e) {
          if (this.length > 0) {
            var t = this[0];
            return e
              ? t.previousElementSibling && bc(t.previousElementSibling).is(e)
                ? bc([t.previousElementSibling])
                : bc([])
              : bc(t.previousElementSibling ? [t.previousElementSibling] : []);
          }
          return bc([]);
        },
        prevAll: function (e) {
          var t = [],
            n = this[0];
          if (!n) return bc([]);
          for (; n.previousElementSibling; ) {
            var s = n.previousElementSibling;
            e ? bc(s).is(e) && t.push(s) : t.push(s), (n = s);
          }
          return bc(t);
        },
        parent: function (e) {
          for (var t = [], n = 0; n < this.length; n += 1)
            null !== this[n].parentNode &&
              (e
                ? bc(this[n].parentNode).is(e) && t.push(this[n].parentNode)
                : t.push(this[n].parentNode));
          return bc(t);
        },
        parents: function (e) {
          for (var t = [], n = 0; n < this.length; n += 1)
            for (var s = this[n].parentNode; s; )
              e ? bc(s).is(e) && t.push(s) : t.push(s), (s = s.parentNode);
          return bc(t);
        },
        closest: function (e) {
          var t = this;
          return void 0 === e
            ? bc([])
            : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
          for (var t = [], n = 0; n < this.length; n += 1)
            for (
              var s = this[n].querySelectorAll(e), i = 0;
              i < s.length;
              i += 1
            )
              t.push(s[i]);
          return bc(t);
        },
        children: function (e) {
          for (var t = [], n = 0; n < this.length; n += 1)
            for (var s = this[n].children, i = 0; i < s.length; i += 1)
              (e && !bc(s[i]).is(e)) || t.push(s[i]);
          return bc(t);
        },
        filter: function (e) {
          return bc(_c(this, e));
        },
        remove: function () {
          for (var e = 0; e < this.length; e += 1)
            this[e].parentNode && this[e].parentNode.removeChild(this[e]);
          return this;
        },
      };
      Object.keys(Sc).forEach(function (e) {
        bc.fn[e] = Sc[e];
      });
      var Ec,
        Tc,
        kc,
        Ic = bc;
      function Mc(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      }
      function Oc() {
        return Date.now();
      }
      function Pc(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          e.constructor === Object
        );
      }
      function Ac() {
        for (
          var e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = 1;
          t < arguments.length;
          t += 1
        ) {
          var n = t < 0 || arguments.length <= t ? void 0 : arguments[t];
          if (null != n)
            for (
              var s = Object.keys(Object(n)), i = 0, r = s.length;
              i < r;
              i += 1
            ) {
              var o = s[i],
                a = Object.getOwnPropertyDescriptor(n, o);
              void 0 !== a &&
                a.enumerable &&
                (Pc(e[o]) && Pc(n[o])
                  ? Ac(e[o], n[o])
                  : !Pc(e[o]) && Pc(n[o])
                  ? ((e[o] = {}), Ac(e[o], n[o]))
                  : (e[o] = n[o]));
            }
        }
        return e;
      }
      function Dc(e, t) {
        Object.keys(t).forEach(function (n) {
          Pc(t[n]) &&
            Object.keys(t[n]).forEach(function (s) {
              "function" == typeof t[n][s] && (t[n][s] = t[n][s].bind(e));
            }),
            (e[n] = t[n]);
        });
      }
      function Rc() {
        return (
          Ec ||
            (Ec = (function () {
              var e = hc(),
                t = uc();
              return {
                touch: !!(
                  "ontouchstart" in e ||
                  (e.DocumentTouch && t instanceof e.DocumentTouch)
                ),
                pointerEvents:
                  !!e.PointerEvent &&
                  "maxTouchPoints" in e.navigator &&
                  e.navigator.maxTouchPoints >= 0,
                observer:
                  "MutationObserver" in e || "WebkitMutationObserver" in e,
                passiveListener: (function () {
                  var t = !1;
                  try {
                    var n = Object.defineProperty({}, "passive", {
                      get: function () {
                        t = !0;
                      },
                    });
                    e.addEventListener("testPassiveListener", null, n);
                  } catch (s) {}
                  return t;
                })(),
                gestures: "ongesturestart" in e,
              };
            })()),
          Ec
        );
      }
      function Nc(e) {
        return (
          void 0 === e && (e = {}),
          Tc ||
            (Tc = (function (e) {
              var t = (void 0 === e ? {} : e).userAgent,
                n = Rc(),
                s = hc(),
                i = s.navigator.platform,
                r = t || s.navigator.userAgent,
                o = { ios: !1, android: !1 },
                a = s.screen.width,
                l = s.screen.height,
                c = r.match(/(Android);?[\s\/]+([\d.]+)?/),
                u = r.match(/(iPad).*OS\s([\d_]+)/),
                d = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                h = !u && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                p = "Win32" === i,
                f = "MacIntel" === i;
              return (
                !u &&
                  f &&
                  n.touch &&
                  [
                    "1024x1366",
                    "1366x1024",
                    "834x1194",
                    "1194x834",
                    "834x1112",
                    "1112x834",
                    "768x1024",
                    "1024x768",
                    "820x1180",
                    "1180x820",
                    "810x1080",
                    "1080x810",
                  ].indexOf(a + "x" + l) >= 0 &&
                  ((u = r.match(/(Version)\/([\d.]+)/)) ||
                    (u = [0, 1, "13_0_0"]),
                  (f = !1)),
                c && !p && ((o.os = "android"), (o.android = !0)),
                (u || h || d) && ((o.os = "ios"), (o.ios = !0)),
                o
              );
            })(e)),
          Tc
        );
      }
      function Lc() {
        return (
          kc ||
            (kc = (function () {
              var e,
                t = hc();
              return {
                isEdge: !!t.navigator.userAgent.match(/Edge/g),
                isSafari:
                  ((e = t.navigator.userAgent.toLowerCase()),
                  e.indexOf("safari") >= 0 &&
                    e.indexOf("chrome") < 0 &&
                    e.indexOf("android") < 0),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                  t.navigator.userAgent
                ),
              };
            })()),
          kc
        );
      }
      var Vc = {
        name: "resize",
        create: function () {
          var e = this;
          Ac(e, {
            resize: {
              observer: null,
              createObserver: function () {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  ((e.resize.observer = new ResizeObserver(function (t) {
                    var n = e.width,
                      s = e.height,
                      i = n,
                      r = s;
                    t.forEach(function (t) {
                      var n = t.contentBoxSize,
                        s = t.contentRect,
                        o = t.target;
                      (o && o !== e.el) ||
                        ((i = s ? s.width : (n[0] || n).inlineSize),
                        (r = s ? s.height : (n[0] || n).blockSize));
                    }),
                      (i === n && r === s) || e.resize.resizeHandler();
                  })),
                  e.resize.observer.observe(e.el));
              },
              removeObserver: function () {
                e.resize.observer &&
                  e.resize.observer.unobserve &&
                  e.el &&
                  (e.resize.observer.unobserve(e.el),
                  (e.resize.observer = null));
              },
              resizeHandler: function () {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  (e.emit("beforeResize"), e.emit("resize"));
              },
              orientationChangeHandler: function () {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  e.emit("orientationchange");
              },
            },
          });
        },
        on: {
          init: function (e) {
            var t = hc();
            e.params.resizeObserver && void 0 !== hc().ResizeObserver
              ? e.resize.createObserver()
              : (t.addEventListener("resize", e.resize.resizeHandler),
                t.addEventListener(
                  "orientationchange",
                  e.resize.orientationChangeHandler
                ));
          },
          destroy: function (e) {
            var t = hc();
            e.resize.removeObserver(),
              t.removeEventListener("resize", e.resize.resizeHandler),
              t.removeEventListener(
                "orientationchange",
                e.resize.orientationChangeHandler
              );
          },
        },
      };
      function jc() {
        return (jc =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var s in n)
                Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
            }
            return e;
          }).apply(this, arguments);
      }
      var zc = {
          attach: function (e, t) {
            void 0 === t && (t = {});
            var n = hc(),
              s = this,
              i = new (n.MutationObserver || n.WebkitMutationObserver)(
                function (e) {
                  if (1 !== e.length) {
                    var t = function () {
                      s.emit("observerUpdate", e[0]);
                    };
                    n.requestAnimationFrame
                      ? n.requestAnimationFrame(t)
                      : n.setTimeout(t, 0);
                  } else s.emit("observerUpdate", e[0]);
                }
              );
            i.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              s.observer.observers.push(i);
          },
          init: function () {
            var e = this;
            if (e.support.observer && e.params.observer) {
              if (e.params.observeParents)
                for (var t = e.$el.parents(), n = 0; n < t.length; n += 1)
                  e.observer.attach(t[n]);
              e.observer.attach(e.$el[0], {
                childList: e.params.observeSlideChildren,
              }),
                e.observer.attach(e.$wrapperEl[0], { attributes: !1 });
            }
          },
          destroy: function () {
            this.observer.observers.forEach(function (e) {
              e.disconnect();
            }),
              (this.observer.observers = []);
          },
        },
        Fc = {
          name: "observer",
          params: {
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1,
          },
          create: function () {
            Dc(this, { observer: jc({}, zc, { observers: [] }) });
          },
          on: {
            init: function (e) {
              e.observer.init();
            },
            destroy: function (e) {
              e.observer.destroy();
            },
          },
        };
      function Hc(e) {
        var t = this,
          n = uc(),
          s = hc(),
          i = t.touchEventsData,
          r = t.params,
          o = t.touches;
        if (!t.animating || !r.preventInteractionOnTransition) {
          var a = e;
          a.originalEvent && (a = a.originalEvent);
          var l = Ic(a.target);
          if (
            ("wrapper" !== r.touchEventsTarget ||
              l.closest(t.wrapperEl).length) &&
            ((i.isTouchEvent = "touchstart" === a.type),
            (i.isTouchEvent || !("which" in a) || 3 !== a.which) &&
              !(
                (!i.isTouchEvent && "button" in a && a.button > 0) ||
                (i.isTouched && i.isMoved)
              ))
          )
            if (
              (!!r.noSwipingClass &&
                "" !== r.noSwipingClass &&
                a.target &&
                a.target.shadowRoot &&
                e.path &&
                e.path[0] &&
                (l = Ic(e.path[0])),
              r.noSwiping &&
                l.closest(
                  r.noSwipingSelector
                    ? r.noSwipingSelector
                    : "." + r.noSwipingClass
                )[0])
            )
              t.allowClick = !0;
            else if (!r.swipeHandler || l.closest(r.swipeHandler)[0]) {
              (o.currentX =
                "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX),
                (o.currentY =
                  "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY);
              var c = o.currentX,
                u = o.currentY,
                d = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
                h = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
              if (d && (c <= h || c >= s.innerWidth - h)) {
                if ("prevent" !== d) return;
                e.preventDefault();
              }
              if (
                (Ac(i, {
                  isTouched: !0,
                  isMoved: !1,
                  allowTouchCallbacks: !0,
                  isScrolling: void 0,
                  startMoving: void 0,
                }),
                (o.startX = c),
                (o.startY = u),
                (i.touchStartTime = Oc()),
                (t.allowClick = !0),
                t.updateSize(),
                (t.swipeDirection = void 0),
                r.threshold > 0 && (i.allowThresholdMove = !1),
                "touchstart" !== a.type)
              ) {
                var p = !0;
                l.is(i.formElements) && (p = !1),
                  n.activeElement &&
                    Ic(n.activeElement).is(i.formElements) &&
                    n.activeElement !== l[0] &&
                    n.activeElement.blur(),
                  (!r.touchStartForcePreventDefault &&
                    !(p && t.allowTouchMove && r.touchStartPreventDefault)) ||
                    l[0].isContentEditable ||
                    a.preventDefault();
              }
              t.emit("touchStart", a);
            }
        }
      }
      function Bc(e) {
        var t = uc(),
          n = this,
          s = n.touchEventsData,
          i = n.params,
          r = n.touches,
          o = n.rtlTranslate,
          a = e;
        if ((a.originalEvent && (a = a.originalEvent), s.isTouched)) {
          if (!s.isTouchEvent || "touchmove" === a.type) {
            var l =
                "touchmove" === a.type &&
                a.targetTouches &&
                (a.targetTouches[0] || a.changedTouches[0]),
              c = "touchmove" === a.type ? l.pageX : a.pageX,
              u = "touchmove" === a.type ? l.pageY : a.pageY;
            if (a.preventedByNestedSwiper)
              return (r.startX = c), void (r.startY = u);
            if (!n.allowTouchMove)
              return (
                (n.allowClick = !1),
                void (
                  s.isTouched &&
                  (Ac(r, { startX: c, startY: u, currentX: c, currentY: u }),
                  (s.touchStartTime = Oc()))
                )
              );
            if (s.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
              if (n.isVertical()) {
                if (
                  (u < r.startY && n.translate <= n.maxTranslate()) ||
                  (u > r.startY && n.translate >= n.minTranslate())
                )
                  return (s.isTouched = !1), void (s.isMoved = !1);
              } else if (
                (c < r.startX && n.translate <= n.maxTranslate()) ||
                (c > r.startX && n.translate >= n.minTranslate())
              )
                return;
            if (
              s.isTouchEvent &&
              t.activeElement &&
              a.target === t.activeElement &&
              Ic(a.target).is(s.formElements)
            )
              return (s.isMoved = !0), void (n.allowClick = !1);
            if (
              (s.allowTouchCallbacks && n.emit("touchMove", a),
              !(a.targetTouches && a.targetTouches.length > 1))
            ) {
              (r.currentX = c), (r.currentY = u);
              var d,
                h = r.currentX - r.startX,
                p = r.currentY - r.startY;
              if (
                !(
                  n.params.threshold &&
                  Math.sqrt(Math.pow(h, 2) + Math.pow(p, 2)) <
                    n.params.threshold
                )
              )
                if (
                  (void 0 === s.isScrolling &&
                    ((n.isHorizontal() && r.currentY === r.startY) ||
                    (n.isVertical() && r.currentX === r.startX)
                      ? (s.isScrolling = !1)
                      : h * h + p * p >= 25 &&
                        ((d =
                          (180 * Math.atan2(Math.abs(p), Math.abs(h))) /
                          Math.PI),
                        (s.isScrolling = n.isHorizontal()
                          ? d > i.touchAngle
                          : 90 - d > i.touchAngle))),
                  s.isScrolling && n.emit("touchMoveOpposite", a),
                  void 0 === s.startMoving &&
                    ((r.currentX === r.startX && r.currentY === r.startY) ||
                      (s.startMoving = !0)),
                  s.isScrolling)
                )
                  s.isTouched = !1;
                else if (s.startMoving) {
                  (n.allowClick = !1),
                    !i.cssMode && a.cancelable && a.preventDefault(),
                    i.touchMoveStopPropagation &&
                      !i.nested &&
                      a.stopPropagation(),
                    s.isMoved ||
                      (i.loop && n.loopFix(),
                      (s.startTranslate = n.getTranslate()),
                      n.setTransition(0),
                      n.animating &&
                        n.$wrapperEl.trigger(
                          "webkitTransitionEnd transitionend"
                        ),
                      (s.allowMomentumBounce = !1),
                      !i.grabCursor ||
                        (!0 !== n.allowSlideNext && !0 !== n.allowSlidePrev) ||
                        n.setGrabCursor(!0),
                      n.emit("sliderFirstMove", a)),
                    n.emit("sliderMove", a),
                    (s.isMoved = !0);
                  var f = n.isHorizontal() ? h : p;
                  (r.diff = f),
                    (f *= i.touchRatio),
                    o && (f = -f),
                    (n.swipeDirection = f > 0 ? "prev" : "next"),
                    (s.currentTranslate = f + s.startTranslate);
                  var g = !0,
                    v = i.resistanceRatio;
                  if (
                    (i.touchReleaseOnEdges && (v = 0),
                    f > 0 && s.currentTranslate > n.minTranslate()
                      ? ((g = !1),
                        i.resistance &&
                          (s.currentTranslate =
                            n.minTranslate() -
                            1 +
                            Math.pow(
                              -n.minTranslate() + s.startTranslate + f,
                              v
                            )))
                      : f < 0 &&
                        s.currentTranslate < n.maxTranslate() &&
                        ((g = !1),
                        i.resistance &&
                          (s.currentTranslate =
                            n.maxTranslate() +
                            1 -
                            Math.pow(
                              n.maxTranslate() - s.startTranslate - f,
                              v
                            ))),
                    g && (a.preventedByNestedSwiper = !0),
                    !n.allowSlideNext &&
                      "next" === n.swipeDirection &&
                      s.currentTranslate < s.startTranslate &&
                      (s.currentTranslate = s.startTranslate),
                    !n.allowSlidePrev &&
                      "prev" === n.swipeDirection &&
                      s.currentTranslate > s.startTranslate &&
                      (s.currentTranslate = s.startTranslate),
                    n.allowSlidePrev ||
                      n.allowSlideNext ||
                      (s.currentTranslate = s.startTranslate),
                    i.threshold > 0)
                  ) {
                    if (!(Math.abs(f) > i.threshold || s.allowThresholdMove))
                      return void (s.currentTranslate = s.startTranslate);
                    if (!s.allowThresholdMove)
                      return (
                        (s.allowThresholdMove = !0),
                        (r.startX = r.currentX),
                        (r.startY = r.currentY),
                        (s.currentTranslate = s.startTranslate),
                        void (r.diff = n.isHorizontal()
                          ? r.currentX - r.startX
                          : r.currentY - r.startY)
                      );
                  }
                  i.followFinger &&
                    !i.cssMode &&
                    ((i.freeMode ||
                      i.watchSlidesProgress ||
                      i.watchSlidesVisibility) &&
                      (n.updateActiveIndex(), n.updateSlidesClasses()),
                    i.freeMode &&
                      (0 === s.velocities.length &&
                        s.velocities.push({
                          position: r[n.isHorizontal() ? "startX" : "startY"],
                          time: s.touchStartTime,
                        }),
                      s.velocities.push({
                        position: r[n.isHorizontal() ? "currentX" : "currentY"],
                        time: Oc(),
                      })),
                    n.updateProgress(s.currentTranslate),
                    n.setTranslate(s.currentTranslate));
                }
            }
          }
        } else s.startMoving && s.isScrolling && n.emit("touchMoveOpposite", a);
      }
      function $c(e) {
        var t = this,
          n = t.touchEventsData,
          s = t.params,
          i = t.touches,
          r = t.rtlTranslate,
          o = t.$wrapperEl,
          a = t.slidesGrid,
          l = t.snapGrid,
          c = e;
        if (
          (c.originalEvent && (c = c.originalEvent),
          n.allowTouchCallbacks && t.emit("touchEnd", c),
          (n.allowTouchCallbacks = !1),
          !n.isTouched)
        )
          return (
            n.isMoved && s.grabCursor && t.setGrabCursor(!1),
            (n.isMoved = !1),
            void (n.startMoving = !1)
          );
        s.grabCursor &&
          n.isMoved &&
          n.isTouched &&
          (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
          t.setGrabCursor(!1);
        var u,
          d = Oc(),
          h = d - n.touchStartTime;
        if (
          (t.allowClick &&
            (t.updateClickedSlide(c),
            t.emit("tap click", c),
            h < 300 &&
              d - n.lastClickTime < 300 &&
              t.emit("doubleTap doubleClick", c)),
          (n.lastClickTime = Oc()),
          Mc(function () {
            t.destroyed || (t.allowClick = !0);
          }),
          !n.isTouched ||
            !n.isMoved ||
            !t.swipeDirection ||
            0 === i.diff ||
            n.currentTranslate === n.startTranslate)
        )
          return (
            (n.isTouched = !1), (n.isMoved = !1), void (n.startMoving = !1)
          );
        if (
          ((n.isTouched = !1),
          (n.isMoved = !1),
          (n.startMoving = !1),
          (u = s.followFinger
            ? r
              ? t.translate
              : -t.translate
            : -n.currentTranslate),
          !s.cssMode)
        )
          if (s.freeMode) {
            if (u < -t.minTranslate()) return void t.slideTo(t.activeIndex);
            if (u > -t.maxTranslate())
              return void t.slideTo(
                t.slides.length < l.length ? l.length - 1 : t.slides.length - 1
              );
            if (s.freeModeMomentum) {
              if (n.velocities.length > 1) {
                var p = n.velocities.pop(),
                  f = n.velocities.pop(),
                  g = p.time - f.time;
                (t.velocity = (p.position - f.position) / g),
                  (t.velocity /= 2),
                  Math.abs(t.velocity) < s.freeModeMinimumVelocity &&
                    (t.velocity = 0),
                  (g > 150 || Oc() - p.time > 300) && (t.velocity = 0);
              } else t.velocity = 0;
              (t.velocity *= s.freeModeMomentumVelocityRatio),
                (n.velocities.length = 0);
              var v = 1e3 * s.freeModeMomentumRatio,
                m = t.translate + t.velocity * v;
              r && (m = -m);
              var y,
                w,
                _ = !1,
                b = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
              if (m < t.maxTranslate())
                s.freeModeMomentumBounce
                  ? (m + t.maxTranslate() < -b && (m = t.maxTranslate() - b),
                    (y = t.maxTranslate()),
                    (_ = !0),
                    (n.allowMomentumBounce = !0))
                  : (m = t.maxTranslate()),
                  s.loop && s.centeredSlides && (w = !0);
              else if (m > t.minTranslate())
                s.freeModeMomentumBounce
                  ? (m - t.minTranslate() > b && (m = t.minTranslate() + b),
                    (y = t.minTranslate()),
                    (_ = !0),
                    (n.allowMomentumBounce = !0))
                  : (m = t.minTranslate()),
                  s.loop && s.centeredSlides && (w = !0);
              else if (s.freeModeSticky) {
                for (var C, x = 0; x < l.length; x += 1)
                  if (l[x] > -m) {
                    C = x;
                    break;
                  }
                m = -(m =
                  Math.abs(l[C] - m) < Math.abs(l[C - 1] - m) ||
                  "next" === t.swipeDirection
                    ? l[C]
                    : l[C - 1]);
              }
              if (
                (w &&
                  t.once("transitionEnd", function () {
                    t.loopFix();
                  }),
                0 !== t.velocity)
              ) {
                if (
                  ((v = r
                    ? Math.abs((-m - t.translate) / t.velocity)
                    : Math.abs((m - t.translate) / t.velocity)),
                  s.freeModeSticky)
                ) {
                  var S = Math.abs((r ? -m : m) - t.translate),
                    E = t.slidesSizesGrid[t.activeIndex];
                  v =
                    S < E ? s.speed : S < 2 * E ? 1.5 * s.speed : 2.5 * s.speed;
                }
              } else if (s.freeModeSticky) return void t.slideToClosest();
              s.freeModeMomentumBounce && _
                ? (t.updateProgress(y),
                  t.setTransition(v),
                  t.setTranslate(m),
                  t.transitionStart(!0, t.swipeDirection),
                  (t.animating = !0),
                  o.transitionEnd(function () {
                    t &&
                      !t.destroyed &&
                      n.allowMomentumBounce &&
                      (t.emit("momentumBounce"),
                      t.setTransition(s.speed),
                      setTimeout(function () {
                        t.setTranslate(y),
                          o.transitionEnd(function () {
                            t && !t.destroyed && t.transitionEnd();
                          });
                      }, 0));
                  }))
                : t.velocity
                ? (t.updateProgress(m),
                  t.setTransition(v),
                  t.setTranslate(m),
                  t.transitionStart(!0, t.swipeDirection),
                  t.animating ||
                    ((t.animating = !0),
                    o.transitionEnd(function () {
                      t && !t.destroyed && t.transitionEnd();
                    })))
                : (t.emit("_freeModeNoMomentumRelease"), t.updateProgress(m)),
                t.updateActiveIndex(),
                t.updateSlidesClasses();
            } else {
              if (s.freeModeSticky) return void t.slideToClosest();
              s.freeMode && t.emit("_freeModeNoMomentumRelease");
            }
            (!s.freeModeMomentum || h >= s.longSwipesMs) &&
              (t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses());
          } else {
            for (
              var T = 0, k = t.slidesSizesGrid[0], I = 0;
              I < a.length;
              I += I < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
            ) {
              var M = I < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
              void 0 !== a[I + M]
                ? u >= a[I] && u < a[I + M] && ((T = I), (k = a[I + M] - a[I]))
                : u >= a[I] &&
                  ((T = I), (k = a[a.length - 1] - a[a.length - 2]));
            }
            var O = (u - a[T]) / k,
              P = T < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
            if (h > s.longSwipesMs) {
              if (!s.longSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection &&
                t.slideTo(O >= s.longSwipesRatio ? T + P : T),
                "prev" === t.swipeDirection &&
                  t.slideTo(O > 1 - s.longSwipesRatio ? T + P : T);
            } else {
              if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
              !t.navigation ||
              (c.target !== t.navigation.nextEl &&
                c.target !== t.navigation.prevEl)
                ? ("next" === t.swipeDirection && t.slideTo(T + P),
                  "prev" === t.swipeDirection && t.slideTo(T))
                : t.slideTo(c.target === t.navigation.nextEl ? T + P : T);
            }
          }
      }
      function Gc() {
        var e = this,
          t = e.params,
          n = e.el;
        if (!n || 0 !== n.offsetWidth) {
          t.breakpoints && e.setBreakpoint();
          var s = e.allowSlideNext,
            i = e.allowSlidePrev,
            r = e.snapGrid;
          (e.allowSlideNext = !0),
            (e.allowSlidePrev = !0),
            e.updateSize(),
            e.updateSlides(),
            e.updateSlidesClasses(),
            e.slideTo(
              ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
                e.isEnd &&
                !e.isBeginning &&
                !e.params.centeredSlides
                ? e.slides.length - 1
                : e.activeIndex,
              0,
              !1,
              !0
            ),
            e.autoplay &&
              e.autoplay.running &&
              e.autoplay.paused &&
              e.autoplay.run(),
            (e.allowSlidePrev = i),
            (e.allowSlideNext = s),
            e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
        }
      }
      function qc(e) {
        var t = this;
        t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation()));
      }
      function Wc() {
        var e = this,
          t = e.wrapperEl,
          n = e.rtlTranslate;
        (e.previousTranslate = e.translate),
          (e.translate = e.isHorizontal()
            ? n
              ? t.scrollWidth - t.offsetWidth - t.scrollLeft
              : -t.scrollLeft
            : -t.scrollTop),
          -0 === e.translate && (e.translate = 0),
          e.updateActiveIndex(),
          e.updateSlidesClasses();
        var s = e.maxTranslate() - e.minTranslate();
        (0 === s ? 0 : (e.translate - e.minTranslate()) / s) !== e.progress &&
          e.updateProgress(n ? -e.translate : e.translate),
          e.emit("setTranslate", e.translate, !1);
      }
      var Zc = !1;
      function Uc() {}
      var Yc = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !1,
        nested: !1,
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: 0.02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1,
      };
      function Qc(e, t) {
        for (var n = 0; n < t.length; n++) {
          var s = t[n];
          (s.enumerable = s.enumerable || !1),
            (s.configurable = !0),
            "value" in s && (s.writable = !0),
            Object.defineProperty(e, s.key, s);
        }
      }
      var Xc = {
          modular: {
            useParams: function (e) {
              var t = this;
              t.modules &&
                Object.keys(t.modules).forEach(function (n) {
                  var s = t.modules[n];
                  s.params && Ac(e, s.params);
                });
            },
            useModules: function (e) {
              void 0 === e && (e = {});
              var t = this;
              t.modules &&
                Object.keys(t.modules).forEach(function (n) {
                  var s = t.modules[n],
                    i = e[n] || {};
                  s.on &&
                    t.on &&
                    Object.keys(s.on).forEach(function (e) {
                      t.on(e, s.on[e]);
                    }),
                    s.create && s.create.bind(t)(i);
                });
            },
          },
          eventsEmitter: {
            on: function (e, t, n) {
              var s = this;
              if ("function" != typeof t) return s;
              var i = n ? "unshift" : "push";
              return (
                e.split(" ").forEach(function (e) {
                  s.eventsListeners[e] || (s.eventsListeners[e] = []),
                    s.eventsListeners[e][i](t);
                }),
                s
              );
            },
            once: function (e, t, n) {
              var s = this;
              if ("function" != typeof t) return s;
              function i() {
                s.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
                for (
                  var n = arguments.length, r = new Array(n), o = 0;
                  o < n;
                  o++
                )
                  r[o] = arguments[o];
                t.apply(s, r);
              }
              return (i.__emitterProxy = t), s.on(e, i, n);
            },
            onAny: function (e, t) {
              var n = this;
              if ("function" != typeof e) return n;
              var s = t ? "unshift" : "push";
              return (
                n.eventsAnyListeners.indexOf(e) < 0 &&
                  n.eventsAnyListeners[s](e),
                n
              );
            },
            offAny: function (e) {
              var t = this;
              if (!t.eventsAnyListeners) return t;
              var n = t.eventsAnyListeners.indexOf(e);
              return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
            },
            off: function (e, t) {
              var n = this;
              return n.eventsListeners
                ? (e.split(" ").forEach(function (e) {
                    void 0 === t
                      ? (n.eventsListeners[e] = [])
                      : n.eventsListeners[e] &&
                        n.eventsListeners[e].forEach(function (s, i) {
                          (s === t ||
                            (s.__emitterProxy && s.__emitterProxy === t)) &&
                            n.eventsListeners[e].splice(i, 1);
                        });
                  }),
                  n)
                : n;
            },
            emit: function () {
              var e,
                t,
                n,
                s = this;
              if (!s.eventsListeners) return s;
              for (
                var i = arguments.length, r = new Array(i), o = 0;
                o < i;
                o++
              )
                r[o] = arguments[o];
              "string" == typeof r[0] || Array.isArray(r[0])
                ? ((e = r[0]), (t = r.slice(1, r.length)), (n = s))
                : ((e = r[0].events), (t = r[0].data), (n = r[0].context || s)),
                t.unshift(n);
              var a = Array.isArray(e) ? e : e.split(" ");
              return (
                a.forEach(function (e) {
                  s.eventsAnyListeners &&
                    s.eventsAnyListeners.length &&
                    s.eventsAnyListeners.forEach(function (s) {
                      s.apply(n, [e].concat(t));
                    }),
                    s.eventsListeners &&
                      s.eventsListeners[e] &&
                      s.eventsListeners[e].forEach(function (e) {
                        e.apply(n, t);
                      });
                }),
                s
              );
            },
          },
          update: {
            updateSize: function () {
              var e,
                t,
                n = this,
                s = n.$el;
              (t =
                null != n.params.height ? n.params.height : s[0].clientHeight),
                (0 ===
                  (e =
                    null != n.params.width
                      ? n.params.width
                      : s[0].clientWidth) &&
                  n.isHorizontal()) ||
                  (0 === t && n.isVertical()) ||
                  ((e =
                    e -
                    parseInt(s.css("padding-left") || 0, 10) -
                    parseInt(s.css("padding-right") || 0, 10)),
                  (t =
                    t -
                    parseInt(s.css("padding-top") || 0, 10) -
                    parseInt(s.css("padding-bottom") || 0, 10)),
                  Number.isNaN(e) && (e = 0),
                  Number.isNaN(t) && (t = 0),
                  Ac(n, {
                    width: e,
                    height: t,
                    size: n.isHorizontal() ? e : t,
                  }));
            },
            updateSlides: function () {
              var e = this,
                t = function (t) {
                  return e.isHorizontal()
                    ? t
                    : {
                        width: "height",
                        "margin-top": "margin-left",
                        "margin-bottom ": "margin-right",
                        "margin-left": "margin-top",
                        "margin-right": "margin-bottom",
                        "padding-left": "padding-top",
                        "padding-right": "padding-bottom",
                        marginRight: "marginBottom",
                      }[t];
                },
                n = function (e, n) {
                  return parseFloat(e.getPropertyValue(t(n)) || 0);
                },
                s = hc(),
                i = e.params,
                r = e.$wrapperEl,
                o = e.size,
                a = e.rtlTranslate,
                l = e.wrongRTL,
                c = e.virtual && i.virtual.enabled,
                u = c ? e.virtual.slides.length : e.slides.length,
                d = r.children("." + e.params.slideClass),
                h = c ? e.virtual.slides.length : d.length,
                p = [],
                f = [],
                g = [],
                v = i.slidesOffsetBefore;
              "function" == typeof v && (v = i.slidesOffsetBefore.call(e));
              var m = i.slidesOffsetAfter;
              "function" == typeof m && (m = i.slidesOffsetAfter.call(e));
              var y = e.snapGrid.length,
                w = e.slidesGrid.length,
                _ = i.spaceBetween,
                b = -v,
                C = 0,
                x = 0;
              if (void 0 !== o) {
                var S, E;
                "string" == typeof _ &&
                  _.indexOf("%") >= 0 &&
                  (_ = (parseFloat(_.replace("%", "")) / 100) * o),
                  (e.virtualSize = -_),
                  d.css(
                    a
                      ? { marginLeft: "", marginTop: "" }
                      : { marginRight: "", marginBottom: "" }
                  ),
                  i.slidesPerColumn > 1 &&
                    ((S =
                      Math.floor(h / i.slidesPerColumn) ===
                      h / e.params.slidesPerColumn
                        ? h
                        : Math.ceil(h / i.slidesPerColumn) * i.slidesPerColumn),
                    "auto" !== i.slidesPerView &&
                      "row" === i.slidesPerColumnFill &&
                      (S = Math.max(S, i.slidesPerView * i.slidesPerColumn)));
                for (
                  var T,
                    k,
                    I,
                    M = i.slidesPerColumn,
                    O = S / M,
                    P = Math.floor(h / i.slidesPerColumn),
                    A = 0;
                  A < h;
                  A += 1
                ) {
                  E = 0;
                  var D = d.eq(A);
                  if (i.slidesPerColumn > 1) {
                    var R = void 0,
                      N = void 0,
                      L = void 0;
                    if (
                      "row" === i.slidesPerColumnFill &&
                      i.slidesPerGroup > 1
                    ) {
                      var V = Math.floor(
                          A / (i.slidesPerGroup * i.slidesPerColumn)
                        ),
                        j = A - i.slidesPerColumn * i.slidesPerGroup * V,
                        z =
                          0 === V
                            ? i.slidesPerGroup
                            : Math.min(
                                Math.ceil((h - V * M * i.slidesPerGroup) / M),
                                i.slidesPerGroup
                              );
                      (L = Math.floor(j / z)),
                        D.css({
                          "-webkit-box-ordinal-group": (R =
                            (N = j - L * z + V * i.slidesPerGroup) +
                            (L * S) / M),
                          "-moz-box-ordinal-group": R,
                          "-ms-flex-order": R,
                          "-webkit-order": R,
                          order: R,
                        });
                    } else
                      "column" === i.slidesPerColumnFill
                        ? ((L = A - (N = Math.floor(A / M)) * M),
                          (N > P || (N === P && L === M - 1)) &&
                            (L += 1) >= M &&
                            ((L = 0), (N += 1)))
                        : (N = A - (L = Math.floor(A / O)) * O);
                    D.css(
                      t("margin-top"),
                      0 !== L && i.spaceBetween && i.spaceBetween + "px"
                    );
                  }
                  if ("none" !== D.css("display")) {
                    if ("auto" === i.slidesPerView) {
                      var F = s.getComputedStyle(D[0], null),
                        H = D[0].style.transform,
                        B = D[0].style.webkitTransform;
                      if (
                        (H && (D[0].style.transform = "none"),
                        B && (D[0].style.webkitTransform = "none"),
                        i.roundLengths)
                      )
                        E = e.isHorizontal()
                          ? D.outerWidth(!0)
                          : D.outerHeight(!0);
                      else {
                        var $ = n(F, "width"),
                          G = n(F, "padding-left"),
                          q = n(F, "padding-right"),
                          W = n(F, "margin-left"),
                          Z = n(F, "margin-right"),
                          U = F.getPropertyValue(F, "box-sizing");
                        if (U && "border-box" === U) E = $ + W + Z;
                        else {
                          var Y = D[0];
                          E =
                            $ + G + q + W + Z + (Y.offsetWidth - Y.clientWidth);
                        }
                      }
                      H && (D[0].style.transform = H),
                        B && (D[0].style.webkitTransform = B),
                        i.roundLengths && (E = Math.floor(E));
                    } else
                      (E = (o - (i.slidesPerView - 1) * _) / i.slidesPerView),
                        i.roundLengths && (E = Math.floor(E)),
                        d[A] && (d[A].style[t("width")] = E + "px");
                    d[A] && (d[A].swiperSlideSize = E),
                      g.push(E),
                      i.centeredSlides
                        ? ((b = b + E / 2 + C / 2 + _),
                          0 === C && 0 !== A && (b = b - o / 2 - _),
                          0 === A && (b = b - o / 2 - _),
                          Math.abs(b) < 0.001 && (b = 0),
                          i.roundLengths && (b = Math.floor(b)),
                          x % i.slidesPerGroup == 0 && p.push(b),
                          f.push(b))
                        : (i.roundLengths && (b = Math.floor(b)),
                          (x - Math.min(e.params.slidesPerGroupSkip, x)) %
                            e.params.slidesPerGroup ==
                            0 && p.push(b),
                          f.push(b),
                          (b = b + E + _)),
                      (e.virtualSize += E + _),
                      (C = E),
                      (x += 1);
                  }
                }
                if (
                  ((e.virtualSize = Math.max(e.virtualSize, o) + m),
                  a &&
                    l &&
                    ("slide" === i.effect || "coverflow" === i.effect) &&
                    r.css({ width: e.virtualSize + i.spaceBetween + "px" }),
                  i.setWrapperSize &&
                    r.css(
                      (((k = {})[t("width")] =
                        e.virtualSize + i.spaceBetween + "px"),
                      k)
                    ),
                  i.slidesPerColumn > 1 &&
                    ((e.virtualSize = (E + i.spaceBetween) * S),
                    (e.virtualSize =
                      Math.ceil(e.virtualSize / i.slidesPerColumn) -
                      i.spaceBetween),
                    r.css(
                      (((I = {})[t("width")] =
                        e.virtualSize + i.spaceBetween + "px"),
                      I)
                    ),
                    i.centeredSlides))
                ) {
                  T = [];
                  for (var Q = 0; Q < p.length; Q += 1) {
                    var X = p[Q];
                    i.roundLengths && (X = Math.floor(X)),
                      p[Q] < e.virtualSize + p[0] && T.push(X);
                  }
                  p = T;
                }
                if (!i.centeredSlides) {
                  T = [];
                  for (var K = 0; K < p.length; K += 1) {
                    var J = p[K];
                    i.roundLengths && (J = Math.floor(J)),
                      p[K] <= e.virtualSize - o && T.push(J);
                  }
                  (p = T),
                    Math.floor(e.virtualSize - o) -
                      Math.floor(p[p.length - 1]) >
                      1 && p.push(e.virtualSize - o);
                }
                if ((0 === p.length && (p = [0]), 0 !== i.spaceBetween)) {
                  var ee,
                    te =
                      e.isHorizontal() && a ? "marginLeft" : t("marginRight");
                  d.filter(function (e, t) {
                    return !i.cssMode || t !== d.length - 1;
                  }).css((((ee = {})[te] = _ + "px"), ee));
                }
                if (i.centeredSlides && i.centeredSlidesBounds) {
                  var ne = 0;
                  g.forEach(function (e) {
                    ne += e + (i.spaceBetween ? i.spaceBetween : 0);
                  });
                  var se = (ne -= i.spaceBetween) - o;
                  p = p.map(function (e) {
                    return e < 0 ? -v : e > se ? se + m : e;
                  });
                }
                if (i.centerInsufficientSlides) {
                  var ie = 0;
                  if (
                    (g.forEach(function (e) {
                      ie += e + (i.spaceBetween ? i.spaceBetween : 0);
                    }),
                    (ie -= i.spaceBetween) < o)
                  ) {
                    var re = (o - ie) / 2;
                    p.forEach(function (e, t) {
                      p[t] = e - re;
                    }),
                      f.forEach(function (e, t) {
                        f[t] = e + re;
                      });
                  }
                }
                Ac(e, {
                  slides: d,
                  snapGrid: p,
                  slidesGrid: f,
                  slidesSizesGrid: g,
                }),
                  h !== u && e.emit("slidesLengthChange"),
                  p.length !== y &&
                    (e.params.watchOverflow && e.checkOverflow(),
                    e.emit("snapGridLengthChange")),
                  f.length !== w && e.emit("slidesGridLengthChange"),
                  (i.watchSlidesProgress || i.watchSlidesVisibility) &&
                    e.updateSlidesOffset();
              }
            },
            updateAutoHeight: function (e) {
              var t,
                n = this,
                s = [],
                i = 0;
              if (
                ("number" == typeof e
                  ? n.setTransition(e)
                  : !0 === e && n.setTransition(n.params.speed),
                "auto" !== n.params.slidesPerView && n.params.slidesPerView > 1)
              )
                if (n.params.centeredSlides)
                  n.visibleSlides.each(function (e) {
                    s.push(e);
                  });
                else
                  for (t = 0; t < Math.ceil(n.params.slidesPerView); t += 1) {
                    var r = n.activeIndex + t;
                    if (r > n.slides.length) break;
                    s.push(n.slides.eq(r)[0]);
                  }
              else s.push(n.slides.eq(n.activeIndex)[0]);
              for (t = 0; t < s.length; t += 1)
                if (void 0 !== s[t]) {
                  var o = s[t].offsetHeight;
                  i = o > i ? o : i;
                }
              i && n.$wrapperEl.css("height", i + "px");
            },
            updateSlidesOffset: function () {
              for (var e = this.slides, t = 0; t < e.length; t += 1)
                e[t].swiperSlideOffset = this.isHorizontal()
                  ? e[t].offsetLeft
                  : e[t].offsetTop;
            },
            updateSlidesProgress: function (e) {
              void 0 === e && (e = (this && this.translate) || 0);
              var t = this,
                n = t.params,
                s = t.slides,
                i = t.rtlTranslate;
              if (0 !== s.length) {
                void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
                var r = -e;
                i && (r = e),
                  s.removeClass(n.slideVisibleClass),
                  (t.visibleSlidesIndexes = []),
                  (t.visibleSlides = []);
                for (var o = 0; o < s.length; o += 1) {
                  var a = s[o],
                    l =
                      (r +
                        (n.centeredSlides ? t.minTranslate() : 0) -
                        a.swiperSlideOffset) /
                      (a.swiperSlideSize + n.spaceBetween);
                  if (
                    n.watchSlidesVisibility ||
                    (n.centeredSlides && n.autoHeight)
                  ) {
                    var c = -(r - a.swiperSlideOffset),
                      u = c + t.slidesSizesGrid[o];
                    ((c >= 0 && c < t.size - 1) ||
                      (u > 1 && u <= t.size) ||
                      (c <= 0 && u >= t.size)) &&
                      (t.visibleSlides.push(a),
                      t.visibleSlidesIndexes.push(o),
                      s.eq(o).addClass(n.slideVisibleClass));
                  }
                  a.progress = i ? -l : l;
                }
                t.visibleSlides = Ic(t.visibleSlides);
              }
            },
            updateProgress: function (e) {
              var t = this;
              void 0 === e &&
                (e =
                  (t &&
                    t.translate &&
                    t.translate * (t.rtlTranslate ? -1 : 1)) ||
                  0);
              var n = t.params,
                s = t.maxTranslate() - t.minTranslate(),
                i = t.progress,
                r = t.isBeginning,
                o = t.isEnd,
                a = r,
                l = o;
              0 === s
                ? ((i = 0), (r = !0), (o = !0))
                : ((r = (i = (e - t.minTranslate()) / s) <= 0), (o = i >= 1)),
                Ac(t, { progress: i, isBeginning: r, isEnd: o }),
                (n.watchSlidesProgress ||
                  n.watchSlidesVisibility ||
                  (n.centeredSlides && n.autoHeight)) &&
                  t.updateSlidesProgress(e),
                r && !a && t.emit("reachBeginning toEdge"),
                o && !l && t.emit("reachEnd toEdge"),
                ((a && !r) || (l && !o)) && t.emit("fromEdge"),
                t.emit("progress", i);
            },
            updateSlidesClasses: function () {
              var e,
                t = this,
                n = t.slides,
                s = t.params,
                i = t.$wrapperEl,
                r = t.activeIndex,
                o = t.realIndex,
                a = t.virtual && s.virtual.enabled;
              n.removeClass(
                s.slideActiveClass +
                  " " +
                  s.slideNextClass +
                  " " +
                  s.slidePrevClass +
                  " " +
                  s.slideDuplicateActiveClass +
                  " " +
                  s.slideDuplicateNextClass +
                  " " +
                  s.slideDuplicatePrevClass
              ),
                (e = a
                  ? t.$wrapperEl.find(
                      "." +
                        s.slideClass +
                        '[data-swiper-slide-index="' +
                        r +
                        '"]'
                    )
                  : n.eq(r)).addClass(s.slideActiveClass),
                s.loop &&
                  (e.hasClass(s.slideDuplicateClass)
                    ? i
                        .children(
                          "." +
                            s.slideClass +
                            ":not(." +
                            s.slideDuplicateClass +
                            ')[data-swiper-slide-index="' +
                            o +
                            '"]'
                        )
                        .addClass(s.slideDuplicateActiveClass)
                    : i
                        .children(
                          "." +
                            s.slideClass +
                            "." +
                            s.slideDuplicateClass +
                            '[data-swiper-slide-index="' +
                            o +
                            '"]'
                        )
                        .addClass(s.slideDuplicateActiveClass));
              var l = e
                .nextAll("." + s.slideClass)
                .eq(0)
                .addClass(s.slideNextClass);
              s.loop &&
                0 === l.length &&
                (l = n.eq(0)).addClass(s.slideNextClass);
              var c = e
                .prevAll("." + s.slideClass)
                .eq(0)
                .addClass(s.slidePrevClass);
              s.loop &&
                0 === c.length &&
                (c = n.eq(-1)).addClass(s.slidePrevClass),
                s.loop &&
                  (l.hasClass(s.slideDuplicateClass)
                    ? i
                        .children(
                          "." +
                            s.slideClass +
                            ":not(." +
                            s.slideDuplicateClass +
                            ')[data-swiper-slide-index="' +
                            l.attr("data-swiper-slide-index") +
                            '"]'
                        )
                        .addClass(s.slideDuplicateNextClass)
                    : i
                        .children(
                          "." +
                            s.slideClass +
                            "." +
                            s.slideDuplicateClass +
                            '[data-swiper-slide-index="' +
                            l.attr("data-swiper-slide-index") +
                            '"]'
                        )
                        .addClass(s.slideDuplicateNextClass),
                  c.hasClass(s.slideDuplicateClass)
                    ? i
                        .children(
                          "." +
                            s.slideClass +
                            ":not(." +
                            s.slideDuplicateClass +
                            ')[data-swiper-slide-index="' +
                            c.attr("data-swiper-slide-index") +
                            '"]'
                        )
                        .addClass(s.slideDuplicatePrevClass)
                    : i
                        .children(
                          "." +
                            s.slideClass +
                            "." +
                            s.slideDuplicateClass +
                            '[data-swiper-slide-index="' +
                            c.attr("data-swiper-slide-index") +
                            '"]'
                        )
                        .addClass(s.slideDuplicatePrevClass)),
                t.emitSlidesClasses();
            },
            updateActiveIndex: function (e) {
              var t,
                n = this,
                s = n.rtlTranslate ? n.translate : -n.translate,
                i = n.slidesGrid,
                r = n.snapGrid,
                o = n.params,
                a = n.activeIndex,
                l = n.realIndex,
                c = n.snapIndex,
                u = e;
              if (void 0 === u) {
                for (var d = 0; d < i.length; d += 1)
                  void 0 !== i[d + 1]
                    ? s >= i[d] && s < i[d + 1] - (i[d + 1] - i[d]) / 2
                      ? (u = d)
                      : s >= i[d] && s < i[d + 1] && (u = d + 1)
                    : s >= i[d] && (u = d);
                o.normalizeSlideIndex && (u < 0 || void 0 === u) && (u = 0);
              }
              if (r.indexOf(s) >= 0) t = r.indexOf(s);
              else {
                var h = Math.min(o.slidesPerGroupSkip, u);
                t = h + Math.floor((u - h) / o.slidesPerGroup);
              }
              if ((t >= r.length && (t = r.length - 1), u !== a)) {
                var p = parseInt(
                  n.slides.eq(u).attr("data-swiper-slide-index") || u,
                  10
                );
                Ac(n, {
                  snapIndex: t,
                  realIndex: p,
                  previousIndex: a,
                  activeIndex: u,
                }),
                  n.emit("activeIndexChange"),
                  n.emit("snapIndexChange"),
                  l !== p && n.emit("realIndexChange"),
                  (n.initialized || n.params.runCallbacksOnInit) &&
                    n.emit("slideChange");
              } else t !== c && ((n.snapIndex = t), n.emit("snapIndexChange"));
            },
            updateClickedSlide: function (e) {
              var t,
                n = this,
                s = n.params,
                i = Ic(e.target).closest("." + s.slideClass)[0],
                r = !1;
              if (i)
                for (var o = 0; o < n.slides.length; o += 1)
                  if (n.slides[o] === i) {
                    (r = !0), (t = o);
                    break;
                  }
              if (!i || !r)
                return (
                  (n.clickedSlide = void 0), void (n.clickedIndex = void 0)
                );
              (n.clickedSlide = i),
                (n.clickedIndex =
                  n.virtual && n.params.virtual.enabled
                    ? parseInt(Ic(i).attr("data-swiper-slide-index"), 10)
                    : t),
                s.slideToClickedSlide &&
                  void 0 !== n.clickedIndex &&
                  n.clickedIndex !== n.activeIndex &&
                  n.slideToClickedSlide();
            },
          },
          translate: {
            getTranslate: function (e) {
              void 0 === e && (e = this.isHorizontal() ? "x" : "y");
              var t = this,
                n = t.params,
                s = t.rtlTranslate,
                i = t.translate;
              if (n.virtualTranslate) return s ? -i : i;
              if (n.cssMode) return i;
              var r = (function (e, t) {
                void 0 === t && (t = "x");
                var n,
                  s,
                  i,
                  r = hc(),
                  o = r.getComputedStyle(e, null);
                return (
                  r.WebKitCSSMatrix
                    ? ((s = o.transform || o.webkitTransform).split(",")
                        .length > 6 &&
                        (s = s
                          .split(", ")
                          .map(function (e) {
                            return e.replace(",", ".");
                          })
                          .join(", ")),
                      (i = new r.WebKitCSSMatrix("none" === s ? "" : s)))
                    : (n = (i =
                        o.MozTransform ||
                        o.OTransform ||
                        o.MsTransform ||
                        o.msTransform ||
                        o.transform ||
                        o
                          .getPropertyValue("transform")
                          .replace("translate(", "matrix(1, 0, 0, 1,"))
                        .toString()
                        .split(",")),
                  "x" === t &&
                    (s = r.WebKitCSSMatrix
                      ? i.m41
                      : 16 === n.length
                      ? parseFloat(n[12])
                      : parseFloat(n[4])),
                  "y" === t &&
                    (s = r.WebKitCSSMatrix
                      ? i.m42
                      : 16 === n.length
                      ? parseFloat(n[13])
                      : parseFloat(n[5])),
                  s || 0
                );
              })(t.$wrapperEl[0], e);
              return s && (r = -r), r || 0;
            },
            setTranslate: function (e, t) {
              var n = this,
                s = n.rtlTranslate,
                i = n.params,
                r = n.$wrapperEl,
                o = n.wrapperEl,
                a = n.progress,
                l = 0,
                c = 0;
              n.isHorizontal() ? (l = s ? -e : e) : (c = e),
                i.roundLengths && ((l = Math.floor(l)), (c = Math.floor(c))),
                i.cssMode
                  ? (o[
                      n.isHorizontal() ? "scrollLeft" : "scrollTop"
                    ] = n.isHorizontal() ? -l : -c)
                  : i.virtualTranslate ||
                    r.transform("translate3d(" + l + "px, " + c + "px, 0px)"),
                (n.previousTranslate = n.translate),
                (n.translate = n.isHorizontal() ? l : c);
              var u = n.maxTranslate() - n.minTranslate();
              (0 === u ? 0 : (e - n.minTranslate()) / u) !== a &&
                n.updateProgress(e),
                n.emit("setTranslate", n.translate, t);
            },
            minTranslate: function () {
              return -this.snapGrid[0];
            },
            maxTranslate: function () {
              return -this.snapGrid[this.snapGrid.length - 1];
            },
            translateTo: function (e, t, n, s, i) {
              void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === n && (n = !0),
                void 0 === s && (s = !0);
              var r = this,
                o = r.params,
                a = r.wrapperEl;
              if (r.animating && o.preventInteractionOnTransition) return !1;
              var l,
                c = r.minTranslate(),
                u = r.maxTranslate();
              if (
                (r.updateProgress((l = s && e > c ? c : s && e < u ? u : e)),
                o.cssMode)
              ) {
                var d,
                  h = r.isHorizontal();
                return (
                  0 === t
                    ? (a[h ? "scrollLeft" : "scrollTop"] = -l)
                    : a.scrollTo
                    ? a.scrollTo(
                        (((d = {})[h ? "left" : "top"] = -l),
                        (d.behavior = "smooth"),
                        d)
                      )
                    : (a[h ? "scrollLeft" : "scrollTop"] = -l),
                  !0
                );
              }
              return (
                0 === t
                  ? (r.setTransition(0),
                    r.setTranslate(l),
                    n &&
                      (r.emit("beforeTransitionStart", t, i),
                      r.emit("transitionEnd")))
                  : (r.setTransition(t),
                    r.setTranslate(l),
                    n &&
                      (r.emit("beforeTransitionStart", t, i),
                      r.emit("transitionStart")),
                    r.animating ||
                      ((r.animating = !0),
                      r.onTranslateToWrapperTransitionEnd ||
                        (r.onTranslateToWrapperTransitionEnd = function (e) {
                          r &&
                            !r.destroyed &&
                            e.target === this &&
                            (r.$wrapperEl[0].removeEventListener(
                              "transitionend",
                              r.onTranslateToWrapperTransitionEnd
                            ),
                            r.$wrapperEl[0].removeEventListener(
                              "webkitTransitionEnd",
                              r.onTranslateToWrapperTransitionEnd
                            ),
                            (r.onTranslateToWrapperTransitionEnd = null),
                            delete r.onTranslateToWrapperTransitionEnd,
                            n && r.emit("transitionEnd"));
                        }),
                      r.$wrapperEl[0].addEventListener(
                        "transitionend",
                        r.onTranslateToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].addEventListener(
                        "webkitTransitionEnd",
                        r.onTranslateToWrapperTransitionEnd
                      ))),
                !0
              );
            },
          },
          transition: {
            setTransition: function (e, t) {
              var n = this;
              n.params.cssMode || n.$wrapperEl.transition(e),
                n.emit("setTransition", e, t);
            },
            transitionStart: function (e, t) {
              void 0 === e && (e = !0);
              var n = this,
                s = n.activeIndex,
                i = n.params,
                r = n.previousIndex;
              if (!i.cssMode) {
                i.autoHeight && n.updateAutoHeight();
                var o = t;
                if (
                  (o || (o = s > r ? "next" : s < r ? "prev" : "reset"),
                  n.emit("transitionStart"),
                  e && s !== r)
                ) {
                  if ("reset" === o)
                    return void n.emit("slideResetTransitionStart");
                  n.emit("slideChangeTransitionStart"),
                    n.emit(
                      "next" === o
                        ? "slideNextTransitionStart"
                        : "slidePrevTransitionStart"
                    );
                }
              }
            },
            transitionEnd: function (e, t) {
              void 0 === e && (e = !0);
              var n = this,
                s = n.activeIndex,
                i = n.previousIndex,
                r = n.params;
              if (((n.animating = !1), !r.cssMode)) {
                n.setTransition(0);
                var o = t;
                if (
                  (o || (o = s > i ? "next" : s < i ? "prev" : "reset"),
                  n.emit("transitionEnd"),
                  e && s !== i)
                ) {
                  if ("reset" === o)
                    return void n.emit("slideResetTransitionEnd");
                  n.emit("slideChangeTransitionEnd"),
                    n.emit(
                      "next" === o
                        ? "slideNextTransitionEnd"
                        : "slidePrevTransitionEnd"
                    );
                }
              }
            },
          },
          slide: {
            slideTo: function (e, t, n, s) {
              if (
                (void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === n && (n = !0),
                "number" != typeof e && "string" != typeof e)
              )
                throw new Error(
                  "The 'index' argument cannot have type other than 'number' or 'string'. [" +
                    typeof e +
                    "] given."
                );
              if ("string" == typeof e) {
                var i = parseInt(e, 10);
                if (!isFinite(i))
                  throw new Error(
                    "The passed-in 'index' (string) couldn't be converted to 'number'. [" +
                      e +
                      "] given."
                  );
                e = i;
              }
              var r = this,
                o = e;
              o < 0 && (o = 0);
              var a = r.params,
                l = r.snapGrid,
                c = r.slidesGrid,
                u = r.previousIndex,
                d = r.activeIndex,
                h = r.rtlTranslate,
                p = r.wrapperEl;
              if (r.animating && a.preventInteractionOnTransition) return !1;
              var f = Math.min(r.params.slidesPerGroupSkip, o),
                g = f + Math.floor((o - f) / r.params.slidesPerGroup);
              g >= l.length && (g = l.length - 1),
                (d || a.initialSlide || 0) === (u || 0) &&
                  n &&
                  r.emit("beforeSlideChangeStart");
              var v,
                m = -l[g];
              if ((r.updateProgress(m), a.normalizeSlideIndex))
                for (var y = 0; y < c.length; y += 1) {
                  var w = -Math.floor(100 * m),
                    _ = Math.floor(100 * c[y]),
                    b = Math.floor(100 * c[y + 1]);
                  void 0 !== c[y + 1]
                    ? w >= _ && w < b - (b - _) / 2
                      ? (o = y)
                      : w >= _ && w < b && (o = y + 1)
                    : w >= _ && (o = y);
                }
              if (r.initialized && o !== d) {
                if (
                  !r.allowSlideNext &&
                  m < r.translate &&
                  m < r.minTranslate()
                )
                  return !1;
                if (
                  !r.allowSlidePrev &&
                  m > r.translate &&
                  m > r.maxTranslate() &&
                  (d || 0) !== o
                )
                  return !1;
              }
              if (
                ((v = o > d ? "next" : o < d ? "prev" : "reset"),
                (h && -m === r.translate) || (!h && m === r.translate))
              )
                return (
                  r.updateActiveIndex(o),
                  a.autoHeight && r.updateAutoHeight(),
                  r.updateSlidesClasses(),
                  "slide" !== a.effect && r.setTranslate(m),
                  "reset" !== v &&
                    (r.transitionStart(n, v), r.transitionEnd(n, v)),
                  !1
                );
              if (a.cssMode) {
                var C,
                  x = r.isHorizontal(),
                  S = -m;
                return (
                  h && (S = p.scrollWidth - p.offsetWidth - S),
                  0 === t
                    ? (p[x ? "scrollLeft" : "scrollTop"] = S)
                    : p.scrollTo
                    ? p.scrollTo(
                        (((C = {})[x ? "left" : "top"] = S),
                        (C.behavior = "smooth"),
                        C)
                      )
                    : (p[x ? "scrollLeft" : "scrollTop"] = S),
                  !0
                );
              }
              return (
                0 === t
                  ? (r.setTransition(0),
                    r.setTranslate(m),
                    r.updateActiveIndex(o),
                    r.updateSlidesClasses(),
                    r.emit("beforeTransitionStart", t, s),
                    r.transitionStart(n, v),
                    r.transitionEnd(n, v))
                  : (r.setTransition(t),
                    r.setTranslate(m),
                    r.updateActiveIndex(o),
                    r.updateSlidesClasses(),
                    r.emit("beforeTransitionStart", t, s),
                    r.transitionStart(n, v),
                    r.animating ||
                      ((r.animating = !0),
                      r.onSlideToWrapperTransitionEnd ||
                        (r.onSlideToWrapperTransitionEnd = function (e) {
                          r &&
                            !r.destroyed &&
                            e.target === this &&
                            (r.$wrapperEl[0].removeEventListener(
                              "transitionend",
                              r.onSlideToWrapperTransitionEnd
                            ),
                            r.$wrapperEl[0].removeEventListener(
                              "webkitTransitionEnd",
                              r.onSlideToWrapperTransitionEnd
                            ),
                            (r.onSlideToWrapperTransitionEnd = null),
                            delete r.onSlideToWrapperTransitionEnd,
                            r.transitionEnd(n, v));
                        }),
                      r.$wrapperEl[0].addEventListener(
                        "transitionend",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].addEventListener(
                        "webkitTransitionEnd",
                        r.onSlideToWrapperTransitionEnd
                      ))),
                !0
              );
            },
            slideToLoop: function (e, t, n, s) {
              void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === n && (n = !0);
              var i = this,
                r = e;
              return (
                i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, n, s)
              );
            },
            slideNext: function (e, t, n) {
              void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
              var s = this,
                i = s.params,
                r = s.activeIndex < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup;
              if (i.loop) {
                if (s.animating && i.loopPreventsSlide) return !1;
                s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
              }
              return s.slideTo(s.activeIndex + r, e, t, n);
            },
            slidePrev: function (e, t, n) {
              void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
              var s = this,
                i = s.params,
                r = s.snapGrid,
                o = s.slidesGrid,
                a = s.rtlTranslate;
              if (i.loop) {
                if (s.animating && i.loopPreventsSlide) return !1;
                s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
              }
              function l(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
              }
              var c,
                u = l(a ? s.translate : -s.translate),
                d = r.map(function (e) {
                  return l(e);
                }),
                h = (d.indexOf(u), r[d.indexOf(u) - 1]);
              return (
                void 0 === h &&
                  i.cssMode &&
                  r.forEach(function (e) {
                    !h && u >= e && (h = e);
                  }),
                void 0 !== h &&
                  (c = o.indexOf(h)) < 0 &&
                  (c = s.activeIndex - 1),
                s.slideTo(c, e, t, n)
              );
            },
            slideReset: function (e, t, n) {
              return (
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                this.slideTo(this.activeIndex, e, t, n)
              );
            },
            slideToClosest: function (e, t, n, s) {
              void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                void 0 === s && (s = 0.5);
              var i = this,
                r = i.activeIndex,
                o = Math.min(i.params.slidesPerGroupSkip, r),
                a = o + Math.floor((r - o) / i.params.slidesPerGroup),
                l = i.rtlTranslate ? i.translate : -i.translate;
              if (l >= i.snapGrid[a]) {
                var c = i.snapGrid[a];
                l - c > (i.snapGrid[a + 1] - c) * s &&
                  (r += i.params.slidesPerGroup);
              } else {
                var u = i.snapGrid[a - 1];
                l - u <= (i.snapGrid[a] - u) * s &&
                  (r -= i.params.slidesPerGroup);
              }
              return (
                (r = Math.max(r, 0)),
                (r = Math.min(r, i.slidesGrid.length - 1)),
                i.slideTo(r, e, t, n)
              );
            },
            slideToClickedSlide: function () {
              var e,
                t = this,
                n = t.params,
                s = t.$wrapperEl,
                i =
                  "auto" === n.slidesPerView
                    ? t.slidesPerViewDynamic()
                    : n.slidesPerView,
                r = t.clickedIndex;
              if (n.loop) {
                if (t.animating) return;
                (e = parseInt(
                  Ic(t.clickedSlide).attr("data-swiper-slide-index"),
                  10
                )),
                  n.centeredSlides
                    ? r < t.loopedSlides - i / 2 ||
                      r > t.slides.length - t.loopedSlides + i / 2
                      ? (t.loopFix(),
                        (r = s
                          .children(
                            "." +
                              n.slideClass +
                              '[data-swiper-slide-index="' +
                              e +
                              '"]:not(.' +
                              n.slideDuplicateClass +
                              ")"
                          )
                          .eq(0)
                          .index()),
                        Mc(function () {
                          t.slideTo(r);
                        }))
                      : t.slideTo(r)
                    : r > t.slides.length - i
                    ? (t.loopFix(),
                      (r = s
                        .children(
                          "." +
                            n.slideClass +
                            '[data-swiper-slide-index="' +
                            e +
                            '"]:not(.' +
                            n.slideDuplicateClass +
                            ")"
                        )
                        .eq(0)
                        .index()),
                      Mc(function () {
                        t.slideTo(r);
                      }))
                    : t.slideTo(r);
              } else t.slideTo(r);
            },
          },
          loop: {
            loopCreate: function () {
              var e = this,
                t = uc(),
                n = e.params,
                s = e.$wrapperEl;
              s.children(
                "." + n.slideClass + "." + n.slideDuplicateClass
              ).remove();
              var i = s.children("." + n.slideClass);
              if (n.loopFillGroupWithBlank) {
                var r = n.slidesPerGroup - (i.length % n.slidesPerGroup);
                if (r !== n.slidesPerGroup) {
                  for (var o = 0; o < r; o += 1) {
                    var a = Ic(t.createElement("div")).addClass(
                      n.slideClass + " " + n.slideBlankClass
                    );
                    s.append(a);
                  }
                  i = s.children("." + n.slideClass);
                }
              }
              "auto" !== n.slidesPerView ||
                n.loopedSlides ||
                (n.loopedSlides = i.length),
                (e.loopedSlides = Math.ceil(
                  parseFloat(n.loopedSlides || n.slidesPerView, 10)
                )),
                (e.loopedSlides += n.loopAdditionalSlides),
                e.loopedSlides > i.length && (e.loopedSlides = i.length);
              var l = [],
                c = [];
              i.each(function (t, n) {
                var s = Ic(t);
                n < e.loopedSlides && c.push(t),
                  n < i.length && n >= i.length - e.loopedSlides && l.push(t),
                  s.attr("data-swiper-slide-index", n);
              });
              for (var u = 0; u < c.length; u += 1)
                s.append(
                  Ic(c[u].cloneNode(!0)).addClass(n.slideDuplicateClass)
                );
              for (var d = l.length - 1; d >= 0; d -= 1)
                s.prepend(
                  Ic(l[d].cloneNode(!0)).addClass(n.slideDuplicateClass)
                );
            },
            loopFix: function () {
              var e = this;
              e.emit("beforeLoopFix");
              var t,
                n = e.activeIndex,
                s = e.slides,
                i = e.loopedSlides,
                r = e.allowSlidePrev,
                o = e.allowSlideNext,
                a = e.snapGrid,
                l = e.rtlTranslate;
              (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
              var c = -a[n] - e.getTranslate();
              n < i
                ? ((t = s.length - 3 * i + n),
                  e.slideTo((t += i), 0, !1, !0) &&
                    0 !== c &&
                    e.setTranslate((l ? -e.translate : e.translate) - c))
                : n >= s.length - i &&
                  ((t = -s.length + n + i),
                  e.slideTo((t += i), 0, !1, !0) &&
                    0 !== c &&
                    e.setTranslate((l ? -e.translate : e.translate) - c)),
                (e.allowSlidePrev = r),
                (e.allowSlideNext = o),
                e.emit("loopFix");
            },
            loopDestroy: function () {
              var e = this,
                t = e.params,
                n = e.slides;
              e.$wrapperEl
                .children(
                  "." +
                    t.slideClass +
                    "." +
                    t.slideDuplicateClass +
                    ",." +
                    t.slideClass +
                    "." +
                    t.slideBlankClass
                )
                .remove(),
                n.removeAttr("data-swiper-slide-index");
            },
          },
          grabCursor: {
            setGrabCursor: function (e) {
              var t = this;
              if (
                !(
                  t.support.touch ||
                  !t.params.simulateTouch ||
                  (t.params.watchOverflow && t.isLocked) ||
                  t.params.cssMode
                )
              ) {
                var n = t.el;
                (n.style.cursor = "move"),
                  (n.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
                  (n.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
                  (n.style.cursor = e ? "grabbing" : "grab");
              }
            },
            unsetGrabCursor: function () {
              var e = this;
              e.support.touch ||
                (e.params.watchOverflow && e.isLocked) ||
                e.params.cssMode ||
                (e.el.style.cursor = "");
            },
          },
          manipulation: {
            appendSlide: function (e) {
              var t = this,
                n = t.$wrapperEl,
                s = t.params;
              if (
                (s.loop && t.loopDestroy(),
                "object" == typeof e && "length" in e)
              )
                for (var i = 0; i < e.length; i += 1) e[i] && n.append(e[i]);
              else n.append(e);
              s.loop && t.loopCreate(),
                (s.observer && t.support.observer) || t.update();
            },
            prependSlide: function (e) {
              var t = this,
                n = t.params,
                s = t.$wrapperEl,
                i = t.activeIndex;
              n.loop && t.loopDestroy();
              var r = i + 1;
              if ("object" == typeof e && "length" in e) {
                for (var o = 0; o < e.length; o += 1) e[o] && s.prepend(e[o]);
                r = i + e.length;
              } else s.prepend(e);
              n.loop && t.loopCreate(),
                (n.observer && t.support.observer) || t.update(),
                t.slideTo(r, 0, !1);
            },
            addSlide: function (e, t) {
              var n = this,
                s = n.$wrapperEl,
                i = n.params,
                r = n.activeIndex;
              i.loop &&
                ((r -= n.loopedSlides),
                n.loopDestroy(),
                (n.slides = s.children("." + i.slideClass)));
              var o = n.slides.length;
              if (e <= 0) n.prependSlide(t);
              else if (e >= o) n.appendSlide(t);
              else {
                for (
                  var a = r > e ? r + 1 : r, l = [], c = o - 1;
                  c >= e;
                  c -= 1
                ) {
                  var u = n.slides.eq(c);
                  u.remove(), l.unshift(u);
                }
                if ("object" == typeof t && "length" in t) {
                  for (var d = 0; d < t.length; d += 1) t[d] && s.append(t[d]);
                  a = r > e ? r + t.length : r;
                } else s.append(t);
                for (var h = 0; h < l.length; h += 1) s.append(l[h]);
                i.loop && n.loopCreate(),
                  (i.observer && n.support.observer) || n.update(),
                  n.slideTo(i.loop ? a + n.loopedSlides : a, 0, !1);
              }
            },
            removeSlide: function (e) {
              var t = this,
                n = t.params,
                s = t.$wrapperEl,
                i = t.activeIndex;
              n.loop &&
                ((i -= t.loopedSlides),
                t.loopDestroy(),
                (t.slides = s.children("." + n.slideClass)));
              var r,
                o = i;
              if ("object" == typeof e && "length" in e) {
                for (var a = 0; a < e.length; a += 1)
                  t.slides[(r = e[a])] && t.slides.eq(r).remove(),
                    r < o && (o -= 1);
                o = Math.max(o, 0);
              } else
                t.slides[(r = e)] && t.slides.eq(r).remove(),
                  r < o && (o -= 1),
                  (o = Math.max(o, 0));
              n.loop && t.loopCreate(),
                (n.observer && t.support.observer) || t.update(),
                t.slideTo(n.loop ? o + t.loopedSlides : o, 0, !1);
            },
            removeAllSlides: function () {
              for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
              this.removeSlide(e);
            },
          },
          events: {
            attachEvents: function () {
              var e = this,
                t = uc(),
                n = e.params,
                s = e.touchEvents,
                i = e.el,
                r = e.wrapperEl,
                o = e.device,
                a = e.support;
              (e.onTouchStart = Hc.bind(e)),
                (e.onTouchMove = Bc.bind(e)),
                (e.onTouchEnd = $c.bind(e)),
                n.cssMode && (e.onScroll = Wc.bind(e)),
                (e.onClick = qc.bind(e));
              var l = !!n.nested;
              if (!a.touch && a.pointerEvents)
                i.addEventListener(s.start, e.onTouchStart, !1),
                  t.addEventListener(s.move, e.onTouchMove, l),
                  t.addEventListener(s.end, e.onTouchEnd, !1);
              else {
                if (a.touch) {
                  var c = !(
                    "touchstart" !== s.start ||
                    !a.passiveListener ||
                    !n.passiveListeners
                  ) && { passive: !0, capture: !1 };
                  i.addEventListener(s.start, e.onTouchStart, c),
                    i.addEventListener(
                      s.move,
                      e.onTouchMove,
                      a.passiveListener ? { passive: !1, capture: l } : l
                    ),
                    i.addEventListener(s.end, e.onTouchEnd, c),
                    s.cancel && i.addEventListener(s.cancel, e.onTouchEnd, c),
                    Zc || (t.addEventListener("touchstart", Uc), (Zc = !0));
                }
                ((n.simulateTouch && !o.ios && !o.android) ||
                  (n.simulateTouch && !a.touch && o.ios)) &&
                  (i.addEventListener("mousedown", e.onTouchStart, !1),
                  t.addEventListener("mousemove", e.onTouchMove, l),
                  t.addEventListener("mouseup", e.onTouchEnd, !1));
              }
              (n.preventClicks || n.preventClicksPropagation) &&
                i.addEventListener("click", e.onClick, !0),
                n.cssMode && r.addEventListener("scroll", e.onScroll),
                e.on(
                  n.updateOnWindowResize
                    ? o.ios || o.android
                      ? "resize orientationchange observerUpdate"
                      : "resize observerUpdate"
                    : "observerUpdate",
                  Gc,
                  !0
                );
            },
            detachEvents: function () {
              var e = this,
                t = uc(),
                n = e.params,
                s = e.touchEvents,
                i = e.el,
                r = e.wrapperEl,
                o = e.device,
                a = e.support,
                l = !!n.nested;
              if (!a.touch && a.pointerEvents)
                i.removeEventListener(s.start, e.onTouchStart, !1),
                  t.removeEventListener(s.move, e.onTouchMove, l),
                  t.removeEventListener(s.end, e.onTouchEnd, !1);
              else {
                if (a.touch) {
                  var c = !(
                    "onTouchStart" !== s.start ||
                    !a.passiveListener ||
                    !n.passiveListeners
                  ) && { passive: !0, capture: !1 };
                  i.removeEventListener(s.start, e.onTouchStart, c),
                    i.removeEventListener(s.move, e.onTouchMove, l),
                    i.removeEventListener(s.end, e.onTouchEnd, c),
                    s.cancel &&
                      i.removeEventListener(s.cancel, e.onTouchEnd, c);
                }
                ((n.simulateTouch && !o.ios && !o.android) ||
                  (n.simulateTouch && !a.touch && o.ios)) &&
                  (i.removeEventListener("mousedown", e.onTouchStart, !1),
                  t.removeEventListener("mousemove", e.onTouchMove, l),
                  t.removeEventListener("mouseup", e.onTouchEnd, !1));
              }
              (n.preventClicks || n.preventClicksPropagation) &&
                i.removeEventListener("click", e.onClick, !0),
                n.cssMode && r.removeEventListener("scroll", e.onScroll),
                e.off(
                  o.ios || o.android
                    ? "resize orientationchange observerUpdate"
                    : "resize observerUpdate",
                  Gc
                );
            },
          },
          breakpoints: {
            setBreakpoint: function () {
              var e = this,
                t = e.activeIndex,
                n = e.initialized,
                s = e.loopedSlides,
                i = void 0 === s ? 0 : s,
                r = e.params,
                o = e.$el,
                a = r.breakpoints;
              if (a && (!a || 0 !== Object.keys(a).length)) {
                var l = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
                if (l && e.currentBreakpoint !== l) {
                  var c = l in a ? a[l] : void 0;
                  c &&
                    [
                      "slidesPerView",
                      "spaceBetween",
                      "slidesPerGroup",
                      "slidesPerGroupSkip",
                      "slidesPerColumn",
                    ].forEach(function (e) {
                      var t = c[e];
                      void 0 !== t &&
                        (c[e] =
                          "slidesPerView" !== e ||
                          ("AUTO" !== t && "auto" !== t)
                            ? "slidesPerView" === e
                              ? parseFloat(t)
                              : parseInt(t, 10)
                            : "auto");
                    });
                  var u = c || e.originalParams,
                    d = r.slidesPerColumn > 1,
                    h = u.slidesPerColumn > 1;
                  d && !h
                    ? (o.removeClass(
                        r.containerModifierClass +
                          "multirow " +
                          r.containerModifierClass +
                          "multirow-column"
                      ),
                      e.emitContainerClasses())
                    : !d &&
                      h &&
                      (o.addClass(r.containerModifierClass + "multirow"),
                      "column" === u.slidesPerColumnFill &&
                        o.addClass(
                          r.containerModifierClass + "multirow-column"
                        ),
                      e.emitContainerClasses());
                  var p = u.direction && u.direction !== r.direction,
                    f = r.loop && (u.slidesPerView !== r.slidesPerView || p);
                  p && n && e.changeDirection(),
                    Ac(e.params, u),
                    Ac(e, {
                      allowTouchMove: e.params.allowTouchMove,
                      allowSlideNext: e.params.allowSlideNext,
                      allowSlidePrev: e.params.allowSlidePrev,
                    }),
                    (e.currentBreakpoint = l),
                    e.emit("_beforeBreakpoint", u),
                    f &&
                      n &&
                      (e.loopDestroy(),
                      e.loopCreate(),
                      e.updateSlides(),
                      e.slideTo(t - i + e.loopedSlides, 0, !1)),
                    e.emit("breakpoint", u);
                }
              }
            },
            getBreakpoint: function (e, t, n) {
              if (
                (void 0 === t && (t = "window"), e && ("container" !== t || n))
              ) {
                var s = !1,
                  i = hc(),
                  r = "window" === t ? i.innerWidth : n.clientWidth,
                  o = "window" === t ? i.innerHeight : n.clientHeight,
                  a = Object.keys(e).map(function (e) {
                    if ("string" == typeof e && 0 === e.indexOf("@")) {
                      var t = parseFloat(e.substr(1));
                      return { value: o * t, point: e };
                    }
                    return { value: e, point: e };
                  });
                a.sort(function (e, t) {
                  return parseInt(e.value, 10) - parseInt(t.value, 10);
                });
                for (var l = 0; l < a.length; l += 1) {
                  var c = a[l];
                  c.value <= r && (s = c.point);
                }
                return s || "max";
              }
            },
          },
          checkOverflow: {
            checkOverflow: function () {
              var e = this,
                t = e.params,
                n = e.isLocked,
                s =
                  e.slides.length > 0 &&
                  t.slidesOffsetBefore +
                    t.spaceBetween * (e.slides.length - 1) +
                    e.slides[0].offsetWidth * e.slides.length;
              (e.isLocked =
                t.slidesOffsetBefore && t.slidesOffsetAfter && s
                  ? s <= e.size
                  : 1 === e.snapGrid.length),
                (e.allowSlideNext = !e.isLocked),
                (e.allowSlidePrev = !e.isLocked),
                n !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"),
                n &&
                  n !== e.isLocked &&
                  ((e.isEnd = !1), e.navigation && e.navigation.update());
            },
          },
          classes: {
            addClasses: function () {
              var e,
                t,
                n = this,
                s = n.classNames,
                i = n.params,
                r = n.$el,
                o = n.device,
                a = n.support,
                l =
                  ((e = i.containerModifierClass),
                  (t = []),
                  [
                    "initialized",
                    i.direction,
                    { "pointer-events": a.pointerEvents && !a.touch },
                    { "free-mode": i.freeMode },
                    { autoheight: i.autoHeight },
                    { rtl: n.rtl },
                    { multirow: i.slidesPerColumn > 1 },
                    {
                      "multirow-column":
                        i.slidesPerColumn > 1 &&
                        "column" === i.slidesPerColumnFill,
                    },
                    { android: o.android },
                    { ios: o.ios },
                    { "css-mode": i.cssMode },
                  ].forEach(function (n) {
                    "object" == typeof n
                      ? Object.entries(n).forEach(function (n) {
                          n[1] && t.push(e + n[0]);
                        })
                      : "string" == typeof n && t.push(e + n);
                  }),
                  t);
              s.push.apply(s, l),
                r.addClass([].concat(s).join(" ")),
                n.emitContainerClasses();
            },
            removeClasses: function () {
              var e = this;
              e.$el.removeClass(e.classNames.join(" ")),
                e.emitContainerClasses();
            },
          },
          images: {
            loadImage: function (e, t, n, s, i, r) {
              var o,
                a = hc();
              function l() {
                r && r();
              }
              Ic(e).parent("picture")[0] || (e.complete && i)
                ? l()
                : t
                ? (((o = new a.Image()).onload = l),
                  (o.onerror = l),
                  s && (o.sizes = s),
                  n && (o.srcset = n),
                  t && (o.src = t))
                : l();
            },
            preloadImages: function () {
              var e = this;
              function t() {
                null != e &&
                  e &&
                  !e.destroyed &&
                  (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                  e.imagesLoaded === e.imagesToLoad.length &&
                    (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")));
              }
              e.imagesToLoad = e.$el.find("img");
              for (var n = 0; n < e.imagesToLoad.length; n += 1) {
                var s = e.imagesToLoad[n];
                e.loadImage(
                  s,
                  s.currentSrc || s.getAttribute("src"),
                  s.srcset || s.getAttribute("srcset"),
                  s.sizes || s.getAttribute("sizes"),
                  !0,
                  t
                );
              }
            },
          },
        },
        Kc = {},
        Jc = (function () {
          function e() {
            for (
              var t, n, s = arguments.length, i = new Array(s), r = 0;
              r < s;
              r++
            )
              i[r] = arguments[r];
            if (
              (1 === i.length && i[0].constructor && i[0].constructor === Object
                ? (n = i[0])
                : ((t = i[0]), (n = i[1])),
              n || (n = {}),
              (n = Ac({}, n)),
              t && !n.el && (n.el = t),
              n.el && Ic(n.el).length > 1)
            ) {
              var o = [];
              return (
                Ic(n.el).each(function (t) {
                  var s = Ac({}, n, { el: t });
                  o.push(new e(s));
                }),
                o
              );
            }
            var a = this;
            (a.support = Rc()),
              (a.device = Nc({ userAgent: n.userAgent })),
              (a.browser = Lc()),
              (a.eventsListeners = {}),
              (a.eventsAnyListeners = []),
              void 0 === a.modules && (a.modules = {}),
              Object.keys(a.modules).forEach(function (e) {
                var t = a.modules[e];
                if (t.params) {
                  var s = Object.keys(t.params)[0],
                    i = t.params[s];
                  if ("object" != typeof i || null === i) return;
                  if (!(s in n) || !("enabled" in i)) return;
                  !0 === n[s] && (n[s] = { enabled: !0 }),
                    "object" != typeof n[s] ||
                      "enabled" in n[s] ||
                      (n[s].enabled = !0),
                    n[s] || (n[s] = { enabled: !1 });
                }
              });
            var l,
              c,
              u = Ac({}, Yc);
            return (
              a.useParams(u),
              (a.params = Ac({}, u, Kc, n)),
              (a.originalParams = Ac({}, a.params)),
              (a.passedParams = Ac({}, n)),
              a.params &&
                a.params.on &&
                Object.keys(a.params.on).forEach(function (e) {
                  a.on(e, a.params.on[e]);
                }),
              a.params && a.params.onAny && a.onAny(a.params.onAny),
              (a.$ = Ic),
              Ac(a, {
                el: t,
                classNames: [],
                slides: Ic(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: function () {
                  return "horizontal" === a.params.direction;
                },
                isVertical: function () {
                  return "vertical" === a.params.direction;
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: a.params.allowSlideNext,
                allowSlidePrev: a.params.allowSlidePrev,
                touchEvents:
                  ((l = ["touchstart", "touchmove", "touchend", "touchcancel"]),
                  (c = ["mousedown", "mousemove", "mouseup"]),
                  a.support.pointerEvents &&
                    (c = ["pointerdown", "pointermove", "pointerup"]),
                  (a.touchEventsTouch = {
                    start: l[0],
                    move: l[1],
                    end: l[2],
                    cancel: l[3],
                  }),
                  (a.touchEventsDesktop = {
                    start: c[0],
                    move: c[1],
                    end: c[2],
                  }),
                  a.support.touch || !a.params.simulateTouch
                    ? a.touchEventsTouch
                    : a.touchEventsDesktop),
                touchEventsData: {
                  isTouched: void 0,
                  isMoved: void 0,
                  allowTouchCallbacks: void 0,
                  touchStartTime: void 0,
                  isScrolling: void 0,
                  currentTranslate: void 0,
                  startTranslate: void 0,
                  allowThresholdMove: void 0,
                  formElements:
                    "input, select, option, textarea, button, video, label",
                  lastClickTime: Oc(),
                  clickTimeout: void 0,
                  velocities: [],
                  allowMomentumBounce: void 0,
                  isTouchEvent: void 0,
                  startMoving: void 0,
                },
                allowClick: !0,
                allowTouchMove: a.params.allowTouchMove,
                touches: {
                  startX: 0,
                  startY: 0,
                  currentX: 0,
                  currentY: 0,
                  diff: 0,
                },
                imagesToLoad: [],
                imagesLoaded: 0,
              }),
              a.useModules(),
              a.emit("_swiper"),
              a.params.init && a.init(),
              a
            );
          }
          var t,
            n,
            s = e.prototype;
          return (
            (s.emitContainerClasses = function () {
              var e = this;
              if (e.params._emitClasses && e.el) {
                var t = e.el.className.split(" ").filter(function (t) {
                  return (
                    0 === t.indexOf("swiper-container") ||
                    0 === t.indexOf(e.params.containerModifierClass)
                  );
                });
                e.emit("_containerClasses", t.join(" "));
              }
            }),
            (s.getSlideClasses = function (e) {
              var t = this;
              return e.className
                .split(" ")
                .filter(function (e) {
                  return (
                    0 === e.indexOf("swiper-slide") ||
                    0 === e.indexOf(t.params.slideClass)
                  );
                })
                .join(" ");
            }),
            (s.emitSlidesClasses = function () {
              var e = this;
              if (e.params._emitClasses && e.el) {
                var t = [];
                e.slides.each(function (n) {
                  var s = e.getSlideClasses(n);
                  t.push({ slideEl: n, classNames: s }),
                    e.emit("_slideClass", n, s);
                }),
                  e.emit("_slideClasses", t);
              }
            }),
            (s.slidesPerViewDynamic = function () {
              var e = this,
                t = e.slides,
                n = e.slidesGrid,
                s = e.size,
                i = e.activeIndex,
                r = 1;
              if (e.params.centeredSlides) {
                for (
                  var o, a = t[i].swiperSlideSize, l = i + 1;
                  l < t.length;
                  l += 1
                )
                  t[l] &&
                    !o &&
                    ((r += 1), (a += t[l].swiperSlideSize) > s && (o = !0));
                for (var c = i - 1; c >= 0; c -= 1)
                  t[c] &&
                    !o &&
                    ((r += 1), (a += t[c].swiperSlideSize) > s && (o = !0));
              } else
                for (var u = i + 1; u < t.length; u += 1)
                  n[u] - n[i] < s && (r += 1);
              return r;
            }),
            (s.update = function () {
              var e = this;
              if (e && !e.destroyed) {
                var t = e.snapGrid,
                  n = e.params;
                n.breakpoints && e.setBreakpoint(),
                  e.updateSize(),
                  e.updateSlides(),
                  e.updateProgress(),
                  e.updateSlidesClasses(),
                  e.params.freeMode
                    ? (s(), e.params.autoHeight && e.updateAutoHeight())
                    : e.slideTo(
                        ("auto" === e.params.slidesPerView ||
                          e.params.slidesPerView > 1) &&
                          e.isEnd &&
                          !e.params.centeredSlides
                          ? e.slides.length - 1
                          : e.activeIndex,
                        0,
                        !1,
                        !0
                      ) || s(),
                  n.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                  e.emit("update");
              }
              function s() {
                var t = Math.min(
                  Math.max(
                    e.rtlTranslate ? -1 * e.translate : e.translate,
                    e.maxTranslate()
                  ),
                  e.minTranslate()
                );
                e.setTranslate(t),
                  e.updateActiveIndex(),
                  e.updateSlidesClasses();
              }
            }),
            (s.changeDirection = function (e, t) {
              void 0 === t && (t = !0);
              var n = this,
                s = n.params.direction;
              return (
                e || (e = "horizontal" === s ? "vertical" : "horizontal"),
                e === s ||
                  ("horizontal" !== e && "vertical" !== e) ||
                  (n.$el
                    .removeClass("" + n.params.containerModifierClass + s)
                    .addClass("" + n.params.containerModifierClass + e),
                  n.emitContainerClasses(),
                  (n.params.direction = e),
                  n.slides.each(function (t) {
                    "vertical" === e
                      ? (t.style.width = "")
                      : (t.style.height = "");
                  }),
                  n.emit("changeDirection"),
                  t && n.update()),
                n
              );
            }),
            (s.mount = function (e) {
              var t = this;
              if (t.mounted) return !0;
              var n,
                s = Ic(e || t.params.el);
              return (
                !!(e = s[0]) &&
                ((e.swiper = t),
                e && e.shadowRoot && e.shadowRoot.querySelector
                  ? ((n = Ic(
                      e.shadowRoot.querySelector("." + t.params.wrapperClass)
                    )).children = function (e) {
                      return s.children(e);
                    })
                  : (n = s.children("." + t.params.wrapperClass)),
                Ac(t, {
                  $el: s,
                  el: e,
                  $wrapperEl: n,
                  wrapperEl: n[0],
                  mounted: !0,
                  rtl:
                    "rtl" === e.dir.toLowerCase() ||
                    "rtl" === s.css("direction"),
                  rtlTranslate:
                    "horizontal" === t.params.direction &&
                    ("rtl" === e.dir.toLowerCase() ||
                      "rtl" === s.css("direction")),
                  wrongRTL: "-webkit-box" === n.css("display"),
                }),
                !0)
              );
            }),
            (s.init = function (e) {
              var t = this;
              return (
                t.initialized ||
                  !1 === t.mount(e) ||
                  (t.emit("beforeInit"),
                  t.params.breakpoints && t.setBreakpoint(),
                  t.addClasses(),
                  t.params.loop && t.loopCreate(),
                  t.updateSize(),
                  t.updateSlides(),
                  t.params.watchOverflow && t.checkOverflow(),
                  t.params.grabCursor && t.setGrabCursor(),
                  t.params.preloadImages && t.preloadImages(),
                  t.slideTo(
                    t.params.loop
                      ? t.params.initialSlide + t.loopedSlides
                      : t.params.initialSlide,
                    0,
                    t.params.runCallbacksOnInit
                  ),
                  t.attachEvents(),
                  (t.initialized = !0),
                  t.emit("init"),
                  t.emit("afterInit")),
                t
              );
            }),
            (s.destroy = function (e, t) {
              void 0 === e && (e = !0), void 0 === t && (t = !0);
              var n,
                s = this,
                i = s.params,
                r = s.$el,
                o = s.$wrapperEl,
                a = s.slides;
              return (
                void 0 === s.params ||
                  s.destroyed ||
                  (s.emit("beforeDestroy"),
                  (s.initialized = !1),
                  s.detachEvents(),
                  i.loop && s.loopDestroy(),
                  t &&
                    (s.removeClasses(),
                    r.removeAttr("style"),
                    o.removeAttr("style"),
                    a &&
                      a.length &&
                      a
                        .removeClass(
                          [
                            i.slideVisibleClass,
                            i.slideActiveClass,
                            i.slideNextClass,
                            i.slidePrevClass,
                          ].join(" ")
                        )
                        .removeAttr("style")
                        .removeAttr("data-swiper-slide-index")),
                  s.emit("destroy"),
                  Object.keys(s.eventsListeners).forEach(function (e) {
                    s.off(e);
                  }),
                  !1 !== e &&
                    ((s.$el[0].swiper = null),
                    (n = s),
                    Object.keys(n).forEach(function (e) {
                      try {
                        n[e] = null;
                      } catch (t) {}
                      try {
                        delete n[e];
                      } catch (t) {}
                    })),
                  (s.destroyed = !0)),
                null
              );
            }),
            (e.extendDefaults = function (e) {
              Ac(Kc, e);
            }),
            (e.installModule = function (t) {
              e.prototype.modules || (e.prototype.modules = {});
              var n =
                t.name || Object.keys(e.prototype.modules).length + "_" + Oc();
              e.prototype.modules[n] = t;
            }),
            (e.use = function (t) {
              return Array.isArray(t)
                ? (t.forEach(function (t) {
                    return e.installModule(t);
                  }),
                  e)
                : (e.installModule(t), e);
            }),
            (t = e),
            (n = [
              {
                key: "extendedDefaults",
                get: function () {
                  return Kc;
                },
              },
              {
                key: "defaults",
                get: function () {
                  return Yc;
                },
              },
            ]) && Qc(t, n),
            e
          );
        })();
      Object.keys(Xc).forEach(function (e) {
        Object.keys(Xc[e]).forEach(function (t) {
          Jc.prototype[t] = Xc[e][t];
        });
      }),
        Jc.use([Vc, Fc]);
      var eu = Jc;
      function tu(...e) {
        let t = e[e.length - 1];
        return E(t) ? (e.pop(), A(e, t)) : V(e);
      }
      const nu = ["prevElRef"],
        su = ["nextElRef"],
        iu = ["scrollbarElRef"],
        ru = ["paginationElRef"];
      function ou(e, t) {
        1 & e && (xr(0), Cr(1, "div", 6, 7), Cr(3, "div", 8, 9), Sr());
      }
      function au(e, t) {
        1 & e && Cr(0, "div", 10, 11);
      }
      function lu(e, t) {
        1 & e && Cr(0, "div", 12, 13);
      }
      function cu(e, t) {}
      function uu(e, t) {
        1 & e && gr(0, cu, 0, 0, "ng-template");
      }
      function du(e, t) {}
      function hu(e, t) {
        1 & e && gr(0, du, 0, 0, "ng-template");
      }
      function pu(e, t) {}
      function fu(e, t) {
        1 & e && gr(0, pu, 0, 0, "ng-template");
      }
      function gu(e, t) {}
      const vu = function (e) {
        return { $implicit: e };
      };
      function mu(e, t) {
        if (
          (1 & e && (_r(0, "div", 3), gr(1, gu, 0, 0, "ng-template", 18), br()),
          2 & e)
        ) {
          const e = Mr().$implicit;
          yr("ngClass", Mr(2).zoomContainerClass),
            Ss(1),
            yr("ngTemplateOutlet", e.template)(
              "ngTemplateOutletContext",
              Jo(3, vu, e.slideData)
            );
        }
      }
      function yu(e, t) {}
      function wu(e, t) {
        if (
          (1 & e && (xr(0), gr(1, yu, 0, 0, "ng-template", 18), Sr()), 2 & e)
        ) {
          const e = Mr().$implicit;
          Ss(1),
            yr("ngTemplateOutlet", e.template)(
              "ngTemplateOutletContext",
              Jo(2, vu, e.slideData)
            );
        }
      }
      function _u(e, t) {
        if (
          (1 & e &&
            (_r(0, "div", 15),
            gr(1, mu, 2, 5, "div", 16),
            gr(2, wu, 2, 4, "ng-container", 17),
            br()),
          2 & e)
        ) {
          const e = t.$implicit,
            n = Mr().key,
            s = Mr();
          Zr(Kr, qr, s.style, !1),
            yr(
              "ngClass",
              (e.class ? e.class + " " : "") +
                s.slideClass +
                ("" !== n ? " " + s.slideDuplicateClass : "")
            )("ngSwitch", e.zoom),
            fr(
              "data-swiper-slide-index",
              e.virtualIndex ? e.virtualIndex : e.slideIndex
            ),
            Ss(1),
            yr("ngSwitchCase", !0);
        }
      }
      function bu(e, t) {
        1 & e &&
          (gr(0, _u, 3, 6, "div", 14),
          (function (e, t) {
            const n = Yt();
            let s;
            n.firstCreatePass
              ? ((s = (function (e, t) {
                  if (t)
                    for (let n = t.length - 1; n >= 0; n--) {
                      const s = t[n];
                      if (e === s.name) return s;
                    }
                  throw new Error("The pipe 'async' could not be found!");
                })("async", n.pipeRegistry)),
                (n.data[21] = s),
                s.onDestroy &&
                  (n.destroyHooks || (n.destroyHooks = [])).push(
                    21,
                    s.onDestroy
                  ))
              : (s = n.data[21]);
            const i = s.factory || (s.factory = ut(s.type)),
              r = Le(mr);
            try {
              const e = Vn(!1),
                t = i();
              Vn(e),
                (function (e, t, n, s) {
                  21 >= e.data.length &&
                    ((e.data[21] = null), (e.blueprint[21] = null)),
                    (t[21] = s);
                })(n, Ut(), 0, t);
            } finally {
              Le(r);
            }
          })()),
          2 & e &&
            yr(
              "ngForOf",
              (function (e, t, n) {
                const s = Ut(),
                  i = jt(s, e);
                return (function (e, t) {
                  return (
                    cr.isWrapped(t) &&
                      ((t = cr.unwrap(t)), (e[Wt.lFrame.bindingIndex] = ws)),
                    t
                  );
                })(
                  s,
                  (function (e, t) {
                    return e[1].data[t + ht].pure;
                  })(s, e)
                    ? ea(s, sn(), t, i.transform, n, i)
                    : i.transform(n)
                );
              })(1, 1, t.loopSlides)
            );
      }
      const Cu = [
          [["", "slot", "container-start"]],
          [["", "slot", "wrapper-start"]],
          [["", "slot", "wrapper-end"]],
          [["", "slot", "container-end"]],
        ],
        xu = function (e) {
          return { loopSlides: e, key: "prepend" };
        },
        Su = function (e) {
          return { loopSlides: e, key: "" };
        },
        Eu = function (e) {
          return { loopSlides: e, key: "append" };
        },
        Tu = [
          "[slot=container-start]",
          "[slot=wrapper-start]",
          "[slot=wrapper-end]",
          "[slot=container-end]",
        ];
      function ku(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          e.constructor === Object
        );
      }
      function Iu(e, t) {
        Object.keys(t).forEach((n) => {
          void 0 !== e[n]
            ? (e[n] && !t[n]) ||
              (ku(t[n]) && ku(e[n]) && Object.keys(t[n]).length > 0
                ? Iu(e[n], t[n])
                : (e[n] = t[n]))
            : (e[n] = t[n]);
        });
      }
      function Mu(e) {
        return null != e && "" + e != "false";
      }
      const Ou = ["pagination", "navigation", "scrollbar", "virtual"];
      function Pu(e, t = {}) {
        if (ku(e)) return e;
        const n = Mu(e);
        return !0 === n ? t : n;
      }
      const Au = [
        "init",
        "_direction",
        "touchEventsTarget",
        "initialSlide",
        "_speed",
        "cssMode",
        "updateOnWindowResize",
        "resizeObserver",
        "nested",
        "_width",
        "_height",
        "preventInteractionOnTransition",
        "userAgent",
        "url",
        "_edgeSwipeDetection",
        "_edgeSwipeThreshold",
        "_freeMode",
        "_freeModeMomentum",
        "_freeModeMomentumRatio",
        "_freeModeMomentumBounce",
        "_freeModeMomentumBounceRatio",
        "_freeModeMomentumVelocityRatio",
        "_freeModeSticky",
        "_freeModeMinimumVelocity",
        "_autoHeight",
        "setWrapperSize",
        "virtualTranslate",
        "_effect",
        "breakpoints",
        "_spaceBetween",
        "_slidesPerView",
        "_slidesPerColumn",
        "_slidesPerColumnFill",
        "_slidesPerGroup",
        "_slidesPerGroupSkip",
        "_centeredSlides",
        "_centeredSlidesBounds",
        "_slidesOffsetBefore",
        "_slidesOffsetAfter",
        "normalizeSlideIndex",
        "_centerInsufficientSlides",
        "_watchOverflow",
        "roundLengths",
        "touchRatio",
        "touchAngle",
        "simulateTouch",
        "_shortSwipes",
        "_longSwipes",
        "longSwipesRatio",
        "longSwipesMs",
        "_followFinger",
        "allowTouchMove",
        "_threshold",
        "touchMoveStopPropagation",
        "touchStartPreventDefault",
        "touchStartForcePreventDefault",
        "touchReleaseOnEdges",
        "uniqueNavElements",
        "_resistance",
        "_resistanceRatio",
        "_watchSlidesProgress",
        "_watchSlidesVisibility",
        "_grabCursor",
        "preventClicks",
        "preventClicksPropagation",
        "_slideToClickedSlide",
        "_preloadImages",
        "updateOnImagesReady",
        "_loop",
        "_loopAdditionalSlides",
        "_loopedSlides",
        "_loopFillGroupWithBlank",
        "loopPreventsSlide",
        "_allowSlidePrev",
        "_allowSlideNext",
        "_swipeHandler",
        "_noSwiping",
        "noSwipingClass",
        "noSwipingSelector",
        "passiveListeners",
        "containerModifierClass",
        "slideClass",
        "slideBlankClass",
        "slideActiveClass",
        "slideDuplicateActiveClass",
        "slideVisibleClass",
        "slideDuplicateClass",
        "slideNextClass",
        "slideDuplicateNextClass",
        "slidePrevClass",
        "slideDuplicatePrevClass",
        "wrapperClass",
        "runCallbacksOnInit",
        "observer",
        "observeParents",
        "observeSlideChildren",
        "a11y",
        "autoplay",
        "_controller",
        "coverflowEffect",
        "cubeEffect",
        "fadeEffect",
        "flipEffect",
        "hashNavigation",
        "history",
        "keyboard",
        "lazy",
        "mousewheel",
        "_navigation",
        "_pagination",
        "parallax",
        "_scrollbar",
        "_thumbs",
        "virtual",
        "zoom",
      ].map((e) => e.replace(/_/, ""));
      function Du(e = {}) {
        const t = { on: {} },
          n = {};
        Iu(t, eu.defaults), Iu(t, eu.extendedDefaults), (t._emitClasses = !0);
        const s = {};
        return (
          Object.keys(e).forEach((i) => {
            const r = i.replace(/^_/, "");
            void 0 !== e[r] &&
              (Au.indexOf(r) >= 0
                ? ku(e[r])
                  ? ((t[r] = {}), (n[r] = {}), Iu(t[r], e[r]), Iu(n[r], e[r]))
                  : ((t[r] = e[r]), (n[r] = e[r]))
                : (s[r] = e[r]));
          }),
          { params: t, passedParams: n, rest: s }
        );
      }
      let Ru = (() => {
          class e {
            constructor(e) {
              (this.template = e),
                (this.class = ""),
                (this.slideData = {
                  isActive: !1,
                  isPrev: !1,
                  isNext: !1,
                  isVisible: !1,
                  isDuplicate: !1,
                });
            }
            set zoom(e) {
              this._zoom = Mu(e);
            }
            get zoom() {
              return this._zoom;
            }
            get classNames() {
              return this._classNames;
            }
            set classNames(e) {
              this._classNames !== e &&
                ((this._classNames = e),
                (this.slideData = {
                  isActive: this._hasClass([
                    "swiper-slide-active",
                    "swiper-slide-duplicate-active",
                  ]),
                  isVisible: this._hasClass(["swiper-slide-visible"]),
                  isDuplicate: this._hasClass(["swiper-slide-duplicate"]),
                  isPrev: this._hasClass([
                    "swiper-slide-prev",
                    "swiper-slide-duplicate-prev",
                  ]),
                  isNext: this._hasClass([
                    "swiper-slide-next",
                    "swiper-slide-duplicate-next",
                  ]),
                }));
            }
            _hasClass(e) {
              return e.some((e) => this._classNames.indexOf(e) >= 0);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(mr(Fo));
            }),
            (e.ɵdir = at({
              type: e,
              selectors: [["ng-template", "swiperSlide", ""]],
              inputs: {
                class: "class",
                zoom: "zoom",
                virtualIndex: "virtualIndex",
              },
            })),
            e
          );
        })(),
        Nu = (() => {
          class e {
            constructor(e, t, n, s) {
              (this._ngZone = e),
                (this.elementRef = t),
                (this._changeDetectorRef = n),
                (this._platformId = s),
                (this.slideClass = "swiper-slide"),
                (this.wrapperClass = "swiper-wrapper"),
                (this.showNavigation = !0),
                (this.showPagination = !0),
                (this.showScrollbar = !0),
                (this.s__beforeBreakpoint = new ta()),
                (this.s__containerClasses = new ta()),
                (this.s__slideClass = new ta()),
                (this.s__swiper = new ta()),
                (this.s_activeIndexChange = new ta()),
                (this.s_afterInit = new ta()),
                (this.s_autoplay = new ta()),
                (this.s_autoplayStart = new ta()),
                (this.s_autoplayStop = new ta()),
                (this.s_beforeDestroy = new ta()),
                (this.s_beforeInit = new ta()),
                (this.s_beforeLoopFix = new ta()),
                (this.s_beforeResize = new ta()),
                (this.s_beforeSlideChangeStart = new ta()),
                (this.s_beforeTransitionStart = new ta()),
                (this.s_breakpoint = new ta()),
                (this.s_changeDirection = new ta()),
                (this.s_click = new ta()),
                (this.s_doubleTap = new ta()),
                (this.s_doubleClick = new ta()),
                (this.s_destroy = new ta()),
                (this.s_fromEdge = new ta()),
                (this.s_hashChange = new ta()),
                (this.s_hashSet = new ta()),
                (this.s_imagesReady = new ta()),
                (this.s_init = new ta()),
                (this.s_keyPress = new ta()),
                (this.s_lazyImageLoad = new ta()),
                (this.s_lazyImageReady = new ta()),
                (this.s_loopFix = new ta()),
                (this.s_momentumBounce = new ta()),
                (this.s_navigationHide = new ta()),
                (this.s_navigationShow = new ta()),
                (this.s_observerUpdate = new ta()),
                (this.s_orientationchange = new ta()),
                (this.s_paginationHide = new ta()),
                (this.s_paginationRender = new ta()),
                (this.s_paginationShow = new ta()),
                (this.s_paginationUpdate = new ta()),
                (this.s_progress = new ta()),
                (this.s_reachBeginning = new ta()),
                (this.s_reachEnd = new ta()),
                (this.s_realIndexChange = new ta()),
                (this.s_resize = new ta()),
                (this.s_scroll = new ta()),
                (this.s_scrollbarDragEnd = new ta()),
                (this.s_scrollbarDragMove = new ta()),
                (this.s_scrollbarDragStart = new ta()),
                (this.s_setTransition = new ta()),
                (this.s_setTranslate = new ta()),
                (this.s_slideChange = new ta()),
                (this.s_slideChangeTransitionEnd = new ta()),
                (this.s_slideChangeTransitionStart = new ta()),
                (this.s_slideNextTransitionEnd = new ta()),
                (this.s_slideNextTransitionStart = new ta()),
                (this.s_slidePrevTransitionEnd = new ta()),
                (this.s_slidePrevTransitionStart = new ta()),
                (this.s_slideResetTransitionStart = new ta()),
                (this.s_slideResetTransitionEnd = new ta()),
                (this.s_sliderMove = new ta()),
                (this.s_sliderFirstMove = new ta()),
                (this.s_slidesLengthChange = new ta()),
                (this.s_slidesGridLengthChange = new ta()),
                (this.s_snapGridLengthChange = new ta()),
                (this.s_snapIndexChange = new ta()),
                (this.s_tap = new ta()),
                (this.s_toEdge = new ta()),
                (this.s_touchEnd = new ta()),
                (this.s_touchMove = new ta()),
                (this.s_touchMoveOpposite = new ta()),
                (this.s_touchStart = new ta()),
                (this.s_transitionEnd = new ta()),
                (this.s_transitionStart = new ta()),
                (this.s_update = new ta()),
                (this.s_zoomChange = new ta()),
                (this.s_swiper = new ta()),
                (this.indexChange = new ta()),
                (this._activeSlides = new x()),
                (this.containerClasses = "swiper-container"),
                (this.slidesChanges = (e) => {
                  (this.slides = e.map(
                    (e, t) => (
                      (e.slideIndex = t), (e.classNames = this.slideClass), e
                    )
                  )),
                    this.loop && !this.loopedSlides && this.calcLoopedSlides(),
                    this.virtual ||
                      ((this.prependSlides = tu(
                        this.slides.slice(
                          this.slides.length - this.loopedSlides
                        )
                      )),
                      (this.appendSlides = tu(
                        this.slides.slice(0, this.loopedSlides)
                      ))),
                    this._changeDetectorRef.detectChanges();
                }),
                (this.style = null),
                (this.updateVirtualSlides = (e) => {
                  !this.swiperRef ||
                    (this.currentVirtualData &&
                      this.currentVirtualData.from === e.from &&
                      this.currentVirtualData.to === e.to &&
                      this.currentVirtualData.offset === e.offset) ||
                    ((this.style = this.swiperRef.isHorizontal()
                      ? {
                          [this.swiperRef.rtlTranslate ? "right" : "left"]:
                            e.offset + "px",
                        }
                      : { top: e.offset + "px" }),
                    (this.currentVirtualData = e),
                    this._activeSlides.next(e.slides),
                    this._changeDetectorRef.detectChanges(),
                    this._ngZone.runOutsideAngular(() => {
                      this.swiperRef.updateSlides(),
                        this.swiperRef.updateProgress(),
                        this.swiperRef.updateSlidesClasses(),
                        this.swiperRef.lazy &&
                          this.swiperRef.params.lazy.enabled &&
                          this.swiperRef.lazy.load(),
                        this.swiperRef.virtual.update(!0);
                    }));
                });
            }
            set navigation(e) {
              var t, n, s, i;
              const r =
                  "boolean" != typeof this._navigation
                    ? null === (t = this._navigation) || void 0 === t
                      ? void 0
                      : t.nextEl
                    : null,
                o =
                  "boolean" != typeof this._navigation
                    ? null === (n = this._navigation) || void 0 === n
                      ? void 0
                      : n.prevEl
                    : null;
              (this._navigation = Pu(e, {
                nextEl: r || null,
                prevEl: o || null,
              })),
                "boolean" == typeof this._navigation ||
                  ("string" !=
                    typeof (null === (s = this._navigation) || void 0 === s
                      ? void 0
                      : s.nextEl) &&
                    "string" !=
                      typeof (null === (i = this._navigation) || void 0 === i
                        ? void 0
                        : i.prevEl)) ||
                  (this.showNavigation = !1);
            }
            get navigation() {
              return this._navigation;
            }
            set pagination(e) {
              var t, n;
              const s =
                "boolean" != typeof this._pagination
                  ? null === (t = this._pagination) || void 0 === t
                    ? void 0
                    : t.el
                  : null;
              (this._pagination = Pu(e, { el: s || null })),
                "boolean" != typeof this._pagination &&
                  "string" ==
                    typeof (null === (n = this._pagination) || void 0 === n
                      ? void 0
                      : n.el) &&
                  (this.showPagination = !1);
            }
            get pagination() {
              return this._pagination;
            }
            set scrollbar(e) {
              var t, n;
              const s =
                "boolean" != typeof this._scrollbar
                  ? null === (t = this._scrollbar) || void 0 === t
                    ? void 0
                    : t.el
                  : null;
              (this._scrollbar = Pu(e, { el: s || null })),
                "boolean" != typeof this._scrollbar &&
                  "string" ==
                    typeof (null === (n = this._scrollbar) || void 0 === n
                      ? void 0
                      : n.el) &&
                  (this.showScrollbar = !1);
            }
            get scrollbar() {
              return this._scrollbar;
            }
            set virtual(e) {
              this._virtual = Pu(e);
            }
            get virtual() {
              return this._virtual;
            }
            set index(e) {
              this.setIndex(e);
            }
            set config(e) {
              this.updateSwiper(e);
              const { params: t } = Du(e);
              Object.assign(this, t);
            }
            set prevElRef(e) {
              this._setElement(e, this.navigation, "navigation", "prevEl");
            }
            set nextElRef(e) {
              this._setElement(e, this.navigation, "navigation", "nextEl");
            }
            set scrollbarElRef(e) {
              this._setElement(e, this.scrollbar, "scrollbar");
            }
            set paginationElRef(e) {
              this._setElement(e, this.pagination, "pagination");
            }
            get activeSlides() {
              return this.virtual ? this._activeSlides : tu(this.slides);
            }
            get zoomContainerClass() {
              return "boolean" != typeof this.zoom
                ? this.zoom.containerClass
                : "swiper-zoom-container";
            }
            _setElement(e, t, n, s = "el") {
              if (!e || !t) return;
              if (t && e.nativeElement) {
                if (t[s] === e.nativeElement) return;
                t[s] = e.nativeElement;
              }
              const i = {};
              (i[n] = !0), this.updateInitSwiper(i);
            }
            ngOnInit() {
              const { params: e } = Du(this);
              Object.assign(this, e);
            }
            ngAfterViewInit() {
              this.childrenSlidesInit(),
                this.initSwiper(),
                this._changeDetectorRef.detectChanges(),
                setTimeout(() => {
                  this.s_swiper.emit(this.swiperRef);
                });
            }
            childrenSlidesInit() {
              this.slidesChanges(this.slidesEl),
                this.slidesEl.changes.subscribe(this.slidesChanges);
            }
            get isSwiperActive() {
              return this.swiperRef && !this.swiperRef.destroyed;
            }
            initSwiper() {
              const { params: e } = Du(this);
              Object.assign(this, e),
                this._ngZone.runOutsideAngular(() => {
                  (e.init = !1),
                    e.virtual || (e.observer = !0),
                    (e.onAny = (e, ...t) => {
                      const n = this["s_" + e];
                      n && n.emit(...t);
                    }),
                    Object.assign(e.on, {
                      _containerClasses(e, t) {
                        this.containerClasses = t;
                      },
                      _slideClasses: (e, t) => {
                        t.forEach(({ slideEl: e, classNames: t }, n) => {
                          const s =
                            parseInt(
                              e.getAttribute("data-swiper-slide-index")
                            ) || n;
                          if (this.virtual) {
                            const e = this.slides.find(
                              (e) => e.virtualIndex && e.virtualIndex === s
                            );
                            if (e) return void (e.classNames = t);
                          }
                          this.slides[s] && (this.slides[s].classNames = t);
                        }),
                          this._changeDetectorRef.detectChanges();
                      },
                    });
                  const t = new eu(e);
                  if (
                    ((t.loopCreate = () => {}),
                    (t.loopDestroy = () => {}),
                    e.loop && (t.loopedSlides = this.loopedSlides),
                    t.virtual && t.params.virtual.enabled)
                  ) {
                    t.virtual.slides = this.slides;
                    const e = {
                      cache: !1,
                      renderExternal: this.updateVirtualSlides,
                      renderExternalUpdate: !1,
                    };
                    Iu(t.params.virtual, e), Iu(t.originalParams.virtual, e);
                  }
                  "browser" === this._platformId &&
                    ((this.swiperRef = t.init(this.elementRef.nativeElement)),
                    this.swiperRef.virtual &&
                      this.swiperRef.params.virtual.enabled &&
                      this.swiperRef.virtual.update(!0),
                    this._changeDetectorRef.detectChanges(),
                    t.on("slideChange", () => {
                      this.indexChange.emit(this.swiperRef.realIndex);
                    }));
                });
            }
            ngOnChanges(e) {
              this.updateSwiper(e), this._changeDetectorRef.detectChanges();
            }
            updateInitSwiper(e) {
              e &&
                this.swiperRef &&
                !this.swiperRef.destroyed &&
                this._ngZone.runOutsideAngular(() => {
                  const {
                    pagination: t,
                    navigation: n,
                    scrollbar: s,
                    thumbs: i,
                  } = this.swiperRef;
                  e.pagination &&
                    (this.pagination &&
                    "boolean" != typeof this.pagination &&
                    this.pagination.el &&
                    t &&
                    !t.el
                      ? (this.updateParameter("pagination", this.pagination),
                        t.init(),
                        t.render(),
                        t.update())
                      : (t.destroy(), (t.el = null))),
                    e.scrollbar &&
                      (this.scrollbar &&
                      "boolean" != typeof this.scrollbar &&
                      this.scrollbar.el &&
                      s &&
                      !s.el
                        ? (this.updateParameter("scrollbar", this.scrollbar),
                          s.init(),
                          s.updateSize(),
                          s.setTranslate())
                        : (s.destroy(), (s.el = null))),
                    e.navigation &&
                      (this.navigation &&
                      "boolean" != typeof this.navigation &&
                      this.navigation.prevEl &&
                      this.navigation.nextEl &&
                      n &&
                      !n.prevEl &&
                      !n.nextEl
                        ? (this.updateParameter("navigation", this.navigation),
                          n.init(),
                          n.update())
                        : n.prevEl &&
                          n.nextEl &&
                          (n.destroy(), (n.nextEl = null), (n.prevEl = null))),
                    e.thumbs &&
                      this.thumbs &&
                      this.thumbs.swiper &&
                      (this.updateParameter("thumbs", this.thumbs),
                      i.init() && i.update(!0)),
                    e.controller &&
                      this.controller &&
                      this.controller.control &&
                      (this.swiperRef.controller.control = this.controller.control),
                    this.swiperRef.update();
                });
            }
            updateSwiper(e) {
              this._ngZone.runOutsideAngular(() => {
                var t, n;
                if (
                  !e.config &&
                  e &&
                  this.swiperRef &&
                  !this.swiperRef.destroyed
                ) {
                  for (const s in e) {
                    if (Ou.indexOf(s) >= 0) continue;
                    const i =
                      null !==
                        (n =
                          null === (t = e[s]) || void 0 === t
                            ? void 0
                            : t.currentValue) && void 0 !== n
                        ? n
                        : e[s];
                    this.updateParameter(s, i);
                  }
                  e.allowSlideNext &&
                    (this.swiperRef.allowSlideNext = this.allowSlideNext),
                    e.allowSlidePrev &&
                      (this.swiperRef.allowSlidePrev = this.allowSlidePrev),
                    e.direction &&
                      this.swiperRef.changeDirection(this.direction, !1),
                    e.breakpoints &&
                      (this.loop &&
                        !this.loopedSlides &&
                        this.calcLoopedSlides(),
                      (this.swiperRef.currentBreakpoint = null),
                      this.swiperRef.setBreakpoint()),
                    (e.thumbs || e.controller) && this.updateInitSwiper(e),
                    this.swiperRef.update();
                }
              });
            }
            calcLoopedSlides() {
              if (!this.loop) return;
              let e = this.slidesPerView;
              if (this.breakpoints) {
                const t = eu.prototype.getBreakpoint(this.breakpoints),
                  n = t in this.breakpoints ? this.breakpoints[t] : void 0;
                n && n.slidesPerView && (e = n.slidesPerView);
              }
              if ("auto" === e)
                return (
                  (this.loopedSlides = this.slides.length), this.slides.length
                );
              let t = this.loopedSlides || e;
              return (
                (t += this.loopAdditionalSlides),
                t > this.slides.length && (t = this.slides.length),
                (this.loopedSlides = t),
                t
              );
            }
            updateParameter(e, t) {
              if (!this.swiperRef || this.swiperRef.destroyed) return;
              const n = e.replace(/^_/, "");
              Object.keys(this.swiperRef.modules).indexOf(n) >= 0 &&
                Iu(t, this.swiperRef.modules[n].params[n]),
                ku(this.swiperRef.params[n]) && ku(t)
                  ? Iu(this.swiperRef.params[n], t)
                  : (this.swiperRef.params[n] = t);
            }
            setIndex(e, t, n) {
              this.isSwiperActive
                ? e !== this.swiperRef.activeIndex &&
                  this._ngZone.runOutsideAngular(() => {
                    this.loop
                      ? this.swiperRef.slideToLoop(e, t, !n)
                      : this.swiperRef.slideTo(e, t, !n);
                  })
                : (this.initialSlide = e);
            }
            ngOnDestroy() {
              this._ngZone.runOutsideAngular(() => {
                var e;
                null === (e = this.swiperRef) || void 0 === e || e.destroy();
              });
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(mr(Fa), mr(vo), mr($i), mr(Ea));
            }),
            (e.ɵcmp = tt({
              type: e,
              selectors: [["swiper"], ["", "swiper", ""]],
              contentQueries: function (e, t, n) {
                var s, i, r, o, a;
                1 & e &&
                  ((i = n),
                  (r = Ru),
                  (o = !0),
                  (function (e, t, n, s, i, r, o, a) {
                    e.firstCreatePass &&
                      (va(e, new oa(n, s, !1, i), o.index),
                      (function (e, t) {
                        const n = e.contentQueries || (e.contentQueries = []);
                        t !==
                          (e.contentQueries.length ? n[n.length - 1] : -1) &&
                          n.push(e.queries.length - 1, t);
                      })(e, a)),
                      ga(e, t);
                  })(Yt(), Ut(), r, o, a, 0, Xt(), i)),
                  2 & e && ha((s = fa())) && (t.slidesEl = s);
              },
              viewQuery: function (e, t) {
                var n;
                1 & e && (pa(nu, !0), pa(su, !0), pa(iu, !0), pa(ru, !0)),
                  2 & e &&
                    (ha((n = fa())) && (t.prevElRef = n.first),
                    ha((n = fa())) && (t.nextElRef = n.first),
                    ha((n = fa())) && (t.scrollbarElRef = n.first),
                    ha((n = fa())) && (t.paginationElRef = n.first));
              },
              hostVars: 2,
              hostBindings: function (e, t) {
                2 & e && Zr(Ze, Wr, t.containerClasses, !0);
              },
              inputs: {
                slideClass: "slideClass",
                wrapperClass: "wrapperClass",
                navigation: "navigation",
                pagination: "pagination",
                scrollbar: "scrollbar",
                virtual: "virtual",
                index: "index",
                config: "config",
                loopedSlides: "loopedSlides",
                initialSlide: "initialSlide",
                direction: "direction",
                touchEventsTarget: "touchEventsTarget",
                speed: "speed",
                cssMode: "cssMode",
                updateOnWindowResize: "updateOnWindowResize",
                resizeObserver: "resizeObserver",
                nested: "nested",
                width: "width",
                height: "height",
                preventInteractionOnTransition:
                  "preventInteractionOnTransition",
                userAgent: "userAgent",
                url: "url",
                edgeSwipeDetection: "edgeSwipeDetection",
                edgeSwipeThreshold: "edgeSwipeThreshold",
                freeMode: "freeMode",
                freeModeMomentum: "freeModeMomentum",
                freeModeMomentumRatio: "freeModeMomentumRatio",
                freeModeMomentumBounce: "freeModeMomentumBounce",
                freeModeMomentumBounceRatio: "freeModeMomentumBounceRatio",
                freeModeMomentumVelocityRatio: "freeModeMomentumVelocityRatio",
                freeModeSticky: "freeModeSticky",
                freeModeMinimumVelocity: "freeModeMinimumVelocity",
                autoHeight: "autoHeight",
                setWrapperSize: "setWrapperSize",
                virtualTranslate: "virtualTranslate",
                effect: "effect",
                breakpoints: "breakpoints",
                spaceBetween: "spaceBetween",
                slidesPerView: "slidesPerView",
                slidesPerColumn: "slidesPerColumn",
                slidesPerColumnFill: "slidesPerColumnFill",
                slidesPerGroup: "slidesPerGroup",
                slidesPerGroupSkip: "slidesPerGroupSkip",
                centeredSlides: "centeredSlides",
                centeredSlidesBounds: "centeredSlidesBounds",
                slidesOffsetBefore: "slidesOffsetBefore",
                slidesOffsetAfter: "slidesOffsetAfter",
                normalizeSlideIndex: "normalizeSlideIndex",
                centerInsufficientSlides: "centerInsufficientSlides",
                watchOverflow: "watchOverflow",
                roundLengths: "roundLengths",
                touchRatio: "touchRatio",
                touchAngle: "touchAngle",
                simulateTouch: "simulateTouch",
                shortSwipes: "shortSwipes",
                longSwipes: "longSwipes",
                longSwipesRatio: "longSwipesRatio",
                longSwipesMs: "longSwipesMs",
                followFinger: "followFinger",
                allowTouchMove: "allowTouchMove",
                threshold: "threshold",
                touchMoveStopPropagation: "touchMoveStopPropagation",
                touchStartPreventDefault: "touchStartPreventDefault",
                touchStartForcePreventDefault: "touchStartForcePreventDefault",
                touchReleaseOnEdges: "touchReleaseOnEdges",
                uniqueNavElements: "uniqueNavElements",
                resistance: "resistance",
                resistanceRatio: "resistanceRatio",
                watchSlidesProgress: "watchSlidesProgress",
                watchSlidesVisibility: "watchSlidesVisibility",
                grabCursor: "grabCursor",
                preventClicks: "preventClicks",
                preventClicksPropagation: "preventClicksPropagation",
                slideToClickedSlide: "slideToClickedSlide",
                preloadImages: "preloadImages",
                updateOnImagesReady: "updateOnImagesReady",
                loop: "loop",
                loopAdditionalSlides: "loopAdditionalSlides",
                loopFillGroupWithBlank: "loopFillGroupWithBlank",
                loopPreventsSlide: "loopPreventsSlide",
                allowSlidePrev: "allowSlidePrev",
                allowSlideNext: "allowSlideNext",
                swipeHandler: "swipeHandler",
                noSwiping: "noSwiping",
                noSwipingClass: "noSwipingClass",
                noSwipingSelector: "noSwipingSelector",
                passiveListeners: "passiveListeners",
                containerModifierClass: "containerModifierClass",
                slideBlankClass: "slideBlankClass",
                slideActiveClass: "slideActiveClass",
                slideDuplicateActiveClass: "slideDuplicateActiveClass",
                slideVisibleClass: "slideVisibleClass",
                slideDuplicateClass: "slideDuplicateClass",
                slideNextClass: "slideNextClass",
                slideDuplicateNextClass: "slideDuplicateNextClass",
                slidePrevClass: "slidePrevClass",
                slideDuplicatePrevClass: "slideDuplicatePrevClass",
                runCallbacksOnInit: "runCallbacksOnInit",
                observeParents: "observeParents",
                observeSlideChildren: "observeSlideChildren",
                a11y: "a11y",
                autoplay: "autoplay",
                controller: "controller",
                coverflowEffect: "coverflowEffect",
                cubeEffect: "cubeEffect",
                fadeEffect: "fadeEffect",
                flipEffect: "flipEffect",
                hashNavigation: "hashNavigation",
                history: "history",
                keyboard: "keyboard",
                lazy: "lazy",
                mousewheel: "mousewheel",
                parallax: "parallax",
                thumbs: "thumbs",
                zoom: "zoom",
              },
              outputs: {
                s__beforeBreakpoint: "_beforeBreakpoint",
                s__containerClasses: "_containerClasses",
                s__slideClass: "_slideClass",
                s__swiper: "_swiper",
                s_activeIndexChange: "activeIndexChange",
                s_afterInit: "afterInit",
                s_autoplay: "autoplay",
                s_autoplayStart: "autoplayStart",
                s_autoplayStop: "autoplayStop",
                s_beforeDestroy: "beforeDestroy",
                s_beforeInit: "beforeInit",
                s_beforeLoopFix: "beforeLoopFix",
                s_beforeResize: "beforeResize",
                s_beforeSlideChangeStart: "beforeSlideChangeStart",
                s_beforeTransitionStart: "beforeTransitionStart",
                s_breakpoint: "breakpoint",
                s_changeDirection: "changeDirection",
                s_click: "click",
                s_doubleTap: "doubleTap",
                s_doubleClick: "doubleClick",
                s_destroy: "destroy",
                s_fromEdge: "fromEdge",
                s_hashChange: "hashChange",
                s_hashSet: "hashSet",
                s_imagesReady: "imagesReady",
                s_init: "init",
                s_keyPress: "keyPress",
                s_lazyImageLoad: "lazyImageLoad",
                s_lazyImageReady: "lazyImageReady",
                s_loopFix: "loopFix",
                s_momentumBounce: "momentumBounce",
                s_navigationHide: "navigationHide",
                s_navigationShow: "navigationShow",
                s_observerUpdate: "observerUpdate",
                s_orientationchange: "orientationchange",
                s_paginationHide: "paginationHide",
                s_paginationRender: "paginationRender",
                s_paginationShow: "paginationShow",
                s_paginationUpdate: "paginationUpdate",
                s_progress: "progress",
                s_reachBeginning: "reachBeginning",
                s_reachEnd: "reachEnd",
                s_realIndexChange: "realIndexChange",
                s_resize: "resize",
                s_scroll: "scroll",
                s_scrollbarDragEnd: "scrollbarDragEnd",
                s_scrollbarDragMove: "scrollbarDragMove",
                s_scrollbarDragStart: "scrollbarDragStart",
                s_setTransition: "setTransition",
                s_setTranslate: "setTranslate",
                s_slideChange: "slideChange",
                s_slideChangeTransitionEnd: "slideChangeTransitionEnd",
                s_slideChangeTransitionStart: "slideChangeTransitionStart",
                s_slideNextTransitionEnd: "slideNextTransitionEnd",
                s_slideNextTransitionStart: "slideNextTransitionStart",
                s_slidePrevTransitionEnd: "slidePrevTransitionEnd",
                s_slidePrevTransitionStart: "slidePrevTransitionStart",
                s_slideResetTransitionStart: "slideResetTransitionStart",
                s_slideResetTransitionEnd: "slideResetTransitionEnd",
                s_sliderMove: "sliderMove",
                s_sliderFirstMove: "sliderFirstMove",
                s_slidesLengthChange: "slidesLengthChange",
                s_slidesGridLengthChange: "slidesGridLengthChange",
                s_snapGridLengthChange: "snapGridLengthChange",
                s_snapIndexChange: "snapIndexChange",
                s_tap: "tap",
                s_toEdge: "toEdge",
                s_touchEnd: "touchEnd",
                s_touchMove: "touchMove",
                s_touchMoveOpposite: "touchMoveOpposite",
                s_touchStart: "touchStart",
                s_transitionEnd: "transitionEnd",
                s_transitionStart: "transitionStart",
                s_update: "update",
                s_zoomChange: "zoomChange",
                s_swiper: "swiper",
                indexChange: "indexChange",
              },
              features: [kt],
              ngContentSelectors: Tu,
              decls: 13,
              vars: 16,
              consts: [
                [4, "ngIf"],
                ["class", "swiper-scrollbar", 4, "ngIf"],
                ["class", "swiper-pagination", 4, "ngIf"],
                [3, "ngClass"],
                [4, "ngTemplateOutlet", "ngTemplateOutletContext"],
                ["slidesTemplate", ""],
                [1, "swiper-button-prev"],
                ["prevElRef", ""],
                [1, "swiper-button-next"],
                ["nextElRef", ""],
                [1, "swiper-scrollbar"],
                ["scrollbarElRef", ""],
                [1, "swiper-pagination"],
                ["paginationElRef", ""],
                [3, "ngClass", "style", "ngSwitch", 4, "ngFor", "ngForOf"],
                [3, "ngClass", "ngSwitch"],
                [3, "ngClass", 4, "ngSwitchCase"],
                [4, "ngSwitchDefault"],
                [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
              ],
              template: function (e, t) {
                if (
                  (1 & e &&
                    ((function (e) {
                      const t = Ut()[16][6];
                      if (!t.projection) {
                        const n = (t.projection = We(e ? e.length : 1, null)),
                          s = n.slice();
                        let i = t.child;
                        for (; null !== i; ) {
                          const t = e ? Or(i, e) : 0;
                          null !== t &&
                            (s[t] ? (s[t].projectionNext = i) : (n[t] = i),
                            (s[t] = i)),
                            (i = i.next);
                        }
                      }
                    })(Cu),
                    Pr(0),
                    gr(1, ou, 5, 0, "ng-container", 0),
                    gr(2, au, 2, 0, "div", 1),
                    gr(3, lu, 2, 0, "div", 2),
                    _r(4, "div", 3),
                    Pr(5, 1),
                    gr(6, uu, 1, 0, void 0, 4),
                    gr(7, hu, 1, 0, void 0, 4),
                    gr(8, fu, 1, 0, void 0, 4),
                    Pr(9, 2),
                    br(),
                    Pr(10, 3),
                    gr(11, bu, 2, 3, "ng-template", null, 5, ya)),
                  2 & e)
                ) {
                  const e = vr(12);
                  Ss(1),
                    yr("ngIf", t.navigation && t.showNavigation),
                    Ss(1),
                    yr("ngIf", t.scrollbar && t.showScrollbar),
                    Ss(1),
                    yr("ngIf", t.pagination && t.showPagination),
                    Ss(1),
                    yr("ngClass", t.wrapperClass),
                    Ss(2),
                    yr("ngTemplateOutlet", e)(
                      "ngTemplateOutletContext",
                      Jo(10, xu, t.prependSlides)
                    ),
                    Ss(1),
                    yr("ngTemplateOutlet", e)(
                      "ngTemplateOutletContext",
                      Jo(12, Su, t.activeSlides)
                    ),
                    Ss(1),
                    yr("ngTemplateOutlet", e)(
                      "ngTemplateOutletContext",
                      Jo(14, Eu, t.appendSlides)
                    );
                }
              },
              directives: [wl, gl, Tl, ml, xl, Sl, El],
              pipes: [Pl],
              styles: [
                "\n      swiper {\n        display: block;\n      }\n    ",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            e
          );
        })(),
        Lu = (() => {
          class e {}
          return (
            (e.ɵmod = rt({ type: e })),
            (e.ɵinj = te({
              factory: function (t) {
                return new (t || e)();
              },
              imports: [[Al]],
            })),
            e
          );
        })();
      function Vu() {
        return (Vu =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var s in n)
                Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
            }
            return e;
          }).apply(this, arguments);
      }
      var ju = {
        update: function () {
          var e = this,
            t = e.params.navigation;
          if (!e.params.loop) {
            var n = e.navigation,
              s = n.$nextEl,
              i = n.$prevEl;
            i &&
              i.length > 0 &&
              (e.isBeginning
                ? i.addClass(t.disabledClass)
                : i.removeClass(t.disabledClass),
              i[
                e.params.watchOverflow && e.isLocked
                  ? "addClass"
                  : "removeClass"
              ](t.lockClass)),
              s &&
                s.length > 0 &&
                (e.isEnd
                  ? s.addClass(t.disabledClass)
                  : s.removeClass(t.disabledClass),
                s[
                  e.params.watchOverflow && e.isLocked
                    ? "addClass"
                    : "removeClass"
                ](t.lockClass));
          }
        },
        onPrevClick: function (e) {
          var t = this;
          e.preventDefault(),
            (t.isBeginning && !t.params.loop) || t.slidePrev();
        },
        onNextClick: function (e) {
          var t = this;
          e.preventDefault(), (t.isEnd && !t.params.loop) || t.slideNext();
        },
        init: function () {
          var e,
            t,
            n = this,
            s = n.params.navigation;
          (s.nextEl || s.prevEl) &&
            (s.nextEl &&
              ((e = Ic(s.nextEl)),
              n.params.uniqueNavElements &&
                "string" == typeof s.nextEl &&
                e.length > 1 &&
                1 === n.$el.find(s.nextEl).length &&
                (e = n.$el.find(s.nextEl))),
            s.prevEl &&
              ((t = Ic(s.prevEl)),
              n.params.uniqueNavElements &&
                "string" == typeof s.prevEl &&
                t.length > 1 &&
                1 === n.$el.find(s.prevEl).length &&
                (t = n.$el.find(s.prevEl))),
            e && e.length > 0 && e.on("click", n.navigation.onNextClick),
            t && t.length > 0 && t.on("click", n.navigation.onPrevClick),
            Ac(n.navigation, {
              $nextEl: e,
              nextEl: e && e[0],
              $prevEl: t,
              prevEl: t && t[0],
            }));
        },
        destroy: function () {
          var e = this,
            t = e.navigation,
            n = t.$nextEl,
            s = t.$prevEl;
          n &&
            n.length &&
            (n.off("click", e.navigation.onNextClick),
            n.removeClass(e.params.navigation.disabledClass)),
            s &&
              s.length &&
              (s.off("click", e.navigation.onPrevClick),
              s.removeClass(e.params.navigation.disabledClass));
        },
      };
      function zu() {
        return (zu =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var s in n)
                Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
            }
            return e;
          }).apply(this, arguments);
      }
      var Fu = {
        update: function () {
          var e = this,
            t = e.rtl,
            n = e.params.pagination;
          if (
            n.el &&
            e.pagination.el &&
            e.pagination.$el &&
            0 !== e.pagination.$el.length
          ) {
            var s,
              i =
                e.virtual && e.params.virtual.enabled
                  ? e.virtual.slides.length
                  : e.slides.length,
              r = e.pagination.$el,
              o = e.params.loop
                ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
                : e.snapGrid.length;
            if (
              (e.params.loop
                ? ((s = Math.ceil(
                    (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
                  )) >
                    i - 1 - 2 * e.loopedSlides && (s -= i - 2 * e.loopedSlides),
                  s > o - 1 && (s -= o),
                  s < 0 && "bullets" !== e.params.paginationType && (s = o + s))
                : (s =
                    void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
              "bullets" === n.type &&
                e.pagination.bullets &&
                e.pagination.bullets.length > 0)
            ) {
              var a,
                l,
                c,
                u = e.pagination.bullets;
              if (
                (n.dynamicBullets &&
                  ((e.pagination.bulletSize = u
                    .eq(0)
                    [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                  r.css(
                    e.isHorizontal() ? "width" : "height",
                    e.pagination.bulletSize * (n.dynamicMainBullets + 4) + "px"
                  ),
                  n.dynamicMainBullets > 1 &&
                    void 0 !== e.previousIndex &&
                    ((e.pagination.dynamicBulletIndex += s - e.previousIndex),
                    e.pagination.dynamicBulletIndex > n.dynamicMainBullets - 1
                      ? (e.pagination.dynamicBulletIndex =
                          n.dynamicMainBullets - 1)
                      : e.pagination.dynamicBulletIndex < 0 &&
                        (e.pagination.dynamicBulletIndex = 0)),
                  (c =
                    ((l =
                      (a = s - e.pagination.dynamicBulletIndex) +
                      (Math.min(u.length, n.dynamicMainBullets) - 1)) +
                      a) /
                    2)),
                u.removeClass(
                  n.bulletActiveClass +
                    " " +
                    n.bulletActiveClass +
                    "-next " +
                    n.bulletActiveClass +
                    "-next-next " +
                    n.bulletActiveClass +
                    "-prev " +
                    n.bulletActiveClass +
                    "-prev-prev " +
                    n.bulletActiveClass +
                    "-main"
                ),
                r.length > 1)
              )
                u.each(function (e) {
                  var t = Ic(e),
                    i = t.index();
                  i === s && t.addClass(n.bulletActiveClass),
                    n.dynamicBullets &&
                      (i >= a &&
                        i <= l &&
                        t.addClass(n.bulletActiveClass + "-main"),
                      i === a &&
                        t
                          .prev()
                          .addClass(n.bulletActiveClass + "-prev")
                          .prev()
                          .addClass(n.bulletActiveClass + "-prev-prev"),
                      i === l &&
                        t
                          .next()
                          .addClass(n.bulletActiveClass + "-next")
                          .next()
                          .addClass(n.bulletActiveClass + "-next-next"));
                });
              else {
                var d = u.eq(s),
                  h = d.index();
                if ((d.addClass(n.bulletActiveClass), n.dynamicBullets)) {
                  for (var p = u.eq(a), f = u.eq(l), g = a; g <= l; g += 1)
                    u.eq(g).addClass(n.bulletActiveClass + "-main");
                  if (e.params.loop)
                    if (h >= u.length - n.dynamicMainBullets) {
                      for (var v = n.dynamicMainBullets; v >= 0; v -= 1)
                        u.eq(u.length - v).addClass(
                          n.bulletActiveClass + "-main"
                        );
                      u.eq(u.length - n.dynamicMainBullets - 1).addClass(
                        n.bulletActiveClass + "-prev"
                      );
                    } else
                      p
                        .prev()
                        .addClass(n.bulletActiveClass + "-prev")
                        .prev()
                        .addClass(n.bulletActiveClass + "-prev-prev"),
                        f
                          .next()
                          .addClass(n.bulletActiveClass + "-next")
                          .next()
                          .addClass(n.bulletActiveClass + "-next-next");
                  else
                    p
                      .prev()
                      .addClass(n.bulletActiveClass + "-prev")
                      .prev()
                      .addClass(n.bulletActiveClass + "-prev-prev"),
                      f
                        .next()
                        .addClass(n.bulletActiveClass + "-next")
                        .next()
                        .addClass(n.bulletActiveClass + "-next-next");
                }
              }
              if (n.dynamicBullets) {
                var m = Math.min(u.length, n.dynamicMainBullets + 4),
                  y =
                    (e.pagination.bulletSize * m - e.pagination.bulletSize) /
                      2 -
                    c * e.pagination.bulletSize,
                  w = t ? "right" : "left";
                u.css(e.isHorizontal() ? w : "top", y + "px");
              }
            }
            if (
              ("fraction" === n.type &&
                (r
                  .find("." + n.currentClass)
                  .text(n.formatFractionCurrent(s + 1)),
                r.find("." + n.totalClass).text(n.formatFractionTotal(o))),
              "progressbar" === n.type)
            ) {
              var _;
              _ = n.progressbarOpposite
                ? e.isHorizontal()
                  ? "vertical"
                  : "horizontal"
                : e.isHorizontal()
                ? "horizontal"
                : "vertical";
              var b = (s + 1) / o,
                C = 1,
                x = 1;
              "horizontal" === _ ? (C = b) : (x = b),
                r
                  .find("." + n.progressbarFillClass)
                  .transform(
                    "translate3d(0,0,0) scaleX(" + C + ") scaleY(" + x + ")"
                  )
                  .transition(e.params.speed);
            }
            "custom" === n.type && n.renderCustom
              ? (r.html(n.renderCustom(e, s + 1, o)),
                e.emit("paginationRender", r[0]))
              : e.emit("paginationUpdate", r[0]),
              r[
                e.params.watchOverflow && e.isLocked
                  ? "addClass"
                  : "removeClass"
              ](n.lockClass);
          }
        },
        render: function () {
          var e = this,
            t = e.params.pagination;
          if (
            t.el &&
            e.pagination.el &&
            e.pagination.$el &&
            0 !== e.pagination.$el.length
          ) {
            var n =
                e.virtual && e.params.virtual.enabled
                  ? e.virtual.slides.length
                  : e.slides.length,
              s = e.pagination.$el,
              i = "";
            if ("bullets" === t.type) {
              var r = e.params.loop
                ? Math.ceil((n - 2 * e.loopedSlides) / e.params.slidesPerGroup)
                : e.snapGrid.length;
              e.params.freeMode && !e.params.loop && r > n && (r = n);
              for (var o = 0; o < r; o += 1)
                i += t.renderBullet
                  ? t.renderBullet.call(e, o, t.bulletClass)
                  : "<" +
                    t.bulletElement +
                    ' class="' +
                    t.bulletClass +
                    '"></' +
                    t.bulletElement +
                    ">";
              s.html(i),
                (e.pagination.bullets = s.find(
                  "." + t.bulletClass.replace(/ /g, ".")
                ));
            }
            "fraction" === t.type &&
              ((i = t.renderFraction
                ? t.renderFraction.call(e, t.currentClass, t.totalClass)
                : '<span class="' +
                  t.currentClass +
                  '"></span> / <span class="' +
                  t.totalClass +
                  '"></span>'),
              s.html(i)),
              "progressbar" === t.type &&
                ((i = t.renderProgressbar
                  ? t.renderProgressbar.call(e, t.progressbarFillClass)
                  : '<span class="' + t.progressbarFillClass + '"></span>'),
                s.html(i)),
              "custom" !== t.type &&
                e.emit("paginationRender", e.pagination.$el[0]);
          }
        },
        init: function () {
          var e = this,
            t = e.params.pagination;
          if (t.el) {
            var n = Ic(t.el);
            0 !== n.length &&
              (e.params.uniqueNavElements &&
                "string" == typeof t.el &&
                n.length > 1 &&
                (n = e.$el.find(t.el)),
              "bullets" === t.type &&
                t.clickable &&
                n.addClass(t.clickableClass),
              n.addClass(t.modifierClass + t.type),
              "bullets" === t.type &&
                t.dynamicBullets &&
                (n.addClass("" + t.modifierClass + t.type + "-dynamic"),
                (e.pagination.dynamicBulletIndex = 0),
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
              "progressbar" === t.type &&
                t.progressbarOpposite &&
                n.addClass(t.progressbarOppositeClass),
              t.clickable &&
                n.on(
                  "click",
                  "." + t.bulletClass.replace(/ /g, "."),
                  function (t) {
                    t.preventDefault();
                    var n = Ic(this).index() * e.params.slidesPerGroup;
                    e.params.loop && (n += e.loopedSlides), e.slideTo(n);
                  }
                ),
              Ac(e.pagination, { $el: n, el: n[0] }));
          }
        },
        destroy: function () {
          var e = this,
            t = e.params.pagination;
          if (
            t.el &&
            e.pagination.el &&
            e.pagination.$el &&
            0 !== e.pagination.$el.length
          ) {
            var n = e.pagination.$el;
            n.removeClass(t.hiddenClass),
              n.removeClass(t.modifierClass + t.type),
              e.pagination.bullets &&
                e.pagination.bullets.removeClass(t.bulletActiveClass),
              t.clickable &&
                n.off("click", "." + t.bulletClass.replace(/ /g, "."));
          }
        },
      };
      function Hu() {
        return (Hu =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var s in n)
                Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
            }
            return e;
          }).apply(this, arguments);
      }
      var Bu = {
        setTranslate: function () {
          var e = this;
          if (e.params.scrollbar.el && e.scrollbar.el) {
            var t = e.scrollbar,
              n = t.dragSize,
              s = t.trackSize,
              i = t.$dragEl,
              r = t.$el,
              o = e.params.scrollbar,
              a = n,
              l = (s - n) * e.progress;
            e.rtlTranslate
              ? (l = -l) > 0
                ? ((a = n - l), (l = 0))
                : -l + n > s && (a = s + l)
              : l < 0
              ? ((a = n + l), (l = 0))
              : l + n > s && (a = s - l),
              e.isHorizontal()
                ? (i.transform("translate3d(" + l + "px, 0, 0)"),
                  (i[0].style.width = a + "px"))
                : (i.transform("translate3d(0px, " + l + "px, 0)"),
                  (i[0].style.height = a + "px")),
              o.hide &&
                (clearTimeout(e.scrollbar.timeout),
                (r[0].style.opacity = 1),
                (e.scrollbar.timeout = setTimeout(function () {
                  (r[0].style.opacity = 0), r.transition(400);
                }, 1e3)));
          }
        },
        setTransition: function (e) {
          var t = this;
          t.params.scrollbar.el &&
            t.scrollbar.el &&
            t.scrollbar.$dragEl.transition(e);
        },
        updateSize: function () {
          var e = this;
          if (e.params.scrollbar.el && e.scrollbar.el) {
            var t = e.scrollbar,
              n = t.$dragEl,
              s = t.$el;
            (n[0].style.width = ""), (n[0].style.height = "");
            var i,
              r = e.isHorizontal() ? s[0].offsetWidth : s[0].offsetHeight,
              o = e.size / e.virtualSize,
              a = o * (r / e.size);
            (i =
              "auto" === e.params.scrollbar.dragSize
                ? r * o
                : parseInt(e.params.scrollbar.dragSize, 10)),
              e.isHorizontal()
                ? (n[0].style.width = i + "px")
                : (n[0].style.height = i + "px"),
              (s[0].style.display = o >= 1 ? "none" : ""),
              e.params.scrollbar.hide && (s[0].style.opacity = 0),
              Ac(t, { trackSize: r, divider: o, moveDivider: a, dragSize: i }),
              t.$el[
                e.params.watchOverflow && e.isLocked
                  ? "addClass"
                  : "removeClass"
              ](e.params.scrollbar.lockClass);
          }
        },
        getPointerPosition: function (e) {
          return this.isHorizontal()
            ? "touchstart" === e.type || "touchmove" === e.type
              ? e.targetTouches[0].clientX
              : e.clientX
            : "touchstart" === e.type || "touchmove" === e.type
            ? e.targetTouches[0].clientY
            : e.clientY;
        },
        setDragPosition: function (e) {
          var t,
            n = this,
            s = n.scrollbar,
            i = n.rtlTranslate,
            r = s.$el,
            o = s.dragSize,
            a = s.trackSize,
            l = s.dragStartPos;
          (t =
            (s.getPointerPosition(e) -
              r.offset()[n.isHorizontal() ? "left" : "top"] -
              (null !== l ? l : o / 2)) /
            (a - o)),
            (t = Math.max(Math.min(t, 1), 0)),
            i && (t = 1 - t);
          var c = n.minTranslate() + (n.maxTranslate() - n.minTranslate()) * t;
          n.updateProgress(c),
            n.setTranslate(c),
            n.updateActiveIndex(),
            n.updateSlidesClasses();
        },
        onDragStart: function (e) {
          var t = this,
            n = t.params.scrollbar,
            s = t.scrollbar,
            i = t.$wrapperEl,
            r = s.$el,
            o = s.$dragEl;
          (t.scrollbar.isTouched = !0),
            (t.scrollbar.dragStartPos =
              e.target === o[0] || e.target === o
                ? s.getPointerPosition(e) -
                  e.target.getBoundingClientRect()[
                    t.isHorizontal() ? "left" : "top"
                  ]
                : null),
            e.preventDefault(),
            e.stopPropagation(),
            i.transition(100),
            o.transition(100),
            s.setDragPosition(e),
            clearTimeout(t.scrollbar.dragTimeout),
            r.transition(0),
            n.hide && r.css("opacity", 1),
            t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"),
            t.emit("scrollbarDragStart", e);
        },
        onDragMove: function (e) {
          var t = this,
            n = t.scrollbar,
            s = t.$wrapperEl,
            i = n.$el,
            r = n.$dragEl;
          t.scrollbar.isTouched &&
            (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
            n.setDragPosition(e),
            s.transition(0),
            i.transition(0),
            r.transition(0),
            t.emit("scrollbarDragMove", e));
        },
        onDragEnd: function (e) {
          var t = this,
            n = t.params.scrollbar,
            s = t.$wrapperEl,
            i = t.scrollbar.$el;
          t.scrollbar.isTouched &&
            ((t.scrollbar.isTouched = !1),
            t.params.cssMode &&
              (t.$wrapperEl.css("scroll-snap-type", ""), s.transition("")),
            n.hide &&
              (clearTimeout(t.scrollbar.dragTimeout),
              (t.scrollbar.dragTimeout = Mc(function () {
                i.css("opacity", 0), i.transition(400);
              }, 1e3))),
            t.emit("scrollbarDragEnd", e),
            n.snapOnRelease && t.slideToClosest());
        },
        enableDraggable: function () {
          var e = this;
          if (e.params.scrollbar.el) {
            var t = uc(),
              n = e.touchEventsTouch,
              s = e.touchEventsDesktop,
              i = e.params,
              r = e.support,
              o = e.scrollbar.$el[0],
              a = !(!r.passiveListener || !i.passiveListeners) && {
                passive: !1,
                capture: !1,
              },
              l = !(!r.passiveListener || !i.passiveListeners) && {
                passive: !0,
                capture: !1,
              };
            o &&
              (r.touch
                ? (o.addEventListener(n.start, e.scrollbar.onDragStart, a),
                  o.addEventListener(n.move, e.scrollbar.onDragMove, a),
                  o.addEventListener(n.end, e.scrollbar.onDragEnd, l))
                : (o.addEventListener(s.start, e.scrollbar.onDragStart, a),
                  t.addEventListener(s.move, e.scrollbar.onDragMove, a),
                  t.addEventListener(s.end, e.scrollbar.onDragEnd, l)));
          }
        },
        disableDraggable: function () {
          var e = this;
          if (e.params.scrollbar.el) {
            var t = uc(),
              n = e.touchEventsTouch,
              s = e.touchEventsDesktop,
              i = e.params,
              r = e.support,
              o = e.scrollbar.$el[0],
              a = !(!r.passiveListener || !i.passiveListeners) && {
                passive: !1,
                capture: !1,
              },
              l = !(!r.passiveListener || !i.passiveListeners) && {
                passive: !0,
                capture: !1,
              };
            o &&
              (r.touch
                ? (o.removeEventListener(n.start, e.scrollbar.onDragStart, a),
                  o.removeEventListener(n.move, e.scrollbar.onDragMove, a),
                  o.removeEventListener(n.end, e.scrollbar.onDragEnd, l))
                : (o.removeEventListener(s.start, e.scrollbar.onDragStart, a),
                  t.removeEventListener(s.move, e.scrollbar.onDragMove, a),
                  t.removeEventListener(s.end, e.scrollbar.onDragEnd, l)));
          }
        },
        init: function () {
          var e = this;
          if (e.params.scrollbar.el) {
            var t = e.scrollbar,
              n = e.$el,
              s = e.params.scrollbar,
              i = Ic(s.el);
            e.params.uniqueNavElements &&
              "string" == typeof s.el &&
              i.length > 1 &&
              1 === n.find(s.el).length &&
              (i = n.find(s.el));
            var r = i.find("." + e.params.scrollbar.dragClass);
            0 === r.length &&
              ((r = Ic(
                '<div class="' + e.params.scrollbar.dragClass + '"></div>'
              )),
              i.append(r)),
              Ac(t, { $el: i, el: i[0], $dragEl: r, dragEl: r[0] }),
              s.draggable && t.enableDraggable();
          }
        },
        destroy: function () {
          this.scrollbar.disableDraggable();
        },
      };
      function $u() {
        return ($u =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var s in n)
                Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
            }
            return e;
          }).apply(this, arguments);
      }
      var Gu = {
        getRandomNumber: function (e) {
          return (
            void 0 === e && (e = 16),
            "x".repeat(e).replace(/x/g, function () {
              return Math.round(16 * Math.random()).toString(16);
            })
          );
        },
        makeElFocusable: function (e) {
          return e.attr("tabIndex", "0"), e;
        },
        makeElNotFocusable: function (e) {
          return e.attr("tabIndex", "-1"), e;
        },
        addElRole: function (e, t) {
          return e.attr("role", t), e;
        },
        addElRoleDescription: function (e, t) {
          return e.attr("aria-role-description", t), e;
        },
        addElControls: function (e, t) {
          return e.attr("aria-controls", t), e;
        },
        addElLabel: function (e, t) {
          return e.attr("aria-label", t), e;
        },
        addElId: function (e, t) {
          return e.attr("id", t), e;
        },
        addElLive: function (e, t) {
          return e.attr("aria-live", t), e;
        },
        disableEl: function (e) {
          return e.attr("aria-disabled", !0), e;
        },
        enableEl: function (e) {
          return e.attr("aria-disabled", !1), e;
        },
        onEnterOrSpaceKey: function (e) {
          if (13 === e.keyCode || 32 === e.keyCode) {
            var t = this,
              n = t.params.a11y,
              s = Ic(e.target);
            t.navigation &&
              t.navigation.$nextEl &&
              s.is(t.navigation.$nextEl) &&
              ((t.isEnd && !t.params.loop) || t.slideNext(),
              t.a11y.notify(t.isEnd ? n.lastSlideMessage : n.nextSlideMessage)),
              t.navigation &&
                t.navigation.$prevEl &&
                s.is(t.navigation.$prevEl) &&
                ((t.isBeginning && !t.params.loop) || t.slidePrev(),
                t.a11y.notify(
                  t.isBeginning ? n.firstSlideMessage : n.prevSlideMessage
                )),
              t.pagination &&
                s.is(
                  "." + t.params.pagination.bulletClass.replace(/ /g, ".")
                ) &&
                s[0].click();
          }
        },
        notify: function (e) {
          var t = this.a11y.liveRegion;
          0 !== t.length && (t.html(""), t.html(e));
        },
        updateNavigation: function () {
          var e = this;
          if (!e.params.loop && e.navigation) {
            var t = e.navigation,
              n = t.$nextEl,
              s = t.$prevEl;
            s &&
              s.length > 0 &&
              (e.isBeginning
                ? (e.a11y.disableEl(s), e.a11y.makeElNotFocusable(s))
                : (e.a11y.enableEl(s), e.a11y.makeElFocusable(s))),
              n &&
                n.length > 0 &&
                (e.isEnd
                  ? (e.a11y.disableEl(n), e.a11y.makeElNotFocusable(n))
                  : (e.a11y.enableEl(n), e.a11y.makeElFocusable(n)));
          }
        },
        updatePagination: function () {
          var e = this,
            t = e.params.a11y;
          e.pagination &&
            e.params.pagination.clickable &&
            e.pagination.bullets &&
            e.pagination.bullets.length &&
            e.pagination.bullets.each(function (n) {
              var s = Ic(n);
              e.a11y.makeElFocusable(s),
                e.params.pagination.renderBullet ||
                  (e.a11y.addElRole(s, "button"),
                  e.a11y.addElLabel(
                    s,
                    t.paginationBulletMessage.replace(
                      /\{\{index\}\}/,
                      s.index() + 1
                    )
                  ));
            });
        },
        init: function () {
          var e = this,
            t = e.params.a11y;
          e.$el.append(e.a11y.liveRegion);
          var n = e.$el;
          t.containerRoleDescriptionMessage &&
            e.a11y.addElRoleDescription(n, t.containerRoleDescriptionMessage),
            t.containerMessage && e.a11y.addElLabel(n, t.containerMessage);
          var s,
            i,
            r = e.$wrapperEl,
            o = r.attr("id") || "swiper-wrapper-" + e.a11y.getRandomNumber(16);
          e.a11y.addElId(r, o),
            e.a11y.addElLive(
              r,
              e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite"
            ),
            t.itemRoleDescriptionMessage &&
              e.a11y.addElRoleDescription(
                Ic(e.slides),
                t.itemRoleDescriptionMessage
              ),
            e.a11y.addElRole(Ic(e.slides), "group"),
            e.slides.each(function (t) {
              var n = Ic(t);
              e.a11y.addElLabel(n, n.index() + 1 + " / " + e.slides.length);
            }),
            e.navigation && e.navigation.$nextEl && (s = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl),
            s &&
              s.length &&
              (e.a11y.makeElFocusable(s),
              "BUTTON" !== s[0].tagName &&
                (e.a11y.addElRole(s, "button"),
                s.on("keydown", e.a11y.onEnterOrSpaceKey)),
              e.a11y.addElLabel(s, t.nextSlideMessage),
              e.a11y.addElControls(s, o)),
            i &&
              i.length &&
              (e.a11y.makeElFocusable(i),
              "BUTTON" !== i[0].tagName &&
                (e.a11y.addElRole(i, "button"),
                i.on("keydown", e.a11y.onEnterOrSpaceKey)),
              e.a11y.addElLabel(i, t.prevSlideMessage),
              e.a11y.addElControls(i, o)),
            e.pagination &&
              e.params.pagination.clickable &&
              e.pagination.bullets &&
              e.pagination.bullets.length &&
              e.pagination.$el.on(
                "keydown",
                "." + e.params.pagination.bulletClass.replace(/ /g, "."),
                e.a11y.onEnterOrSpaceKey
              );
        },
        destroy: function () {
          var e,
            t,
            n = this;
          n.a11y.liveRegion &&
            n.a11y.liveRegion.length > 0 &&
            n.a11y.liveRegion.remove(),
            n.navigation && n.navigation.$nextEl && (e = n.navigation.$nextEl),
            n.navigation && n.navigation.$prevEl && (t = n.navigation.$prevEl),
            e && e.off("keydown", n.a11y.onEnterOrSpaceKey),
            t && t.off("keydown", n.a11y.onEnterOrSpaceKey),
            n.pagination &&
              n.params.pagination.clickable &&
              n.pagination.bullets &&
              n.pagination.bullets.length &&
              n.pagination.$el.off(
                "keydown",
                "." + n.params.pagination.bulletClass.replace(/ /g, "."),
                n.a11y.onEnterOrSpaceKey
              );
        },
      };
      function qu(e, t) {
        1 & e &&
          (_r(0, "div", 20),
          _r(1, "h3"),
          so(2, "Construcci\xf3n de Bases de Datos"),
          br(),
          _r(3, "span"),
          so(
            4,
            "En esta etapa se construye el modelo de base de datos que almacenar\xe1 la documentaci\xf3n recolectada en campo, esta depender\xe1 de los requerimientos del cliente y de las caracter\xedsticas de las redes. "
          ),
          br(),
          br());
      }
      function Wu(e, t) {
        1 & e &&
          (_r(0, "div", 20),
          _r(1, "h3"),
          so(2, "Etapa de Inspecci\xf3n"),
          br(),
          _r(3, "span"),
          so(
            4,
            " Levantamiento de informaci\xf3n en campo de todo lo correspondiente al abastecimiento y almacenamiento del producto (medidas, materiales, tipos de piezas, estado f\xedsico) como productos se pueden tener fotograf\xedas, fichas y planos."
          ),
          br(),
          br());
      }
      function Zu(e, t) {
        1 & e &&
          (_r(0, "div", 20),
          _r(1, "h3"),
          so(2, "Etapa de Edici\xf3n"),
          br(),
          _r(3, "span"),
          so(
            4,
            " Se procede a editar y almacenar la informaci\xf3n obtenida de la etapa anterior en las bases de datos, si esta previamente exist\xeda se realiza una corroboraci\xf3n de informaci\xf3n."
          ),
          br(),
          br());
      }
      function Uu(e, t) {
        1 & e &&
          (_r(0, "div", 20),
          _r(1, "h3"),
          so(2, "Integraci\xf3n de los SIG"),
          br(),
          _r(3, "span"),
          so(
            4,
            "Se relaciona la informaci\xf3n recolectada y editada a la informaci\xf3n geogr\xe1fica digital, esto se registra en las Geodatabase Corporativas de la entidad."
          ),
          br(),
          br());
      }
      const Yu = function () {
        return { clickable: !0, el: ".swiper-pagination" };
      };
      eu.use([
        {
          name: "navigation",
          params: {
            navigation: {
              nextEl: null,
              prevEl: null,
              hideOnClick: !1,
              disabledClass: "swiper-button-disabled",
              hiddenClass: "swiper-button-hidden",
              lockClass: "swiper-button-lock",
            },
          },
          create: function () {
            Dc(this, { navigation: Vu({}, ju) });
          },
          on: {
            init: function (e) {
              e.navigation.init(), e.navigation.update();
            },
            toEdge: function (e) {
              e.navigation.update();
            },
            fromEdge: function (e) {
              e.navigation.update();
            },
            destroy: function (e) {
              e.navigation.destroy();
            },
            click: function (e, t) {
              var n = e.navigation,
                s = n.$nextEl,
                i = n.$prevEl,
                r = t.target;
              if (
                e.params.navigation.hideOnClick &&
                !Ic(r).is(i) &&
                !Ic(r).is(s)
              ) {
                if (
                  e.pagination &&
                  e.params.pagination &&
                  e.params.pagination.clickable &&
                  (e.pagination.el === r || e.pagination.el.contains(r))
                )
                  return;
                var o;
                s
                  ? (o = s.hasClass(e.params.navigation.hiddenClass))
                  : i && (o = i.hasClass(e.params.navigation.hiddenClass)),
                  e.emit(!0 === o ? "navigationShow" : "navigationHide"),
                  s && s.toggleClass(e.params.navigation.hiddenClass),
                  i && i.toggleClass(e.params.navigation.hiddenClass);
              }
            },
          },
        },
        {
          name: "pagination",
          params: {
            pagination: {
              el: null,
              bulletElement: "span",
              clickable: !1,
              hideOnClick: !1,
              renderBullet: null,
              renderProgressbar: null,
              renderFraction: null,
              renderCustom: null,
              progressbarOpposite: !1,
              type: "bullets",
              dynamicBullets: !1,
              dynamicMainBullets: 1,
              formatFractionCurrent: function (e) {
                return e;
              },
              formatFractionTotal: function (e) {
                return e;
              },
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
              modifierClass: "swiper-pagination-",
              currentClass: "swiper-pagination-current",
              totalClass: "swiper-pagination-total",
              hiddenClass: "swiper-pagination-hidden",
              progressbarFillClass: "swiper-pagination-progressbar-fill",
              progressbarOppositeClass:
                "swiper-pagination-progressbar-opposite",
              clickableClass: "swiper-pagination-clickable",
              lockClass: "swiper-pagination-lock",
            },
          },
          create: function () {
            Dc(this, { pagination: zu({ dynamicBulletIndex: 0 }, Fu) });
          },
          on: {
            init: function (e) {
              e.pagination.init(), e.pagination.render(), e.pagination.update();
            },
            activeIndexChange: function (e) {
              (e.params.loop || void 0 === e.snapIndex) &&
                e.pagination.update();
            },
            snapIndexChange: function (e) {
              e.params.loop || e.pagination.update();
            },
            slidesLengthChange: function (e) {
              e.params.loop && (e.pagination.render(), e.pagination.update());
            },
            snapGridLengthChange: function (e) {
              e.params.loop || (e.pagination.render(), e.pagination.update());
            },
            destroy: function (e) {
              e.pagination.destroy();
            },
            click: function (e, t) {
              var n = t.target;
              if (
                e.params.pagination.el &&
                e.params.pagination.hideOnClick &&
                e.pagination.$el.length > 0 &&
                !Ic(n).hasClass(e.params.pagination.bulletClass)
              ) {
                if (
                  e.navigation &&
                  ((e.navigation.nextEl && n === e.navigation.nextEl) ||
                    (e.navigation.prevEl && n === e.navigation.prevEl))
                )
                  return;
                var s = e.pagination.$el.hasClass(
                  e.params.pagination.hiddenClass
                );
                e.emit(!0 === s ? "paginationShow" : "paginationHide"),
                  e.pagination.$el.toggleClass(e.params.pagination.hiddenClass);
              }
            },
          },
        },
        {
          name: "scrollbar",
          params: {
            scrollbar: {
              el: null,
              dragSize: "auto",
              hide: !1,
              draggable: !1,
              snapOnRelease: !0,
              lockClass: "swiper-scrollbar-lock",
              dragClass: "swiper-scrollbar-drag",
            },
          },
          create: function () {
            Dc(this, {
              scrollbar: Hu(
                { isTouched: !1, timeout: null, dragTimeout: null },
                Bu
              ),
            });
          },
          on: {
            init: function (e) {
              e.scrollbar.init(),
                e.scrollbar.updateSize(),
                e.scrollbar.setTranslate();
            },
            update: function (e) {
              e.scrollbar.updateSize();
            },
            resize: function (e) {
              e.scrollbar.updateSize();
            },
            observerUpdate: function (e) {
              e.scrollbar.updateSize();
            },
            setTranslate: function (e) {
              e.scrollbar.setTranslate();
            },
            setTransition: function (e, t) {
              e.scrollbar.setTransition(t);
            },
            destroy: function (e) {
              e.scrollbar.destroy();
            },
          },
        },
        {
          name: "a11y",
          params: {
            a11y: {
              enabled: !0,
              notificationClass: "swiper-notification",
              prevSlideMessage: "Previous slide",
              nextSlideMessage: "Next slide",
              firstSlideMessage: "This is the first slide",
              lastSlideMessage: "This is the last slide",
              paginationBulletMessage: "Go to slide {{index}}",
              containerMessage: null,
              containerRoleDescriptionMessage: null,
              itemRoleDescriptionMessage: null,
            },
          },
          create: function () {
            Dc(this, {
              a11y: $u({}, Gu, {
                liveRegion: Ic(
                  '<span class="' +
                    this.params.a11y.notificationClass +
                    '" aria-live="assertive" aria-atomic="true"></span>'
                ),
              }),
            });
          },
          on: {
            afterInit: function (e) {
              e.params.a11y.enabled &&
                (e.a11y.init(), e.a11y.updateNavigation());
            },
            toEdge: function (e) {
              e.params.a11y.enabled && e.a11y.updateNavigation();
            },
            fromEdge: function (e) {
              e.params.a11y.enabled && e.a11y.updateNavigation();
            },
            paginationUpdate: function (e) {
              e.params.a11y.enabled && e.a11y.updatePagination();
            },
            destroy: function (e) {
              e.params.a11y.enabled && e.a11y.destroy();
            },
          },
        },
      ]);
      let Qu = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
            get windowSize() {
              return window.innerHeight;
            }
            next(e) {
              e.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
              });
            }
            onSwiper(e) {
              console.log(e);
            }
            onSlideChange() {
              console.log("slide change");
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵcmp = tt({
              type: e,
              selectors: [["app-main"]],
              decls: 64,
              vars: 10,
              consts: [
                [1, "parallax"],
                ["start", ""],
                [1, "parallax__card"],
                [1, "button", 3, "click"],
                [1, "content"],
                ["first", ""],
                [1, "content__card"],
                ["effect", "fade", 3, "pagination"],
                ["swiperSlide", ""],
                [1, "swiper-pagination"],
                [1, "parallax-second"],
                ["second", ""],
                [1, "setImage"],
                [
                  "src",
                  "assets/architecture.jpg",
                  "alt",
                  "architecture",
                  1,
                  "image",
                ],
                [1, "parallax-third"],
                ["third", ""],
                [
                  "alt",
                  "Ecopetrol",
                  "src",
                  "assets/Ecopetrol-logo-575EE75C00-seeklogo.com.png",
                  1,
                  "image__dos",
                ],
                [1, "content__card__footer"],
                [
                  "href",
                  "https://www.linkedin.com/in/esperanza-gualdron-599a55189/",
                ],
                [
                  "alt",
                  "Linkedin",
                  "src",
                  "assets/linkeding.png",
                  1,
                  "content__card__footer__img",
                ],
                [1, "swiperCard"],
              ],
              template: function (e, t) {
                if (1 & e) {
                  const e = Ut();
                  _r(0, "div", 0, 1),
                    _r(2, "div", 2),
                    _r(3, "h1"),
                    so(
                      4,
                      "Catastro de Redes para abastecimiento de Hidrocarburos"
                    ),
                    br(),
                    _r(5, "h2"),
                    so(
                      6,
                      "Propuesta de proyecto - Proceso de selecci\xf3n Ecopetrol"
                    ),
                    br(),
                    _r(7, "button", 3),
                    Tr("click", function () {
                      Qt(e);
                      const n = vr(10);
                      return t.next(n);
                    }),
                    so(8, "Conocer m\xe1s"),
                    br(),
                    br(),
                    br(),
                    _r(9, "div", 4, 5),
                    _r(11, "div", 6),
                    _r(12, "h1"),
                    so(13, "Descripci\xf3n"),
                    br(),
                    _r(14, "p"),
                    so(
                      15,
                      " Proyecto enfocado en la integraci\xf3n, mantenimiento y actualizaci\xf3n de la informaci\xf3n para la toma de decisiones a trav\xe9s de catastro de redes; Esto con el fin de tener procesos eficientes para el abastecimiento de hidrocarburos y permitir el seguimiento a trav\xe9s de la implementaci\xf3n de servicios web geogr\xe1ficos. "
                    ),
                    br(),
                    _r(16, "h2"),
                    so(17, "Catastro de Redes"),
                    br(),
                    _r(18, "p"),
                    so(
                      19,
                      " es un sistema de registro y archivo que contiene informaci\xf3n relacionada con todos los detalles de ubicaci\xf3n y especificaciones t\xe9cnicas de los elementos de una red y se utiliza como un instrumento para el an\xe1lisis, evaluaci\xf3n, formulaci\xf3n y desarrollo de programas para la toma de decisiones. "
                    ),
                    br(),
                    _r(20, "h2"),
                    so(21, "Etapas"),
                    br(),
                    _r(22, "swiper", 7),
                    gr(23, qu, 5, 0, "ng-template", 8),
                    gr(24, Wu, 5, 0, "ng-template", 8),
                    gr(25, Zu, 5, 0, "ng-template", 8),
                    gr(26, Uu, 5, 0, "ng-template", 8),
                    br(),
                    Cr(27, "div", 9),
                    _r(28, "button", 3),
                    Tr("click", function () {
                      Qt(e);
                      const n = vr(32);
                      return t.next(n);
                    }),
                    so(29, "Continuar"),
                    br(),
                    br(),
                    br(),
                    Cr(30, "div", 10),
                    _r(31, "div", 4, 11),
                    _r(33, "div", 6),
                    _r(34, "h1"),
                    so(35, "Arquitectura de la soluci\xf3n"),
                    br(),
                    _r(36, "h3"),
                    so(
                      37,
                      " Las Geodatabases guardan datos espaciales y no espaciales. ArcGIS da opciones para incluir una geodatabase corporativa en un servicio de base de datos de Amazon con su sitio de ArcGIS GIS Server independiente. Esta se agrega como base de datos administrada al sitio de GIS Server donde Puede publicar datos desde las fuentes de datos locales y las aplicaciones de escritorio en su sitio de GIS Server en AWS y ArcGIS copiar\xe1 los datos en la base de datos administrada. "
                    ),
                    br(),
                    _r(38, "div", 12),
                    Cr(39, "img", 13),
                    br(),
                    _r(40, "button", 3),
                    Tr("click", function () {
                      Qt(e);
                      const n = vr(44);
                      return t.next(n);
                    }),
                    so(41, "Continuar"),
                    br(),
                    br(),
                    br(),
                    Cr(42, "div", 14),
                    _r(43, "div", 4, 15),
                    _r(45, "div", 6),
                    _r(46, "h1"),
                    so(
                      47,
                      "Catastro de Redes para abastecimiento de Hidrocarburos"
                    ),
                    br(),
                    _r(48, "h2"),
                    so(
                      49,
                      " Con el avance de las tecnolog\xedas, se ha convertido en una necesidad el uso de nuevas soluciones para dar alcance a los objetivos principales de cada organizaci\xf3n. En Ecopetrol, el compromiso de generar un bienestar social y ambiental, sumado a la optimizaci\xf3n de procesos y reducci\xf3n de costos, no es la excepci\xf3n y as\xed debemos enfocar nuestros fuerzos en obtener los mejores resultados d\xeda a d\xeda. "
                    ),
                    br(),
                    _r(50, "div", 12),
                    Cr(51, "img", 16),
                    br(),
                    _r(52, "button", 3),
                    Tr("click", function () {
                      Qt(e);
                      const n = vr(1);
                      return t.next(n);
                    }),
                    so(53, "Finalizar"),
                    br(),
                    br(),
                    _r(54, "footer", 17),
                    so(55, " Esperanza Mar\xeda Gualdr\xf3n Prieto "),
                    Cr(56, "br"),
                    Cr(57, "hr"),
                    so(58, " Ingeniera Catastral y Geodesta "),
                    Cr(59, "br"),
                    so(60, " Especialista en Aval\xfaos "),
                    Cr(61, "br"),
                    _r(62, "a", 18),
                    Cr(63, "img", 19),
                    br(),
                    br(),
                    br();
                }
                2 & e &&
                  (Gr("height", t.windowSize, "px"),
                  Ss(9),
                  Gr("height", t.windowSize, "px"),
                  Ss(13),
                  yr(
                    "pagination",
                    (function (e, t, n) {
                      const s = sn() + 9,
                        i = Ut();
                      return i[s] === ws
                        ? hr(i, s, t())
                        : (function (e, t) {
                            return e[t];
                          })(i, s);
                    })(0, Yu)
                  ),
                  Ss(9),
                  Gr("height", t.windowSize, "px"),
                  Ss(12),
                  Gr("height", t.windowSize, "px"));
              },
              directives: [Nu, Ru],
              styles: [
                ".parallax[_ngcontent-%COMP%]{background-image:url(wallpaper.37d1dcb7d925873f0488.jpg);min-height:700px;background-attachment:fixed;background-position:50%;background-repeat:no-repeat;background-size:cover;display:flex;flex-direction:column;justify-content:center;align-items:center}.parallax__card[_ngcontent-%COMP%]{border-radius:16px;margin-top:50px;width:65%;-webkit-backdrop-filter:blur(1rem);backdrop-filter:blur(1rem);color:#fff;padding:55px;text-align:center;box-shadow:6px 6px 16px -4px rgba(0,0,0,.75)}.parallax-second[_ngcontent-%COMP%]{background-image:url(wallpaper2.bec471d56a54968ec297.jpg)}.parallax-second[_ngcontent-%COMP%], .parallax-third[_ngcontent-%COMP%]{min-height:700px;background-attachment:fixed;background-position:50%;background-repeat:no-repeat;background-size:cover}.parallax-third[_ngcontent-%COMP%]{background-image:url(wallpaper3.dc39b582bf1c514b6bc0.jpg)}.content[_ngcontent-%COMP%]{background-image:url(wallpaper_main.abc1d3e166c004901844.jpg);height:400px;width:100%;display:flex;flex-direction:column;align-items:center}.content__head[_ngcontent-%COMP%]{color:#fff;padding-top:20px}.content__card[_ngcontent-%COMP%]{border-radius:16px;width:60%;-webkit-backdrop-filter:blur(1rem);backdrop-filter:blur(1rem);color:#fff;margin-top:10%;padding:55px;text-align:justify;box-shadow:6px 6px 16px -4px rgba(0,0,0,.75)}.content__card__footer[_ngcontent-%COMP%]{text-align:center;color:#fff;margin-top:25px;font-size:17px;font-weight:600}.content__card__footer__img[_ngcontent-%COMP%]{margin-top:10px;width:10%}.button[_ngcontent-%COMP%]{margin-top:50px;font-size:15px;background-color:#3940ad;color:#fff;padding:20px;border:none;border-radius:20px;box-shadow:6px 6px 16px -4px rgba(0,0,0,.75)}.button[_ngcontent-%COMP%]:hover{font-weight:700;box-shadow:12px 12px 16px -4px rgba(0,0,0,.75);transform:translate3d(0,-3px,-3px)}h1[_ngcontent-%COMP%]{font-size:39px;margin-bottom:25px}h2[_ngcontent-%COMP%]{text-justify:auto}swiper[_ngcontent-%COMP%]{margin-top:20px}p[_ngcontent-%COMP%]{margin-bottom:25px}.swiperCard[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:15px;background-color:#fff;color:#3940ad;border-radius:10px;margin:0 10px}.setImage[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:center;align-items:center}.image[_ngcontent-%COMP%]{width:80%;margin-top:20px;border-radius:10px}.image__dos[_ngcontent-%COMP%]{width:50%}",
              ],
            })),
            e
          );
        })(),
        Xu = (() => {
          class e {
            constructor() {
              this.title = "ecopetrol-page";
            }
            onSwiper(e) {
              console.log(e);
            }
            onSlideChange() {
              console.log("slide change");
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵcmp = tt({
              type: e,
              selectors: [["app-root"]],
              decls: 2,
              vars: 0,
              consts: [[1, "container"]],
              template: function (e, t) {
                1 & e && (_r(0, "div", 0), Cr(1, "app-main"), br());
              },
              directives: [Qu],
              styles: [
                "[_nghost-%COMP%]{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}  *{margin:0;padding:0}",
              ],
            })),
            e
          );
        })(),
        Ku = (() => {
          class e {}
          return (
            (e.ɵmod = rt({ type: e, bootstrap: [Xu] })),
            (e.ɵinj = te({
              factory: function (t) {
                return new (t || e)();
              },
              providers: [],
              imports: [[oc, Lu]],
            })),
            e
          );
        })();
      (function () {
        if (is)
          throw new Error("Cannot enable prod mode after platform setup.");
        ss = !1;
      })(),
        ic()
          .bootstrapModule(Ku)
          .catch((e) => console.error(e));
    },
    zn8P: function (e, t) {
      function n(e) {
        return Promise.resolve().then(function () {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (e.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
