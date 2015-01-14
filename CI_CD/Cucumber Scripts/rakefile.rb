#encoding: utf-8 
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
	t.profile = 'default'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "features --format json --out report.json"
end

Cucumber::Rake::Task.new(:Facility_view_ohio) do |t|
	t.profile='Facility'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "--tags @Ohio features --format json --out report.json"
	#t.cucumber_opts = "--tags @Ohio"
end

Cucumber::Rake::Task.new(:SPC_Widget) do |t|
	t.profile='Widget'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "--tags @Widget features --format json --out report.json "
	#t.cucumber_opts = "--tags @Widget"
	
end

Cucumber::Rake::Task.new(:SPC_Login) do |t|
	t.profile='Login'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "--tags @SPC_User_msmith features --format json --out report.json --profile Login"
	#t.cucumber_opts = "--tags @SPC_User_msmith"
	
end

task :Facility=> :Facility_view_ohio
task :Widget=> :SPC_Widget
task :Login=> :SPC_Login
task :default => :features
