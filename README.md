InstaForm jQuery Plugin
==

How It Works
--
When a user makes a change to any input field that has been set up to be an instaform, the form is automatically submitted via ajax. Submits happen when the 'change' event fires or when the 'submit' event fires.

Users know if forms are instaforms by providing them with ui hints. jQuery UI classes are used to show 'ui-state-focus' while editing as well as 'ui-state-active' while submitting. If there is an error during submission the 'ui-state-error' class is added to the inputs.

Instaform has integration with the [jQuery Validation Plugin](http://github.com/jzaefferer/jquery-validation). If validation fails while attempting to submit, it will cancel. The validation plugin will handle display of offenses.

Options
--
- formClass - '' - in addition to adding 'ui-widget' to the form element, you may specify an additional class to add to forms set up to be instaforms
- selector - 'input:text, textarea' - the selector used to bind event listeners to
- success - function(){} - a callback function you may supply that is invoked after ajax success

Installation
--
1. Reference jquery-1.4.2.min.js
1. Reference jquery.validate.min.js
1. Reference jquery-ui-1.8.2.custom.min
1. Reference jquery.form.js
1. Reference jquery.instaform.js
1. $(function(){ $('#myform').instaform() })
1. $(function(){ $('#myform').instaform({ success : function() { alert('success') } }) })

Usage
--
1. Make a change to a text input inside of an instaform
1. Leave the field or press enter

Limitations
--
1. As of now only textarea and input:text fields have been tested

Tests
-- 
This plugin was built using [JSpec](http://visionmedia.github.com/jspec/). To run the specs navigate to the src/spec/dom.html file in Firefox (other browsers do not seem to work).

License
--
Please refer to the [LICENSE](jquery-instaform/blob/master/LICENSE.md) file.