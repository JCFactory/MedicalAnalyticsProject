/**
 * Fastly Insights.js
 * Build generated: 2019-04-30
 * https://github.com/fastly/insights.js
 *
 * Copyright (c) 2019, Fastly, Inc. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

!function(){"use strict";function t(t,e){return e.split(".").every(function(e){return"object"===(void 0===t?"undefined":o(t))&&null!==t&&e in t&&void 0!==t[e]&&(t=t[e],!0)})}function e(){var t=document.getElementsByTagName("script")[0],e=document.createElement("script");e.src=n.build,e.onload=function(){"function"==typeof window.FASTLY.init&&window.FASTLY.init(n)},t.parentNode.insertBefore(e,t)}var n={apiKey:"6a52360a-f306-421e-8ed5-7417d0d4a4e9",session:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTUyMzYwYS1mMzA2LTQyMWUtOGVkNS03NDE3ZDBkNGE0ZTkiLCJleHAiOjE1NTY3ODA2MjUsImlhdCI6MTU1Njc4MDU2NX0.H1HZPu8sPcyjl-xIDCYMdQSejG6JyKNYcZW0TVDu6RE",settings:{"hosts": {"host": "www.fastly-insights.com","lookup": "eu.u.fastly-insights.com","pop": "pops.fastly-insights.com",},"sample":1.000},build:"https://www.fastly-insights.com/static/lib.9e97b13076eb75bda7508b2090d1d87333178223.js",server:{"datacenter": "HHN"},tasks:[{"id": "pdata","type": "fetch","host": "pdata.pops.fastly-insights.com"},{"id": "anycast","type": "fetch","host": "any-v4.pops.fastly-insights.com"},{"id": "anycast2","type": "fetch","host": "any2-v4.pops.fastly-insights.com"}],pops:['HHN', 'FRA', 'AMS', 'MXP', 'CDG', 'CPH', 'LCY', 'LHR', 'BMA', 'HEL', 'MAD', 'JFK', 'EWR', 'BOS', 'LGA', 'YUL', 'IAD', 'DCA', 'BWI', 'YYZ', 'CMH', 'ORD', 'CHI', 'MDW', 'FTY', 'PDK', 'ATL', 'MSP', 'MIA', 'FJR', 'IAH', 'DAL', 'DFW', 'DEN', 'LAX', 'BUR', 'SJC', 'PAO', 'BOM', 'SEA', 'CPT', 'YVR', 'SIN', 'MAA', 'JNB', 'GRU', 'CWB', 'GIG', 'HND', 'SCL', 'HKG', 'ITM', 'EZE', 'TYO', 'NRT', 'AKL', 'WLG', 'SYD', 'BNE', 'MEL', 'PER']},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=n.ctm=t(window,"Promise")&&t(window,"Set")&&t(window,"fetch")&&t(window,"performance.getEntries");i&&function(t){return parseFloat(Math.random().toFixed(2))<=t}(n.settings.sample)&&function(t){"complete"!==document.readyState?document.addEventListener("readystatechange",function(){"complete"===document.readyState&&t()}):t()}(function(){return setTimeout(e,n.settings.delay||0)}),window.FASTLY=window.FASTLY||{},window.FASTLY.ctm=i,window.FASTLY.config=n}();
