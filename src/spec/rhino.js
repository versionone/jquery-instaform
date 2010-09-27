
load('./src/spec/support/env.js')
load('./lib/jquery-1.4.2.min.js')
load('./lib/jquery-ui-1.8.2.custom.min.js')
load('./lib/jquery.validate.min.js')
load('./src/spec/lib/jspec.js')
load('./src/spec/lib/jspec.xhr.js')
load('./src/spec/lib/jspec.jquery.js')
load('./src/spec/lib/jspec.growl.js')
load('./lib/jquery.form.js')

load('./src/jquery.instaform.js')
load('./src/spec/unit/instaform.spec.helper.js')

//JSpec.options.disableColors = true; // for damned windows consoles which don't do ANSI colors

JSpec
.exec('src/spec/unit/instaform.spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'src/spec/fixtures' })
.report()
