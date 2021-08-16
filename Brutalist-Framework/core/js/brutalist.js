/*	BRUTALIST FRAMEWORK 2.3
	CORE FUNCTIONS 
*/

// SYSTEM INFO WIDGET
function systemInfo() {
	var systlist = '';
	systlist +=
		'<h4>SYSTEM INFO</h4><h5>Browser</h5><p><b>CodeName:</b> ' +
		navigator.appCodeName +
		'<br />';
	systlist += '<b>Name:</b> ' + navigator.appName + '<br />';
	systlist += '<b>Version:</b> ' + navigator.appVersion + '<br />';
	systlist += '<b>Cookies Enabled:</b> ' + navigator.cookieEnabled + '<br />';
	systlist += '<b>Language:</b> ' + navigator.language + '<br />';
	systlist += '<b>Online:</b> ' + navigator.onLine + '<br />';
	systlist += '<b>Platform:</b> ' + navigator.platform + '<br />';
	systlist += '<b>User-agent header:</b> ' + navigator.userAgent + '</p><hr />';
	systlist +=
		'<h5>Screen</h5><p><b>Color / Pixel Depth:</b> ' +
		screen.colorDepth +
		' / ' +
		screen.pixelDepth +
		'<br />';
	systlist +=
		'<b>Width x Height:</b> ' + screen.width + ' x ' + screen.height + '</p>';
	document.getElementById('systeminfo').innerHTML = systlist;
}
if (window.addEventListener) {
	window.addEventListener('load', systemInfo, false);
} else if (window.attachEvent) {
	window.attachEvent('onload', systemInfo);
}

// baffle
!(function (t, e) {
	'object' == typeof exports && 'object' == typeof module
		? (module.exports = e())
		: 'function' == typeof define && define.amd
		? define([], e)
		: 'object' == typeof exports
		? (exports.baffle = e())
		: (t.baffle = e());
})(this, function () {
	return (function (t) {
		function e(r) {
			if (n[r]) return n[r].exports;
			var i = (n[r] = { exports: {}, id: r, loaded: !1 });
			return t[r].call(i.exports, i, i.exports, e), (i.loaded = !0), i.exports;
		}
		var n = {};
		return (e.m = t), (e.c = n), (e.p = ''), e(0);
	})([
		function (t, e, n) {
			'use strict';
			function r(t) {
				return t && t.__esModule ? t : { default: t };
			}
			var i = n(2),
				o = r(i);
			t.exports = o['default'];
		},
		function (t, e) {
			'use strict';
			function n(t, e) {
				for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
				return t;
			}
			function r(t, e) {
				return t.split('').map(e).join('');
			}
			function i(t) {
				return t[Math.floor(Math.random() * t.length)];
			}
			function o(t, e) {
				for (var n = 0, r = t.length; n < r; n++) e(t[n], n);
			}
			function u(t) {
				return t
					.map(function (t, e) {
						return !!t && e;
					})
					.filter(function (t) {
						return t !== !1;
					});
			}
			function s(t) {
				return 'string' == typeof t
					? [].slice.call(document.querySelectorAll(t))
					: [NodeList, HTMLCollection].some(function (e) {
							return t instanceof e;
					  })
					? [].slice.call(t)
					: t.nodeType
					? [t]
					: t;
			}
			Object.defineProperty(e, '__esModule', { value: !0 }),
				(e.extend = n),
				(e.mapString = r),
				(e.sample = i),
				(e.each = o),
				(e.getTruthyIndices = u),
				(e.getElements = s);
		},
		function (t, e, n) {
			'use strict';
			function r(t) {
				return t && t.__esModule ? t : { default: t };
			}
			function i(t, e) {
				if (!(t instanceof e))
					throw new TypeError('Cannot call a class as a function');
			}
			Object.defineProperty(e, '__esModule', { value: !0 });
			var o = n(1),
				u = n(3),
				s = r(u),
				c = {
					characters:
						'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}|;:,./<>?',
					exclude: [' '],
					speed: 50,
				},
				a = (function () {
					function t(e, n) {
						i(this, t),
							(this.options = (0, o.extend)(Object.create(c), n)),
							(this.elements = (0, o.getElements)(e).map(s['default'])),
							(this.running = !1);
					}
					return (
						(t.prototype.once = function () {
							var t = this;
							return (
								(0, o.each)(this.elements, function (e) {
									return e.write(t.options.characters, t.options.exclude);
								}),
								(this.running = !0),
								this
							);
						}),
						(t.prototype.start = function () {
							var t = this;
							return (
								clearInterval(this.interval),
								(0, o.each)(this.elements, function (t) {
									return t.init();
								}),
								(this.interval = setInterval(function () {
									return t.once();
								}, this.options.speed)),
								(this.running = !0),
								this
							);
						}),
						(t.prototype.stop = function () {
							return clearInterval(this.interval), (this.running = !1), this;
						}),
						(t.prototype.set = function (t) {
							return (
								(0, o.extend)(this.options, t),
								this.running && this.start(),
								this
							);
						}),
						(t.prototype.text = function (t) {
							var e = this;
							return (
								(0, o.each)(this.elements, function (n) {
									n.text(t(n.value)), e.running || n.write();
								}),
								this
							);
						}),
						(t.prototype.reveal = function () {
							var t = this,
								e =
									arguments.length <= 0 || void 0 === arguments[0]
										? 0
										: arguments[0],
								n =
									arguments.length <= 1 || void 0 === arguments[1]
										? 0
										: arguments[1],
								r = e / this.options.speed || 1,
								i = function () {
									clearInterval(t.interval),
										(t.running = !0),
										(t.interval = setInterval(function () {
											var e = t.elements.filter(function (t) {
												return !t.bitmap.every(function (t) {
													return !t;
												});
											});
											(0, o.each)(e, function (e) {
												var n = Math.ceil(e.value.length / r);
												e.decay(n).write(
													t.options.characters,
													t.options.exclude
												);
											}),
												e.length ||
													(t.stop(),
													(0, o.each)(t.elements, function (t) {
														return t.init();
													}));
										}, t.options.speed));
								};
							return setTimeout(i, n), this;
						}),
						t
					);
				})();
			e['default'] = function (t, e) {
				return new a(t, e);
			};
		},
		function (t, e, n) {
			'use strict';
			function r(t, e) {
				if (!t)
					throw new ReferenceError(
						"this hasn't been initialised - super() hasn't been called"
					);
				return !e || ('object' != typeof e && 'function' != typeof e) ? t : e;
			}
			function i(t, e) {
				if ('function' != typeof e && null !== e)
					throw new TypeError(
						'Super expression must either be null or a function, not ' +
							typeof e
					);
				(t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						enumerable: !1,
						writable: !0,
						configurable: !0,
					},
				})),
					e &&
						(Object.setPrototypeOf
							? Object.setPrototypeOf(t, e)
							: (t.__proto__ = e));
			}
			function o(t, e) {
				if (!(t instanceof e))
					throw new TypeError('Cannot call a class as a function');
			}
			Object.defineProperty(e, '__esModule', { value: !0 });
			var u = n(1),
				s = (function () {
					function t(e) {
						o(this, t), (this.value = e), this.init();
					}
					return (
						(t.prototype.init = function () {
							return (
								(this.bitmap = this.value.split('').map(function () {
									return 1;
								})),
								this
							);
						}),
						(t.prototype.render = function () {
							var t = this,
								e =
									arguments.length <= 0 || void 0 === arguments[0]
										? []
										: arguments[0],
								n =
									arguments.length <= 1 || void 0 === arguments[1]
										? []
										: arguments[1];
							return e.length
								? (0, u.mapString)(this.value, function (r, i) {
										return n.indexOf(r) > -1
											? r
											: t.bitmap[i]
											? (0, u.sample)(e)
											: r;
								  })
								: this.value;
						}),
						(t.prototype.decay = function () {
							for (
								var t =
									arguments.length <= 0 || void 0 === arguments[0]
										? 1
										: arguments[0];
								t--;

							) {
								var e = (0, u.getTruthyIndices)(this.bitmap);
								this.bitmap[(0, u.sample)(e)] = 0;
							}
							return this;
						}),
						(t.prototype.text = function () {
							var t =
								arguments.length <= 0 || void 0 === arguments[0]
									? this.value
									: arguments[0];
							return (this.value = t), this.init(), this;
						}),
						t
					);
				})(),
				c = (function (t) {
					function e(n) {
						o(this, e);
						var i = r(this, t.call(this, n.textContent));
						return (i.element = n), i;
					}
					return (
						i(e, t),
						(e.prototype.write = function (t, e) {
							return (this.element.textContent = this.render(t, e)), this;
						}),
						e
					);
				})(s);
			e['default'] = function (t) {
				return new c(t);
			};
		},
	]);
});

/* FITTEXT */
!(function () {
	function r(n, t, e) {
		n.addEventListener
			? n.addEventListener(t, e, !1)
			: n.attachEvent('on' + t, e);
	}
	window.fitText = function (n, i, t) {
		function e(n) {
			function t() {
				n.style.fontSize =
					Math.max(
						Math.min(n.clientWidth / (10 * e), parseFloat(o.maxFontSize)),
						parseFloat(o.minFontSize)
					) + 'px';
			}
			var e = i || 1;
			t(), r(window, 'resize', t), r(window, 'orientationchange', t);
		}
		var o = (function (n, t) {
			for (var e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
			return n;
		})({ minFontSize: -1 / 0, maxFontSize: 1 / 0 }, t);
		if (n.length) for (var a = 0; a < n.length; a++) e(n[a]);
		else e(n);
		return n;
	};
})();
$(document).ready(function () {
	window.fitText(document.getElementsByClassName('fittext'), 1.0);
	window.fitText(document.getElementsByClassName('fittext-c'), 1.5);
	window.fitText(document.getElementsByClassName('fittext-cc'), 2.0);
	window.fitText(document.getElementsByClassName('fittext-x'), 0.75);
	window.fitText(document.getElementsByClassName('fittext-xx'), 0.5);
});

/* ChopText */
(function (a) {
	a.fn.limitText = function (b) {
		var c = { length: 100, ellipsisText: '...' },
			b = a.extend(c, b);
		return this.each(function (d, e) {
			if (a(e).text().length > b.length) {
				var f = a(e).text().substr(0, b.length);
				for (d = f.length; d > 0; d--) {
					if (f.charAt(d - 1) == ' ') {
						a(e).text(f + b.ellipsisText);
						break;
					} else {
						f = f.slice(0, f.length - 1);
					}
				}
			}
		});
	};
})(jQuery);

/* Curvetext */
!(function (e) {
	e.throttle = function (r, i, n) {
		function t() {
			function t() {
				(s = window.setTimeout(e, i)), r.apply(this, a);
			}
			var e = function () {
					(s = 0), o && ((o = !1), t());
				},
				a = arguments;
			s ? n && (o = !0) : t();
		}
		var s = 0,
			o = !1;
		return e.guid && (t.guid = t.guid || e.guid++), 0 < i ? t : r;
	};
})(jQuery),
	(function (u) {
		u.fn.typorize = function (t) {
			var h = u.extend(
				!0,
				{},
				{ type: 'letters', className: '', spaceClassName: 'space' },
				t
			);
			return this.each(function () {
				var t,
					e,
					a,
					r = u(this);
				switch (h.type) {
					case 'lines':
						(t = (t = r.html()).replace(/<\/?[a-zA-Z0-9]+.*?>/g, function (t) {
							return t.toLowerCase();
						})),
							(e = '<br>'),
							(a = 'line');
						break;
					case 'words':
						(t = r.text()), (e = ' '), (a = 'word');
						break;
					default:
						(t = r.text()), (e = ''), (a = 'letter');
				}
				'' != h.className && (a = h.className);
				var i,
					n,
					s = (t = (t = (t = t.replace(/^\s+|\s+$/g, '')).replace(
						/\s+/g,
						' '
					)).split(e)).length,
					o = 'function' == typeof h.className;
				r.empty();
				for (var c = 0; c < s; c++)
					(n = t[c]),
						(i = o ? h.className(c + 1, s) : a + (c + 1)),
						' ' == n && ((n = '&nbsp;'), (i += ' ' + h.spaceClassName)),
						r.append('<span class="' + i + '">' + n + '</span>');
				return r;
			});
		};
	})(jQuery),
	(function (C) {
		C.fn.curvedText = function (t) {
			var a = C(window),
				$ = C.extend(
					!0,
					{},
					{
						curve: function (t) {
							return { x: t, y: 0.5 };
						},
						domain: [0, 1],
						viewport: { x: 0, y: 0, width: 1, height: 1 },
						subdivisions: 250,
						className: 'letter',
						spaceClassName: 'empti',
						baseline: 'above',
						scale: !0,
						rotate: !0,
						animate: !0,
						delay: 0,
						duration: 300,
						easing: 'linear',
						watchResize: !0,
						throttle: 200,
					},
					t
				);
			return this.each(function () {
				function N(t) {
					return Math.round(1e3 * t) / 1e3;
				}
				function t() {
					var t = L.width(),
						e = (L.height(), L.data('curvedText').curve.viewport),
						a = t / e.width,
						r = 'all 0ms linear 0ms',
						i = N(a),
						n =
							'translateX(' +
							N(a * -e.x) +
							'px) translateY(' +
							N(a * -e.y) +
							'px) scaleX(' +
							i +
							') scaleY(' +
							i +
							') rotate(0.0deg)',
						s = '0% 0%',
						o = N(a * e.height) + 'px';
					L.css('height', o),
						c
							.css({
								'-webkit-transform-origin': s,
								'-moz-transform-origin': s,
								'-ms-transform-origin': s,
								'-o-transform-origin': s,
								'transform-origin': s,
							})
							.css({
								'-webkit-transform': n,
								'-moz-transform': n,
								'-ms-transform': n,
								'-o-transform': n,
								transform: n,
							})
							.css({
								'-webkit-transition': r,
								'-moz-transition': r,
								'-ms-transition': r,
								'-o-transition': r,
								transition: r,
							});
				}
				var c,
					k,
					L = C(this),
					e = L.text();
				if (e && 0 != e.length)
					return (
						L.data('curvedText')
							? ((c = L.children('div')), (k = c.children('span')))
							: ((function () {
									var t = L.text();
									L.empty();
									(c = C('<div />')
										.css({
											position: 'relative',
											overflow: 'visible',
											width: '100%',
											height: '100%',
											whiteSpace: 'nowrap',
										})
										.text(t)
										.appendTo(L)).typorize({
										type: 'letter',
										className: $.className,
										spaceClassName: $.spaceClassName,
									}),
										(k = c.children('span')).css({
											display: 'inline-block',
											position: 'relative',
										});
									var n = 0;
									k.each(function () {
										var t = C(this),
											e = t.position(),
											a = t.outerWidth(!0),
											r = t.outerHeight(!0),
											i = { x: e.left, y: e.top, width: a, height: r };
										t.data('curvedText', i), (n += a);
									}),
										(textLength = n);
									var e = L.data('curvedText'),
										e = C.extend(!0, e, {}, { text: { length: textLength } });
									L.data('curvedText', e),
										k.css({ display: 'inline-block', position: 'absolute' });
							  })(),
							  $.watchResize &&
									a.on(
										'resize.curvedText orientationchange.curvedText',
										void 0 !== C.throttle ? C.throttle(t, $.throttle, !0) : t
									)),
						(function () {
							for (
								var t,
									e,
									a,
									r = $.subdivisions,
									i = {
										subdivisions: r,
										points: new Array(r + 1),
										partialLengths: new Array(r + 1),
										length: 0,
										viewport: $.viewport,
									},
									n = $.domain,
									s = (n[1] - n[0]) / r,
									o = 0;
								o <= r;
								o++
							)
								(a = n[0] + o * s), (i.points[o] = $.curve(a));
							i.partialLengths[0] = 0;
							for (o = 1; o <= r; o++)
								(t = i.points[o].x - i.points[o - 1].x),
									(e = i.points[o].y - i.points[o - 1].y),
									(i.length += Math.sqrt(t * t + e * e)),
									(i.partialLengths[o] = i.length);
							var c = L.data('curvedText'),
								c = C.extend(!0, c, {}, { curve: i });
							L.data('curvedText', c);
						})(),
						(function () {
							var t,
								e,
								a,
								r,
								i,
								n,
								s,
								o,
								c,
								h,
								u,
								l,
								d,
								v,
								m,
								p,
								x = L.data('curvedText'),
								f = x.curve.subdivisions,
								g = x.curve.points,
								w = x.curve.partialLengths,
								y = x.curve.length,
								b = x.text.length,
								M = $.scale ? y / b : 1,
								T = N(M),
								I = $.animate
									? ['all', $.duration + 'ms', $.easing, $.delay + 'ms'].join(
											' '
									  )
									: 'all 0ms linear 0ms',
								P = 'number' == typeof $.baseline;
							if (P)
								(i = 0.5),
									(h =
										(x = C(k[0]).data('curvedText')).y +
										parseFloat($.baseline) * x.height);
							else
								switch ($.baseline) {
									case 'below':
										(i = 0.5), (n = 0);
										break;
									default:
										(i = 0.5), (n = 1);
								}
							p = 1;
							for (var z = 0; z < k.length; z++) {
								for (
									e =
										M *
										((x = (t = C(k[z])).data('curvedText')).x + 0.5 * x.width);
									w[p] < e && p < f;

								)
									p++;
								(u =
									(1 - (m = (e - w[p - 1]) / (w[p] - w[p - 1]))) * g[p - 1].x +
									m * g[p].x),
									(l = (1 - m) * g[p - 1].y + m * g[p].y),
									(d = g[p].x - g[p - 1].x),
									(v = g[p].y - g[p - 1].y),
									(c = $.rotate ? (180 * Math.atan2(v, d)) / Math.PI : 0),
									P && (n = (h - x.y) / x.height),
									(s = u - i * x.width),
									(o = l - n * x.height),
									(r = 100 * (i = N(i)) + '% ' + 100 * (n = N(n)) + '%'),
									(a =
										'translateX(' +
										(s = N(s)) +
										'px) translateY(' +
										(o = N(o)) +
										'px) scaleX(' +
										T +
										') scaleY(' +
										T +
										') rotate(' +
										(c = N(c)) +
										'deg)'),
									t
										.css({
											'-webkit-transform-origin': r,
											'-moz-transform-origin': r,
											'-ms-transform-origin': r,
											'-o-transform-origin': r,
											'transform-origin': r,
										})
										.css({
											'-webkit-transform': a,
											'-moz-transform': a,
											'-ms-transform': a,
											'-o-transform': a,
											transform: a,
										})
										.css({
											'-webkit-transition': I,
											'-moz-transition': I,
											'-ms-transition': I,
											'-o-transition': I,
											transition: I,
										});
							}
						})(),
						t(),
						L
					);
			});
		};
	})(jQuery),
	$(document).ready(function () {
		$('.arc-text').curvedText({
			curve: function (t) {
				return {
					x: 500 + 300 * Math.cos(2 * Math.PI * t - 0.5 * Math.PI),
					y: 400 + 300 * Math.sin(2 * Math.PI * t - 0.5 * Math.PI),
				};
			},
			domain: [-0.2, 0.2],
			viewport: { x: 0, y: 0, width: 1e3, height: 400 },
		});
		$('.circle-text').curvedText({
			curve: function (t) {
				return {
					x: 500 + 300 * Math.cos(2 * Math.PI * -t + 0.5 * Math.PI),
					y: 500 + 300 * Math.sin(2 * Math.PI * -t + 0.5 * Math.PI),
				};
			},
			domain: [0, 1],
			viewport: { x: 0, y: 0, width: 1e3, height: 1e3 },
		});
		$('.bezier-text').curvedText({
			curve: function (t) {
				var e = [100, 350, 500, 900],
					a = [400, 50, 500, 200],
					r = [
						e[0],
						3 * (e[1] - e[0]),
						3 * (e[2] - 2 * e[1] + e[0]),
						e[3] - 3 * e[2] + 3 * e[1] - e[0],
					],
					i = [
						a[0],
						3 * (a[1] - a[0]),
						3 * (a[2] - 2 * a[1] + a[0]),
						a[3] - 3 * a[2] + 3 * a[1] - a[0],
					];
				return {
					x: r[0] + r[1] * t + r[2] * t * t + r[3] * t * t * t,
					y: i[0] + i[1] * t + i[2] * t * t + i[3] * t * t * t,
				};
			},
			domain: [0, 1],
			viewport: { x: 0, y: 0, width: 1e3, height: 500 },
		});
		$('.spiral-text').curvedText({
			curve: function (t) {
				var e = t + 1;
				return {
					x: 300 + 50 * e * Math.cos(2 * Math.PI * e - 0.5 * Math.PI),
					y: 300 + 50 * e * Math.sin(2 * Math.PI * e - 0.5 * Math.PI),
				};
			},
			domain: [0, 3],
			viewport: { x: 0, y: 0, width: 600, height: 600 },
		});
		$('.wave-text').curvedText({
			curve: function (t) {
				return { x: 0 + 1e3 * t, y: 250 + 100 * Math.sin(3 * Math.PI * t) };
			},
			domain: [0, 1],
			viewport: { x: 0, y: 0, width: 1e3, height: 500 },
		});
	});

/* TumbleText */
window.addEventListener('load', function () {
	for (
		var e = document.querySelectorAll('.tumbletext'), n = 0;
		n < e.length;
		n++
	) {
		var t = e[n].innerText.split(' ');
		e[n].innerHTML = '';
		for (var a = 0; a < t.length; a++) {
			var r = document.createElement('span');
			r.innerText = t[a];
			var l = 0 + (e.length + a) / 10;
			(r.style.animationDelay = l + 's'), e[n].appendChild(r);
		}
	}
});

/* equal-height */
!(function (t) {
	'use strict';
	'function' == typeof define && define.amd
		? define(['jquery'], t)
		: 'undefined' != typeof module && module.exports
		? (module.exports = t(require('jquery')))
		: t(jQuery);
})(function (t) {
	var e = -1,
		o = -1,
		i = function (t) {
			return parseFloat(t) || 0;
		},
		a = function (e) {
			var o = 1,
				a = t(e),
				n = null,
				r = [];
			return (
				a.each(function () {
					var e = t(this),
						a = e.offset().top - i(e.css('margin-top')),
						s = r.length > 0 ? r[r.length - 1] : null;
					null === s
						? r.push(e)
						: Math.floor(Math.abs(n - a)) <= o
						? (r[r.length - 1] = s.add(e))
						: r.push(e),
						(n = a);
				}),
				r
			);
		},
		n = function (e) {
			var o = {
				byRow: !0,
				property: 'height',
				target: null,
				remove: !1,
			};
			return 'object' == typeof e
				? t.extend(o, e)
				: ('boolean' == typeof e
						? (o.byRow = e)
						: 'remove' === e && (o.remove = !0),
				  o);
		},
		r = (t.fn.matchHeight = function (e) {
			var o = n(e);
			if (o.remove) {
				var i = this;
				return (
					this.css(o.property, ''),
					t.each(r._groups, function (t, e) {
						e.elements = e.elements.not(i);
					}),
					this
				);
			}
			return this.length <= 1 && !o.target
				? this
				: (r._groups.push({ elements: this, options: o }),
				  r._apply(this, o),
				  this);
		});
	(r.version = '0.7.0'),
		(r._groups = []),
		(r._throttle = 80),
		(r._maintainScroll = !1),
		(r._beforeUpdate = null),
		(r._afterUpdate = null),
		(r._rows = a),
		(r._parse = i),
		(r._parseOptions = n),
		(r._apply = function (e, o) {
			var s = n(o),
				h = t(e),
				l = [h],
				c = t(window).scrollTop(),
				p = t('html').outerHeight(!0),
				d = h.parents().filter(':hidden');
			return (
				d.each(function () {
					var e = t(this);
					e.data('style-cache', e.attr('style'));
				}),
				d.css('display', 'block'),
				s.byRow &&
					!s.target &&
					(h.each(function () {
						var e = t(this),
							o = e.css('display');
						'inline-block' !== o &&
							'flex' !== o &&
							'inline-flex' !== o &&
							(o = 'block'),
							e.data('style-cache', e.attr('style')),
							e.css({
								display: o,
								'padding-top': '0',
								'padding-bottom': '0',
								'margin-top': '0',
								'margin-bottom': '0',
								'border-top-width': '0',
								'border-bottom-width': '0',
								height: '100px',
								overflow: 'hidden',
							});
					}),
					(l = a(h)),
					h.each(function () {
						var e = t(this);
						e.attr('style', e.data('style-cache') || '');
					})),
				t.each(l, function (e, o) {
					var a = t(o),
						n = 0;
					if (s.target) n = s.target.outerHeight(!1);
					else {
						if (s.byRow && a.length <= 1) return void a.css(s.property, '');
						a.each(function () {
							var e = t(this),
								o = e.attr('style'),
								i = e.css('display');
							'inline-block' !== i &&
								'flex' !== i &&
								'inline-flex' !== i &&
								(i = 'block');
							var a = {
								display: i,
							};
							(a[s.property] = ''),
								e.css(a),
								e.outerHeight(!1) > n && (n = e.outerHeight(!1)),
								o ? e.attr('style', o) : e.css('display', '');
						});
					}
					a.each(function () {
						var e = t(this),
							o = 0;
						(s.target && e.is(s.target)) ||
							('border-box' !== e.css('box-sizing') &&
								((o +=
									i(e.css('border-top-width')) +
									i(e.css('border-bottom-width'))),
								(o += i(e.css('padding-top')) + i(e.css('padding-bottom')))),
							e.css(s.property, n - o + 'px'));
					});
				}),
				d.each(function () {
					var e = t(this);
					e.attr('style', e.data('style-cache') || null);
				}),
				r._maintainScroll &&
					t(window).scrollTop((c / p) * t('html').outerHeight(!0)),
				this
			);
		}),
		(r._applyDataApi = function () {
			var e = {};
			t('[data-match-height], [data-mh]').each(function () {
				var o = t(this),
					i = o.attr('data-mh') || o.attr('data-match-height');
				i in e ? (e[i] = e[i].add(o)) : (e[i] = o);
			}),
				t.each(e, function () {
					this.matchHeight(!0);
				});
		});
	var s = function (e) {
		r._beforeUpdate && r._beforeUpdate(e, r._groups),
			t.each(r._groups, function () {
				r._apply(this.elements, this.options);
			}),
			r._afterUpdate && r._afterUpdate(e, r._groups);
	};
	(r._update = function (i, a) {
		if (a && 'resize' === a.type) {
			var n = t(window).width();
			if (n === e) return;
			e = n;
		}
		i
			? -1 === o &&
			  (o = setTimeout(function () {
					s(a), (o = -1);
			  }, r._throttle))
			: s(a);
	}),
		t(r._applyDataApi),
		t(window).bind('load', function (t) {
			r._update(!1, t);
		}),
		t(window).bind('resize orientationchange', function (t) {
			r._update(!0, t);
		});
});
$(document).ready(function () {
	$('.equal-height').matchHeight({
		byRow: true,
		property: 'height',
		target: null,
		remove: false,
	});
});

/* Fitvids */
!(function (o) {
	'use strict';
	(o.fn.fitVids = function (t) {
		var e,
			i,
			d = { customSelector: null, ignore: null };
		return (
			document.getElementById('fit-vids-style') ||
				((e = document.head || document.getElementsByTagName('head')[0]),
				((i = document.createElement('div')).innerHTML =
					'<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
				e.appendChild(i.childNodes[1])),
			t && o.extend(d, t),
			this.each(function () {
				var t = [
					'iframe[src*="player.vimeo.com"]',
					'iframe[src*="youtube.com"]',
					'iframe[src*="youtube-nocookie.com"]',
					'iframe[src*="kickstarter.com"][src*="video.html"]',
					'object',
					'embed',
				];
				d.customSelector && t.push(d.customSelector);
				var r = '.fitvidsignore';
				d.ignore && (r = r + ', ' + d.ignore);
				var e = o(this).find(t.join(','));
				(e = (e = e.not('object object')).not(r)).each(function () {
					var t,
						e,
						i = o(this);
					0 < i.parents(r).length ||
						('embed' === this.tagName.toLowerCase() &&
							i.parent('object').length) ||
						i.parent('.fluid-width-video-wrapper').length ||
						(i.css('height') ||
							i.css('width') ||
							(!isNaN(i.attr('height')) && !isNaN(i.attr('width'))) ||
							(i.attr('height', 9), i.attr('width', 16)),
						(t =
							('object' === this.tagName.toLowerCase() ||
							(i.attr('height') && !isNaN(parseInt(i.attr('height'), 10)))
								? parseInt(i.attr('height'), 10)
								: i.height()) /
							(isNaN(parseInt(i.attr('width'), 10))
								? i.width()
								: parseInt(i.attr('width'), 10))),
						i.attr('name') ||
							((e = 'fitvid' + o.fn.fitVids._count),
							i.attr('name', e),
							o.fn.fitVids._count++),
						i
							.wrap('<div class="fluid-width-video-wrapper"></div>')
							.parent('.fluid-width-video-wrapper')
							.css('padding-top', 100 * t + '%'),
						i.removeAttr('height').removeAttr('width'));
				});
			})
		);
	}),
		(o.fn.fitVids._count = 0);
})(window.jQuery || window.Zepto);
$(document).ready(function () {
	$('.container, .container-fluid, .container-1200, .container-960').fitVids();
});

/* LoopScroll */
$(document).ready(function () {
	parcelRequire = (function (l, s, e) {
		var t,
			a = 'function' == typeof parcelRequire && parcelRequire,
			c = 'function' == typeof require && require;
		function u(t, e) {
			if (!s[t]) {
				if (!l[t]) {
					var i = 'function' == typeof parcelRequire && parcelRequire;
					if (!e && i) return i(t, !0);
					if (a) return a(t, !0);
					if (c && 'string' == typeof t) return c(t);
					var n = new Error("Cannot find module '" + t + "'");
					throw ((n.code = 'MODULE_NOT_FOUND'), n);
				}
				(o.resolve = function (e) {
					return l[t][1][e] || e;
				}),
					(o.cache = {});
				var r = (s[t] = new u.Module(t));
				l[t][0].call(r.exports, o, r, r.exports, this);
			}
			return s[t].exports;
			function o(e) {
				return u(o.resolve(e));
			}
		}
		(u.isParcelRequire = !0),
			(u.Module = function (e) {
				(this.id = e), (this.bundle = u), (this.exports = {});
			}),
			(u.modules = l),
			(u.cache = s),
			(u.parent = a),
			(u.register = function (e, i) {
				l[e] = [
					function (e, t) {
						t.exports = i;
					},
					{},
				];
			});
		for (var i, n = 0; n < e.length; n++)
			try {
				u(e[n]);
			} catch (e) {
				t = t || e;
			}
		if (
			(e.length &&
				((i = u(e[e.length - 1])),
				'object' == typeof exports && 'undefined' != typeof module
					? (module.exports = i)
					: 'function' == typeof define &&
					  define.amd &&
					  define(function () {
							return i;
					  })),
			(parcelRequire = u),
			t)
		)
			throw t;
		return u;
	})(
		{
			v3Qa: [
				function (e, t, i) {
					'use strict';
					function r(e) {
						return (
							(function (e) {
								if (Array.isArray(e)) return n(e);
							})(e) ||
							(function (e) {
								if (
									'undefined' != typeof Symbol &&
									Symbol.iterator in Object(e)
								)
									return Array.from(e);
							})(e) ||
							(function (e, t) {
								if (!e) return;
								if ('string' == typeof e) return n(e, t);
								var i = Object.prototype.toString.call(e).slice(8, -1);
								'Object' === i && e.constructor && (i = e.constructor.name);
								if ('Map' === i || 'Set' === i) return Array.from(e);
								if (
									'Arguments' === i ||
									/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
								)
									return n(e, t);
							})(e) ||
							(function () {
								throw new TypeError(
									'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
								);
							})()
						);
					}
					function n(e, t) {
						(null == t || t > e.length) && (t = e.length);
						for (var i = 0, n = new Array(t); i < t; i++) n[i] = e[i];
						return n;
					}
					function o(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							(n.enumerable = n.enumerable || !1),
								(n.configurable = !0),
								'value' in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n);
						}
					}
					Object.defineProperty(i, '__esModule', { value: !0 }),
						(i.default = void 0);
					window.innerWidth;
					var l = window.innerHeight,
						s = !1;
					(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
						navigator.userAgent
					) ||
						/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
							navigator.userAgent.substr(0, 4)
						)) &&
						(s = !0);
					var a = (function () {
						function i(e) {
							var t = this;
							!(function (e, t) {
								if (!(e instanceof t))
									throw new TypeError('Cannot call a class as a function');
							})(this, i),
								s
									? document.body.classList.add('mobile')
									: ((this.DOM = { el: e }),
									  (this.DOM.menuItems = r(
											this.DOM.el.querySelectorAll('.loop-item')
									  )),
									  this.cloneItems(),
									  this.initScroll(),
									  this.initEvents(),
									  requestAnimationFrame(function () {
											return t.render();
									  }));
						}
						var e, t, n;
						return (
							(e = i),
							(t = [
								{
									key: 'getScrollPos',
									value: function () {
										return (
											(this.DOM.el.pageYOffset || this.DOM.el.scrollTop) -
											(this.DOM.el.clientTop || 0)
										);
									},
								},
								{
									key: 'setScrollPos',
									value: function (e) {
										this.DOM.el.scrollTop = e;
									},
								},
								{
									key: 'cloneItems',
									value: function () {
										var i = this,
											e = this.DOM.menuItems[0].offsetHeight,
											n = Math.ceil(l / e);
										this.DOM.el
											.querySelectorAll('.loop__clone')
											.forEach(function (e) {
												return i.DOM.el.removeChild(e);
											});
										var r = 0;
										this.DOM.menuItems
											.filter(function (e, t) {
												return t < n;
											})
											.map(function (e) {
												var t = e.cloneNode(!0);
												t.classList.add('loop__clone'),
													i.DOM.el.appendChild(t),
													++r;
											}),
											(this.clonesHeight = r * e),
											(this.scrollHeight = this.DOM.el.scrollHeight);
									},
								},
								{
									key: 'initEvents',
									value: function () {
										var e = this;
										window.addEventListener('resize', function () {
											return e.resize();
										});
									},
								},
								{
									key: 'resize',
									value: function () {
										this.cloneItems(), this.initScroll();
									},
								},
								{
									key: 'initScroll',
									value: function () {
										(this.scrollPos = this.getScrollPos()),
											this.scrollPos <= 0 && this.setScrollPos(1);
									},
								},
								{
									key: 'scrollUpdate',
									value: function () {
										(this.scrollPos = this.getScrollPos()),
											this.clonesHeight + this.scrollPos >= this.scrollHeight
												? this.setScrollPos(1)
												: this.scrollPos <= 0 &&
												  this.setScrollPos(
														this.scrollHeight - this.clonesHeight
												  );
									},
								},
								{
									key: 'render',
									value: function () {
										var e = this;
										this.scrollUpdate(),
											requestAnimationFrame(function () {
												return e.render();
											});
									},
								},
							]) && o(e.prototype, t),
							n && o(e, n),
							i
						);
					})();
					i.default = a;
				},
				{},
			],
			QvaY: [
				function (e, t, i) {
					'use strict';
					var n;
					new ((n = e('./infinitemenu')) && n.__esModule
						? n
						: { default: n }
					).default(document.querySelector('div.loopscroll'));
				},
				{ './infinitemenu': 'v3Qa' },
			],
		},
		{},
		['QvaY']
	);
});

/* Draggable */
!(function (e) {
	e.fn.tinyDraggable = function (n) {
		var t = e.extend({ handle: 0, exclude: 0 }, n);
		return this.each(function () {
			var n,
				o,
				u = e(this),
				a = t.handle ? e(t.handle, u) : u;
			a.on({
				mousedown: function (a) {
					if (!t.exclude || !~e.inArray(a.target, e(t.exclude, u))) {
						a.preventDefault();
						var f = u.offset();
						(n = a.pageX - f.left),
							(o = a.pageY - f.top),
							e(document).on('mousemove.drag', function (e) {
								u.offset({ top: e.pageY - o, left: e.pageX - n });
							});
					}
				},
				mouseup: function () {
					e(document).off('mousemove.drag');
				},
			});
		});
	};
})(jQuery);
$(document).ready(function () {
	$('.draggable').tinyDraggable();
	$('.draggable-wrap').tinyDraggable({ handle: '.drag-handle' });
	$('.draggable-exclude').tinyDraggable({ exclude: '.exclude_me, input' });
});

/* CDP: Content Display Picker */
!(function (t, e, n, i) {
	(t.selectShow = function (e, n) {
		var i = e,
			o = t.extend(
				{
					ShowElement: null,
					SelectOption: '.cdp_select',
					ListElement: '.cdp_element',
				},
				n
			);
		t(i).each(function () {
			var e = t(this);
			null == o.ShowElement
				? e.find(o.ListElement).hide()
				: e
						.find(o.ListElement + '[data-option="' + o.ShowElement + '"]')
						.show(),
				e.find(o.SelectOption).change(function () {
					var n = t(this).val(),
						i = e.find(o.ListElement + '[data-option="' + n + '"]');
					e.find(o.ListElement).hide(), t(i).show();
				});
		});
	}),
		(t.fn.selectShow = function (e) {
			return this.each(function () {
				if (null == t(this).data('selectShow')) {
					var n = new t.selectShow(this, e);
					t(this).data('selectShow', n);
				}
			});
		});
})(window.jQuery, window, document);

/* Text Rotator */
'function' != typeof Object.create &&
	(Object.create = function (t) {
		function a() {}
		return (a.prototype = t), new a();
	}),
	(function (t) {
		var a = {
			init: function (a, e) {
				var n = this;
				(n.rotatelist = a),
					(n.options = t.extend({}, t.fn.rotator.options, e)),
					(n.item = new Array());
				for (var i = 0, r = n.rotatelist.length; r > i; i++)
					(n.item[i] = new Array()),
						(n.item[i].rotateId = t(n.rotatelist[i]).attr('id')),
						(n.item[i].terms = t('#' + n.item[i].rotateId + ' ul li')),
						(n.item[i].animate = n.valid_anim(
							t('#' + n.item[i].rotateId)
								.attr('data-rotate-animate')
								.split(',')
						)),
						(n.item[i].arena = t('#' + n.item[i].rotateId + ' .rotate-arena')),
						(n.item[i].interval = n.valid_interval(
							t('#' + n.item[i].rotateId).attr('data-rotate-interval')
						)),
						t('#' + n.item[i].rotateId + ' ul').hide(),
						n.rotatePlay(i);
			},
			rotatePlay: function (t) {
				var a = this;
				setTimeout(function () {
					var e = a.item[t],
						n = e.arena.data('term') || 0;
					e.arena
						.data('term', n === e.terms.length - 1 ? 0 : n + 1)
						.html(e.terms.eq([n]).html()),
						a.anim(e.arena, e.animate[0]),
						setTimeout(function () {
							a.anim(e.arena, e.animate[1]), a.rotatePlay(t);
						}, e.interval);
				}, 1e3);
			},
			valid_anim: function (a) {
				var e = this;
				return a
					? a
					: t('#' + e.options.interval)
							.attr('data-rotate-animate')
							.split(',');
			},
			valid_interval: function (t) {
				var a = this;
				return isNaN(t) ? a.options.interval : t;
			},
			anim: function (t, a) {
				var e = this;
				t.removeClass()
					.addClass('rotate-arena ' + a + ' ' + e.options.animateClass)
					.one(
						'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
					);
			},
		};
		(t.fn.rotator = function (e) {
			var n = Object.create(a);
			n.init(this, e), t.data(this, 'rotator', a);
		}),
			(t.fn.rotator.options = {
				animateClass: 'animated',
				interval: '5000',
				animate: 'fadeInUp,fadeOutDown',
			});
	})(jQuery, window, document);
$(document).ready(function () {
	$('.rotator').rotator();
});

/* Throttle */
(function (a) {
	a.throttle = function (d, e, g) {
		var c = function () {
			var j = function () {
				f = window.setTimeout(h, e);
				d.apply(this, i);
			};
			var h = function () {
				f = 0;
				if (b) {
					b = false;
					j();
				}
			};
			var i = arguments;
			if (!f) {
				j();
			} else {
				if (g) {
					b = true;
				}
			}
		};
		var f = 0;
		var b = false;
		if (a.guid) {
			c.guid = c.guid || a.guid++;
		}
		return e > 0 ? c : d;
	};
})(jQuery);

/* Typorize */
(function (a) {
	a.fn.typorize = function (c) {
		var d = { type: 'letters', className: '', spaceClassName: 'space' };
		var b = a.extend(true, {}, d, c);
		return this.each(function () {
			var g = a(this);
			var n;
			var o, p;
			switch (b.type) {
				case 'lines':
					n = g.html();
					n = n.replace(/<\/?[a-zA-Z0-9]+.*?>/g, function (f) {
						return f.toLowerCase();
					});
					o = '<br>';
					p = 'line';
					break;
				case 'words':
					n = g.text();
					o = ' ';
					p = 'word';
					break;
				default:
					n = g.text();
					o = '';
					p = 'letter';
					break;
			}
			if (b.className != '') {
				p = b.className;
			}
			n = n.replace(/^\s+|\s+$/g, '');
			n = n.replace(/\s+/g, ' ');
			n = n.split(o);
			var j = n.length,
				m = typeof b.className === 'function',
				h,
				e;
			g.empty();
			for (var k = 0; k < j; k++) {
				e = n[k];
				h = m ? b.className(k + 1, j) : p + (k + 1);
				if (e == ' ') {
					e = '&nbsp;';
					h += ' ' + b.spaceClassName;
				}
				g.append('<span class="' + h + '">' + e + '</span>');
			}
			return g;
		});
	};
})(jQuery);

/* Rumbler */
(function (f) {
	f.fn.jrumble = function (g) {
		var a = f.extend(
			{ x: 2, y: 2, rotation: 1, speed: 15, opacity: false, opacityMin: 0.5 },
			g
		);
		return this.each(function () {
			var b = f(this),
				h = a.x * 2,
				i = a.y * 2,
				k = a.rotation * 2,
				g = a.speed === 0 ? 1 : a.speed,
				m = a.opacity,
				n = a.opacityMin,
				l,
				j,
				o = function () {
					var e = Math.floor(Math.random() * (h + 1)) - h / 2,
						a = Math.floor(Math.random() * (i + 1)) - i / 2,
						c = Math.floor(Math.random() * (k + 1)) - k / 2,
						d = m ? Math.random() + n : 1,
						e = e === 0 && h !== 0 ? (Math.random() < 0.5 ? 1 : -1) : e,
						a = a === 0 && i !== 0 ? (Math.random() < 0.5 ? 1 : -1) : a;
					b.css('display') === 'inline' &&
						((l = true), b.css('display', 'inline-block'));
					b.css({
						position: 'relative',
						left: e + 'px',
						top: a + 'px',
						'-ms-filter':
							'progid:DXImageTransform.Microsoft.Alpha(Opacity=' +
							d * 100 +
							')',
						filter: 'alpha(opacity=' + d * 100 + ')',
						'-moz-opacity': d,
						'-khtml-opacity': d,
						opacity: d,
						'-webkit-transform': 'rotate(' + c + 'deg)',
						'-moz-transform': 'rotate(' + c + 'deg)',
						'-ms-transform': 'rotate(' + c + 'deg)',
						'-o-transform': 'rotate(' + c + 'deg)',
						transform: 'rotate(' + c + 'deg)',
					});
				},
				p = {
					left: 0,
					top: 0,
					'-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)',
					filter: 'alpha(opacity=100)',
					'-moz-opacity': 1,
					'-khtml-opacity': 1,
					opacity: 1,
					'-webkit-transform': 'rotate(0deg)',
					'-moz-transform': 'rotate(0deg)',
					'-ms-transform': 'rotate(0deg)',
					'-o-transform': 'rotate(0deg)',
					transform: 'rotate(0deg)',
				};
			b.bind({
				startRumble: function (a) {
					a.stopPropagation();
					clearInterval(j);
					j = setInterval(o, g);
				},
				stopRumble: function (a) {
					a.stopPropagation();
					clearInterval(j);
					l && b.css('display', 'inline');
					b.css(p);
				},
			});
		});
	};
})(jQuery);

/* Triangle Pattern */
$.fn.trianglarize = function (t) {
	var r = $.extend(
			{
				triHeight: 100,
				spacingV: 0,
				spacingH: 0,
				triColor: '#00DDFF',
				triColorU: '#DD00FF',
				startUpsdwn: !1,
			},
			t
		),
		s = r.triHeight,
		n = r.startUpsdwn,
		e = r.spacingV,
		o = r.spacingH,
		a = r.triColor,
		p = (r.triColorU, (s / Math.sqrt(3)) * 2);
	for (
		triCountH = this.width() / p + 1, triCountV = this.height() / s, i = 0;
		i < triCountV;
		i++
	) {
		var l = n,
			d = 0 - p / 2;
		for (j = 0; j < 2 * triCountH; j++) {
			if (l) {
				var g = i * s + e * i;
				this.append(
					'<div class="upsdwn-triangle" style="top: ' +
						g +
						'px; left: ' +
						(j * (p / 2) + d + o * j) +
						'px;"></div>'
				);
			} else {
				g = i * s + e * i;
				this.append(
					'<div class="triangle-pattern" style="top: ' +
						g +
						'px; left: ' +
						(j * (p / 2) + d + o * j) +
						'px;"></div>'
				);
			}
			l = !l;
		}
		n = !n;
	}
	return (
		$('.triangle-pattern').css('border-left', p / 2 + 'px solid transparent'),
		$('.triangle-pattern').css('border-right', p / 2 + 'px solid transparent'),
		$('.triangle-pattern').css('border-bottom', s + 'px solid ' + a),
		$('.upsdwn-triangle').css('border-left', p / 2 + 'px solid transparent'),
		$('.upsdwn-triangle').css('border-right', p / 2 + 'px solid transparent'),
		$('.upsdwn-triangle').css('border-top', s + 'px solid ' + r.triColorU),
		this
	);
};

/* Obscure */
(function (e) {
	e.fn.foggy = function (t) {
		var n = {
			opacity: 0.8,
			blurRadius: 2,
			quality: 16,
			cssFilterSupport: true,
		};
		var r = { opacity: 1, blurRadius: 0 };
		var i;
		if (t == false) {
			i = e.extend(n, r);
		} else {
			i = e.extend(n, t);
		}
		var s = function (e, t, n, r) {
			this.content = e;
			this.position = t;
			this.offset = n;
			this.opacity = r;
		};
		s.prototype.render = function (t) {
			e('<div/>', { html: this.content, class: 'foggy-pass-' + this.position })
				.css({
					position: this.position,
					opacity: this.opacity,
					top: this.offset[0],
					left: this.offset[1],
				})
				.appendTo(t);
		};
		var o = function (e) {
			this.radius = e;
		};
		o.prototype.includes = function (e, t) {
			if (Math.pow(e, 2) + Math.pow(t, 2) <= Math.pow(this.radius, 2)) {
				return true;
			} else {
				return false;
			}
		};
		o.prototype.points = function () {
			var e = [];
			for (var t = -this.radius; t <= this.radius; t++) {
				for (var n = -this.radius; n <= this.radius; n++) {
					if (this.includes(t, n)) {
						e.push([t, n]);
					}
				}
			}
			return e;
		};
		var u = function (e, t) {
			this.element = e;
			this.settings = t;
		};
		u.prototype.calculateOffsets = function (t, n) {
			var r = e.grep(new o(t).points(), function (e) {
				return e[0] != 0 || e[1] != 0;
			});
			var i;
			if (r.length <= n) {
				i = r;
			} else {
				var s = r.length - n;
				var u = [];
				for (var a = 0; a < s; a++) {
					u.push(Math.round(a * (r.length / s)));
				}
				i = e.grep(r, function (t, n) {
					if (e.inArray(n, u) >= 0) {
						return false;
					} else {
						return true;
					}
				});
			}
			return i;
		};
		u.prototype.getContent = function () {
			var t = e(this.element).find('.foggy-pass-relative')[0];
			if (t) {
				return e(t).html();
			} else {
				return e(this.element).html();
			}
		};
		u.prototype.render = function () {
			var t = this.getContent();
			e(this.element).empty();
			var n = e('<div/>').css({ position: 'relative' });
			var r = this.calculateOffsets(
				this.settings.blurRadius * 2,
				this.settings.quality
			);
			var i = (this.settings.opacity * 1.2) / (r.length + 1);
			new s(t, 'relative', [0, 0], i).render(n);
			e(r).each(function (e, r) {
				new s(t, 'absolute', r, i).render(n);
			});
			n.appendTo(this.element);
		};
		var a = function (e, t) {
			this.element = e;
			this.settings = t;
		};
		a.prototype.render = function () {
			var t = ('' + i.opacity).slice(2, 4);
			var n = this.settings.blurRadius;
			e(this.element).css({
				'-webkit-filter': 'blur(' + n + 'px)',
				opacity: i.opacity,
			});
		};
		return this.each(function (e, t) {
			if (i.cssFilterSupport && '-webkit-filter' in document.body.style) {
				new a(t, i).render();
			} else {
				new u(t, i).render();
			}
		});
	};
})(jQuery);
$(document).ready(function () {
	$('.obscure').foggy();
});

/* Stack-Auto */
$(document).ready(function () {
	$('.stack-auto').each(function (index) {
		$(this).css('z-index', index);
	});
});

/* StackSwitch */
$.fn.switchinglayers = function (i) {
	var n,
		t = [],
		a = $.extend({
			container: $("[data-switch='container']"),
			mainLayer: $("[data-switch='main-layer']"),
			parentSwitch: $("[data-switch='switch-parent']"),
			activeClassName: 'active',
			switchingTime: 3,
		});
	function e(i, a) {
		for (var e = 0, c = 0; c < t.length; c++) t[c] += 1;
		$(i.container).each(function () {
			(n = $(this).find(i.mainLayer)),
				$(n).each(function () {
					$(this)
						.find(i.parentSwitch)
						.each(function () {
							e++,
								a && t.push(0),
								0 ==
									$(this)
										.children('div')
										.eq(t[e - 1]).length && (t[e - 1] = 0),
								$(this).children('div').removeClass(i.activeClassName),
								$(this)
									.children('div')
									.eq(t[e - 1])
									.addClass(i.activeClassName);
						});
				});
		});
	}
	e(a, !0),
		setInterval(function () {
			a.container.length > 0 && e(a, !1);
		}, 1e3 * a.switchingTime);
};
$(document).ready(function () {
	$().switchinglayers({});
});

/* B-Loader */
!(function (T) {
	T.fn.simpleLoadMore = function (_) {
		var f = T.extend(
			{
				count: 5,
				itemsToLoad: 5,
				btnHTML: '',
				btnText: 'View More',
				item: '',
				cssClass: 'load-more',
				showCounter: !1,
				counterText: 'Showing {showing} out of {total}',
			},
			_
		);
		T(this).each(function (t, n) {
			var e,
				o = f.btnHTML,
				s = f.btnText,
				a = f.count,
				i = (f.itemsToLoad, f.item),
				l = f.cssClass,
				c = f.showCounter,
				d = f.counterText,
				u = T(this),
				h = u.find(i),
				m = T('<p class="slm__counter">' + d + '</p>');
			c && u.append(m),
				o || (o = '<a href="#" class="' + l + '__btn">' + s + '</a>'),
				(e = T(o)),
				(_.itemsToLoad && !isNaN(_.itemsToLoad)) || (f.itemsToLoad = f.count),
				u.addClass(l),
				h.addClass(l + '__item'),
				!u.find('.' + l + '__btn').length && h.length > f.count && u.append(e),
				e.add(m).html(function (t, n) {
					var e = n.replace(
						'{showing}',
						'<span class="loadcount"><span class="slm__count slm__count--showing">' +
							a +
							'</span>'
					);
					return (e = e.replace(
						'{total}',
						'<span class="slm__count slm__count--total">' +
							h.length +
							'</span></span>'
					));
				});
			var r = u.find('.' + l + '__btn');
			r.length || (r = e),
				h.length > f.count && h.slice(f.count).hide(),
				r.on('click', function (t) {
					t.preventDefault();
					var n = T(this),
						e = h.filter(':hidden'),
						o = e;
					-1 !== f.itemsToLoad &&
						0 < f.itemsToLoad &&
						(o = e.slice(0, f.itemsToLoad)),
						0 < o.length && o.fadeIn(),
						u.find('.slm__count--showing').text(h.filter(':visible').length),
						(e.length <= f.itemsToLoad || -1 === f.itemsToLoad) && n.remove();
				});
		});
	};
})(jQuery);

/* Tree List */
var toggler = document.getElementsByClassName('parent');
var i;
for (i = 0; i < toggler.length; i++) {
	toggler[i].addEventListener('click', function () {
		this.parentElement.querySelector('.nested').classList.toggle('active');
		this.classList.toggle('parent-down');
	});
}

/* PicProtect */
(function (a) {
	a.fn.picopyright = function () {
		a(this).on('contextmenu', function (c) {
			if (c.button == 2) {
				a('.picprotect').fadeIn('fast');
				setTimeout(function () {
					a('.picprotect').fadeOut('fast');
				}, 1000);
			}
			return false;
		});
		var b = 0;
		a(this).on('touchstart', function (c) {
			c.preventDefault();
			b = setTimeout(function () {
				a('.picprotect').fadeIn('fast');
				setTimeout(function () {
					a('.picprotect').fadeOut('fast');
				}, 1000);
			}, 400);
		});
		a(this).on('touchend', function (c) {
			c.preventDefault();
			clearTimeout(b);
		});
	};
})(jQuery);
$(document).ready(function () {
	$('.guard').picopyright();
});

/* Link Previewer */
!(function (e, t) {
	'object' == typeof exports && 'object' == typeof module
		? (module.exports = t())
		: 'function' == typeof define && define.amd
		? define([], t)
		: 'object' == typeof exports
		? (exports.hoverPreview = t())
		: (e.hoverPreview = t());
})(window, function () {
	return (function (e) {
		var t = {};
		function n(i) {
			if (t[i]) return t[i].exports;
			var r = (t[i] = { i: i, l: !1, exports: {} });
			return e[i].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
		}
		return (
			(n.m = e),
			(n.c = t),
			(n.d = function (e, t, i) {
				n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
			}),
			(n.r = function (e) {
				'undefined' != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
					Object.defineProperty(e, '__esModule', { value: !0 });
			}),
			(n.t = function (e, t) {
				if ((1 & t && (e = n(e)), 8 & t)) return e;
				if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
				var i = Object.create(null);
				if (
					(n.r(i),
					Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
					2 & t && 'string' != typeof e)
				)
					for (var r in e)
						n.d(
							i,
							r,
							function (t) {
								return e[t];
							}.bind(null, r)
						);
				return i;
			}),
			(n.n = function (e) {
				var t =
					e && e.__esModule
						? function () {
								return e.default;
						  }
						: function () {
								return e;
						  };
				return n.d(t, 'a', t), t;
			}),
			(n.o = function (e, t) {
				return Object.prototype.hasOwnProperty.call(e, t);
			}),
			(n.p = ''),
			n((n.s = 0))
		);
	})([
		function (e, t, n) {
			'use strict';
			function i(e, t, n) {
				var i = n.offset,
					r = n.dimensions;
				return (
					(t.style.left =
						(function (e, t, n) {
							return e
								? window.innerWidth - n - 20 > t
									? n + 20
									: window.innerWidth > t
									? window.innerWidth - t
									: 0
								: t < n - 20
								? n - t - 20
								: 0;
						})(e, t.clientWidth, i.x) + 'px'),
					(t.style.top =
						(function (e, t) {
							var n = window.innerHeight;
							if (t.y >= n) return 0;
							var i = (e.y / n) * 100;
							return (n / 100) * (i = i > 100 ? 100 : i) - (t.y / 100) * i;
						})(i, r) + 'px'),
					!1
				);
			}
			function r() {
				return (
					(this.data.extension = this.data.src.split('.').pop().toLowerCase()),
					['jpg', 'jpeg', 'gif', 'png', 'ico', 'svg', 'bmp', 'webp'].includes(
						this.data.extension
					)
						? 0
						: ['webm', 'mp4'].includes(this.data.extension)
						? 1
						: null
				);
			}
			function o(e) {
				return this.options.encodeAll
					? encodeURI(e).replace('#', '%23').replace('?', '%3F')
					: encodeURI(e);
			}
			function s(e, t) {
				var n = document.createElement('img'),
					i = this;
				(n.style['max-width'] = 'inherit'),
					(n.style['max-height'] = 'inherit'),
					(n.src = o.call(i, e)),
					(i.timers.load = setInterval(function () {
						var e = n.naturalWidth,
							r = n.naturalHeight;
						e && r && (clearInterval(i.timers.load), t(n, [e, r]));
					}, 30));
			}
			function a(e, t) {
				var n = document.createElement('video'),
					i = n.appendChild(document.createElement('source'));
				['muted', 'loop', 'autoplay'].forEach(function (e) {
					n[e] = !0;
				}),
					(i.type = 'video/' + this.data.extension),
					(i.src = o.call(this, e)),
					(n.style['max-width'] = 'inherit'),
					(n.style['max-height'] = 'inherit'),
					(n.onloadedmetadata = function () {
						t(n, [this.videoWidth, this.videoHeight]);
					});
			}
			function l(e) {
				this.data.offset = { x: e.clientX, y: e.clientY };
			}
			function u(e) {
				var t = e.target;
				if (
					(Object.prototype.hasOwnProperty.call(this.options, 'source') &&
					this.options.source
						? (this.data.src = this.options.source)
						: t.hasAttribute('data-src')
						? (this.data.src = t.getAttribute('data-src'))
						: t.hasAttribute('src')
						? (this.data.src = t.getAttribute('src'))
						: t.hasAttribute('href') &&
						  (this.data.src = t.getAttribute('href')),
					null === this.data.src)
				)
					throw Error('No valid source value found.');
				if (((this.data.type = r.call(this)), null != this.data.type)) {
					var n = this;
					this.data.left = this.data.offset.x <= window.innerWidth / 2;
					var i = document.body.appendChild(
						(function () {
							var e = document.createElement('div');
							e.className = 'preview-container';
							var t = {
								'pointer-events': 'none',
								position: 'fixed',
								visibility: 'hidden',
								'z-index': '9999',
								top: '-9999px',
								left: '-9999px',
								'max-width': '80vh',
								'max-height': 'calc(80vh - 20px)',
							};
							return (
								Object.keys(t).forEach(function (n) {
									e.style[n] = t[n];
								}),
								e
							);
						})()
					);
					this.options.cursor &&
						null === this.data.cursor &&
						((this.data.cursor = t.style.cursor),
						(t.style.cursor = 'progress')),
						(0 !== this.data.type && 1 !== this.data.type) ||
							(0 === this.data.type ? s : a).call(
								this,
								this.data.src,
								function (e, r) {
									i.appendChild(e),
										(n.data.container = i),
										(n.data.dimensions = { x: r[0], y: r[1] }),
										(n.loaded = !0),
										c.call(n),
										(i.style.visibility = 'visible'),
										n.options.cursor &&
											(t.style.cursor = n.data.cursor ? n.data.cursor : '');
								}
							);
				}
			}
			function c() {
				this.updater(this.data.left, this.data.container, {
					dimensions: this.data.dimensions,
					offset: { x: this.data.offset.x, y: this.data.offset.y },
				});
			}
			function d(e) {
				if ((l.call(this, e), !this.loaded)) return !1;
				c.call(this);
			}
			function h(e) {
				l.call(this, e);
				var t = this;
				this.options.delay && this.options.delay > 0
					? (this.timers.delay = setTimeout(function () {
							u.call(t, e);
					  }, this.options.delay))
					: u.call(t, e);
			}
			function f(e) {
				this.options.cursor &&
					'progress' === e.target.style.cursor &&
					((e.target.style.cursor = this.data.cursor ? this.data.cursor : ''),
					(this.data.cursor = null));
				var t = document.querySelector('.preview-container');
				t && t.remove(),
					clearTimeout(this.timers.delay),
					clearInterval(this.timers.load),
					(this.loaded = !1);
			}
			function p(e, t) {
				var n = Object.keys(e);
				if (Object.getOwnPropertySymbols) {
					var i = Object.getOwnPropertySymbols(e);
					t &&
						(i = i.filter(function (t) {
							return Object.getOwnPropertyDescriptor(e, t).enumerable;
						})),
						n.push.apply(n, i);
				}
				return n;
			}
			function v(e) {
				for (var t = 1; t < arguments.length; t++) {
					var n = null != arguments[t] ? arguments[t] : {};
					t % 2
						? p(Object(n), !0).forEach(function (t) {
								m(e, t, n[t]);
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
						: p(Object(n)).forEach(function (t) {
								Object.defineProperty(
									e,
									t,
									Object.getOwnPropertyDescriptor(n, t)
								);
						  });
				}
				return e;
			}
			function m(e, t, n) {
				return (
					t in e
						? Object.defineProperty(e, t, {
								value: n,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (e[t] = n),
					e
				);
			}
			function y(e, t) {
				if (!(e instanceof t))
					throw new TypeError('Cannot call a class as a function');
			}
			function b(e, t) {
				for (var n = 0; n < t.length; n++) {
					var i = t[n];
					(i.enumerable = i.enumerable || !1),
						(i.configurable = !0),
						'value' in i && (i.writable = !0),
						Object.defineProperty(e, i.key, i);
				}
			}
			n.r(t);
			var w = { delay: 75, encodeAll: !1, cursor: !0 },
				g = (function () {
					function e(t) {
						var n =
							arguments.length > 1 && void 0 !== arguments[1]
								? arguments[1]
								: {};
						if ((y(this, e), !t)) throw Error('No element were passed.');
						(this.element = t), (this.options = n), x.call(this);
					}
					var t, n, i;
					return (
						(t = e),
						(n = [
							{
								key: 'reload',
								value: function () {
									this.destroy(), x.call(this);
								},
							},
							{
								key: 'destroy',
								value: function () {
									var e = this.events;
									this.handle.removeEventListener(
										'mouseenter',
										e.mouseenter,
										!1
									),
										this.handle.removeEventListener(
											'mouseleave',
											e.mouseleave,
											!1
										),
										this.handle.removeEventListener(
											'mousemove',
											e.mousemove,
											!1
										);
								},
							},
						]) && b(t.prototype, n),
						i && b(t, i),
						e
					);
				})();
			function x() {
				(this.options = v(v({}, w), this.options)),
					(this.data = {
						cursor: null,
						left: null,
						src: null,
						type: null,
						offset: null,
						dimensions: null,
					}),
					(this.timers = { load: null, delay: null }),
					(this.handle = this.element),
					(this.updater = window.requestAnimationFrame
						? function (e, t, n) {
								window.requestAnimationFrame(function () {
									i(e, t, n);
								});
						  }
						: function (e, t, n) {
								i(e, t, n);
						  }),
					(this.events = {
						mouseenter: h.bind(this),
						mouseleave: f.bind(this),
						mousemove: d.bind(this),
					}),
					this.handle.addEventListener(
						'mouseenter',
						this.events.mouseenter,
						!1
					),
					this.handle.addEventListener(
						'mouseleave',
						this.events.mouseleave,
						!1
					),
					this.handle.addEventListener('mousemove', this.events.mousemove, !1);
			}
			t.default = function (e, t) {
				return new g(e, t);
			};
		},
	]).default;
});
function _toConsumableArray(a) {
	return (
		_arrayWithoutHoles(a) ||
		_iterableToArray(a) ||
		_unsupportedIterableToArray(a) ||
		_nonIterableSpread()
	);
}
function _nonIterableSpread() {
	throw new TypeError(
		'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
	);
}
function _unsupportedIterableToArray(a, b) {
	if (a) {
		if ('string' == typeof a) return _arrayLikeToArray(a, b);
		var c = Object.prototype.toString.call(a).slice(8, -1);
		return (
			'Object' === c && a.constructor && (c = a.constructor.name),
			'Map' === c || 'Set' === c
				? Array.from(a)
				: 'Arguments' === c ||
				  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
				? _arrayLikeToArray(a, b)
				: void 0
		);
	}
}
function _iterableToArray(a) {
	if ('undefined' != typeof Symbol && Symbol.iterator in Object(a))
		return Array.from(a);
}
function _arrayWithoutHoles(a) {
	if (Array.isArray(a)) return _arrayLikeToArray(a);
}
function _arrayLikeToArray(a, b) {
	(null == b || b > a.length) && (b = a.length);
	for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
	return d;
}
var elements = _toConsumableArray(document.querySelectorAll('.ph')).map(
	function (a) {
		return window.hoverPreview(a, { delay: 75 });
	}
);
console.log(elements);

/* Modal */
!(function (e, t) {
	if ('function' == typeof define && define.amd) define(['exports'], t);
	else if ('undefined' != typeof exports) t(exports);
	else {
		var n = { exports: {} };
		t(n.exports), (e.VanillaModal = n.exports);
	}
})(this, function (e) {
	'use strict';
	Object.defineProperty(e, '__esModule', { value: !0 });
	var t = (function () {
			function e(e, t) {
				for (var n = 0; n < t.length; n++) {
					var i = t[n];
					(i.enumerable = i.enumerable || !1),
						(i.configurable = !0),
						'value' in i && (i.writable = !0),
						Object.defineProperty(e, i.key, i);
				}
			}
			return function (t, n, i) {
				return n && e(t.prototype, n), i && e(t, i), t;
			};
		})(),
		n =
			Object.assign ||
			function (e) {
				for (var t = 1; t < arguments.length; t++) {
					var n = arguments[t];
					for (var i in n)
						Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
				}
				return e;
			},
		i = {
			modal: '.modal',
			modalInner: '.modal-inner',
			modalContent: '.modal-content',
			open: '[data-modal-open]',
			close: '[data-modal-close]',
			page: 'body',
			class: 'modal-visible',
			loadClass: 'vanilla-modal',
			clickOutside: !0,
			closeKeys: [27],
			transitions: !0,
			transitionEnd: null,
			onBeforeOpen: null,
			onBeforeClose: null,
			onOpen: null,
			onClose: null,
		};
	function o(e) {
		console.error('VanillaModal: ' + e);
	}
	function s(e, t) {
		var n = (t || document).querySelector(e);
		return n || o(e + ' not found in document.'), n;
	}
	function l(e, t) {
		e instanceof HTMLElement || o('Not a valid HTML element.'),
			e.setAttribute(
				'class',
				e.className
					.split(' ')
					.filter(function (e) {
						return e !== t;
					})
					.concat(t)
					.join(' ')
			);
	}
	function a(e, t) {
		for (
			var n = (e.target.document || e.target.ownerDocument).querySelectorAll(t),
				i = 0;
			i < n.length;
			i += 1
		)
			for (var o = e.target; o && o !== document.body; ) {
				if (o === n[i]) return o;
				o = o.parentNode;
			}
		return null;
	}
	var r = (function () {
		function e(t) {
			!(function (e, t) {
				if (!(e instanceof t))
					throw new TypeError('Cannot call a class as a function');
			})(this, e),
				(this.isOpen = !1),
				(this.current = null),
				(this.isListening = !1),
				(this.settings = (function (e) {
					return n({}, i, e, {
						transitionEnd:
							((s = document.createElement('div')),
							((t = [
								{ key: 'transition', value: 'transitionend' },
								{ key: 'OTransition', value: 'otransitionend' },
								{ key: 'MozTransition', value: 'transitionend' },
								{ key: 'WebkitTransition', value: 'webkitTransitionEnd' },
							]),
							(o = function (e) {
								var t = e.key;
								return void 0 !== s.style[t];
							}),
							function (e) {
								var n = t.filter(o);
								return n[0] ? n[0][e] : void 0;
							})('value')),
					});
					var t, o, s;
				})(t)),
				(this.dom = this.getDomNodes()),
				(this.open = this.open.bind(this)),
				(this.close = this.close.bind(this)),
				(this.closeKeyHandler = this.closeKeyHandler.bind(this)),
				(this.outsideClickHandler = this.outsideClickHandler.bind(this)),
				(this.delegateOpen = this.delegateOpen.bind(this)),
				(this.delegateClose = this.delegateClose.bind(this)),
				(this.listen = this.listen.bind(this)),
				(this.destroy = this.destroy.bind(this)),
				this.addLoadedCssClass(),
				this.listen();
		}
		return (
			t(e, [
				{
					key: 'getDomNodes',
					value: function () {
						var e = this.settings,
							t = e.modal,
							n = e.page,
							i = e.modalInner,
							o = e.modalContent;
						return {
							modal: s(t),
							page: s(n),
							modalInner: s(i, s(t)),
							modalContent: s(o, s(t)),
						};
					},
				},
				{
					key: 'addLoadedCssClass',
					value: function () {
						l(this.dom.page, this.settings.loadClass);
					},
				},
				{
					key: 'setOpenId',
					value: function (e) {
						this.dom.page.setAttribute('data-current-modal', e || 'anonymous');
					},
				},
				{
					key: 'removeOpenId',
					value: function () {
						this.dom.page.removeAttribute('data-current-modal');
					},
				},
				{
					key: 'open',
					value: function (e, t) {
						var n = this.dom.page,
							i = this.settings,
							s = i.onBeforeOpen,
							a = i.onOpen;
						this.releaseNode(this.current),
							(this.current = (function (e) {
								return e && 'string' == typeof e.hash
									? document.querySelector(e.hash)
									: 'string' == typeof e
									? document.querySelector(e)
									: (o('No selector supplied to open()'), null);
							})(e)),
							this.current instanceof HTMLElement != !1
								? ('function' == typeof s && s.call(this, t),
								  this.captureNode(this.current),
								  l(n, this.settings.class),
								  this.setOpenId(this.current.id),
								  (this.isOpen = !0),
								  'function' == typeof a && a.call(this, t))
								: o('VanillaModal target must exist on page.');
					},
				},
				{
					key: 'detectTransition',
					value: function () {
						var e = this.dom.modal,
							t = window.getComputedStyle(e, null);
						return Boolean(
							[
								'transitionDuration',
								'oTransitionDuration',
								'MozTransitionDuration',
								'webkitTransitionDuration',
							].filter(function (e) {
								return 'string' == typeof t[e] && parseFloat(t[e]) > 0;
							}).length
						);
					},
				},
				{
					key: 'close',
					value: function (e) {
						var t,
							n,
							i = this.settings,
							s = i.transitions,
							l = i.transitionEnd,
							a = i.onBeforeClose,
							r = this.detectTransition();
						this.isOpen &&
							((this.isOpen = !1),
							'function' == typeof a && a.call(this, e),
							(t = this.dom.page),
							(n = this.settings.class),
							t instanceof HTMLElement || o('Not a valid HTML element.'),
							t.setAttribute(
								'class',
								t.className
									.split(' ')
									.filter(function (e) {
										return e !== n;
									})
									.join(' ')
							),
							s && l && r
								? this.closeModalWithTransition(e)
								: this.closeModal(e));
					},
				},
				{
					key: 'closeModal',
					value: function (e) {
						var t = this.settings.onClose;
						this.removeOpenId(this.dom.page),
							this.releaseNode(this.current),
							(this.isOpen = !1),
							(this.current = null),
							'function' == typeof t && t.call(this, e);
					},
				},
				{
					key: 'closeModalWithTransition',
					value: function (e) {
						var t = this,
							n = this.dom.modal,
							i = this.settings.transitionEnd;
						n.addEventListener(i, function o() {
							n.removeEventListener(i, o), t.closeModal(e);
						});
					},
				},
				{
					key: 'captureNode',
					value: function (e) {
						for (var t = this.dom.modalContent; e.childNodes.length; )
							t.appendChild(e.childNodes[0]);
					},
				},
				{
					key: 'releaseNode',
					value: function (e) {
						for (var t = this.dom.modalContent; t.childNodes.length; )
							e.appendChild(t.childNodes[0]);
					},
				},
				{
					key: 'closeKeyHandler',
					value: function (e) {
						var t,
							n = this.settings.closeKeys;
						(t = n),
							'[object Array]' === Object.prototype.toString.call(t) &&
								t.length &&
								n.indexOf(e.which) > -1 &&
								!0 === this.isOpen &&
								(e.preventDefault(), this.close(e));
					},
				},
				{
					key: 'outsideClickHandler',
					value: function (e) {
						var t = this.settings.clickOutside,
							n = this.dom.modalInner;
						if (t) {
							for (var i = e.target; i && i !== document.body; ) {
								if (i === n) return;
								i = i.parentNode;
							}
							this.close(e);
						}
					},
				},
				{
					key: 'delegateOpen',
					value: function (e) {
						var t = a(e, this.settings.open);
						t && (e.preventDefault(), this.open(t, e));
					},
				},
				{
					key: 'delegateClose',
					value: function (e) {
						a(e, this.settings.close) && (e.preventDefault(), this.close(e));
					},
				},
				{
					key: 'listen',
					value: function () {
						var e = this.dom.modal;
						this.isListening
							? o('Event listeners already applied.')
							: (e.addEventListener('click', this.outsideClickHandler, !1),
							  document.addEventListener('keydown', this.closeKeyHandler, !1),
							  document.addEventListener('click', this.delegateOpen, !1),
							  document.addEventListener('click', this.delegateClose, !1),
							  (this.isListening = !0));
					},
				},
				{
					key: 'destroy',
					value: function () {
						var e = this.dom.modal;
						this.isListening
							? (this.close(),
							  e.removeEventListener('click', this.outsideClickHandler),
							  document.removeEventListener('keydown', this.closeKeyHandler),
							  document.removeEventListener('click', this.delegateOpen),
							  document.removeEventListener('click', this.delegateClose),
							  (this.isListening = !1))
							: o('Event listeners already removed.');
					},
				},
			]),
			e
		);
	})();
	e.default = r;
});
$(document).ready(function () {
	var modal = new VanillaModal.default();
});

/* Spotlight */
$(document).mousemove(function (e) {
	$('.spotlight').attr({
		style:
			'background:radial-gradient(50px 50px at ' +
			e.clientX +
			'px ' +
			e.clientY +
			'px, transparent, transparent 100px, rgba(0,0,0,0.6) 150px)',
	});
});

/* Datetime Picker */
var flatpickr = function (e, t) {
	'use strict';
	var n,
		a,
		r = [];
	if (
		((flatpickr.prototype = flatpickr.init.prototype),
		(a = function (e) {
			return (
				e._flatpickr && e._flatpickr.destroy(),
				(e._flatpickr = new flatpickr.init(e, t)),
				e._flatpickr
			);
		}),
		e.nodeName)
	)
		return a(e);
	if (1 === (n = document.querySelectorAll(e)).length) return a(n[0]);
	for (var c = 0; c < n.length; c++) r.push(a(n[c]));
	return r;
};
(flatpickr.init = function (t, n) {
	'use strict';
	var a,
		r,
		c,
		i,
		o,
		l,
		u,
		s = this,
		d = document.createElement('div'),
		f = document.createElement('span'),
		e = document.createElement('div'),
		m = document.createElement('span'),
		p = document.createElement('span'),
		h = document.createElement('table'),
		g = document.createElement('tbody'),
		D = new Date(),
		v = document.createElement('div'),
		M = function () {
			for (var e in ((d.className = 'flatpickr-calendar'),
			(f.className = 'flatpickr-current-month'),
			(n = n || {}),
			(s.config = {}),
			(s.element = t),
			(s.destroy = a),
			s.defaultConfig))
				s.config[e] =
					n[e] || s.element.dataset[e.toLowerCase()] || s.defaultConfig[e];
			s.config.defaultDate && (s.config.defaultDate = b(s.config.defaultDate)),
				(s.element.value || s.config.defaultDate) &&
					(s.selectedDateObj = b(s.config.defaultDate || s.element.value)),
				s.config.minDate &&
					(s.config.minDate = b(
						'today' === s.config.minDate ? new Date() : s.config.minDate,
						!0
					)),
				s.config.maxDate && (s.config.maxDate = b(s.config.maxDate, !0)),
				c(s.selectedDateObj || s.config.minDate || D),
				L(),
				W(),
				P(),
				y();
		},
		b = function (e, t) {
			return (
				(t = t || !1),
				'string' == typeof e && (e = new Date(e.replace(/-/g, '/'))),
				t && e.setHours(0, 0, 0, 0),
				e
			);
		},
		E = function (e, t) {
			return (
				e.getFullYear() === t.getFullYear() &&
				e.getMonth() === t.getMonth() &&
				e.getDate() === t.getDate()
			);
		},
		L = function () {
			(v.className = 'flatpickr-wrapper'),
				s.element.parentNode.insertBefore(v, s.element),
				v.appendChild(s.element),
				s.config.inline && v.classList.add('inline'),
				s.config.altInput &&
					(((i = document.createElement(s.element.nodeName)).className =
						s.element.className),
					(s.element.type = 'hidden'),
					v.appendChild(i));
		},
		k = function (e) {
			var t = s.currentYear,
				n = e || s.currentMonth;
			return 1 !== n || t % 4 || (!(t % 100) && t % 400)
				? s.l10n.daysInMonth[n]
				: 29;
		},
		y = function () {
			var e, t;
			s.selectedDateObj &&
				s.config.enableTime &&
				((e = (parseInt(o.value) % 12) + 12 * ('PM' === u.innerHTML)),
				(t = (60 + parseInt(l.value)) % 60),
				s.selectedDateObj.setHours(e, t),
				(o.value = O(((12 + e) % 12) + 12 * (e % 12 == 0))),
				(l.value = O(t))),
				s.selectedDateObj && (s.element.value = j(s.config.dateFormat)),
				s.config.altInput &&
					s.selectedDateObj &&
					(i.value = j(s.config.altFormat)),
				r();
		},
		O = function (e) {
			return ('0' + e).slice(-2);
		},
		j = function (e) {
			s.config.enableTime && (e += ' ' + s.config.timeFormat);
			var n = '',
				a = {
					d: function () {
						return O(a.j());
					},
					D: function () {
						return s.l10n.weekdays.shorthand[a.w()];
					},
					j: function () {
						return s.selectedDateObj.getDate();
					},
					l: function () {
						return s.l10n.weekdays.longhand[a.w()];
					},
					w: function () {
						return s.selectedDateObj.getDay();
					},
					F: function () {
						return w(a.n() - 1, !1);
					},
					m: function () {
						return O(a.n());
					},
					M: function () {
						return w(a.n() - 1, !0);
					},
					n: function () {
						return s.selectedDateObj.getMonth() + 1;
					},
					U: function () {
						return s.selectedDateObj.getTime() / 1e3;
					},
					y: function () {
						return String(a.Y()).substring(2);
					},
					Y: function () {
						return s.selectedDateObj.getFullYear();
					},
					h: function () {
						return s.selectedDateObj.getHours() % 12
							? s.selectedDateObj.getHours() % 12
							: 12;
					},
					H: function () {
						return O(s.selectedDateObj.getHours());
					},
					i: function () {
						return O(s.selectedDateObj.getMinutes());
					},
					K: function () {
						return 11 < s.selectedDateObj.getHours() ? 'PM' : 'AM';
					},
				},
				r = e.split('');
			return (
				[].forEach.call(r, function (e, t) {
					a[e] && '\\' !== r[t - 1] ? (n += a[e]()) : '\\' !== e && (n += e);
				}),
				n
			);
		},
		w = function (e, t) {
			return t ? s.l10n.months.shorthand[e] : s.l10n.months.longhand[e];
		},
		C = function () {
			var e = document.createElement('thead'),
				t = s.l10n.firstDayOfWeek,
				n = s.l10n.weekdays.shorthand.slice();
			0 < t &&
				t < n.length &&
				(n = [].concat(n.splice(t, n.length), n.splice(0, t))),
				(e.innerHTML = '<tr><th>' + n.join('</th><th>') + '</th></tr>'),
				h.appendChild(e);
		},
		T = function (e) {
			for (var t = 0; t < s.config.disable.length; t++)
				if (e >= b(s.config.disable[t].from) && e <= b(s.config.disable[t].to))
					return !0;
			return !1;
		},
		H = function () {
			var e = document.createElement('div'),
				t = document.createElement('span');
			(e.className = 'flatpickr-time'),
				(o = document.createElement('input')),
				(l = document.createElement('input')),
				((u = document.createElement('span')).className = 'flatpickr-am-pm'),
				(t.className = 'flatpickr-time-separator'),
				(t.innerHTML = ':'),
				(o.className = 'flatpickr-hour'),
				(o.type = l.type = 'number'),
				(l.className = 'flatpickr-minute'),
				(o.value = s.selectedDateObj ? O(s.selectedDateObj.getHours()) : 12),
				(l.value = s.selectedDateObj
					? O(s.selectedDateObj.getMinutes())
					: '00'),
				(u.innerHTML = ['AM', 'PM'][0 | (s.selectedDateObj && 11 < o.value)]),
				(o.step = s.config.hourIncrement),
				(l.step = s.config.minuteIncrement),
				(o.max = 12),
				(l.max = 59),
				(o.min = 1),
				(l.min = 0),
				e.appendChild(o),
				e.appendChild(t),
				e.appendChild(l),
				e.appendChild(u),
				d.appendChild(e);
		},
		N = function (e) {
			e.preventDefault();
			var t = parseInt(e.target.min),
				n = parseInt(e.target.max),
				a = parseInt(e.target.step),
				r = a * Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)),
				c = (parseInt(e.target.value) + r) % (n + (0 === t));
			c < t && (c = n + (0 === t) - a * (0 === t)), (e.target.value = O(c));
		},
		F = function () {
			for (
				var e,
					t,
					n,
					a,
					r =
						(new Date(s.currentYear, s.currentMonth, 1).getDay() -
							s.l10n.firstDayOfWeek +
							7) %
						7,
					c = k(),
					i = (s.currentMonth - 1 + 12) % 12,
					o = k(i),
					l = document.createDocumentFragment(),
					u = document.createElement('tr'),
					d = o + 1 - r;
				d <= o;
				d++
			)
				u.innerHTML +=
					'<td class="disabled"><span class="flatpickr-day">' +
					d +
					'</span></td>';
			for (g.innerHTML = '', d = 1; d <= 42 - r; d++)
				d <= c && (t = new Date(s.currentYear, s.currentMonth, d)),
					(d + r - 1) % 7 == 0 &&
						(l.appendChild(u), (u = document.createElement('tr'))),
					(a =
						(s.config.minDate && t < s.config.minDate) ||
						(s.config.maxDate && t > s.config.maxDate)),
					(e = (n = c < d || a || T(t)) ? 'disabled' : 'slot'),
					n || s.selectedDateObj || !E(t, D) || (e += ' today'),
					!n &&
						s.selectedDateObj &&
						E(t, s.selectedDateObj) &&
						(e += ' selected'),
					(u.innerHTML +=
						'<td class="' +
						e +
						'"><span class="flatpickr-day">' +
						(c < d ? d % c : d) +
						'</span></td>');
			l.appendChild(u), g.appendChild(l);
		},
		I = function () {
			f.innerHTML =
				'<span>' +
				w(s.currentMonth, s.config.shorthandCurrentMonth) +
				'</span> ' +
				s.currentYear;
		},
		Y = function () {
			(e.className = 'flatpickr-months'),
				(m.className = 'flatpickr-prev-month'),
				(m.innerHTML = s.config.prevArrow),
				(p.className = 'flatpickr-next-month'),
				(p.innerHTML = s.config.nextArrow),
				e.appendChild(m),
				e.appendChild(f),
				e.appendChild(p),
				I(),
				d.appendChild(e);
		},
		x = function () {
			(s.currentMonth < 0 || 11 < s.currentMonth) &&
				((s.currentYear += s.currentMonth % 11),
				(s.currentMonth = (s.currentMonth + 12) % 12));
		},
		A = function (e) {
			v.classList.contains('open') && !v.contains(e.target) && s.close();
		},
		S = function (e) {
			(s.currentMonth += e), x(), I(), F();
		},
		J = function (e) {
			e.preventDefault();
			var t = e.target;
			(t.classList.contains('slot') ||
				t.parentNode.classList.contains('slot')) &&
				((s.selectedDateObj = new Date(
					s.currentYear,
					s.currentMonth,
					t.childNodes[0].innerHTML || t.innerHTML
				)),
				y(),
				F(),
				s.config.inline || s.config.enableTime || s.close());
		},
		W = function () {
			Y(),
				C(),
				F(),
				h.appendChild(g),
				d.appendChild(h),
				v.appendChild(d),
				s.config.enableTime && H();
		},
		P = function () {
			function e(e) {
				e.preventDefault(),
					(u.innerHTML = ['AM', 'PM'][('AM' === u.innerHTML) | 0]);
			}
			s.element.addEventListener('focus', s.open),
				s.config.altInput && i.addEventListener('focus', s.open),
				m.addEventListener('click', function () {
					S(-1);
				}),
				p.addEventListener('click', function () {
					S(1);
				}),
				h.addEventListener('click', J),
				document.addEventListener('click', A, !0),
				s.config.enableTime &&
					(o.addEventListener('mousewheel', N),
					o.addEventListener('DOMMouseScroll', N),
					l.addEventListener('mousewheel', N),
					l.addEventListener('DOMMouseScroll', N),
					o.addEventListener('mouseout', y),
					l.addEventListener('mouseout', y),
					o.addEventListener('change', y),
					l.addEventListener('change', y),
					o.addEventListener('click', function () {
						o.select();
					}),
					l.addEventListener('click', function () {
						l.select();
					}),
					u.addEventListener('focus', function () {
						u.blur();
					}),
					u.addEventListener('click', e),
					u.addEventListener('mousewheel', e),
					u.addEventListener('DOMMouseScroll', e),
					u.addEventListener('mouseout', y));
		};
	return (
		(s.open = function () {
			s.element.blur(),
				i && i.blur(),
				s.config.inline || v.classList.add('open');
		}),
		(s.close = function () {
			v.classList.remove('open');
		}),
		(r = function () {
			'createEvent' in document
				? t.dispatchEvent(new Event('change'))
				: t.fireEvent('onchange'),
				s.config.onChange(s.selectedDateObj, s.element.value);
		}),
		(a = function () {
			var e, t;
			document.removeEventListener('click', A, !1),
				s.element.removeEventListener('focus', s.open, !1),
				s.element.removeEventListener('click', s.open, !1),
				(e = s.element.parentNode).removeChild(d),
				(t = e.removeChild(s.element)),
				e.parentNode.replaceChild(t, e);
		}),
		(c = function (e) {
			(e = e || s.selectedDateObj || s.config.minDate || D),
				(s.currentYear = e.getFullYear()),
				(s.currentMonth = e.getMonth());
		}),
		(s.redraw = function () {
			I(), F();
		}),
		(s.jumpToDate = function (e) {
			c(b(e) || new Date()), s.redraw();
		}),
		(s.setDate = function (e, t) {
			(s.selectedDateObj = b(e)),
				s.jumpToDate(s.selectedDateObj),
				(t = t || !1) && r();
		}),
		(s.set = function (e, t) {
			e in s.config && ((s.config[e] = t), c(), s.redraw());
		}),
		M(),
		s
	);
}),
	(flatpickr.init.prototype = {
		l10n: {
			weekdays: {
				shorthand: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				longhand: [
					'Sunday',
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
				],
			},
			months: {
				shorthand: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec',
				],
				longhand: [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December',
				],
			},
			daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			firstDayOfWeek: 0,
		},
		defaultConfig: {
			dateFormat: 'Y-m-d',
			altInput: !1,
			altFormat: 'F j, Y',
			defaultDate: null,
			minDate: null,
			maxDate: null,
			disable: [],
			shorthandCurrentMonth: !1,
			inline: !1,
			prevArrow: '&lt;',
			nextArrow: '&gt;',
			enableTime: !1,
			timeFormat: 'h:i K',
			hourIncrement: 1,
			minuteIncrement: 5,
			onChange: function (e, t) {},
		},
	}),
	'undefined' != typeof module && (module.exports = flatpickr);
$(document).ready(function () {
	flatpickr('.datepick', { dateFormat: 'm/d/Y', shorthandCurrentMonth: true });
	flatpickr('.datepick-euro', {
		dateFormat: 'd-m-Y',
		shorthandCurrentMonth: true,
	});
	flatpickr('.datetime', {
		enableTime: true,
		dateFormat: 'm/d/Y',
		timeFormat: 'h:i K',
		shorthandCurrentMonth: true,
	});
	flatpickr('.datetime-euro', {
		enableTime: true,
		dateFormat: 'd-m-Y',
		timeFormat: 'h:i K',
		shorthandCurrentMonth: true,
	});
	flatpickr('.datepick-full', {
		dateFormat: 'l, F j, Y',
		shorthandCurrentMonth: true,
	});
	flatpickr('.datetime-full', {
		enableTime: true,
		dateFormat: 'l, F j, Y',
		timeFormat: 'h:i K',
		shorthandCurrentMonth: true,
	});
});

/* Credit Card Validator */
var $cc = {};
($cc.validate = function (t) {
	if ('' == t.target.value)
		return (
			(t.target.previousElementSibling.className = 'card-type'),
			void (t.target.nextElementSibling.className = 'card-valid')
		);
	for (var a, e = String(t.target.value), r = '', n = 0; n < e.length; n++)
		/^[0-9]+$/.test(e.charAt(n)) && (r += e.charAt(n));
	if ('Backspace' != t.key) {
		for (var l = '', n = 0; n < r.length; n++)
			3 == n || 7 == n || 11 == n
				? (l = l + r.charAt(n) + ' ')
				: (l += r.charAt(n));
		t.target.value = l;
	}
	12 <= r.length &&
		(a = (function (t) {
			for (var a = t.split('').reverse(), e = 0; e < a.length; e++)
				e % 2 != 0 &&
					((a[e] = 2 * a[e]),
					9 < a[e] &&
						(a[e] =
							parseInt(String(a[e]).charAt(0)) +
							parseInt(String(a[e]).charAt(1))));
			for (var r = 0, e = 1; e < a.length; e++) r += parseInt(a[e]);
			return (r = (9 * r) % 10), a[0] == r;
		})(r)),
		(t.target.nextElementSibling.className =
			1 == a ? 'card-valid active' : 'card-valid');
	for (
		var c = [
				{ name: 'amex', pattern: /^3[47]/, valid_length: [15] },
				{
					name: 'diners_club_carte_blanche',
					pattern: /^30[0-5]/,
					valid_length: [14],
				},
				{
					name: 'diners_club_international',
					pattern: /^36/,
					valid_length: [14],
				},
				{ name: 'jcb', pattern: /^35(2[89]|[3-8][0-9])/, valid_length: [16] },
				{
					name: 'laser',
					pattern: /^(6304|670[69]|6771)/,
					valid_length: [16, 17, 18, 19],
				},
				{
					name: 'visa_electron',
					pattern: /^(4026|417500|4508|4844|491(3|7))/,
					valid_length: [16],
				},
				{ name: 'visa', pattern: /^4/, valid_length: [16] },
				{ name: 'mastercard', pattern: /^5[1-5]/, valid_length: [16] },
				{
					name: 'maestro',
					pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
					valid_length: [12, 13, 14, 15, 16, 17, 18, 19],
				},
				{
					name: 'discover',
					pattern:
						/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
					valid_length: [16],
				},
			],
			n = 0;
		n < c.length;
		n++
	)
		e.match(c[n].pattern) &&
			(t.target.previousElementSibling.className = 'card-type ' + c[n].name);
}),
	($cc.expiry = function (t) {
		if ('Backspace' != t.key) {
			for (var a = String(this.value), e = '', r = 0; r < a.length; r++)
				1 == r && '/' == a.charAt(r) && (e = 0 + a.charAt(0)),
					/^[0-9]+$/.test(a.charAt(r)) && (e += a.charAt(r));
			for (var n = '', r = 0; r < e.length; r++)
				/^[0-9]+$/.test(e.charAt(r)) &&
					(0 == r && 1 < e.charAt(r)
						? ((n += 0), (n += e.charAt(r)), (n += '/'))
						: 1 == r
						? ((n += e.charAt(r)), (n += '/'))
						: 2 == r && e.charAt(r) < 2
						? (n += '20' + e.charAt(r))
						: (n += e.charAt(r)));
			this.value = n;
		}
	});

/* Create Account Validator */
var objectString,
	arrayString,
	profile = {},
	lodging = [];
function validateUsername() {
	var t = document.getElementById('uname'),
		n = document.getElementById('unameError');
	try {
		if (!1 === /.{4,}/.test(t.value))
			throw 'Username must be at least 4 characters.';
		if (!0 === /\W/.test(t.value))
			throw 'Username must only contain letters and numbers.';
		(t.style.background = ''),
			(n.style.display = 'none'),
			(n.innerHTML = ''),
			(profile.username = t.value),
			(document.getElementById('profileUname').innerHTML = profile.username),
			(document.getElementById('profile').style.display = 'block'),
			(document.getElementById('unameSection').style.display = 'block');
	} catch (e) {
		(n.style.display = 'block'),
			(n.innerHTML = e),
			(t.style.background = 'rgb(255,233,233)');
	}
}
function validatePassword() {
	var t = document.getElementById('pw1'),
		n = document.getElementById('pw2'),
		a = document.getElementById('passwordError');
	try {
		if (!1 === /.{8,}/.test(t.value))
			throw 'Password must be at least 8 characters.';
		if (0 !== t.value.localeCompare(n.value)) throw 'Passwords must match.';
		if (!1 === /[a-zA-z]/.test(t.value))
			throw 'Password must contain at least one letter.';
		if (!1 === /\d/.test(t.value))
			throw 'Password must contain at least one number.';
		if (!1 === /[!@$%*_]/.test(t.value))
			throw 'Password must contain at least one of the following symbols: ! @ $ % * _';
		(t.style.background = ''),
			(n.style.background = ''),
			(a.style.display = 'none'),
			(a.innerHTML = ''),
			(profile.password = t.value);
	} catch (e) {
		(a.style.display = 'block'),
			(a.innerHTML = e),
			(t.style.background = 'rgb(255,233,233)'),
			(n.style.background = 'rgb(255,233,233)');
	}
}
function validateEmail() {
	var t = document.getElementById('emailbox'),
		n = document.getElementById('emailError');
	try {
		if (
			!1 ===
			/^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/.test(t.value)
		)
			throw 'Please provide a valid email address.';
		(t.style.background = ''),
			(n.innerHTML = ''),
			(n.style.display = 'none'),
			(t.value = t.value.toLowerCase()),
			(profile.email = t.value),
			(document.getElementById('profileEmail').innerHTML = profile.email),
			(document.getElementById('profile').style.display = 'block'),
			(document.getElementById('emailSection').style.display = 'block');
	} catch (e) {
		(n.innerHTML = e),
			(n.style.display = 'block'),
			(t.style.background = 'rgb(255,233,233)');
	}
}
function registerLodging(e) {
	void 0 === e && (e = window.event);
	var t = e.target || e.srcElement,
		n = t.value;
	if (t.checked) {
		lodging.push(n);
		var a = document.createElement('li');
		(a.innerHTML = n),
			document.getElementById('preferences').appendChild(a),
			(document.getElementById('profile').style.display = 'block'),
			(document.getElementById('acctPrefs').style.display = 'block');
	} else
		for (
			var l = document.querySelectorAll('#preferences li'), r = 0;
			r < l.length;
			r++
		)
			if (l[r].innerHTML === n) {
				lodging.splice(r, 1), l[r].parentNode.removeChild(l[r]);
				break;
			}
}
function convertToString() {
	(arrayString = lodging.toString()), (objectString = JSON.stringify(profile));
}
function createAccountListeners() {
	var e = document.getElementById('uname'),
		t = document.getElementById('pw2'),
		n = document.getElementById('emailbox');
	e.addEventListener
		? (e.addEventListener('change', validateUsername, !1),
		  t.addEventListener('change', validatePassword, !1),
		  n.addEventListener('change', validateEmail, !1))
		: e.attachEvent &&
		  (e.attachEvent('onchange', validateUsername),
		  t.attachEvent('onchange', validatePassword),
		  n.attachEvent('onchange', validateEmail));
	var a = document.getElementsByName('prefs');
	if (a[0].addEventListener)
		for (var l = 0; l < a.length; l++)
			a[l].addEventListener('change', registerLodging, !1);
	else if (a[0].attachEvent)
		for (l = 0; l < a.length; l++)
			a[l].attachEvent('onchange', registerLodging);
	var r = document.getElementById('createAcct');
	r.addEventListener
		? r.addEventListener('click', convertToString, !1)
		: r.attachEvent && r.attachEvent('onclick', convertToString);
}
window.addEventListener
	? window.addEventListener('load', createAccountListeners, !1)
	: window.attachEvent && window.attachEvent('onload', createAccountListeners);

/* Form Functions */
// remove default values and formatting from selection lists
function removeSelectDefaults() {
	var emptyBoxes = document.querySelectorAll('select.no-default');
	for (var i = 0; i < emptyBoxes.length; i++) {
		emptyBoxes[i].selectedIndex = -1;
	}
}
// copy all input and select fields from one fieldset to another
function copyFields() {
	var copyInputElements = document.querySelectorAll('#copyFrom input');
	var pasteInputElements = document.querySelectorAll('#pasteTo input');
	if (document.getElementById('field-copy').checked) {
		for (var i = 0; i < copyInputElements.length; i++) {
			pasteInputElements[i + 1].value = copyInputElements[i].value;
		}
		document.querySelector('#pasteTo select').value =
			document.querySelector('#copyFrom select').value;
	} else {
		for (var i = 0; i < copyInputElements.length; i++) {
			pasteInputElements[i + 1].value = '';
		}
		document.querySelector('#copyFrom select').selectedIndex = 1;
	}
}
/* create event listeners */
function createEventListeners() {
	var same = document.getElementById('field-copy');
	if (same.addEventListener) {
		same.addEventListener('click', copyFields, false);
	} else if (same.attachEvent) {
		same.attachEvent('onclick', copyFields);
	}
}
/* run initial form configuration functions */
function setUpValidator() {
	removeSelectDefaults();
	createEventListeners();
}
/* run setup function when page finishes loading */
if (window.addEventListener) {
	window.addEventListener('load', setUpValidator, false);
} else if (window.attachEvent) {
	window.attachEvent('onload', setUpValidator);
}
