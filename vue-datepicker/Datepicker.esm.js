/*
* @sum.cumo/vue-datepicker v2.1.3
* (c) 2018-2020 sum.cumo GmbH
* Released under the Apache-2.0 License.
*/
class Language {
  // eslint-disable-next-line max-params
  constructor(language, months, monthsAbbr, days, rtl = false, ymd = false, yearSuffix = '') {
    this.language = language;
    this.months = months;
    this.monthsAbbr = monthsAbbr;
    this.days = days;
    this.rtl = rtl;
    this.ymd = ymd;
    this.yearSuffix = yearSuffix;
  }
  /* eslint-disable no-underscore-dangle */


  get language() {
    return this._language;
  }

  set language(language) {
    if (typeof language !== 'string') {
      throw new TypeError('Language must be a string');
    }

    this._language = language;
  }

  get months() {
    return this._months;
  }

  set months(months) {
    if (months.length !== 12) {
      throw new RangeError(`There must be 12 months for ${this.language} language`);
    }

    this._months = months;
  }

  get monthsAbbr() {
    return this._monthsAbbr;
  }

  set monthsAbbr(monthsAbbr) {
    if (monthsAbbr.length !== 12) {
      throw new RangeError(`There must be 12 abbreviated months for ${this.language} language`);
    }

    this._monthsAbbr = monthsAbbr;
  }

  get days() {
    return this._days;
  }

  set days(days) {
    if (days.length !== 7) {
      throw new RangeError(`There must be 7 days for ${this.language} language`);
    }

    this._days = days;
  }

  getDaysStartingOn(firstDayOfWeek) {
    const firstDays = this._days.slice(firstDayOfWeek);

    const lastDays = this._days.slice(0, firstDayOfWeek);

    return firstDays.concat(lastDays);
  }

  getMonthByAbbrName(name) {
    const monthValue = this._monthsAbbr.findIndex(month => month === name) + 1;
    return monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
  }

  getMonthByName(name) {
    const monthValue = this._months.findIndex(month => month === name) + 1;
    return monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
  }

}

var en = new Language('English', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

const getParsedDate = ({
  formatStr,
  dateStr,
  translation
}) => {
  const splitter = formatStr.match(/-|\/|\s|\./) || ['-'];
  const df = formatStr.split(splitter[0]);
  const ds = dateStr.split(splitter[0]);
  const ymd = [0, 0, 0];

  for (let i = 0; i < df.length; i += 1) {
    if (/yyyy/i.test(df[i])) {
      ymd[0] = ds[i];
    } else if (/mmmm/i.test(df[i])) {
      ymd[1] = translation.getMonthByName(ds[i]);
    } else if (/mmm/i.test(df[i])) {
      ymd[1] = translation.getMonthByAbbrName(ds[i]);
    } else if (/mm/i.test(df[i])) {
      ymd[1] = ds[i];
    } else if (/m/i.test(df[i])) {
      ymd[1] = ds[i];
    } else if (/dd/i.test(df[i])) {
      ymd[2] = ds[i];
    } else if (/d/i.test(df[i])) {
      const tmp = ds[i].replace(/st|rd|nd|th/g, '');
      ymd[2] = tmp < 10 ? `0${tmp}` : `${tmp}`;
    }
  }

  return ymd;
};

const utils = {
  /**
   * @type {Boolean}
   */
  useUtc: false,

  /**
   * Returns the full year, using UTC or not
   * @param {Date} date
   */
  getFullYear(date) {
    return this.useUtc ? date.getUTCFullYear() : date.getFullYear();
  },

  /**
   * Returns the month, using UTC or not
   * @param {Date} date
   */
  getMonth(date) {
    return this.useUtc ? date.getUTCMonth() : date.getMonth();
  },

  /**
   * Returns the number of days in the month, using UTC or not
   * @param {Date} date
   */
  getDaysInMonth(date) {
    return this.daysInMonth(this.getFullYear(date), this.getMonth(date));
  },

  /**
   * Returns the date, using UTC or not
   * @param {Date} date
   */
  getDate(date) {
    return this.useUtc ? date.getUTCDate() : date.getDate();
  },

  /**
   * Returns the day, using UTC or not
   * @param {Date} date
   */
  getDay(date) {
    return this.useUtc ? date.getUTCDay() : date.getDay();
  },

  /**
   * Returns the hours, using UTC or not
   * @param {Date} date
   */
  getHours(date) {
    return this.useUtc ? date.getUTCHours() : date.getHours();
  },

  /**
   * Returns the minutes, using UTC or not
   * @param {Date} date
   */
  getMinutes(date) {
    return this.useUtc ? date.getUTCMinutes() : date.getMinutes();
  },

  /**
   * Sets the full year, using UTC or not
   * @param {Date} date
   * @param {String, Number} value
   */
  setFullYear(date, value) {
    return this.useUtc ? date.setUTCFullYear(value) : date.setFullYear(value);
  },

  /**
   * Sets the month, using UTC or not
   * @param {Date} date
   * @param {String, Number} value
   */
  setMonth(date, value) {
    return this.useUtc ? date.setUTCMonth(value) : date.setMonth(value);
  },

  /**
   * Sets the date, using UTC or not
   * @param {Date} date
   * @param {String, Number} value
   */
  setDate(date, value) {
    return this.useUtc ? date.setUTCDate(value) : date.setDate(value);
  },

  /**
   * Check if date1 is equivalent to date2, without comparing the time
   * @see https://stackoverflow.com/a/6202196/4455925
   * @param {Date} date1
   * @param {Date} date2
   */
  compareDates(date1, date2) {
    const d1 = new Date(date1.valueOf());
    const d2 = new Date(date2.valueOf());
    this.resetDateTime(d1);
    this.resetDateTime(d2);
    return d1.valueOf() === d2.valueOf();
  },

  /**
   * Validates a date object
   * @param {Date} date - an object instantiated with the new Date constructor
   * @return {Boolean}
   */
  isValidDate(date) {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      return false;
    }

    return !Number.isNaN(date.valueOf());
  },

  /**
   * Return abbreviated week day name
   * @param {Date} date
   * @param {Array} days
   * @return {String}
   */
  getDayNameAbbr(date, days) {
    if (typeof date !== 'object') {
      throw TypeError('Invalid Type');
    }

    return days[this.getDay(date)];
  },

  /**
   * Return day number from abbreviated week day name
   * @param {String} abbr
   * @return {Number}
   */
  getDayFromAbbr(abbr) {
    for (let i = 0; i < en.days.length; i += 1) {
      if (abbr.toLowerCase() === en.days[i].toLowerCase()) {
        return i;
      }
    }

    throw TypeError('Invalid week day');
  },

  /**
   * Return name of the month
   * @param {Number|Date} month
   * @param {Array} months
   * @return {String}
   */
  getMonthName(month, months) {
    if (!months) {
      throw Error('missing 2nd parameter Months array');
    }

    if (typeof month === 'object') {
      return months[this.getMonth(month)];
    }

    if (typeof month === 'number') {
      return months[month];
    }

    throw TypeError('Invalid type');
  },

  /**
   * Return an abbreviated version of the month
   * @param {Number|Date} month
   * @param {Array} monthsAbbr
   * @return {String}
   */
  getMonthNameAbbr(month, monthsAbbr) {
    if (!monthsAbbr) {
      throw Error('missing 2nd paramter Months array');
    }

    if (typeof month === 'object') {
      return monthsAbbr[this.getMonth(month)];
    }

    if (typeof month === 'number') {
      return monthsAbbr[month];
    }

    throw TypeError('Invalid type');
  },

  /**
   * Alternative get total number of days in month
   * @param {Number} year
   * @param {Number} month
   * @return {Number}
   */
  // eslint-disable-next-line complexity
  daysInMonth(year, month) {
    if (/8|3|5|10/.test(month)) {
      return 30;
    }

    if (month === 1) {
      return !(year % 4) && year % 100 || !(year % 400) ? 29 : 28;
    }

    return 31;
  },

  /**
   * Get nth suffix for date
   * @param {Number} day
   * @return {String}
   */
  // eslint-disable-next-line complexity
  getNthSuffix(day) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return 'st';

      case 2:
      case 22:
        return 'nd';

      case 3:
      case 23:
        return 'rd';

      default:
        return 'th';
    }
  },

  /**
   * Formats date object
   * @param {Date} date
   * @param {String} formatStr
   * @param {Object} translation
   * @return {String}
   */
  formatDate(date, formatStr, translation) {
    const translationTemp = !translation ? en : translation;
    const year = this.getFullYear(date);
    const month = this.getMonth(date) + 1;
    const day = this.getDate(date);
    const matches = {
      dd: `0${day}`.slice(-2),
      d: day,
      yyyy: year,
      yy: String(year).slice(2),
      MMMM: this.getMonthName(this.getMonth(date), translationTemp.months),
      MMM: this.getMonthNameAbbr(this.getMonth(date), translationTemp.monthsAbbr),
      MM: `0${month}`.slice(-2),
      M: month,
      o: this.getNthSuffix(this.getDate(date)),
      E: this.getDayNameAbbr(date, translationTemp.days)
    };
    const REGEX_FORMAT = /y{4}|y{2}|M{1,4}(?![aäe])|d{1,2}|o{1}|E{1}(?![eéi])/g;
    return formatStr.replace(REGEX_FORMAT, match => matches[match] || match);
  },

  /**
   * makes date parseable
   * to use with international dates
   * @param {String} dateStr
   * @param {String|Function} formatStr
   * @param {Object} translation
   * @param {Function} parser
   * @return {Date | String}
   */
  // eslint-disable-next-line max-params,complexity,max-statements
  parseDate(dateStr, formatStr, translation, parser) {
    if (!(dateStr && formatStr)) {
      return dateStr;
    }

    if (typeof formatStr === 'function') {
      if (!parser || typeof parser !== 'function') {
        throw new Error('Parser need to be a function if you are using a custom formatter');
      }

      return parser(dateStr);
    }

    const ymd = getParsedDate({
      formatStr,
      dateStr,
      translation: !translation ? en : translation
    });
    const dat = `${ymd.join('-')}${this.getTime()}`;

    if (Number.isNaN(Date.parse(dat))) {
      return dateStr;
    }

    return dat;
  },

  getTime() {
    const time = 'T00:00:00';

    if (this.useUtc) {
      return `${time}Z`;
    }

    return time;
  },

  /**
   * Creates an array of dates for each day in between two dates.
   * @param {Date} start
   * @param {Date} end
   * @return {Array}
   */
  createDateArray(start, end) {
    const dates = [];
    let startTemp = start;

    while (startTemp <= end) {
      dates.push(new Date(startTemp));
      startTemp = this.setDate(new Date(startTemp), this.getDate(new Date(startTemp)) + 1);
    }

    return dates;
  },

  /**
   * Remove hours/minutes/seconds/milliseconds from a date object
   * @param {Date} date
   * @return {Date}
   */
  resetDateTime(date) {
    return new Date(this.useUtc ? date.setUTCHours(0, 0, 0, 0) : date.setHours(0, 0, 0, 0));
  },

  /**
   * Return a new date object with hours/minutes/seconds/milliseconds removed
   * @return {Date}
   */
  getNewDateObject(date) {
    return date ? this.resetDateTime(new Date(date)) : this.resetDateTime(new Date());
  }

};
const makeDateUtils = useUtc => ({ ...utils,
  useUtc
});

var calendarSlots = ['beforeCalendarHeaderDay', 'calendarFooterDay', 'beforeCalendarHeaderMonth', 'calendarFooterMonth', 'beforeCalendarHeaderYear', 'calendarFooterYear', 'nextIntervalBtn', 'prevIntervalBtn'];

var script = {
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    bootstrapStyling: {
      type: Boolean,
      default: false
    },
    clearButton: {
      type: Boolean,
      default: false
    },
    clearButtonIcon: {
      type: String,
      default: ''
    },
    calendarButton: {
      type: Boolean,
      default: false
    },
    calendarButtonIcon: {
      type: String,
      default: ''
    },
    calendarButtonIconContent: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    format: {
      type: [String, Function],
      default: 'dd MMM yyyy'
    },
    id: {
      type: String,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: [String, Object, Array],
      default: null
    },
    maxlength: {
      type: [Number, String],
      default: null
    },
    name: {
      type: String,
      default: null
    },
    openDate: {
      type: [String, Date, Number],
      default: null,
      validator: val => val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number'
    },
    parser: {
      type: Function,
      default: null
    },
    pattern: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    refName: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    showCalendarOnButtonClick: {
      type: Boolean,
      default: false
    },
    showCalendarOnFocus: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: [Number, String],
      default: null
    },
    typeable: {
      type: Boolean,
      default: false
    },
    useUtc: {
      type: Boolean,
      default: false
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$1 = {
  name: 'DateInput',
  mixins: [__vue_component__],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    resetTypedDate: {
      type: [Date],
      default: null
    },
    selectedDate: {
      type: Date,
      default: null
    },
    translation: {
      type: Object,

      default() {
        return {};
      }

    }
  },

  data() {
    const constructedDateUtils = makeDateUtils(this.useUtc);
    return {
      input: null,
      typedDate: '',
      utils: constructedDateUtils
    };
  },

  computed: {
    computedInputClass() {
      if (this.bootstrapStyling) {
        if (typeof this.inputClass === 'string') {
          return [this.inputClass, 'form-control'].join(' ');
        }

        return {
          'form-control': true,
          ...this.inputClass
        };
      }

      return this.inputClass;
    },

    formattedValue() {
      if (!this.selectedDate) {
        return null;
      }

      if (this.typedDate.length) {
        return this.typedDate;
      }

      return this.formattedDate;
    },

    formattedDate() {
      return typeof this.format === 'function' ? this.format(new Date(this.selectedDate)) : this.utils.formatDate(new Date(this.selectedDate), this.format, this.translation);
    }

  },
  watch: {
    resetTypedDate() {
      this.typedDate = '';
    }

  },

  mounted() {
    this.input = this.$el.querySelector('input');
  },

  methods: {
    /**
     * emit a clearDate event
     */
    clearDate() {
      this.$emit('clear-date');
    },

    /**
     * Submits a typed date if it's valid
     */
    inputBlurred() {
      if (this.typeable) {
        const parsableDate = this.parseDate(this.input.value);
        const parsedDate = Date.parse(parsableDate);

        if (Number.isNaN(parsedDate)) {
          this.clearDate();
        } else {
          this.input.value = this.formattedDate;
          this.typedDate = '';
          this.$emit('typed-date', parsedDate);
        }
      }

      this.$emit('blur');
      this.$emit('close-calendar');
    },

    /**
     * Attempt to parse a typed date
     * @param {Event} event
     */
    parseTypedDate(event) {
      const code = event.keyCode ? event.keyCode : event.which; // close calendar if escape or enter are pressed

      if ([27, // escape
      13 // enter
      ].indexOf(code) !== -1) {
        this.input.blur();
      }

      if (this.typeable) {
        const parsableDate = this.parseDate(this.input.value);
        const parsedDate = Date.parse(parsableDate);

        if (!Number.isNaN(parsedDate)) {
          this.typedDate = this.input.value;
          this.$emit('typed-date', new Date(parsedDate));
        }
      }
    },

    parseDate(value) {
      return this.utils.parseDate(value, this.format, this.translation, this.parser);
    },

    toggleCalendar() {
      this.$emit(this.isOpen ? 'close-calendar' : 'show-calendar');
    },

    showCalendarByClick() {
      if (!this.showCalendarOnButtonClick) {
        this.toggleCalendar();
      }
    },

    showCalendarByFocus() {
      if (this.showCalendarOnFocus) {
        this.$emit('show-calendar');
      }

      this.$emit('focus');
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: { "input-group": _vm.bootstrapStyling } },
    [
      _vm._t("beforeDateInput"),
      _vm._v(" "),
      _vm.calendarButton
        ? _c(
            "span",
            {
              staticClass: "vdp-datepicker__calendar-button",
              class: {
                "input-group-prepend": _vm.bootstrapStyling,
                "calendar-btn-disabled": _vm.disabled
              },
              on: { click: _vm.toggleCalendar }
            },
            [
              _c(
                "span",
                { class: { "input-group-text": _vm.bootstrapStyling } },
                [
                  _c("i", { class: _vm.calendarButtonIcon }, [
                    _vm._v(
                      "\n        " +
                        _vm._s(_vm.calendarButtonIconContent) +
                        "\n        "
                    ),
                    !_vm.calendarButtonIcon
                      ? _c("span", [_vm._v("…")])
                      : _vm._e()
                  ])
                ]
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("input", {
        ref: _vm.refName,
        class: _vm.computedInputClass,
        attrs: {
          id: _vm.id,
          autocomplete: "off",
          autofocus: _vm.autofocus,
          "clear-button": _vm.clearButton,
          disabled: _vm.disabled,
          maxlength: _vm.maxlength,
          name: _vm.name,
          pattern: _vm.pattern,
          placeholder: _vm.placeholder,
          readonly: !_vm.typeable,
          required: _vm.required,
          tabindex: _vm.tabindex,
          type: _vm.inline ? "hidden" : "text"
        },
        domProps: { value: _vm.formattedValue },
        on: {
          blur: _vm.inputBlurred,
          click: _vm.showCalendarByClick,
          focus: _vm.showCalendarByFocus,
          keyup: _vm.parseTypedDate
        }
      }),
      _vm._v(" "),
      _vm.clearButton && _vm.selectedDate
        ? _c(
            "span",
            {
              staticClass: "vdp-datepicker__clear-button",
              class: { "input-group-append": _vm.bootstrapStyling },
              on: {
                click: function($event) {
                  return _vm.clearDate()
                }
              }
            },
            [
              _c(
                "span",
                { class: { "input-group-text": _vm.bootstrapStyling } },
                [
                  _c("i", { class: _vm.clearButtonIcon }, [
                    !_vm.clearButtonIcon ? _c("span", [_vm._v("×")]) : _vm._e()
                  ])
                ]
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._t("afterDateInput")
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$2 = {
  name: 'PickerHeader',
  props: {
    config: {
      type: Object,

      default() {
        return {
          showHeader: true,
          isRtl: false,
          isNextDisabled: false,
          isPreviousDisabled: false
        };
      }

    },
    next: {
      type: Function,
      required: true
    },
    previous: {
      type: Function,
      required: true
    }
  },
  computed: {
    /**
     * Is the left hand navigation button disabled?
     * @return {Boolean}
     */
    isLeftNavDisabled() {
      return this.config.isRtl ? this.config.isNextDisabled : this.config.isPreviousDisabled;
    },

    /**
     * Is the right hand navigation button disabled?
     * @return {Boolean}
     */
    isRightNavDisabled() {
      return this.config.isRtl ? this.config.isPreviousDisabled : this.config.isNextDisabled;
    }

  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.config.showHeader
    ? _c(
        "header",
        [
          _c(
            "span",
            {
              staticClass: "prev",
              class: { disabled: _vm.isLeftNavDisabled },
              on: {
                click: function($event) {
                  _vm.config.isRtl ? _vm.next() : _vm.previous();
                }
              }
            },
            [
              _vm._t("prevIntervalBtn", [
                _c("span", { staticClass: "default" }, [_vm._v("<")])
              ])
            ],
            2
          ),
          _vm._v(" "),
          _vm._t("default"),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "next",
              class: { disabled: _vm.isRightNavDisabled },
              on: {
                click: function($event) {
                  _vm.config.isRtl ? _vm.previous() : _vm.next();
                }
              }
            },
            [
              _vm._t("nextIntervalBtn", [
                _c("span", { staticClass: "default" }, [_vm._v(">")])
              ])
            ],
            2
          )
        ],
        2
      )
    : _vm._e()
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

var script$3 = {
  components: {
    PickerHeader: __vue_component__$2
  },
  inheritAttrs: false,
  props: {
    allowedToShowView: {
      type: Function,

      default() {}

    },
    disabledDates: {
      type: Object,

      default() {
        return {};
      }

    },
    isRtl: {
      type: Boolean,
      default: false
    },
    pageDate: {
      type: Date,
      default: null
    },
    pageTimestamp: {
      type: Number,
      default: 0
    },
    selectedDate: {
      type: Date,
      default: null
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    translation: {
      type: Object,

      default() {
        return {};
      }

    },
    useUtc: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      headerConfig: {
        showHeader: this.showHeader,
        isRtl: this.isRtl,

        /**
         * Need to be set inside the different pickers for month, year, decade
         */
        isNextDisabled: this.isNextDisabled,
        isPreviousDisabled: this.isPreviousDisabled
      },
      utils: makeDateUtils(this.useUtc)
    };
  },

  methods: {
    /**
     * Emit an event to show the month picker
     */
    showPickerCalendar(type) {
      this.$emit(`show-${type}-calendar`);
    }

  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

const checkForDisabledTo = disabledDates => {
  return typeof disabledDates.to !== 'undefined' && disabledDates.to;
};

const checkForDisabledFrom = disabledDates => {
  return typeof disabledDates.from !== 'undefined' && disabledDates.from;
};

const checkDateSpecific = (date, disabledDates, utils) => {
  const hasDates = typeof disabledDates.dates !== 'undefined' && disabledDates.dates.length;

  if (!hasDates) {
    return false;
  }

  const {
    dates
  } = disabledDates;

  for (let i = 0; i < dates.length; i += 1) {
    if (utils.compareDates(date, dates[i])) {
      return true;
    }
  }

  return false;
}; // eslint-disable-next-line complexity


const checkDateDisabledFromTo = (date, disabledDates) => {
  const isDisabledTo = checkForDisabledTo(disabledDates) && date < disabledDates.to;
  const isDisabledFrom = checkForDisabledFrom(disabledDates) && date > disabledDates.from;
  return isDisabledTo || isDisabledFrom;
}; // eslint-disable-next-line complexity,max-statements


const checkDateRange = (date, disabledDates) => {
  const hasRange = typeof disabledDates.ranges !== 'undefined' && disabledDates.ranges.length;

  if (!hasRange) {
    return false;
  }

  const {
    ranges
  } = disabledDates;

  for (let i = 0; i < ranges.length; i += 1) {
    const range = ranges[i];
    const hasFrom = checkForDisabledFrom(range);
    const hasTo = checkForDisabledTo(range);

    if (hasFrom && hasTo && date < range.to && date > range.from) {
      return true;
    }
  }

  return false;
};
/**
 * Checks if the given date should be disabled according to the specified config
 * @param {Date} date
 * @param {Object} disabledDates
 * @param {DateUtils} utils
 * @return {Boolean}
 */
// eslint-disable-next-line complexity


const isDateDisabled = (date, disabledDates, utils) => {
  // skip if no config
  if (typeof disabledDates === 'undefined') {
    return false;
  }

  const hasDisabledDays = typeof disabledDates.days !== 'undefined' && disabledDates.days.indexOf(utils.getDay(date)) !== -1;
  const hasDisabledDates = typeof disabledDates.daysOfMonth !== 'undefined' && disabledDates.daysOfMonth.indexOf(utils.getDate(date)) !== -1;
  const hasCustomPredictor = typeof disabledDates.customPredictor === 'function' && disabledDates.customPredictor(date); // check specific dates && heck date ranges

  return !!(checkDateSpecific(date, disabledDates, utils) || checkDateDisabledFromTo(date, disabledDates) || checkDateRange(date, disabledDates) || hasDisabledDays || hasDisabledDates || hasCustomPredictor);
};
/**
 * Checks if the given month should be disabled according to the specified config
 * @param {Date} date
 * @param {Object} disabledDates
 * @param {DateUtils} utils
 * @return {Boolean}
 */
// eslint-disable-next-line complexity,max-statements

const isMonthDisabled = (date, disabledDates, utils) => {
  // skip if no config
  if (typeof disabledDates === 'undefined') {
    return false;
  }

  const hasTo = typeof disabledDates.to !== 'undefined' && disabledDates.to;
  const hasFrom = typeof disabledDates.from !== 'undefined' && disabledDates.from;
  const isPastSameYearAndPastMonth = hasTo && utils.getMonth(date) < utils.getMonth(disabledDates.to) && utils.getFullYear(date) <= utils.getFullYear(disabledDates.to);
  const isInPastYear = hasTo && utils.getFullYear(date) < utils.getFullYear(disabledDates.to);
  const isFutureSameYearAndFutureMonth = hasFrom && utils.getMonth(date) > utils.getMonth(disabledDates.from) && utils.getFullYear(date) >= utils.getFullYear(disabledDates.from);
  const isInFutureYear = hasFrom && utils.getFullYear(date) > utils.getFullYear(disabledDates.from); // check if the whole month is disabled before checking every individual days

  if (checkForDisabledTo(disabledDates) && isPastSameYearAndPastMonth || isInPastYear || checkForDisabledFrom(disabledDates) && isFutureSameYearAndFutureMonth && isInFutureYear) {
    return true;
  } // now we have to check every days of the month


  const daysInMonth = utils.daysInMonth(utils.getFullYear(date), utils.getMonth(date));

  for (let j = 1; j <= daysInMonth; j += 1) {
    const dayDate = new Date(date);
    dayDate.setDate(j); // if at least one day of this month is NOT disabled,
    // we can conclude that this month SHOULD be selectable

    if (!isDateDisabled(dayDate, disabledDates, utils)) {
      return false;
    }
  }

  return true;
};
/**
 * Checks if the given year should be disabled according to the specified config
 * @param {Date} date
 * @param {Object} disabledDates
 * @param {DateUtils} utils
 * @return {Boolean}
 */
// eslint-disable-next-line complexity,max-statements

const isYearDisabled = (date, disabledDates, utils) => {
  // skip if no config
  if (typeof disabledDates === 'undefined' || !disabledDates) {
    return false;
  }

  const isDisabledTo = checkForDisabledTo(disabledDates) && utils.getFullYear(date) < utils.getFullYear(disabledDates.to);
  const isDisabledFrom = checkForDisabledFrom(disabledDates) && utils.getFullYear(date) > utils.getFullYear(disabledDates.from); // check if the whole year is disabled before checking every individual months

  if (isDisabledTo || isDisabledFrom) {
    return true;
  } // now we have to check every months of the year


  for (let j = 0; j < 12; j += 1) {
    const monthDate = new Date(date);
    monthDate.setMonth(j); // if at least one month of this year is NOT disabled,
    // we can conclude that this year SHOULD be selectable

    if (!isMonthDisabled(monthDate, disabledDates, utils)) {
      return false;
    }
  }

  return true;
};

//
var script$4 = {
  name: 'DatepickerDayView',
  mixins: [__vue_component__$3],
  props: {
    dayCellContent: {
      type: Function,
      default: day => day.date
    },
    highlighted: {
      type: Object,

      default() {
        return {};
      }

    },
    firstDayOfWeek: {
      type: String,
      default: 'sun'
    },
    showFullMonthName: {
      type: Boolean,
      default: false
    },
    showEdgeDates: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    /**
     * Gets the name of the month the current page is on
     * @return {String}
     */
    currMonthName() {
      const monthName = this.showFullMonthName ? this.translation.months : this.translation.monthsAbbr;
      return this.utils.getMonthNameAbbr(this.utils.getMonth(this.pageDate), monthName);
    },

    /**
     * Gets the name of the year that current page is on
     * @return {Number}
     */
    currYearName() {
      const {
        yearSuffix
      } = this.translation;
      return `${this.utils.getFullYear(this.pageDate)}${yearSuffix}`;
    },

    /**
     * Sets an array with all days to show this month
     * @return {Array}
     */
    days() {
      const days = [];
      const daysInCalendar = this.daysFromPrevMonth + this.daysInMonth + this.daysFromNextMonth;
      const firstOfMonth = this.newPageDate();
      const dObj = new Date(firstOfMonth.setDate(firstOfMonth.getDate() - this.daysFromPrevMonth));

      for (let i = 0; i < daysInCalendar; i += 1) {
        days.push(this.makeDay(i, dObj));
        this.utils.setDate(dObj, this.utils.getDate(dObj) + 1);
      }

      return days;
    },

    /**
     * Returns an array of day names
     * @return {String[]}
     */
    daysOfWeek() {
      return this.translation.getDaysStartingOn(this.firstDayOfWeekNumber);
    },

    /**
     * Returns the number of days in this month
     * @return {String[]}
     */
    daysInMonth() {
      const dObj = this.newPageDate();
      return this.utils.getDaysInMonth(dObj);
    },

    /**
     * Calculates how many days to show from the previous month
     * @return {number}
     */
    daysFromPrevMonth() {
      const dObj = this.newPageDate();
      return (7 - this.firstDayOfWeekNumber + this.utils.getDay(dObj)) % 7;
    },

    /**
     * Calculates how many days to show from the next month
     * @return {number}
     */
    daysFromNextMonth() {
      const daysThisAndPrevMonth = this.daysFromPrevMonth + this.daysInMonth;
      return Math.ceil(daysThisAndPrevMonth / 7) * 7 - daysThisAndPrevMonth;
    },

    /**
     * Returns first-day-of-week as a number (Sunday is 0)
     * @return {Number}
     */
    firstDayOfWeekNumber() {
      return this.utils.getDayFromAbbr(this.firstDayOfWeek);
    },

    /**
     * Is the next month disabled?
     * @return {Boolean}
     */
    isNextDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false;
      }

      const d = this.pageDate;
      return this.utils.getMonth(this.disabledDates.from) <= this.utils.getMonth(d) && this.utils.getFullYear(this.disabledDates.from) <= this.utils.getFullYear(d);
    },

    /**
     * Is the previous month disabled?
     * @return {Boolean}
     */
    isPreviousDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false;
      }

      const d = this.pageDate;
      return this.utils.getMonth(this.disabledDates.to) >= this.utils.getMonth(d) && this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(d);
    },

    /**
     * Is this translation using year/month/day format?
     * @return {Boolean}
     */
    isYmd() {
      return this.translation.ymd && this.translation.ymd === true;
    },

    nextPageDate() {
      const d = new Date(this.pageTimestamp);
      return new Date(this.utils.setMonth(d, this.utils.getMonth(d) + 1));
    }

  },
  methods: {
    /**
     * Change the page month
     * @param {Number} incrementBy
     */
    changeMonth(incrementBy) {
      const date = this.pageDate;
      this.utils.setMonth(date, this.utils.getMonth(date) + incrementBy);
      this.$emit('changed-month', date);
    },

    /**
     * set the class for a specific day
     * @param {Object} day
     * @return {Object}
     */
    dayClasses(day) {
      return {
        'selected': day.isSelected,
        'disabled': day.isDisabled,
        'highlighted': day.isHighlighted,
        'muted': day.isPreviousMonth || day.isNextMonth,
        'today': day.isToday,
        'weekend': day.isWeekend,
        'sat': day.isSaturday,
        'sun': day.isSunday,
        'highlight-start': day.isHighlightStart,
        'highlight-end': day.isHighlightEnd
      };
    },

    /**
     * @return {Number}
     */
    getPageMonth() {
      return this.utils.getMonth(this.pageDate);
    },

    /**
     * Whether a day is disabled
     * @param {Date} date to check if disabled
     * @return {Boolean}
     */
    isDisabledDate(date) {
      return isDateDisabled(date, this.disabledDates, this.utils);
    },

    /**
     * Whether a day is highlighted
     * (only if it is not disabled already except when highlighted.includeDisabled is true)
     * @param {Date} date to check if highlighted
     * @return {Boolean}
     */
    // eslint-disable-next-line complexity,max-statements
    isHighlightedDate(date) {
      let highlighted = false;
      const dateWithoutTime = this.utils.resetDateTime(date);

      if (typeof this.highlighted === 'undefined' || !(this.highlighted && this.highlighted.includeDisabled) && this.isDisabledDate(dateWithoutTime)) {
        return false;
      }

      if (typeof this.highlighted.dates !== 'undefined') {
        this.highlighted.dates.forEach(d => {
          if (this.utils.compareDates(dateWithoutTime, d)) {
            highlighted = true;
          }
        });
      }

      const hasHighlightedTo = typeof this.highlighted.to !== 'undefined' && dateWithoutTime <= this.highlighted.to;
      const hasHighlightedFrom = typeof this.highlighted.from !== 'undefined' && dateWithoutTime >= this.highlighted.from;
      const hasHighlightedDays = typeof this.highlighted.days !== 'undefined' && this.highlighted.days.indexOf(this.utils.getDay(dateWithoutTime)) !== -1;
      const hasHighlightedDaysOfMonth = typeof this.highlighted.daysOfMonth !== 'undefined' && this.highlighted.daysOfMonth.indexOf(this.utils.getDate(dateWithoutTime)) !== -1;
      const hasCustomPredictor = typeof this.highlighted.customPredictor === 'function' && this.highlighted.customPredictor(dateWithoutTime);

      if (hasHighlightedDays || hasHighlightedDaysOfMonth || hasCustomPredictor || hasHighlightedTo && hasHighlightedFrom) {
        highlighted = true;
      }

      return highlighted;
    },

    /**
     * Whether a day is highlighted and it is the last date
     * in the highlighted range of dates
     * @param {Date} date end highlight
     * @return {Boolean}
     */
    isHighlightEnd(date) {
      return this.isHighlightedDate(date) && this.highlighted.to instanceof Date && this.utils.getFullYear(this.highlighted.to) === this.utils.getFullYear(date) && this.utils.getMonth(this.highlighted.to) === this.utils.getMonth(date) && this.utils.getDate(this.highlighted.to) === this.utils.getDate(date);
    },

    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date} date start highlight
     * @return {Boolean}
     */
    isHighlightStart(date) {
      return this.isHighlightedDate(date) && this.highlighted.from instanceof Date && this.utils.getFullYear(this.highlighted.from) === this.utils.getFullYear(date) && this.utils.getMonth(this.highlighted.from) === this.utils.getMonth(date) && this.utils.getDate(this.highlighted.from) === this.utils.getDate(date);
    },

    /**
     * Whether a day is selected
     * @param {Date} dObj to check if selected
     * @return {Boolean}
     */
    isSelectedDate(dObj) {
      return this.selectedDate && this.utils.compareDates(this.selectedDate, dObj);
    },

    /**
     * Defines the objects within the days array
     * @param  {id}  id
     * @param  {Date}  dObj
     * @return {Object}
     */
    // eslint-disable-next-line complexity
    makeDay(id, dObj) {
      const isNextMonth = dObj >= this.nextPageDate;
      const isPreviousMonth = dObj < this.pageDate;
      const isSaturday = this.utils.getDay(dObj) === 6;
      const isSunday = this.utils.getDay(dObj) === 0;
      const showDate = this.showEdgeDates || !(isPreviousMonth || isNextMonth);
      return {
        date: showDate ? this.utils.getDate(dObj) : '',
        timestamp: dObj.valueOf(),
        isSelected: this.isSelectedDate(dObj),
        isDisabled: showDate ? this.isDisabledDate(dObj) : true,
        isHighlighted: this.isHighlightedDate(dObj),
        isHighlightStart: this.isHighlightStart(dObj),
        isHighlightEnd: this.isHighlightEnd(dObj),
        isToday: this.utils.compareDates(dObj, new Date()),
        isWeekend: isSaturday || isSunday,
        isSaturday,
        isSunday,
        isPreviousMonth,
        isNextMonth
      };
    },

    /**
     * Set up a new date object to the first day of the current 'page'
     * @return Date
     */
    newPageDate() {
      const d = this.pageDate;
      return this.useUtc ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)) : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
    },

    /**
     * Increment the current page month
     */
    nextMonth() {
      if (!this.isNextDisabled) {
        this.changeMonth(+1);
      }
    },

    /**
     * Decrement the page month
     */
    previousMonth() {
      if (!this.isPreviousDisabled) {
        this.changeMonth(-1);
      }
    },

    /**
     * Emits a selectDate event
     * @param {Object} date
     */
    selectDate(date) {
      if (date.isDisabled) {
        this.$emit('selected-disabled', date);
      } else {
        this.$emit('select-date', date);
      }
    }

  }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "picker-view" },
    [
      _vm._t("beforeCalendarHeaderDay"),
      _vm._v(" "),
      _c(
        "PickerHeader",
        {
          attrs: {
            config: _vm.headerConfig,
            next: _vm.nextMonth,
            previous: _vm.previousMonth
          }
        },
        [
          _c(
            "span",
            {
              staticClass: "day__month_btn",
              class: _vm.allowedToShowView("month") ? "up" : "",
              on: {
                click: function($event) {
                  return _vm.showPickerCalendar("month")
                }
              }
            },
            [
              _vm._v(
                "\n      " +
                  _vm._s(_vm.isYmd ? _vm.currYearName : _vm.currMonthName) +
                  "\n      " +
                  _vm._s(_vm.isYmd ? _vm.currMonthName : _vm.currYearName) +
                  "\n    "
              )
            ]
          ),
          _vm._v(" "),
          _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
          _vm._v(" "),
          _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.isRtl ? "flex-rtl" : "" },
        [
          _vm._l(_vm.daysOfWeek, function(d) {
            return _c(
              "span",
              { key: d.timestamp, staticClass: "cell day-header" },
              [_vm._v("\n      " + _vm._s(d) + "\n    ")]
            )
          }),
          _vm._v(" "),
          _vm._l(_vm.days, function(day) {
            return _c(
              "span",
              {
                key: day.timestamp,
                staticClass: "cell day",
                class: _vm.dayClasses(day),
                on: {
                  click: function($event) {
                    return _vm.selectDate(day)
                  }
                }
              },
              [_vm._v("\n      " + _vm._s(_vm.dayCellContent(day)) + "\n    ")]
            )
          })
        ],
        2
      ),
      _vm._v(" "),
      _vm._t("calendarFooterDay")
    ],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$5 = {
  name: 'DatepickerMonthView',
  mixins: [__vue_component__$3],
  computed: {
    /**
     * Checks if the next year is disabled or not
     * @return {Boolean}
     */
    isNextDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false;
      }

      return this.utils.getFullYear(this.disabledDates.from) <= this.utils.getFullYear(this.pageDate);
    },

    /**
     * Checks if the previous year is disabled or not
     * @return {Boolean}
     */
    isPreviousDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false;
      }

      return this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(this.pageDate);
    },

    /**
     * Set an array with all months
     * @return {Array}
     */
    months() {
      const d = this.pageDate;
      const months = []; // set up a new date object to the beginning of the current 'page'

      const dObj = this.useUtc ? new Date(Date.UTC(d.getUTCFullYear(), 0, d.getUTCDate())) : new Date(d.getFullYear(), 0, d.getDate(), d.getHours(), d.getMinutes());

      for (let i = 0; i < 12; i += 1) {
        months.push({
          month: this.utils.getMonthName(i, this.translation.months),
          timestamp: dObj.valueOf(),
          isSelected: this.isSelectedMonth(dObj),
          isDisabled: this.isDisabledMonth(dObj)
        });
        this.utils.setMonth(dObj, this.utils.getMonth(dObj) + 1);
      }

      return months;
    },

    /**
     * Get year name on current page.
     * @return {String}
     */
    pageYearName() {
      const {
        yearSuffix
      } = this.translation;
      return `${this.utils.getFullYear(this.pageDate)}${yearSuffix}`;
    }

  },
  methods: {
    /**
     * Changes the year up or down
     * @param {Number} incrementBy
     */
    changeYear(incrementBy) {
      const date = this.pageDate;
      this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
      this.$emit('changed-year', date);
    },

    /**
     * Whether a month is disabled
     * @param {Date} date
     * @return {Boolean}
     */
    isDisabledMonth(date) {
      return isMonthDisabled(date, this.disabledDates, this.utils);
    },

    /**
     * Whether the selected date is in this month
     * @param {Date} date
     * @return {Boolean}
     */
    isSelectedMonth(date) {
      return this.selectedDate && this.utils.getFullYear(this.selectedDate) === this.utils.getFullYear(date) && this.utils.getMonth(this.selectedDate) === this.utils.getMonth(date);
    },

    /**
     * Increments the year
     */
    nextYear() {
      if (!this.isNextDisabled) {
        this.changeYear(1);
      }
    },

    /**
     * Decrements the year
     */
    previousYear() {
      if (!this.isPreviousDisabled) {
        this.changeYear(-1);
      }
    },

    /**
     * Emits a selectMonth event
     * @param {Object} month
     */
    selectMonth(month) {
      if (!month.isDisabled) {
        this.$emit('select-month', month);
      }
    }

  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "picker-view" },
    [
      _vm._t("beforeCalendarHeaderMonth"),
      _vm._v(" "),
      _c(
        "PickerHeader",
        {
          attrs: {
            config: _vm.headerConfig,
            next: _vm.nextYear,
            previous: _vm.previousYear
          }
        },
        [
          _c(
            "span",
            {
              staticClass: "month__year_btn",
              class: _vm.allowedToShowView("year") ? "up" : "",
              on: {
                click: function($event) {
                  return _vm.showPickerCalendar("year")
                }
              }
            },
            [_vm._v("\n      " + _vm._s(_vm.pageYearName) + "\n    ")]
          ),
          _vm._v(" "),
          _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
          _vm._v(" "),
          _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
        ],
        2
      ),
      _vm._v(" "),
      _vm._l(_vm.months, function(month) {
        return _c(
          "span",
          {
            key: month.timestamp,
            staticClass: "cell month",
            class: { selected: month.isSelected, disabled: month.isDisabled },
            on: {
              click: function($event) {
                $event.stopPropagation();
                return _vm.selectMonth(month)
              }
            }
          },
          [_vm._v("\n    " + _vm._s(month.month) + "\n  ")]
        )
      }),
      _vm._v(" "),
      _vm._t("calendarFooterMonth")
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$6 = {
  name: 'DatepickerYearView',
  mixins: [__vue_component__$3],
  props: {
    yearRange: {
      type: Number,
      default: 10
    }
  },
  computed: {
    /**
     * Checks if the next decade is disabled or not
     * @return {Boolean}
     */
    isNextDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false;
      }

      const yearFrom = this.utils.getFullYear(this.disabledDates.from);
      const lastCellYear = this.years[this.years.length - 1].year;
      return yearFrom <= lastCellYear;
    },

    /**
     * Checks if the previous decade is disabled or not
     * @return {Boolean}
     */
    isPreviousDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false;
      }

      const yearTo = this.utils.getFullYear(this.disabledDates.to);
      const yearPageDate = this.utils.getFullYear(this.pageDate);
      return Math.floor(yearTo / this.yearRange) * this.yearRange >= Math.floor(yearPageDate / this.yearRange) * this.yearRange;
    },

    /**
     * Get decade name on current page.
     * @return {String}
     */
    getPageDecade() {
      const yearPageDate = this.utils.getFullYear(this.pageDate);
      const decadeStart = Math.floor(yearPageDate / this.yearRange) * this.yearRange;
      const decadeEnd = decadeStart + (this.yearRange - 1);
      const {
        yearSuffix
      } = this.translation;
      return `${decadeStart} - ${decadeEnd}${yearSuffix}`;
    },

    /**
     * Set an array with years for a decade
     * @return {Array}
     */
    years() {
      const d = this.pageDate;
      const years = [];
      const year = this.useUtc ? Math.floor(d.getUTCFullYear() / this.yearRange) * this.yearRange : Math.floor(d.getFullYear() / this.yearRange) * this.yearRange; // set up a new date object to the beginning of the current 'page'7

      const dObj = this.useUtc ? new Date(Date.UTC(year, d.getUTCMonth(), d.getUTCDate())) : new Date(year, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());

      for (let i = 0; i < this.yearRange; i += 1) {
        years.push({
          year: this.utils.getFullYear(dObj),
          timestamp: dObj.valueOf(),
          isSelected: this.isSelectedYear(dObj),
          isDisabled: this.isDisabledYear(dObj)
        });
        this.utils.setFullYear(dObj, this.utils.getFullYear(dObj) + 1);
      }

      return years;
    }

  },
  methods: {
    /**
     * Changes the year up or down
     * @param {Number} incrementBy
     */
    changeYear(incrementBy) {
      const date = this.pageDate;
      this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
      this.$emit('changed-decade', date);
    },

    /**
     * Whether a year is disabled
     * @param {Date} date
     * @return {Boolean}
     */
    isDisabledYear(date) {
      return isYearDisabled(date, this.disabledDates, this.utils);
    },

    /**
     * Whether the selected date is in this year
     * @param {Date} date
     * @return {Boolean}
     */
    isSelectedYear(date) {
      return this.selectedDate && this.utils.getFullYear(this.selectedDate) === this.utils.getFullYear(date);
    },

    /**
     * Increments the decade
     */
    nextDecade() {
      if (!this.isNextDisabled) {
        this.changeYear(this.yearRange);
      }
    },

    /**
     * Decrements the decade
     */
    previousDecade() {
      if (!this.isPreviousDisabled) {
        this.changeYear(-this.yearRange);
      }
    },

    /**
     * Emits a selectYear event
     * @param {Object} year
     */
    selectYear(year) {
      if (!year.isDisabled) {
        this.$emit('select-year', year);
      }
    }

  }
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "picker-view" },
    [
      _vm._t("beforeCalendarHeaderYear"),
      _vm._v(" "),
      _c(
        "PickerHeader",
        {
          attrs: {
            config: _vm.headerConfig,
            next: _vm.nextDecade,
            previous: _vm.previousDecade
          }
        },
        [
          _c("span", [
            _vm._v("\n      " + _vm._s(_vm.getPageDecade) + "\n    ")
          ]),
          _vm._v(" "),
          _vm._t("nextIntervalBtn", null, { slot: "nextIntervalBtn" }),
          _vm._v(" "),
          _vm._t("prevIntervalBtn", null, { slot: "prevIntervalBtn" })
        ],
        2
      ),
      _vm._v(" "),
      _vm._l(_vm.years, function(year) {
        return _c(
          "span",
          {
            key: year.timestamp,
            staticClass: "cell year",
            class: { selected: year.isSelected, disabled: year.isDisabled },
            on: {
              click: function($event) {
                $event.stopPropagation();
                return _vm.selectYear(year)
              }
            }
          },
          [_vm._v("\n    " + _vm._s(year.year) + "\n  ")]
        )
      }),
      _vm._v(" "),
      _vm._t("calendarFooterYear")
    ],
    2
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

/* eslint no-param-reassign: 0 */

/**
 * get the hidden element width, height
 * @param {HTMLElement} element dom
 */
function getPopupElementSize(element) {
  const originalDisplay = element.style.display;
  const originalVisibility = element.style.visibility;
  element.style.display = 'block';
  element.style.visibility = 'hidden';
  const styles = window.getComputedStyle(element);
  const width = element.offsetWidth + parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10);
  const height = element.offsetHeight + parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
  element.style.display = originalDisplay;
  element.style.visibility = originalVisibility;
  return {
    width,
    height
  };
}
/**
 * get the popup position
 * @param {Element} el element
 * @param {Element} elRelative relative element
 * @param {Number} targetWidth target element's width
 * @param {Number} targetHeight target element's height
 * @param {Boolean} appendToBody
 * @param {String} fixedPosition
 * @param {Boolean} rtl
 */
// eslint-disable-next-line complexity,max-statements

function getRelativePosition({
  el,
  elRelative,
  targetWidth,
  targetHeight,
  appendToBody,
  fixedPosition,
  rtl
}) {
  let left = 0;
  let top = 0;
  let offsetX = 0;
  let offsetY = 0;
  const relativeRect = elRelative.getBoundingClientRect();
  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;

  if (appendToBody) {
    offsetX = window.pageXOffset + relativeRect.left;
    offsetY = window.pageYOffset + relativeRect.top;
  }

  const calendarBounding = el.getBoundingClientRect();
  const outOfBoundsRight = calendarBounding.right > window.innerWidth;
  const outOfBoundsBottom = calendarBounding.bottom > window.innerHeight;
  const fixedPositionRight = fixedPosition && fixedPosition.indexOf('right') !== -1;
  const fixedPositionTop = fixedPosition && fixedPosition.indexOf('top') !== -1;

  const setLeft = () => {
    left = offsetX;
  };

  const setRight = () => {
    left = offsetX + relativeRect.width - targetWidth;
  };

  const setBottom = () => {
    top = offsetY + relativeRect.height;
  };

  const setTop = () => {
    top = offsetY - targetHeight;
  };

  if (fixedPosition === '') {
    if (outOfBoundsRight || rtl) {
      setRight();
    } else {
      setLeft();
    }

    if (outOfBoundsBottom) {
      setTop();
    } else {
      setBottom();
    }

    const hasRelativWidth = documentWidth - relativeRect.left < targetWidth && relativeRect.right < targetWidth;
    const hasRelativHeight = relativeRect.top <= targetHeight && documentHeight - relativeRect.bottom <= targetHeight;

    if (hasRelativWidth) {
      left = offsetX - relativeRect.left + 1;
    }

    if (hasRelativHeight) {
      top = offsetY + documentHeight - relativeRect.top - targetHeight;
    }
  } else {
    if (fixedPositionRight) {
      setRight();
    } else {
      setLeft();
    }

    if (fixedPositionTop) {
      setTop();
    } else {
      setBottom();
    }
  }

  return {
    left: `${left}px`,
    top: `${top}px`
  };
}

var script$7 = {
  name: 'Popup',
  props: {
    appendToBody: {
      type: Boolean,
      default: true
    },
    fixedPosition: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      popupRect: null
    };
  },

  watch: {
    visible: {
      immediate: true,

      handler(val) {
        this.$nextTick(() => {
          if (val) {
            this.displayPopup();
          }
        });
      }

    }
  },

  mounted() {
    if (this.inline) {
      return;
    }

    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
  },

  beforeDestroy() {
    if (this.inline) {
      return;
    }

    if (this.appendToBody && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },

  methods: {
    setTopStyle() {
      if (this.appendToBody) {
        const relativeRect = this.$parent.$el.getBoundingClientRect();
        this.$el.style.top = `${relativeRect.bottom + window.scrollY}px`;
      }
    },

    displayPopup() {
      if (this.inline || !this.visible) return;
      this.setTopStyle();
      const popup = this.$el;
      const relativeElement = this.$parent.$el;

      if (!this.popupRect) {
        this.popupRect = getPopupElementSize(popup);
      }

      const {
        width,
        height
      } = this.popupRect;
      const {
        left,
        top
      } = getRelativePosition({
        el: popup,
        elRelative: relativeElement,
        targetWidth: width,
        targetHeight: height,
        appendToBody: this.appendToBody,
        fixedPosition: this.fixedPosition,
        rtl: this.rtl
      });
      this.$el.style.left = left;
      this.$el.style.top = top;
    }

  },

  render() {
    return this.$slots.default;
  }

};

/* script */
const __vue_script__$7 = script$7;

/* template */

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

//

const validDate = val => val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number';

var script$8 = {
  name: 'Datepicker',
  components: {
    DateInput: __vue_component__$1,
    PickerDay: __vue_component__$4,
    PickerMonth: __vue_component__$5,
    PickerYear: __vue_component__$6,
    Popup: __vue_component__$7
  },
  mixins: [__vue_component__],
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    calendarClass: {
      type: [String, Object, Array],
      default: ''
    },
    dayCellContent: {
      type: Function,
      default: day => day.date
    },
    disabledDates: {
      type: Object,

      default() {
        return {};
      }

    },
    firstDayOfWeek: {
      type: String,
      default: 'sun'
    },
    fixedPosition: {
      type: String,
      default: '',
      validator: val => {
        const possibleValues = ['', 'bottom', 'bottom-left', 'bottom-right', 'top', 'top-left', 'top-right'];
        return possibleValues.includes(val);
      }
    },
    fullMonthName: {
      type: Boolean,
      default: false
    },
    highlighted: {
      type: Object,

      default() {
        return {};
      }

    },
    initialView: {
      type: String,
      default: ''
    },
    language: {
      type: Object,
      default: () => en
    },
    maximumView: {
      type: String,
      default: 'year'
    },
    minimumView: {
      type: String,
      default: 'day'
    },
    showEdgeDates: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Date, Number],
      default: '',
      validator: validDate
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: ''
    },
    yearPickerRange: {
      type: Number,
      default: 10
    }
  },

  data() {
    // const startDate = this.openDate ? new Date(this.openDate) : new Date()
    const constructedDateUtils = makeDateUtils(this.useUtc);
    let startDate;

    if (this.openDate) {
      startDate = constructedDateUtils.getNewDateObject(this.openDate);
    } else {
      startDate = constructedDateUtils.getNewDateObject();
    }

    const pageTimestamp = constructedDateUtils.setDate(startDate, 1);
    return {
      /*
       * Positioning
       */
      calendarHeight: 0,
      calendarSlots,
      currentPicker: '',

      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      pageTimestamp,
      resetTypedDate: constructedDateUtils.getNewDateObject(),

      /*
       * Selected Date
       * {Date}
       */
      selectedDate: null,
      utils: constructedDateUtils
    };
  },

  computed: {
    computedInitialView() {
      return this.initialView ? this.initialView : this.minimumView;
    },

    isInline() {
      return !!this.inline;
    },

    isOpen() {
      return this.currentPicker !== '';
    },

    isRtl() {
      return this.translation.rtl === true;
    },

    pageDate() {
      return new Date(this.pageTimestamp);
    },

    pickerClasses() {
      return [this.calendarClass, 'vdp-datepicker__calendar', this.isInline && 'inline', this.isRtl && this.appendToBody && 'rtl'];
    },

    translation() {
      return this.language;
    }

  },
  watch: {
    initialView() {
      this.setInitialView();
    },

    openDate() {
      this.setPageDate();
    },

    value(value) {
      this.setValue(value);
    }

  },

  mounted() {
    this.init();
  },

  methods: {
    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */
    allowedToShowView(view) {
      const views = ['day', 'month', 'year'];
      const minimumViewIndex = views.indexOf(this.minimumView);
      const maximumViewIndex = views.indexOf(this.maximumView);
      const viewIndex = views.indexOf(view);
      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex;
    },

    /**
     * Clear the selected date
     */
    clearDate() {
      this.selectedDate = null;
      this.setPageDate();
      this.$emit('selected', null);
      this.$emit('input', null);
      this.$emit('cleared');
    },

    /**
     * Close the calendar views
     */
    close() {
      if (!this.isInline) {
        this.currentPicker = '';
        this.$emit('closed');
      }
    },

    /**
     * Handles a month change from the day picker
     */
    handleChangedMonthFromDayPicker(date) {
      this.setPageDate(date);
      this.$emit('changed-month', date);
    },

    /**
     * Initiate the component
     */
    init() {
      if (this.value) {
        this.setValue(this.value);
      }

      if (this.isInline) {
        this.setInitialView();
      }
    },

    /**
     * Emits a 'blur' event
     */
    onBlur() {
      this.$emit('blur');
    },

    /**
     * Emits a 'focus' event
     */
    onFocus() {
      this.$emit('focus');
    },

    /**
     * Called in the event that the user navigates to date pages and
     * closes the picker without selecting a date.
     */
    resetDefaultPageDate() {
      if (this.selectedDate === null) {
        this.setPageDate();
        return;
      }

      this.setPageDate(this.selectedDate);
    },

    /**
     * Set the selected date
     * @param {Number} timestamp
     */
    setDate(timestamp) {
      const date = new Date(timestamp);
      this.selectedDate = date;
      this.setPageDate(date);
      this.$emit('selected', date);
      this.$emit('input', date);
    },

    /**
     * Sets the initial picker page view: day, month or year
     */
    setInitialView() {
      const initialView = this.computedInitialView;

      if (!this.allowedToShowView(initialView)) {
        throw new Error(`initialView '${this.initialView}' cannot be rendered based on minimum '${this.minimumView}' and maximum '${this.maximumView}'`);
      }

      switch (initialView) {
        case 'year':
          this.showSpecificCalendar('Year');
          break;

        case 'month':
          this.showSpecificCalendar('Month');
          break;

        default:
          this.showSpecificCalendar('Day');
          break;
      }
    },

    /**
     * Sets the date that the calendar should open on
     */
    setPageDate(date) {
      let dateTemp = date;

      if (!dateTemp) {
        if (this.openDate) {
          dateTemp = new Date(this.openDate);
        } else {
          dateTemp = new Date();
        }

        dateTemp = this.utils.resetDateTime(dateTemp);
      }

      this.pageTimestamp = this.utils.setDate(new Date(dateTemp), 1);
    },

    /**
     * Set the date from a typedDate event
     */
    setTypedDate(date) {
      this.setDate(date.valueOf());
    },

    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     */
    setValue(date) {
      let dateTemp = date;

      if (typeof dateTemp === 'string' || typeof dateTemp === 'number') {
        const parsed = new Date(dateTemp);
        dateTemp = Number.isNaN(parsed.valueOf()) ? null : parsed;
      }

      if (!dateTemp) {
        this.setPageDate();
        this.selectedDate = null;
        return;
      }

      this.selectedDate = dateTemp;
      this.setPageDate(dateTemp);
    },

    /**
     * @param {Object} date
     */
    selectDate(date) {
      this.resetTypedDate = this.utils.getNewDateObject();
      this.close();
      this.setDate(date.timestamp);
    },

    /**
     * @param {Object} date
     */
    selectDisabledDate(date) {
      this.$emit('selected-disabled', date);
    },

    /**
     * @param {Object} month
     */
    selectMonth(month) {
      const date = new Date(month.timestamp);

      if (this.allowedToShowView('day')) {
        this.setPageDate(date);
        this.$emit('changed-month', month);
        this.showSpecificCalendar('Day');
      } else {
        this.selectDate(month);
      }
    },

    /**
     * @param {Object} year
     */
    selectYear(year) {
      const date = new Date(year.timestamp);

      if (this.allowedToShowView('month')) {
        this.setPageDate(date);
        this.$emit('changed-year', year);
        this.showSpecificCalendar('Month');
      } else {
        this.selectDate(year);
      }
    },

    /**
     * Shows the calendar at the relevant view: 'day', 'month', or 'year'
     */
    showCalendar() {
      if (this.disabled || this.isInline) {
        return;
      }

      this.setInitialView();
      this.$emit('opened');
    },

    /**
     * Show a specific picker
     */
    showSpecificCalendar(type) {
      if (this.allowedToShowView(type.toLowerCase())) {
        this.currentPicker = `Picker${type}`;
      }
    }

  }
};

/* script */
const __vue_script__$8 = script$8;
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "vdp-datepicker",
      class: [_vm.wrapperClass, _vm.isRtl ? "rtl" : ""]
    },
    [
      _c(
        "DateInput",
        {
          attrs: {
            id: _vm.id,
            autofocus: _vm.autofocus,
            "bootstrap-styling": _vm.bootstrapStyling,
            "calendar-button": _vm.calendarButton,
            "calendar-button-icon": _vm.calendarButtonIcon,
            "calendar-button-icon-content": _vm.calendarButtonIconContent,
            "clear-button": _vm.clearButton,
            "clear-button-icon": _vm.clearButtonIcon,
            disabled: _vm.disabled,
            format: _vm.format,
            inline: _vm.inline,
            "is-open": _vm.isOpen,
            "input-class": _vm.inputClass,
            maxlength: _vm.maxlength,
            name: _vm.name,
            parser: _vm.parser,
            pattern: _vm.pattern,
            placeholder: _vm.placeholder,
            "ref-name": _vm.refName,
            required: _vm.required,
            "reset-typed-date": _vm.resetTypedDate,
            "selected-date": _vm.selectedDate,
            "show-calendar-on-button-click": _vm.showCalendarOnButtonClick,
            "show-calendar-on-focus": _vm.showCalendarOnFocus,
            tabindex: _vm.tabindex,
            translation: _vm.translation,
            typeable: _vm.typeable,
            "use-utc": _vm.useUtc
          },
          on: {
            blur: _vm.onBlur,
            "clear-date": _vm.clearDate,
            "close-calendar": _vm.close,
            focus: _vm.onFocus,
            "show-calendar": _vm.showCalendar,
            "typed-date": _vm.setTypedDate
          }
        },
        [
          _vm._t("beforeDateInput", null, { slot: "beforeDateInput" }),
          _vm._v(" "),
          _vm._t("afterDateInput", null, { slot: "afterDateInput" })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "Popup",
        {
          ref: "popup",
          attrs: {
            "append-to-body": _vm.appendToBody,
            "fixed-position": _vm.fixedPosition,
            inline: _vm.inline,
            rtl: _vm.isRtl,
            visible: _vm.isOpen
          }
        },
        [
          _vm.isOpen
            ? _c(
                "div",
                {
                  ref: "datepicker",
                  class: _vm.pickerClasses,
                  on: {
                    mousedown: function($event) {
                      $event.preventDefault();
                    }
                  }
                },
                [
                  _vm.isOpen
                    ? [
                        _vm._t("beforeCalendarHeader"),
                        _vm._v(" "),
                        _c(
                          _vm.currentPicker,
                          {
                            tag: "Component",
                            attrs: {
                              "allowed-to-show-view": _vm.allowedToShowView,
                              "day-cell-content": _vm.dayCellContent,
                              "disabled-dates": _vm.disabledDates,
                              "first-day-of-week": _vm.firstDayOfWeek,
                              highlighted: _vm.highlighted,
                              "is-rtl": _vm.isRtl,
                              "page-date": _vm.pageDate,
                              "page-timestamp": _vm.pageTimestamp,
                              "selected-date": _vm.selectedDate,
                              "show-edge-dates": _vm.showEdgeDates,
                              "show-full-month-name": _vm.fullMonthName,
                              "show-header": _vm.showHeader,
                              translation: _vm.translation,
                              "use-utc": _vm.useUtc,
                              "year-range": _vm.yearPickerRange
                            },
                            on: {
                              "select-date": _vm.selectDate,
                              "changed-month":
                                _vm.handleChangedMonthFromDayPicker,
                              "selected-disabled": _vm.selectDisabledDate,
                              "select-month": _vm.selectMonth,
                              "changed-year": _vm.setPageDate,
                              "show-month-calendar": function($event) {
                                return _vm.showSpecificCalendar("Month")
                              },
                              "select-year": _vm.selectYear,
                              "changed-decade": _vm.setPageDate,
                              "show-year-calendar": function($event) {
                                return _vm.showSpecificCalendar("Year")
                              }
                            }
                          },
                          [
                            _vm._l(_vm.calendarSlots, function(slotKey) {
                              return [_vm._t(slotKey, null, { slot: slotKey })]
                            })
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _vm._t("calendarFooter")
                      ]
                    : _vm._e()
                ],
                2
              )
            : _vm._e()
        ]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__$8;
//# sourceMappingURL=Datepicker.esm.js.map
