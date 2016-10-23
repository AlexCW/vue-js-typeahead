<template class="lookahead">
  <input class="typeahead form-control" type="text" autocomplete="false"/>
</template>

<script>
export default {
  created: function () {
    var that = this
    window.jQuery(document).ready(function () {
      that.getOptions()
    })
  },
  data: function () {
    return {
      options: []
    }
  },
  props: ['src', 'displayKey'],
  methods: {
    getOptions: function () {
      this.$http.get(this.src).then((response) => {
        var data = response
        if (this.$parent.hasOwnProperty('formatOptions')) {
          data = this.$parent.formatOptions(response.data)
        }
        this.options = data

        this.bindTypeahead(this.$el)
      }, (response) => {
      }).bind(this)
    },
    getTemplate: function (match) {
      return '<div><h2>' + match.name + '</h2></div>'
    },
    substringMatcher: function (strs) {
      return function findMatches (q, cb) {
        var matches = []

        var substrRegex = ''

        matches = []

        substrRegex = new RegExp(q, 'i')

        window.jQuery.each(strs, function (i, str) {
          if (substrRegex.test(str.name)) {
            matches.push(str)
          }
        })

        cb(matches)
      }
    },
    bindTypeahead: function (el) {
      var that = this
      window.jQuery(el).typeahead({
        hint: true,
        minLength: 3
      },
        {
          name: 'typeahead',
          source: this.substringMatcher(this.options),
          displayKey: that.displayKey,
          templates: {
            suggestion: function (match) {
              return that.getTemplate(match)
            }
          }
        }).bind('typeahead:change', function (ev, suggestion) {
          that.$emit('input', ev.target.value)
        })
    }
  },
  template: '.lookahead'
}
</script>