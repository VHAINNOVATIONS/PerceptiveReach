#encoding: utf-8 
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
  t.profile = 'default'
end

Cucumber::Rake::Task.new(:Facility_view_ohio) do |t|
t.profile='Facility'
#t.cucumber_opts = "--tags @Arizona"
end
task :Facility=> :Facility_view_ohio
task :default => :features