require File.expand_path('../version', __FILE__)

@build = File.expand_path('../build', __FILE__)
@dist = File.expand_path('../dist', __FILE__)
@src = File.expand_path('../src', __FILE__)
@minifier = %{java -jar #{@build}/google-compiler-20100912.jar}
@insta = 'jquery.instaform.js'
@insta_min = 'jquery.instaform.min.js'

task :default => :spec

desc "Builds versioned InstaForm and minified Instaform"
task :min => [:dist] do
  min = `#{@minifier} --js #{File.join(@dist, @insta)} --warning_level QUIET`

  File.open(File.join(@dist, @insta_min), 'w') do |f|
    f.write add_header(min)
  end
end

task :dist => [:clean] do
  mkdir_p @dist
  source = File.read(File.join(@src, @insta))

  File.open(File.join(@dist, @insta), 'w') do |f|
    f.write add_header(source)
  end
end

desc "Run the specs headless via Rhino and Env.js"
task :spec => 'spec:rhino'

namespace :spec do

  task :rhino do
    rhino = File.join(@src, 'spec', 'rhino.js')
    sh "jspec run #{rhino} --rhino -p #{@src}"
  end

  desc "Run the specs in Firefox"
  task :ff do
    ff = File.join(@src, 'spec', 'dom.html')
    sh "jspec run #{ff} -b ff"
  end
end

desc "clean the distribution directory."
task :clean do
  rm_rf @dist
end

def add_header(code)
  header = File.read(File.join(@src, 'header.js')).gsub(/@VERSION/, InstaForm::VERSION::STRING)
  [header, code].join('')
end
