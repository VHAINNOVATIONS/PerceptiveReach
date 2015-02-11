#encoding: utf-8 
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:features) do |t|
	t.profile = 'default'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "features --format json --out report.json"
end

Cucumber::Rake::Task.new(:SPC_Widget) do |t|
	t.profile = 'Widget'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = " --tags @EditWidgetPR-1165 features --format json --out report.json"
end

Cucumber::Rake::Task.new(:SPC_Widget_delete) do |t|
	t.profile = 'DeleteWidget'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "--tags @DeleteWidgetPR-1165 features --format json --out report.json"
end

Cucumber::Rake::Task.new(:Navigate_Views) do |t|
	t.profile = 'default'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "--tags @NavigateViewsPR-1191 features --format json --out report.json"
end

Cucumber::Rake::Task.new(:StateViewWidgets) do |t|
	t.profile = 'default'
	#t.cucumber_opts = "features -f html --out=report/report.html"
	t.cucumber_opts = "features --format json --out report.json"
end

task :default => :features
task :Widget=> :SPC_Widget
task :DeleteWidget=> :SPC_Widget_delete
task :Navigate_Views=> :Navigate_Views
task :StateViewWidgets=> :StateViewWidgets