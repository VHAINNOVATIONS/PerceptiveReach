#encoding: utf-8 
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
  t.profile = 'default'
  t.cucumber_opts = "features --format json --out report.json"
end

task :default => :features
