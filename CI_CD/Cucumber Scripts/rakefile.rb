﻿#encoding: utf-8 
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
<<<<<<< HEAD
  t.profile = 'default'
end

Cucumber::Rake::Task.new(:Facility_view_ohio) do |t|
t.profile='Facility'
#t.cucumber_opts = "--tags @Arizona"
=======
	t.profile = 'default'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "features --format json --out report.json"
end

Cucumber::Rake::Task.new(:Facility_view_ohio) do |t|
	t.profile='Facility'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "features --format json --out report.json"
	#t.cucumber_opts = "--tags @Widget"
>>>>>>> 17f5db02307231da2da35d9bc153dd3462fef330
end
task :Facility=> :Facility_view_ohio
task :default => :features