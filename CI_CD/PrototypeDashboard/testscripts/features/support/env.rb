require 'capybara/cucumber'
require 'capybara-screenshot/cucumber'

Capybara.default_wait_time = 15
Capybara.default_driver = :selenium_chrome


Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome, :switches => %w[--ignore-certificate-errors --disable-popup-blocking --disable-translate --aggressive-cache-discard])
end

Capybara.javascript_driver = :chrome

Before do |scenario|
	page.driver.browser.manage.delete_all_cookies
	page.driver.browser.manage.window.maximize
	#page.driver.browser.manage.window.resize_to(1920, 1080)
end

After do |scenario|
	page.driver.browser.manage.delete_all_cookies
	page.driver.browser.quit
end