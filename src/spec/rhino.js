
load('./spec/support/env.js')
load('./jquery-1.4.2.min.js')
load('./jquery-ui-1.8.2.custom.min.js')
load('./spec/lib/jspec.js')
load('./spec/lib/jspec.xhr.js')
load('./spec/lib/jspec.jquery.js')
load('./spec/lib/jspec.growl.js')
load('./jquery.form.js')

load('./jquery.instaform.js')
load('./spec/unit/instaform.spec.helper.js')

JSpec.options.disableColors = true; // for damned windows consoles which don't do ANSI colors

JSpec
.exec('spec/unit/instaform.spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()