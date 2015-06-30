require 'capybara/cucumber'
require 'capybara-screenshot/cucumber'
require "tiny_tds"

Capybara.default_wait_time = 15
Capybara.default_driver = :selenium

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome, :switches => %w[--aggressive-cache-discard --ignore-certificate-errors --disable-popup-blocking --disable-translate])
end

#Capybara.javascript_driver = :selenium

Before do |scenario|
	page.driver.browser.manage.delete_all_cookies
	page.driver.browser.manage.window.maximize
end