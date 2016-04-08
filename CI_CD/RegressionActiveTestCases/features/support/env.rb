require 'capybara/cucumber'
require 'capybara-screenshot/cucumber'
require "tiny_tds"
require 'selenium-webdriver'
require 'capybara/email'

Capybara.default_wait_time = 15
Capybara.default_driver = :selenium

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :firefox)
end


Before do |scenario|
	page.driver.browser.manage.delete_all_cookies
	page.driver.browser.manage.window.maximize
end