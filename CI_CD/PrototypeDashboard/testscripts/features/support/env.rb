require 'capybara/cucumber'

Capybara.default_wait_time = 15
Capybara.default_driver = :selenium_firefox


 Capybara.register_driver :selenium_firefox do |app|
  Capybara::Selenium::Driver.new(app, :browser => :firefox)
end

Before do |scenario|
	page.driver.browser.manage.delete_all_cookies
	#page.driver.browser.manage.window.maximize
	page.driver.browser.manage.window.resize_to(1920, 1080)
end

Capybara.javascript_driver = :firefox

Before '@javascript' do
  page.driver.browser.manage.window.resize_to(1920, 1080)
end