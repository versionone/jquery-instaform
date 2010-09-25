
(function ($) {
	$.InstaForm = function (el, options) {
		// To avoid scope issues, use 'self' instead of 'this'
		// to reference this class from internal events and functions.
		var self = this;

		// Access to jQuery and DOM versions of element
		self.$el = $(el);
		self.el = el;

		// Add a reverse reference to the DOM object
		self.$el.data("InstaForm", self);

		self.init = function () {
			self.options = $.extend({}, $.InstaForm.defaultOptions, options);

			self.$form = self.$el;
			self.$form.addClass('ui-widget').addClass(self.options.formClass)
						.bind('submit.instaform', self.cancel_default_submit) 
						.bind('change.instaform', self.submit_form_values)
						.find(self.options.selector)
							.addClass('ui-state-default')
							.bind('focus.instaform', self.focused)
							.bind('blur.instaform', self.blurred);

		};

		self.submit_form_values = function (e) {
			self.cancel_default_submit(e);

			if (self.$form.validate().form() === false) return;

			var $instaInput = $(e.target);
			$instaInput.addClass('ui-state-active');
			self.$form.ajaxSubmit({
				success: function (data, statusText, xhr) {
					$instaInput.removeClass('ui-state-active ui-state-error');
					self.options.success(data, statusText, xhr, self.$form);
				},
				error: function (request, textStatus, error) { $instaInput.addClass('ui-state-error'); }
			});
		};

		self.cancel_default_submit = function (e) {
			e.preventDefault()
		};

		self.focused = function () {
			$(this).addClass('ui-state-focus')
		};

		self.blurred = function () {
			$(this).removeClass('ui-state-focus')
		};

		self.init();
	};

	$.InstaForm.defaultOptions = {
		formClass: '',
		selector: 'input:text, textarea',
		success: function () { }
	};

	$.fn.instaform = function (options) {
		return this.each(function () {
			(new $.InstaForm(this, options));
		});
	};

	// This function breaks the chain, but returns
	// the InstaForm if it has been attached to the object.
	$.fn.getInstaForm = function () {
		return this.data("InstaForm");
	};

})(jQuery);
