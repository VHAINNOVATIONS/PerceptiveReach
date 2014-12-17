#encoding: utf-8 
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
	t.profile = 'default'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "features --format json"
end

Cucumber::Rake::Task.new(:Facility_view_ohio) do |t|
	t.profile='Facility'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "features --format json"
	#t.cucumber_opts = "--tags @Widget"
end
task :Facility=> :Facility_view_ohio
task :default => :features